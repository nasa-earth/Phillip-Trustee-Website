<template>
  <div>
    <h1 class="text-2xl font-semibold mb-6">403 - Access Denied</h1>
    <p class="text-gray-600 mb-4">
      You don't have permission to access this page.
    </p>
    <button @click="router.back()" class="text-blue-600 hover:text-blue-700">
      Go back
    </button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
</script>
