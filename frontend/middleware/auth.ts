// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // If we're on the server, we can't access localStorage, so let the auth plugin handle it
  if (process.server) return;

  const authStore = useAuthStore();

  // If the user is not authenticated and trying to access a protected route
  if (!authStore.isAuthenticated && to.meta.requiresAuth) {
    return navigateTo("/login");
  }

  // If the user is authenticated and trying to access login/register pages
  if (authStore.isAuthenticated && to.meta.guestOnly) {
    return navigateTo("/");
  }
});
