// Immediate Upload Authentication Diagnostic
// Paste this into browser console on your admin page

const immediateUploadDiagnosis = async () => {
  console.log("🔧 IMMEDIATE UPLOAD DIAGNOSIS");
  console.log("==============================");

  try {
    // Check if we have the required functions
    if (typeof useAuthStore === "undefined") {
      console.error(
        "❌ useAuthStore not available. Make sure you're on an admin page."
      );
      return;
    }

    if (typeof useAuth === "undefined") {
      console.error(
        "❌ useAuth not available. Make sure you're on an admin page."
      );
      return;
    }

    const authStore = useAuthStore();
    const { getAuthHeaders } = useAuth();

    // 1. Basic Auth Check
    console.log("\n1️⃣ BASIC AUTH CHECK:");
    console.log("- Is Authenticated:", authStore.isAuthenticated);
    console.log("- Has Access Token:", !!authStore.accessToken);
    console.log("- Has Refresh Token:", !!authStore.refreshToken);
    console.log("- User Role:", authStore.user?.role);
    console.log("- Has Admin Access:", authStore.hasAdminAccess);

    if (!authStore.isAuthenticated) {
      console.error("❌ Not authenticated! Please log in first.");
      return;
    }

    if (!authStore.hasAdminAccess) {
      console.error("❌ No admin access! Current role:", authStore.user?.role);
      console.error("   Required: ADMIN or EDITOR");
      return;
    }

    // 2. Token Analysis
    console.log("\n2️⃣ TOKEN ANALYSIS:");
    if (authStore.accessToken) {
      try {
        const parts = authStore.accessToken.split(".");
        if (parts.length === 3) {
          const payload = JSON.parse(
            atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
          );
          const now = Date.now() / 1000;
          const isExpired = payload.exp < now;
          const timeLeft = payload.exp - now;

          console.log("- Token User:", payload.email);
          console.log("- Token Role:", payload.role);
          console.log(
            "- Expires:",
            new Date(payload.exp * 1000).toLocaleString()
          );
          console.log("- Is Expired:", isExpired);
          console.log("- Time Left:", Math.floor(timeLeft / 60), "minutes");

          if (isExpired) {
            console.error("❌ TOKEN IS EXPIRED! This is likely the cause.");
            console.log(
              "💡 Try refreshing the page or logging out and back in."
            );
          } else if (timeLeft < 300) {
            console.warn("⚠️ Token expires soon. Consider refreshing.");
          } else {
            console.log("✅ Token is valid");
          }
        } else {
          console.error("❌ Invalid token format");
        }
      } catch (e) {
        console.error("❌ Token parsing failed:", e);
      }
    } else {
      console.error("❌ No access token found");
    }

    // 3. Headers Check
    console.log("\n3️⃣ HEADERS CHECK:");
    const headers = getAuthHeaders(true); // For FormData
    console.log(
      "- Authorization Header:",
      headers.Authorization ? "Present" : "Missing"
    );
    if (headers.Authorization) {
      console.log(
        "- Header Format:",
        headers.Authorization.substring(0, 20) + "..."
      );
      console.log(
        "- Starts with 'Bearer ':",
        headers.Authorization.startsWith("Bearer ")
      );
    }

    // 4. API Endpoint Test
    console.log("\n4️⃣ API ENDPOINT TESTS:");

    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase || "http://localhost:3005";
    console.log("- API Base URL:", apiBase);

    // Test admin endpoint first
    console.log("\n   Testing admin dashboard...");
    try {
      const adminResponse = await fetch(`${apiBase}/api/admin/dashboard`, {
        method: "GET",
        headers: getAuthHeaders(false),
      });
      console.log("   Admin endpoint status:", adminResponse.status);
      if (adminResponse.ok) {
        console.log("   ✅ Admin authentication working");
      } else {
        console.log("   ❌ Admin endpoint failed");
        const errorText = await adminResponse.text();
        console.log("   Error:", errorText);
      }
    } catch (e) {
      console.error("   ❌ Admin endpoint error:", e);
    }

    // Test upload endpoint access
    console.log("\n   Testing upload endpoint access...");
    try {
      const uploadResponse = await fetch(`${apiBase}/api/upload`, {
        method: "GET", // This should return 405 if auth works
        headers: getAuthHeaders(false),
      });
      console.log("   Upload endpoint status:", uploadResponse.status);

      if (uploadResponse.status === 405) {
        console.log(
          "   ✅ Upload endpoint accessible (405 = Method Not Allowed for GET)"
        );
      } else if (uploadResponse.status === 401) {
        console.log("   ❌ Upload endpoint returns 401 - AUTH ISSUE CONFIRMED");
        const errorText = await uploadResponse.text();
        console.log("   Error details:", errorText);
      } else {
        console.log("   ℹ️ Unexpected status:", uploadResponse.status);
      }
    } catch (e) {
      console.error("   ❌ Upload endpoint error:", e);
    }

    // 5. Recommendations
    console.log("\n5️⃣ RECOMMENDATIONS:");

    if (authStore.accessToken) {
      try {
        const parts = authStore.accessToken.split(".");
        if (parts.length === 3) {
          const payload = JSON.parse(
            atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
          );
          const now = Date.now() / 1000;

          if (payload.exp < now) {
            console.log("🔄 Token is expired - try: location.reload()");
          } else if (!["ADMIN", "EDITOR"].includes(payload.role)) {
            console.log(
              "🔐 Role issue - contact admin to change your role to ADMIN or EDITOR"
            );
          } else {
            console.log("🔍 Token and role look good - check backend logs");
            console.log("🔍 Backend might not be properly validating the JWT");
          }
        }
      } catch (e) {
        console.log("🔄 Token format issue - try logging out and back in");
      }
    } else {
      console.log("🔑 No token - please log in");
    }
  } catch (error) {
    console.error("❌ Diagnosis failed:", error);
  }

  console.log("\n==============================");
};

// Make it available globally
if (typeof window !== "undefined") {
  window.immediateUploadDiagnosis = immediateUploadDiagnosis;
}

console.log("🔧 Immediate Upload Diagnosis loaded!");
console.log("Run: immediateUploadDiagnosis()");
