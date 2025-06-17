<template>
  <div class="min-h-screen bg-[#e6eaf0] py-16 px-4">
    <div class="container mx-auto">
      <h1 class="text-4xl md:text-5xl font-bold text-[#13325e] mb-10 text-center animate-fadein">Upcoming Events</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <NuxtLink
          v-for="event in events"
          :key="event.id"
          :to="`/events/${event.id}`"
          class="group block bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#e6eaf0] hover:-translate-y-2 animate-card"
        >
          <div class="h-48 w-full overflow-hidden">
            <img
              :src="event.image"
              :alt="event.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div class="p-6">
            <h2 class="text-2xl font-semibold text-[#13325e] group-hover:text-[#f15a22] transition-colors duration-300 mb-2">
              {{ event.title }}
            </h2>
            <p class="text-[#13325e]/80 mb-4">{{ event.date }}</p>
            <p class="text-[#13325e]/70">{{ event.description }}</p>
            <span class="inline-block mt-4 text-[#f15a22] font-semibold group-hover:underline transition-all duration-300">
              View Details →
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventPage',
  data() {
    return {
      events: [
        {
          id: 1,
          title: 'Trust Law Seminar 2025',
          date: 'July 20, 2025',
          description: 'Join us for an in-depth seminar on the latest in trust law and its impact on business in Cambodia.',
          image: '/images/events/event1.jpg'
        },
        {
          id: 2,
          title: 'Business Networking Night',
          date: 'August 15, 2025',
          description: 'An evening of networking with industry leaders and professionals.',
          image: '/images/events/event2.jpg'
        },
        {
          id: 3,
          title: 'Family Trusts Workshop',
          date: 'September 10, 2025',
          description: 'Learn how to set up and manage family trusts effectively.',
          image: '/images/events/event3.jpg'
        },
        {
          id: 1,
          title: 'Trust Law Seminar 2025',
          date: 'July 20, 2025',
          description: 'Join us for an in-depth seminar on the latest in trust law and its impact on business in Cambodia.',
          image: '/images/events/event1.jpg'
        },
        {
          id: 2,
          title: 'Business Networking Night',
          date: 'August 15, 2025',
          description: 'An evening of networking with industry leaders and professionals.',
          image: '/images/events/event2.jpg'
        },
        {
          id: 3,
          title: 'Family Trusts Workshop',
          date: 'September 10, 2025',
          description: 'Learn how to set up and manage family trusts effectively.',
          image: '/images/events/event3.jpg'
        },
        
      ]
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/theme.css';

@keyframes fadein {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: translateY(0);}
}
.animate-fadein {
  animation: fadein 1s cubic-bezier(.4,0,.2,1) both;
}
@keyframes cardin {
  from { opacity: 0; transform: scale(0.95);}
  to { opacity: 1; transform: scale(1);}
}
.animate-card {
  animation: cardin 0.7s cubic-bezier(.4,0,.2,1) both;
}
</style>