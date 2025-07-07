// Test script to verify authentication and API endpoints
// Run this in the browser console to debug issues

const testAuth = async () => {
  console.group("🔍 Authentication & API Test");

  try {
    // Get auth store
    const authStore = useAuthStore();
    console.log("Auth Store State:", {
      isAuthenticated: authStore.isAuthenticated,
      hasAccessToken: !!authStore.accessToken,
      hasRefreshToken: !!authStore.refreshToken,
      userRole: authStore.user?.role,
      userName: authStore.user?.name,
    });

    if (!authStore.isAuthenticated) {
      console.error("❌ User is not authenticated");
      return;
    }

    // Test headers
    const { getAuthHeaders } = useAuth();
    const headers = getAuthHeaders();
    console.log("Auth Headers:", headers);

    // Test API endpoints
    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase || "http://localhost:3005";
    console.log("API Base URL:", apiBase);

    // Test events endpoint
    console.log("\n📋 Testing Events Endpoint...");
    try {
      const eventsResponse = await $fetch(`${apiBase}/api/events`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      console.log("✅ Events API Success:", eventsResponse);
    } catch (eventsError) {
      console.error("❌ Events API Error:", eventsError);
    }

    // Test upload endpoint with a GET request (to check if it's accessible)
    console.log("\n📤 Testing Upload Endpoint Access...");
    try {
      const uploadResponse = await $fetch(`${apiBase}/api/upload`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      console.log("✅ Upload API Access Success:", uploadResponse);
    } catch (uploadError) {
      console.error("❌ Upload API Access Error:", uploadError);
      if (uploadError.status === 405) {
        console.log(
          "ℹ️ 405 error is expected for GET on upload endpoint (only POST is allowed)"
        );
      }
    }
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    console.groupEnd();
  }
};

// Export for manual testing
window.testAuth = testAuth;

console.log(
  "🧪 Authentication test loaded. Run window.testAuth() in console to test."
);
