<!-- Admin layout with sidebar navigation -->
<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md">
      <div class="flex items-center justify-center h-16 bg-gray-800">
        <h2 class="text-white text-xl font-semibold">Admin Dashboard</h2>
      </div>
      <nav class="mt-6">
        <NuxtLink
          v-for="item in filteredMenuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          :class="{ 'bg-gray-100 text-gray-800': isCurrentPath(item.path) }"
        >
          <span class="mx-3">{{ item.name }}</span>
        </NuxtLink>
      </nav>
    </aside>
    <!-- Main content -->
    <div class="flex-1 overflow-x-hidden overflow-y-auto">
      <!-- Top header -->
      <AdminHeader />

      <!-- Page content -->
      <main class="p-6">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-2xl font-semibold text-gray-800 mb-6">
            {{ currentPageTitle }}
          </h1>
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAuth } from "~/composables/useAuth";

const auth = useAuth();
const router = useRouter();
const route = useRoute();

import type { Role } from "~/composables/useAuth";

interface MenuItem {
  name: string;
  path: string;
  roles: Role[];
}

// Define menu items with their required roles
const menuItems: MenuItem[] = [
  { name: "Dashboard", path: "/admin", roles: ["ADMIN", "EDITOR"] },
  { name: "Posts", path: "/admin/posts", roles: ["ADMIN", "EDITOR"] },
  { name: "Pages", path: "/admin/pages", roles: ["ADMIN", "EDITOR"] },
  { name: "Categories", path: "/admin/categories", roles: ["ADMIN", "EDITOR"] },
  { name: "Partners", path: "/admin/partners", roles: ["ADMIN", "EDITOR"] },
  { name: "FAQs", path: "/admin/faqs", roles: ["ADMIN", "EDITOR"] },
  { name: "Events", path: "/admin/events", roles: ["ADMIN", "EDITOR"] },
  { name: "Users", path: "/admin/users", roles: ["ADMIN"] },
  { name: "Settings", path: "/admin/settings", roles: ["ADMIN"] },
];

// Filter menu items based on user role
const filteredMenuItems = computed(() => {
  return menuItems.filter((item) =>
    item.roles.some((role) => auth.hasRole(role))
  );
});

// Get current page title from active menu item
const currentPageTitle = computed(() => {
  const currentItem = menuItems.find((item) => isCurrentPath(item.path));
  return currentItem?.name || "Dashboard";
});

const isCurrentPath = (path: string) => {
  return route.path === path || route.path.startsWith(`${path}/`);
};

const handleLogout = async () => {
  auth.logout();
  await router.push("/auth/login");
};

// Middleware to check authentication
definePageMeta({
  middleware: "auth",
  layout: "admin",
});
</script>
