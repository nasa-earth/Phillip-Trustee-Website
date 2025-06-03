<template>
  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Posts Section -->
      <DashboardCard title="Posts" :count="stats.posts" description="Manage blog posts and articles"
        link="/admin/posts" />

      <!-- Pages Section -->
      <DashboardCard title="Pages" :count="stats.pages" description="Manage static pages" link="/admin/pages" />

      <!-- Events Section -->
      <DashboardCard title="Events" :count="stats.events" description="Manage upcoming events" link="/admin/events" />

      <!-- FAQs Section -->
      <DashboardCard title="FAQs" :count="stats.faqs" description="Manage frequently asked questions"
        link="/admin/faqs" />

      <!-- Partners Section -->
      <DashboardCard title="Partners" :count="stats.partners" description="Manage partner organizations"
        link="/admin/partners" />

      <!-- Settings Section -->
      <DashboardCard title="Settings" description="Configure website settings" link="/admin/settings" />
    </div>

    <!-- Recent Activity -->
    <div class="mt-8">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
      <div class="bg-white rounded-lg shadow">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in recentActivity" :key="item.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.action }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.section }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(item.date) }}</td>
              </tr>
              <tr v-if="recentActivity.length === 0">
                <td colspan="3" class="px-6 py-4 text-center text-sm text-gray-500">No recent activity</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useApi } from '~/composables/useApi'

const auth = useAuth()
const api = useApi()

interface DashboardStats {
  posts: number
  pages: number
  events: number
  faqs: number
  partners: number
}

interface Activity {
  id: string
  action: string
  section: string
  date: string
}

const stats = ref<DashboardStats>({
  posts: 0,
  pages: 0,
  events: 0,
  faqs: 0,
  partners: 0
})

const recentActivity = ref<Activity[]>([])

async function fetchDashboardData() {
  try {
    const response = await api.get('/admin/dashboard')
    stats.value = response.stats
    recentActivity.value = response.recentActivity
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Add page meta
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

onMounted(fetchDashboardData)
</script>
