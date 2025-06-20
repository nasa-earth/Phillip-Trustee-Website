<template>
    <div class="faqs-page relative"> <!-- Hero Section with Particles -->
        <section
            class="relative min-h-[80vh] w-full flex items-center justify-center bg-cover bg-center overflow-hidden"
            :style="{ backgroundImage: 'url(/images/Services/client-value.jpg)' }">
            <!-- Animated Overlay with Particles -->
            <div class="absolute inset-0 z-0">
                <!-- Glass Gradient Overlay -->
                <div
                    class="absolute inset-0 bg-gradient-to-b from-[#001a4d]/80 via-[#0e2a52]/70 to-[#001a4d]/90 backdrop-blur-[2px]">
                </div>

                <!-- Animated Particles for dynamic effect -->
                <div class="particles-container absolute inset-0 opacity-30">
                    <div v-for="i in 40" :key="`particle-${i}`" class="particle absolute rounded-full bg-white" :style="{
                        width: `${Math.random() * 6 + 2}px`,
                        height: `${Math.random() * 6 + 2}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.5 + 0.3,
                        animationDuration: `${Math.random() * 20 + 10}s`,
                        animationDelay: `${Math.random() * 5}s`
                    }">
                    </div>
                </div>
            </div>

            <!-- Animated Gradient Orbs -->
            <div
                class="absolute top-1/4 left-10 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-r from-[#f15a22]/20 to-orange-400/20 rounded-full blur-[80px] animate-pulse-slow">
            </div>
            <div
                class="absolute bottom-1/4 right-10 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-[#001a4d]/30 to-[#0e2a52]/30 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000">
            </div>

            <!-- Floating Elements -->
            <div
                class="hidden md:block absolute top-1/3 right-[20%] w-16 h-16 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm animate-float">
            </div>
            <div
                class="hidden md:block absolute bottom-1/3 left-[15%] w-20 h-20 rounded-full border border-[#f15a22]/10 bg-[#f15a22]/5 backdrop-blur-sm animate-float-delay">
            </div>

            <!-- Content -->
            <div class="relative z-10 text-center px-6 max-w-4xl" v-motion-slide-visible-once-bottom>
                <div class="mb-8 flex justify-center" v-motion-pop-visible-once>
                    <div
                        class="w-20 h-20 bg-gradient-to-br from-[#f15a22] to-orange-400 rounded-full flex items-center justify-center shadow-xl shadow-[#f15a22]/20">
                        <img src="/images/icons/shield.png" alt="Phillip Trustee" class="w-10 h-10 object-contain" />
                    </div>
                </div>

                <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-6" v-motion-slide-visible-once-bottom>
                    <span class="text-orange-400 block mb-2">Frequently Asked</span>
                    <span class="bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200 block">
                        Questions
                    </span>
                </h1>

                <p class="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed" v-motion-slide-visible-once-bottom>
                    Find answers to common questions about our trust services and support
                </p>

                <!-- Search Input -->
                <div class="relative max-w-2xl mx-auto mb-12 animate-fadeInUp" v-motion-slide-visible-once-bottom>
                    <input v-model="searchQuery" type="text" placeholder="Search for questions..."
                        class="w-full px-6 py-4 pr-12 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-[#f15a22] shadow-lg transition-all duration-300">
                    <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                </div>
            </div>

            <!-- Scroll Indicator -->
            <div
                class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slow z-10">
                <span class="text-white/80 text-sm mb-2">Scroll Down</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white/80" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section> <!-- Main Question Highlight -->
        <section class="container mx-auto px-4 -mt-20 relative z-20">
            <div class="max-w-3xl mx-auto mb-16">
                <div class="bg-gradient-to-br from-white/90 to-[#f8f9fa]/90 rounded-2xl shadow-2xl p-8 hover:shadow-[#f15a22]/20 transition-all duration-300 transform hover:translate-y-[-5px] backdrop-blur-md border border-white/50"
                    v-motion-slide-visible-once-bottom>
                    <div class="flex flex-wrap items-start gap-4 mb-6">
                        <div class="shrink-0">
                            <div
                                class="bg-gradient-to-r from-[#f15a22] to-orange-400 text-white px-4 py-2 rounded-full font-semibold text-sm uppercase shadow-md">
                                Featured Question
                            </div>
                        </div>
                        <h2 class="text-2xl md:text-3xl font-bold text-[#13325e]">{{ faqs[0].question }}</h2>
                    </div>
                    <div class="text-[#13325e]/80 text-lg leading-relaxed" v-html="faqs[0].answer"></div>

                    <div class="mt-6 pt-6 border-t border-gray-200 flex flex-wrap justify-between gap-4">
                        <div class="flex items-center">
                            <button @click="showContactInfo = !showContactInfo"
                                class="flex items-center gap-2 text-[#13325e] hover:text-[#f15a22] transition-colors group">
                                <div
                                    class="w-8 h-8 rounded-full bg-[#f15a22]/10 flex items-center justify-center group-hover:bg-[#f15a22]/20 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#f15a22]" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span>{{ showContactInfo ? 'Hide Contact Info' : 'Need more help?' }}</span>
                            </button>
                        </div>
                        <div class="flex items-center gap-3">
                            <button
                                class="w-8 h-8 rounded-full bg-[#13325e]/10 flex items-center justify-center hover:bg-[#13325e]/20 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#13325e]" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                            </button>
                            <button
                                class="w-8 h-8 rounded-full bg-[#13325e]/10 flex items-center justify-center hover:bg-[#13325e]/20 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#13325e]" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <transition name="fade">
                        <div v-if="showContactInfo"
                            class="mt-4 p-5 bg-gradient-to-r from-[#13325e]/5 to-[#f15a22]/5 rounded-lg text-center border border-[#13325e]/10">
                            <p class="text-[#13325e]/80">For more detailed assistance, contact our trust experts at:</p>
                            <p class="font-bold mt-2 text-[#13325e]">info@philliptrustee.com.kh | +855 23 922 222</p>
                        </div>
                    </transition>
                </div>
            </div>
        </section> <!-- FAQ Accordion Section -->
        <section class="bg-gradient-to-b from-[#f8f9fa] to-white py-16 px-4 mb-0">
            <div class="container mx-auto">
                <div class="max-w-4xl mx-auto">
                    <div class="flex flex-wrap justify-between items-center mb-8" v-motion-slide-visible-once-bottom>
                        <h2
                            class="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#13325e] to-[#0e2a52]">
                            All Questions</h2>
                        <div class="flex items-center gap-2">
                            <button @click="expandAll"
                                class="px-4 py-2 text-sm font-medium bg-[#13325e]/10 text-[#13325e] hover:bg-[#13325e]/20 transition-all rounded-lg flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                                Expand All
                            </button>
                            <button @click="collapseAll"
                                class="px-4 py-2 text-sm font-medium bg-[#13325e]/10 text-[#13325e] hover:bg-[#13325e]/20 transition-all rounded-lg flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 15l7-7 7 7" />
                                </svg>
                                Collapse All
                            </button>
                        </div>
                    </div> <!-- Filter Categories -->
                    <div class="flex flex-wrap gap-2 mb-8 overflow-x-auto py-2 scrollbar-hide bg-white/50 p-3 rounded-2xl backdrop-blur-sm border border-[#e6eaf0]"
                        v-motion-slide-visible-once-bottom>
                        <button @click="selectedCategory = null"
                            :class="['category-btn', !selectedCategory ? 'active' : '']">
                            <span class="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                All Questions
                            </span>
                        </button>
                        <button v-for="category in categories" :key="category" @click="selectedCategory = category"
                            :class="['category-btn', selectedCategory === category ? 'active' : '']">
                            {{ category }}
                        </button>
                    </div>

                    <div v-if="filteredFaqs.length === 0" class="text-center py-16 bg-white/50 rounded-2xl shadow-md"
                        v-motion-slide-visible-once-bottom>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p class="text-xl text-gray-500 mb-4">No questions found matching your search</p>
                        <button @click="clearSearch"
                            class="px-6 py-2 bg-gradient-to-r from-[#f15a22] to-orange-500 text-white rounded-lg hover:shadow-lg hover:shadow-[#f15a22]/30 transition-all transform hover:translate-y-[-2px]">
                            Clear Search
                        </button>
                    </div>

                    <div v-else class="space-y-4">
                        <div v-for="(faq, idx) in filteredFaqs" :key="idx"
                            class="bg-gradient-to-r from-white to-white/90 rounded-xl shadow-md border border-[#e6eaf0] transition-all duration-300 overflow-hidden hover:shadow-lg hover:border-[#f15a22]/20 backdrop-blur-sm"
                            v-motion-slide-visible-once-bottom :style="{ animationDelay: `${idx * 100}ms` }">
                            <button
                                class="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
                                @click="toggle(getFaqIndex(faq))">
                                <span class="flex-1 pr-4">
                                    <span v-if="searchQuery" v-html="highlightSearch(faq.question)"
                                        class="text-lg font-semibold bg-clip-text"
                                        :class="faq.open ? 'text-transparent bg-gradient-to-r from-[#f15a22] to-[#f97949]' : 'text-[#13325e]'"></span>
                                    <span v-else class="text-lg font-semibold"
                                        :class="faq.open ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#f15a22] to-[#f97949]' : 'text-[#13325e]'">
                                        {{ faq.question }}
                                    </span>
                                </span>
                                <div class="flex items-center gap-3">
                                    <span class="hidden sm:block text-sm px-3 py-1 rounded-full"
                                        :class="faq.open ? 'bg-gradient-to-r from-[#f15a22]/20 to-orange-400/20 text-[#f15a22] shadow-sm' : 'bg-[#13325e]/10 text-[#13325e]'">
                                        {{ getCategoryFromQuestion(faq.question) }}
                                    </span>
                                    <span
                                        class="h-8 w-8 flex items-center justify-center rounded-full transition-all duration-300"
                                        :class="faq.open ? 'bg-gradient-to-r from-[#f15a22] to-orange-500 text-white shadow-md shadow-[#f15a22]/20' : 'bg-[#13325e]/5 text-[#13325e]'">
                                        <svg :class="['w-4 h-4 transition-transform duration-300', { 'rotate-180': faq.open }]"
                                            fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </div>
                            </button>
                            <transition name="accordion">
                                <div v-if="faq.open"
                                    class="px-6 pb-6 border-t border-[#e6eaf0] pt-4 bg-gradient-to-b from-white/50 to-[#f8f9fa]/80 backdrop-blur-sm">
                                    <div v-if="searchQuery" v-html="highlightSearch(faq.answer)"
                                        class="prose text-[#13325e]/80 leading-relaxed"></div>
                                    <div v-else v-html="faq.answer" class="prose text-[#13325e]/80 leading-relaxed">
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
        </section> <!-- Contact CTA Section -->
        <section class="bg-gradient-to-br from-[#13325e] to-[#1d4170] py-16 relative overflow-hidden">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl md:text-4xl font-bold mb-6" v-motion-slide-visible-once-bottom>
                    <span class="bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-100">
                        Still Have Questions?
                    </span>
                </h2>
                <p class="text-xl text-[#e6eaf0] max-w-2xl mx-auto mb-8" v-motion-slide-visible-once-bottom>
                    Our team of trust experts is ready to answer any questions you may have about our services.
                </p>
                <div class="flex flex-wrap justify-center gap-4" v-motion-slide-visible-once-bottom>
                    <NuxtLink to="/contact"
                        class="px-8 py-3 bg-gradient-to-r from-[#f15a22] to-orange-500 text-white rounded-lg shadow-lg shadow-[#f15a22]/30 hover:shadow-xl hover:shadow-[#f15a22]/40 transition-all duration-300 transform hover:scale-105">
                        Contact Us
                    </NuxtLink>
                    <a href="tel:+85523922222"
                        class="px-8 py-3 bg-white text-[#13325e] rounded-lg shadow-lg hover:shadow-xl hover:bg-[#e6eaf0] transition-all duration-300 transform hover:scale-105">
                        Call Now
                    </a>
                </div>
            </div>

            <!-- Decorative Elements -->
            <div
                class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-[#f15a22]/20 to-orange-400/20 rounded-full blur-3xl -z-10">
            </div>
            <div
                class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-[#13325e]/30 to-[#1d4170]/30 rounded-full blur-3xl -z-10">
            </div>

            <!-- Floating Elements -->
            <div
                class="hidden md:block absolute top-1/4 right-1/4 w-16 h-16 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm rotate-12 animate-float">
            </div>
            <div
                class="hidden md:block absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full border border-[#f15a22]/10 bg-[#f15a22]/5 backdrop-blur-sm animate-float-delay">
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'FaqsPage',
    data() {
        return {
            faqs: [
                {
                    question: 'How does a Trust work? (1.1 What is the current state of trust law in Cambodia, and how has it evolved over time?)',
                    answer: `Under the Trust Law enacted on January 2, 2019, a trust is a three-party legal relationship, in which the
