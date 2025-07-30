<template>
    <div class="min-h-screen bg-lightgray">
        <!-- Hero Section -->
        <section v-if="event"
            class="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-screen w-full flex items-center justify-center bg-cover bg-center"
            :style="{ backgroundImage: `url(${event.thumbnail || '/images/event/default.jpg'})` }">
            <!-- Enhanced Overlay with better gradient -->
            <div class="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/10 z-0"></div>
        </section>

        <!-- Event Details Section -->
        <section v-if="event"
            class="bg-gradient-to-b from-[#0a2b5c] to-[#081d3f] text-[#e6eaf0] py-12 sm:py-16 md:py-20 lg:py-24 px-4 md:px-8 relative overflow-hidden">
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
            <div class="relative z-10 text-center text-[#e6eaf0] px-4 sm:px-6 max-w-4xl mx-auto lg:mx-[300px]"
                data-aos="fade-up" data-aos-duration="1000">
                <!-- Preview Mode Banner -->
                <div v-if="$route.query.preview && !event.published"
                    class="bg-yellow-600/90 text-white py-2 px-4 rounded-lg mb-4 inline-flex items-center text-sm sm:text-base">
                    <i class="pi pi-eye mr-2"></i>
                    <span>Preview Mode - This event is not published</span>
                </div>

                <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4 sm:mb-6">
                    {{ event.title }}
                </h1>
                <p class="text-base sm:text-lg md:text-lg text-[#e6eaf0]/90">
                    <!-- Location removed since it's not in the current model -->
                </p>
            </div>

            <!-- Decorative Circle Elements -->
            <div
                class="absolute top-10 sm:top-20 right-5 sm:right-10 w-48 h-48 sm:w-64 sm:h-64 bg-orange-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow">
            </div>
            <div
                class="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-56 h-56 sm:w-72 sm:h-72 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow">
            </div>

            <div class="container mx-auto relative z-10">
                <div class="rounded-2xl shadow-2xl overflow-hidden max-w-6xl mx-auto">
                    <div class="p-4 sm:p-6 md:p-8 lg:p-12">
                        <!-- Event Details -->
                        <div class="flex flex-col gap-6 sm:gap-8 mb-6 sm:mb-8">
                            <div class="w-full max-w-4xl mx-auto">
                                <div class="mb-6 sm:mb-8">
                                    <p
                                        class="text-[#e6eaf0]/90 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                                        {{
                                            event.description }}</p>
                                </div>

                                <!-- Event Images Gallery -->
                                <div v-if="event.images && event.images.length > 0" class="mb-6 sm:mb-8">
                                    <h4 class="text-base sm:text-lg font-semibold text-[#e6eaf0] mb-4 sm:mb-6">Event
                                        Gallery</h4>

                                    <!-- Full-width images displayed vertically -->
                                    <div class="space-y-4 sm:space-y-6">
                                        <div v-for="(image, index) in event.images" :key="index"
                                            class="relative rounded-sm overflow-hidden shadow-2xl border border-white/10 cursor-pointer group"
                                            @click="openImageModal(image)">
                                            <img :src="image.url || image" :alt="`${event.title} - Image ${index + 1}`"
                                                class="w-full h-full object-cover">

                                            <!-- Image overlay with number and zoom indicator -->
                                            <div
                                                class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                                                <div class="absolute top-2 sm:top-4 right-2 sm:right-4">
                                                    <div class="bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            class="h-4 w-4 sm:h-6 sm:w-6 text-white" fill="none"
                                                            viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Gallery info -->
                                    <div class="mt-3 sm:mt-4 text-center">
                                        <p class="text-[#e6eaf0]/70 text-xs sm:text-sm">
                                            Click on any image to view it in full size
                                        </p>
                                    </div>
                                </div>

                                <!-- Navigation -->
                                <div class="flex flex-wrap justify-center gap-3 sm:gap-4 pt-6 sm:pt-8">
                                    <NuxtLink to="/Event"
                                        class="bg-[#f15a22] hover:bg-[#f15a22]/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl flex items-center gap-2 sm:gap-3 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-sm sm:text-base">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5"
                                            viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        <span>Back to All Events</span>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Loading State -->
        <div v-if="loading" class="h-[500px] sm:h-screen w-full flex items-center justify-center bg-[#081d3f]">
            <div class="text-center px-4">
                <div
                    class="w-12 h-12 sm:w-16 sm:h-16 border-4 border-t-[#f15a22] border-r-[#f15a22]/50 border-b-[#f15a22]/30 border-l-[#f15a22]/10 rounded-full animate-spin mb-4 mx-auto">
                </div>
                <p class="text-[#e6eaf0] text-base sm:text-lg">Loading event details...</p>
            </div>
        </div>

        <!-- Event Not Found -->
        <div v-else-if="!event || error"
            class="h-[500px] sm:h-screen w-full flex items-center justify-center bg-[#081d3f]">
            <div class="text-center px-4">
                <i class="pi pi-exclamation-triangle text-4xl sm:text-6xl text-red-400 mb-4"></i>
                <h2 class="text-xl sm:text-2xl text-[#e6eaf0] mb-4">{{ error || 'Event Not Found' }}</h2>
                <p class="text-[#e6eaf0]/70 mb-6 text-sm sm:text-base">{{ error ? 'Please try again later.' : "The event you're looking for doesn't exist or has been removed." }}</p>
                <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <button v-if="error" @click="loadEvent"
                        class="bg-[#f15a22] hover:bg-orange-600 text-[#e6eaf0] px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base">
                        Try Again
                    </button>
                    <NuxtLink to="/Event"
                        class="bg-[#f15a22] hover:bg-orange-600 text-[#e6eaf0] px-4 sm:px-6 py-2 sm:py-3 rounded-lg inline-flex items-center justify-center gap-2 transition-all duration-300 text-sm sm:text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20"
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
                    this.error = 'No event slug provided'
                    this.event = null
                    return
                }

                const { useEventService } = await import('~/composables/useEvent')
                const eventService = useEventService()

                // Check if this is preview mode (admin previewing event)
                const isPreviewMode = !!this.$route.query.preview;

                if (isPreviewMode) {
                    try {
                        // Try to use the preview endpoint which should work for unpublished events too
                        this.event = await eventService.previewEventBySlug(slug);
                        if (!this.event) {
                            this.error = 'Event not found';
                            return;
                        }
                    } catch (previewError) {
                        console.error('Preview failed, falling back to regular endpoint:', previewError);
                        // Fall back to regular endpoint
                        this.event = await eventService.getEventBySlug(slug);
                        if (!this.event) {
                            this.error = 'Event not found';
                            return;
                        }
                    }
                } else {
                    // Regular public view - only published events
                    this.event = await eventService.getEventBySlug(slug);

                    // If event not found, show error
                    if (!this.event) {
                        this.error = 'Event not found';
                        return;
                    }

                    // Ensure the event is published for public viewing
                    if (!this.event.published) {
                        this.error = 'This event is not currently published';
                        this.event = null;
                        return;
                    }
                }

                // Track the event view for analytics purposes
                this.trackEventView(this.event)

                console.log('Event loaded successfully:', this.event.title)
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
            // Enhanced image modal with better full-screen experience
            const imageUrl = image.url || image

            // Create a full-screen modal overlay
            const modalOverlay = document.createElement('div')
            modalOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: pointer;
                backdrop-filter: blur(10px);
            `

            // Create the image element
            const modalImage = document.createElement('img')
            modalImage.src = imageUrl
            modalImage.style.cssText = `
                max-width: 95vw;
                max-height: 95vh;
                object-fit: contain;
                border-radius: 8px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                transition: transform 0.3s ease;
            `

            // Create close button
            const closeButton = document.createElement('button')
            closeButton.innerHTML = '✕'
            closeButton.style.cssText = `
                position: absolute;
                top: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                font-size: 24px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(10px);
                transition: background 0.3s ease;
            `

            closeButton.addEventListener('mouseenter', () => {
                closeButton.style.background = 'rgba(255, 255, 255, 0.3)'
            })

            closeButton.addEventListener('mouseleave', () => {
                closeButton.style.background = 'rgba(255, 255, 255, 0.2)'
            })

            // Create image counter if multiple images
            if (this.event.images && this.event.images.length > 1) {
                const currentIndex = this.event.images.findIndex(img => (img.url || img) === imageUrl) + 1
                const counter = document.createElement('div')
                counter.textContent = `${currentIndex} / ${this.event.images.length}`
                counter.style.cssText = `
                    position: absolute;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0, 0, 0, 0.7);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 14px;
                    backdrop-filter: blur(10px);
                `
                modalOverlay.appendChild(counter)
            }

            // Close modal function
            const closeModal = () => {
                document.body.removeChild(modalOverlay)
                document.body.style.overflow = 'auto'
            }

            // Event listeners
            closeButton.addEventListener('click', closeModal)
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    closeModal()
                }
            })

            // Keyboard event listener for ESC key
            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    closeModal()
                    document.removeEventListener('keydown', handleKeyDown)
                }
            }
            document.addEventListener('keydown', handleKeyDown)

            // Assemble modal
            modalOverlay.appendChild(modalImage)
            modalOverlay.appendChild(closeButton)

            // Add to DOM
            document.body.appendChild(modalOverlay)
            document.body.style.overflow = 'hidden'

            // Add entrance animation
            modalOverlay.style.opacity = '0'
            modalImage.style.transform = 'scale(0.8)'

            requestAnimationFrame(() => {
                modalOverlay.style.transition = 'opacity 0.3s ease'
                modalImage.style.transition = 'transform 0.3s ease'
                modalOverlay.style.opacity = '1'
                modalImage.style.transform = 'scale(1)'
            })
        },

        // Track event views for analytics purposes
        trackEventView(event) {
            console.log(`Event viewed: ${event.title} (${event.slug})`)
            // Add analytics tracking here in the future

            try {
                // Store viewed event in localStorage
                const viewedEvents = JSON.parse(localStorage.getItem('viewedEvents') || '{}')
                viewedEvents[event.id] = {
                    lastViewed: new Date().toISOString(),
                    title: event.title,
                    slug: event.slug,
                    viewCount: (viewedEvents[event.id]?.viewCount || 0) + 1
                }
                localStorage.setItem('viewedEvents', JSON.stringify(viewedEvents))
            } catch (error) {
                console.error('Error storing viewed event:', error)
            }
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