<template>
    <div>
        <HomePage />
    </div>
</template>

<script setup>
import HomePage from './Home.vue';
const authStore = useAuthStore();

onMounted(() => {
    if (!authStore.isAuthenticated) {
    }
});
</script>