<template>
  <section class="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
    <!-- Background Image -->
    <img src="~/assets/images/home/hero_bg.png" alt="Team meeting"
      class="absolute inset-0 w-full h-full object-cover object-center z-0 bg-[#0e2a52]" />

    <!-- Overlay Gradient -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#001a4d]/50 via-[#0e2a52]/20 to-[#001a4d]/10 z-10"></div>

    <!-- Text Content -->
    <div class="relative z-20 h-full flex items-center px-6 md:px-16 lg:px-24 mt-[-100px] ml-[100px]">
      <div class="max-w-xl text-left text-[#e6eaf0] space-y-6">
        <h3 class="text-xl md:text-2xl font-medium">Leave your worries behind,</h3>
        <h1 class="text-4xl md:text-5xl lg:text-6xl leading-tight font-semibold">
          <span class="block text-[#f15a22] italic">We’re got</span>
          <span class="block text-[#f15a22] italic">your back</span>
        </h1>
      </div>
    </div>
  </section>


  <section class="bg-[#0e2a52] py-16 sm:py-20 px-4 md:px-12 lg:px-20">
    <!-- Header -->
    <div class="text-center mb-12 sm:mb-16">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#e6eaf0] animate-fade-in-down">About Us</h2>
    </div>
    <!-- Features -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20 mx-0 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-[100px]">
      <div
        class="bg-white/10 border border-white/10 rounded-2xl p-4 sm:p-6 text-[#e6eaf0] hover:bg-white/15 transition-all duration-300 hover-lift animate-fade-in-up animation-delay-150">
        <div
          class="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#f15a22]/30 rounded-full mb-3 sm:mb-4 animate-float">
          <img src="/images/icons/shield.png" alt="Trusted and Licensed" class="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
        </div>
        <h3 class="font-semibold text-base sm:text-lg mb-2">Trusted and Licensed</h3>
        <p class="text-[#e6eaf0] text-sm sm:text-base leading-relaxed">
          Specialized license for commercial, social and personal trust approved by the Trust Regulator.
        </p>
      </div>
      <div
        class="bg-white/10 border border-white/10 rounded-2xl p-4 sm:p-6 text-[#e6eaf0] hover:bg-white/15 transition-all duration-300 hover-lift animate-fade-in-up animation-delay-300">
        <div
          class="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#f15a22]/30 rounded-full mb-3 sm:mb-4 animate-float animation-delay-150">
          <img src="/images/icons/multiple-users-silhouette.png" alt="Expert Teams"
            class="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
        </div>
        <h3 class="font-semibold text-base sm:text-lg mb-2">Expert Teams</h3>
        <p class="text-[#e6eaf0] text-sm sm:text-base leading-relaxed">
          Associated with Phillip Bank and part of the established Phillip Capital group in Singapore.
        </p>
      </div>
      <div
        class="bg-white/10 border border-white/10 rounded-2xl p-4 sm:p-6 text-[#e6eaf0] hover:bg-white/15 transition-all duration-300 hover-lift animate-fade-in-up animation-delay-450">
        <div
          class="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#f15a22]/30 rounded-full mb-3 sm:mb-4 animate-float animation-delay-300">
          <img src="/images/icons/customer-service.png" alt="Comprehensive Services"
            class="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
        </div>
        <h3 class="font-semibold text-base sm:text-lg mb-2">Comprehensive Services</h3>
        <p class="text-[#e6eaf0] text-sm sm:text-base leading-relaxed">
          Complete financial and non-financial ecosystem for investors throughout Cambodia.
        </p>
      </div>
    </div>

    <!-- Company Info -->
    <div
      class="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 sm:gap-10 mx-0 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-[100px]">
      <!-- Text Section -->
      <div class="text-[#e6eaf0] order-2 lg:order-1 animate-slide-in-left animation-delay-600">
        <h3 class="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-center lg:text-left lg:ml-0 xl:ml-[200px]">
          Phillip Trustee</h3>
        <p class="text-[#e6eaf0] leading-relaxed mb-4 sm:mb-6 text-base sm:text-lg text-center lg:text-left">
          Phillip Trustee (Cambodia), Co Ltd. was incorporated in June 2022, after the Law of Trust was passed in
          2019,
          allowing foreigners to register their fixed assets with trustee companies in Cambodia. Our specialised
          license consists of commercial, social and personal trust in which has been approved by the Trust
          Regulator.
        </p>
        <div class="text-center lg:text-left">
          <NuxtLink to="/About"
            class="inline-block bg-[#f15a22] text-[#e6eaf0] py-2 px-4 sm:px-6 rounded-full hover:bg-orange-600 transition-all text-sm sm:text-base hover-lift">
            Read More
          </NuxtLink>
        </div>
      </div>

      <!-- Image Section -->
      <div
        class="relative rounded-2xl overflow-hidden border-4 sm:border-[6px] border-white/20 order-1 lg:order-2 animate-slide-in-right animation-delay-750 hover-lift">
        <img src="~/assets/images/about/1-phillip-trustee.jpg" alt="Phillip Trustee"
          class="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-300 hover:scale-105" />
      </div>
    </div>
  </section>

  <section class="bg-[#0e2a52] py-12 sm:py-16 md:py-20 px-4 md:px-12 lg:px-20">
    <!-- Section Header -->
    <div class="text-center mb-8 sm:mb-12">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#e6eaf0] animate-fade-in-down">Services & Products
      </h2>
    </div>

    <!-- Content Layout -->
    <div
      class="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 sm:gap-10 md:gap-12 mx-0 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-[100px]">
      <!-- Image with border accents -->
      <div
        class="relative rounded-2xl overflow-hidden border-4 sm:border-[6px] border-white/20 order-2 lg:order-1 animate-slide-in-left animation-delay-300 hover-lift">
        <img src="~/assets/images/home/phillip-image.jpg" alt="Phillip Trustee Services"
          class="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-300 hover:scale-105" />
      </div>

      <!-- Description and List -->
      <div class="text-[#e6eaf0] order-1 lg:order-2 animate-slide-in-right animation-delay-450">
        <p class="text-[#e6eaf0] leading-relaxed mb-4 sm:mb-6 text-base sm:text-lg text-center lg:text-left">
          A trustee is a person who takes responsibility for managing money or assets that have been set aside
          in a trust for the benefit of someone else.
        </p>

        <!-- Trust Type List -->
        <ul class="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-[#e6eaf0] text-base sm:text-lg">
          <li class="flex items-center gap-3 justify-center lg:justify-start animate-fade-in-up animation-delay-600">
            <span
              class="w-3 h-3 sm:w-4 sm:h-4 bg-[#f15a22] rounded-full inline-block flex-shrink-0 animate-pulse-slow"></span>
            Financial Trust
          </li>
          <li class="flex items-center gap-3 justify-center lg:justify-start animate-fade-in-up animation-delay-750">
            <span
              class="w-3 h-3 sm:w-4 sm:h-4 bg-[#f15a22] rounded-full inline-block flex-shrink-0 animate-pulse-slow animation-delay-150"></span>
            Commercial Trust
          </li>
          <li class="flex items-center gap-3 justify-center lg:justify-start animate-fade-in-up animation-delay-900">
            <span
              class="w-3 h-3 sm:w-4 sm:h-4 bg-[#f15a22] rounded-full inline-block flex-shrink-0 animate-pulse-slow animation-delay-300"></span>
            Public Trust
          </li>
          <li class="flex items-center gap-3 justify-center lg:justify-start animate-fade-in-up animation-delay-900">
            <span
              class="w-3 h-3 sm:w-4 sm:h-4 bg-[#f15a22] rounded-full inline-block flex-shrink-0 animate-pulse-slow animation-delay-450"></span>
            Social Trust
          </li>
          <li class="flex items-center gap-3 justify-center lg:justify-start animate-fade-in-up animation-delay-900">
            <span
              class="w-3 h-3 sm:w-4 sm:h-4 bg-[#f15a22] rounded-full inline-block flex-shrink-0 animate-pulse-slow animation-delay-600"></span>
            Personal Trust
          </li>
        </ul>
        <!-- Read More Button -->
        <div class="text-center lg:text-left">
          <NuxtLink to="/Service"
            class="inline-block bg-[#f15a22] text-[#e6eaf0] px-4 sm:px-6 py-2 rounded-full hover:bg-orange-600 transition-all text-sm sm:text-base hover-lift animate-fade-in-up animation-delay-900">
            Read More
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
  <!-- </div> -->
</template>

<script setup>

</script>

<style scoped>
/* Animation keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse-slow {

  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }
}

/* Animation classes */
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out forwards;
  opacity: 0;
}

.animate-slide-in-left {
  animation: slideInLeft 0.8s ease-out forwards;
  opacity: 0;
}

.animate-slide-in-right {
  animation: slideInRight 0.8s ease-out forwards;
  opacity: 0;
}

.animate-pulse-slow {
  animation: pulse-slow 3s infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Animation delays */
.animation-delay-150 {
  animation-delay: 0.15s;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-450 {
  animation-delay: 0.45s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

.animation-delay-750 {
  animation-delay: 0.75s;
}

.animation-delay-900 {
  animation-delay: 0.9s;
}

/* Hover effects */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Responsive adjustments */
@media (max-width: 640px) {

  .animate-fade-in-up,
  .animate-fade-in-down,
  .animate-slide-in-left,
  .animate-slide-in-right {
    animation-duration: 0.6s;
  }
}
</style>
