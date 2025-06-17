// router/middleware/auth.js
export default function ({ to, next, store }) {
  // Check if route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if user is authenticated
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated) {
      // User is not authenticated, redirect to login page
      return next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }

    // Check if route is admin only
    if (to.matched.some((record) => record.meta.adminOnly)) {
      // Check if user is an admin
      if (!authStore.user || authStore.user.role !== "ADMIN") {
        authStore.logout();
        // User is not an admin, redirect to login page with error
        return next({
          path: "/login",
          query: { error: "access_denied" },
        });
      }
    }
  }

  // Continue navigation
  return next();
}
