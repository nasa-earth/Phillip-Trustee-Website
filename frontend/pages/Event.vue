<template>
  <div class="min-h-screen bg-lightgray">
    <!-- Hero Section -->
    <section class="relative h-screen w-full flex items-center justify-center bg-cover bg-center" :style="{
      backgroundImage: 'url(/images/event/event_header.jpg)',
    }">
      <!-- Overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#001a4d]/50 via-[#0e2a52]/20 to-[#001a4d]/10 z-0"></div>
    </section>

    <!-- Events Section -->
    <section
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

      <!-- Decorative Circle Elements -->
      <div class="absolute top-20 right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow">
      </div>
      <div class="absolute bottom-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow">
      </div>

      <div class="container mx-auto relative z-10">
        <div class="flex flex-col items-center mb-16" data-aos="fade-up" data-aos-duration="800">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">Events</h2>
          <!-- <div class="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>  -->
          <p class="text-xl text-[#e6eaf0] max-w-3xl text-center mx-auto">
            Join us at our upcoming events to learn more about trust services and network with industry professionals
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-20">
          <div
            class="w-16 h-16 border-4 border-t-[#f15a22] border-r-[#f15a22]/50 border-b-[#f15a22]/30 border-l-[#f15a22]/10 rounded-full animate-spin">
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-20">
          <i class="pi pi-exclamation-triangle text-6xl text-red-400 mb-4"></i>
          <h3 class="text-xl text-[#e6eaf0] mb-2">Error Loading Events</h3>
          <p class="text-[#e6eaf0]/70 mb-6">{{ error }}</p>
          <button @click="loadEvents"
            class="bg-[#f15a22] hover:bg-orange-600 text-[#e6eaf0] px-6 py-3 rounded-lg transition-all duration-300">
            Try Again
          </button>
        </div>

        <!-- Events Grid -->
        <div v-else-if="events.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-[150px]">
          <div v-for="event in events" :key="event.id"
            class="group bg-gradient-to-b from-[#13325e] to-[#0d254a] rounded-xl shadow-xl overflow-hidden 
                     transform transition-all duration-500 hover:-translate-y-2 hover:shadow-orange-500/20 animate-card">
            <!-- Status Badge (Only display if needed) -->
            <div v-if="event.published !== undefined" class="absolute top-3 right-3 z-10">
              <span class="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">Published</span>
            </div>

            <div class="h-56 w-full overflow-hidden relative">
              <img :src="event.thumbnail || '/images/event/default.jpg'" :alt="event.title"
                class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#0a2b5c]/30 to-transparent"></div>
            </div>

            <div class="p-6">
              <h3 class="text-xl font-bold text-[#f15a22] mb-4">
                {{ event.title }}
              </h3>
              <p class="text-[#e6eaf0]/90 mb-4 line-clamp-3">{{ event.description }}</p>
              <div class="text-sm text-[#e6eaf0]/70 mb-6">
                <div class="flex flex-col gap-1">
                  <p v-if="event.createdAt">
                    <i class="pi pi-calendar mr-2"></i>Created: {{ formatDate(event.createdAt) }}
                  </p>
                  <p v-if="event.updatedAt && event.updatedAt !== event.createdAt">
                    <i class="pi pi-clock mr-2"></i>Updated: {{ formatDate(event.updatedAt) }}
                  </p>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <NuxtLink :to="`/EventDetails?slug=${event.slug}`" @click="trackEventClick(event)"
                  class="bg-[#f15a22] hover:bg-orange-600 text-[#e6eaf0] px-5 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg group">
                  <span>Read More</span>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd" />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="!loading && !error && events.length === 0" class="col-span-full text-center py-20">
            <i class="pi pi-calendar text-6xl text-[#e6eaf0]/30 mb-4"></i>
            <h3 class="text-xl text-[#e6eaf0] mb-2">No Events Available</h3>
            <p class="text-[#e6eaf0]/70 mb-6">Check back soon for upcoming events</p>
            <button @click="loadEvents"
              class="bg-[#f15a22] hover:bg-orange-600 text-[#e6eaf0] px-6 py-3 rounded-lg transition-all duration-300">
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

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
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