<template>
  <div>
    
    <Header />
    <HomePage />
    <AboutPage />
    <ProfilePage />
    <ServicePage />
    <EventPage />
    <FaqsPage />
    <Footer />
  </div>
</template>

<script setup>
  // import Footer from '~/components/Footer.vue';
  import Header from '~/components/Header.vue';
  import HomePage from '~/pages/Home.vue';
  // import AboutPage from '~/pages/About.vue';
  import Footer from '~/components/Footer.vue';
  import AboutPage from '~/pages/About.vue';
  import ProfilePage from '~/pages/Profile.vue';
  import ServicePage from '~/pages/Service.vue';
  import EventPage from '~/pages/Event.vue';
  import FaqsPage from '~/pages/Faqs.vue';
</script>