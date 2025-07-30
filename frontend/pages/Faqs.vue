<template>
    <div class="faqs-page relative">
        <!-- Hero Section with Particles -->
        <section
            class="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-screen w-full flex items-center justify-center bg-cover bg-center overflow-hidden"
            :style="{ backgroundImage: 'url(/images/faq/faq_header.jpg)' }">
            <div class="absolute inset-0 z-0">
                <div class="absolute inset-0 bg-gradient-to-b from-[#001a4d]/50 via-[#0e2a52]/20 to-[#001a4d]/10">
                </div>
            </div>
        </section>

        <!-- FAQ Accordion Section -->
        <section
            class="bg-gradient-to-b from-[#0a2b5c] to-[#081f42] py-8 sm:py-12 md:py-16 px-4 mb-0 relative overflow-hidden">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-5">
                <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="dot-pattern-faq" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1" fill="white" />
                        </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#dot-pattern-faq)" />
                </svg>
            </div>

            <!-- Decorative Elements -->
            <div
                class="absolute top-20 right-0 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-[#f15a22]/10 rounded-full blur-[120px] -z-0 animate-pulse-slow">
            </div>
            <div
                class="absolute bottom-40 left-20 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-blue-600/10 rounded-full blur-[100px] -z-0 animate-pulse-slow animation-delay-3000">
            </div>

            <div class="container mx-auto relative z-10">
                <div class="max-w-4xl mx-auto">
                    <!-- Loading State -->
                    <div v-if="loading" class="text-center py-12 sm:py-16">
                        <div
                            class="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-[#f15a22]">
                        </div>
                        <p class="text-[#e6eaf0] mt-4 text-sm sm:text-base">Loading FAQs...</p>
                    </div>

                    <!-- Error State -->
                    <div v-else-if="error"
                        class="text-center py-12 sm:py-16 bg-red-500/10 rounded-2xl border border-red-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-red-400 mb-4" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p class="text-red-400 mb-4 text-sm sm:text-base">{{ error }}</p>
                        <button @click="getFaqs"
                            class="px-4 py-2 bg-[#f15a22] text-white rounded-lg hover:bg-[#f15a22]/80 transition-colors text-sm sm:text-base">
                            Try Again
                        </button>
                    </div>

                    <!-- FAQ Content -->
                    <div v-else>
                        <div class="flex flex-col sm:flex-row sm:flex-wrap justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-2"
                            v-motion-slide-visible-once-bottom>
                            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-[#e6eaf0]">
                                All Questions</h2>
                            <div class="flex items-center gap-2 w-full sm:w-auto">
                                <button @click="expandAll"
                                    class="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-white/10 text-[#e6eaf0] hover:bg-white/20 transition-all rounded-lg flex items-center justify-center gap-1 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 sm:w-4 sm:h-4" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                    <span class="hidden sm:inline">Expand All</span>
                                    <span class="sm:hidden">Expand</span>
                                </button>
                                <button @click="collapseAll"
                                    class="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-white/10 text-[#e6eaf0] hover:bg-white/20 transition-all rounded-lg flex items-center justify-center gap-1 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 sm:w-4 sm:h-4" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 15l7-7 7 7" />
                                    </svg>
                                    <span class="hidden sm:inline">Collapse All</span>
                                    <span class="sm:hidden">Collapse</span>
                                </button>
                            </div>
                        </div>

                        <!-- Search Bar -->
                        <div class="mb-4 sm:mb-6" v-motion-slide-visible-once-bottom>
                            <div class="relative">
                                <input v-model="searchQuery" type="text" placeholder="Search FAQs..."
                                    class="w-full px-4 py-3 pl-10 sm:pl-12 text-sm sm:text-base bg-white/10 border border-white/20 rounded-xl text-[#e6eaf0] placeholder-[#e6eaf0]/60 focus:outline-none focus:border-[#f15a22] focus:ring-2 focus:ring-[#f15a22]/20 transition-all backdrop-blur-sm">
                                <svg class="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#e6eaf0]/60"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <button v-if="searchQuery" @click="searchQuery = ''"
                                    class="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-[#e6eaf0]/60 hover:text-[#f15a22] transition-colors">
                                    <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Filter Categories -->
                        <div class="flex flex-wrap gap-2 mb-6 sm:mb-8 overflow-x-auto py-2 scrollbar-hide bg-white/20 p-2 sm:p-3 rounded-2xl backdrop-blur-sm border border-white/10"
                            v-motion-slide-visible-once-bottom>
                            <button @click="selectedCategory = null"
                                :class="['category-btn cursor-pointer', !selectedCategory ? 'active' : '']">
                                <span class="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 sm:w-4 sm:h-4" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                    <span class="hidden sm:inline">All Questions</span>
                                    <span class="sm:hidden">All</span>
                                </span>
                            </button>
                            <button v-for="category in categories" :key="category" @click="selectedCategory = category"
                                :class="['category-btn cursor-pointer', selectedCategory === category ? 'active' : '']">
                                <span class="sm:hidden">{{ category.split(' ')[0] }}</span>
                                <span class="hidden sm:inline">{{ category }}</span>
                            </button>
                        </div>

                        <div v-if="filteredFaqs.length === 0"
                            class="text-center py-12 sm:py-16 bg-white/20 rounded-2xl shadow-md backdrop-blur-sm border border-white/10"
                            v-motion-slide-visible-once-bottom>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-white/40 mb-4" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p class="text-lg sm:text-xl text-[#e6eaf0]/80 mb-4">No questions found matching your search
                            </p>
                            <button @click="clearSearch"
                                class="px-4 sm:px-6 py-2 bg-gradient-to-r from-[#f15a22] to-orange-500 text-white rounded-lg hover:shadow-lg hover:shadow-[#f15a22]/30 transition-all transform hover:translate-y-[-2px] text-sm sm:text-base">
                                Clear Search
                            </button>
                        </div>

                        <div v-else class="space-y-3 sm:space-y-4">
                            <div v-for="(faq, idx) in filteredFaqs" :key="faq.id || idx"
                                class="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl shadow-md border border-white/10 transition-all duration-300 overflow-hidden hover:shadow-lg hover:border-[#f15a22]/30"
                                v-motion-slide-visible-once-bottom :style="{ animationDelay: `${idx * 100}ms` }">
                                <button
                                    class="w-full flex justify-between items-center px-4 sm:px-6 py-4 sm:py-5 text-left focus:outline-none cursor-pointer"
                                    @click="toggle(getFaqIndex(faq))">
                                    <span class="flex-1 pr-3 sm:pr-4">
                                        <span v-if="searchQuery" v-html="highlightSearch(faq.question)"
                                            class="text-base sm:text-lg font-semibold"
                                            :class="faq.open ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#f15a22] to-[#f97949]' : 'text-[#e6eaf0]'"></span>
                                        <span v-else class="text-base sm:text-lg font-semibold"
                                            :class="faq.open ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#f15a22] to-[#f97949]' : 'text-[#e6eaf0]'">
                                            {{ faq.question }}
                                        </span>
                                    </span>
                                    <div class="flex items-center gap-2 sm:gap-3">
                                        <span class="hidden sm:block text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full"
                                            :class="faq.open ? 'bg-gradient-to-r from-[#f15a22]/20 to-orange-400/20 text-[#f15a22] shadow-sm' : 'bg-white/10 text-[#e6eaf0]/80'">
                                            {{ getCategoryFromQuestion(faq.question) }}
                                        </span>
                                        <span
                                            class="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-full transition-all duration-300"
                                            :class="faq.open ? 'bg-gradient-to-r from-[#f15a22] to-orange-500 text-white shadow-md shadow-[#f15a22]/20' : 'bg-white/10 text-[#e6eaf0]'">
                                            <svg :class="['w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300', { 'rotate-180': faq.open }]"
                                                fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </div>
                                </button>
                                <transition name="accordion">
                                    <div v-if="faq.open"
                                        class="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-white/10 pt-3 sm:pt-4 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm">
                                        <div v-if="searchQuery" v-html="highlightSearch(faq.answer)"
                                            class="prose text-[#e6eaf0]/90 leading-relaxed max-w-none text-sm sm:text-base">
                                        </div>
                                        <div v-else v-html="faq.answer"
                                            class="prose text-[#e6eaf0]/90 leading-relaxed max-w-none text-sm sm:text-base">
                                        </div>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
import { useFaqs } from '~/composables/useFaqs';

export default {
    name: 'FaqsPage',
    setup() {
        const { faqs, loading, error, getFaqs } = useFaqs();

        return {
            faqs,
            loading,
            error,
            getFaqs
        };
    },
    data() {
        return {
            searchQuery: '',
            selectedCategory: null,
            showContactInfo: false
        }
    },
    async mounted() {
        try {
            await this.getFaqs();
        } catch (error) {
            console.error('Error loading FAQs:', error);
        }
    },
    computed: {
        categories() {
            if (!this.faqs || !Array.isArray(this.faqs)) return [];

            const categories = new Set();
            this.faqs.forEach(faq => {
                const category = this.getCategoryFromQuestion(faq.question);
                if (category) categories.add(category);
            });
            return Array.from(categories);
        },
        filteredFaqs() {
            if (!this.faqs || !Array.isArray(this.faqs)) return [];

            return this.faqs.filter(faq => {
                // Filter by search
                if (this.searchQuery) {
                    const searchLower = this.searchQuery.toLowerCase();
                    const questionMatch = faq.question.toLowerCase().includes(searchLower);
                    const answerMatch = faq.answer.toLowerCase().includes(searchLower);
                    if (!questionMatch && !answerMatch) return false;
                }

                // Filter by category
                if (this.selectedCategory) {
                    const category = this.getCategoryFromQuestion(faq.question);
                    if (category !== this.selectedCategory) return false;
                }

                return true;
            });
        }
    },
    methods: {
        toggle(idx) {
            if (!this.faqs || !Array.isArray(this.faqs) || idx < 0 || idx >= this.faqs.length) return;
            this.faqs[idx].open = !this.faqs[idx].open;
        },
        getFaqIndex(faq) {
            if (!this.faqs || !Array.isArray(this.faqs)) return -1;
            return this.faqs.findIndex(f => f === faq);
        },
        getCategoryFromQuestion(question) {
            // Use category from backend if available, otherwise fallback to parsing question number
            if (this.faqs && Array.isArray(this.faqs)) {
                const faq = this.faqs.find(f => f.question === question);
                if (faq && faq.category) {
                    return faq.category;
                }
            }

            // Fallback to parsing question number for existing FAQs
            if (question.startsWith('1.')) return 'Trust Basics';
            if (question.startsWith('2.')) return 'Safety & Security';
            if (question.startsWith('3.')) return 'Taxes & Fees';
            if (question.startsWith('4.')) return 'Banking Services';
            return 'General';
        },
        highlightSearch(text) {
            if (!this.searchQuery) return text;

            const regex = new RegExp(`(${this.searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            return text.replace(regex, '<mark class="bg-yellow-200 text-gray-800 rounded px-1">$1</mark>');
        },
        expandAll() {
            if (!this.filteredFaqs || !Array.isArray(this.filteredFaqs)) return;

            this.filteredFaqs.forEach(faq => {
                const idx = this.getFaqIndex(faq);
                if (idx >= 0) {
                    this.faqs[idx].open = true;
                }
            });
        },
        collapseAll() {
            if (!this.filteredFaqs || !Array.isArray(this.filteredFaqs)) return;

            this.filteredFaqs.forEach(faq => {
                const idx = this.getFaqIndex(faq);
                if (idx >= 0) {
                    this.faqs[idx].open = false;
                }
            });
        },
        clearSearch() {
            this.searchQuery = '';
            this.selectedCategory = null;
        }
    }
}
</script>

<style scoped>
@import '~/assets/css/theme.css';

.faqs-page {
    background: linear-gradient(to bottom, #0a2b5c 0%, #081f42 100%);
    min-height: 100vh;
}

.hero-section {
    background: linear-gradient(135deg, #13325e 0%, #1d4170 50%, #13325e 100%);
    position: relative;
    overflow: hidden;
}

/* Particle Animation */
@keyframes floatParticle {
    0% {
        transform: translateY(0) translateX(0) rotate(0deg);
    }

    33% {
        transform: translateY(-30px) translateX(20px) rotate(120deg);
    }

    66% {
        transform: translateY(20px) translateX(-15px) rotate(240deg);
    }

    100% {
        transform: translateY(0) translateX(0) rotate(360deg);
    }
}

.particle {
    animation: floatParticle 15s infinite ease-in-out;
    will-change: transform;
}

/* Animations */
@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse-slow {

    0%,
    100% {
        transform: scale(1);
        opacity: 1;
    }

    50% {
        transform: scale(1.05);
        opacity: 0.8;
    }
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0px) rotate(0deg);
    }

    33% {
        transform: translateY(-10px) rotate(-5deg);
    }

    66% {
        transform: translateY(5px) rotate(5deg);
    }
}

.animate-float {
    animation: float 8s ease-in-out infinite;
}

.animate-float-delay {
    animation: float 10s ease-in-out 2s infinite;
}

.animate-fadeInDown {
    animation: fadeInDown 0.8s cubic-bezier(.4, 0, .2, 1) both;
}

.animate-fadeInUp {
    animation: fadeInUp 0.8s cubic-bezier(.4, 0, .2, 1) both;
}

.animation-delay-100 {
    animation-delay: 0.1s;
}

.animation-delay-200 {
    animation-delay: 0.2s;
}

.animation-delay-300 {
    animation-delay: 0.3s;
}

.animate-pulse-slow {
    animation: pulse-slow 3s infinite;
}

/* Scrollbar styling */
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.accordion-enter-active,
.accordion-leave-active {
    transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
    max-height: 1000px;
    overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
    max-height: 0;
    opacity: 0;
    padding-top: 0;
    padding-bottom: 0;
}

/* Category Buttons */
.category-btn {
    padding: 0.375rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    background-color: rgba(255, 255, 255, 0.1);
    color: #e6eaf0;
    transition: all 0.3s ease;
    white-space: nowrap;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
}

@media (min-width: 640px) {
    .category-btn {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
    }
}

.category-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(241, 90, 34, 0.3);
    transform: translateY(-1px);
}

.category-btn.active {
    background: linear-gradient(to right, #f15a22, #f97949);
    color: white;
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 6px -1px rgba(241, 90, 34, 0.3), 0 2px 4px -1px rgba(241, 90, 34, 0.2);
}

/* Prose styling for FAQ answers */
.prose {
    max-width: none;
}

.prose p {
    margin-bottom: 1rem;
}

.prose ul {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
}

.prose li {
    margin-bottom: 0.5rem;
}
</style>
