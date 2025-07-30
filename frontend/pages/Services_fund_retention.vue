<template>
    <!-- Hero Section -->
    <section
        class="relative h-64 sm:h-80 md:h-96 lg:h-screen w-full flex items-center justify-center bg-cover bg-center"
        :style="{
            backgroundImage: 'url(/images/Services/service_header.jpg)',
        }">
        <!-- Overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-[#001a4d]/50 via-[#0e2a52]/20 to-[#001a4d]/10 z-0"></div>
    </section>

    <!-- Section Title -->
    <section class="bg-[#0c2c59] text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 text-center">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 text-center text-white">
                Fund Retention Services
            </h2>
            <p class="text-base sm:text-lg md:text-xl text-white mb-4 sm:mb-6 md:mb-8 text-center">
                We serve as enforcers of your Trust Deeps or Will.
            </p>
            <p class="text-base sm:text-lg md:text-xl text-white mb-4 sm:mb-6 md:mb-8 text-center">
                Our role is to hold and apply trust assets on behalf of your beneficiaries, ensuring that this is done
                according to your wishes.
            </p>
        </div>
    </section>


    <!-- Fund Retention Table Section -->
    <section class="bg-[#003366] text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6">

        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8">
                Service Fee for Trust Fund Retention
            </h2>


            <!-- Table -->
            <div class="overflow-x-auto px-2 sm:px-4 md:px-8 lg:px-[150px]">
                <table class="min-w-full border-collapse rounded-xl overflow-hidden">
                    <thead class="bg-[#002855] text-white">
                        <tr>
                            <th class="p-2 sm:p-3 md:p-4 text-left text-xs sm:text-sm md:text-base">Fund Amount (USD)
                            </th>
                            <th
                                class="p-2 sm:p-3 md:p-4 text-center border-l border-white text-xs sm:text-sm md:text-base">
                                1 Year Quote</th>
                            <th
                                class="p-2 sm:p-3 md:p-4 text-center border-l border-white text-xs sm:text-sm md:text-base">
                                3 Year Quote</th>
                            <th
                                class="p-2 sm:p-3 md:p-4 text-center border-l border-white text-xs sm:text-sm md:text-base">
                                5 Year Quote</th>
                        </tr>
                    </thead>
                    <tbody class="bg-[#003366]">
                        <tr v-for="(item, index) in fundRetentionRates" :key="index" class="border-t border-white">
                            <td class="p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base">{{ item.amount }}</td>
                            <td class="p-2 sm:p-3 md:p-4 text-center text-xs sm:text-sm md:text-base">{{ item.oneYear }}
                            </td>
                            <td class="p-2 sm:p-3 md:p-4 text-center text-xs sm:text-sm md:text-base">{{ item.threeYear
                                }}</td>
                            <td class="p-2 sm:p-3 md:p-4 text-center text-xs sm:text-sm md:text-base">{{ item.fiveYear
                                }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <div class="mt-6 sm:mt-8">
                <p class="text-gray-300 mt-4 sm:mt-6 text-center font-bold text-sm sm:text-base">
                    Important Note:

                </p>

                <ul
                    class="list-disc list-inside text-white space-y-2 mt-4 max-w-2xl mx-auto px-4 sm:px-6 text-sm sm:text-base">
                    <li>customer is required to
                        transfer the fund to the trust
                        fund under Phillip Trustee’s
                        company bank account,
                        Phillip Bank.
                    </li>
                    <li>
                        The land title under the trustee
                        company name should be
                        transferred on the date stated
                        on the agreement.
                    </li>
                </ul>

            </div>

        </div>
    </section>
    <section class="bg-[#0c2c59] text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12">
                Fund Management Process
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4">
                <!-- Step 1 -->
                <div>
                    <div class="bg-orange-500 p-6 sm:p-8 md:p-12 rounded-xl shadow-md space-y-3">
                        <h3 class="font-bold text-base sm:text-lg text-center">Trusteeship Consulting</h3>
                        <!-- <p class="text-xs text-center">(between trustor and land-holding company)</p> -->

                    </div>
                    <p class="mt-4 sm:mt-6 font-bold text-sm sm:text-base">Our trustee advisor will provide:</p>
                    <ul class="list-disc list-inside text-white space-y-2 mt-4 text-sm sm:text-base">
                        <li>

                            A company brochure.

                        </li>
                        <li>
                            Information on service
                            procedures.

                        </li>
                        <li>
                            Fee quotation
                        </li>
                    </ul>
                </div>

                <!-- Step 2 -->
                <div>
                    <div class="bg-orange-500 p-6 sm:p-8 rounded-xl shadow-md space-y-3">
                        <h3 class="font-bold text-base sm:text-lg text-center">Pre-trusteeship Service</h3>
                        <p class="text-xs text-center">(5 Working Days)</p>
                    </div>
                    <p class="mt-4 sm:mt-6 font-bold text-sm sm:text-base">Our pre-trustee service requires: </p>
                    <ul class="list-disc list-inside text-white space-y-2 mt-4 text-sm sm:text-base">
                        <li>

                            A sign-off on the application
                            form.
                        </li>
                        <li>
                            ID or passport of individual
                            trustors.
                        </li>
                        <li>
                            A negative report stops the
                            process, while a positive
                            report brings us to the next
                            step.


                        </li>
                        <li>
                            The company’s
                            board/shareholder resolution,
                            M&amp;A, patents, certificate of
                            incorporation and company
                            extract.
                        </li>
                    </ul>

                </div>

                <!-- Step 3 -->
                <div>
                    <div class="bg-orange-500 p-4 sm:p-5 rounded-xl shadow-md space-y-3">
                        <h3 class="font-bold text-base sm:text-lg text-center">Enter Trust Agreement and Proceed with
                            Trust</h3>
                        <p class="text-xs text-center">(3–5 Working Days)</p>
                    </div>
                    <p class="mt-6 font-bold">
                        A trust agreement is entered by the customer and Phillip Trustee to establish a trust fund. </p>
                    <ul class="list-disc list-inside text-white space-y-2 mt-4">
                        <li>
                            The customer is required to
                            make a transfer to the trust
                            fund under Phillip Trustee’s
                            company bank account,
                            Phillip Bank.

                        </li>

                    </ul>
                    <p class="mt-6 font-bold">
                        In proceeding with the trust,
                        the terms of payment for the
                        service are agreed upon. </p>
                    <ul class="list-disc list-inside text-white space-y-2 mt-4">
                        <li>
                            The customer has to create a
                            trust sub-account under the
                            Trustee main account.

                        </li>

                    </ul>
                    <p class="mt-6 font-bold">
                        The Trustee is to coordinate
                        the trustor’s documents and
                        submit them to the bank to
                        apply for an account. </p>
                    <ul class="list-disc list-inside text-white space-y-2 mt-4">
                        <li>
                            The trustee is to sign on the sub
                            -account opening form on behalf
                            of the trustor.

                        </li>

                    </ul>
                    <p class="mt-6 font-bold">
                        100% of the Trustor’s fund
                        will be deducted.
                    </p>

                </div>

                <!-- Step 4 -->
                <div>
                    <div class="bg-orange-500 p-6 sm:p-8 md:p-10 rounded-xl shadow-md space-y-3">
                        <h3 class="font-bold text-base sm:text-lg text-center">Trust Registration</h3>
                        <p class="text-sm mt-4 text-center"></p>
                    </div>
                    <p class="mt-4 sm:mt-6 font-bold text-sm sm:text-base">
                        The trust should be registered with the Trust Regulator (TR) within 3 months after the date of
                        establishment in order to be valid.
                    </p>
                </div>

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

                <!-- Escrow Service -->
                <div
                    class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#13325e]/80">
                    <div class="h-40 sm:h-48 overflow-hidden">
                        <img src="/images/Services/key_service_img_03.jpg" alt="Escrow Service"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div class="p-4 sm:p-6 bg-[#0e2a52]">
                        <h3 class="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Escrow Service</h3>
                        <p class="text-sm sm:text-base text-white/70 mb-4 sm:mb-6">
                            Professional property holding and management services for your real estate investments.
                        </p>
                        <NuxtLink to="/Services_escrow_service"
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
                            class="inline-block bg-[#f15a22] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-[#d14615] transition-colors duration-300 font-semibold text-sm sm:text-base">
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
            fundRetentionRates: [
                {
                    amount: '< 300K',
                    oneYear: '$210',
                    threeYear: '$350',
                    fiveYear: '$1,050'
                },
                {
                    amount: '> 300K < 1$Million',
                    oneYear: '$370',
                    threeYear: '$617',
                    fiveYear: '$0.062%'
                },
                {
                    amount: '> 1$Million < 5$Million',
                    oneYear: '0.037%',
                    threeYear: '0.062%',
                    fiveYear: '0.185%'
                },
                {
                    amount: '> 5$Million',
                    oneYear: '0.035%',
                    threeYear: '0.058%',
                    fiveYear: '0.175%'
                },

            ]
        }
    }
}
</script>