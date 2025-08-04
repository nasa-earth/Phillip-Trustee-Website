<template>
  <footer class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
    <div class="container mx-auto px-4 sm:px-20 py-6 sm:py-8">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mx-0 sm:mx-4 md:mx-8 lg:mx-[60px]">
        <!-- Left Section -->
        <div class="space-y-4 sm:space-y-5 mx-0 sm:mx-4 md:mx-8 lg:mx-[40px]">
          <!-- Company Info -->
          <div class="text-center lg:text-left">
            <h2 class="text-lg sm:text-xl font-bold text-[#f15a22] mb-2 sm:mb-3">Phillip Trustee</h2>
          </div>

          <!-- Social Media -->
          <div class="text-center lg:text-left">
            <h3 class="text-sm sm:text-base font-semibold mb-2 sm:mb-3 text-slate-200">Follow Us</h3>
            <div class="flex justify-center lg:justify-start space-x-2 sm:space-x-3">
              <NuxtLink v-for="social in socialLinks" :key="social.name" :to="social.href" target="_blank"
                rel="noopener noreferrer"
                class="group p-1.5 sm:p-2 bg-slate-800 rounded-full hover:bg-orange-500 transition-all duration-300 transform hover:scale-110"
                :aria-label="social.name">
                <component :is="social.icon"
                  class="w-3.5 h-3.5 sm:w-6 sm:h-6 text-slate-300 group-hover:text-white transition-colors duration-300" />
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Right Section - Contact Info -->
        <div class="space-y-3 sm:space-y-4 mx-0 sm:mx-4 md:mx-8 lg:mx-[40px]">
          <h3 class="text-sm sm:text-base font-semibold mb-3 sm:mb-4 text-slate-200 text-center lg:text-left">Get In
            Touch</h3>
          <div class="space-y-0 sm:space-y-1">
            <div v-for="(item, index) in contactInfo" :key="index" class="group">
              <NuxtLink :to="item.href" :target="item.href.startsWith('http') ? '_blank' : undefined"
                :rel="item.href.startsWith('http') ? 'noopener noreferrer' : undefined"
                class="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                <div
                  class="flex-shrink-0 p-1 sm:p-1.5 bg-orange-500/20 rounded-lg group-hover:bg-orange-500 transition-colors duration-300">
                  <component :is="item.icon"
                    class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f15a22] group-hover:text-white transition-colors duration-300" />
                </div>
                <div class="flex-1">
                  <p
                    class="text-xs sm:text-sm text-slate-300 group-hover:text-white transition-colors duration-300 leading-relaxed">
                    {{ item.content }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright Section -->
      <div class="border-t border-slate-700 mt-6 pt-4 text-center">
        <p class="text-sm text-slate-400">
          © {{ currentYear }} Phillip Trustee. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Facebook, Instagram, Linkedin, MapPin, Mail, Globe, Phone } from 'lucide-vue-next'
import { computed } from 'vue'

// Auto-updating current year
const currentYear = computed(() => new Date().getFullYear())

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/philliptrustee",
    icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/philliptrusteecambodia?igsh=MW94enM3djc2M2ZrbA==",
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/philliptrustee-cambodia",
    icon: Linkedin,
  },
]

const contactInfo = [
  {
    icon: MapPin,
    content: "#27C (Ground Floor), Monivong Blvd., Phum 6, Sangkat Srah Chork, Khan Daun Penh, Phnom Penh, Kingdom of Cambodia",
    href: "https://maps.app.goo.gl/4gLekx4816JrM1aX7",
  },
  {
    icon: Mail,
    content: "info@philliptrustee.com.kh",
    href: "mailto:info@philliptrustee.com.kh",
  },
  {
    icon: Globe,
    content: "www.philliptrustee.com.kh",
    href: "https://www.philliptrustee.com.kh/",
  },
  {
    icon: Phone,
    content: "(855)86 930 000 / 89 989 818 (24/7)",
    href: "tel:+85586930000",
  },
]
</script>
