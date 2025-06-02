import { useAuth } from "~/composables/useAuth";
import type { RouteMetaAuth } from "~/types/route";

export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuth();

  // Check for stored token on app init
  const token = localStorage.getItem("access_token");
  if (token) {
    try {
      // Verify token and get user data
      const response = await fetch("http://localhost:3005/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        auth.setUser(data.user);
        auth.setAccessToken(token);
      } else {
        // Token is invalid, clear authentication
        auth.logout();
      }
    } catch (error) {
      console.error("Error verifying auth token:", error);
      auth.logout();
    }
  }
  // Add route middleware
  nuxtApp.hooks.hook("app:mounted", () => {
    const router = useRouter();

    router.beforeEach((to) => {
      const meta = to.meta as RouteMetaAuth;

      // Check if route requires authentication
      if (meta.requiresAuth && !auth.accessToken) {
        return navigateTo("/auth/login");
      }

      // Check if route requires specific roles
      if (meta.roles && !auth.hasRole(meta.roles)) {
        return navigateTo("/403");
      }
    });
  });
});
