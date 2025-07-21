// composables/usePartners.ts
import { ref, computed } from "vue";
import type { Ref } from "vue";
import { useAuthStore } from "~/stores/auth";

// Types and interfaces
export interface Partner {
  id: string;
  name: string;
  description?: string;
  website?: string;
  logo?: string;
  featured?: boolean;
  active?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePartnerData {
  name: string;
  description?: string;
  website?: string;
  logo?: string;
  featured?: boolean;
  active?: boolean;
  order?: number;
}

export interface UpdatePartnerData extends Partial<CreatePartnerData> {}

export interface PartnerChangeCallback {
  (action: string, data?: any): void;
}

// Global state for partners - shared across all component instances
const globalPartners: Ref<Partner[]> = ref([]);
const globalLoading: Ref<boolean> = ref(false);
const globalError: Ref<string | null> = ref(null);
const lastFetchTime: Ref<number | null> = ref(null);

// Cache timeout in milliseconds (5 minutes)
const CACHE_TIMEOUT = 5 * 60 * 1000;

// Global event callbacks for synchronization
const partnerChangeCallbacks = new Set<PartnerChangeCallback>();

// Helper function to notify all components about partner changes
const notifyPartnerChange = (action: string, data: any = null): void => {
  console.log(`Partner ${action}:`, data?.name || data?.id || "unknown");
  partnerChangeCallbacks.forEach((callback) => {
    try {
      callback(action, data);
    } catch (err) {
      console.error("Error in partner change callback:", err);
    }
  });
};

export const usePartners = () => {
  const authStore = useAuthStore();

  // Use global state instead of local state
  const partners = globalPartners;
  const loading = globalLoading;
  const error = globalError;

  // Get API base URL from runtime config
  const config = useRuntimeConfig();
  const API_BASE: string = config.public.apiBase;
  const apiUrls = {
    partners: {
      list: `${API_BASE}/api/partners`,
      get: (id: string): string => `${API_BASE}/api/partners/${id}`,
      create: `${API_BASE}/api/partners`,
      update: (id: string): string => `${API_BASE}/api/partners/${id}`,
      delete: (id: string): string => `${API_BASE}/api/partners/test/${id}`, // Use test endpoint temporarily
    },
  };

  // Debug: Log API URLs
  console.log("Partners API URLs:", apiUrls.partners);

  // Get auth token helper
  const getAuthToken = (): string | null => {
    // First try to get from auth store
    if (authStore.accessToken) {
      console.log(
        "Token from auth store:",
        authStore.accessToken.substring(0, 20) + "..."
      );
      return authStore.accessToken;
    }

    // Fallback to localStorage if running on client
    if (process.client) {
      const token =
        localStorage.getItem("access_token") ||
        localStorage.getItem("token") ||
        localStorage.getItem("auth-token") ||
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("access_token") ||
        sessionStorage.getItem("token") ||
        sessionStorage.getItem("auth-token");

      console.log("All localStorage keys:", Object.keys(localStorage));
      console.log("access_token:", localStorage.getItem("access_token"));
      console.log(
        "Retrieved token from localStorage:",
        token ? `${token.substring(0, 20)}...` : "No token found"
      );
      return token;
    }
    return null;
  };

  // Create headers with auth
  const createHeaders = (
    includeAuth: boolean = true
  ): Record<string, string> => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (includeAuth) {
      const token = getAuthToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  };

  // Helper function to check if user has admin permissions
  const checkAdminPermissions = (): boolean => {
    const authToken = getAuthToken();
    if (!authToken) {
      throw new Error("No authentication token found. Please log in.");
    }

    // Check if user has admin or editor role from the auth store
    if (!authStore.isAdmin && !authStore.isEditor) {
      throw new Error(
        "Admin or Editor privileges required. Please contact an administrator."
      );
    }

    return true;
  };

  // Helper function to handle API requests with automatic token refresh
  const makeAuthenticatedRequest = async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    console.log("🔄 Making authenticated request to:", url);
    console.log("🔄 Request options:", options);

    const authToken = getAuthToken();
    if (!authToken) {
      console.error("❌ No authentication token found");
      throw new Error("No authentication token found. Please log in.");
    }

    console.log("✅ Auth token found:", authToken.substring(0, 20) + "...");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      ...(options.headers as Record<string, string>),
    };

    console.log("📤 Request headers:", {
      ...headers,
      Authorization: headers.Authorization.substring(0, 30) + "...",
    });

    let response = await fetch(url, {
      ...options,
      headers,
    });

    console.log("📥 Response status:", response.status);
    console.log(
      "📥 Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    // If we get a 401 (unauthorized), try to refresh the token
    if (response.status === 401) {
      console.log("🔄 Token expired, attempting to refresh...");
      console.log(
        "🔄 Current refresh token:",
        authStore.refreshToken ? "Present" : "Missing"
      );

      const refreshSuccess = await authStore.refreshAccessToken();
      console.log("🔄 Refresh result:", refreshSuccess);

      if (refreshSuccess) {
        console.log("✅ Token refreshed successfully, retrying request...");
        const newToken = getAuthToken();
        console.log(
          "✅ New token:",
          newToken ? newToken.substring(0, 20) + "..." : "No token"
        );

        headers.Authorization = `Bearer ${newToken}`;
        console.log("📤 Retrying with new token...");

        response = await fetch(url, {
          ...options,
          headers,
        });

        console.log("📥 Retry response status:", response.status);
      } else {
        console.error("❌ Token refresh failed, redirecting to login...");
        console.error("❌ Refresh token present:", !!authStore.refreshToken);
        console.error("❌ Auth store state:", {
          isAuthenticated: authStore.isAuthenticated,
          user: authStore.user,
          accessToken: !!authStore.accessToken,
          refreshToken: !!authStore.refreshToken,
        });

        authStore.logout();
        throw new Error("Session expired. Please log in again.");
      }
    }

    return response;
  };

