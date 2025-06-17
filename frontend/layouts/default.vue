<template>
  <div>
    <Header v-if="!isLoginPage" />
    <NuxtPage />
    <Footer v-if="!isLoginPage" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';

const route = useRoute();
const isLoginPage = computed(() => route.path === '/login');
</script>