<template>
  <div class="min-h-screen bg-lightgray">
    <!-- Hero Section -->
    <section class="relative h-[90vh] w-full flex items-center justify-center bg-cover bg-center" :style="{
      backgroundImage: 'url(/images/Services/Beneficiaries-rights.jpg)',
    }">
      <!-- Overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-0"></div>

      <!-- Content -->
      <div class="relative z-10 text-center text-[#e6eaf0] px-6 max-w-3xl" data-aos="fade-up" data-aos-duration="1200">
        <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-6">
          <span class="text-[#f15a22]">Learn</span>
          and
          <span class="text-[#f15a22]">Know</span>
          about
          <span class="text-[#f15a22]">Phillip Trustee</span>
        </h1>
        <p class="text-lg md:text-xl text-[#e6eaf0]/80 mb-8">
          Empowering investors and building trust in Cambodia through personalized, secure financial services.
        </p>

      </div>
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

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="event in events" :key="event.id"
            class="group bg-gradient-to-b from-[#13325e] to-[#0d254a] rounded-xl shadow-xl overflow-hidden 
                     transform transition-all duration-500 hover:-translate-y-2 hover:shadow-orange-500/20 animate-card">
            <div class="h-56 w-full overflow-hidden relative">
              <img :src="event.image" :alt="event.title"
                class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#0a2b5c]/90 to-transparent"></div>

            </div>

            <div class="p-6">
              <h3 class="text-xl font-bold text-[#f15a22] mb-4">
                {{ event.title }}
              </h3>
              <p class="text-[#e6eaf0]/90 mb-6">{{ event.description }}</p>
              <div class="flex justify-between items-center">
                <NuxtLink :to="`/EventDetails?id=${event.id}`"
                  class="bg-orange-500 hover:bg-orange-600 text-[#e6eaf0] px-5 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg group">
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
  }, data() {
    return {
      events: [
        {
          id: 1,
          title: 'SaRaNa Law Partnership',
          date: 'June 15, 2024',
          description: 'Strategic partnership with SaRaNa Law for comprehensive legal services in trust management.',
          image: '/images/event/sarana-2.jpg',
          location: 'Phillip Trustee Office, Phnom Penh',
          time: '10:00 AM - 12:00 PM',
          details: 'Phillip Trustee is proud to announce a strategic partnership with SaRaNa Law to provide comprehensive legal services for trust management. This collaboration will enhance our ability to offer expert legal advice on trust formation, management, and compliance with Cambodian regulations.',
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
          details: 'We are excited to announce our integration with Sunpay\'s digital payment platform. This collaboration will enable our clients to make seamless transactions and manage their trust accounts digitally, enhancing convenience and security.',
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
          details: 'Phillip Trustee and Yi Fung Real Estate are joining forces to offer comprehensive property trust services. This alliance will provide foreign investors with secure options for property ownership and management through our specialized trust structures.',
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
          details: 'This comprehensive seminar will cover the latest developments in Cambodian trust law and regulations. Industry experts will discuss practical applications, compliance requirements, and strategic opportunities for businesses and individuals.',
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
          details: 'Join us for an exclusive networking event bringing together industry leaders, financial experts, and potential clients. This evening offers an excellent opportunity to build valuable connections and discuss the future of trust services in Cambodia.',
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
          details: 'This hands-on workshop will guide participants through the process of establishing and managing family trusts. Topics include generational wealth transfer, asset protection strategies, and tax considerations for family trust structures in Cambodia.',
          speakers: [
            { name: 'Ms. Sok Lina', role: 'Family Trust Specialist, Phillip Trustee' },
            { name: 'Mr. David Chen', role: 'Estate Planning Expert' }
          ]
        }
      ]
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