  // Get all partners (public)
  const getPartners = async (
    forceRefresh: boolean = false
  ): Promise<Partner[]> => {
    try {
      // Check if we have cached data and it's not expired
      const now = Date.now();
      if (
        !forceRefresh &&
        globalPartners.value.length > 0 &&
        lastFetchTime.value &&
        now - lastFetchTime.value < CACHE_TIMEOUT
      ) {
        console.log("Using cached partners data");
        return globalPartners.value;
      }

      console.log("Fetching fresh partners data from API");
      console.log("API URL:", apiUrls.partners.list);
      globalLoading.value = true;
      globalError.value = null;

      const response = await fetch(apiUrls.partners.list);
      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Raw API response data:", data);
      console.log("Data type:", typeof data);
      console.log("Is array:", Array.isArray(data));
      console.log("Data.data exists:", !!data.data);
      console.log("Data.data type:", typeof data.data);
      console.log("Data.data is array:", Array.isArray(data.data));

      const partnersData = Array.isArray(data) ? data : data.data || [];
      console.log("Processed partners data:", partnersData);
      console.log("Partners data length:", partnersData.length);

      // Update global state
      globalPartners.value = partnersData;
      lastFetchTime.value = now;

      console.log("Partners fetched successfully:", partnersData.length);
      notifyPartnerChange("fetched", { count: partnersData.length });

      return partnersData;
    } catch (err) {
      console.error("Error fetching partners:", err);
      globalError.value = (err as Error).message || "Failed to fetch partners";
      throw err;
    } finally {
      globalLoading.value = false;
    }
  };

  // Get partner by ID (admin)
  const getPartner = async (id: string): Promise<Partner> => {
    try {
      checkAdminPermissions();

      const response = await makeAuthenticatedRequest(apiUrls.partners.get(id));

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.error("Error fetching partner:", err);
      throw err;
    }
  };

  // Create partner (admin)
  const createPartner = async (
    partnerData: CreatePartnerData
  ): Promise<Partner> => {
    try {
      checkAdminPermissions();

      console.log("Creating partner with data:", partnerData);

      const response = await makeAuthenticatedRequest(apiUrls.partners.create, {
        method: "POST",
        body: JSON.stringify(partnerData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Create partner error response:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorText}`
        );
      }

      const newPartner = await response.json();
      console.log("Partner created successfully:", newPartner);

      // Update local cache
      globalPartners.value.push(newPartner);
      notifyPartnerChange("created", newPartner);

      return newPartner;
    } catch (err) {
      console.error("Error creating partner:", err);
      throw err;
    }
  };

  // Update partner (admin)
  const updatePartner = async (
    id: string,
    partnerData: UpdatePartnerData
  ): Promise<Partner> => {
    try {
      checkAdminPermissions();

      console.log("Updating partner:", id, partnerData);

      const response = await makeAuthenticatedRequest(
        apiUrls.partners.update(id),
        {
          method: "PATCH",
          body: JSON.stringify(partnerData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Update partner error response:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorText}`
        );
      }

      const updatedPartner = await response.json();
      console.log("Partner updated successfully:", updatedPartner);

      // Update in local cache
      const index = globalPartners.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        globalPartners.value[index] = updatedPartner;
      }
      notifyPartnerChange("updated", updatedPartner);

      return updatedPartner;
    } catch (err) {
      console.error("Error updating partner:", err);
      throw err;
    }
  };

  // Delete partner (admin)
  const deletePartner = async (id: string): Promise<void> => {
    try {
      checkAdminPermissions();

      console.log("Deleting partner:", id);

      const response = await makeAuthenticatedRequest(
        apiUrls.partners.delete(id),
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Delete partner error response:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorText}`
        );
      }

      console.log("Partner deleted successfully");

      // Remove from local cache
      globalPartners.value = globalPartners.value.filter((p) => p.id !== id);
      notifyPartnerChange("deleted", { id });
    } catch (err) {
      console.error("Error deleting partner:", err);
      throw err;
    }
  };

  // Computed properties
  const featuredPartners = computed(() =>
    globalPartners.value.filter((partner) => partner.featured)
  );

  const activePartners = computed(() =>
    globalPartners.value.filter((partner) => partner.active !== false)
  );

  // Register a callback for partner changes and return unsubscribe function
  const onPartnerChange = (callback: PartnerChangeCallback): (() => void) => {
    partnerChangeCallbacks.add(callback);

    // Return unsubscribe function
    return () => {
      partnerChangeCallbacks.delete(callback);
    };
  };

  // Unregister a callback
  const offPartnerChange = (callback: PartnerChangeCallback): void => {
    partnerChangeCallbacks.delete(callback);
  };

  return {
    // State
    partners: globalPartners,
    loading: globalLoading,
    error: globalError,

    // Computed
    featuredPartners,
    activePartners,

    // Methods
    getPartners,
    getPartner,
    createPartner,
    updatePartner,
    deletePartner,

    // Event handling
    onPartnerChange,
    offPartnerChange,

    // Utilities
    checkAdminPermissions,
  };
};
