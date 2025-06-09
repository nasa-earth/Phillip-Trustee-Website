<!-- components/home/ServicesSection.vue -->
<template>
  <section class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Key Services & Products</h2>
        <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          Comprehensive trustee services tailored to your needs
        </p>
      </div>

      <div class="mt-10">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <!-- Hold Trust Property -->
          <div class="relative group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="relative h-48 w-full overflow-hidden">
              <img src="/services/hold-trust.jpg" alt="Hold Trust Property" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300">
            </div>
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900">Hold Trust Property</h3>
              <p class="mt-2 text-sm text-gray-500">Secure management of your trust assets</p>
              <NuxtLink to="/services#hold-trust" class="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500">
                Learn more
                <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </NuxtLink>
            </div>
          </div>

          <!-- Personal Trust -->
          <div class="relative group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="relative h-48 w-full overflow-hidden">
              <img src="/services/personal-trust.jpg" alt="Personal Trust" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300">
            </div>
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900">Personal Trust</h3>
              <p class="mt-2 text-sm text-gray-500">Personalized trust solutions for individuals</p>
              <NuxtLink to="/services#personal-trust" class="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500">
                Learn more
                <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </NuxtLink>
            </div>
          </div>

          <!-- Escrow Service -->
          <div class="relative group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="relative h-48 w-full overflow-hidden">
              <img src="/services/escrow.jpg" alt="Escrow Service" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300">
            </div>
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900">Escrow Service</h3>
              <p class="mt-2 text-sm text-gray-500">Secure third-party transaction management</p>
              <NuxtLink to="/services#escrow" class="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500">
                Learn more
                <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </NuxtLink>
            </div>
          </div>

          <!-- SPA Service -->
          <div class="relative group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="relative h-48 w-full overflow-hidden">
              <img src="/services/spa.jpg" alt="SPA Service" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300">
            </div>
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900">SPA Service</h3>
              <p class="mt-2 text-sm text-gray-500">Sales & Purchase Agreement handling</p>
              <NuxtLink to="/services#spa" class="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500">
                Learn more
                <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
