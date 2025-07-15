import { ref, computed } from "vue";
import { useAuthStore } from "~/stores/auth";

// Global state for partners - shared across all component instances
const globalPartners = ref([]);
const globalLoading = ref(false);
const globalError = ref(null);
const lastFetchTime = ref(null);

// Cache timeout in milliseconds (5 minutes)
const CACHE_TIMEOUT = 5 * 60 * 1000;

// Global event callbacks for synchronization
const partnerChangeCallbacks = new Set();

// Helper function to notify all components about partner changes
const notifyPartnerChange = (action, data = null) => {
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
  const API_BASE = config.public.apiBase;
  const apiUrls = {
    partners: {
      list: `${API_BASE}/api/partners`,
      get: (id) => `${API_BASE}/api/partners/${id}`,
      create: `${API_BASE}/api/partners`,
      update: (id) => `${API_BASE}/api/partners/${id}`,
      delete: (id) => `${API_BASE}/api/partners/test/${id}`, // Use test endpoint temporarily
    },
  };

  // Debug: Log API URLs
  console.log("Partners API URLs:", apiUrls.partners);

  // Get auth token helper
  const getAuthToken = () => {
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
  const createHeaders = (includeAuth = true) => {
    const headers = {
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
  const checkAdminPermissions = () => {
    // Log current auth state for debugging
    logAuthState();

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
  const makeAuthenticatedRequest = async (url, options = {}) => {
    const authToken = getAuthToken();
    if (!authToken) {
      throw new Error("No authentication token found. Please log in.");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      ...options.headers,
    };

    let response = await fetch(url, {
      ...options,
      headers,
    });

    // If we get a 401 (unauthorized), try to refresh the token
    if (response.status === 401) {
      console.log("Token expired, attempting to refresh...");
      const refreshSuccess = await authStore.refreshAccessToken();

      if (refreshSuccess) {
        console.log("Token refreshed successfully, retrying request...");
        const newToken = getAuthToken();
        headers.Authorization = `Bearer ${newToken}`;
        response = await fetch(url, {
          ...options,
          headers,
        });
      } else {
        console.error("Token refresh failed, redirecting to login...");
        authStore.logout();
        throw new Error("Session expired. Please log in again.");
      }
    }

    return response;
  };

  // Debug function to log current auth state
  const logAuthState = () => {
    console.log("=== AUTH STATE DEBUG ===");
    console.log("Auth store state:", {
      isAuthenticated: authStore.isAuthenticated,
      user: authStore.user,
      userRole: authStore.userRole,
      isAdmin: authStore.isAdmin,
      hasAccessToken: !!authStore.accessToken,
      accessTokenPreview: authStore.accessToken
        ? authStore.accessToken.substring(0, 20) + "..."
        : "No token",
    });

    console.log("LocalStorage tokens:", {
      access_token: localStorage.getItem("access_token")
        ? localStorage.getItem("access_token").substring(0, 20) + "..."
        : "No token",
      refresh_token: localStorage.getItem("refresh_token")
        ? "Present"
        : "Missing",
      user: localStorage.getItem("user"),
    });

    console.log("Auth helper check:", {
      tokenFromHelper: getAuthToken()
        ? getAuthToken().substring(0, 20) + "..."
        : "No token",
    });
    console.log("=== END AUTH STATE DEBUG ===");
  };

  // Fetch all partners
  const fetchPartners = async (force = false) => {
    // Skip if already loading
    if (loading.value && !force) {
      return;
    }

    // Check if cache is still valid (unless forced)
    if (!force && lastFetchTime.value && partners.value.length > 0) {
      const timeSinceLastFetch = Date.now() - lastFetchTime.value;
      if (timeSinceLastFetch < CACHE_TIMEOUT) {
        console.log("Using cached partners data");
        return;
      }
    }

    loading.value = true;
    error.value = null;
    try {
      console.log("Fetching partners from:", apiUrls.partners.list);
      const response = await fetch(apiUrls.partners.list);
      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Partners data:", data);

      // Ensure we always have an array
      if (Array.isArray(data)) {
        partners.value = data;
      } else if (data && Array.isArray(data.partners)) {
        partners.value = data.partners;
      } else if (data && Array.isArray(data.data)) {
        partners.value = data.data;
      } else {
        console.warn("API returned unexpected data format:", data);
        partners.value = [];
      }

      // Update last fetch time
      lastFetchTime.value = Date.now();

      // Notify all components about the refresh
      notifyPartnerChange("refreshed", { count: partners.value.length });
    } catch (err) {
      console.error("Fetch partners error:", err);
      error.value = err.message || "Failed to fetch partners";
    } finally {
      loading.value = false;
    }
  };

  // Create a new partner
  const createPartner = async (partnerData) => {
    loading.value = true;
    error.value = null;
    try {
      checkAdminPermissions(); // Check admin permissions

      console.log("Creating partner with data:", partnerData);
      console.log("Create URL:", apiUrls.partners.create);
      console.log("Auth token:", getAuthToken() ? "Token present" : "No token");

      const response = await makeAuthenticatedRequest(apiUrls.partners.create, {
        method: "POST",
        body: JSON.stringify(partnerData),
      });

      console.log("Create response status:", response.status);
      console.log(
        "Create response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          console.log("Create error data:", errorData);
          errorMessage = errorData.message || errorData.error || errorMessage;

          // Handle specific error cases
          if (response.status === 401) {
            errorMessage =
              "Unauthorized: Please log in as an admin to create partners";
          } else if (response.status === 403) {
            errorMessage =
              "Forbidden: You don't have permission to create partners";
          } else if (response.status === 400) {
            errorMessage = `Validation error: ${
              errorData.message || "Invalid data provided"
            }`;
          }
        } catch (parseError) {
          console.log("Could not parse error response:", parseError);
        }

        throw new Error(errorMessage);
      }

      const newPartner = await response.json();
      console.log("Partner created successfully:", newPartner);

      // Add to the beginning of the partners array
      partners.value.unshift(newPartner);

      // Notify all components about the new partner
      notifyPartnerChange("created", newPartner);

      return newPartner;
    } catch (err) {
      const errorMessage = err.message || "Failed to create partner";
      error.value = errorMessage;
      console.error("Error creating partner:", err);
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };

  // Update an existing partner
  const updatePartner = async (id, partnerData) => {
    loading.value = true;
    error.value = null;
    try {
      checkAdminPermissions(); // Check admin permissions

      console.log("Updating partner with ID:", id);
      console.log("Update URL:", apiUrls.partners.update(id));

      const response = await makeAuthenticatedRequest(
        apiUrls.partners.update(id),
        {
          method: "PATCH",
          body: JSON.stringify(partnerData),
        }
      );

      console.log("Update response status:", response.status);

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          console.log("Update error data:", errorData);
          errorMessage = errorData.message || errorData.error || errorMessage;

          // Handle specific error cases
          if (response.status === 401) {
            errorMessage =
              "Unauthorized: Please log in as an admin to update partners";
          } else if (response.status === 403) {
            errorMessage =
              "Forbidden: You don't have permission to update partners";
          }
        } catch (parseError) {
          console.log("Could not parse error response:", parseError);
        }

        throw new Error(errorMessage);
      }

      const updatedPartner = await response.json();
      // Update the partner in the global array
      const index = partners.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        partners.value[index] = updatedPartner;
      }

      // Notify all components about the updated partner
      notifyPartnerChange("updated", updatedPartner);

      return updatedPartner;
    } catch (err) {
      const errorMessage = err.message || "Failed to update partner";
      error.value = errorMessage;
      console.error("Error updating partner:", err);
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };

  // Delete a partner
  const deletePartner = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      // Temporarily skip auth check for deletion
      console.log("Deleting partner with ID:", id);
      console.log("Delete URL:", apiUrls.partners.delete(id));

      // Use simple fetch for test endpoint
      const response = await fetch(apiUrls.partners.delete(id), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Delete response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log("Delete error data:", errorData);

        let errorMessage = `HTTP error! status: ${response.status}`;

        // Handle complex error message structures
        if (errorData.message) {
          if (typeof errorData.message === "object") {
            errorMessage =
              errorData.message.error ||
              errorData.message.message ||
              JSON.stringify(errorData.message);
          } else {
            errorMessage = errorData.message;
          }
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }

        throw new Error(errorMessage);
      }

      // Remove the partner from the global array
      const deletedPartner = partners.value.find((p) => p.id === id);
      partners.value = partners.value.filter((p) => p.id !== id);

      // Notify all components about the deleted partner
      notifyPartnerChange("deleted", { id, name: deletedPartner?.name });
    } catch (err) {
      error.value = err.message || "Failed to delete partner";
      console.error("Error deleting partner:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Computed properties for different formats
  const partnersForSlider = computed(() => {
    const partnersArray = Array.isArray(partners.value) ? partners.value : [];
    return partnersArray.map((partner) => ({
      name: partner.name,
      image: partner.logo || "/images/placeholder-logo.png",
    }));
  });

  const partnersForManagement = computed(() => {
    const partnersArray = Array.isArray(partners.value) ? partners.value : [];
    return partnersArray.map((partner) => ({
      id: partner.id,
      name: partner.name,
      logo: partner.logo || "/images/placeholder-logo.png",
      type: partner.description || "Partner",
      website: partner.website,
      description: partner.description,
      createdAt: partner.createdAt,
      updatedAt: partner.updatedAt,
    }));
  });

  // Subscribe to partner changes
  const onPartnerChange = (callback) => {
    partnerChangeCallbacks.add(callback);

    // Return unsubscribe function
    return () => {
      partnerChangeCallbacks.delete(callback);
    };
  };

  return {
    partners,
    partnersForSlider,
    partnersForManagement,
    loading,
    error,
    fetchPartners,
    createPartner,
    updatePartner,
    deletePartner,
    // Add a refresh method that other components can call
    refreshPartners: () => fetchPartners(true),
    // Add method to check if data is fresh
    isDataFresh: () => {
      if (!lastFetchTime.value) return false;
      const timeSinceLastFetch = Date.now() - lastFetchTime.value;
      return timeSinceLastFetch < CACHE_TIMEOUT;
    },
    // Add event subscription
    onPartnerChange,
    // Expose helper functions for debugging
    getAuthToken,
    checkAdminPermissions,
    logAuthState,
    apiUrls,
  };
};
