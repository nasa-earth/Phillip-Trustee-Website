<template>
  <div class="min-h-screen bg-background">
    <!-- Fixed sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-100 transform lg:translate-x-0 transition-all duration-300 ease-in-out"
      :class="{ '-translate-x-full': !isSidebarOpen }">
      <!-- Sidebar Header -->
      <div class="flex items-center h-16 px-6 border-b border-gray-100">
        <div class="flex items-center flex-1">
          <img src="/images/logo.png" alt="Phillip Trustee" class="h-8 w-auto" />
          <h2 class="ml-3 text-lg font-semibold text-primary">Admin Portal</h2>
        </div>
        <Button @click="toggleSidebar" icon="pi pi-times" class="lg:hidden p-button-text p-button-plain" />
      </div>

      <!-- Navigation Menu -->
      <ScrollPanel class="h-[calc(100vh-4rem)]">
        <nav class="p-4">
          <!-- Menu Sections -->
          <template v-for="section in menuSections" :key="section.title">
            <div class="mb-6">
              <div class="px-4 mb-2">
                <span class="text-xs font-medium text-text-secondary uppercase tracking-wider">
                  {{ section.title }}
                </span>
              </div>

              <template v-for="item in section.items" :key="item.path">
                <!-- Menu Item -->
                <NuxtLink :to="item.path"
                  class="flex items-center px-4 py-2.5 rounded-lg text-text-secondary hover:bg-blue-50 hover:text-primary transition-colors duration-200 mb-1"
                  :class="{ 'bg-blue-50 !text-primary font-medium': isCurrentPath(item.path) }">
                  <i :class="[item.icon, 'text-lg']"></i>
                  <span class="ml-3">{{ item.name }}</span>
                  <Badge v-if="item.badge" :value="item.badge" severity="danger" class="ml-auto" />
                </NuxtLink>
              </template>
            </div>
          </template>
        </nav>
      </ScrollPanel>
    </aside>

    <!-- Overlay for mobile -->
    <Transition enter-active-class="transition-opacity ease-linear duration-200" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition-opacity ease-linear duration-200"
      leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="isSidebarOpen" class="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
        @click="toggleSidebar">
      </div>
    </Transition>

    <!-- Main Content Area -->
    <div class="lg:pl-72">
      <!-- Top Header -->
      <AdminHeader :title="currentPageTitle" />

      <!-- Page Content -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()
const auth = useAuth()

// Sidebar state
const isSidebarOpen = ref(false)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Menu sections
const menuSections = [
  {
    title: 'GENERAL',
    items: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: 'pi pi-home' },
      { name: 'Analytics', path: '/admin/analytics', icon: 'pi pi-chart-line' }
    ]
  },
  {
    title: 'CONTENT',
    items: [
      { name: 'Posts', path: '/admin/posts', icon: 'pi pi-file-edit', badge: '3' },
      { name: 'Pages', path: '/admin/pages', icon: 'pi pi-copy' },
      { name: 'Events', path: '/admin/events', icon: 'pi pi-calendar' },
      { name: 'Partners', path: '/admin/partners', icon: 'pi pi-users' },
      { name: 'FAQs', path: '/admin/faqs', icon: 'pi pi-question-circle' }
    ]
  },
  {
    title: 'ADMINISTRATION',
    items: [
      { name: 'Users', path: '/admin/users', icon: 'pi pi-user' },
      { name: 'Settings', path: '/admin/settings', icon: 'pi pi-cog' }
    ]
  }
]

// Current page title
const currentPageTitle = computed(() => {
  const currentPath = route.path
  for (const section of menuSections) {
    const item = section.items.find(item => item.path === currentPath)
    if (item) return item.name
  }
  return 'Admin Portal'
})

// Active route checker
const isCurrentPath = (path: string): boolean => {
  return route.path === path
}

// Filter menu items based on user role
const filteredMenuItems = computed(() => {
  const items = menuSections.flatMap(section => section.items);
     if (auth.user && auth.user.role === 'ADMIN') {
    return items
  }
  return items.filter(item => !['Users', 'Settings'].includes(item.name))
})
</script>

<style>
.router-link-active {
  background-color: rgb(239 246 255);
  color: rgb(13 71 161);
  font-weight: 500;
}

.p-badge {
  min-width: 1.25rem;
  height: 1.25rem;
  font-size: 0.75rem;
}

.p-scrollpanel .p-scrollpanel-bar {
  background-color: rgb(209 213 219);
}

.p-scrollpanel .p-scrollpanel-content {
  padding: 0 !important;
}
</style>
