<template>
    <div class="container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-xs p-4">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-gray-600 text-lg font-semibold">Content Management</h2>
                <button
                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                    @click="createNewContent" :disabled="isLoading">
                    Add New Content
                </button>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                {{ error }}
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="flex justify-center items-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>

            <!-- Content List -->
            <div v-else class="overflow-x-auto">
                <table class="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Title
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Created At
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="contents.length === 0">
                            <td colspan="4" class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                No content available
                            </td>
                        </tr>
                        <tr v-for="content in contents" :key="content.id" class="hover:bg-gray-50">
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                {{ content.title }}
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="px-2 py-1 text-xs rounded"
                                    :class="content.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                                    {{ content.published ? 'Published' : 'Draft' }}
                                </span>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                {{ formatDate(content.createdAt) }}
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <NuxtLink :to="`/admin/content/${content.id}`"
                                    class="text-blue-600 hover:text-blue-900 mr-3">
                                    Edit
                                </NuxtLink>
                                <button class="text-red-600 hover:text-red-900" @click="deleteContent(content.id)">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useApi } from '~/composables/useApi'

interface Content {
    id: number
    title: string
    published: boolean
    createdAt: string
}

const auth = useAuth()
const api = useApi()
const contents = ref<Content[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

// Add page meta for authentication
definePageMeta({
    middleware: ['auth'],
    layout: 'admin',
    requiresAuth: true,
    roles: ['ADMIN']
})

function formatDate(date: string) {
    return new Date(date).toLocaleDateString()
}

async function fetchContents() {
    isLoading.value = true
    error.value = null
    try {
        const response = await fetch('http://localhost:3005/api/posts', {
            headers: {
                'Authorization': `Bearer ${auth.accessToken}`,
            },
        })
        if (!response.ok) throw new Error('Failed to fetch content')
        const data = await response.json()
        contents.value = data
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to fetch content'
        console.error('Error fetching content:', err)
    } finally {
        isLoading.value = false
    }
}

async function createNewContent() {
    try {
        const response = await fetch('http://localhost:3005/api/posts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${auth.accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'New Content',
                content: '',
                published: false
            })
        })
        if (!response.ok) throw new Error('Failed to create content')
        await fetchContents() // Refresh the list
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to create content'
        console.error('Error creating content:', err)
    }
}

async function deleteContent(id: number) {
    if (!confirm('Are you sure you want to delete this content?')) return

    try {
        const response = await fetch(`http://localhost:3005/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${auth.accessToken}`,
            },
        })
        if (!response.ok) throw new Error('Failed to delete content')
        await fetchContents() // Refresh the list
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to delete content'
        console.error('Error deleting content:', err)
    }
}

onMounted(fetchContents)
</script>

<style scoped>
.loader {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
