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
        // Uncomment this line to force login for accessing the homepage
        // useRouter().push('/login');
    }
});
</script>