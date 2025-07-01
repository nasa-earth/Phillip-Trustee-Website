<template>
    <div class="min-h-screen bg-lightgray">
        <!-- Hero Section -->
        <section v-if="event" class="relative h-[60vh] w-full flex items-center justify-center bg-cover bg-center"
            :style="{ backgroundImage: `url(${event.image})` }">
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-0"></div>

            <!-- Content -->
            <div class="relative z-10 text-center text-white px-6 max-w-4xl" data-aos="fade-up"
                data-aos-duration="1000">
                <!-- <div class="bg-orange-500 text-white px-4 py-2 rounded-lg inline-block mb-4">
                    {{ formatDate(event.date) }}
                </div> -->
                <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-6">
                    {{ event.title }}
                </h1>
                <p class="text-lg md:text-xl text-white/90">
                    {{ event.location }} | {{ event.time }}
                </p>
            </div>
        </section>

        <!-- Event Details Section -->
        <section v-if="event"
            class="bg-gradient-to-b from-[#0a2b5c] to-[#081d3f] text-white py-24 px-4 md:px-8 relative overflow-hidden">
            <!-- Dot Pattern Background -->
            <div class="absolute inset-0 opacity-5">
                <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1" fill="white" />
                        </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#dot-pattern)" />
                </svg>
            </div>

            <!-- Decorative Circle Elements -->
            <div
                class="absolute top-20 right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow">
            </div>
            <div
                class="absolute bottom-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow">
            </div>

            <div class="container mx-auto relative z-10">
                <div
                    class=" bg-gradient-to-b from-[#13325e] to-[#0d254a] rounded-2xl shadow-2xl overflow-hidden mx-[60px]">
                    <div class="p-8 md:p-12">
                        <!-- Event Details -->
                        <div class="flex flex-col md:flex-row gap-8 mb-8">
                            <div class="w-full md:w-2/3">
                                <h3 class="text-2xl font-semibold text-[#f15a22] mb-6">Event Details</h3>
                                <p class="text-white/90 mb-8 text-lg leading-relaxed">{{ event.details }}</p>

                                <!-- <div v-if="event.speakers && event.speakers.length > 0" class="mb-8">
                                    <h4 class="text-xl font-medium text-white mb-6">Featured Speakers</h4>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div v-for="(speaker, index) in event.speakers" :key="index"
                                            class="flex items-center gap-4 bg-[#0a2b5c]/50 p-4 rounded-lg border border-white/10">
                                            <div
                                                class="w-14 h-14 rounded-full bg-gradient-to-br from-[#f15a22] to-orange-400 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                                                {{ speaker.name.charAt(0) }}
                                            </div>
                                            <div>
                                                <h5 class="font-medium text-white">{{ speaker.name }}</h5>
                                                <p class="text-white/70">{{ speaker.role }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div> -->

                                <div class="flex flex-wrap gap-4">
                                    <NuxtLink to="/Event"
                                        class="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 border border-white/20">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        <span>Back to Events</span>
                                    </NuxtLink>
                                    <!-- <button
                                        class="bg-gradient-to-r from-[#f15a22] to-orange-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1">
                                        <span>Register for Event</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button> -->
                                </div>
                            </div>

                            <div class="w-full md:w-1/3">
                                <div class="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                                    <h3 class="text-xl font-semibold text-[#f15a22] mb-6">Event Information</h3>

                                    <div class="space-y-6">
                                        <div class="flex items-start gap-4">
                                            <div
                                                class="w-10 h-10 rounded-full bg-[#f15a22]/20 flex items-center justify-center flex-shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#f15a22]"
                                                    viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd"
                                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h5 class="font-medium text-white/80">Date</h5>
                                                <p class="text-white text-lg">{{ formatDate(event.date) }}</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-4">
                                            <div
                                                class="w-10 h-10 rounded-full bg-[#f15a22]/20 flex items-center justify-center flex-shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#f15a22]"
                                                    viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h5 class="font-medium text-white/80">Time</h5>
                                                <p class="text-white text-lg">{{ event.time }}</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-4">
                                            <div
                                                class="w-10 h-10 rounded-full bg-[#f15a22]/20 flex items-center justify-center flex-shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#f15a22]"
                                                    viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd"
                                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h5 class="font-medium text-white/80">Location</h5>
                                                <p class="text-white text-lg">{{ event.location }}</p>
                                            </div>
                                        </div>

                                        <!-- <div class="mt-8 pt-8 border-t border-white/10">
                                            <h5 class="font-medium text-white/80 mb-3">Share This Event</h5>
                                            <div class="flex gap-4">
                                                <a href="#"
                                                    class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                        viewBox="0 0 24 24" fill="currentColor">
                                                        <path
                                                            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                    </svg>
                                                </a>
                                                <a href="#"
                                                    class="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                        viewBox="0 0 24 24" fill="currentColor">
                                                        <path
                                                            d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.128 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                                    </svg>
                                                </a>
                                                <a href="#"
                                                    class="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white hover:bg-green-700 transition-colors">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                        viewBox="0 0 24 24" fill="currentColor">
                                                        <path
                                                            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Loading State -->
        <div v-if="!event" class="h-screen w-full flex items-center justify-center bg-[#081d3f]">
            <div class="text-center">
                <div
                    class="w-16 h-16 border-4 border-t-[#f15a22] border-r-[#f15a22]/50 border-b-[#f15a22]/30 border-l-[#f15a22]/10 rounded-full animate-spin mb-4 mx-auto">
                </div>
                <p class="text-white text-lg">Loading event details...</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EventDetailsPage',
    head() {
        return {
            title: this.event ? `${this.event.title} - Phillip Trustee Cambodia` : 'Event Details - Phillip Trustee Cambodia',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.event ? `Details about ${this.event.title} hosted by Phillip Trustee Cambodia.` : 'Event details for Phillip Trustee Cambodia events.'
                }
            ]
        }
    },
    data() {
        return {
            event: null,
            events: [
                {
                    id: 1,
                    title: 'SaRaNa Law Partnership',
                    date: 'June 15, 2024',
                    description: 'Strategic partnership with SaRaNa Law for comprehensive legal services in trust management.',
                    image: '/images/event/sarana-2.jpg',
                    location: 'Phillip Trustee Office, Phnom Penh',
                    time: '10:00 AM - 12:00 PM',
                    details: 'Phillip Trustee is proud to announce a strategic partnership with SaRaNa Law to provide comprehensive legal services for trust management. This collaboration will enhance our ability to offer expert legal advice on trust formation, management, and compliance with Cambodian regulations.\n\nThe partnership signing ceremony will take place at our head office, followed by a presentation on how this collaboration will benefit our clients. We will showcase case studies of successful trust structures and demonstrate how our combined expertise creates a seamless experience for clients navigating Cambodia\'s trust landscape.\n\nThis event represents a significant milestone for both companies and underscores our commitment to providing the highest quality trust services in Cambodia. Refreshments will be served following the formal proceedings.',
                    speakers: [
                        { name: 'Mr. Phan Sovann', role: 'CEO, Phillip Trustee' },
                        { name: 'Ms. Thida Khoun', role: 'Managing Partner, SaRaNa Law' }
                    ]
                },
                {
                    id: 2,
                    title: 'Sunpay Integration',
                    date: 'July 20, 2024',
                    description: 'Phillip Trustee announces digital payment integration with Sunpay for seamless transactions.',
                    image: '/images/event/Sunpay_2.jpg',
                    location: 'Virtual Event',
                    time: '2:00 PM - 3:30 PM',
                    details: 'We are excited to announce our integration with Sunpay\'s digital payment platform. This collaboration will enable our clients to make seamless transactions and manage their trust accounts digitally, enhancing convenience and security.\n\nThis virtual event will feature live demonstrations of the new digital payment capabilities, including how to set up accounts, make payments, and monitor trust activities through our secure portal. Our technical team will provide step-by-step guidance on using these new features and answer questions from participants.\n\nThe integration represents our commitment to leveraging technology to improve trust management services in Cambodia. By enabling digital transactions, we are making trust services more accessible and efficient for all our clients.',
                    speakers: [
                        { name: 'Mr. Somnang Pich', role: 'CTO, Phillip Trustee' },
                        { name: 'Mr. Li Wei', role: 'CEO, Sunpay Cambodia' }
                    ]
                },
                {
                    id: 3,
                    title: 'Yi Fung Real Estate Alliance',
                    date: 'August 10, 2024',
                    description: 'New partnership with Yi Fung Real Estate to provide comprehensive property trust services.',
                    image: '/images/event/Yi Fung Real Estate_1.jpg',
                    location: 'Yi Fung Real Estate Office, Phnom Penh',
                    time: '9:30 AM - 11:30 AM',
                    details: 'Phillip Trustee and Yi Fung Real Estate are joining forces to offer comprehensive property trust services. This alliance will provide foreign investors with secure options for property ownership and management through our specialized trust structures.\n\nThe event will include presentations on how this alliance addresses the specific needs of foreign investors in Cambodia\'s real estate market. We will explain the legal framework, benefits, and procedures for establishing property trusts, along with practical examples of how these structures protect investor interests.\n\nAttendees will have the opportunity to consult with our experts on their specific property investment needs and learn about the various trust options available. This partnership highlights our dedication to creating secure investment pathways for foreign capital in Cambodia\'s growing real estate sector.',
                    speakers: [
                        { name: 'Mr. Phan Sovann', role: 'CEO, Phillip Trustee' },
                        { name: 'Mr. Zhang Wei', role: 'Director, Yi Fung Real Estate' }
                    ]
                },
                {
                    id: 4,
                    title: 'Trust Law Seminar 2024',
                    date: 'September 5, 2024',
                    description: 'Join us for an in-depth seminar on the latest in trust law and its impact on business in Cambodia.',
                    image: '/images/event/sarana-2.jpg',
                    location: 'Sofitel Phnom Penh Phokeethra',
                    time: '9:00 AM - 4:00 PM',
                    details: 'This comprehensive seminar will cover the latest developments in Cambodian trust law and regulations. Industry experts will discuss practical applications, compliance requirements, and strategic opportunities for businesses and individuals.\n\nThe day-long event includes multiple sessions covering different aspects of trust law, from basic concepts to advanced structures. Speakers will address recent regulatory changes, international best practices, and how these apply to the Cambodian context. Case studies will illustrate successful implementation of various trust structures in real-world scenarios.\n\nA networking lunch will be provided, offering attendees the opportunity to connect with industry peers and our expert speakers. This seminar is essential for legal professionals, business owners, and investors seeking to understand how trust laws can benefit their operations in Cambodia.',
                    speakers: [
                        { name: 'Mr. Phan Sovann', role: 'CEO, Phillip Trustee' },
                        { name: 'Dr. Sambo Kim', role: 'Legal Expert, Ministry of Economy and Finance' },
                        { name: 'Ms. Thida Khoun', role: 'Managing Partner, SaRaNa Law' }
                    ]
                },
                {
                    id: 5,
                    title: 'Business Networking Night',
                    date: 'October 15, 2024',
                    description: 'An evening of networking with industry leaders and professionals in the trust and financial sector.',
                    image: '/images/event/Sunpay_2.jpg',
                    location: 'Raffles Hotel Le Royal, Phnom Penh',
                    time: '6:00 PM - 9:00 PM',
                    details: 'Join us for an exclusive networking event bringing together industry leaders, financial experts, and potential clients. This evening offers an excellent opportunity to build valuable connections and discuss the future of trust services in Cambodia.\n\nThe elegant setting of Raffles Hotel Le Royal provides the perfect backdrop for meaningful conversations and relationship building. Light refreshments and canapés will be served throughout the evening, with a selection of fine wines and beverages.\n\nThis informal gathering is designed to foster collaboration and innovation within Cambodia\'s financial services sector. While there is no formal agenda, our team will be available to discuss your specific interests related to trust services and answer any questions you may have.',
                    speakers: []
                },
                {
                    id: 6,
                    title: 'Family Trusts Workshop',
                    date: 'November 20, 2024',
                    description: 'Learn how to set up and manage family trusts effectively for generational wealth transfer.',
                    image: '/images/event/Yi Fung Real Estate_1.jpg',
                    location: 'Phillip Trustee Training Center, Phnom Penh',
                    time: '1:00 PM - 5:00 PM',
                    details: 'This hands-on workshop will guide participants through the process of establishing and managing family trusts. Topics include generational wealth transfer, asset protection strategies, and tax considerations for family trust structures in Cambodia.\n\nThe interactive format includes both presentations and practical exercises, allowing participants to apply concepts to their own family situations. Our specialists will walk through the documentation required, legal considerations, and best practices for governance of family trusts.\n\nParticipants will receive a comprehensive guide to family trust establishment and management, along with templates and checklists to help implement their own trust structures. This workshop is particularly valuable for high-net-worth individuals and families looking to preserve wealth across generations while ensuring smooth succession planning.',
                    speakers: [
                        { name: 'Ms. Sok Lina', role: 'Family Trust Specialist, Phillip Trustee' },
                        { name: 'Mr. David Chen', role: 'Estate Planning Expert' }
                    ]
                }
            ]
        }
    },
    mounted() {
        // Get the event ID from the route
        const eventId = parseInt(this.$route.query.id);
        if (eventId) {
            // Find the event with the matching ID
            this.event = this.events.find(e => e.id === eventId);
        }

        // Fallback to first event if no match found
        if (!this.event && this.events.length > 0) {
            this.event = this.events[0];
        }
    },
    methods: {
        formatDate(dateString) {
            return dateString; // Simple pass-through for now, can be enhanced with date formatting if needed
        }
    }
}
</script>

<style scoped>
@import '~/assets/css/theme.css';

@keyframes pulse-slow {

    0%,
    100% {
        opacity: 0.7;
    }

    50% {
        opacity: 0.3;
    }
}

.animate-pulse-slow {
    animation: pulse-slow 8s ease-in-out infinite;
}
</style>
