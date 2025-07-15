// plugins/auth.js
export default defineNuxtPlugin(async () => {
  // Only run on client-side
  if (process.client) {
    const authStore = useAuthStore();

    console.log("Initializing auth from storage...");
    await authStore.initFromStorage();

    console.log("Auth initialized:", {
      isAuthenticated: authStore.isAuthenticated,
      hasAdminAccess: authStore.hasAdminAccess,
      user: authStore.user?.email,
      role: authStore.user?.role,
    });
  }
});
