<template>
    <div class="min-h-screen bg-[#e6eaf0]">
        <!-- Hero Section -->
        <!-- What is Trust  -->
        <section
            class="relative bg-gradient-to-br from-[#13325e] via-[#1d4170] to-[#13325e] py-20 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
            <h1 class="text-5xl md:text-6xl font-bold text-white mb-4 animate-fadein">Our Trust Services</h1>
            <p class="text-xl md:text-2xl text-[#e6eaf0] max-w-2xl mb-8 animate-fadein delay-200">
                Discover the types of trusts and key services we offer to help you secure your assets and future.
            </p>
            <img src="/images/logo.svg" alt="Phillip Trustee Logo"
                class="w-24 h-24 mx-auto rounded-full bg-white/80 p-3 shadow-lg animate-fadein delay-300" />
            <div class="absolute bottom-0 left-0 right-0 h-12 bg-[#f15a22] opacity-80 skew-y-3"></div>
            <div
                class="absolute top-0 left-0 w-32 h-32 bg-[#f15a22]/20 rounded-full blur-2xl -z-10 animate-bounce-slow">
            </div>
            <div class="absolute top-10 right-10 w-24 h-24 bg-[#e6eaf0]/30 rounded-full blur-2xl -z-10 animate-pulse">
            </div>
        </section>

        <!-- What is Trust? Section -->
        <section class="bg-[#0a2b5c] text-white py-24 px-4 md:px-8 relative overflow-hidden">
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

            <div class="container mx-auto relative z-10">
                <div class="flex flex-col items-center mb-16" data-aos="fade-up" data-aos-duration="800">
                    <h2 class="text-3xl md:text-5xl font-bold text-center mb-4">What is Trust?</h2>
                    <div class="w-24 h-1 bg-orange-500"></div>
                </div>

                <!-- Row 1: Text left, Image right -->
                <div class="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24" data-aos="fade-up"
                    data-aos-duration="1000">
                    <!-- Left: Content -->
                    <div class="w-full lg:w-1/2 space-y-6">
                        <h3 class="text-2xl md:text-3xl font-bold text-orange-400 mb-4">Legal Foundation</h3>
                        <p class="text-white/90 text-lg leading-relaxed">
                            A trust is a legal arrangement where one party (the trustor) gives another party (the
                            trustee) the right to hold and manage assets for the benefit of a third party (the
                            beneficiary). The Cambodia Trust Law of 2019 provides the legal framework for establishing
                            trusts, enabling foreigners to register their fixed assets with trustee companies in
                            Cambodia.
                        </p>

                    </div>

                    <!-- Right: Image -->
                    <div class="w-full lg:w-1/2" data-aos="fade-left" data-aos-delay="200">
                        <div
                            class="rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-orange-500/30 border border-white/10">
                            <img src="/images/Services/Attorney-consults.jpg" alt="Trust Legal Foundation"
                                class="w-full h-auto object-cover" />
                        </div>
                    </div>
                </div>

                <!-- Row 2: Image left, Text right -->
                <div class="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 mb-24"
                    data-aos="fade-up" data-aos-duration="1000">
                    <!-- Right: Content -->
                    <div class="w-full lg:w-1/2 space-y-6">
                        <h3 class="text-2xl md:text-3xl font-bold text-orange-400 mb-4">Trust Relationship</h3>
                        <p class="text-white/90 text-lg leading-relaxed">
                            Trust relationships involve three key parties: the trustor (who creates the trust), the
                            trustee (who manages the trust), and the beneficiaries (who benefit from the trust). At
                            Phillip Trustee (Cambodia), we act as your trusted partner, providing specialized management
                            of assets while ensuring compliance with Cambodian regulations and protecting your
                            interests.
                        </p>

                    </div>

                    <!-- Left: Image -->
                    <div class="w-full lg:w-1/2" data-aos="fade-right" data-aos-delay="200">
                        <div
                            class="rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-orange-500/30 border border-white/10">
                            <img src="/images/Services/client-value.jpg" alt="Trust Relationship"
                                class="w-full h-auto object-cover" />
                        </div>
                    </div>
                </div>

                <!-- Row 3: Text left, Image right -->
                <div class="flex flex-col lg:flex-row items-center justify-between gap-12" data-aos="fade-up"
                    data-aos-duration="1000">
                    <!-- Left: Content -->
                    <div class="w-full lg:w-1/2 space-y-6">
                        <h3 class="text-2xl md:text-3xl font-bold text-orange-400 mb-4">Benefits of Trust Services</h3>
                        <p class="text-white/90 text-lg leading-relaxed">
                            Establishing a trust in Cambodia offers numerous advantages, including asset protection,
                            simplified foreign investment processes, legal property ownership for foreigners, tax
                            efficiency, and succession planning. Our trust services provide a secure and regulated way
                            to manage and transfer assets while navigating Cambodia's unique regulatory environment.
                        </p>

                    </div>

                    <!-- Right: Image -->
                    <div class="w-full lg:w-1/2" data-aos="fade-left" data-aos-delay="200">
                        <div
                            class="rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-orange-500/30 border border-white/10">
                            <img src="/images/Services/trustee-image.jpg" alt="Benefits of Trust Services"
                                class="w-full h-auto object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section> <!-- Types of Trust -->
        <section class="bg-gradient-to-b from-[#0e2a52] to-[#0a2b5c] py-24 px-4 relative overflow-hidden">
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

            <!-- Circle Decoration Elements -->
            <div
                class="absolute top-10 left-10 w-48 h-48 bg-[#f15a22]/20 rounded-full blur-3xl -z-10 animate-pulse-slow">
            </div>
            <div
                class="absolute bottom-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl -z-10 animate-pulse-slow">
            </div>

            <div class="container mx-auto relative z-10">
                <!-- Header -->
                <div class="flex flex-col items-center mb-16" data-aos="fade-up" data-aos-duration="800">
                    <h2 class="text-3xl md:text-5xl font-bold text-white mb-4 text-center">Types of Trust in
                        Cambodia</h2>
                    <div class="w-24 h-1 bg-gradient-to-r from-[#f15a22] to-orange-400 mx-auto mb-8"></div>
                    <p class="text-lg text-white/80 max-w-3xl mx-auto text-center">
                        Under Cambodia's Trust Law, there are several types of trusts designed to serve different
                        purposes and meet various needs of individuals and organizations.
                    </p>
                </div>

                <!-- Slider container with navigation buttons -->
                <div class="relative px-4 md:px-10"> <!-- Left Navigation Button -->
                    <button @click="slideTrustTypesLeft"
                        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#f15a22] transition-colors duration-300 text-[#0e2a52] hover:text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#f15a22] focus:ring-opacity-50"
                        aria-label="Previous type of trust">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <!-- Slider Viewport -->
                    <div class="overflow-hidden">
                        <div class="flex transition-transform duration-500 ease-in-out"
                            :style="{ transform: `translateX(-${trustTypeSlideIndex * 100 / visibleSlides}%)` }"
                            ref="trustTypeSlider">
                            <div v-for="(type, index) in trustTypes" :key="type.title"
                                class="flex-shrink-0 px-3 md:px-5" :style="{ width: `${100 / visibleSlides}%` }">
                                <div
                                    class="bg-white/10 rounded-2xl shadow-xl h-full p-6 md:p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-[#f15a22]/20 border border-white/10 animate-card">
                                    <!-- Icon -->
                                    <div class="mb-5 bg-[#f15a22]/30 p-5 rounded-full">
                                        <img :src="getIconImagePath(type.title)" :alt="`${type.title} icon`"
                                            class="w-16 h-16 object-contain brightness-[1.5]" />
                                    </div>

                                    <!-- Title -->
                                    <h4 class="text-xl md:text-2xl font-bold text-white mb-3">{{ type.title }}</h4>

                                    <!-- Description -->
                                    <p class="text-white/80 flex-grow">{{ type.desc }}</p>
                                </div>
                            </div>
                        </div>
                    </div> <!-- Right Navigation Button -->
                    <button @click="slideTrustTypesRight"
                        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#f15a22] transition-colors duration-300 text-[#0e2a52] hover:text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#f15a22] focus:ring-opacity-50"
                        aria-label="Next type of trust">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button> <!-- Slide Indicators (Dots) -->

                    <div class="flex justify-center mt-8 space-x-3">
                        <button v-for="(_, index) in Math.ceil(trustTypes.length / visibleSlides)" :key="index"
                            @click="goToTrustTypeSlide(index)" :class="[
                                'w-3 h-3 rounded-full focus:outline-none transition-all duration-300',
                                trustTypeSlideIndex === index ? 'bg-[#f15a22] w-8' : 'bg-white/30 hover:bg-white/50'
                            ]" :aria-label="`Go to slide ${index + 1}`"></button>
                    </div>
                </div>
            </div>
        </section> <!-- Key Services and Products -->
        <section class="bg-[#0a2b5c] py-24 px-4 relative overflow-hidden">
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

            <!-- Circle Decoration Elements -->
            <div
                class="absolute top-20 right-10 w-48 h-48 bg-[#f15a22]/20 rounded-full blur-3xl -z-10 animate-pulse-slow">
            </div>
            <div
                class="absolute bottom-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl -z-10 animate-pulse-slow">
            </div>

            <div class="container mx-auto relative z-10">
                <div class="flex flex-col items-center mb-16">
                    <h2 class="text-3xl md:text-5xl font-bold text-white mb-4 text-center">Our Key Services</h2>
                    <div class="w-24 h-1 bg-gradient-to-r from-[#f15a22] to-orange-400 mx-auto mb-8"></div>
                    <p class="text-lg text-white/80 max-w-3xl mx-auto text-center">
                        We offer comprehensive trust services to protect your assets and secure your future with
                        expertise and reliability.
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div v-for="(service, idx) in services" :key="service.title"
                        class="bg-white/10 border border-white/10 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group hover:bg-white/15"
                        @click="openModal(idx)">
                        <div class="relative">
                            <img :src="service.image" :alt="service.title"
                                class="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                            <div class="absolute inset-0 bg-gradient-to-t from-[#0a2b5c]/80 to-transparent"></div>
                        </div>
                        <div class="p-6">
                            <h4 class="text-xl font-bold text-white group-hover:text-[#f15a22] mb-2">{{
                                service.title }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Modal for Service Details -->
        <transition name="fade">
            <div v-if="modalOpen"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative animate-card">
                    <button @click="closeModal"
                        class="absolute top-4 right-4 w-8 h-8 bg-[#f15a22]/10 hover:bg-[#f15a22] text-[#f15a22] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#f15a22] focus:ring-opacity-50">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>

                    <div class="flex flex-col md:flex-row items-center gap-6">
                        <div class="md:w-1/3">
                            <div
                                class="relative w-32 h-32 md:w-full md:h-auto md:aspect-square mx-auto overflow-hidden rounded-2xl shadow-lg border-4 border-[#e6eaf0]">
                                <img :src="selectedService.image" :alt="selectedService.title"
                                    class="w-full h-full object-cover object-center" />
                                <div class="absolute inset-0 bg-gradient-to-t from-[#13325e]/70 to-transparent"></div>
                            </div>
                        </div>
                        <div class="md:w-2/3">
                            <h3 class="text-2xl md:text-3xl font-bold text-[#13325e] mb-3 text-center md:text-left">
                                {{ selectedService.title }}
                            </h3>
                            <div class="w-16 h-1 bg-[#f15a22] mb-4 mx-auto md:mx-0"></div>
                            <p class="text-[#13325e]/80 text-center md:text-left text-lg">{{ selectedService.desc }}</p>
                            <button @click="closeModal"
                                class="mt-6 bg-[#f15a22] hover:bg-[#13325e] text-white py-2 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#f15a22] focus:ring-opacity-50">
                                Close
                            </button>
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
                { title: 'Hold Trust Property', image: '/images/services/Attorney-consults.jpg', desc: 'We securely hold and manage trust property on behalf of our clients, ensuring compliance and transparency.' },
                { title: 'Hold Personal Trust', image: '/images/services/key_service_img_03.jpg', desc: 'Personal trust services tailored to your needs, safeguarding your assets for your benefit or your loved ones.' },
                { title: 'Escrow Services', image: '/images/services/key_service_img_04.jpg', desc: 'Professional escrow services for secure transactions and peace of mind.' },
                { title: 'Sales and Purchase Agreement (SPA) Service', image: '/images/services/key_service_img_02.jpg', desc: 'Expert handling of SPA services to facilitate smooth and secure property transactions.' },
            ],
            modalOpen: false,
            selectedService: {},
            trustTypeSlideIndex: 0,
            visibleSlides: 3, // Default for desktop
        }
    },
    mounted() {
        this.updateVisibleSlides();
        window.addEventListener('resize', this.updateVisibleSlides);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateVisibleSlides);
    },
    methods: {
        openModal(idx) {
            this.selectedService = this.services[idx];
            this.modalOpen = true;
        },
        closeModal() {
            this.modalOpen = false;
            this.selectedService = {};
        },
        // Slider navigation methods
        slideTrustTypesLeft() {
            if (this.trustTypeSlideIndex > 0) {
                this.trustTypeSlideIndex--;
            }
        },
        slideTrustTypesRight() {
            const maxIndex = Math.ceil(this.trustTypes.length / this.visibleSlides) - 1;
            if (this.trustTypeSlideIndex < maxIndex) {
                this.trustTypeSlideIndex++;
            }
        },
        goToTrustTypeSlide(index) {
            this.trustTypeSlideIndex = index;
        },
        updateVisibleSlides() {
            // Responsive behavior: adjust visible slides based on screen width
            if (window.innerWidth < 640) {
                this.visibleSlides = 1; // Mobile view
            } else if (window.innerWidth < 1024) {
                this.visibleSlides = 2; // Tablet view
            } else {
                this.visibleSlides = 3; // Desktop view
            }

            // Reset current slide index if needed
            const maxIndex = Math.ceil(this.trustTypes.length / this.visibleSlides) - 1;
            if (this.trustTypeSlideIndex > maxIndex) {
                this.trustTypeSlideIndex = maxIndex;
            }
        }, getIconImagePath(title) {
            // Map trust types to icon image paths
            const iconMap = {
                'Financial Trust': '/images/icons/income.png',
                'Commercial Trust': '/images/icons/commercial.png',
                'Public Trust': '/images/icons/multiple-users-silhouette.png',
                'Social Trust': '/images/icons/collaboration.png',
                'Personal Trust': '/images/icons/user.png'
            };

            return iconMap[title] || '/images/icons/money-bag.png'; // Default fallback icon
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

@keyframes bounce-slow {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(20px);
    }
}

.animate-bounce-slow {
    animation: bounce-slow 4s infinite;
}

@keyframes pulse-slow {

    0%,
    100% {
        opacity: 0.5;
        transform: scale(1);
    }

    50% {
        opacity: 0.8;
        transform: scale(1.05);
    }
}

.animate-pulse-slow {
    animation: pulse-slow 6s infinite cubic-bezier(0.4, 0, 0.6, 1);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>