// middleware/admin.js
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip on server-side rendering
  if (process.server) {
    return;
  }

  const authStore = useAuthStore();

  // Wait for auth to be ready if still loading
  if (authStore.isLoading) {
    console.log("Auth still loading, waiting...");
    // Simple wait for auth to be ready
    let attempts = 0;
    while (authStore.isLoading && attempts < 10) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      attempts++;
    }
  }

  console.log("Admin middleware check:", {
    isAuthenticated: authStore.isAuthenticated,
    hasAdminAccess: authStore.hasAdminAccess,
    user: authStore.user?.email,
    role: authStore.user?.role,
  });

  // Check if user is authenticated
  if (!authStore.isAuthenticated || !authStore.accessToken) {
    console.warn("User not authenticated, redirecting to login");
    return navigateTo("/login");
  }

  // Check if user has admin access (ADMIN or EDITOR role)
  if (!authStore.hasAdminAccess) {
    console.warn(
      "User doesn't have admin access, redirecting to login with error"
    );
    await authStore.logout();
    return navigateTo("/login?error=access_denied");
  }

  console.log("Admin access granted for:", authStore.user.email);
});
