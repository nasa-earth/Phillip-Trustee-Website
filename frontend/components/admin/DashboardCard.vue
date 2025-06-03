<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-start mb-4">
            <div>
                <h2 class="text-xl font-semibold text-gray-900">{{ title }}</h2>
                <p class="text-gray-600 mt-1">{{ description }}</p>
            </div>
            <div v-if="count !== undefined" class="text-2xl font-bold text-blue-600">
                {{ count }}
            </div>
        </div>
        <div class="mt-4">
            <NuxtLink :to="link"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Manage {{ title }}
                <svg class="ml-2 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string
    description: string
    link: string
    count?: number
}>()
</script>
