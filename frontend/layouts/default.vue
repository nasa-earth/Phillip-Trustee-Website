<template>
  <div class="relative min-h-screen">
    <Header v-if="!isLoginPage && !isAdminPage" />
    <div class="page-content">
      <NuxtPage />
    </div>
    <Footer v-if="!isLoginPage && !isAdminPage" />
  </div>
</template>

<style>
.page-content {
  /* No additional styles needed since we're using absolute positioning for the header */
  min-height: 100vh;
}
</style>

<script setup>
import { useRoute } from 'vue-router';
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';

const route = useRoute();
const isLoginPage = computed(() => route.path === '/login');
const isAdminPage = computed(() => route.path.startsWith('/admin'));
</script>