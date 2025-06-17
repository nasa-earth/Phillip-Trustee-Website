// plugins/auth.js
export default defineNuxtPlugin(({ app }) => {
  // Wait until client-side to run this
  if (process.client) {
    console.log("Auth plugin running on client");
    const authStore = useAuthStore();
    authStore.initFromStorage();

    // Log authentication state
    console.log("Auth state initialized:", {
      isAuthenticated: authStore.isAuthenticated,
      user: authStore.user,
      hasAccessToken: !!authStore.accessToken,
      hasRefreshToken: !!authStore.refreshToken,
    });
  }
});
