<template>
    <div class="min-h-screen bg-lightgray">

        <!-- Hero Section -->
        <section class="relative h-[90vh] w-full flex items-center justify-center bg-cover bg-center" :style="{
            backgroundImage: 'url(/images/about/2_about.jpg)',
        }">
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-0"></div>

            <!-- Content -->
            <div class="relative z-10 text-center text-[#e6eaf0] px-6 max-w-3xl" data-aos="fade-up"
                data-aos-duration="1200">
                <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-6">
                    <span class="text-orange-400">Learn</span>
                    and
                    <span class="text-orange-400">Know</span>
                    about
                    <span class="text-orange-400">Phillip Trustee</span>
                </h1>
                <p class="text-lg md:text-xl text-[#e6eaf0] mb-8">
                    Empowering investors and building trust in Cambodia through personalized, secure financial services.
                </p>

            </div>
        </section>


        <section class="bg-[#0a2b5c] text-[#e6eaf0] py-24 px-4 md:px-8 relative overflow-hidden">
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
                    <h2 class="text-3xl md:text-4xl font-semibold text-[#e6eaf0] mb-4">About Us</h2>
                    <!-- <div class="w-24 h-1 bg-orange-500"></div> -->
                </div>

                <div class="flex flex-col lg:flex-row items-center justify-between gap-12 mx-[100px]">
                    <!-- Left Side: Overlapping Images with Animation -->
                    <div class="w-full lg:w-1/3 relative flex justify-center" data-aos="fade-right"
                        data-aos-duration="1000">
                        <!-- Back Image -->
                        <div class="w-[300px] md:w-[350px] lg:w-[400px] rounded-xl overflow-hidden shadow-xl z-10 
                      transform hover:translate-y-2 transition-all duration-500 hover:shadow-orange-500/30">
                            <img src="~/assets/images/about/1-phillip-bank.jpg" alt="Phillip Trustee Office"
                                class="w-full h-auto object-cover" />
                        </div>

                        <!-- Front Image (Overlap) -->
                        <div
                            class="absolute top-1/2 left-1/2 translate-x-[-20%] translate-y-[5%] w-[300px] md:w-[350px] lg:w-[400px] 
                      rounded-xl overflow-hidden shadow-xl z-20 border-4 border-white
                      transform hover:-translate-y-2 hover:translate-x-[-15%] transition-all duration-500 hover:shadow-orange-500/30">
                            <img src="~/assets/images/about/2-phillip-bank.jpg" alt="Phillip Trustee Reception"
                                class="w-full h-auto object-cover" />
                        </div>
                    </div>

                    <!-- Right Side: Content with Animation -->
                    <div class="w-full lg:w-1/2 space-y-8" data-aos="fade-left" data-aos-duration="1000"
                        data-aos-delay="200">
                        <div
                            class="flex items-start gap-4 bg-[#13325e] p-6 rounded-lg hover:bg-[#1a3e70] transition-all duration-300 shadow-lg">
                            <div class="flex-shrink-0 transition-transform duration-300 transform hover:scale-125">
                                <img src="/images/icons/check.png" alt="Check" class="w-6 h-6 mt-1 object-contain" />
                            </div>
                            <div>
                                <h3 class="text-xl font-semibold mb-2 text-[#f15a22]">Our Origins</h3>
                                <p class="text-[#e6eaf0] text-lg">
                                    <strong class="text-[#e6eaf0] text-lg">Phillip Trustee (Cambodia), Co Ltd.</strong> was
                                    incorporated in June 2022, after the Law of Trust was passed in 2019, allowing
                                    foreigners to register their fixed assets with trustee companies in Cambodia. Our
                                    specialised license consists of commercial, social and personal trust in which has
                                    been approved by the Trust Regulator.
                                </p>
                            </div>
                        </div>
                        <div
                            class="flex items-start gap-4 bg-[#13325e] p-6 rounded-lg hover:bg-[#1a3e70] transition-all duration-300 shadow-lg">
                            <div class="flex-shrink-0 transition-transform duration-300 transform hover:scale-125">
                                <img src="/images/icons/check.png" alt="Check" class="w-6 h-6 mt-1 object-contain" />
                            </div>
                            <div>
                                <h3 class="text-xl font-semibold mb-2 text-[#f15a22]">Our Affiliations</h3>
                                <p class="text-[#e6eaf0] text-lg">
                                    We are the associated company of <strong class="text-[#e6eaf0] text-lg">Phillip Bank,
                                        Plc</strong>, one of the medium-sized commercial banks in Cambodia, part of the
                                    Phillip Capital group in Singapore, and a sister company of Phillip General
                                    Insurance and Phillip Life Assurance Company.
                                </p>
                            </div>
                        </div>
                        <div
                            class="flex items-start gap-4 bg-[#13325e] p-6 rounded-lg hover:bg-[#1a3e70] transition-all duration-300 shadow-lg">
                            <div class="flex-shrink-0 transition-transform duration-300 transform hover:scale-125">
                                <img src="/images/icons/check.png" alt="Check" class="w-6 h-6 mt-1 object-contain" />
                            </div>
                            <div>
                                <h3 class="text-xl font-semibold mb-2 text-[#f15a22]">Our Approach</h3>
                                <p class="text-[#e6eaf0] text-lg">
                                    At <strong class="text-[#e6eaf0] text-lg">Phillip Trustee (Cambodia), Co Ltd.</strong>, we
                                    believe in a financial and non-financial ecosystem that provides suitable services
                                    to investors and customers throughout Cambodia, including commercial, public, social
                                    and personal trust services.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-[#0a2b5c] text-[#e6eaf0] py-24 px-4 md:px-8 relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-radial from-blue-900/20 to-transparent"></div>
            <div class="container mx-auto relative z-10">
                <div class="flex flex-col items-center mb-16" data-aos="fade-up" data-aos-duration="800">
                    <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">Phillip Members (Cambodia Offices)</h2>
                    <!-- <div class="w-32 h-1 bg-orange-500"></div> -->
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-[180px]" data-aos="fade-up"
                    data-aos-delay="200">
                    <!-- Card 1: Phillip Bank -->
                    <div class="group">
                        <div class="bg-gradient-to-b from-[#13325e] to-[#0d254a] rounded-xl shadow-xl overflow-hidden 
                     transform transition-all duration-500 hover:-translate-y-2 hover:shadow-orange-500/20">
                            <div class="overflow-hidden h-56">
                                <img src="~/assets/images/about/1-phillip-bank.jpg" alt="Phillip Bank"
                                    class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                            </div>
                            <div class="p-6">
                                <div class="flex items-center gap-3 mb-4">
                                    <div
                                        class="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#f15a22]"
                                            viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                            <path fill-rule="evenodd"
                                                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 class="text-xl font-bold text-[#f15a22]">Phillip Bank</h3>
                                </div>
                                <p class="text-[#e6eaf0] text-lg">
                                    One of the medium-sized commercial banks in Cambodia, providing
                                    comprehensive banking services to individuals and businesses.
                                </p>

                            </div>
                        </div>
                    </div>

                    <!-- Card 2: Phillip General Insurance -->
                    <div class="group">
                        <div class="bg-gradient-to-b from-[#13325e] to-[#0d254a] rounded-xl shadow-xl overflow-hidden 
                     transform transition-all duration-500 hover:-translate-y-2 hover:shadow-orange-500/20">
                            <div class="overflow-hidden h-56">
                                <img src="~/assets/images/about/1-phillip-general-insurance.png"
                                    alt="Phillip General Insurance"
                                    class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                            </div>
                            <div class="p-6">
                                <div class="flex items-center gap-3 mb-4">
                                    <div
                                        class="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#f15a22]"
                                            viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 class="text-xl font-bold text-[#f15a22]">Phillip General Insurance</h3>
                                </div>
                                <p class="text-[#e6eaf0] text-lg">
                                    Offering a wide range of insurance products designed to protect individuals
                                    and businesses across Cambodia.
                                </p>

                            </div>
                        </div>
                    </div>

                    <!-- Card 3: Phillip Trustee -->
                    <div class="group">
                        <div class="bg-gradient-to-b from-[#13325e] to-[#0d254a] rounded-xl shadow-xl overflow-hidden 
                     transform transition-all duration-500 hover:-translate-y-2 hover:shadow-orange-500/20">
                            <div class="overflow-hidden h-56">
                                <img src="~/assets/images/about/1-phillip-trustee.jpg" alt="Phillip Trustee"
                                    class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                            </div>
                            <div class="p-6">
                                <div class="flex items-center gap-3 mb-4">
                                    <div
                                        class="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#f15a22]"
                                            viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                        </svg>
                                    </div>
                                    <h3 class="text-xl font-bold text-[#f15a22]">Phillip Trustee</h3>
                                </div>
                                <p class="text-[#e6eaf0] text-lg">
                                    Providing comprehensive trust services enabling foreign investors
                                    to own and manage their assets in Cambodia.
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="goal" class="relative py-32 px-8 bg-[#0e2a52]" data-aos="fade-up" data-aos-duration="1200">
            <div class="max-w-6xl mx-auto">
                <!-- Header -->
                <div class="text-center mb-16" data-aos="fade-down" data-aos-duration="1000">
                    <h2 class="text-3xl md:text-4xl font-bold text-[#e6eaf0] mb-4">Goals</h2>
                    <!-- <div class="w-24 h-1 bg-orange-500 mx-auto"></div> -->
                </div>

                <!-- Timeline -->
                <div class="relative">
                    <!-- Timeline line -->
                    <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-orange-500"
                        data-aos="height" data-aos-duration="1500"></div>

                    <!-- Timeline Items -->
                    <div class="space-y-16">
                        <template v-for="(goal, index) in goals" :key="index">
                            <div class="relative group" :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
                                :data-aos-delay="index * 100" data-aos-duration="1000" :class="{
                                    'md:ml-auto md:pl-16': index % 2 === 0,
                                    'md:mr-auto md:pr-16': index % 2 === 1,
                                }">
                                <div :class="{
                                    'md:w-1/2': true,
                                    'md:ml-auto md:pl-16': index % 2 === 0,
                                    'md:mr-auto': index % 2 === 1,
                                    'pl-8': true,
                                }">
                                    <!-- Timeline Dot -->
                                    <div
                                        class="hidden md:block absolute left-0 md:left-[calc(50%-0.625rem)] top-0 w-5 h-5 rounded-full border-4 border-orange-500 bg-white group-hover:scale-150 transition-transform duration-300">
                                    </div> <!-- Goal Card -->
                                    <div
                                        class="relative bg-[#13325e] text-[#e6eaf0] p-8 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-2">
                                        <div class="flex items-center gap-3 mb-4">
                                            <img :src="goal.image" :alt="goal.title" class="w-8 h-8 object-contain" />
                                            <!-- Fallback to emoji icon if image doesn't load -->
                                            <span v-if="!goal.image" class="text-2xl">{{ goal.icon }}</span>
                                            <h3 class="text-xl font-bold">{{ goal.title }}</h3>
                                        </div>

                                        <!-- Large image below title and above content -->
                                        <div v-if="goal.largeImage" class="my-6 rounded-lg overflow-hidden shadow-md">
                                            <img :src="goal.largeImage" :alt="`${goal.title} illustration`"
                                                class="w-full h-48 object-cover object-center hover:scale-105 transition-transform duration-500" />
                                        </div>

                                        <p v-if="goal.type === 'text'" class="text-[#e6eaf0] text-lg">
                                            {{ goal.description }}
                                        </p>

                                        <ul v-if="goal.type === 'list'" class="space-y-3 mt-2">
                                            <li v-for="(item, i) in goal.description" :key="i"
                                                class="flex items-start gap-2">
                                                <img src="/images/icons/check.png" alt="Check"
                                                    class="w-5 h-5 mt-1 object-contain flex-shrink-0" />
                                                <span>{{ item }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </section>

        <!-- Partners Section -->
        <section class="bg-[#0a2b5c] py-16 px-4">
            <div class="container mx-auto mb-12">
                <div class="flex flex-col items-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-center mb-4 text-[#e6eaf0]">Our Partners</h2>
                    <!-- <div class="w-24 h-1 text-[#f15a22]"></div> -->
                    <p class="text-[#e6eaf0] text-center text-xl mt-6 max-w-2xl">
                        We collaborate with leading organizations across Cambodia to provide the best service to our
                        clients.
                    </p>
                </div>

                <!-- Partners Slider Component -->
                <PartnersSlider :partners="partnersList" :speed="40" size="medium" />
            </div>
        </section>
    </div>
</template>

<script>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import PartnersSlider from '~/components/PartnersSlider.vue';

const goals = [
    {
        title: "Mission",
        image: "/images/icons/target.png",
        type: "text",
        largeImage: "/images/about/1-mission.jpg", // Added large image for the card
        description: "To enable foreign investors to own their tangible assets and to grow their businesses.",
    },
    {
        title: "Vision",
        image: "/images/icons/idea.png",
        type: "text",
        largeImage: "/images/about/1-vision.jpg", // Added large image for the card
        description: "To be an active catalyst in bringing foreign investments into Cambodia.",
    },
    {
        title: "Value",
        image: "/images/icons/diamond.png",
        type: "list",
        largeImage: "/images/about/1-value.jpg", // Added large image for the card
        description: [
            "Transparency: We are transparent in all dealings with our customers.",
            "Conduct of Business: We serve our customers with mutual respect and honesty. We do not tolerate bribery in any form.",
            "Relationships: We believe in building a total and long-lasting relationship with our clients, offering them the entire range of products and services available not only in Cambodia but also from our overseas business units.",
        ],
    },
];

export default {

    name: 'AboutPage',
    components: {
        Header,
        Footer,
        PartnersSlider
    },
    data() {
        return {
            currentSlide: 0,
            goals,
            members: [
                {
                    title: 'Phillip Bank',
                    description: 'One of the medium-sized commercial banks in Cambodia, providing comprehensive banking services.',
                    image: '/images/about/1-phillip-bank.jpg',
                    icon: 'bank'
                },
                {
                    title: 'Phillip General & Life Insurance',
                    description: 'Offering a wide range of insurance products to protect individuals and businesses.',
                    image: '/images/about/1-phillip-general-insurance.png',
                    icon: 'shield'
                },
                {
                    title: 'Phillip Trustee',
                    description: 'Providing trust services to help foreign investors secure their assets in Cambodia.',
                    image: '/images/about/1-phillip-trustee.jpg',
                    icon: 'users'
                }
            ],
            partnersList: [
                { name: 'Rose Mavel', image: '/images/partners/1_Rose_Mavel.jpg' },
                { name: 'La Maision', image: '/images/partners/2_La_Maision.jpg' },
                { name: 'Vimean Samnang', image: '/images/partners/3_Vimean_Samnang.jpg' },
                { name: 'IPS', image: '/images/partners/4_IPS.jpg' },
                { name: 'SaRaNa', image: '/images/partners/5_SaRaNa.jpg' },
                { name: 'YI Dung', image: '/images/partners/6_YI Dung.jpg' },
                { name: 'Dragon Land', image: '/images/partners/Dragon Land.jpg' },
            ]
        };
    },
    methods: {
        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.members.length;
            this.updateCarousel();
        },
        prevSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.members.length) % this.members.length;
            this.updateCarousel();
        },
        goToSlide(index) {
            this.currentSlide = index;
            this.updateCarousel();
        },
        updateCarousel() {
            const track = this.$refs.carouselTrack;
            if (track) {
                const slideWidth = 100;
                const translateX = -this.currentSlide * slideWidth;
                track.style.transform = `translateX(${translateX}%)`;
            }
        }
    },
    mounted() {
        this.updateCarousel();
        // Handle responsive carousel
        this.handleResize = () => {
            this.updateCarousel();
        };
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
};
</script>

