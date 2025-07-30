<template>
    <!-- Hero Section -->
    <section
        class="relative h-64 sm:h-80 md:h-96 lg:h-screen w-full flex items-center justify-center bg-cover bg-center"
        :style="{
            backgroundImage: 'url(/images/Services/service_header.jpg)',
        }">
        <!-- Overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-[#001a4d]/50 via-[#0e2a52]/20 to-[#001a4d]/10 z-0"></div>
    </section>

    <!-- Section Title -->
    <section class="bg-[#0c2c59] text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 text-center">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center text-white">
                Sales & Purchase Agreement (SPA) Service
            </h2>
            <p class="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 text-center">
                SPA is a warranty undertaking between the seller and buyer to impose on property conditions,
                transferring of property, and payment terms.

            </p>
            <p class="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 text-center">
                Other expenses for accessory costs includes legal and duty taxes (usually liable by sellers).
            </p>
        </div>
    </section>
    <!-- link to another services page  -->
    <section class="bg-[#003366] text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div class="max-w-7xl mx-auto text-center">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Explore Our Other Services
            </h2>
            <p class="text-base sm:text-lg text-white/80 mb-8 sm:mb-12">
                Discover more ways Phillip Trustee can assist you with your financial needs
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <!-- Hold Trust Property -->
                <div
                    class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#13325e]/80">
                    <div class="h-40 sm:h-48 overflow-hidden">
                        <img src="/images/Services/key_service_img_01.jpg" alt="Hold Trust Property"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div class="p-4 sm:p-6 bg-[#0e2a52]">
                        <h3 class="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Hold Trust Property</h3>
                        <p class="text-sm sm:text-base text-white/70 mb-4 sm:mb-6">
                            Secure fund management and retention services for your investment needs.
                        </p>
                        <NuxtLink to="/Services_hold_property"
                            class="inline-block bg-[#f15a22] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-[#d14615] transition-colors duration-300 font-semibold text-sm sm:text-base">
                            Learn More
                        </NuxtLink>
                    </div>
                </div>

                <!-- Fund retention -->
                <div
                    class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#13325e]/80">
                    <div class="h-40 sm:h-48 overflow-hidden">
                        <img src="/images/Services/key_service_img_02.jpg" alt="Fund Retention"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div class="p-4 sm:p-6 bg-[#0e2a52]">
                        <h3 class="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Hold Personal Trust</h3>
                        <p class="text-sm sm:text-base text-white/70 mb-4 sm:mb-6">
                            Professional property holding and management services for your real estate investments.
                        </p>
                        <NuxtLink to="/Services_fund_retention"
                            class="inline-block bg-[#f15a22] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-[#d14615] transition-colors duration-300 font-semibold text-sm sm:text-base">
                            Learn More
                        </NuxtLink>
                    </div>
                </div>

                <!-- Escrow Service -->
                <div
                    class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#13325e]/80">
                    <div class="h-40 sm:h-48 overflow-hidden">
                        <img src="/images/Services/key_service_img_03.jpg" alt="Escrow Service"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div class="p-4 sm:p-6 bg-[#0e2a52]">
                        <h3 class="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Escrow Service</h3>
                        <p class="text-sm sm:text-base text-white/70 mb-4 sm:mb-6">
                            Sales and Purchase Agreement services to facilitate secure property transactions.
                        </p>
                        <NuxtLink to="/Services_escrow_service"
                            class="inline-block bg-[#f15a22] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-[#d14615] transition-colors duration-300 font-semibold text-sm sm:text-base">
                            Learn More
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>

</script>