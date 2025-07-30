<template>
    <!-- Hero Section -->
    <section
        class="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-screen w-full flex items-center justify-center bg-cover bg-center"
        :style="{
            backgroundImage: 'url(/images/Services/service_header.jpg)',
        }">
        <!-- Overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-[#001a4d]/50 via-[#0e2a52]/20 to-[#001a4d]/10 z-0"></div>
    </section>

    <!-- head title -->
    <section class="bg-[#003366] text-white pt-12 sm:pt-16 px-4 sm:px-6">
        <div class="max-w-7xl mx-auto lg:mx-[350px] px-4 sm:px-6 py-12 sm:py-16 text-center bg-[#003366]">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-white">
                Escrow Service
            </h2>
            <p class="text-base sm:text-lg md:text-xl text-white mb-3 text-center">
                We serve as an intermediary between you and the relevant stakeholders for your real estate transactions
                in Cambodia.
            </p>
            <br>
            <p class="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 text-center">
                Our role is to facilitate payments and hold funds with Phillip Bank, Plc until contractual requirements
                are fulfilled, safeguarding and managing funds for foreign buyers and sellers in accordance with Sales
                and Purchase Agreements (SPA).
            </p>

        </div>
    </section>


    <!-- operational procedures  -->
    <section class=" text-white py-12 sm:py-16 px-4 sm:px-6 bg-[#003366]">
        <div class="max-w-7xl mx-auto text-center">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12">Operational Procedures</h2>

            <div class="relative mx-auto w-full max-w-4xl h-[400px] sm:h-[500px]">
                <!-- Circular Path & Arrows -->
                <svg viewBox="0 0 400 400" class="absolute w-full h-full">
                    <!-- Circle Path -->
                    <circle cx="200" cy="200" r="150" fill="none" stroke="#f15a22" stroke-width="4" />
                    <!-- Arrows along circle -->
                    <path d="M200,50 L200,20 M200,350 L200,380" stroke="#f15a22" stroke-width="4"
                        marker-end="url(#arrow)" />
                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                            <polygon points="0,0 10,5 0,10" fill="#f15a22" />
                        </marker>
                    </defs>
                </svg>

                <!-- Trustor -->
                <div class="absolute top-[40px] sm:top-[50px] left-1/2 transform -translate-x-1/2 text-center">
                    <div class="bg-[#f15a22] px-2 sm:px-4 py-1 sm:py-2 rounded-md font-semibold text-sm sm:text-base">
                        Trustor</div>
                    <p class="mt-2 w-40 sm:w-52 mx-auto text-xs sm:text-sm">
                        1. Payment for purchase according to SPA Phillip Bank Escrow Account.
                    </p>
                </div>

                <!-- Escrow -->
                <div class="absolute right-0 top-1/2 transform -translate-y-1/2 text-center">
                    <div class="bg-[#f15a22] px-2 sm:px-4 py-1 sm:py-2 rounded-md font-semibold text-xs sm:text-base">
                        Phillip Bank Escrow Account</div>
                    <p class="mt-2 w-48 sm:w-60 mx-auto text-xs sm:text-sm">
                        2. Escrow agreement is formulated, Trust fund is established and Trust regulator is notified.
                    </p>
                </div>

                <!-- Seller -->
                <div class="absolute bottom-[20px] left-1/2 transform -translate-x-1/2 text-center">
                    <div class="bg-[#f15a22] px-2 sm:px-4 py-1 sm:py-2 rounded-md font-semibold text-sm sm:text-base">
                        Seller</div>
                    <p class="mt-2 w-40 sm:w-52 text-xs sm:text-sm">
                        3. Once all the conditions are met, payment is released to seller.
                    </p>
                </div>

                <!-- Final Step -->
                <div class="absolute left-0 top-1/2 transform -translate-y-1/2 text-center">
                    <p class="w-40 sm:w-52 mx-auto text-xs sm:text-sm">
                        4. Property title is registered under trustee.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section class=" text-white py-12 sm:py-16 px-4 sm:px-6 bg-[#0e2a52]">
        <!-- Collateral Process -->
        <section class=" py-12 sm:py-16 px-4 sm:px-6">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-4">Requirements</h2>
                <p class="text-lg sm:text-xl text-white text-center mb-8 sm:mb-12">
                    This collateral process involves:
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
                    <div v-for="(step, index) in steps" :key="index" class="relative ml-6 sm:ml-8">
                        <div class="bg-orange-500 rounded-2xl shadow-lg h-28 sm:h-32 p-3 sm:p-4 relative">
                            <div
                                class="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 bg-orange-500 text-white text-xl sm:text-3xl font-bold w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg border-2 sm:border-4 border-white z-10">
                                {{ index + 1 }}
                            </div>
                            <div
                                class="bg-white rounded-xl p-3 sm:p-4 h-16 sm:h-20 ml-6 sm:ml-8 flex items-center justify-center shadow-md">
                                <div class="text-orange-500 font-semibold text-center text-sm sm:text-base">
                                    {{ step }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Trust Registration Requirements (Images) -->
        <div class="max-w-6xl mx-auto text-center mt-8 sm:mt-12 md:mt-16 px-4 sm:px-6">
            <p class="text-base sm:text-lg font-semibold text-center mb-6 sm:mb-8 md:mb-10">
                To register your trust with Phillip Trustee, you will need:
            </p>
            <div
                class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-10 text-center max-w-4xl mx-auto">
                <div v-for="(item, index) in trustRequirements" :key="index"
                    class="flex flex-col items-center space-y-2 sm:space-y-4">
                    <img :src="item.img" :alt="item.text"
                        class="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain" />
                    <p class="text-sm sm:text-base md:text-lg">{{ item.text }}</p>
                </div>
            </div>
        </div>

    </section>

    <!-- fees for trust registration with trust regulator -->
    <section class="bg-[#003366] text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center">
                Fees for Trust Registration with Trust Regulator
            </h2>
            <h2 class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-2">
                Trust Registration Fee (Update on 11-01-2022)
            </h2>

            <!-- Table -->
            <div class="overflow-x-auto mt-6 sm:mt-8 md:mt-10 px-2 sm:px-4 md:px-8 lg:px-[100px]">
                <table class="min-w-full border-collapse rounded-xl overflow-hidden">
                    <thead class="bg-[#002855] text-white">
                        <tr>
                            <th class="p-2 sm:p-3 md:p-4 text-left text-xs sm:text-sm md:text-base">Trust Value</th>
                            <th colspan="2"
                                class="p-2 sm:p-3 md:p-4 text-center border-l border-white text-xs sm:text-sm md:text-base">
                                Commercial Trust<br />(In USD)
                            </th>
                            <th colspan="2"
                                class="p-2 sm:p-3 md:p-4 text-center border-l border-white text-xs sm:text-sm md:text-base">
                                Individual Trust<br />(In USD)
                            </th>
                        </tr>
                        <tr class="bg-[#002855]">
                            <th class="p-2 sm:p-3 md:p-4"></th>
                            <th
                                class="p-2 sm:p-3 md:p-4 text-center border-l border-white text-xs sm:text-sm md:text-base">
                                Administration Fee</th>
                            <th
                                class="p-2 sm:p-3 md:p-4 text-center border-l border-white text-xs sm:text-sm md:text-base">
                                Yearly Fee on Certificate</th>
                            <th
                                class="p-2 sm:p-3 md:p-4 text-center border-l border-white text-xs sm:text-sm md:text-base">
                                Administration Fee</th>
                            <th
                                class="p-2 sm:p-3 md:p-4 text-center border-l border-white text-xs sm:text-sm md:text-base">
                                Yearly Fee on Certificate</th>
                        </tr>
                    </thead>
                    <tbody class="bg-[#003366]">
                        <tr v-for="(item, index) in feeData" :key="index" class="border-t border-white">
                            <td class="p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base">{{ item.trustValue }}</td>
                            <td class="p-2 sm:p-3 md:p-4 text-center text-xs sm:text-sm md:text-base">{{
                                item.commercialAdmin }}</td>
                            <td class="p-2 sm:p-3 md:p-4 text-center text-xs sm:text-sm md:text-base">{{
                                item.commercialYearly }}</td>
                            <td class="p-2 sm:p-3 md:p-4 text-center text-xs sm:text-sm md:text-base">{{
                                item.individualAdmin }}</td>
                            <td class="p-2 sm:p-3 md:p-4 text-center text-xs sm:text-sm md:text-base">{{
                                item.individualYearly }}</td>
                        </tr>
                    </tbody>
                </table>
                <h2
                    class="text-lg sm:text-xl md:text-2xl font-bold text-center mb-6 sm:mb-8 md:mb-10 mt-8 sm:mt-12 md:mt-16">
                    Trust Registration Fee (Update on 11-01-2022)
                </h2>
                <table class="min-w-full border-collapse rounded-xl overflow-hidden">
                    <thead class="bg-[#002855] text-white">
                        <tr>
                            <th class="p-2 sm:p-3 md:p-4 text-left text-xs sm:text-sm md:text-base">Trust Value for
                                Public or Social Trust </th>
                            <th
                                class="p-2 sm:p-3 md:p-4 text-center border-l border-white text-xs sm:text-sm md:text-base">
                                Administration Fee</th>
                            <th
                                class="p-2 sm:p-3 md:p-4 text-center border-l border-white text-xs sm:text-sm md:text-base">
                                Yearly Fee on Certificate</th>
                        </tr>
                    </thead>
                    <tbody class="bg-[#003366]">
                        <tr v-for="(item, index) in publicTrustFeeData" :key="index" class="border-t border-white">
                            <td class="p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base">{{ item.trustValue }}</td>
                            <td class="p-2 sm:p-3 md:p-4 text-center text-xs sm:text-sm md:text-base">{{ item.adminFee
                                }}</td>
                            <td class="p-2 sm:p-3 md:p-4 text-center text-xs sm:text-sm md:text-base">{{ item.yearlyFee
                                }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <!-- link to another services page  -->
    <section class="bg-[#003366] text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div class="max-w-7xl mx-auto text-center">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Explore Our Other Services
            </h2>
            <p class="text-base sm:text-lg text-white/80 mb-8 sm:mb-12">
                Discover more ways Phillip Trustee can assist you with your financial needs
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <!-- Hold Trust Property -->
                <div
                    class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#13325e]/80">
                    <div class="h-40 sm:h-48 overflow-hidden">
                        <img src="/images/Services/key_service_img_01.jpg" alt="Hold Trust Property"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div class="p-4 sm:p-6 bg-[#0e2a52]">
                        <h3 class="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Hold Trust Property</h3>
                        <p class="text-sm sm:text-base text-white/70 mb-4 sm:mb-6">
                            Secure fund management and retention services for your investment needs.
                        </p>
                        <NuxtLink to="/Services_hold_property"
                            class="inline-block bg-[#f15a22] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-[#d14615] transition-colors duration-300 font-semibold text-sm sm:text-base">
                            Learn More
                        </NuxtLink>
                    </div>
                </div>

                <!-- Hold Personal Trust -->
                <div
                    class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#13325e]/80">
                    <div class="h-40 sm:h-48 overflow-hidden">
                        <img src="/images/Services/key_service_img_02.jpg" alt="Hold Personal Trust"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div class="p-4 sm:p-6 bg-[#0e2a52]">
                        <h3 class="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Hold Personal Trust</h3>
                        <p class="text-sm sm:text-base text-white/70 mb-4 sm:mb-6">
                            Professional property holding and management services for your real estate investments.
                        </p>
                        <NuxtLink to="/Services_fund_retention"
                            class="inline-block bg-[#f15a22] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-[#d14615] transition-colors duration-300 font-semibold text-sm sm:text-base">
                            Learn More
                        </NuxtLink>
                    </div>
                </div>

                <!-- SPA Service -->
                <div
                    class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#13325e]/80">
                    <div class="h-40 sm:h-48 overflow-hidden">
                        <img src="/images/Services/key_service_img_04.jpg" alt="SPA Service"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div class="p-4 sm:p-6 bg-[#0e2a52]">
                        <h3 class="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Sales & Purchase Agreement
                            (SPA)</h3>
                        <p class="text-sm sm:text-base text-white/70 mb-4 sm:mb-6">
                            Sales and Purchase Agreement services to facilitate secure property transactions.
                        </p>
                        <NuxtLink to="/Services_spa"
                            class="inline-block bg-[#f15a22] text-white px-6 py-3 rounded-md hover:bg-[#d14615] transition-colors duration-300 font-semibold">
                            Learn More
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>
<script>
export default {
    data() {
        return {
            steps: [
                'Application',
                'Transfer/Registration of Titles with Cadastral Office',
                'Duty Stamp Tax',
                'Confirmation with Trustor',
                'Completion of Process with Cadastral Office'
            ],
            trustRequirements: [
                { img: '/images/Services/application-form.png', text: 'A complete application form' },
                { img: '/images/Services/supporting-docs.png', text: 'Relevant supporting documentation' },
                { img: '/images/Services/trust-deed.png', text: 'A trust deed' },
                { img: '/images/Services/bank-account.png', text: 'A Phillip Bank savings account' }
            ], feeData: [
                {
                    trustValue: '< 100,000',
                    commercialAdmin: '10',
                    commercialYearly: '75',
                    individualAdmin: '10',
                    individualYearly: '50',
                },
                {
                    trustValue: '100,000 - 500,000',
                    commercialAdmin: '50',
                    commercialYearly: '127',
                    individualAdmin: '30',
                    individualYearly: '75',
                },
                {
                    trustValue: '> 500,000 - 1,000,000',
                    commercialAdmin: '100',
                    commercialYearly: '150',
                    individualAdmin: '50',
                    individualYearly: '100',
                },
                {
                    trustValue: '> 1,000,000 - 5,000,000',
                    commercialAdmin: '200',
                    commercialYearly: '200',
                    individualAdmin: '100',
                    individualYearly: '150',
                },
                {
                    trustValue: '> 5,000,000 - 10,000,000',
                    commercialAdmin: '500',
                    commercialYearly: '400',
                    individualAdmin: '250',
                    individualYearly: '300',
                },
                {
                    trustValue: '> 10,000,000 - 20,000,000',
                    commercialAdmin: '1,000',
                    commercialYearly: '600',
                    individualAdmin: '450',
                    individualYearly: '400',
                },
                {
                    trustValue: 'More than 20,000,000',
                    commercialAdmin: '2,000',
                    commercialYearly: '750',
                    individualAdmin: '500',
                    individualYearly: '500',
                }
            ],
            publicTrustFeeData: [
                {
                    trustValue: '< 100,000',
                    adminFee: '10',
                    yearlyFee: '30',
                },
                {
                    trustValue: '100,000 - 500,000',
                    adminFee: '30',
                    yearlyFee: '75',
                },
                {
                    trustValue: '> 500,000 - 1,000,000',
                    adminFee: '50',
                    yearlyFee: '100',
                },
                {
                    trustValue: '> 1,000,000 - 5,000,000',
                    adminFee: '150',
                    yearlyFee: '150',
                },
                {
                    trustValue: '> 5,000,000 - 10,000,000',
                    adminFee: '250',
                    yearlyFee: '250',
                },
                {
                    trustValue: '> 10,000,000 - 20,000,000',
                    adminFee: '375',
                    yearlyFee: '500',
                },
                {
                    trustValue: 'More than 20,000,000',
                    adminFee: '500',
                    yearlyFee: '750',
                }
            ]
        }
    }
}
</script>