<template>
    <div class="min-h-screen bg-[#e6eaf0]">
        <!-- Hero Section -->
         <!-- testing  -->
        <section
            class="relative bg-gradient-to-br from-[#13325e] via-[#1d4170] to-[#13325e] py-20 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
            <h1 class="text-5xl md:text-6xl font-bold text-white mb-4 animate-fadein">Our Trust Services</h1>
            <p class="text-xl md:text-2xl text-[#e6eaf0] max-w-2xl mb-8 animate-fadein delay-200">
                Discover the types of trusts and key services we offer to help you secure your assets and future.
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

        <!-- What is Trust & Types -->
        <section class="container mx-auto py-16 px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-[#13325e] mb-3">What is Trust?</h2>
                <p class="text-lg text-[#13325e]/80 mb-6">A trust is a legal arrangement where a trustee holds and
                    manages assets for the benefit of beneficiaries.</p>
                <h3 class="text-2xl font-semibold text-[#f15a22] mb-8">Types of Trust in Cambodia</h3>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div v-for="type in trustTypes" :key="type.title"
                    class="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-card">
                    <span class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f15a22]/10 mb-4">
                        <component :is="type.icon" class="w-8 h-8 text-[#f15a22]" />
                    </span>
                    <h4 class="text-xl font-bold text-[#13325e] mb-2">{{ type.title }}</h4>
                    <p class="text-[#13325e]/80">{{ type.desc }}</p>
                </div>
            </div>
        </section>

        <!-- Transfer of Equitable Title -->
        <section class="container mx-auto py-16 px-4">
            <h2 class="text-3xl md:text-4xl font-bold text-[#13325e] mb-10 text-center">Transfer of Equitable Title</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div v-for="role in trustRoles" :key="role.title"
                    class="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center animate-card">
                    <span class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#f15a22]/10 mb-4">
                        <component :is="role.icon" class="w-8 h-8 text-[#f15a22]" />
                    </span>
                    <h3 class="text-xl font-bold text-[#13325e] mb-2">{{ role.title }}</h3>
                    <p class="text-[#13325e]/80">{{ role.desc }}</p>
                </div>
            </div>
        </section>

        <!-- Key Services and Products -->
        <section class="container mx-auto py-16 px-4">
            <h2 class="text-3xl md:text-4xl font-bold text-[#13325e] mb-10 text-center">Key Services and Products</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div v-for="(service, idx) in services" :key="service.title" @click="openModal(idx)"
                    class="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer animate-card group">
                    <img :src="service.image" :alt="service.title"
                        class="w-20 h-20 object-cover rounded-full mb-4 border-4 border-[#e6eaf0] group-hover:border-[#f15a22] transition-all" />
                    <h4 class="text-lg font-bold text-[#13325e] group-hover:text-[#f15a22] mb-2">{{ service.title }}
                    </h4>
                </div>
            </div>
            <!-- Modal -->
            <transition name="fade">
                <div v-if="modalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-card">
                        <button @click="closeModal"
                            class="absolute top-4 right-4 text-[#f15a22] hover:text-[#13325e] text-2xl font-bold">&times;</button>
                        <img :src="selectedService.image" :alt="selectedService.title"
                            class="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-[#e6eaf0]" />
                        <h3 class="text-2xl font-bold text-[#13325e] mb-2 text-center">{{ selectedService.title }}</h3>
                        <p class="text-[#13325e]/80 text-center">{{ selectedService.desc }}</p>
                    </div>
                </div>
            </transition>
        </section>
    </div>
</template>

<script>
// Example icon components (replace with your own or use Heroicons/FontAwesome)
const MoneyIcon = {
    template: '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2"/><circle cx="12" cy="12" r="3"/></svg>'
};
const BriefcaseIcon = {
    template: '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M16 7V5a4 4 0 0 0-8 0v2"/></svg>'
};
const UsersIcon = {
    template: '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>'
};
const HeartIcon = {
    template: '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z"/></svg>'
};
const UserIcon = {
    template: '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a6 6 0 0 1 12 0v2"/></svg>'
};

export default {
    name: 'ServicePage',
    components: {},
    data() {
        return {
            trustTypes: [
                { title: 'Financial Trust', desc: 'Grants or sub-loans provided by development partners for the purpose of developing banking and micro-financial sector in Cambodia.', icon: MoneyIcon },
                { title: 'Commercial Trust', desc: 'Created for the purpose of making profits or other purposes, for the benefits of the Trust Contributor or the person acknowledged by the Trust Contributor.', icon: BriefcaseIcon },
                { title: 'Public Trust', desc: 'Created for the benefits of Cambodian people in general', icon: UsersIcon },
                { title: 'Social Trust', desc: 'Created when a trustor donates his/her property to the trustee for social benefits such as culture, education, humanity, religions, or science', icon: HeartIcon },
                { title: 'Personal Trust', desc: `Created by the Trustor for the purpose of transferring assets or funds to Trustee to manage and safeguard for the Trustor's own benefits or for certain individuals.`, icon: UserIcon },
            ],
            trustRoles: [
                { title: 'Trustor', desc: 'The individual who gives their assets or initial funds to the trust with the right to receive information about the trust management and appointment or termination of the trustee.', icon: UserIcon },
                { title: 'Trustee', desc: 'The person who has the right to manage and administer the trust from another trustor for the benefit of the beneficiary, in accordance with the letter of trust or regulations in force.', icon: BriefcaseIcon },
                { title: 'Beneficiaries', desc: 'The individual(s) who benefits from the trust on the date the trust comes into force, with the exception of certain conditions.', icon: UsersIcon },
            ],
            services: [
                { title: 'Hold Trust Property', image: '/images/services/key_service_img_02.jpg', desc: 'We securely hold and manage trust property on behalf of our clients, ensuring compliance and transparency.' },
                { title: 'Hold Personal Trust', image: '/images/services/key_service_img_03.jpg', desc: 'Personal trust services tailored to your needs, safeguarding your assets for your benefit or your loved ones.' },
                { title: 'Escrow Services', image: '/images/services/key_service_img_04.jpg', desc: 'Professional escrow services for secure transactions and peace of mind.' },
                { title: 'Sales and Purchase Agreement (SPA) Service', image: '/images/services/key_service_img_02.jpg', desc: 'Expert handling of SPA services to facilitate smooth and secure property transactions.' },
            ],
            modalOpen: false,
            selectedService: {},
        }
    },
    methods: {
        openModal(idx) {
            this.selectedService = this.services[idx];
            this.modalOpen = true;
        },
        closeModal() {
            this.modalOpen = false;
            this.selectedService = {};
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