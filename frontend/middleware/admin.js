// middleware/admin.js
export default defineNuxtRouteMiddleware((to, from) => {
  // If we're on the server, we can't access localStorage
  if (process.server) {
    console.log("Admin middleware running on server, skipping checks");
    return;
  }

  console.log("Admin middleware running", { to, from });
  const authStore = useAuthStore();

  // If the user is not authenticated, redirect to login
  if (!authStore.isAuthenticated) {
    console.warn("User is not authenticated, redirecting to login");
    return navigateTo("/login");
  }

  console.log("User authenticated, checking role:", authStore.user);

  // If the user is not an admin, redirect to login with error
  if (!authStore.user || authStore.user.role !== "ADMIN") {
    console.warn("User is not an admin, redirecting to login with error");
    authStore.logout();
    return navigateTo("/login?error=access_denied");
  }

  console.log("User is authenticated and has admin role, allowing access");
});
