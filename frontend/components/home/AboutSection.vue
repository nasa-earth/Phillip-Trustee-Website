<!-- components/home/AboutSection.vue -->
<template>
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">About Us</h2>
      </div>
      <div class="mt-10">
        <div class="prose prose-lg mx-auto text-gray-500">
          <p class="text-xl">
            Phillip Trustee (Cambodia), Co Ltd. was incorporated in June 2022, after the Law of Trust was passed in 2019, allowing foreigners to register their fixed assets with trustee companies in Cambodia. Our specialised license consists of commercial, social and personal trust which has been approved by the Trust Regulator.
          </p>
          <div class="mt-8 flex justify-center">
            <NuxtLink
              to="/about"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Read More
              <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