Trustor (or investor) transfers property or fund to a Trustee who shall hold, manage and protect it,
apart from its own estate, for the trust's beneficiary. The Trustee (or the Trust Company) is licensed
by the NBFSA under the Ministry of Economy and Finance (MEF) and the Trust Regulator. Foreign investors
can now make a profit from land appreciation without acquiring the land in their name, they can do so
without relinquishing their nationality or applying for the Cambodian nationality.`,
                    open: false
                },
                {
                    question: 'What is Proprietary Protection Trust (1.2 What types of trusts are available in Cambodia?)',
                    answer: `A Proprietary Protection Trust is a mechanism to protect property against risks. It's one of the trust types available in Cambodia, established to safeguard assets from creditors, legal judgments, or other claims. The trustee holds and manages the property for the benefit of the beneficiaries while keeping it separate from personal assets.`,
                    open: false
                }, {
                    question: "What is Escrow Trust? (1.3 How do escrow services function within Cambodia's trust framework?)",
                    answer: "An Escrow Trust is a type of trust arrangement where funds or assets are held by a third party (the trustee) on behalf of two other parties that are typically completing a transaction. The trustee only releases the funds or assets when all terms of the agreement have been met, providing security to both the buyer and seller in the transaction.",
                    open: false
                },
                {
                    question: "What is the purpose of a Trust Company? (2.1 What safeguards are in place to protect trust assets?)",
                    answer: "A Trust Company serves as a fiduciary, holding and managing assets for the benefit of another party (beneficiary). In Cambodia, Trust Companies are regulated by the NBFSA and must maintain strict separation between their own assets and trust assets. They provide professional management, legal compliance, continuity, and protection against conflicts of interest.",
                    open: false
                },
                {
                    question: "How are my assets protected in a trust? (2.2 What happens to trust assets if the trustee faces financial difficulties?)",
                    answer: "Assets in a trust are legally separated from the trustee's personal assets. This means that if the trustee faces bankruptcy or legal claims, the trust assets remain protected and cannot be seized by the trustee's creditors. Additionally, Trust Companies in Cambodia are regulated and must maintain appropriate insurance and capital requirements to further protect client assets.",
                    open: false
                },
                {
                    question: "What are the fees for trust services? (3.1 What are the typical costs associated with setting up and maintaining a trust in Cambodia?)",
                    answer: "Trust service fees typically include setup fees, annual administration fees (usually a percentage of assets under management), transaction fees, and potentially termination fees. At Phillip Trustee, our fee structure is transparent and competitive, varying based on the complexity and size of the trust arrangement. Contact our team for a personalized quote based on your specific requirements.",
                    open: false
                },
                {
                    question: "What are the tax implications of establishing a trust? (3.2 How are trusts taxed in Cambodia?)",
                    answer: "The tax treatment of trusts in Cambodia depends on the type of trust and the specific arrangements. Generally, income generated by trust assets may be subject to taxation either at the trust level or when distributed to beneficiaries. Certain trusts may offer tax planning advantages. We recommend consulting with a tax professional to understand the specific implications for your situation.",
                    open: false
                },
                {
                    question: "Can Phillip Trustee provide banking services? (4.1 What is the relationship between trusts and banking services in Cambodia?)",
                    answer: "While Phillip Trustee is part of Phillip Bank PLC group, trust services and banking services are separate. However, we work closely with Phillip Bank to offer clients comprehensive financial solutions. Trust assets can be held in accounts at Phillip Bank or other financial institutions as appropriate for the trust's objectives and the beneficiaries' needs.",
                    open: false
                }
            ],
            searchQuery: '',
            selectedCategory: null,
            showContactInfo: false
        }
    },
    computed: {
        categories() {
            const categories = new Set();
            this.faqs.forEach(faq => {
                const category = this.getCategoryFromQuestion(faq.question);
                if (category) categories.add(category);
            });
            return Array.from(categories);
        },
        filteredFaqs() {
            return this.faqs.filter(faq => {
                // Skip first FAQ (featured) if we're in the accordion section
                if (faq === this.faqs[0]) return false;

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
            this.faqs[idx].open = !this.faqs[idx].open;
        },
        getFaqIndex(faq) {
            return this.faqs.findIndex(f => f === faq);
        },
        getCategoryFromQuestion(question) {
            // Extract category from question text
            if (question.includes('(1.')) return 'Trust Basics';
            if (question.includes('(2.')) return 'Safety & Security';
            if (question.includes('(3.')) return 'Taxes & Fees';
            if (question.includes('(4.')) return 'Banking Services';
            return 'General';
        },
        highlightSearch(text) {
            if (!this.searchQuery) return text;

            const regex = new RegExp(`(${this.searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            return text.replace(regex, '<mark class="bg-yellow-200 rounded px-1">$1</mark>');
        },
        expandAll() {
            this.filteredFaqs.forEach(faq => {
                const idx = this.getFaqIndex(faq);
                this.faqs[idx].open = true;
            });
        },
        collapseAll() {
            this.filteredFaqs.forEach(faq => {
                const idx = this.getFaqIndex(faq);
                this.faqs[idx].open = false;
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
    background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
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
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
    background-color: #f5f5f7;
    color: #13325e;
    transition: all 0.3s ease;
    white-space: nowrap;
    border: 1px solid transparent;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.category-btn:hover {
    background-color: #e6eaf0;
    border-color: rgba(19, 50, 94, 0.1);
    transform: translateY(-1px);
}

.category-btn.active {
    background: linear-gradient(to right, #13325e, #1d4170);
    color: white;
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 6px -1px rgba(19, 50, 94, 0.2), 0 2px 4px -1px rgba(19, 50, 94, 0.1);
}
</style>
