<template>
    <div class="faqs-page relative">

        <!-- Hero Section with Particles -->
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
        </section>

        <!-- FAQ Accordion Section -->
        <section class="bg-gradient-to-b from-[#0a2b5c] to-[#081f42] py-16 px-4 mb-0 relative overflow-hidden">
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
                class="absolute top-20 right-0 w-72 h-72 bg-[#f15a22]/10 rounded-full blur-[120px] -z-0 animate-pulse-slow">
            </div>
            <div
                class="absolute bottom-40 left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -z-0 animate-pulse-slow animation-delay-3000">
            </div>

            <div class="container mx-auto relative z-10">
                <div class="max-w-4xl mx-auto">
                    <div class="flex flex-wrap justify-between items-center mb-8" v-motion-slide-visible-once-bottom>
                        <h2 class="text-3xl md:text-4xl font-bold text-[#e6eaf0]">
                            All Questions</h2>
                        <div class="flex items-center gap-2">
                            <button @click="expandAll"
                                class="px-4 py-2 text-sm font-medium bg-white/10 text-[#e6eaf0] hover:bg-white/20 transition-all rounded-lg flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                                Expand All
                            </button>
                            <button @click="collapseAll"
                                class="px-4 py-2 text-sm font-medium bg-white/10 text-[#e6eaf0] hover:bg-white/20 transition-all rounded-lg flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 15l7-7 7 7" />
                                </svg>
                                Collapse All
                            </button>
                        </div>
                    </div> <!-- Filter Categories -->
                    <div class="flex flex-wrap gap-2 mb-8 overflow-x-auto py-2 scrollbar-hide bg-white/20 p-3 rounded-2xl backdrop-blur-sm border border-white/10"
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

                    <div v-if="filteredFaqs.length === 0"
                        class="text-center py-16 bg-white/20 rounded-2xl shadow-md backdrop-blur-sm border border-white/10"
                        v-motion-slide-visible-once-bottom>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 mx-auto text-white/40 mb-4" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p class="text-xl text-[#e6eaf0]/80 mb-4">No questions found matching your search</p>
                        <button @click="clearSearch"
                            class="px-6 py-2 bg-gradient-to-r from-[#f15a22] to-orange-500 text-white rounded-lg hover:shadow-lg hover:shadow-[#f15a22]/30 transition-all transform hover:translate-y-[-2px]">
                            Clear Search
                        </button>
                    </div>

                    <div v-else class="space-y-4">
                        <div v-for="(faq, idx) in filteredFaqs" :key="idx"
                            class="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl shadow-md border border-white/10 transition-all duration-300 overflow-hidden hover:shadow-lg hover:border-[#f15a22]/30"
                            v-motion-slide-visible-once-bottom :style="{ animationDelay: `${idx * 100}ms` }">
                            <button
                                class="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
                                @click="toggle(getFaqIndex(faq))">
                                <span class="flex-1 pr-4">
                                    <span v-if="searchQuery" v-html="highlightSearch(faq.question)"
                                        class="text-lg font-semibold"
                                        :class="faq.open ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#f15a22] to-[#f97949]' : 'text-[#e6eaf0]'"></span>
                                    <span v-else class="text-lg font-semibold"
                                        :class="faq.open ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#f15a22] to-[#f97949]' : 'text-[#e6eaf0]'">
                                        {{ faq.question }}
                                    </span>
                                </span>
                                <div class="flex items-center gap-3">
                                    <span class="hidden sm:block text-sm px-3 py-1 rounded-full"
                                        :class="faq.open ? 'bg-gradient-to-r from-[#f15a22]/20 to-orange-400/20 text-[#f15a22] shadow-sm' : 'bg-white/10 text-[#e6eaf0]/80'">
                                        {{ getCategoryFromQuestion(faq.question) }}
                                    </span>
                                    <span
                                        class="h-8 w-8 flex items-center justify-center rounded-full transition-all duration-300"
                                        :class="faq.open ? 'bg-gradient-to-r from-[#f15a22] to-orange-500 text-white shadow-md shadow-[#f15a22]/20' : 'bg-white/10 text-[#e6eaf0]'">
                                        <svg :class="['w-4 h-4 transition-transform duration-300', { 'rotate-180': faq.open }]"
                                            fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </div>
                            </button>
                            <transition name="accordion">
                                <div v-if="faq.open"
                                    class="px-6 pb-6 border-t border-white/10 pt-4 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm">
                                    <div v-if="searchQuery" v-html="highlightSearch(faq.answer)"
                                        class="prose text-[#e6eaf0]/90 leading-relaxed"></div>
                                    <div v-else v-html="faq.answer" class="prose text-[#e6eaf0]/90 leading-relaxed">
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
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
                    question: "1.1 What is the current state of trust law in Cambodia, and how has it evolved over time?",
                    answer: "Under the Trust Law enacted on January 2, 2019, a trust is a three-party legal relationship, in which the Trustor (or investor) transfers property or fund to a Trustee who shall hold, manage and protect it, apart from its own estate, for the trust’s beneficiary. The Trustee (or the Trust Company) is licensed by the NBFSA under the Ministry of Economy and Finance (MEF) and the Trust Regulator.Foreign investors can now make a profit from land appreciation without acquiring the land in their name, they can do so without relinquishing their nationality or applying for the Cambodian nationality.",
                    open: false
                },
                {
                    question: "1.2 What types of trusts are available in Cambodia?",
                    answer: "A Proprietary Protection Trust is a mechanism to protect property against risks. It's one of the trust types available in Cambodia, established to safeguard assets from creditors, legal judgments, or other claims. The trustee holds and manages the property for the benefit of the beneficiaries while keeping it separate from personal assets.",
                    open: false
                },
                {
                    question: "2.1 How is Phillip Trustee (Cambodia) related to Phillip Bank?",
                    answer: "Phillip Trustee is an associated company of Phillip Bank, 49% owned by the bank while the remaining 51% by the local nominee shareholders. Phillip Trustee and Phillip Bank are both esteemed affiliates of Phillip Capital Group, a Singaporean holding group which has near 50 years business success in the financial services industry and a global presence, with operations in 16 countries and over 1 million clients with Assets Under Management (AUM) of total more than USD 35 Billion.",
                    open: false
                },
                {
                    question: "2.2 Is it safe to engage Phillip Trustee (Cambodia)?",
                    answer: "Phillip Trustee is a registered trust company under the Cambodian Trust Regulator. We abide by strict trust regulations and are under the supervision of the governing Trust Regulator. Currently, we are the only trust company that is bank-related, and it does not have business affiliates in the real estate and construction sector. As a trust company, we provide trustee services and hold assets for clients. Although the assets are held under Phillip Trustee, the Trustor has full right to claim his/her ownership as per the registered trust deed.",
                    open: false
                },
                {
                    question: "2.3 As a Trustor, how can I ensure that the Trustee will only do as I wish?",
                    answer: "All parties are governed by the trust deed. The trust deed must be registered for legal validity of trust operation. Phillip Trustee is regulated by the Trust Regulator. Our (Trustee’s) role is to execute based on the trust deed. If the trustee breaches the trust deed, the Trustor can take legal action and/or can file a complaint with the Trust Regulator.",
                    open: false
                },
                {
                    question: "2.4 How are my asset/funds protected from fraudulent acts (eg: embezzlement of funds)?",
                    answer: "Our Trustee company has a robust set of internal controls in place to safeguard client assets. These controls include checks and balances, segregation of duties, and ongoing monitoring and supervisions of operations. Regular audits and reviews are conducted to assess the effectiveness of internal controls and identify any potential vulnerabilities. In the case of loss from fraud, clients can file a complaint with the Trust Regulator and the police department for case investigations. Our company will be liable for reimbursement from any loss occurring from fraud.",
                    open: false
                },
                {
                    question: "2.5 What if Phillip Trustee (Cambodia) go out of business or become insolvent?",
                    answer: "If our Trustee business becomes insolvent, the Trust Regulator will take over all asset under the trust deeds held in the name of the bankrupted Trustee and manage all operations/liquidation of the bankrupted Trustee. Since the Trustor is still the beneficial owner of the Trust, he/she may then appoint another Trustee to administer their trust.",
                    open: false
                },
                {
                    question: "2.6 As a Trustor, what happens to my trust and the property held under the trust upon my demise?",
                    answer: "During our consultation process, we will explicitly discuss all the details and specific arrangement to be administered upon the Trustor’s demise. This includes (a) whether the assets are to be sold and the proceeds are to be distributed to the beneficiaries, (b) the appointment of a successor Trustor upon the current Trustor’s demise, and other arrangements.During our onboarding process, we will similarly advise our clients to separate their assets under Trust and Will, to avoid the duplication of assets under these arrangements. The asset under trust arrangement in Cambodia will be managed, disposed and/or distributed to beneficiaries indicated in the trust deed.For Cambodians:Upon the unfortunate demise of the Trustor, the Trustee will continue executing the trust functions according to the trust deed. In the case that the trust has more than 1 single Trustor, the remaining Trustors can take control of the trust upon the passing of a Trustor. If you are the sole Trustor, the Trustee will hold and administer the trust until the end of the term and distribute the assets to the beneficiaries according to the trust deed.For Non-Cambodians:For foreign Trustors, the Trustee will similarly execute according to the trust deed upon the passing of the Trustor. However, if there are no successor Trustor(s) and no beneficiaries mentioned in the trust deed, and there are also no people with special connection (e.g. family ties) with the Trustor, the Trustee will hand over the assets within the Trust to the Cambodian government. Therefore, we advise our clients to indicate their beneficiaries during the formation of the Trust Deed, which the Trustee will then administer, dispose and distribute the assets in accordance with Trust Deed in their passing.To ensure protection of the Trustor’s succession interest, we strongly recommend that Non-Cambodian Trustor should also select a successor trustor from the outset so in the demise of the first Trustor, the successor trustor will then take over the Trust and its property.",
                    open: false
                },
                {
                    question: "2.7 Can my spouse take control of the trust and the property held under the trust upon my demise?",
                    answer: "If your spouse is listed as the trustor, they can take control of the trust upon your demise. In contrast, if your spouse is not listed as the trustor, then the trustee will hold and administer the trust until the end of the term and asset is distributed to the beneficiary.Firstly, the beneficiary will have to manage and cover all tax payable under the Cambodian taxation law. After all tax has been cleared, the Trustee will issue a letter of asset distribution and then a transfer of fund or asset will be made to the beneficiary’s designated bank.If it is an immovable property, we will distribute it based on the trustor’s instruction and the distribution will occur via the SPA. All tax payable to the General Department of tax (GDT) has to be cleared before we will issue the distribution letter for the trustor’s signing off.",
                    open: false
                },
                {
                    question: "2.8 What would happen in the case of compulsory purchase of land by the Cambodian government?",
                    answer: "Our legal due diligence process (conducted by third party professionals) will first establish if there are any encumbrances on the assets/ property and whether the land is owned by the government. We will only proceed with the purchase of land and setting up the Trust once we receive a positive legal due diligence report.Once the title deed of the property has been transferred under the Trustee and the Trust has been registered with the Trust Regulator, the Trustor will have full rights to the asset through the Trust. If the Cambodian government chooses to exercise its power of compulsory purchase, it typically follows a specific process that involves notifying the owner, conducting a valuation of the property, and offering compensation based on the fair market value.",
                    open: false
                },
                {
                    question: "3.1 Who is responsible to pay stamp duty on sale and purchase of property?",
                    answer: "The seller of the property is usually the responsible party, and we always ensure it is included within the Sale and Purchase Agreement (SPA).",
                    open: false
                },
                {
                    question: "3.2 What taxes do I or the Trust have to pay in Cambodia?",
                    answer: "• Duty Stamp Tax (4%): Required for any ownership transfer transactions.• Yearly Tax on Property (0.1 to 2%): Dependent on the type of land property.• Capital Gain Tax (20% - effective from Jan 2024): It is levied on the capital gain which is the difference between the proceeds from sale/transfer of assets (i.e., immovable property) and original purchase price, less permitted deductible expenses.- Upon the sale & purchase of the land, the Trust would have to pay a 20% capital gain tax under the law of Cambodia. Phillip Trustee will administer the tax payments on behalf of the Trustor and Trust.- For the payment of any fees and taxes, a Trust bank account would be established at Phillip Bank as per the mutual agreement between the Trustor and Phillip Trustee. In the case that Phillip Trustee makes the payment first, we will recover the full amount back from the Trust account.",
                    open: false
                },
                {
                    question: "4.1 If I choose to engage Phillip Trustee Cambodia, do I need to open a personal bank account with Phillip Bank?",
                    answer: "For both Non-Cambodian and Cambodian Trustors, we strongly recommend you open a personal bank account with Phillip Bank for your ease of transactions and trust administration. By having a personal bank account with Phillip Bank, this will give you greater ease and convenience and you can avoid interbank transaction fees.",
                    open: false
                },
                {
                    question: "4.2 What are the bank account opening fees?",
                    answer: "There are no fees for opening an account. However, there could be remittance fees incurred for sending money to fund the Phillip Bank account depending on the bank you are remitting from.",
                    open: false
                },
                {
                    question: "4.3 Does Phillip Bank an ATM and/or internet banking services?",
                    answer: "Your personal Phillip Bank ATM card will be issued upon the opening of a savings account. The interest rate for savings account is between 2-3% per annum if they maintain balance between USD 500 to USD 100,000.Phillip Bank has both internet and mobile banking services available.",
                    open: false
                },
                {
                    question: "4.4 Does Phillip Bank charge fees for local wire transfer within Cambodia and international transfers?",
                    answer: "For local wire transfers, there may be certain transaction fees of USD 0.50 to 1 per transaction (subject to changes).For international transfers (between Phnom Penh and Singapore), USD 9 is charged per transaction for a maximum of USD 10,000 per transaction per day (subject to changes).",
                    open: false
                },
                {
                    question: "4.5 What are the loan financing interest rate for individuals?",
                    answer: "This is based on market rate. Also note that financing arrangement will be assessed on case by case basis.",
                    open: false
                },
                {
                    question: "4.6 If an investor chooses to purchase commercial properties via a Singapore registered company, is it possible to obtain financing from Phillip Bank?",
                    answer: "Phillip Bank is precluded from offshore financing, and we are not allowed to lend to foreigners for foreign projects. However, in the case of foreign borrowing to fund local projects, we require approval from the local authorities.We would not recommend such arrangements for clients as the loan rates are higher in Cambodia than Singapore. Furthermore, documentation from overseas can be cumbersome and credit processing across border can be challenging.",
                    open: false
                },

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
            if (question.startsWith('1.')) return 'Trust Basics';
            if (question.startsWith('2.')) return 'Safety & Security';
            if (question.startsWith('3.')) return 'Taxes & Fees';
            if (question.startsWith('4.')) return 'Banking Services';
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
    background-color: rgba(255, 255, 255, 0.1);
    color: #e6eaf0;
    transition: all 0.3s ease;
    white-space: nowrap;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
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
</style>
