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

    if (authStore.accessToken) {
      headers["Authorization"] = `Bearer ${authStore.accessToken}`;
    }

    return headers;
  };

  return {
    getAuthHeaders,
  };
};
