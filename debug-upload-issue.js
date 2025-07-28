// Debug script to test upload functionality directly
// Run this in the browser console on the admin page

async function debugUpload() {
  console.log("=== UPLOAD DEBUG TEST ===");

  // Get auth store
  const authStore = useAuthStore();
  console.log("Auth Store State:", {
    isAuthenticated: authStore.isAuthenticated,
    hasToken: !!authStore.accessToken,
    tokenLength: authStore.accessToken?.length,
    userRole: authStore.user?.role,
    hasRefreshToken: !!authStore.refreshToken,
  });

  // Check token format
  if (authStore.accessToken) {
    const tokenParts = authStore.accessToken.split(".");
    console.log("Token Parts:", tokenParts.length);

    if (tokenParts.length === 3) {
      try {
        const payload = JSON.parse(
          atob(tokenParts[1].replace(/-/g, "+").replace(/_/g, "/"))
        );
        const now = Math.floor(Date.now() / 1000);
        console.log("Token Payload:", {
          sub: payload.sub,
          email: payload.email,
          role: payload.role,
          exp: payload.exp,
          expiresAt: new Date(payload.exp * 1000).toLocaleString(),
          isExpired: payload.exp < now,
          timeUntilExpiry: payload.exp - now,
        });
      } catch (e) {
        console.error("Failed to decode token:", e);
      }
    }
  }

  // Test API connectivity first
  console.log("\n=== TESTING API CONNECTIVITY ===");
  const apiBase = "http://localhost:3005";

  try {
    // Test with current token
    const headers = {
      Authorization: `Bearer ${authStore.accessToken}`,
    };

    console.log("Testing with headers:", headers);

    const response = await fetch(`${apiBase}/api/admin/events?page=1&limit=1`, {
      method: "GET",
      headers: headers,
    });

    console.log("API Test Response:", response.status, response.statusText);

    if (response.ok) {
      console.log("✅ API connectivity working");
    } else {
      console.log("❌ API connectivity failed");
      const errorText = await response.text();
      console.log("Error:", errorText);
    }
  } catch (error) {
    console.error("API Test Error:", error);
  }

  // Create a test file
  console.log("\n=== TESTING FILE UPLOAD ===");

  // Create a small test image (1x1 pixel PNG)
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(0, 0, 1, 1);

  canvas.toBlob(async (blob) => {
    const testFile = new File([blob], "test-image.png", { type: "image/png" });
    console.log("Created test file:", {
      name: testFile.name,
      size: testFile.size,
      type: testFile.type,
    });

    // Test upload
    const formData = new FormData();
    formData.append("file", testFile);
    formData.append("type", "thumbnail");

    const uploadHeaders = {
      Authorization: `Bearer ${authStore.accessToken}`,
    };

    console.log("Upload headers:", uploadHeaders);

    try {
      const uploadResponse = await fetch(`${apiBase}/api/upload`, {
        method: "POST",
        headers: uploadHeaders,
        body: formData,
      });

      console.log(
        "Upload Response:",
        uploadResponse.status,
        uploadResponse.statusText
      );

      if (uploadResponse.ok) {
        const result = await uploadResponse.json();
        console.log("✅ Upload successful:", result);
      } else {
        const errorText = await uploadResponse.text();
        console.log("❌ Upload failed:", errorText);

        // Try token refresh and retry if 401
        if (uploadResponse.status === 401) {
          console.log("Attempting token refresh...");
          const refreshSuccess = await authStore.refreshAccessToken();
          console.log("Refresh result:", refreshSuccess);

          if (refreshSuccess) {
            console.log("Retrying upload with new token...");
            const newHeaders = {
              Authorization: `Bearer ${authStore.accessToken}`,
            };

            const retryResponse = await fetch(`${apiBase}/api/upload`, {
              method: "POST",
              headers: newHeaders,
              body: formData,
            });

            console.log(
              "Retry Response:",
              retryResponse.status,
              retryResponse.statusText
            );

            if (retryResponse.ok) {
              const retryResult = await retryResponse.json();
              console.log("✅ Retry upload successful:", retryResult);
            } else {
              const retryErrorText = await retryResponse.text();
              console.log("❌ Retry upload failed:", retryErrorText);
            }
          }
        }
      }
    } catch (error) {
      console.error("Upload Error:", error);
    }
  }, "image/png");

  console.log("=== DEBUG TEST COMPLETE ===");
}

// Auto-run if possible
if (typeof window !== "undefined" && window.useAuthStore) {
  debugUpload();
} else {
  console.log("Run debugUpload() manually in the browser console");
}
