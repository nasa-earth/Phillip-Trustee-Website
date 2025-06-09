<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <HeroSection />

    <!-- About Section -->
    <AboutSection />

    <!-- Services Section -->
    <ServicesSection />

    <!-- Contact Section -->
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["home"],
});

// Add title and meta description
useHead({
  title: "Phillip Trustee Cambodia - Your Trusted Partner",
  meta: [
    {
      name: "description",
      content:
        "Phillip Trustee Cambodia provides professional trustee services including commercial, social, and personal trust services. Licensed and regulated in Cambodia.",
    },
  ],
});
</script>
