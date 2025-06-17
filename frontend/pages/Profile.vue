<template>
    <div class="min-h-screen bg-[#e6eaf0]">
        <!-- Hero Section -->
        <section
            class="relative bg-gradient-to-br from-[#13325e] via-[#1d4170] to-[#13325e] py-20 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
            <h1 class="text-5xl md:text-6xl font-bold text-white mb-4 animate-fadein">Our Management Team</h1>
            <p class="text-xl md:text-2xl text-[#e6eaf0] max-w-2xl mb-8 animate-fadein delay-200">
                Meet the leaders guiding Phillip Trustee (Cambodia) to success.
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

        <!-- Management Profiles -->
        <section class="container mx-auto py-16 px-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div v-for="(manager, idx) in managers" :key="manager.name" @click="openModal(idx)"
                    class="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer animate-card group">
                    <img :src="manager.image" :alt="manager.name"
                        class="w-28 h-28 object-cover rounded-full mb-4 border-4 border-[#e6eaf0] group-hover:border-[#f15a22] transition-all" />
                    <h2 class="text-xl font-bold text-[#13325e] group-hover:text-[#f15a22] mb-1">{{ manager.name }}</h2>
                    <p class="text-[#13325e]/80 mb-2">{{ manager.title }}</p>
                </div>
            </div>
            <!-- Modal -->
            <transition name="fade">
                <div v-if="modalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-card">
                        <button @click="closeModal"
                            class="absolute top-4 right-4 text-[#f15a22] hover:text-[#13325e] text-2xl font-bold">&times;</button>
                        <img :src="selectedManager.image" :alt="selectedManager.name"
                            class="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-[#e6eaf0]" />
                        <h3 class="text-2xl font-bold text-[#13325e] mb-2 text-center">{{ selectedManager.name }}</h3>
                        <p class="text-[#13325e]/80 text-center mb-4">{{ selectedManager.title }}</p>
                        <p class="text-[#13325e]/80 text-center">{{ selectedManager.desc }}</p>
                    </div>
                </div>
            </transition>
        </section>
    </div>
</template>

<script>
export default {
    name: 'ProfilePage',
    data() {
        return {
            managers: [
                { name: 'ONG TEONG HOON', title: 'Chairman', image: '/images/profile/ceo.jpg', desc: 'Chairman of Phillip Trustee (Cambodia). Experienced leader in finance and trust management.' },
                { name: 'Sopheap Proeung', title: 'General Manager', image: '/images/profile/mr_sopheap.jpg', desc: 'General Manager with extensive experience in banking and trust operations.' },
                { name: 'Phang Vichet', title: 'Legal & Compliance Manager', image: '/images/profile/legal_manager.jpg', desc: 'Expert in legal and compliance matters for trust and financial services.' },
                { name: 'Kong Rothana', title: 'Accounting and Finance Manager', image: '/images/profile/kong_rothana.jpg', desc: 'Specialist in accounting and finance for trust management.' },
                { name: 'Ho Souven', title: 'Operation Supervisor', image: '/images/profile/ho_souven.jpg', desc: 'Oversees daily operations and ensures service excellence.' },
            ],
            modalOpen: false,
            selectedManager: {},
        }
    },
    methods: {
        openModal(idx) {
            this.selectedManager = this.managers[idx];
            this.modalOpen = true;
        },
        closeModal() {
            this.modalOpen = false;
            this.selectedManager = {};
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