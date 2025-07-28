<template>
    <div class="min-h-screen"> <!-- Hero Section -->
        <section
            class="relative h-screen w-full flex items-center justify-center bg-cover bg-center overflow-hidden"
            :style="{
                backgroundImage: 'url(/images/Services/service_header.jpg)',
            }">
            <div class="absolute inset-0 z-0">
                <!-- Glass Gradient Overlay -->
                <div
                    class="absolute inset-0 bg-gradient-to-b from-[#001a4d]/50 via-[#0e2a52]/20 to-[#001a4d]/10">
                </div>                
            </div>
            <!-- Content -->
            

            <!-- Scroll Indicator -->
            <div
                class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slow z-10">
                <span class="text-[#e6eaf0]/80 text-sm mb-2">Scroll Down</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#e6eaf0]/80" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section> <!-- What is Trust? Section -->
        <section
            class="bg-gradient-to-b from-[#0a2b5c] to-[#081f42] text-[#e6eaf0] py-32 px-4 md:px-8 relative overflow-hidden mx-auto">
            <!-- Enhanced Background Pattern -->
            <div class="absolute inset-0 opacity-5">
                <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1" fill="white" />
                        </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#dot-pattern)" />
                </svg>
            </div>

            <!-- Decorative Elements -->
            <div
                class="absolute top-20 right-0 w-72 h-72 bg-[#f15a22]/10 rounded-full blur-[120px] -z-0 animate-pulse-slow">
            </div>
            <div
                class="absolute bottom-40 left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -z-0 animate-pulse-slow animation-delay-3000">
            </div>

            <!-- Curved Section Divider at Top -->
            <div class="absolute top-0 left-0 right-0 h-16 overflow-hidden -mt-16 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="absolute bottom-0 w-full h-auto">
                    <path fill="#0a2b5c" fill-opacity="1"
                        d="M0,96L60,112C120,128,240,160,360,160C480,160,600,128,720,128C840,128,960,160,1080,176C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
                    </path>
                </svg>
            </div>

            <div class="container mx-auto relative z-10">
                <div class="flex flex-col items-center mb-20" v-motion-slide-visible-once-bottom>
                    <!-- <span class="text-[#f15a22] text-lg font-medium tracking-wider uppercase mb-3">Understanding
                        Trusts</span> -->
                    <h2
                        class="text-3xl md:text-4xl font-bold text-center mb-6 ">
                        What is Trust?</h2>
                    <!-- <div class="w-32 h-1.5 bg-gradient-to-r from-[#f15a22] to-orange-400 rounded-full mb-8"></div> -->
                    <p class="text-xl text-[#e6eaf0] max-w-3xl text-center leading-relaxed">
                        A trust is a legal arrangement that allows a third party, or trustee, to hold and direct assets
                        in a trust fund on behalf of a beneficiary. Discover how trusts can protect your assets and
                        secure your legacy.
                    </p>
                </div>

                <!-- Row 1: Text left, Image right -->
                <div class="flex flex-col lg:flex-row items-center justify-between gap-16 mb-28 mx-[150px]"
                    v-motion-fade-visible-once>
                    <!-- Left: Content -->
                    <div class="w-full lg:w-1/2 space-y-6" v-motion-slide-visible-once-left>
                        <div class="flex items-center gap-4 mb-6">
                            <div
                                class="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#f15a22]/30 to-[#f15a22]/10 backdrop-blur-sm rounded-2xl">
                                <img src="/images/icons/shield.png" alt="Legal Foundation"
                                    class="w-8 h-8 object-contain" />
                            </div>
                            <h3
                                class="text-2xl md:text-3xl font-bold text-[#f15a22]">
                                Legal Foundation</h3>
                        </div>

                        <p class="text-[#e6eaf0] text-lg leading-relaxed">
                            A trust is a legal arrangement where one party (the trustor) gives another party (the
                            trustee) the right to hold and manage assets for the benefit of a third party (the
                            beneficiary).
                        </p>

                        <p class="text-[#e6eaf0] text-lg leading-relaxed">
                            The Cambodia Trust Law of 2019 provides the legal framework for establishing
                            trusts, enabling foreigners to register their fixed assets with trustee companies in
                            Cambodia.
                        </p>

                        <ul class="space-y-3 mt-6">
                            <li class="flex items-start gap-3">
                                <div
                                    class="w-6 h-6 rounded-full bg-[#f15a22]/20 p-1 mt-1 flex-shrink-0 flex items-center justify-center">
                                    <div class="w-2 h-2 bg-[#f15a22] rounded-full"></div>
                                </div>
                                <span class="text-[#e6eaf0] text-lg">Legal protection for asset transfers</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <div
                                    class="w-6 h-6 rounded-full bg-[#f15a22]/20 p-1 mt-1 flex-shrink-0 flex items-center justify-center">
                                    <div class="w-2 h-2 bg-[#f15a22] rounded-full"></div>
                                </div>
                                <span class="text-[#e6eaf0] text-lg">Regulated by Cambodia's Trust Law framework</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Right: Image -->
                    <div class="w-full lg:w-1/2" v-motion-slide-visible-once-right>
                        <div class="relative group">
                            <!-- Decorative element -->
                            <div
                                class="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-[#f15a22] opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:border-white">
                            </div>
                            <div
                                class="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-[#f15a22] opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:border-white">
                            </div>

                            <!-- Image Container -->
                            <div
                                class="rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500 hover:shadow-orange-500/30 border border-white/10">
                                <img src="/images/Services/Attorney-consults.jpg" alt="Trust Legal Foundation"
                                    class="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105" />

                                <!-- Overlay Gradient -->
                                <div
                                    class="absolute inset-0 bg-gradient-to-t from-[#081f42]/70 via-transparent to-transparent opacity-80">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- Row 2: Image left, Text right -->
                <div class="flex flex-col lg:flex-row-reverse items-center justify-between gap-16 mb-28 mx-[150px]"
                    v-motion-fade-visible-once>
                    <!-- Right: Content -->
                    <div class="w-full lg:w-1/2 space-y-6" v-motion-slide-visible-once-right>
                        <div class="flex items-center gap-4 mb-6">
                            <div
                                class="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#f15a22]/30 to-[#f15a22]/10 backdrop-blur-sm rounded-2xl">
                                <img src="/images/icons/collaboration.png" alt="Trust Relationship"
                                    class="w-8 h-8 object-contain" />
                            </div>
                            <h3
                                class="text-2xl md:text-3xl font-bold bg-clip-text text-[#f15a22]">
                                Trust Relationship</h3>
                        </div>

                        <p class="text-[#e6eaf0] text-lg leading-relaxed">
                            Trust relationships involve three key parties: the trustor (who creates the trust), the
                            trustee (who manages the trust), and the beneficiaries (who benefit from the trust).
                        </p>

                        <p class="text-[#e6eaf0] text-lg leading-relaxed">
                            At Phillip Trustee (Cambodia), we act as your trusted partner, providing specialized
                            management
                            of assets while ensuring compliance with Cambodian regulations and protecting your
                            interests.
                        </p>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div
                                class="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-[#f15a22]/30 transition-all duration-300 hover:bg-white/10 group">
                                <div class="flex items-center gap-3 mb-2">
                                    <img src="/images/icons/user.png" alt="Trustor" class="w-6 h-6" />
                                    <h4
                                        class="font-semibold text-[#e6eaf0] group-hover:text-[#f15a22] transition-colors">
                                        Trustor</h4>
                                </div>
                                <p class="text-[#e6eaf0]/80 text-sm">Creates and funds the trust</p>
                            </div>
                            <div
                                class="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-[#f15a22]/30 transition-all duration-300 hover:bg-white/10 group">
                                <div class="flex items-center gap-3 mb-2">
                                    <img src="/images/icons/shield.png" alt="Trustee" class="w-6 h-6" />
                                    <h4
                                        class="font-semibold text-[#e6eaf0] group-hover:text-[#f15a22] transition-colors">
                                        Trustee</h4>
                                </div>
                                <p class="text-[#e6eaf0]/80 text-sm">Manages trust assets</p>
                            </div>
                            <div
                                class="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-[#f15a22]/30 transition-all duration-300 hover:bg-white/10 group">
                                <div class="flex items-center gap-3 mb-2">
                                    <img src="/images/icons/multiple-users-silhouette.png" alt="Beneficiaries"
                                        class="w-6 h-6" />
                                    <h4
                                        class="font-semibold text-[#e6eaf0] group-hover:text-[#f15a22] transition-colors">
                                        Beneficiaries</h4>
                                </div>
                                <p class="text-[#e6eaf0]/80 text-sm">Receives trust benefits</p>
                            </div>
                        </div>
                    </div>

                    <!-- Left: Image -->
                    <div class="w-full lg:w-1/2" v-motion-slide-visible-once-left>
                        <div class="relative group">
                            <!-- Floating elements -->
                            <div
                                class="absolute -top-6 -right-6 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow z-0">
                            </div>

                            <!-- Image frame with styled border -->
                            <div
                                class="relative rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500 hover:shadow-orange-500/30 border border-white/10 z-10">
                                <img src="/images/Services/client-value.jpg" alt="Trust Relationship"
                                    class="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105" />

                                <!-- Overlay with gradient -->
                                <div
                                    class="absolute inset-0 bg-gradient-to-t from-[#081f42]/70 via-transparent to-transparent opacity-80">
                                </div>
                            </div>

                            <!-- Decorative dots pattern -->
                            <div class="absolute -bottom-4 -left-4 w-24 h-24 opacity-60">
                                <div class="grid grid-cols-3 gap-2">
                                    <div v-for="i in 9" :key="`dot-${i}`" class="w-2 h-2 bg-[#f15a22] rounded-full">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- Row 3: Text left, Image right -->
                <div class="flex flex-col lg:flex-row items-center justify-between gap-16 mx-[150px]"
                    v-motion-fade-visible-once>
                    <!-- Left: Content -->
                    <div class="w-full lg:w-1/2 space-y-6" v-motion-slide-visible-once-left>
                        <div class="flex items-center gap-4 mb-6">
                            <div
                                class="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#f15a22]/30 to-[#f15a22]/10 backdrop-blur-sm rounded-2xl">
                                <img src="/images/icons/diamond.png" alt="Benefits" class="w-8 h-8 object-contain" />
                            </div>
                            <h3
                                class="text-2xl md:text-3xl font-bold bg-clip-text text-[#f15a22]">
                                Benefits of Trust Services</h3>
                        </div>

                        <p class="text-[#e6eaf0] text-lg leading-relaxed">
                            Establishing a trust in Cambodia offers numerous advantages for both individuals and
                            organizations
                            seeking to protect and manage their assets effectively.
                        </p>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div class="flex items-start gap-4 group">
                                <div
                                    class="w-10 h-10 rounded-lg bg-[#f15a22]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#f15a22]/30 transition-all duration-300">
                                    <img src="/images/icons/shield.png" alt="Asset Protection" class="w-5 h-5" />
                                </div>
                                <div>
                                    <h4
                                        class="font-semibold text-[#e6eaf0] group-hover:text-[#f15a22] transition-colors duration-300 mb-1">
                                        Asset Protection</h4>
                                    <p class="text-[#e6eaf0]/80 text-sm leading-relaxed">Safeguard your assets from
                                        creditors and legal claims</p>
                                </div>
                            </div>

                            <div class="flex items-start gap-4 group">
                                <div
                                    class="w-10 h-10 rounded-lg bg-[#f15a22]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#f15a22]/30 transition-all duration-300">
                                    <img src="/images/icons/commercial.png" alt="Foreign Investment" class="w-5 h-5" />
                                </div>
                                <div>
                                    <h4
                                        class="font-semibold text-[#e6eaf0] group-hover:text-[#f15a22] transition-colors duration-300 mb-1">
                                        Foreign Investment</h4>
                                    <p class="text-[#e6eaf0]/80 text-sm leading-relaxed">Simplified processes for
                                        international investors</p>
                                </div>
                            </div>

                            <div class="flex items-start gap-4 group">
                                <div
                                    class="w-10 h-10 rounded-lg bg-[#f15a22]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#f15a22]/30 transition-all duration-300">
                                    <img src="/images/icons/income.png" alt="Tax Efficiency" class="w-5 h-5" />
                                </div>
                                <div>
                                    <h4
                                        class="font-semibold text-[#e6eaf0] group-hover:text-[#f15a22] transition-colors duration-300 mb-1">
                                        Tax Efficiency</h4>
                                    <p class="text-[#e6eaf0]/80 text-sm leading-relaxed">Optimize tax obligations and
                                        financial planning</p>
                                </div>
                            </div>

                            <div class="flex items-start gap-4 group">
                                <div
                                    class="w-10 h-10 rounded-lg bg-[#f15a22]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#f15a22]/30 transition-all duration-300">
                                    <img src="/images/icons/multiple-users-silhouette.png" alt="Succession Planning"
                                        class="w-5 h-5" />
                                </div>
                                <div>
                                    <h4
                                        class="font-semibold text-[#e6eaf0] group-hover:text-[#f15a22] transition-colors duration-300 mb-1">
                                        Succession Planning</h4>
                                    <p class="text-[#e6eaf0]/80 text-sm leading-relaxed">Ensure smooth transfer of
                                        assets to
                                        future generations</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Image -->
                    <div class="w-full lg:w-1/2" v-motion-slide-visible-once-right>
                        <div class="relative group">
                            <!-- Glass Effect Card -->
                            <div
                                class="absolute -top-6 -right-6 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-[#f15a22]/20 to-blue-500/10 rounded-2xl backdrop-blur-sm border border-white/10 transform rotate-6 group-hover:rotate-3 transition-all duration-500 z-0">
                            </div>

                            <!-- Main Image -->
                            <div
                                class="relative rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500 hover:shadow-orange-500/30 border border-white/10 z-10">
                                <img src="/images/Services/trustee-image.jpg" alt="Benefits of Trust Services"
                                    class="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105" />

                                <!-- Overlay with gradient -->
                                <div
                                    class="absolute inset-0 bg-gradient-to-t from-[#081f42]/70 via-transparent to-transparent opacity-80">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Divider with Wave -->
        <div class="relative h-24 bg-[#081f42] overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="absolute bottom-0 w-full">
                <path fill="#0e2a52" fill-opacity="1"
                    d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,138.7C672,139,768,181,864,197.3C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                </path>
            </svg>
        </div>

        <!-- Types of Trust -->
        <section class="bg-gradient-to-b from-[#0e2a52] to-[#081f42] py-32 px-4 relative overflow-hidden">
            <!-- Enhanced Background Pattern -->
            <div class="absolute inset-0 opacity-5">
                <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="dot-pattern-trust" x="0" y="0" width="20" height="20"
                            patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1" fill="white" />
                        </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#dot-pattern-trust)" />
                </svg>
            </div>

            <!-- Enhanced Decorative Elements -->
            <div
                class="absolute top-20 left-0 w-96 h-96 bg-gradient-to-r from-[#f15a22]/20 to-orange-500/5 rounded-full blur-[120px] -z-10 animate-pulse-slow">
            </div>
            <div
                class="absolute bottom-40 right-10 w-80 h-80 bg-gradient-to-l from-blue-600/10 to-white/5 rounded-full blur-[100px] -z-10 animate-pulse-slow animation-delay-2000">
            </div>

            <!-- Floating elements -->
            <div
                class="absolute top-1/4 right-1/4 w-8 h-8 border-4 border-[#f15a22]/30 rounded-full animate-bounce-slow animation-delay-1000">
            </div>
            <div
                class="absolute bottom-1/3 left-1/4 w-12 h-12 border-4 border-dashed border-white/20 rounded-full animate-spin-slow">
            </div>

            <div class="container mx-auto relative z-10">
                <!-- Header -->
                <div class="flex flex-col items-center mb-20" v-motion-fade-visible-once>
                    <h2 class="text-4xl md:text-4xl font-bold text-[#e6eaf0] mb-6 t ext-center">
                        Types of Trust in <span class="text-[#f15a22]">Cambodia</span>
                    </h2>
                </div> 
                <!-- Enhanced Slider with 3D effects and better interaction -->
                <div class="relative px-4 md:px-10" v-motion-fade-visible-once>
                    <!-- Glass Effect Background Panel -->
                    <div
                        class="absolute inset-0 -mx-10 -my-6 bg-white/5 backdrop-filter backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl z-0">
                    </div> <!-- Left Navigation Button with enhanced visibility and call-to-action -->
                    <button @click="slideTrustTypesLeft"
                        class="absolute -left-5 md:left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm hover:from-[#f15a22] hover:to-orange-500 transition-all duration-500 text-[#0e2a52] hover:text-[#e6eaf0] p-4 md:p-5 rounded-full shadow-xl hover:shadow-2xl hover:shadow-[#f15a22]/30 focus:outline-none hover:-translate-x-1 hover:-translate-y-1 transform active:scale-95"
                        :class="{ 'animate-pulse-slow': trustTypeSlideIndex > 0 }" aria-label="Previous type of trust">
                        <div class="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 19l-7-7 7-7" />
                            </svg>

                            <!-- Pulsating indicator for better visibility -->
                            <span v-if="trustTypeSlideIndex > 0"
                                class="absolute -top-1 -right-1 h-3 w-3 bg-[#f15a22] rounded-full animate-pulse-slow"></span>
                        </div>
                    </button>

                    <!-- Enhanced Slider Viewport with 3D perspective and smoother transitions -->
                    <div class="overflow-hidden px-4 py-10 relative z-10 ">
                        <div class="flex transition-all duration-1000 ease-out transform"
                            :style="{ transform: `translateX(-${trustTypeSlideIndex * 100 / visibleSlides}%)` }"
                            ref="trustTypeSlider">
                            <div v-for="(type, index) in trustTypes" :key="type.title"
                                class="flex-shrink-0 px-4 md:px-6" :style="{ width: `${100 / visibleSlides}%` }">
                                <!-- Enhanced Card with 3D Transform and Glassmorphism -->
                                <div class="h-full perspective-card group"
                                    :class="{ 'active-card': trustTypeSlideIndex === Math.floor(index / visibleSlides) }">
                                    <div
                                        class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl h-full p-8 md:p-10 flex flex-col items-center text-center transition-all duration-700 border border-white/10 hover:border-[#f15a22]/30 shadow-2xl transform hover:-translate-y-3 hover:shadow-[#f15a22]/20 card-inner">


                                        <!-- Enhanced Icon Container with 3D hover effect -->
                                        <div
                                            class="mb-8 relative group-hover:transform group-hover:translate-z-10 transition-all duration-500">
                                            <div
                                                class="absolute inset-0 bg-gradient-to-br from-[#f15a22]/40 to-[#f15a22]/10 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700">
                                            </div>
                                            <div
                                                class="relative bg-gradient-to-br from-[#f15a22]/30 to-[#f15a22]/5 p-8 rounded-2xl group-hover:bg-[#f15a22]/20 transition-all duration-500 transform group-hover:scale-110 overflow-hidden">
                                                <!-- Animated background pattern -->
                                                <div class="absolute inset-0 opacity-30">
                                                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                                        <defs>
                                                            <pattern id="smallGrid" width="8" height="8"
                                                                patternUnits="userSpaceOnUse">
                                                                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white"
                                                                    stroke-width="0.2"></path>
                                                            </pattern>
                                                        </defs>
                                                        <rect width="100%" height="100%" fill="url(#smallGrid)"></rect>
                                                    </svg>
                                                </div>

                                                <img :src="getIconImagePath(type.title)" :alt="`${type.title} icon`"
                                                    class="w-16 h-16 object-contain relative z-10 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-700" />
                                            </div>
                                        </div>

                                        <!-- Title with enhanced hover effect -->
                                        <h4
                                            class="text-xl font-bold text-[#e6eaf0] mb-4 relative group-hover:text-[#f15a22] transition-colors duration-500">
                                            {{ type.title }}
                                        </h4>

                                        <!-- Description with enhanced readability -->
                                        <p class="text-[#e6eaf0]/80 text-lg leading-relaxed flex-grow">{{ type.desc }}
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> <!-- Enhanced Right Navigation Button with more visibility -->
                    <button @click="slideTrustTypesRight"
                        class="absolute -right-5 md:right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm hover:from-[#f15a22] hover:to-orange-500 transition-all duration-500 text-[#0e2a52] hover:text-[#e6eaf0] p-4 md:p-5 rounded-full shadow-xl hover:shadow-2xl hover:shadow-[#f15a22]/30 focus:outline-none hover:translate-x-1 hover:-translate-y-1 transform active:scale-95"
                        :class="{ 'animate-pulse-slow': trustTypeSlideIndex < Math.ceil(trustTypes.length / visibleSlides) - 1 }"
                        aria-label="Next type of trust">
                        <div class="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7" />
                            </svg>

                            <!-- Pulsating indicator when there are more slides -->
                            <span v-if="trustTypeSlideIndex < Math.ceil(trustTypes.length / visibleSlides) - 1"
                                class="absolute -top-1 -left-1 h-3 w-3 bg-[#f15a22] rounded-full animate-pulse-slow"></span>
                        </div>
                    </button><!-- Enhanced Slide Indicators with Animation and More Clarity -->
                    <div class="flex flex-col items-center space-y-4 mt-12 relative z-10">

                        <!-- Visual Indicators -->
                        <div class="flex justify-center space-x-4">
                            <button v-for="(_, index) in Math.ceil(trustTypes.length / visibleSlides)" :key="index"
                                @click="goToTrustTypeSlide(index)" :class="[
                                    'focus:outline-none transition-all duration-700 overflow-hidden rounded-full',
                                    trustTypeSlideIndex === index
                                        ? 'bg-gradient-to-r from-[#f15a22] to-orange-400 w-16 h-4 shadow-lg shadow-[#f15a22]/30 animate-pulse-slow'
                                        : 'bg-white/20 hover:bg-white/40 w-4 h-4 hover:scale-110 transform'
                                ]" :aria-label="`Go to slide ${index + 1}`">
                                <span class="sr-only">Slide {{ index + 1 }}</span>
                            </button>
                        </div>

                        <!-- Trust Type Names Listed to Show All Available Options -->
                        <!-- <div class="flex flex-wrap justify-center gap-3 mt-2">
                            <button v-for="(type, index) in trustTypes" :key="type.title"
                                @click="goToTrustTypeSlide(Math.floor(index / visibleSlides))"
                                class="text-xs px-3 py-1 rounded-full border transition-all duration-300" :class="[
                                    Math.floor(index / visibleSlides) === trustTypeSlideIndex && (index % visibleSlides) < visibleSlides
                                        ? 'bg-[#f15a22] text-[#e6eaf0] border-[#f15a22]'
                                        : 'text-[#e6eaf0]/70 border-white/20 hover:border-white/50 hover:text-[#e6eaf0]'
                                ]">
                                {{ type.title }}
                            </button>
                        </div> -->
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Divider with Angled Design -->
        <div class="relative h-24 bg-[#081f42] overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="absolute bottom-0 w-full">
                <path fill="#0a2b5c" fill-opacity="1"
                    d="M0,96L48,106.7C96,117,192,139,288,154.7C384,171,480,181,576,165.3C672,149,768,107,864,101.3C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                </path>
            </svg>
        </div>

        <!-- Key Services and Products -->
        <section class="bg-gradient-to-b from-[#0a2b5c] to-[#081f42] py-32 px-4 relative overflow-hidden">
            <!-- Enhanced Background Pattern -->
            <div class="absolute inset-0 opacity-5">
                <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="dot-pattern-services" x="0" y="0" width="20" height="20"
                            patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1" fill="white" />
                        </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#dot-pattern-services)" />
                </svg>
            </div>

            <!-- Enhanced Decorative Elements -->
            <div
                class="absolute top-20 right-10 w-80 h-80 bg-gradient-to-br from-[#f15a22]/20 to-orange-500/5 rounded-full blur-[150px] -z-10 animate-pulse-slow">
            </div>
            <div
                class="absolute bottom-40 left-10 w-96 h-96 bg-gradient-to-l from-blue-600/10 to-white/5 rounded-full blur-[120px] -z-10 animate-pulse-slow animation-delay-2500">
            </div>

            <!-- Decorative Elements - Floating shapes -->
            <div class="absolute left-1/4 top-40 opacity-20">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="animate-spin-slow">
                    <circle cx="40" cy="40" r="32" stroke="white" stroke-width="2" stroke-dasharray="5 5" />
                </svg>
            </div>
            <div class="absolute right-1/3 bottom-40 opacity-20">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="animate-bounce-slow">
                    <rect x="10" y="10" width="40" height="40" stroke="#f15a22" stroke-width="2"
                        stroke-dasharray="4 4" />
                </svg>
            </div>

            <div class="container mx-auto relative z-10">
                <div class="flex flex-col items-center mb-20" v-motion-fade-visible-once>
                    <h2 class="text-4xl md:text-4xl font-bold text-[#e6eaf0] mb-6 text-center">Key Services & Products
                    </h2>
                    <!-- <div class="w-32 h-1.5 bg-gradient-to-r from-[#f15a22] to-orange-400 rounded-full mb-8"></div> -->
                    <!-- <p class="text-xl text-[#e6eaf0] max-w-3xl mx-auto text-center leading-relaxed">
                        We offer comprehensive trust services to protect your assets and secure your future with
                        expertise and reliability that you can depend on.
                    </p> -->
                </div>
                <div class="flex flex-col space-y-6 mx-[150px]" v-motion-fade-visible-once>
                    <div v-for="(service, index) in services" :key="service.id" v-motion-slide-visible-once-bottom
                        class="bg-gradient-to-br from-white/5 to-white/15 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl overflow-hidden hover:shadow-xl hover:shadow-[#f15a22]/20 transition-all duration-500 group animate-card animation-delay-300"
                        :style="{ animationDelay: `${index * 150}ms` }">
                        <div class="flex flex-col md:flex-row">
                            <!-- Left: Image with Enhanced Visual Effects -->
                            <div class="md:w-2/5 relative overflow-hidden">
                                <!-- Main Image -->
                                <img :src="service.image" :alt="service.title"
                                    class="w-full h-full object-cover object-center md:h-60 group-hover:scale-110 transition-transform duration-1000 ease-in-out" />

                                <!-- Enhanced Gradient Overlay -->
                                <div
                                    class="absolute inset-0 to-transparent md:bg-gradient-to-l">
                                </div>

                                <!-- Service Number Badge -->
                                <div class="absolute top-3 left-3 w-8 h-8 flex items-center justify-center">
                                    <div
                                        class="absolute inset-0 bg-[#ffff]/80 backdrop-blur-sm rounded-full transform rotate-45 group-hover:rotate-0 transition-all duration-700">
                                    </div>
                                    <span class="relative text-[#f15a22] text-lg font-bold">0{{ service.id }}</span>
                                </div>
                            </div>

                            <!-- Right: Enhanced Content with Category and Features -->
                            <div
                                class="md:w-3/5 p-4 md:p-6 flex flex-col justify-between relative bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                                <div class="mb-4">
                                    <h3
                                        class="text-xl md:text-2xl font-bold text-[#e6eaf0] group-hover:text-[#f15a22] mb-2 transition-colors duration-300">
                                        {{ service.title }}
                                    </h3>

                                    <!-- Service Description -->
                                    <p class="text-[#e6eaf0]/80 mb-4 leading-relaxed text-base line-clamp-3">
                                        {{ service.desc }}
                                    </p>
                                </div>

                                <!-- CTA Button with Enhanced Animation -->
                                <div>
                                    <NuxtLink :to="getServiceRoute(service)"
                                        class="w-33 px-3 py-1.5 bg-[#f15a22] hover:bg-orange-600 text-[#e6eaf0] shadow-md transition-all rounded-full duration-300 flex items-center space-x-2 text-xs font-medium group-hover:translate-y-0 transform hover:-translate-y-1 active:scale-95">
                                        <span>Learn More</span>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300"
                                            viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Enhanced Modal for Service Details -->
        <transition name="fade">
            <div v-if="modalOpen"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <!-- Animated Background Patterns -->
                <div class="absolute inset-0 overflow-hidden opacity-10">
                    <div class="absolute top-0 left-0 w-full h-full">
                        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="modal-grid" x="0" y="0" width="40" height="40"
                                    patternUnits="userSpaceOnUse">
                                    <path d="M0 0 L40 0 L40 40 L0 40 Z" fill="none" stroke="white" stroke-width="0.5">
                                    </path>
                                </pattern>
                            </defs>
                            <rect x="0" y="0" width="100%" height="100%" fill="url(#modal-grid)"></rect>
                        </svg>
                    </div>
                    <div
                        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#f15a22]/30 to-blue-500/20 blur-[120px] animate-spin-slow">
                    </div>
                </div>

                <!-- Modal Content with Split Design -->
                <div class="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden relative animate-modal">
                    <!-- Close Button -->
                    <button @click="closeModal"
                        class="absolute top-6 right-6 z-50 w-10 h-10 bg-white/80 backdrop-blur-sm hover:bg-[#f15a22] text-[#f15a22] hover:text-[#e6eaf0] rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#f15a22] focus:ring-opacity-50 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>

                    <div class="flex flex-col md:flex-row">
                        <!-- Left Image Section -->
                        <div class="md:w-2/5 relative">
                            <!-- Image Container with Overlay -->
                            <div class="h-64 md:h-full relative overflow-hidden">
                                <div class="absolute inset-0 bg-gradient-to-r from-[#13325e] to-[#13325e]/80"></div>
                                <img :src="selectedService.image" :alt="selectedService.title"
                                    class="w-full h-full object-cover object-center opacity-75 scale-110 hover:scale-125 transition-transform duration-2000" />

                                <!-- Decorative Elements -->
                                <div class="absolute bottom-6 left-6 flex flex-col">
                                    <span class="text-xs uppercase tracking-wider text-[#e6eaf0]/60">Phillip
                                        Trustee</span>
                                    <span class="text-2xl font-bold text-[#e6eaf0]">Professional Services</span>
                                </div>

                                <!-- Service Icon Badge -->
                                <div
                                    class="absolute top-6 right-6 w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/20">
                                    <img :src="getServiceIcon(selectedService.title)" alt="Service icon"
                                        class="w-full h-full object-contain" />
                                </div>
                            </div>
                        </div>

                        <!-- Right Content Section -->
                        <div class="md:w-3/5 p-8 md:p-10">
                            <div class="flex flex-col h-full">
                                <!-- Header -->
                                <div>
                                    <h3 class="text-2xl md:text-xl font-bold text-[#13325e] mb-3">
                                        {{ selectedService.title }}
                                    </h3>
                                    <div
                                        class="w-20 h-1.5 bg-gradient-to-r from-[#f15a22] to-orange-400 rounded-full mb-6">
                                    </div>
                                </div>

                                <!-- Main Content -->
                                <div class="flex-grow">
                                    <p class="text-[#13325e]/80 text-lg mb-6 leading-relaxed">
                                        {{ selectedService.desc }}
                                    </p>
                                    <p class="text-[#13325e]/70 text-base mb-8">
                                        {{ selectedService.details }}
                                    </p>

                                    <!-- Feature List -->
                                    <div class="mb-8">
                                        <h4 class="text-lg font-semibold text-[#13325e] mb-3">Key Features:</h4>
                                        <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <li v-for="(feature, idx) in getServiceFeatures(selectedService.title)"
                                                :key="idx" class="flex items-start gap-3 group">
                                                <div
                                                    class="w-6 h-6 rounded-full bg-[#f15a22]/10 p-1 mt-1 flex-shrink-0 flex items-center justify-center group-hover:bg-[#f15a22]/30 transition-colors duration-300">
                                                    <div class="w-2 h-2 bg-[#f15a22] rounded-full"></div>
                                                </div>
                                                <span
                                                    class="text-[#13325e]/80 group-hover:text-[#13325e] transition-colors duration-300">
                                                    {{ feature }}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <!-- Action Buttons -->
                                <div class="flex flex-wrap gap-4">
                                    <button @click="closeModal"
                                        class="bg-gradient-to-r from-[#f15a22] to-orange-500 text-[#e6eaf0] py-3 px-8 rounded-full shadow-lg shadow-[#f15a22]/20 hover:shadow-[#f15a22]/40 transition-all duration-300 hover:-translate-y-1 transform active:scale-95 focus:outline-none">
                                        <span class="flex items-center gap-2">
                                            <span>Close</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </span>
                                    </button>
                                    <button
                                        class="bg-white border-2 border-[#13325e] text-[#13325e] py-3 px-8 rounded-full hover:bg-[#13325e] hover:text-[#e6eaf0] transition-colors duration-300 shadow-lg hover:shadow-[#13325e]/20 focus:outline-none">
                                        <span class="flex items-center gap-2">
                                            <span>Contact Us</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
