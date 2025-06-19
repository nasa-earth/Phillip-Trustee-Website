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
  // Check if the user has ADMIN or EDITOR role
  if (
    !authStore.user ||
    (authStore.user.role !== "ADMIN" && authStore.user.role !== "EDITOR")
  ) {
    console.warn(
      "User doesn't have required permissions, redirecting to login with error"
    );
    authStore.logout();
    return navigateTo("/login?error=access_denied");
  }

  console.log(
    `User is authenticated and has ${authStore.user.role} role, allowing access`
  );
});