<style scoped>
@import '~/assets/css/theme.css';

.carousel-container {
    width: 100%;
    position: relative;
}

.carousel-track {
    width: 300%;
}

@media (min-width: 768px) {
    .carousel-track {
        width: 100%;
    }
}

/* Added animations */
.animate-fadeIn {
    animation: fadeIn 1s ease-in-out;
}

.animate-fadeUp {
    animation: fadeUp 1s ease-out;
}

.animate-widthGrow {
    animation: widthGrow 1.5s ease-out;
}

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

.animation-delay-300 {
    animation-delay: 300ms;
}

.bg-pattern-dots {
    background-image: radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px);
    background-size: 20px 20px;
}

.bg-gradient-radial {
    background: radial-gradient(circle at center, var(--tw-gradient-from), var(--tw-gradient-to));
}

/* Hover effects */
.hover\:shadow-orange-500\/20:hover {
    box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.2), 0 4px 6px -4px rgba(249, 115, 22, 0.2);
}

.hover\:shadow-orange-500\/30:hover {
    box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.3), 0 4px 6px -4px rgba(249, 115, 22, 0.3);
}

/* Set the partners section background variable for the slider component */
section.bg-\[\#0a2b5c\] .partners-slider-wrapper {
    --bg-color: #0a2b5c;
}

section.bg-\[\#0e2a52\] .partners-slider-wrapper {
    --bg-color: #0e2a52;
}
</style>
