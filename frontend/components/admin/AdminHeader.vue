<template>
    <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div class="flex items-center">
                <h1 class="text-xl font-semibold text-gray-900">{{ title }}</h1>
                <span v-if="auth.user"
                    class="ml-4 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {{ auth.user.role }}
                </span>
            </div>

            <div class="flex items-center">
                <span v-if="auth.user" class="text-sm text-gray-700 mr-4">
                    {{ auth.user.name }}
                </span>
                <button @click="handleLogout" :disabled="isLoading"
                    class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50">
                    <span v-if="isLoading">Logging out...</span>
                    <span v-else>Logout</span>
                </button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const auth = useAuth()
const router = useRouter()
const isLoading = ref(false)

interface Props {
    title?: string
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Dashboard'
})

async function handleLogout() {
    try {
        isLoading.value = true
        auth.logout()
        await router.push('/auth/login')
    } catch (error) {
        console.error('Logout error:', error)
    } finally {
        isLoading.value = false
    }
}
</script>
