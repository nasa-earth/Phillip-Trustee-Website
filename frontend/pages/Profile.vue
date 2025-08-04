<template>
    <div class="min-h-screen bg-[#e6eaf0]"> <!-- Hero Section -->
        <!-- Hero Section -->
        <section
            class="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen w-full flex items-center justify-center bg-cover bg-center"
            :style="{
                backgroundImage: 'url(/images/profile/profile_header.jpg)',
            }">
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-b from-[#001a4d]/50 via-[#0e2a52]/20 to-[#001a4d]/10 z-0"></div>

        </section>

        <!-- Management Profiles -->
        <section
            class="bg-[#0a2b5c] text-[#e6eaf0] py-12 sm:py-16 md:py-20 lg:py-24 px-4 md:px-8 relative overflow-hidden">
            <!-- Simple Dot Background -->
            <div class="absolute inset-0 opacity-20">
                <div class="w-full h-full bg-dot-pattern"></div>
            </div>

            <div class="container mx-auto relative z-10">
                <div class="flex flex-col items-center mb-8 sm:mb-12 md:mb-16" data-aos="fade-up"
                    data-aos-duration="800">
                    <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">Our Leadership Team</h2>
                    <p class="text-[#e6eaf0] text-center text-base sm:text-lg md:text-xl mt-4 sm:mt-6 max-w-2xl px-4">
                        Meet the dedicated professionals leading Phillip Trustee to excellence in Cambodia's financial
                        services.
                    </p>
                </div>

                <!-- Container adjusted for the layout -->
                <div class="mx-auto max-w-7xl px-4 py-6 sm:py-8 md:py-10">
                    <!-- Top row: 3 members -->
                    <div
                        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center mb-12 sm:mb-16 md:mb-20 mx-0 sm:mx-4 md:mx-8 lg:mx-20">
                        <div v-for="(manager, idx) in managers.slice(0, 3)" :key="manager.name" @click="openModal(idx)"
                            class="text-center cursor-pointer transform transition-all duration-300 hover:scale-105 p-3 sm:p-4 rounded-xl mb-8 sm:mb-0">
                            <div
                                class="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-55 lg:h-55 mx-auto rounded-full overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl">
                                <img :src="manager.image" :alt="manager.name"
                                    class="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110" />
                            </div>
                            <h3
                                class="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl font-bold text-[#f15a22] mb-1 sm:mb-2 transition-colors duration-300">
                                {{
                                    manager.name }}</h3>
                            <p class="text-base sm:text-lg md:text-xl text-white/90 transition-colors duration-300">{{
                                manager.title }}</p>
                        </div>
                    </div>

                    <!-- Bottom row: 2 members centered -->
                    <div
                        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-1 justify-center mx-0 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-60">
                        <div v-for="(manager, idx) in managers.slice(3)" :key="manager.name" @click="openModal(idx + 3)"
                            class="text-center cursor-pointer transform transition-all duration-300 hover:scale-105 p-3 sm:p-4 rounded-xl">
                            <div
                                class="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-55 lg:h-55 mx-auto rounded-full overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl">
                                <img :src="manager.image" :alt="manager.name"
                                    class="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110 " />
                            </div>
                            <h3
                                class="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl font-bold text-[#f15a22] transition-colors duration-300">
                                {{ manager.name
                                }}</h3>
                            <p class="text-base sm:text-lg md:text-xl text-white/90 transition-colors duration-300">{{
                                manager.title }}</p>
                        </div>
                    </div>
                </div>

            </div>

            <transition name="fade">
                <div v-if="modalOpen"
                    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                    <div
                        class="bg-white max-w-4xl w-full rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 relative overflow-y-auto max-h-[90vh] text-[#13325e]">

                        <!-- Close Button -->
                        <button @click="closeModal"
                            class="absolute top-2 right-2 sm:top-4 sm:right-4 text-[#13325e] hover:text-[#f15a22] text-2xl sm:text-3xl font-bold focus:outline-none cursor-pointer">
                            &times;
                        </button>

                        <!-- Top Row: Image, Name, and Title -->
                        <div
                            class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 border-b pb-4 sm:pb-6">
                            <!-- Profile Image -->
                            <div
                                class="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden">
                                <img :src="selectedManager.image" :alt="selectedManager.name"
                                    class="w-full h-full object-cover" />
                            </div>

                            <!-- Name and Title -->
                            <div class="flex-1 text-center sm:text-left">
                                <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-[#13325e] mb-1 sm:mb-2">{{
                                    selectedManager.name }}</h3>
                                <p class="text-base sm:text-lg md:text-xl font-medium text-[#13325e]/80">{{
                                    selectedManager.title }}</p>
                            </div>
                        </div>

                        <!-- Bottom Row: Description -->
                        <div class="text-[#0a2b5c] text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line">
                            {{ selectedManager.desc }}
                        </div>
                    </div>
                </div>
            </transition>

        </section>

        <!-- Partners Section -->
        <section class="bg-[#13325e] text-[#e6eaf0] py-12 sm:py-14 md:py-16 px-4 relative">
            <div class="container mx-auto mb-6 sm:mb-8">
                <div class="flex flex-col items-center mb-8 sm:mb-10">
                    <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-[#e6eaf0]">Our Partners
                    </h2>
                </div>

                <!-- Partners Slider Component -->
                <PartnersSlider :partners="partnersForSlider" :speed="40" size="medium" :loading="loading"
                    :error="error" />
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import PartnersSlider from '~/components/PartnersSlider.vue';
import { usePartners } from '~/composables/usePartners';

const { partners, loading, error, getPartners: fetchPartners, onPartnerChange } = usePartners();

// Create a computed ref for partners to ensure reactivity
const partnersForSlider = computed(() => partners.value || []);

// Watch for changes in partners data to ensure reactivity
watch(partnersForSlider, (newPartners) => {
    console.log('Partners data updated in Profile:', newPartners?.length || 0);
}, { immediate: true });

const managers = ref([
    {
        name: 'ONG TEONG HOON',
        title: 'Chairman',
        image: '/images/profile/ceo.jpg',
        desc: 'Mr. Ong started working in the financial sector in 1977, with Standard Chartered Bank, as a Management Trainee. For 25 years with the Bank, he had been through all aspects of Commercial Banking apart from Treasury function, and he ended his banking career as Country Manager for the Bank in Cambodia in from 2000 to 2002. This was after being the Bank’s Chief Representative in Myanmar between 1995 and 2000; and before that, Regional Manager, Asia Pacific Region covering Financial Institutions.\n\n Soon after that, he joined Phillip Securities Pte Ltd and covered various functions, including a stint in Phillip Securities Thailand PLC as its acting CEO, and was the Director of OTC Capital prior to being assigned to KREDIT Microfinance in 2012. He is currently serving as Chairman of both Phillip General Insurance(Cambodia) Plc and Phillip Trustee Cambodia in addition to being shareholder representative for Phillip General Insurance(Cambodia) Plc, Phillip Life Assurance(Cambodia) Plc, and Phillip Bank Plc.\n\n Mr.Ong is a graduate from the University of Singapore with a Bachelor of Business Administration and is an Associate of the Chartered Institute of Bankers since 1978.',
    },
    {
        name: 'Sopheap Proeung',
        title: 'General Manager',
        image: '/images/profile/mr_sopheap.jpg',
        desc: 'Sopheap is the General Manager of Phillip trustee (Cambodia). As a founding member of the Group’s Trust services in Cambodia over two years ago, he has been instrumental in developing the Kingdom’s nascent Trust landscape and driving its business growth. Prior to his current role, Sopheap has over 20 years of experience in various roles across the NGOs, Microfinance and banking sectors.',
    },
    {
        name: 'Phang Vichet',
        title: 'Legal & Compliance Manager',
        image: '/images/profile/legal_manager.jpg',
        desc: 'Vichet is a Legal & Compliance Manager of Phillip Trustee (Cambodia) Co., Ltd. and a practicing notary in Cambodia upon completion of the notary profession training from the Royal Academy for Judicial Professions and nomination of notary in 2016 and the master’s degree in Private Law from Lumière Lyon 2 University from France in 2008. Vichet has worked as Legal Consultant for a law firm for 4 years, as Case Manager for Civil Party Lead Co-Lawyers of the Extra-ordinary Chamber in the Court of Cambodia for 4 years, and as Legal Manager for banks for 8 years. Vichet is also a part-time lecturer of law at RULE for 16 years, and at the Royal Academy for Judicial Professions since 2023.\n\n s Legal & Compliance Manager of Phillip Trustee, Vichet has key work to review, advise on the contracts, and legal documents, identify legal risk, conduct risk profiling of customers, update laws and regulations to the senior management of the company.',
    },
    {
        name: 'Kong Rothana',
        title: 'Accounting and Finance Manager',
        image: '/images/profile/kong_rothana.jpg',
        desc: 'Rothana is the Accounting and Finance Manager of Phillip trustee (Cambodia) Co, Ltd. Before joining the Company, he was the Senior External Audit Manager at an audit which involved various sector such Real Estate Company, Manufacturing, Trading Company, and Microfinance and banking sectors.\n\n He is pursuing the Association of Chartered Certified Accountants (ACCA) at CamEd Business School. In 2015, he got a bachelor’s degree of Banking and Finance from the Royal University of Law and Economic (RULE). Moreover, he got the other degree of Intensive English Academic Purpose (IEAP) program from Pannasastra University of Law and Economics (PUC).',
    },
    {
        name: 'Ho Souven',
        title: 'Operation Supervisor',
        image: '/images/profile/ho_souven.jpg',
        desc: 'Souven is Operation Supervisor of Phillip Trustee (Cambodia) Co., Ltd. and hold completed bachelor’s degree of Law in 2016 from Royal University of Law and Economics. Souven used to work as Credit admin supervisor at one of Cambodia’s Largest Commercial Banks in Cambodia for over 4 years. Prior to his posting in Phillip Trustee (Cambodia) Co., Ltd. he used to work at one of a well-known French’s bank in Cambodia as Credit Admin Deputy Team leader for over 2 years.\n\n As Operation Supervisor of Phillip Trustee, Souven has key work to control operation process of client onboarding, update operational process and propose implementation trust operation to the management of the company.'
    },
]);

const modalOpen = ref(false);
const selectedManager = ref({});

const openModal = (idx) => {
    selectedManager.value = managers.value[idx];
    modalOpen.value = true;
};

const closeModal = () => {
    modalOpen.value = false;
    selectedManager.value = {};
};

onMounted(async () => {
    await fetchPartners();

    // Listen for partner changes
    const unsubscribe = onPartnerChange((action, data) => {
        console.log(`Partner ${action} detected in Profile page:`, data);
    });

    // Clean up subscription on unmount
    onUnmounted(() => {
        unsubscribe();
    });
});
</script>

<style scoped>
@import '~/assets/css/theme.css';

/* Animation keyframes */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes widthGrow {
    from {
        width: 0;
    }

    to {
        width: 8rem;
    }
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

@keyframes bounce-slow {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(20px);
    }
}

/* Animation classes */
.animate-fadeIn {
    animation: fadeIn 1s ease-in-out;
}

.animate-fadeUp {
    animation: fadeUp 1s ease-out;
}

.animate-widthGrow {
    animation: widthGrow 1.5s ease-out;
}

.animate-card {
    animation: cardin 0.7s cubic-bezier(.4, 0, .2, 1) both;
}

.animate-bounce-slow {
    animation: bounce-slow 4s infinite;
}

.animation-delay-300 {
    animation-delay: 300ms;
}

/* Background patterns */
.bg-dot-pattern {
    background-image: radial-gradient(rgba(255, 255, 255, 0.6) 1.5px, transparent 1.5px);
    background-size: 25px 25px;
}

.bg-pattern-dots {
    background-image: radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px);
    background-size: 20px 20px;
}

/* Transition effects */
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s cubic-bezier(.4, 0, .2, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

/* Text truncation */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Hover effects */
.hover\:shadow-orange-500\/20:hover {
    box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.2), 0 4px 6px -4px rgba(249, 115, 22, 0.2);
}

.hover\:shadow-orange-500\/30:hover {
    box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.3), 0 4px 6px -4px rgba(249, 115, 22, 0.3);
}

/* Set the partners section background variable for the slider component */
section.bg-\[\#13325e\] .partners-slider-wrapper {
    --bg-color: #13325e;
}
</style>