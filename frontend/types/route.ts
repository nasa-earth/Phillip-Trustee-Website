import type { Role } from "~/composables/useAuth";

export interface RouteMetaAuth {
  requiresAuth?: boolean;
  roles?: Role | Role[];
}

declare module "#app" {
  interface PageMeta extends RouteMetaAuth {}
}
