// Debug script for file upload authentication issues
// Run this in the browser console on your admin dashboard

console.log("🔧 File Upload Authentication Debug Script Loaded");

const debugUploadAuth = async () => {
  console.group("🔍 Upload Authentication Debug");

  try {
    // Check if composables are available
    if (typeof useAuth === "undefined" || typeof useAuthStore === "undefined") {
      console.error("❌ useAuth or useAuthStore not available");
      console.log("ℹ️ Make sure you're on a page that loads the composables");
      return;
    }

    // Get auth composables
    const { getAuthHeaders, checkAuthStatus } = useAuth();
    const authStore = useAuthStore();

    console.log("📊 Auth Store Status:");
    console.log("- Is Authenticated:", authStore.isAuthenticated);
    console.log("- User Role:", authStore.user?.role);
    console.log("- Has Access Token:", !!authStore.accessToken);
    console.log("- Has Refresh Token:", !!authStore.refreshToken);
    console.log(
      "- Token Preview:",
      authStore.accessToken
        ? `${authStore.accessToken.substring(0, 20)}...`
        : "NO TOKEN"
    );

    // Check auth status
    const authStatus = checkAuthStatus();
    console.log("🔍 Detailed Auth Status:", authStatus);

    // Test auth headers
    const headers = getAuthHeaders(true); // For FormData
    console.log("📤 Auth Headers for Upload:", headers);
    console.log("- Authorization Header:", headers.Authorization || "MISSING");

    // Test a simple authenticated endpoint first
    console.log("\n🧪 Testing Simple Authenticated Endpoint...");
    try {
      const config = useRuntimeConfig();
      const apiBase = config.public.apiBase || "http://localhost:3005";

      const testResponse = await fetch(`${apiBase}/api/admin/dashboard`, {
        method: "GET",
        headers: getAuthHeaders(false), // Regular headers
      });

      console.log("✅ Test Endpoint Status:", testResponse.status);
      if (!testResponse.ok) {
        const errorText = await testResponse.text();
        console.log("❌ Test Endpoint Error:", errorText);
      } else {
        console.log("✅ Authentication is working for regular endpoints");
      }
    } catch (error) {
      console.error("❌ Test Endpoint Failed:", error);
    }

    // Test token validity
    if (authStore.accessToken) {
      try {
        const tokenParts = authStore.accessToken.split(".");
        if (tokenParts.length === 3) {
          const payload = JSON.parse(
            atob(tokenParts[1].replace(/-/g, "+").replace(/_/g, "/"))
          );
          const now = Date.now() / 1000;

          console.log("\n🔐 Token Analysis:");
          console.log("- User ID:", payload.sub);
          console.log("- Email:", payload.email);
          console.log("- Role:", payload.role);
          console.log(
            "- Expires At:",
            new Date(payload.exp * 1000).toLocaleString()
          );
          console.log("- Is Expired:", payload.exp < now);
          console.log(
            "- Time Until Expiry:",
            Math.floor((payload.exp - now) / 60),
            "minutes"
          );

          if (payload.exp < now) {
            console.warn("⚠️ TOKEN IS EXPIRED! This explains the 401 error.");
            console.log(
              "💡 Try refreshing the page or logging out and back in."
            );
          }

          if (!["ADMIN", "EDITOR"].includes(payload.role)) {
            console.warn("⚠️ USER ROLE ISSUE:");
            console.warn(
              `Your role is '${payload.role}' but upload requires ADMIN or EDITOR role.`
            );
          }
        }
      } catch (e) {
        console.error("Failed to decode token:", e);
      }
    }

    // Check localStorage
    console.log("\n💾 LocalStorage Check:");
    console.log(
      "- access_token:",
      localStorage.getItem("access_token") ? "Present" : "Missing"
    );
    console.log(
      "- refresh_token:",
      localStorage.getItem("refresh_token") ? "Present" : "Missing"
    );
    console.log("- user data:", localStorage.getItem("user") || "Missing");
  } catch (error) {
    console.error("❌ Debug failed:", error);
  }

  console.groupEnd();
};

// Test upload function
const testUpload = async () => {
  console.group("📤 Upload Test");

  try {
    if (typeof useFileUpload === "undefined") {
      console.error("❌ useFileUpload not available");
      return;
    }

    const { testAuth } = useFileUpload();

    if (typeof testAuth === "function") {
      console.log("🧪 Running upload authentication test...");
      await testAuth();
    } else {
      console.log("ℹ️ testAuth function not available in useFileUpload");
    }
  } catch (error) {
    console.error("❌ Upload test failed:", error);
  }

  console.groupEnd();
};

// Quick token refresh function
const tryTokenRefresh = async () => {
  console.log("🔄 Attempting to refresh token...");

  try {
    const authStore = useAuthStore();
    const success = await authStore.refreshAccessToken();

    if (success) {
      console.log("✅ Token refreshed successfully!");
      console.log("Try your upload operation again.");
    } else {
      console.log("❌ Token refresh failed. Please log out and back in.");
    }
  } catch (error) {
    console.error("❌ Token refresh error:", error);
  }
};

// Make functions available globally
if (typeof window !== "undefined") {
  window.debugUploadAuth = debugUploadAuth;
  window.testUpload = testUpload;
  window.tryTokenRefresh = tryTokenRefresh;
}

console.log("🔧 Upload Debug Tools loaded!");
console.log("📋 Available commands:");
console.log("- debugUploadAuth() - Diagnose authentication issues");
console.log("- testUpload() - Test upload authentication");
console.log("- tryTokenRefresh() - Attempt to refresh expired token");