// Example icon components (replace with your own or use Heroicons/FontAwesome)
const MoneyIcon = {
    template: '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2"/><circle cx="12" cy="12" r="3"/></svg>'
};
const BriefcaseIcon = {
    template: '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M16 7V5a4 4 0 0 0-8 0v2"/></svg>'
};
const UsersIcon = {
    template: '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>'
};
const HeartIcon = {
    template: '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z"/></svg>'
};
const UserIcon = {
    template: '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a6 6 0 0 1 12 0v2"/></svg>'
};

export default {
    name: 'ServicePage',
    components: {},
    data() {
        return {
            trustTypes: [
                { title: 'Financial Trust', desc: 'Grants or sub-loans provided by development partners for the purpose of developing banking and micro-financial sector in Cambodia.', icon: MoneyIcon },
                { title: 'Commercial Trust', desc: 'Created for the purpose of making profits or other purposes, for the benefits of the Trust Contributor or the person acknowledged by the Trust Contributor.', icon: BriefcaseIcon },
                { title: 'Public Trust', desc: 'Created for the benefits of Cambodian people in general', icon: UsersIcon },
                { title: 'Social Trust', desc: 'Created when a trustor donates his/her property to the trustee for social benefits such as culture, education, humanity, religions, or science', icon: HeartIcon },
                { title: 'Personal Trust', desc: `Created by the Trustor for the purpose of transferring assets or funds to Trustee to manage and safeguard for the Trustor's own benefits or for certain individuals.`, icon: UserIcon },
            ],
            trustRoles: [
                { title: 'Trustor', desc: 'The individual who gives their assets or initial funds to the trust with the right to receive information about the trust management and appointment or termination of the trustee.', icon: UserIcon },
                { title: 'Trustee', desc: 'The person who has the right to manage and administer the trust from another trustor for the benefit of the beneficiary, in accordance with the letter of trust or regulations in force.', icon: BriefcaseIcon },
                { title: 'Beneficiaries', desc: 'The individual(s) who benefits from the trust on the date the trust comes into force, with the exception of certain conditions.', icon: UsersIcon },
            ],
            services: [
                {
                    id: 1,
                    title: 'Hold Trust Property',
                    image: '/images/services/key_service_img_01.jpg',
                    desc: 'We securely hold and manage trust property on behalf of our clients, ensuring compliance and transparency across all asset classes.',
                    details: 'Our trust property holding services provide a secure framework for asset management that complies with all relevant regulations. Our expert team ensures transparent administration and reporting, giving you peace of mind about your valuable assets.'
                },
                {
                    id: 2,
                    title: 'Hold Personal Trust',
                    image: '/images/services/key_service_img_02.jpg',
                    desc: 'Personal trust services tailored to your needs, safeguarding your assets for your benefit or your loved ones with personalized attention.',
                    details: 'Our personal trust services are designed with your unique needs in mind. We work closely with you to develop customized solutions for asset protection, wealth preservation, and efficient succession planning that aligns with your goals.'
                },
                {
                    id: 3,
                    title: 'Escrow Services',
                    image: '/images/services/key_service_img_03.jpg',
                    desc: 'Professional escrow services for secure transactions and peace of mind when engaging in high-value business deals in Cambodia.',
                    details: 'Our escrow services provide a neutral third-party solution that protects all parties in complex transactions. We verify conditions are met before funds are released, ensuring security and confidence throughout the process.'
                },
                {
                    id: 4,
                    title: 'Sales and Purchase Agreement (SPA) Services',
                    image: '/images/services/key_service_img_04.jpg',
                    desc: 'Expert handling of SPA services to facilitate smooth and secure property transactions that protect your interests.',
                    details: 'Our comprehensive SPA services guide you through every step of property transactions in Cambodia. We ensure all documentation is properly executed, legal requirements are met, and your interests are protected throughout the transaction process.'
                },
            ],
            modalOpen: false,
            selectedService: {},
            trustTypeSlideIndex: 0,
            visibleSlides: 3, // Default for desktop
            serviceFeatures: {
                'Hold Trust Property': [
                    'Secure asset management',
                    'Regulatory compliance',
                    'Transparent reporting',
                    'Multi-asset class support',
                    'Regular performance reviews',
                    'Detailed financial tracking'
                ],
                'Personal Trust Services': [
                    'Custom trust solutions',
                    'Asset protection strategies',
                    'Succession planning',
                    'Tax optimization',
                    'Wealth preservation',
                    'Family legacy planning'
                ],
                'Escrow Services': [
                    'Secure transaction handling',
                    'Third-party verification',
                    'Document authentication',
                    'Condition monitoring',
                    'Transparent fund management',
                    'Risk mitigation'
                ],
                'Sales and Purchase Agreement (SPA) Services': [
                    'Legal documentation',
                    'Contract verification',
                    'Compliance checking',
                    'Transfer facilitation',
                    'Regulatory adherence',
                    'Interest protection'
                ]
            },
            serviceCategories: {
                'Hold Trust Property': 'Asset Management',
                'Personal Trust Services': 'Individual Solutions',
                'Escrow Services': 'Financial Security',
                'Sales and Purchase Agreement (SPA) Services': 'Legal Documentation'
            },
            serviceIcons: {
                'Hold Trust Property': '/images/icons/shield.png',
                'Personal Trust Services': '/images/icons/user.png',
                'Escrow Services': '/images/icons/income.png',
                'Sales and Purchase Agreement (SPA) Services': '/images/icons/commercial.png'
            },
        }
    }, mounted() {
        this.updateVisibleSlides();
        window.addEventListener('resize', this.updateVisibleSlides);

        // Add scroll animations for parallax effects
        window.addEventListener('scroll', this.handleScroll);

        // Cycle through slides to show users there are more trust types available
        if (this.trustTypes.length > this.visibleSlides) {
            // Initial attention-grabbing animation
            setTimeout(() => {
                // Move to next slide after 2 seconds
                this.slideTrustTypesRight();

                // Move back to first slide after 4 seconds
                setTimeout(() => {
                    this.slideTrustTypesLeft();
                }, 2000);
            }, 2000);
        }
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateVisibleSlides);
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        openModal(idx) {
            this.selectedService = this.services[idx];
            this.modalOpen = true;
            // Disable scrolling when modal is open
            document.body.style.overflow = 'hidden';
        },
        closeModal() {
            this.modalOpen = false;
            setTimeout(() => {
                this.selectedService = {};
                // Re-enable scrolling when modal is closed
                document.body.style.overflow = 'auto';
            }, 300);
        },
        // Slider navigation methods with enhanced animations
        slideTrustTypesLeft() {
            if (this.trustTypeSlideIndex > 0) {
                this.trustTypeSlideIndex--;
                this.animateSliderTransition();
            } else {
                // Bounce effect for limits
                this.applyBounceEffect('left');
            }
        },
        slideTrustTypesRight() {
            const maxIndex = Math.ceil(this.trustTypes.length / this.visibleSlides) - 1;
            if (this.trustTypeSlideIndex < maxIndex) {
                this.trustTypeSlideIndex++;
                this.animateSliderTransition();
            } else {
                // Bounce effect for limits
                this.applyBounceEffect('right');
            }
        },
        goToTrustTypeSlide(index) {
            this.trustTypeSlideIndex = index;
            this.animateSliderTransition();
        },
        updateVisibleSlides() {
            // Responsive behavior: adjust visible slides based on screen width
            if (window.innerWidth < 640) {
                this.visibleSlides = 1; // Mobile view
            } else if (window.innerWidth < 1024) {
                this.visibleSlides = 2; // Tablet view
            } else if (window.innerWidth < 1440) {
                this.visibleSlides = 3; // Standard desktop view
            } else {
                this.visibleSlides = 4; // Large desktop view - show 4 cards at once to ensure "Personal Trust" is more likely to be seen
            }

            // Reset current slide index if needed
            const maxIndex = Math.ceil(this.trustTypes.length / this.visibleSlides) - 1;
            if (this.trustTypeSlideIndex > maxIndex) {
                this.trustTypeSlideIndex = maxIndex;
            }
        },
        getIconImagePath(title) {
            // Map trust types to icon image paths
            const iconMap = {
                'Financial Trust': '/images/icons/income.png',
                'Commercial Trust': '/images/icons/commercial.png',
                'Public Trust': '/images/icons/multiple-users-silhouette.png',
                'Social Trust': '/images/icons/collaboration.png',
                'Personal Trust': '/images/icons/user.png',
            };

            return iconMap[title] || '/images/icons/money-bag.png'; // Default fallback icon
        },
        getServiceIcon(title) {
            // Return the specific icon for each service
            return this.serviceIcons[title] || '/images/icons/shield.png';
        },
        getServiceCategory(title) {
            // Return the category for each service
            return this.serviceCategories[title] || 'Trust Services';
        }, getServiceFeatures(title) {
            // Return features list for each service
            return this.serviceFeatures[title] || [];
        }, getServiceRoute(service) {
            // Return the appropriate route based on service title
            const routeMap = {
                'Hold Trust Property': '/Services_hold_property',
                'Personal Trust Services': '/Services_fund_retention', // Mapping to fund retention as closest match
                'Escrow Services': '/Services_escrow_service',
                'Sales and Purchase Agreement (SPA) Services': '/Services_spa'
            };

            return routeMap[service.title] || `/service/${service.id}`;
        },
        // Animation and visual effect methods
        animateSliderTransition() {
            // Apply a smooth animation effect when changing slides
            const slider = this.$refs.trustTypeSlider;
            if (slider) {
                slider.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
                setTimeout(() => {
                    slider.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                }, 700);
            }
        },
        applyBounceEffect(direction) {
            // Apply a bounce effect when trying to navigate beyond limits
            const slider = this.$refs.trustTypeSlider;
            if (slider) {
                const currentTransform = slider.style.transform;
                const offset = direction === 'left' ? 2 : -2;

                // Apply quick bounce
                slider.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
                slider.style.transform = `translateX(${offset}%)`;

                // Return to original position
                setTimeout(() => {
                    slider.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    slider.style.transform = currentTransform;
                }, 200);
            }
        },
        handleScroll() {
            // Implement parallax scroll effects for various elements
            const scrollY = window.scrollY;

            // Calculate parallax effects for decorative elements
            // This creates a subtle movement as the user scrolls
            const decorElements = document.querySelectorAll('.animate-float');
            decorElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-speed') || 0.05);
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }
    }
}
</script>

