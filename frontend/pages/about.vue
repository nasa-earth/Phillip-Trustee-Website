<template>
    <div class="min-h-screen bg-lightgray">
        <Header />

        <!-- Hero Section -->
        <section class="relative bg-gradient-to-br from-navy via-[#1d4170] to-navy text-white py-24">
            <div class="container mx-auto px-4 md:px-8 flex flex-col items-center">
                <h1 class="text-4xl md:text-5xl font-bold text-center mb-6 text-orange">Phillip Trustee (Cambodia)</h1>
                <p class="text-xl md:text-2xl text-center max-w-3xl text-lightgray2">
                    Your trusted partner for commercial, social and personal trust services in Cambodia
                </p>
                <div class="mt-12 w-full max-w-2xl">
                    <div class="bg-white rounded-2xl shadow-2xl p-6 flex items-center justify-center">
                        <img src="/images/logo.svg" alt="Phillip Trustee Office Building"
                            class="w-48 h-48 object-contain" />
                    </div>
                </div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 h-16 bg-lightgray2 transform -translate-y-1/2 skew-y-3"></div>
        </section>

        <!-- About Section -->
        <section class="py-20 px-4 md:px-8 bg-[#13325e]">
            <div class="container mx-auto">
                <div class="flex flex-col md:flex-row items-center gap-12">
                    <div class="w-full md:w-1/2 flex justify-center">
                        <img src="~/assets/images/about/2_about.jpg" alt="About Phillip Trustee"
                            class="w-100 h-100 object-contain rounded-2xl shadow-lg bg-white p-6" />
                    </div>
                    <div class="w-full md:w-1/2 text-white">
                        <h2 class="text-3xl md:text-4xl font-bold text-navy mb-6">About Us</h2>
                        <div class="space-y-4 text-white">
                            <p>
                                Phillip Trustee (Cambodia), Co Ltd. was incorporated in June 2022, after the Law of
                                Trust was passed in 2019, allowing foreigners to register their fixed assets with
                                trustee companies in Cambodia. Our specialised license consists of commercial, social
                                and personal trust in which has been approved by the Trust Regulator.
                            </p>
                            <p>
                                We are the associated company of Phillip Bank, Plc, one of the medium-sized commercial
                                banks in Cambodia, part of Phillip Capital group in Singapore, and a sister company of
                                Phillip General Insurance and Phillip Life Assurance Company.
                            </p>
                            <p>
                                At Phillip Trustee (Cambodia), Co Ltd. we believe in a financial and non-financial
                                ecosystem that can provide suitable services to investors and customers throughout
                                Cambodia such as commercial, public, social and personal trust services.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Phillip Members Section -->
        <section class="py-20 px-4 md:px-8 ">
            <div class="container mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-navy mb-3">
                        Phillip Members (Cambodia Offices)
                    </h2>
                    <p class="text-xl text-navy/70">
                        (Mutual integration and resource complementary)
                    </p>
                </div>

                <div class="relative">
                    <div class="carousel-container overflow-hidden">
                        <div class="carousel-track flex transition-transform duration-300" ref="carouselTrack">
                            <div v-for="(member, index) in members" :key="index"
                                class="carousel-item w-full md:w-1/3 flex-shrink-0 px-4">
                                <div class="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
                                    <img :src="member.image" :alt="member.title"
                                        class="w-full h-48 object-contain bg-lightgray2" />
                                    <div class="p-6 flex-1 flex flex-col justify-between">
                                        <h3 class="text-xl font-semibold text-navy mb-2">{{ member.title }}</h3>
                                        <p class="text-navy/80">{{ member.description }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button @click="prevSlide"
                        class="absolute top-1/2 left-0 -translate-y-1/2 bg-white text-navy p-2 rounded-full shadow-md z-10 hover:bg-orange hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button @click="nextSlide"
                        class="absolute top-1/2 right-0 -translate-y-1/2 bg-white text-navy p-2 rounded-full shadow-md z-10 hover:bg-orange hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div class="flex justify-center mt-6 space-x-2">
                        <button v-for="(_, index) in members" :key="index" @click="goToSlide(index)" :class="[
                            'w-3 h-3 rounded-full transition-all',
                            currentSlide === index ? 'bg-orange scale-125' : 'bg-navy/30'
                        ]"></button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Vision, Mission, Values Section -->
        <section class="py-20 px-4 md:px-8">
            <div class="container mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <!-- Vision -->
                    <div
                        class="bg-white rounded-2xl shadow-lg p-8 transform transition-transform hover:scale-105 border-t-4 border-orange">
                        <div class="flex items-center mb-4">
                            <div class="bg-orange/10 p-3 rounded-full mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 class="text-2xl font-bold text-navy">Vision</h3>
                        </div>
                        <p class="text-navy/80">To be an active catalyst in bringing foreign investments into Cambodia.
                        </p>
                    </div>

                    <!-- Mission -->
                    <div
                        class="bg-white rounded-2xl shadow-lg p-8 transform transition-transform hover:scale-105 border-t-4 border-orange">
                        <div class="flex items-center mb-4">
                            <div class="bg-orange/10 p-3 rounded-full mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 class="text-2xl font-bold text-navy">Mission</h3>
                        </div>
                        <p class="text-navy/80">To enable foreign investors to own their tangible assets and to grow
                            their businesses.</p>
                    </div>

                    <!-- Values -->
                    <div
                        class="bg-white rounded-2xl shadow-lg p-8 transform transition-transform hover:scale-105 border-t-4 border-orange">
                        <div class="flex items-center mb-4">
                            <div class="bg-orange/10 p-3 rounded-full mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 class="text-2xl font-bold text-navy">Values</h3>
                        </div>
                        <ul class="space-y-2 text-navy/80">
                            <li><span class="font-medium text-orange">Transparency:</span> We are transparent in all
                                dealings with our customers.</li>
                            <li><span class="font-medium text-orange">Conduct of Business:</span> We serve our customers
                                with mutual respect and honesty. We do not tolerate bribery in any form.</li>
                            <li><span class="font-medium text-orange">Relationships:</span> We believe in building a
                                total and long-lasting relationship with our clients, offering them the entire range of
                                products and services available not only in Cambodia but also from our overseas business
                                units.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </div>
</template>

<script>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';

export default {
    
    name: 'AboutPage',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            currentSlide: 0,
            members: [
                {
                    title: 'Phillip Bank',
                    description: 'One of the medium-sized commercial banks in Cambodia, providing comprehensive banking services.',
                    image: '/images/about/1-phillip-bank.jpg'
                },
                {
                    title: 'Phillip General & Life Insurance',
                    description: 'Offering a wide range of insurance products to protect individuals and businesses.',
                    image: '/images/about/1-phillip-general-insurance.png'
                },
                {
                    title: 'Phillip Trustee',
                    description: 'Providing life insurance solutions to secure the financial future of families in Cambodia.',
                    image: '/images/about/1-phillip-trustee.jpg'
                }
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
</style>
