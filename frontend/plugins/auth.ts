import { useAuth } from "~/composables/useAuth";
import { useApi } from "~/composables/useApi";
import type { RouteMetaAuth } from "~/types/route";

export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuth();
  const api = useApi();

  // Initialize authentication state
  async function initializeAuth() {
    if (process.client) {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          auth.setLoading(true);
          const data = await api.get("/auth/verify", {
            requiresAuth: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          auth.setUser(data.user);
          auth.setAccessToken(token);
        } catch (error) {
          console.error("Error verifying auth token:", error);
          auth.logout();
        } finally {
          auth.setLoading(false);
        }
      }
    }
  }

  // Add route middleware
  nuxtApp.hooks.hook("app:mounted", () => {
    const router = useRouter();

    router.beforeEach(async (to) => {
      const meta = to.meta as RouteMetaAuth;

      // Handle authentication routes
      if (to.path === "/auth/login") {
        if (auth.accessToken) {
          return navigateTo("/admin");
        }
        return;
      }

      // Check if route requires authentication
      if (meta.requiresAuth) {
        if (!auth.accessToken) {
          return navigateTo("/auth/login");
        }

        // Check if user data is loaded
        if (!auth.user && auth.accessToken) {
          await initializeAuth();
        }

        // Check role requirements
        if (meta.roles && !auth.hasRole(meta.roles)) {
          return navigateTo("/403");
        }
      }
    });
  });

  // Initialize auth state
  await initializeAuth();
});
