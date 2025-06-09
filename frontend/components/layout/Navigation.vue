<!-- components/layout/Navigation.vue -->
<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <NuxtLink to="/" class="flex items-center">
              <img class="h-12 w-auto" src="/logo.png" alt="Phillip Trustee Logo">
            </NuxtLink>
          </div>

          <!-- Main Navigation -->
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NuxtLink to="/"
              class="inline-flex items-center px-1 pt-1 border-b-2"
              :class="[$route.path === '/' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']"
            >
              Home
            </NuxtLink>
            <NuxtLink to="/about"
              class="inline-flex items-center px-1 pt-1 border-b-2"
              :class="[$route.path === '/about' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']"
            >
              About
            </NuxtLink>
            <NuxtLink to="/services"
              class="inline-flex items-center px-1 pt-1 border-b-2"
              :class="[$route.path === '/services' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']"
            >
              Services
            </NuxtLink>
            <NuxtLink to="/contact"
              class="inline-flex items-center px-1 pt-1 border-b-2"
              :class="[$route.path === '/contact' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']"
            >
              Contact
            </NuxtLink>
          </div>
        </div>

        <!-- Right Side -->
        <div class="hidden sm:flex sm:items-center sm:ml-6">
          <NuxtLink to="/auth/login"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Admin Login
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center sm:hidden">
          <button @click="isOpen = !isOpen" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
            <span class="sr-only">Open main menu</span>
            <svg v-if="!isOpen" class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="sm:hidden" :class="{ 'block': isOpen, 'hidden': !isOpen }">
      <div class="pt-2 pb-3 space-y-1">
        <NuxtLink to="/"
          class="block pl-3 pr-4 py-2 border-l-4"
          :class="[$route.path === '/' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700']"
        >
          Home
        </NuxtLink>
        <NuxtLink to="/about"
          class="block pl-3 pr-4 py-2 border-l-4"
          :class="[$route.path === '/about' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700']"
        >
          About
        </NuxtLink>
        <NuxtLink to="/services"
          class="block pl-3 pr-4 py-2 border-l-4"
          :class="[$route.path === '/services' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700']"
        >
          Services
        </NuxtLink>
        <NuxtLink to="/contact"
          class="block pl-3 pr-4 py-2 border-l-4"
          :class="[$route.path === '/contact' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700']"
        >
          Contact
        </NuxtLink>
        <NuxtLink to="/auth/login"
          class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
        >
          Admin Login
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const isOpen = ref(false)
</script>
