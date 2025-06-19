<template>
  <section class="bg-gradient-to-b from-[#002e6e] to-[#001a4d] py-20">
  <div class="container mx-auto px-6">
    <section class="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
    <!-- Background Image -->
    <img
      src="~/assets/images/home/hero_bg.png"
      alt="Team meeting"
      class="absolute inset-0 w-full h-full object-cover object-center z-0"
    />

    <!-- Overlay Gradient -->
    <div class="absolute inset-0 bg-gradient-to-l from-[#0e2a52] via-[#0e2a52]/70 to-transparent z-10"></div>

    <!-- Text Content -->
    <div class="relative z-20 h-full flex items-center px-6 md:px-16 lg:px-24">
      <div class="max-w-xl text-left text-white space-y-6">
        <h3 class="text-xl md:text-2xl font-medium">Leave your worries behind,</h3>
        <h1 class="text-4xl md:text-5xl lg:text-6xl leading-tight font-semibold">
          <span class="block text-[#f15a22] italic">We’re got</span>
          <span class="block text-[#f15a22] italic">your back</span>
        </h1>
      </div>
    </div>
  </section>
    

   <section class="bg-[#0e2a52] py-20 px-4 md:px-12 lg:px-20">
    <!-- Header -->
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h2>
      <div class="w-24 h-1 bg-gradient-to-r from-[#f15a22] to-orange-400 mx-auto"></div>
    </div>

    <!-- Features -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
      <div class="bg-white/10 border border-white/10 rounded-2xl p-6 text-white hover:bg-white/15 transition-all duration-300">
        <div class="flex items-center justify-center w-12 h-12 bg-[#f15a22]/30 rounded-full mb-4">
          <IconShield class="w-6 h-6 text-[#f15a22]" />
        </div>
        <h3 class="font-semibold text-lg mb-2">Trusted and Licensed</h3>
        <p class="text-white/80 text-sm">
          Specialized license for commercial, social and personal trust approved by the Trust Regulator.
        </p>
      </div>
      <div class="bg-white/10 border border-white/10 rounded-2xl p-6 text-white hover:bg-white/15 transition-all duration-300">
        <div class="flex items-center justify-center w-12 h-12 bg-[#f15a22]/30 rounded-full mb-4">
          <IconUsers class="w-6 h-6 text-[#f15a22]" />
        </div>
        <h3 class="font-semibold text-lg mb-2">Expert Teams</h3>
        <p class="text-white/80 text-sm">
          Associated with Phillip Bank and part of the established Phillip Capital group in Singapore.
        </p>
      </div>
      <div class="bg-white/10 border border-white/10 rounded-2xl p-6 text-white hover:bg-white/15 transition-all duration-300">
        <div class="flex items-center justify-center w-12 h-12 bg-[#f15a22]/30 rounded-full mb-4">
          <IconHeadset class="w-6 h-6 text-[#f15a22]" />
        </div>
        <h3 class="font-semibold text-lg mb-2">Comprehensive Services</h3>
        <p class="text-white/80 text-sm">
          Complete financial and non-financial ecosystem for investors throughout Cambodia.
        </p>
      </div>
    </div>

    <!-- Company Info -->
    <div class="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
      <!-- Text Section -->
      <div class="text-white">
        <h3 class="text-2xl font-semibold mb-4">Phillip Trustee</h3>
        <p class="text-white/80 leading-relaxed mb-6">
          Phillip Trustee (Cambodia), Co Ltd. was incorporated in June 2022, after the Law of Trust was passed in 2019,
          allowing foreigners to register their fixed assets with trustee companies in Cambodia. Our specialised
          license consists of commercial, social and personal trust in which has been approved by the Trust Regulator.
        </p>
        <button class="bg-[#f15a22] text-white py-2 px-6 rounded-full hover:bg-orange-600 transition-all">
          Read More
        </button>
      </div>

      <!-- Image Section -->
      <div class="relative rounded-2xl overflow-hidden border-[6px] border-white/20">
        <img
          src="~/assets/images/about/1-phillip-trustee.jpg"
          alt="Phillip Trustee"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </section>

  <section class="bg-[#0e2a52] py-20 px-4 md:px-12 lg:px-20">
    <!-- Section Header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-semibold text-white">Services & Products</h2>
    </div>

    <!-- Content Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
      <!-- Image with border accents -->
      <div class="relative rounded-2xl overflow-hidden border-[6px] border-white/20">
        <img
          src="~/assets/images/home/phillip-image.jpg"
          alt="Phillip Trustee Services"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Description and List -->
      <div class="text-white">
        <p class="text-white/80 leading-relaxed mb-6">
          A trustee is a person who takes responsibility for managing money or assets that have been set aside
          in a trust for the benefit of someone else.
        </p>

        <!-- Trust Type List -->
        <ul class="space-y-3 mb-8 text-white/90">
          <li class="flex items-center gap-3">
            <span class="w-4 h-4 bg-[#f15a22] rounded-full inline-block"></span>
            Financial Trust
          </li>
          <li class="flex items-center gap-3">
            <span class="w-4 h-4 bg-[#f15a22] rounded-full inline-block"></span>
            Commercial Trust
          </li>
          <li class="flex items-center gap-3">
            <span class="w-4 h-4 bg-[#f15a22] rounded-full inline-block"></span>
            Public Trust
          </li>
          <li class="flex items-center gap-3">
            <span class="w-4 h-4 bg-[#f15a22] rounded-full inline-block"></span>
            Social Trust
          </li>
          <li class="flex items-center gap-3">
            <span class="w-4 h-4 bg-[#f15a22] rounded-full inline-block"></span>
            Personal Trust
          </li>
        </ul>

        <!-- Read More Button -->
        <button class="bg-[#f15a22] text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-all">
          Read More
        </button>
      </div>
    </div>
  </section>

  </div>
</section>
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
</script>
