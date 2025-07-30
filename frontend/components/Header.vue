<template>
  <header class="w-full z-50 transition-all duration-300" :class="[
    scrolled ? 'fixed top-0 left-0 bg-[#0a2b5c]/70 backdrop-blur-md border-b border-white/10 shadow-md' :
      'absolute top-0 left-0 bg-transparent backdrop-blur-none border-b-0 shadow-none'
  ]">
    <nav class="mx-4 sm:mx-6 md:mx-10 lg:mx-25 px-4 sm:px-6 md:px-10 py-1 justify-center">
      <div class="flex items-center justify-between">
        <!-- Logo Section -->
        <div class="flex items-center space-x-2 sm:space-x-3">
          <NuxtLink to="/" class="flex items-center space-x-2 sm:space-x-3 group">
            <div class="relative">
              <img src="~/assets/images/logo.png" alt="Phillip Trustee Logo"
                class="h-10 sm:h-12 md:h-15 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            </div>
            <!-- <div class="hidden sm:block">
              <h1 class="text-xl font-bold text-[#e6eaf0] group-hover:text-orange-400 transition-colors duration-300">
                Phillip Trustee
              </h1>
            </div> -->
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-1">
          <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to"
            class="relative px-4 py-2 text-[#e6eaf0] font-medium hover:text-orange-400 transition-all duration-300 rounded-lg hover:bg-white/10 group"
            active-class="text-orange-400 font-bold bg-white/20"
            exact-active-class="text-orange-400 font-bold bg-white/20">
            {{ link.label }}
            <!-- Active indicator -->
            <span
              class="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-orange-400 transition-all duration-300"
              :class="$route.path === link.to ? 'w-8' : 'w-0 group-hover:w-8'">
            </span>
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="toggleMobileMenu"
          class="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
          :class="{ 'bg-white/10': isMobileMenuOpen }" aria-label="Toggle mobile menu">
          <div class="w-5 h-5 sm:w-6 sm:h-6 flex flex-col justify-center items-center">
            <span class="block w-4 sm:w-5 h-0.5 bg-white transition-all duration-300"
              :class="isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''"></span>
            <span class="block w-4 sm:w-5 h-0.5 bg-white mt-1 transition-all duration-300"
              :class="isMobileMenuOpen ? 'opacity-0' : ''"></span>
            <span class="block w-4 sm:w-5 h-0.5 bg-white mt-1 transition-all duration-300"
              :class="isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''"></span>
          </div>
        </button>
      </div>

      <!-- Mobile Navigation Menu -->
      <Transition enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 transform -translate-y-4" enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform -translate-y-4">
        <div v-if="isMobileMenuOpen" class="lg:hidden mt-4 sm:mt-6 pb-3 sm:pb-4">
          <div
            class="bg-[#0d254a]/90 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl border border-white/10 overflow-hidden mx-2 sm:mx-0">
            <div class="px-3 sm:px-4 py-2">
              <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" @click="closeMobileMenu"
                class="block px-3 sm:px-4 py-2.5 sm:py-3 text-[#e6eaf0] font-medium hover:text-orange-400 hover:bg-[#13325e] rounded-lg transition-all duration-300 text-sm sm:text-base"
                active-class="text-orange-400 bg-[#13325e] font-bold"
                exact-active-class="text-orange-400 bg-[#13325e] font-bold">
                <div class="flex items-center">
                  <span>{{ link.label }}</span>
                  <!-- Active indicator for mobile -->
                  <span v-if="$route.path === link.to"
                    class="ml-auto w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full"></span>
                </div>
              </NuxtLink>
              <!-- Mobile CTA Button -->
              <div class="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMobileMenuOpen = ref(false)
const scrolled = ref(false)

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Profile', to: '/profile' },
  { label: 'Service', to: '/service' },
  { label: 'Event', to: '/event' },
  { label: 'FAQs', to: '/faqs' },
]

// Check scroll position to update header background
const checkScroll = () => {
  // Use a higher threshold to better detect when we've scrolled past the hero section
  // Most hero sections are viewport height, so this should trigger when we're past the hero
  scrolled.value = window.scrollY > window.innerHeight * 0.5
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// No logout functions needed since we've removed the login/logout buttons

// Close mobile menu when clicking outside
const handleClickOutside = (event) => {
  if (isMobileMenuOpen.value && !event.target.closest('nav')) {
    closeMobileMenu()
  }
}

// Close mobile menu on escape key
const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscapeKey)
  window.addEventListener('scroll', checkScroll)

  // Check initial scroll position
  checkScroll()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscapeKey)
  window.removeEventListener('scroll', checkScroll)
})
</script>
