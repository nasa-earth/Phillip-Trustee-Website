<template>
  <footer class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
    <div class="container mx-auto px-6 py-16">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <!-- Left Section -->
        <div class="space-y-8 mx-[70px]">
          <!-- Company Info -->
          <div>
            <h2 class="text-2xl font-bold text-orange-400 mb-4">Phillip Trustee</h2>
            <p class="text-slate-300 leading-relaxed max-w-md">
              Your trusted partner in Cambodia, providing comprehensive services and solutions for your business
              needs.
            </p>
          </div>

          <!-- Social Media -->
          <div>
            <h3 class="text-lg font-semibold mb-4 text-slate-200">Follow Us</h3>
            <div class="flex space-x-4">
              <NuxtLink
                v-for="social in socialLinks"
                :key="social.name"
                :to="social.href"
                target="_blank"
                rel="noopener noreferrer"
                class="group p-3 bg-slate-800 rounded-full hover:bg-orange-500 transition-all duration-300 transform hover:scale-110"
                :aria-label="social.name"
              >
                <component 
                  :is="social.icon" 
                  class="w-5 h-5 text-slate-300 group-hover:text-white transition-colors duration-300" 
                />
              </NuxtLink>
            </div>
          </div>

          <!-- Partners -->
 <!-- Partners -->
<!-- <div>
  <h3 class="text-lg font-semibold mb-6 text-slate-200">Our Partners</h3>
  <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
    <div
      v-for="(partner, index) in partners"
      :key="index"
      class="flex items-center justify-center bg-white/10 rounded-xl p-6 shadow hover:bg-white/20 transition-all duration-300 group border border-white/10"
    >
      <img
        :src="partner.image"
        :alt="partner.name"
        class="h-12 max-w-[120px] object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  </div>
</div> -->
        </div>

        <!-- Right Section - Contact Info -->
        <div class="space-y-6 mx-[60px]">
          <h3 class="text-lg font-semibold mb-6 text-slate-200">Get In Touch</h3>
          <div class="space-y-[-10px]">
            <div v-for="(item, index) in contactInfo" :key="index" class="group">
              <NuxtLink
                :to="item.href"
                :target="item.href.startsWith('http') ? '_blank' : undefined"
                :rel="item.href.startsWith('http') ? 'noopener noreferrer' : undefined"
                class="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                <div class="flex-shrink-0 p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500 transition-colors duration-300">
                  <component 
                    :is="item.icon" 
                    class="w-5 h-5 text-orange-400 group-hover:text-white transition-colors duration-300" 
                  />
                </div>
                <div class="flex-1">
                  <p class="text-slate-300 group-hover:text-white transition-colors duration-300 leading-relaxed">
                    {{ item.content }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <!-- <div class="mt-16 pt-8 border-t border-slate-700">
        <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0">
          <p class="text-slate-400 text-sm">© {{ currentYear }} Phillip Trustee. All rights reserved.</p>
          
        </div>
      </div> -->
    </div>
  </footer>
</template>

<script setup>
import { Facebook, Instagram, Linkedin, MapPin, Mail, Globe, Phone } from 'lucide-vue-next'
import { computed } from 'vue'
// import { LucideIcon } from 'lucide-vue-next';


// Computed property for current year
const currentYear = computed(() => new Date().getFullYear())

const partners = [
  { name: "Rose Mavel", image: "/images/partners/1_Rose_Mavel.jpg" },
  { name: "La Maision", image: "/images/partners/2_La_Maision.jpg" },
  { name: "Vimean Samnang", image: "/images/partners/3_Vimean_Samnang.jpg" },
  { name: "IPS", image: "/images/partners/4_IPS.jpg" },
  { name: "SaRaNa", image: "/images/partners/5_SaRaNa.jpg" },
  { name: "YI Dung", image: "/images/partners/6_YI Dung.jpg" },
]

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
