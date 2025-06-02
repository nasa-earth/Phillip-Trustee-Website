<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Dashboard cards -->
      <div
        v-for="stat in filteredStats"
        :key="stat.name"
        class="bg-white rounded-lg shadow p-6"
      >
        <div class="flex items-center">
          <div class="flex-1">
            <h3 class="text-lg font-medium text-gray-900">{{ stat.name }}</h3>
            <p class="mt-1 text-3xl font-semibold text-gray-600">
              {{ stat.value }}
            </p>
          </div>
        </div>
        <div class="mt-4">
          <NuxtLink
            :to="stat.link"
            class="text-sm text-blue-600 hover:text-blue-800"
          >
            View all →
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Recent activity -->
    <div class="mt-8">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-6">
          <div v-if="recentItems.length > 0" class="divide-y divide-gray-200">
            <div v-for="item in recentItems" :key="item.id" class="py-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ item.title }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ item.type }} - {{ formatDate(item.date) }}
                  </p>
                </div>
                <NuxtLink
                  :to="item.link"
                  class="text-sm text-blue-600 hover:text-blue-800"
                >
                  View →
                </NuxtLink>
              </div>
            </div>
          </div>
          <div v-else class="text-center text-gray-500">No recent activity</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuth } from "~/composables/useAuth";
import type { Role } from "~/composables/useAuth";

interface DashboardStat {
  name: string;
  value: number;
  link: string;
  roles: Role[];
}

interface RecentActivityItem {
  id: string;
  title: string;
  type: string;
  date: string;
  link: string;
}

interface DashboardResponse {
  stats: {
    [key: string]: number;
  };
  recentItems: RecentActivityItem[];
}

const auth = useAuth();

definePageMeta({
  layout: "admin",
  middleware: "auth",
  roles: ["ADMIN", "EDITOR"] as Role[],
});

// Define stats with role requirements
const allStats: DashboardStat[] = [
  {
    name: "Total Posts",
    value: 0,
    link: "/admin/posts",
    roles: ["ADMIN", "EDITOR"],
  },
  {
    name: "Total Pages",
    value: 0,
    link: "/admin/pages",
    roles: ["ADMIN", "EDITOR"],
  },
  {
    name: "Categories",
    value: 0,
    link: "/admin/categories",
    roles: ["ADMIN", "EDITOR"],
  },
  {
    name: "Events",
    value: 0,
    link: "/admin/events",
    roles: ["ADMIN", "EDITOR"],
  },
  {
    name: "Users",
    value: 0,
    link: "/admin/users",
    roles: ["ADMIN"],
  },
];

// Filter stats based on user role
const filteredStats = computed(() => {
  return allStats.filter((stat) =>
    stat.roles.some((role) => auth.hasRole(role))
  );
});

const recentItems = ref<RecentActivityItem[]>([]);

// Load dashboard data with authentication
onMounted(async () => {
  try {
    const response = await fetch("http://localhost:3005/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });

    if (response.ok) {
      const data: DashboardResponse = await response.json();

      // Update stats with actual values
      filteredStats.value.forEach((stat) => {
        stat.value = data.stats[stat.name.toLowerCase().replace(" ", "_")] || 0;
      });

      recentItems.value = data.recentItems;
    }
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
  }
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};
</script>
