<template>
    <div class="min-h-screen bg-lightgray">
        <!-- Hero Section -->
        <section v-if="event" class="relative h-screen w-full flex items-center justify-center bg-cover bg-center"
            :style="{ backgroundImage: `url(${event.thumbnail || '/images/event/default.jpg'})` }">
            <!-- Overlay -->
            <div class="absolute inset-0 z-0"></div>
        </section>

        <!-- Event Details Section -->
        <section v-if="event"
            class="bg-gradient-to-b from-[#0a2b5c] to-[#081d3f] text-[#e6eaf0] py-24 px-4 md:px-8 relative overflow-hidden">
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
            <!-- Content -->
            <div class="relative z-10 text-center text-[#e6eaf0] px-6 max-w-4xl mx-[300px]" data-aos="fade-up"
                data-aos-duration="1000">

                <h1 class="text-3xl md:text-4xl font-bold leading-tight mb-6">
                    {{ event.title }}
                </h1>
                <p class="text-lg md:text-lg text-[#e6eaf0]/90">
                    <span v-if="event.location">{{ event.location }}</span>
                </p>
            </div>

            <!-- Decorative Circle Elements -->
            <div
                class="absolute top-20 right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow">
            </div>
            <div
                class="absolute bottom-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow">
            </div>

            <div class="container mx-auto relative z-10">
                <div class=" rounded-2xl shadow-2xl overflow-hidden mx-[60px]">
                    <div class="p-8 md:p-12">
                        <!-- Event Details -->
                        <div class="flex flex-col md:flex-row gap-8 mb-8">
                            <div class="w-full md:w-2/3 mx-[200px]">
                                <p class="text-[#e6eaf0]/90 mb-8 text-lg leading-relaxed whitespace-pre-line">{{
                                    event.description }}</p>

                                <!-- Event Images Gallery -->
                                <div v-if="event.images && event.images.length > 0" class="mb-8">
                                    <h4 class="text-lg font-semibold text-[#e6eaf0] mb-4">Event Gallery</h4>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div v-for="(image, index) in event.images" :key="index"
                                            class="rounded-lg overflow-hidden shadow-lg border border-white/10 cursor-pointer"
                                            @click="openImageModal(image)">
                                            <img :src="image.url || image" :alt="`${event.title} - Image ${index + 1}`"
                                                class="w-full h-64 object-cover hover:scale-105 transition-transform duration-300">
                                        </div>
                                    </div>
                                </div>

                                <!-- Event Meta Information -->
                                <div class="bg-white/5 rounded-lg p-6 mb-8">
                                    <h4 class="text-lg font-semibold text-[#e6eaf0] mb-4">Event Details</h4>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div class="flex items-center">
                                            <i class="pi pi-calendar mr-2 text-[#f15a22]"></i>
                                            <span>Created: {{ formatDate(event.createdAt) }}</span>
                                        </div>
                                        <div class="flex items-center">
                                            <i class="pi pi-clock mr-2 text-[#f15a22]"></i>
                                            <span>Updated: {{ formatDate(event.updatedAt) }}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-wrap gap-4">
                                    <NuxtLink to="/Event"
                                        class="bg-white/10 hover:bg-white/20 text-[#e6eaf0] px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 border border-white/20">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        <span>Back to Events</span>
                                    </NuxtLink>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Loading State -->
        <div v-if="loading" class="h-screen w-full flex items-center justify-center bg-[#081d3f]">
            <div class="text-center">
                <div
                    class="w-16 h-16 border-4 border-t-[#f15a22] border-r-[#f15a22]/50 border-b-[#f15a22]/30 border-l-[#f15a22]/10 rounded-full animate-spin mb-4 mx-auto">
                </div>
                <p class="text-[#e6eaf0] text-lg">Loading event details...</p>
            </div>
        </div>

        <!-- Event Not Found -->
        <div v-else-if="!event" class="h-screen w-full flex items-center justify-center bg-[#081d3f]">
            <div class="text-center">
                <i class="pi pi-exclamation-triangle text-6xl text-red-400 mb-4"></i>
                <h2 class="text-2xl text-[#e6eaf0] mb-4">Event Not Found</h2>
                <p class="text-[#e6eaf0]/70 mb-6">The event you're looking for doesn't exist or has been removed.</p>
                <NuxtLink to="/Event"
                    class="bg-[#f15a22] hover:bg-orange-600 text-[#e6eaf0] px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clip-rule="evenodd" />
                    </svg>
                    <span>Back to Events</span>
                </NuxtLink>
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
            loading: true,
            error: null
        }
    },
    async mounted() {
        await this.loadEvent()
    },
    methods: {
        async loadEvent() {
            this.loading = true
            this.error = null
            try {
                const slug = this.$route.query.slug
                if (!slug) {
                    throw new Error('No slug provided')
                }

                const { useEventService } = await import('@/composables/useEventService')
                const eventService = useEventService()
                this.event = await eventService.getEventBySlug(slug)

                if (!this.event) {
                    throw new Error('Event not found')
                }
            } catch (error) {
                console.error('Error loading event:', error)
                this.error = error.message || 'Failed to load event'
                this.event = null
            } finally {
                this.loading = false
            }
        },

        formatDate(dateString) {
            if (!dateString) return 'No date'
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        },

        openImageModal(image) {
            // Simple image modal - you can enhance this with a proper modal component
            const imageUrl = image.url || image
            window.open(imageUrl, '_blank')
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