<template>
  <header class="w-full z-50 transition-all duration-300" :class="[
    scrolled ? 'fixed top-0 left-0 bg-[#0a2b5c]/70 backdrop-blur-md border-b border-white/10 shadow-md' :
      'absolute top-0 left-0 bg-transparent backdrop-blur-none border-b-0 shadow-none'
  ]">
    <nav class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo Section -->
        <div class="flex items-center space-x-3">
          <NuxtLink to="/" class="flex items-center space-x-3 group">
            <div class="relative">
              <img src="~/assets/images/logo.svg" alt="Phillip Trustee Logo"
                class="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div class="hidden sm:block">
              <h1 class="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                Phillip Trustee
              </h1>
            </div>
          </NuxtLink>
        </div> 
        
        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-1">
          <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to"
            class="relative px-4 py-2 text-white font-medium hover:text-orange-400 transition-all duration-300 rounded-lg hover:bg-white/10 group"
            active-class="text-orange-400 font-bold">
            {{ link.label }}
            <!-- Active indicator -->
            <span
              class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-400 group-hover:w-8 transition-all duration-300">
            </span>
          </NuxtLink>
        </div>
        
        <!-- Mobile Menu Button -->
        <button @click="toggleMobileMenu"
          class="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
          :class="{ 'bg-white/10': isMobileMenuOpen }" aria-label="Toggle mobile menu">
          <div class="w-6 h-6 flex flex-col justify-center items-center">
            <span class="block w-5 h-0.5 bg-white transition-all duration-300"
              :class="isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''"></span>
            <span class="block w-5 h-0.5 bg-white mt-1 transition-all duration-300"
              :class="isMobileMenuOpen ? 'opacity-0' : ''"></span>
            <span class="block w-5 h-0.5 bg-white mt-1 transition-all duration-300"
              :class="isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''"></span>
          </div>
        </button>
      </div>

      <!-- Mobile Navigation Menu -->
      <Transition enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 transform -translate-y-4" enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform -translate-y-4">
        <div v-if="isMobileMenuOpen" class="lg:hidden mt-6 pb-4">
          <div class="bg-[#0d254a]/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 overflow-hidden">
            <div class="px-4 py-2">
              <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" @click="closeMobileMenu"
                class="block px-4 py-3 text-white font-medium hover:text-orange-400 hover:bg-[#13325e] rounded-lg transition-all duration-300"
                active-class="text-orange-400 bg-[#13325e]">
                {{ link.label }}
              </NuxtLink> <!-- Mobile CTA Button -->
              <div class="mt-4 pt-4 border-t border-white/10">
                <NuxtLink to="/contact" @click="closeMobileMenu"
                  class="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg">
                  Contact Us
                </NuxtLink>
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
  { label: 'Services', to: '/service' },
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
