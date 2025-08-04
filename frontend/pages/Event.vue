<template>
  <div class="min-h-screen bg-lightgray">
    <!-- Hero Section -->
    <section
      class="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-screen w-full flex items-center justify-center bg-cover bg-center"
      :style="{
        backgroundImage: 'url(/images/event/event_header.jpg)',
      }">
      <div class="absolute inset-0 bg-gradient-to-b from-[#001a4d]/50 via-[#0e2a52]/20 to-[#001a4d]/10 z-0"></div>
    </section>

    <!-- Events Section -->
    <section
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

      <!-- Decorative Circle Elements -->
      <div
        class="absolute top-10 sm:top-16 md:top-20 right-5 sm:right-8 md:right-10 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-orange-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow">
      </div>
      <div
        class="absolute bottom-10 sm:bottom-16 md:bottom-20 left-10 sm:left-16 md:left-20 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow">
      </div>

      <div class="container mx-auto relative z-10">
        <div class="flex flex-col items-center mb-8 sm:mb-12 md:mb-16" data-aos="fade-up" data-aos-duration="800">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4">Events</h2>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-12 sm:py-16 md:py-20">
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-4 border-t-[#f15a22] border-r-[#f15a22]/50 border-b-[#f15a22]/30 border-l-[#f15a22]/10 rounded-full animate-spin">
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12 sm:py-16 md:py-20">
          <i class="pi pi-exclamation-triangle text-4xl sm:text-5xl md:text-6xl text-red-400 mb-3 sm:mb-4"></i>
          <h3 class="text-lg sm:text-xl text-[#e6eaf0] mb-2">Error Loading Events</h3>
          <p class="text-[#e6eaf0]/70 mb-4 sm:mb-6 text-sm sm:text-base">{{ error }}</p>
          <button @click="loadEvents"
            class="bg-[#f15a22] hover:bg-orange-600 text-[#e6eaf0] px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base">
            Try Again
          </button>
        </div>

        <!-- Events Grid -->
        <div v-else-if="events.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mx-0 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-[150px]">
          <div v-for="event in events" :key="event.id" class="group bg-gradient-to-b from-[#13325e] to-[#092f68] rounded-xl shadow-xl overflow-hidden 
                     transform transition-all duration-500 hover:-translate-y-2 hover:shadow-orange-500/20 animate-card
                     h-[350px] sm:h-[370px] md:h-[380px] flex flex-col">

            <!-- Image Section - Fixed Height -->
            <div class="h-36 sm:h-40 md:h-44 w-full overflow-hidden relative flex-shrink-0">
              <img :src="event.thumbnail || '/images/event/default.jpg'" :alt="event.title"
                class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#0a2b5c]/30 to-transparent"></div>
            </div>
            <div class="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
              <!-- Title with truncation -->
              <h3
                class="text-base sm:text-lg font-bold text-center text-[#f15a22] mb-2 line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem] flex items-center justify-center">
                {{ event.title }}
              </h3>

              <!-- Description with fixed height -->
              <p class="text-[#e6eaf0]/90 mb-3 sm:mb-4 line-clamp-3 text-sm flex-grow min-h-[2.5rem]">
                {{ event.description }}
              </p>

              <!-- Button Section - Always at bottom -->
              <div class="flex justify-center items-center mt-auto">
                <NuxtLink :to="`/EventDetails?slug=${event.slug}`" @click="trackEventClick(event)"
                  class="bg-[#f15a22] hover:bg-orange-600 text-[#e6eaf0] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg group text-sm">
                  <span>Read More</span>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-300"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd" />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>

          <div v-if="!loading && !error && events.length === 0"
            class="col-span-full text-center py-12 sm:py-16 md:py-20">
            <i class="pi pi-calendar text-4xl sm:text-5xl md:text-6xl text-[#e6eaf0]/30 mb-3 sm:mb-4"></i>
            <h3 class="text-lg sm:text-xl text-[#e6eaf0] mb-2">No Events Available</h3>
            <p class="text-[#e6eaf0]/70 mb-4 sm:mb-6 text-sm sm:text-base">Check back soon for upcoming events</p>
            <button @click="loadEvents"
              class="bg-[#f15a22] hover:bg-orange-600 text-[#e6eaf0] px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base">
              Refresh
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'EventPage',
  head() {
    return {
      title: 'Events - Phillip Trustee Cambodia',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Stay updated with Phillip Trustee\'s upcoming events, seminars, workshops, and important announcements in Cambodia.'
        }
      ]
    }
  },
  data() {
    return {
      events: [],
      loading: true,
      error: null
    }
  },
  async mounted() {
    await this.loadEvents()
  },
  methods: {
    async loadEvents() {
      this.loading = true
      this.error = null
      try {
        const { useEventService } = await import('~/composables/useEvent')
        const eventService = useEventService()

        // Get all events, with option to force refresh if needed
        this.events = await eventService.getEvents(true)

        // Ensure events is always an array
        if (!Array.isArray(this.events)) {
          console.warn('Events data is not an array:', this.events)
          this.events = []
        }

        // Filter only published events (additional safety)
        this.events = this.events.filter(event => event.published !== false)

        // Sort events by created date, newest first
        this.events = this.events.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt)
        })

        console.log(`Loaded ${this.events.length} published events`)

      } catch (error) {
        console.error('Error loading events:', error)
        this.error = error.message || 'Failed to load events'
        this.events = []
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

    // Track event clicks for analytics or other purposes
    trackEventClick(event) {
      console.log(`Event clicked: ${event.title} (${event.slug})`)
      // You could add analytics tracking here in the future
      // localStorage can be used to remember recently viewed events
      try {
        // Store the recent event in localStorage for possible use later
        const recentEvents = JSON.parse(localStorage.getItem('recentEvents') || '[]')
        // Add this event to the front of the array (most recent first)
        const updatedEvents = [
          { id: event.id, slug: event.slug, title: event.title, timestamp: new Date().toISOString() },
          ...recentEvents.filter(e => e.id !== event.id).slice(0, 4) // Keep only the 5 most recent unique events
        ]
        localStorage.setItem('recentEvents', JSON.stringify(updatedEvents))
      } catch (error) {
        console.error('Error storing recent event:', error)
      }
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/theme.css';

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Mobile-specific line clamp */
@media (max-width: 640px) {
  .line-clamp-2 {
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .line-clamp-3 {
    -webkit-line-clamp: 4;
    line-clamp: 4;
  }
}

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

.animate-card:nth-child(2) {
  animation-delay: 0.1s;
}

.animate-card:nth-child(3) {
  animation-delay: 0.2s;
}

.animate-card:nth-child(4) {
  animation-delay: 0.3s;
}

.animate-card:nth-child(5) {
  animation-delay: 0.4s;
}

.animate-card:nth-child(6) {
  animation-delay: 0.5s;
}

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