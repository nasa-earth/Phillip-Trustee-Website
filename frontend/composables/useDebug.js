// Debug utility for authentication issues
export const useDebug = () => {
  const logAuthState = () => {
    const authStore = useAuthStore();

    console.group("🔍 Authentication Debug");
    console.log("Is Authenticated:", authStore.isAuthenticated);
    console.log(
      "Access Token:",
      authStore.accessToken ? "✅ Present" : "❌ Missing"
    );
    console.log(
      "Refresh Token:",
      authStore.refreshToken ? "✅ Present" : "❌ Missing"
    );
    console.log("User:", authStore.user);
    console.log("User Role:", authStore.user?.role);

    // Check localStorage
    if (typeof window !== "undefined") {
      console.log(
        "LocalStorage Access Token:",
        localStorage.getItem("access_token") ? "✅ Present" : "❌ Missing"
      );
      console.log(
        "LocalStorage Refresh Token:",
        localStorage.getItem("refresh_token") ? "✅ Present" : "❌ Missing"
      );
      console.log("LocalStorage User:", localStorage.getItem("user"));
    }

    console.groupEnd();
  };

  const testApiCall = async (endpoint, method = "GET", body = null) => {
    const { getAuthHeaders } = useAuth();
    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase || "http://localhost:3005";

    console.group(`🧪 Testing API Call: ${method} ${endpoint}`);

    try {
      const headers = getAuthHeaders();
      console.log("Headers:", headers);

      const options = {
        method,
        headers,
      };

      if (body && method !== "GET") {
        options.body = body;
      }

      const response = await $fetch(`${apiBase}${endpoint}`, options);
      console.log("✅ Success:", response);
      return { success: true, data: response };
    } catch (error) {
      console.log("❌ Error:", error);
      return { success: false, error };
    } finally {
      console.groupEnd();
    }
  };

  return {
    logAuthState,
    testApiCall,
  };
};
