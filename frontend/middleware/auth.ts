import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useAuth } from "~/composables/useAuth";
import type { RouteMetaAuth } from "~/types/route";

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuth();

  // Prevent authenticated users from accessing login page
  if (to.path === "/auth/login" && auth.accessToken) {
    return navigateTo("/admin");
  }

  const meta = to.meta as RouteMetaAuth;

  // Check if the route requires authentication
  if (meta.requiresAuth && !auth.accessToken) {
    return navigateTo("/auth/login");
  }

  // Check if the route requires specific roles
  if (meta.roles && !auth.hasRole(meta.roles)) {
    return navigateTo("/403");
  }
});
