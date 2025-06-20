<template>
    <div class="min-h-screen bg-[#e6eaf0]"> <!-- Hero Section -->
        <!-- Hero Section -->
        <section class="relative h-[90vh] w-full flex items-center justify-center bg-cover bg-center" :style="{
            backgroundImage: 'url(/images/Services/client-services.jpg)',
        }">
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-0"></div>

            <!-- Content -->
            <div class="relative z-10 text-center text-white px-6 max-w-3xl" data-aos="fade-up"
                data-aos-duration="1200">
                <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-6">
                    <span class="text-[#f15a22]">Learn</span>
                    and 
                    <span class="text-[#f15a22]">Know</span>
                    about
                    <span class="text-[#f15a22]">Phillip Trustee</span>
                </h1>
                <p class="text-lg md:text-xl text-white/80 mb-8">
                    Empowering investors and building trust in Cambodia through personalized, secure financial services.
                </p>

            </div>
        </section>
        
        <!-- Management Profiles -->
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
                    <h2 class="text-3xl md:text-5xl font-bold text-center mb-4">Our Leadership Team</h2>
                    <div class="w-24 h-1 bg-orange-500"></div>
                    <p class="text-white/80 text-center mt-6 max-w-2xl">
                        Meet the dedicated professionals leading Phillip Trustee to excellence in Cambodia's financial
                        services.
                    </p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    <div v-for="(manager, idx) in managers" :key="manager.name" @click="openModal(idx)"
                        class="group relative animate-card" data-aos="fade-up" :data-aos-delay="idx * 100">
                        <!-- Card with hover effects -->
                        <div
                            class="bg-gradient-to-b from-[#13325e] to-[#0d254a] rounded-xl shadow-xl overflow-hidden 
                                transform transition-all duration-500 hover:-translate-y-2 hover:shadow-orange-500/20 cursor-pointer">

                            <!-- Image with overlay -->
                            <div class="relative h-64 overflow-hidden">
                                <img :src="manager.image" :alt="manager.name"
                                    class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                                <div
                                    class="absolute inset-0 bg-gradient-to-t from-[#0d254a] via-transparent to-transparent">
                                </div>
                            </div>

                            <!-- Content -->
                            <div class="p-6 relative">
                                <!-- Profile image overlay -->
                                <div class="absolute -top-16 left-1/2 transform -translate-x-1/2">
                                    <div
                                        class="w-24 h-24 rounded-full border-4 border-orange-500 overflow-hidden shadow-xl">
                                        <img :src="manager.image" :alt="manager.name"
                                            class="w-full h-full object-cover" />
                                    </div>
                                </div>

                                <!-- Text content -->
                                <div class="mt-10 text-center">
                                    <h3
                                        class="text-xl font-bold text-[#f15a22] transition-colors duration-300 group-hover:text-white mb-1">
                                        {{ manager.name }}
                                    </h3>
                                    <p class="text-white/80 mb-4">{{ manager.title }}</p>
                                    <div class="w-12 h-0.5 bg-orange-500/50 mx-auto"></div>
                                    <p class="mt-4 text-white/70 text-sm line-clamp-2">{{ manager.desc }}</p>

                                    <!-- View More button -->
                                    <div class="mt-4 pt-2">
                                        <span
                                            class="inline-flex items-center gap-1 text-[#f15a22] hover:text-orange-300 text-sm font-medium transition-colors group-hover:translate-x-1 transform duration-300">
                                            View Profile
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Enhanced Modal -->
            <transition name="fade">
                <div v-if="modalOpen"
                    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                    <div
                        class="bg-gradient-to-b from-[#13325e] to-[#0d254a] rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-card border border-white/10">
                        <button @click="closeModal"
                            class="absolute top-4 right-4 text-[#f15a22] hover:text-white w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-orange-500/20 transition-all">
                            &times;
                        </button>

                        <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div
                                class="w-28 h-28 rounded-full overflow-hidden border-4 border-orange-500/50 flex-shrink-0">
                                <img :src="selectedManager.image" :alt="selectedManager.name"
                                    class="w-full h-full object-cover" />
                            </div>

                            <div class="flex-1">
                                <h3 class="text-2xl font-bold text-[#f15a22] mb-1">{{ selectedManager.name }}</h3>
                                <p class="text-white/90 font-medium mb-2">{{ selectedManager.title }}</p>
                                <div class="w-12 h-0.5 bg-orange-500/50 mb-4"></div>
                                <p class="text-white/80 leading-relaxed">{{ selectedManager.desc }}</p>

                                <!-- Additional details if available -->
                                <div v-if="selectedManager.experience" class="mt-4 pt-4 border-t border-white/10">
                                    <h4 class="text-white font-medium mb-2">Experience</h4>
                                    <p class="text-white/80">{{ selectedManager.experience }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </section>

        <!-- Partners Section -->
        <section class="bg-[#13325e] text-white py-16 px-4 relative">
            <div class="container mx-auto mb-8">
                <div class="flex flex-col items-center mb-10">
                    <h2 class="text-3xl md:text-4xl font-bold text-center mb-4 text-white">Our Trusted Partners</h2>
                    <div class="w-24 h-1 bg-orange-500"></div>
                    <p class="text-white/80 text-center mt-6 max-w-2xl">
                        Working with leading institutions across Cambodia to serve our clients better
                    </p>
                </div>

                <!-- Partners Slider Component -->
                <PartnersSlider :partners="partnersList" :speed="40" size="medium" />
            </div>
        </section>
    </div>
</template>

<script>
import PartnersSlider from '~/components/PartnersSlider.vue';

export default {
    name: 'ProfilePage',
    components: {
        PartnersSlider
    },
    data() {
        return {
            managers: [
                {
                    name: 'ONG TEONG HOON',
                    title: 'Chairman',
                    image: '/images/profile/ceo.jpg',
                    desc: 'Chairman of Phillip Trustee (Cambodia) with over 20 years of experience in finance and trust management. Leads the strategic direction of the company with a focus on innovation and client-centered solutions.',
                    experience: 'Previously served as CEO of multiple financial institutions across Southeast Asia with expertise in both commercial and private banking.'
                },
                {
                    name: 'Sopheap Proeung',
                    title: 'General Manager',
                    image: '/images/profile/mr_sopheap.jpg',
                    desc: 'General Manager with extensive experience in banking and trust operations. Oversees daily management and ensures operational excellence across all departments.',
                    experience: '15+ years in leadership roles within the Cambodian financial sector.'
                },
                {
                    name: 'Phang Vichet',
                    title: 'Legal & Compliance Manager',
                    image: '/images/profile/legal_manager.jpg',
                    desc: 'Expert in legal and compliance matters for trust and financial services. Ensures all operations adhere to Cambodian laws and regulations while protecting client interests.',
                    experience: 'Former legal advisor to multiple international banks operating in Cambodia.'
                },
                {
                    name: 'Kong Rothana',
                    title: 'Accounting and Finance Manager',
                    image: '/images/profile/kong_rothana.jpg',
                    desc: 'Specialist in accounting and finance for trust management. Responsible for maintaining financial integrity and transparency in all client accounts.',
                    experience: 'Certified accountant with expertise in international financial reporting standards.'
                },
                {
                    name: 'Ho Souven',
                    title: 'Operation Supervisor',
                    image: '/images/profile/ho_souven.jpg',
                    desc: 'Oversees daily operations and ensures service excellence. Dedicated to maintaining the highest standards of client satisfaction through efficient processes.',
                    experience: 'Joined Phillip Trustee after 8 years of experience in banking operations.'
                },
            ], modalOpen: false,
            selectedManager: {},
            partnersList: [
                { name: 'Rose Mavel', image: '/images/partners/1_Rose_Mavel.jpg' },
                { name: 'La Maision', image: '/images/partners/2_La_Maision.jpg' },
                { name: 'Vimean Samnang', image: '/images/partners/3_Vimean_Samnang.jpg' },
                { name: 'IPS', image: '/images/partners/4_IPS.jpg' },
                { name: 'SaRaNa', image: '/images/partners/5_SaRaNa.jpg' },
                { name: 'YI Dung', image: '/images/partners/6_YI Dung.jpg' },
                { name: 'Dragon Land', image: '/images/partners/Dragon Land.jpg' },
            ]
        }
    },
    methods: {
        openModal(idx) {
            this.selectedManager = this.managers[idx];
            this.modalOpen = true;
        },
        closeModal() {
            this.modalOpen = false;
            this.selectedManager = {};
        }
    }
}
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