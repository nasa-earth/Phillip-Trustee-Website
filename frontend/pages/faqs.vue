<template>
    <div class="min-h-screen bg-[#13325e]">
        <!-- Hero Section -->
        <section
            class="relative bg-gradient-to-br from-[#13325e] via-[#1d4170] to-[#13325e] py-20 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
            <h1 class="text-5xl md:text-6xl font-bold text-white mb-4 animate-fadein">Frequently Asked Questions</h1>
            <p class="text-xl md:text-2xl text-[#e6eaf0] max-w-2xl mb-8 animate-fadein delay-200">
                Find answers to the most common questions about our trust services, process, and support.
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

        <!-- Main Question Highlight -->
        <section class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto -mt-24 mb-12 relative z-10">
                <div
                    class="bg-white rounded-2xl shadow-2xl border-t-8 border-[#f15a22] p-8 animate-card flex flex-col items-center text-center">
                    <div class="flex items-center justify-center mb-4">
                        <span
                            class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#f15a22]/10 mr-3">
                            <svg class="w-8 h-8 text-[#f15a22]" fill="none" stroke="currentColor" stroke-width="2"
                                viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01" />
                            </svg>
                        </span>
                        <h2 class="text-2xl md:text-3xl font-bold text-[#13325e]">{{ faqs[0].question }}</h2>
                    </div>
                    <div class="text-[#13325e]/80 text-lg leading-relaxed" v-html="faqs[0].answer"></div>
                </div>
            </div>
        </section>

        <!-- FAQ Accordion Section -->
        <section class="container mx-auto py-8 px-4">
            <h2 class="text-3xl md:text-4xl font-bold text-[#e6eaf0] mb-10 text-center animate-fadein">More Questions
            </h2>
            <div class="max-w-2xl mx-auto space-y-6">
                <div v-for="(faq, idx) in faqs.slice(1)" :key="idx"
                    class="bg-white rounded-xl shadow-md border border-[#e6eaf0] transition-all duration-300 overflow-hidden animate-card">
                    <button
                        class="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none group"
                        @click="toggle(idx + 1)">
                        <span class="flex items-center">
                            <span
                                class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#f15a22]/10 mr-3">
                                <svg class="w-5 h-5 text-[#f15a22]" fill="none" stroke="currentColor" stroke-width="2"
                                    viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01" />
                                </svg>
                            </span>
                            <span
                                class="text-lg font-semibold text-[#13325e] group-hover:text-[#f15a22] transition-colors duration-300">
                                {{ faq.question }}
                            </span>
                        </span>
                        <svg :class="['w-6 h-6 transition-transform duration-300', { 'rotate-180': faq.open }]"
                            fill="none" stroke="#f15a22" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <transition name="fade">
                        <div v-if="faq.open" class="px-6 pb-6 text-[#13325e]/80 text-base leading-relaxed">
                            <div v-html="faq.answer"></div>
                        </div>
                    </transition>
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
                    question: 'How does a Trust work? (1.1 What is the current state of trust law in Cambodia, and how has it evolved over time?)',
                    answer: `Under the Trust Law enacted on January 2, 2019, a trust is a three-party legal relationship, in which the
Trustor (or investor) transfers property or fund to a Trustee who shall hold, manage and protect it,
apart from its own estate, for the trust’s beneficiary. The Trustee (or the Trust Company) is licensed
by the NBFSA under the Ministry of Economy and Finance (MEF) and the Trust Regulator. Foreign investors
can now make a profit from land appreciation without acquiring the land in their name, they can do so
without relinquishing their nationality or applying for the Cambodian nationality.`,
                    open: false
                },
                {
                    question: 'Why should you use Phillip Trustee (Cambodia) Trustee Services? (1.2)',
                    answer: `Phillip Trustee (Cambodia) is an esteemed affiliate of Phillip Bank, which boasts a remarkable track
record of over 10 years of successful business operations in Cambodia. With a wide network of more than
70 branches nationwide, our strong presence enables us to offer comprehensive services. Our experienced
team of trust experts, strategically located in Cambodia and Singapore, can leverage upon our
well-established banking network and resources to provide you with the best-in-class, personalized trust
advisory services to help you achieve your financial goals. Moreover, as part of the established Phillip
Capital Group, headquartered in Singapore, we have access to extensive global connections that we can
leverage upon to provide you unrivaled trust advisory services.`,
                    open: false
                },
                {
                    question: 'How is Phillip Trustee (Cambodia) related to Phillip Bank? (2.1)',
                    answer: `Phillip Trustee is an associated company of Phillip Bank, 49% owned by the bank while the remaining 51%
by the local nominee shareholders. Phillip Trustee and Phillip Bank are both esteemed affiliates of
Phillip Capital Group, a Singaporean holding group which has near 50 years business success in the
financial services industry and a global presence, with operations in 16 countries and over 1 million
clients with Assets Under Management (AUM) of total more than USD 35 Billion. Whilst Phillip Trustee
(Cambodia) is a new establishment like other trust companies in Cambodia, we can leverage upon our
connections with trust experts based in Singapore.`,
                    open: false
                },
                {
                    question: 'Is it safe to engage Phillip Trustee (Cambodia)? (2.2)',
                    answer: `Phillip Trustee is a registered trust company under the Cambodian Trust Regulator. We abide by strict
trust regulations and are under the supervision of the governing Trust Regulator. Currently, we are the
only trust company that is bank-related, and it does not have business affiliates in the real estate and
construction sector. As a trust company, we provide trustee services and hold assets for clients.
Although the assets are held under Phillip Trustee, the Trustor has full right to claim his/her
ownership as per the registered trust deed.`,
                    open: false
                },
                {
                    question: 'As a Trustor, how can I ensure that the Trustee will only do as I wish? (2.3)',
                    answer: `All parties are governed by the trust deed. The trust deed must be registered for legal validity of trust
operation. Phillip Trustee is regulated by the Trust Regulator. Our (Trustee’s) role is to execute based
on the trust deed. If the trustee breaches the trust deed, the Trustor can take legal action and/or can
file a complaint with the Trust Regulator.`,
                    open: false
                },
                {
                    question: 'How are my asset/funds protected from fraudulent acts (eg: embezzlement of funds)? (2.4)',
                    answer: `Our Trustee company has a robust set of internal controls in place to safeguard client assets. These
controls include checks and balances, segregation of duties, and ongoing monitoring and supervisions of
operations. Regular audits and reviews are conducted to assess the effectiveness of internal controls
and identify any potential vulnerabilities. In the case of loss from fraud, clients can file a complaint
with the Trust Regulator and the police department for case investigations. Our company will be liable
for reimbursement from any loss occurring from fraud.`,
                    open: false
                },
                {
                    question: 'What if Phillip Trustee (Cambodia) go out of business or become insolvent? (2.5)',
                    answer: `If our Trustee business becomes insolvent, the Trust Regulator will take over all asset under the trust
deeds held in the name of the bankrupted Trustee and manage all operations/liquidation of the bankrupted
Trustee. Since the Trustor is still the beneficial owner of the Trust, he/she may then appoint another
Trustee to administer their trust.`,
                    open: false
                },
                {
                    question: 'As a Trustor, what happens to my trust and the property held under the trust upon my demise? (2.6)',
                    answer: `During our consultation process, we will explicitly discuss all the details and specific arrangement to
be administered upon the Trustor’s demise. This includes (a) whether the assets are to be sold and the
proceeds are to be distributed to the beneficiaries, (b) the appointment of a successor Trustor upon the
current Trustor’s demise, and other arrangements.


During our onboarding process, we will similarly advise our clients to separate their assets under Trust
and Will, to avoid the duplication of assets under these arrangements. The asset under trust arrangement
in Cambodia will be managed, disposed and/or distributed to beneficiaries indicated in the trust deed.


For Cambodians:
Upon the unfortunate demise of the Trustor, the Trustee will continue executing the trust functions
according to the trust deed. In the case that the trust has more than 1 single Trustor, the remaining
Trustors can take control of the trust upon the passing of a Trustor. If you are the sole Trustor, the
Trustee will hold and administer the trust until the end of the term and distribute the assets to the
beneficiaries according to the trust deed.


For Non-Cambodians:
For foreign Trustors, the Trustee will similarly execute according to the trust deed upon the passing of
the Trustor. However, if there are no successor Trustor(s) and no beneficiaries mentioned in the trust
deed, and there are also no people with special connection (e.g. family ties) with the Trustor, the
Trustee will hand over the assets within the Trust to the Cambodian government. Therefore, we advise our
clients to indicate their beneficiaries during the formation of the Trust Deed, which the Trustee will
then administer, dispose and distribute the assets in accordance with Trust Deed in their passing.


To ensure protection of the Trustor’s succession interest, we strongly recommend that Non-Cambodian
Trustor should also select a successor trustor from the outset so in the demise of the first Trustor,
the successor trustor will then take over the Trust and its property.`,
                    open: false
                },
                {
                    question: 'Can my spouse take control of the trust and the property held under the trust upon my demise? (2.7)',
                    answer: `If your spouse is listed as the trustor, they can take control of the trust upon your demise. In
contrast, if your spouse is not listed as the trustor, then the trustee will hold and administer the
trust until the end of the term and asset is distributed to the beneficiary.


Firstly, the beneficiary will have to manage and cover all tax payable under the Cambodian taxation law.
After all tax has been cleared, the Trustee will issue a letter of asset distribution and then a
transfer of fund or asset will be made to the beneficiary’s designated bank.


If it is an immovable property, we will distribute it based on the trustor’s instruction and the
distribution will occur via the SPA. All tax payable to the General Department of tax (GDT) has to be
cleared before we will issue the distribution letter for the trustor’s signing off.`,
                    open: false
                },
                {
                    question: 'What would happen in the case of compulsory purchase of land by the Cambodian government? (2.8)',
                    answer: `Our legal due diligence process (conducted by third party professionals) will first establish if there
are any encumbrances on the assets/ property and whether the land is owned by the government. We will
only proceed with the purchase of land and setting up the Trust once we receive a positive legal due
diligence report.


Once the title deed of the property has been transferred under the Trustee and the Trust has been
registered with the Trust Regulator, the Trustor will have full rights to the asset through the Trust.
If the Cambodian government chooses to exercise its power of compulsory purchase, it typically follows a
specific process that involves notifying the owner, conducting a valuation of the property, and offering
compensation based on the fair market value.`,
                    open: false
                },
                {
                    question: 'Who is responsible to pay stamp duty on sale and purchase of property? (3.1)',
                    answer: `The seller of the property is usually the responsible party, and we always ensure it is included within
the Sale and Purchase Agreement (SPA).`,
                    open: false
                },
                {
                    question: 'What taxes do I or the Trust have to pay in Cambodia? (3.2)',
                    answer: `• Duty Stamp Tax (4%): Required for any ownership transfer transactions.

• Yearly Tax on Property (0.1 to 2%): Dependent on the type of land property.

• Capital Gain Tax (20% - effective from Jan 2024): It is levied on the capital gain which is the
difference between the proceeds from sale/transfer of assets (i.e., immovable property) and original
purchase price, less permitted deductible expenses.


- Upon the sale & purchase of the land, the Trust would have to pay a 20% capital gain tax under the law
of Cambodia. Phillip Trustee will administer the tax payments on behalf of the Trustor and Trust.


- For the payment of any fees and taxes, a Trust bank account would be established at Phillip Bank as
per the mutual agreement between the Trustor and Phillip Trustee. In the case that Phillip Trustee makes
the payment first, we will recover the full amount back from the Trust account.`,
                    open: false
                },
                {
                    question: 'If I choose to engage Phillip Trustee Cambodia, do I need to open a personal bank account with Phillip Bank? (4.1)',
                    answer: `For both Non-Cambodian and Cambodian Trustors, we strongly recommend you open a personal bank account
with Phillip Bank for your ease of transactions and trust administration. By having a personal bank
account with Phillip Bank, this will give you greater ease and convenience and you can avoid interbank
transaction fees.`,
                    open: false
                },
                {
                    question: 'What are the bank account opening fees? (4.2)',
                    answer: `There are no fees for opening an account. However, there could be remittance fees incurred for sending
money to fund the Phillip Bank account depending on the bank you are remitting from.`,
                    open: false
                },
                {
                    question: 'Does Phillip Bank an ATM and/or internet banking services? (4.3)',
                    answer: `Your personal Phillip Bank ATM card will be issued upon the opening of a savings account. The interest
rate for savings account is between 2-3% per annum if they maintain balance between USD 500 to USD
100,000.


Phillip Bank has both internet and mobile banking services available.`,
                    open: false
                },
                {
                    question: 'Does Phillip Bank charge fees for local wire transfer within Cambodia and international transfers? (4.4)',
                    answer: `For local wire transfers, there may be certain transaction fees of USD 0.50 to 1 per transaction (subject
to changes).


For international transfers (between Phnom Penh and Singapore), USD 9 is charged per transaction for a
maximum of USD 10,000 per transaction per day (subject to changes).`,
                    open: false
                },
                {
                    question: 'What are the loan financing interest rate for individuals? (4.5)',
                    answer: `This is based on market rate. Also note that financing arrangement will be assessed on case by case
basis.`,
                    open: false
                },
                {
                    question: 'If an investor chooses to purchase commercial properties via a Singapore registered company, is it possible to obtain financing from Phillip Bank? (4.6)',
                    answer: `Phillip Bank is precluded from offshore financing, and we are not allowed to lend to foreigners for
foreign projects. However, in the case of foreign borrowing to fund local projects, we require approval
from the local authorities.


We would not recommend such arrangements for clients as the loan rates are higher in Cambodia than
Singapore. Furthermore, documentation from overseas can be cumbersome and credit processing across
border can be challenging.`,
                    open: false
                },
            ]
        }
    },
    methods: {
        toggle(idx) {
            this.faqs[idx].open = !this.faqs[idx].open;
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