<style scoped>
@import '~/assets/css/theme.css';

@keyframes fadein {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadein {
    animation: fadein 1s cubic-bezier(.4, 0, .2, 1) both;
}

.animate-fadein.delay-200 {
    animation-delay: 0.2s;
}

.animate-fadein.delay-300 {
    animation-delay: 0.3s;
}

@keyframes cardin {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-card {
    animation: cardin 0.7s cubic-bezier(.4, 0, .2, 1) both;
}

/* Enhanced bounce animation with smoother easing */
@keyframes bounce-slow {

    0%,
    100% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }

    50% {
        transform: translateY(20px);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
}

.animate-bounce-slow {
    animation: bounce-slow 4s infinite;
}

/* Enhanced pulse animation with modern easing */
@keyframes pulse-slow {

    0%,
    100% {
        opacity: 0.5;
        transform: scale(1);
        animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }

    50% {
        opacity: 0.9;
        transform: scale(1.05);
        animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
}

.animate-pulse-slow {
    animation: pulse-slow 6s infinite;
}

/* Glowing animation for highlights with improved shadows */
@keyframes glow {

    0%,
    100% {
        box-shadow: 0 0 5px 2px rgba(241, 90, 34, 0.2);
    }

    50% {
        box-shadow: 0 0 20px 8px rgba(241, 90, 34, 0.4);
    }
}

.animate-glow {
    animation: glow 3s infinite;
}

/* Enhanced Floating animation for decorative elements with smoother motion */
@keyframes float {

    0%,
    100% {
        transform: translateY(0) rotate(0);
    }

    25% {
        transform: translateY(-12px) rotate(2deg);
    }

    75% {
        transform: translateY(12px) rotate(-2deg);
    }
}

.animate-float {
    animation: float 10s ease-in-out infinite;
}

/* Enhanced Spin animation */
@keyframes spin-slow {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.animate-spin-slow {
    animation: spin-slow 15s linear infinite;
}

/* Added animation-delay classes for staggered animations */
.animation-delay-1000 {
    animation-delay: 1s;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animation-delay-3000 {
    animation-delay: 3s;
}

.animation-delay-300 {
    animation-delay: 0.3s;
}

/* 3D Card Transforms and Perspective */
.perspective-card {
    perspective: 1500px;
    transform-style: preserve-3d;
}

.card-inner {
    backface-visibility: hidden;
    transform-style: preserve-3d;
}

.perspective-card:hover .card-inner {
    transform: rotateY(5deg) translateZ(10px);
}

/* For modal animation */
@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-modal {
    animation: scaleIn 0.7s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
}

/* Shimmer Effect for Highlights */
@keyframes shimmer {
    0% {
        background-position: -100% 0;
    }

    100% {
        background-position: 200% 0;
    }
}

.animate-shimmer {
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%);
    background-size: 200% 100%;
    animation: shimmer 3s infinite;
}

/* Particle Animations for Hero Section */
@keyframes particle-move {
    0% {
        transform: translate(0, 0);
    }

    25% {
        transform: translate(10px, 10px);
    }

    50% {
        transform: translate(5px, -15px);
    }

    75% {
        transform: translate(-10px, 5px);
    }

    100% {
        transform: translate(0, 0);
    }
}

[class^="particle-"] {
    animation: particle-move var(--duration, 20s) infinite var(--delay, 0s) linear;
    opacity: var(--opacity, 0.6);
}

/* Glass effect utilities */
.backdrop-blur-xl {
    backdrop-filter: blur(24px);
}

.backdrop-blur-2xl {
    backdrop-filter: blur(40px);
}

/* Enhanced transitions */
.fade-enter-active {
    transition: opacity 0.6s cubic-bezier(0.21, 1.02, 0.73, 1);
}

.fade-leave-active {
    transition: opacity 0.4s cubic-bezier(0.4, 0, 1, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Enhanced Slide transitions with smoother curves */
.slide-enter-active {
    transition: transform 0.6s cubic-bezier(0.21, 1.02, 0.73, 1), opacity 0.6s cubic-bezier(0.21, 1.02, 0.73, 1);
}

.slide-leave-active {
    transition: transform 0.4s cubic-bezier(0.4, 0, 1, 1), opacity 0.4s cubic-bezier(0.4, 0, 1, 1);
}

.slide-enter-from {
    opacity: 0;
    transform: translateY(40px);
}

.slide-leave-to {
    opacity: 0;
    transform: translateY(-40px);
}
</style>