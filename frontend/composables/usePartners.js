import { ref, computed } from "vue";
import { useAuthStore } from "~/stores/auth";

export const usePartners = () => {
  const authStore = useAuthStore();
  const partners = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Temporarily hard-code the API URL to test
  const API_BASE = "http://localhost:3005";
  const apiUrls = {
    partners: {
      list: `${API_BASE}/api/partners`,
      get: (id) => `${API_BASE}/api/partners/${id}`,
      create: `${API_BASE}/api/partners`,
      update: (id) => `${API_BASE}/api/partners/${id}`,
      delete: (id) => `${API_BASE}/api/partners/${id}`,
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

    // Check if user has admin role from the auth store
    if (!authStore.isAdmin) {
      throw new Error(
        "Admin privileges required. Please contact an administrator."
      );
    }

    return true;
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
  const fetchPartners = async () => {
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

      const authToken = getAuthToken();
      console.log("Creating partner");
      console.log("Create URL:", apiUrls.partners.create);
      console.log("Auth token available:", !!authToken);
      console.log(
        "Auth token (first 20 chars):",
        authToken ? authToken.substring(0, 20) + "..." : "No token"
      );

      const headers = createHeaders(true);
      console.log("Request headers:", headers);

      const response = await fetch(apiUrls.partners.create, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(partnerData),
      });

      console.log("Create response status:", response.status);

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
          }
        } catch (parseError) {
          console.log("Could not parse error response:", parseError);
        }

        throw new Error(errorMessage);
      }

      const newPartner = await response.json();
      partners.value.unshift(newPartner);
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

      const authToken = getAuthToken();
      console.log("Updating partner with ID:", id);
      console.log("Update URL:", apiUrls.partners.update(id));
      console.log("Auth token available:", !!authToken);
      console.log(
        "Auth token (first 20 chars):",
        authToken ? authToken.substring(0, 20) + "..." : "No token"
      );

      const headers = createHeaders(true);
      console.log("Request headers:", headers);

      const response = await fetch(apiUrls.partners.update(id), {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(partnerData),
      });

      console.log("Update response status:", response.status);
      console.log(
        "Update response headers:",
        Object.fromEntries(response.headers.entries())
      );

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
      const index = partners.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        partners.value[index] = updatedPartner;
      }
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
      checkAdminPermissions(); // Check admin permissions

      const authToken = getAuthToken();
      console.log("Deleting partner with ID:", id);
      console.log("Delete URL:", apiUrls.partners.delete(id));
      console.log("Auth token available:", !!authToken);
      console.log(
        "Auth token (first 20 chars):",
        authToken ? authToken.substring(0, 20) + "..." : "No token"
      );

      const headers = createHeaders(true);
      console.log("Request headers:", headers);

      const response = await fetch(apiUrls.partners.delete(id), {
        method: "DELETE",
        headers: headers,
      });

      console.log("Delete response status:", response.status);
      console.log(
        "Delete response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log("Delete error data:", errorData);
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      partners.value = partners.value.filter((p) => p.id !== id);
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
    // Expose helper functions for debugging
    getAuthToken,
    checkAdminPermissions,
    logAuthState,
    apiUrls,
  };
};
