import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useAuth } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuth();

  // If user is authenticated, redirect to admin dashboard
  if (auth.accessToken) {
    return navigateTo("/admin");
  }
});
