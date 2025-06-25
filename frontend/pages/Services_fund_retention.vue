<template>
    <!-- Hero Section -->
    <section class="relative h-[90vh] w-full flex items-center justify-center bg-cover bg-center" :style="{
        backgroundImage: 'url(/images/Services/client-services.jpg)',
    }">
        <!-- Overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-0"></div>

        <!-- Content -->
        <div class="relative z-10 text-center text-white px-6 max-w-3xl" data-aos="fade-up" data-aos-duration="1200">
            <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-6">
                <span class="text-[#f15a22]">Fund</span>
                Retention
                <span class="text-[#f15a22]">Services</span>
            </h1>
            <p class="text-lg md:text-xl text-white/80 mb-8">
                Secure, reliable fund management solutions for your financial needs.
            </p>
        </div>
    </section>

    <!-- Section Title -->
    <section class="bg-[#0c2c59] text-white py-16 px-6 md:px-12">
        <div class="max-w-7xl px-6 py-16 text-center mx-[350px]">
            <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
                Fund Retention Services
            </h2>
            <p class="text-lg md:text-xl text-white mb-8 text-center">
                We serve as enforcers of your Trust Deeps or Will.
            </p>
            <p class="text-lg md:text-xl text-white mb-8 text-center">
                Our role is to hold and apply trust assets on behalf of your beneficiaries, ensuring that this is done
                according to your wishes.
            </p>
        </div>
    </section>


    <!-- Fund Retention Table Section -->
    <section class="bg-[#003366] text-white py-16 px-6">

        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8">
                Service Fee for Trust Fund Retention
            </h2>


            <!-- Table -->
            <div class="overflow-auto">
                <table class="min-w-full border-collapse rounded-xl overflow-hidden">
                    <thead class="bg-[#002855] text-white">
                        <tr>
                            <th class="p-4 text-left">Fund Amount (USD)</th>
                            <th class="p-4 text-center border-l border-white">1 Year Quote</th>
                            <th class="p-4 text-center border-l border-white">3 Year Quote</th>
                            <th class="p-4 text-center border-l border-white">5 Year Quote</th>
                        </tr>
                    </thead>
                    <tbody class="bg-[#003366]">
                        <tr v-for="(item, index) in fundRetentionRates" :key="index" class="border-t border-white">
                            <td class="p-4">{{ item.amount }}</td>
                            <td class="p-4 text-center">{{ item.oneYear }}</td>
                            <td class="p-4 text-center">{{ item.threeYear }}</td>
                            <td class="p-4 text-center">{{ item.fiveYear }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <div class="mt-8 ">
                <p class=" text-gray-300 mt-6 text-center font-bold">
                    Important Note:

                </p>

                <ul class="list-disc list-inside text-white space-y-2 mt-4 mx-[250px]">
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
    <section class="bg-[#0c2c59] text-white py-16 px-6 md:px-12">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
                Fund Management Process
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Step 1 -->
                <div>
                    <div class="bg-orange-500 p-5 rounded-xl shadow-md space-y-3">
                        <h3 class="font-bold text-lg text-center">Trusteeship Consulting</h3>
                        <!-- <p class="text-xs text-center">(between trustor and land-holding company)</p> -->

                    </div>
                    <p class="mt-6 font-bold">Our trustee advisor will provide:</p>
                    <ul class="list-disc list-inside text-white space-y-2 mt-4">
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
                    <div class="bg-orange-500 p-5 rounded-xl shadow-md space-y-3">
                        <h3 class="font-bold text-lg text-center">Pre-trusteeship Service</h3>
                        <p class="text-xs text-center">(5 Working Days)</p>
                    </div>
                    <p class="mt-6 font-bold">Our pre-trustee service requires: </p>
                    <ul class="list-disc list-inside text-white space-y-2 mt-4">
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
                    <div class="bg-orange-500 p-5 rounded-xl shadow-md space-y-3">
                        <h3 class="font-bold text-lg text-center">Enter Trust Agreement and Proceed with Trust</h3>
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
                    <div class="bg-orange-500 p-5 rounded-xl shadow-md space-y-3">
                        <h3 class="font-bold text-lg text-center">Trust Registration</h3>
                        <p class="text-sm mt-4 text-center"></p>
                    </div>
                    <p class="mt-6 font-bold">
                        The trust should be registered with the Trust Regulator (TR) within 3 months after the date of
                        establishment in order to be valid.
                    </p>
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