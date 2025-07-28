// Debug script for event upload testing
// Run this in the browser console on the EventsManagement page

console.log("🔧 Event Upload Debug Script Loaded");

const debugEventUpload = async () => {
  console.group("🔍 Event Upload Debug");

  try {
    // Check if we're on the right page
    const eventsManagementComponent =
      document.querySelector(".events-management");
    if (!eventsManagementComponent) {
      console.error("❌ Not on EventsManagement page");
      console.log("ℹ️ Make sure you're on the admin events management page");
      return;
    }

    // Check if Vue app and components are available
    const app = document.querySelector("#__nuxt")?.__vue_app__;
    if (!app) {
      console.error("❌ Vue app not found");
      return;
    }

    console.log("✅ Vue app found");

    // Test file upload composable
    if (typeof useFileUpload !== "undefined") {
      console.log("✅ useFileUpload composable available");

      const { testAuth } = useFileUpload();
      if (typeof testAuth === "function") {
        console.log("🧪 Running upload authentication test...");
        await testAuth();
      } else {
        console.log("ℹ️ testAuth function not available");
      }
    } else {
      console.error("❌ useFileUpload not available");
    }

    // Check auth store
    if (typeof useAuthStore !== "undefined") {
      const authStore = useAuthStore();
      console.log("📊 Auth Store Status:");
      console.log("- Is Authenticated:", authStore.isAuthenticated);
      console.log("- User Role:", authStore.user?.role);
      console.log("- Has Access Token:", !!authStore.accessToken);
      console.log("- Has Admin Access:", authStore.hasAdminAccess);
    } else {
      console.error("❌ useAuthStore not available");
    }

    // Create a test file for upload
    console.log("🧪 Creating test file...");
    const testFileContent = "Test image content for upload debugging";
    const testFile = new File([testFileContent], "test-image.jpg", {
      type: "image/jpeg",
      lastModified: Date.now(),
    });

    console.log("Test file created:", {
      name: testFile.name,
      size: testFile.size,
      type: testFile.type,
    });

    // Test the upload function if available
    if (typeof useFileUpload !== "undefined") {
      try {
        const { uploadFile } = useFileUpload();
        console.log("🚀 Testing upload function...");

        const uploadResult = await uploadFile(testFile, "test");
        console.log("✅ Upload test successful:", uploadResult);
      } catch (uploadError) {
        console.error("❌ Upload test failed:", uploadError);
        console.error("Error details:", {
          message: uploadError.message,
          status: uploadError.status,
          statusCode: uploadError.statusCode,
        });
      }
    }
  } catch (error) {
    console.error("❌ Debug script failed:", error);
  }

  console.groupEnd();
};

// Auto-run after a short delay
setTimeout(() => {
  debugEventUpload();
}, 1000);

// Export for manual running
window.debugEventUpload = debugEventUpload;

console.log(
  "ℹ️ Run 'debugEventUpload()' in console to test upload functionality"
);
