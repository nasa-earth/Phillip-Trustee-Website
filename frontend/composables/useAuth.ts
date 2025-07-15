import { useAuthStore } from "~/stores/auth";

export const useAuth = () => {
  const authStore = useAuthStore();

  // Helper function to get auth headers for API requests
  const getAuthHeaders = (isFormData = false) => {
    const headers: Record<string, string> = {};

    // Only set Content-Type for non-FormData requests
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    // Ensure we have a valid token before adding it
    if (authStore.accessToken && authStore.isAuthenticated) {
      headers["Authorization"] = `Bearer ${authStore.accessToken}`;
    } else {
      console.warn("No valid auth token available for API request");
    }

    return headers;
  };

  // Check authentication status with detailed logging
  const checkAuthStatus = () => {
    const status = {
      isAuthenticated: authStore.isAuthenticated,
      hasAccessToken: !!authStore.accessToken,
      hasRefreshToken: !!authStore.refreshToken,
      userRole: (authStore.user as any)?.role,
      hasAdminAccess: authStore.hasAdminAccess,
      tokenLength: (authStore.accessToken as any)?.length || 0,
    };

    console.log("Auth Status Check:", status);
    return status;
  };

  // Verify token format
  const isValidTokenFormat = (token: string) => {
    if (!token) return false;
    const parts = token.split(".");
    return parts.length === 3; // JWT should have 3 parts
  };

  return {
    getAuthHeaders,
    checkAuthStatus,
    isValidTokenFormat,
  };
};
