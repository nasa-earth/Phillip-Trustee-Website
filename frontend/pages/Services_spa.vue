<template>
    <!-- Hero Section -->
    <section class="relative h-screen w-full flex items-center justify-center bg-cover bg-center" :style="{
        backgroundImage: 'url(/images/Services/client-services.jpg)',
    }">
        <!-- Overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-0"></div>

        <!-- Content -->
        <div class="relative z-10 text-center text-white px-6 max-w-3xl" data-aos="fade-up" data-aos-duration="1200">
            <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-6">
                <span class="text-[#f15a22]">Fund</span>
                Retention
                <span class="text-[#f15a22]">Services</span>
            </h1>
>
        </div>
    </section>

    <!-- Section Title -->
    <section class="bg-[#0c2c59] text-white py-16 px-6 md:px-12">
        <div class="max-w-7xl px-6 py-16 text-center mx-[350px]">
            <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
                Sales & Purchase Agreement (SPA) Service
            </h2>
            <p class="text-lg md:text-xl text-white mb-8 text-center">
                SPA is a warranty undertaking between the seller and buyer to impose on property conditions,
                transferring of property, and payment terms.

            </p>
            <p class="text-lg md:text-xl text-white mb-8 text-center">
                Other expenses for accessory costs includes legal and duty taxes (usually liable by sellers).
            </p>
        </div>
    </section>
    <!-- link to another services page  -->
    <section class="bg-[#003366] text-white py-16 px-6">
        <div class="max-w-7xl mx-auto text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
                Explore Our Other Services
            </h2>
            <p class="text-lg text-white/80 mb-12">
                Discover more ways Phillip Trustee can assist you with your financial needs
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Hold Trust Property -->
                <div
                    class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#13325e]/80">
                    <div class="h-48 overflow-hidden">
                        <img src="/images/Services/key_service_img_01.jpg" alt="Hold Trust Property"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div class="p-6 bg-[#0e2a52]">
                        <h3 class="text-xl font-bold text-white mb-4">Hold Trust Property</h3>
                        <p class="text-white/70 mb-6">
                            Secure fund management and retention services for your investment needs.
                        </p>
                        <NuxtLink to="/Services_hold_property"
                            class="inline-block bg-[#f15a22] text-white px-6 py-3 rounded-md hover:bg-[#d14615] transition-colors duration-300 font-semibold">
                            Learn More
                        </NuxtLink>
                    </div>
                </div>

                <!-- Fund retention -->
                <div
                    class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#13325e]/80">
                    <div class="h-48 overflow-hidden">
                        <img src="/images/Services/key_service_img_02.jpg" alt="Fund Retention"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div class="p-6 bg-[#0e2a52]">
                        <h3 class="text-xl font-bold text-white mb-4">Hold Personal Trust</h3>
                        <p class="text-white/70 mb-6">
                            Professional property holding and management services for your real estate investments.
                        </p>
                        <NuxtLink to="/Services_fund_retention"
                            class="inline-block bg-[#f15a22] text-white px-6 py-3 rounded-md hover:bg-[#d14615] transition-colors duration-300 font-semibold">
                            Learn More
                        </NuxtLink>
                    </div>
                </div>

                <!-- Escrow Service -->
                <div
                    class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#13325e]/80">
                    <div class="h-48 overflow-hidden">
                        <img src="/images/Services/key_service_img_03.jpg" alt="Escrow Service"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div class="p-6 bg-[#0e2a52]">
                        <h3 class="text-xl font-bold text-white mb-4">Escrow Service</h3>
                        <p class="text-white/70 mb-6">
                            Sales and Purchase Agreement services to facilitate secure property transactions.
                        </p>
                        <NuxtLink to="/Services_escrow_service"
                            class="inline-block bg-[#f15a22] text-white px-6 py-3 rounded-md hover:bg-[#d14615] transition-colors duration-300 font-semibold">
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