<template>
  <section class="bg-gradient-to-b from-[#002e6e] to-[#001a4d] py-20">
  <div class="container mx-auto px-6">
    <!-- Hero Section -->
    <!-- <div class="text-center text-white">
      <div class="mb-8">
        <h3 class="text-xl md:text-2xl font-semibold">Leave your worries behind,</h3>
      </div>
      <h1 class="text-4xl md:text-5xl font-bold">
        <span class="text-[#f15a22]">We've got</span><br>
        <span class="text-[#f15a22]">your back</span>
      </h1>
    </div> -->

    <div class="relative mb-16">
      <img src="~/assets/images/home/hero_bg.png" alt="Hero Background" class="w-full object-cover rounded-xl shadow-lg" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
    </div>

    <!-- Section Header -->
    <div class="text-center mb-16">
      <div class="inline-block">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h2>
        <div class="w-24 h-1 bg-gradient-to-r from-[#f15a22] to-orange-400 mx-auto"></div>
      </div>
      <p class="text-white/70 text-xl mt-6 max-w-3xl mx-auto">
        Discover our journey and commitment to excellence in trust services
      </p>
    </div>

    <!-- Content Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
      <div
        v-for="(card, index) in aboutCards"
        :key="index"
        class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 border border-white/10"
      >
        <div class="w-16 h-16 bg-[#f15a22]/20 rounded-full flex items-center justify-center mb-6">
          <component :is="card.icon" class="w-8 h-8 text-[#f15a22]" />
        </div>
        <h3 class="text-xl font-semibold text-white mb-4">{{ card.title }}</h3>
        <p class="text-white/80 leading-relaxed">{{ card.description }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto">
      <div class="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
        <div class="space-y-8">
          <div v-for="(paragraph, index) in aboutContent" :key="index" class="text-white/90 text-lg leading-relaxed text-center">
            <p>{{ paragraph }}</p>
          </div>

          <!-- CTA Button -->
          <div class="text-center pt-8">
            <NuxtLink
              to="/about"
              class="inline-flex items-center bg-[#f15a22] hover:bg-[#e05a22] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Read More
              <ArrowRight class="ml-2 w-5 h-5" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  <Footer />
</template>

<script setup>
import { Shield, Users, Award, ArrowRight } from 'lucide-vue-next'

const aboutCards = [
  {
    icon: Shield,
    title: "Trusted & Licensed",
    description: "Specialized license for commercial, social and personal trust approved by the Trust Regulator."
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Associated with Phillip Bank and part of the established Phillip Capital group in Singapore."
  },
  {
    icon: Award,
    title: "Comprehensive Services",
    description: "Complete financial and non-financial ecosystem for investors throughout Cambodia."
  }
]

const aboutContent = [
  "Phillip Trustee (Cambodia), Co Ltd. was incorporated in June 2022, after the Law of Trust was passed in 2019, allowing foreigners to register their fixed assets with trustee companies in Cambodia. Our specialised license consists of commercial, social and personal trust in which has been approved by the Trust Regulator.",
  "We are the associated company of Phillip Bank, Plc, one of the medium-sized commercial banks in Cambodia, part of Phillip Capital group in Singapore, and a sister company of Phillip General Insurance and Phillip Life Assurance Company.",
  "At Phillip Trustee (Cambodia), Co Ltd. we believe in a financial and non-financial ecosystem that can provide suitable services to investors and customers throughout Cambodia such as commercial, public, social and personal trust services."
]
</script>
