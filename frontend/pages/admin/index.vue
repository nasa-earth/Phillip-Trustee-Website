<template>
  <div>
    <!-- Quick Actions -->
    <div class="mb-8">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <NuxtLink v-if="canAccess(['ADMIN', 'EDITOR'])" to="/admin/posts/new"
          class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          Create New Post
        </NuxtLink>
        <NuxtLink v-if="canAccess(['ADMIN', 'EDITOR'])" to="/admin/events/new"
          class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
          Create New Event
        </NuxtLink>
        <NuxtLink v-if="canAccess(['ADMIN'])" to="/admin/partners/new"
          class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700">
          Add New Partner
        </NuxtLink>
        <NuxtLink v-if="canAccess(['ADMIN'])" to="/admin/pages/new"
          class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700">
          Create New Page
        </NuxtLink>
      </div>
    </div> <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in displayStats" :key="stat.name" class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-1">
            <h3 class="text-lg font-medium text-gray-900">{{ stat.name }}</h3>
            <p class="mt-1 text-3xl font-semibold text-gray-600">
              {{ getStatValue(stat.key) }}
            </p>
          </div>
        </div>
        <div class="mt-4">
          <NuxtLink :to="stat.link" class="text-sm text-blue-600 hover:text-blue-800">
            View all →
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Content Overview -->
    <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Activity -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div v-if="stats?.recentActivity?.length" class="divide-y divide-gray-200">
            <div v-for="item in stats.recentActivity" :key="item.id" class="py-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ item.action }} {{ item.entity }}
                  </p>
                  <p class="text-sm text-gray-500">
                    by {{ item.user }} - {{ formatDate(item.date) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center text-gray-500">No recent activity</div>
        </div>
      </div>

      <!-- System Status -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">System Status</h2>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500">Posts Pending Review</span>
              <span class="text-sm font-medium text-gray-900">
                {{ stats?.stats?.draftPosts || 0 }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500">Upcoming Events</span>
              <span class="text-sm font-medium text-gray-900">
                {{ stats?.stats?.upcomingEvents || 0 }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500">Active Categories</span>
              <span class="text-sm font-medium text-gray-900">
                {{ stats?.stats?.categories || 0 }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuth } from "~/composables/useAuth";
import type { Role } from "~/composables/useAuth";

interface StatItem {
  name: string;
  key: string;
  link: string;
  roles: Role[];
}

const auth = useAuth();
const api = useApi();

const stats = ref<any>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const canAccess = (roles: Role[]) => {
  return roles.some(role => auth.hasRole(role));
};

const statItems: StatItem[] = [
  { name: "Total Posts", key: "posts", link: "/admin/posts", roles: ["ADMIN", "EDITOR"] },
  { name: "Published Posts", key: "publishedPosts", link: "/admin/posts?status=published", roles: ["ADMIN", "EDITOR"] },
  { name: "Draft Posts", key: "draftPosts", link: "/admin/posts?status=draft", roles: ["ADMIN", "EDITOR"] },
  { name: "Total Events", key: "events", link: "/admin/events", roles: ["ADMIN", "EDITOR"] },
  { name: "Upcoming Events", key: "upcomingEvents", link: "/admin/events?status=upcoming", roles: ["ADMIN", "EDITOR"] },
  { name: "Partners", key: "partners", link: "/admin/partners", roles: ["ADMIN", "EDITOR"] },
  { name: "Pages", key: "pages", link: "/admin/pages", roles: ["ADMIN", "EDITOR"] },
  { name: "FAQs", key: "faqs", link: "/admin/faqs", roles: ["ADMIN", "EDITOR"] },
  { name: "Categories", key: "categories", link: "/admin/categories", roles: ["ADMIN", "EDITOR"] },
  { name: "Users", key: "users", link: "/admin/users", roles: ["ADMIN"] }
];

const displayStats = computed(() => {
  return statItems.filter(stat => canAccess(stat.roles));
});

const getStatValue = (key: string): number => {
  return stats.value?.stats?.[key] || 0;
};

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const fetchDashboardData = async () => {
  try {
    loading.value = true;
    error.value = null;
    stats.value = await api.get('/admin/dashboard');
  } catch (err) {
    error.value = 'Failed to load dashboard data';
    console.error('Dashboard error:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDashboardData();
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
  roles: ["ADMIN", "EDITOR"] as Role[],
});
</script>
