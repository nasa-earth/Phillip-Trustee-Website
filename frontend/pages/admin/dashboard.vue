<template>
    <div class="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Toast />
        <ConfirmDialog />
        <!-- Welcome Header Section -->
        <div
            class="flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm shadow-lg rounded-xl m-4 border border-white/20">
            <div class="space-y-2">
                <h2
                    class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Welcome back, {{ user?.name || 'User' }}
                </h2>
                <p class="text-slate-600 font-medium">{{ currentDate }}</p>
                <div class="flex items-center gap-3">
                    <Chip :label="user?.role || 'USER'" :class="{
                        'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg': user?.role === 'ADMIN',
                        'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg': user?.role === 'EDITOR'
                    }" class="text-xs font-semibold px-3 py-1 rounded-full" />

                </div>
            </div>
            <div class="flex gap-3">
                <Button icon="pi pi-sign-out" @click="handleLogout"
                    class="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                    rounded aria-label="Logout" />
            </div>
        </div>

        <!-- Admin Dashboard Content -->
        <div class="flex flex-1 mx-4 mb-4 gap-6">
            <!-- Left Side - Content Selection Menu -->
            <div class="w-72 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-white/20">
                <div class="pb-4 border-b border-slate-200/50">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <i class="pi pi-th-large text-blue-600"></i>
                        Admin Controls
                    </h3>
                    <p class="text-sm text-slate-500 mt-1">Manage your website content</p>
                </div>
                <ul class="mt-6 space-y-2">
                    <li v-for="(item, idx) in dashboardMenuItems" :key="idx" :class="[
                        'flex items-center px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 menu-item group',
                        activeSection === item.key
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105'
                            : 'hover:bg-slate-50 hover:shadow-md hover:transform hover:scale-102'
                    ]" @click="selectSection(item.key)" :data-section="item.key">
                        <i
                            :class="[item.icon, 'mr-3 text-lg', activeSection === item.key ? 'text-white' : 'text-slate-500 group-hover:text-blue-600']"></i>
                        <span class="text-sm font-semibold flex-1">{{ item.label }}</span>
                        <i v-if="activeSection === item.key" class="pi pi-chevron-right ml-auto text-white/80"></i>
                        <i v-else
                            class="pi pi-chevron-right ml-auto text-slate-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </li>
                </ul>
            </div>

            <!-- Right Side - Selected Content View -->
            <div class="flex-1 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-white/20">
                <!-- Component Loading Animation -->
                <div v-if="componentLoading" class="h-full flex items-center justify-center">
                    <div class="text-center">
                        <div class="relative">
                            <div
                                class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto">
                            </div>
                            <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-400 rounded-full animate-spin mx-auto"
                                style="animation-delay: 0.3s;"></div>
                        </div>
                        <span class="mt-4 block text-lg font-medium text-slate-600">Loading content...</span>
                        <span class="text-sm text-slate-400">Please wait a moment</span>
                    </div>
                </div>

                <!-- Users Section -->
                <div v-else-if="activeSection === 'users'" class="h-full">
                    <Transition name="fade" mode="out-in">
                        <UserManagement key="users-management" />
                    </Transition>
                </div>

                <!-- Events Section -->
                <div v-else-if="activeSection === 'events'" class="h-full">
                    <Transition name="fade" mode="out-in">
                        <EventsManagement key="events-management" />
                    </Transition>
                </div>

                <!-- Partners Section -->
                <div v-else-if="activeSection === 'partners'" class="h-full">
                    <Transition name="fade" mode="out-in">
                        <PartnersManagement key="partners-management" />
                    </Transition>
                </div>

                <!-- FAQs Section -->
                <div v-else-if="activeSection === 'faq'" class="h-full">
                    <Transition name="fade" mode="out-in">
                        <FaqsManagement key="faqs-management" />
                    </Transition>
                </div>

                <!-- Settings Section -->
                <div v-else-if="activeSection === 'settings'" class="h-full">
                    <Transition name="fade" mode="out-in">
                        <SettingsManagement key="settings-management" />
                    </Transition>
                </div>

                <!-- Dashboard View -->
                <div v-else-if="activeSection === 'dashboard'"
                    class="h-full flex flex-col items-center justify-center p-8 text-center">
                    <div class="w-full max-w-2xl">
                        <div class="mb-8">
                            <div
                                class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                                <i class="pi pi-chart-line text-3xl text-white"></i>
                            </div>
                            <h2
                                class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                                Admin Dashboard
                            </h2>
                            <p class="text-slate-600 text-lg">Select a section from the sidebar to manage your website
                                content.</p>
                        </div>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                            <div v-for="(item, idx) in dashboardMenuItems.slice(0, 6)" :key="idx"
                                @click="selectSection(item.key)"
                                class="group bg-gradient-to-br from-white to-slate-50 p-6 rounded-xl shadow-lg border border-slate-200/50 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:transform hover:scale-105 hover:border-blue-300">
                                <i
                                    :class="[item.icon, 'text-3xl mb-3 block text-blue-600 group-hover:text-indigo-600 transition-colors']"></i>
                                <h3 class="font-semibold text-slate-800 group-hover:text-slate-900">{{ item.label }}
                                </h3>
                                <p class="text-xs text-slate-500 mt-1 group-hover:text-slate-600">Manage {{
                                    item.label.toLowerCase() }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Welcome View -->
                <div v-else-if="activeSection === 'welcome'"
                    class="h-full flex flex-col items-center justify-center p-8 text-center">
                    <div class="w-full max-w-lg">
                        <div class="mb-8">
                            <div
                                class="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                                <i class="pi pi-star text-4xl text-white"></i>
                            </div>
                            <h2
                                class="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                Welcome to Admin Dashboard
                            </h2>
                            <p class="text-slate-600 text-lg leading-relaxed">
                                Take control of your website content with our powerful admin tools.
                                Select a section from the sidebar to get started.
                            </p>
                        </div>
                        <div
                            class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200/50">
                            <h3 class="font-semibold text-slate-800 mb-2">Quick Actions</h3>
                            <p class="text-sm text-slate-600">Navigate through the menu to manage users, events,
                                partners, and more.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import UserManagement from '~/components/admin/UserManagement.vue';
import EventsManagement from '~/components/admin/EventsManagement.vue';
import FaqsManagement from '~/components/admin/FaqsManagement.vue';
import PartnersManagement from '~/components/admin/PartnersManagement.vue';
import SettingsManagement from '~/components/admin/SettingsManagement.vue';

// Define layout and middleware for this page
definePageMeta({
    layout: 'admin/default',
    middleware: ['admin']
});

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();
const confirm = useConfirm();
const user = computed(() => authStore.user);
const loading = ref(false);
const componentLoading = ref(false);

// Dashboard menu state
const activeSection = ref('welcome');

// Format the current date
const currentDate = computed(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('en-US', options);
});

// Dashboard menu items
const dashboardMenuItems = ref([
    {
        key: 'dashboard',
        label: 'Dashboard',
        icon: 'pi pi-home'
    },
    {
        key: 'users',
        label: 'Users',
        icon: 'pi pi-users'
    },
    {
        key: 'events',
        label: 'Events',
        icon: 'pi pi-calendar'
    },
    {
        key: 'partners',
        label: 'Partners',
        icon: 'pi pi-briefcase'
    },

    {
        key: 'faq',
        label: 'FAQs',
        icon: 'pi pi-question-circle'
    },
    {
        key: 'settings',
        label: 'Settings',
        icon: 'pi pi-cog'
    },

]);



// Function to select dashboard section
const selectSection = async (sectionKey) => {
    componentLoading.value = true;

    try {
        // Add delay to show loading spinner (remove in production if not needed)
        await new Promise(resolve => setTimeout(resolve, 300));

        // Update the active section
        activeSection.value = sectionKey;

        // Log section change for debugging
        console.log(`Switched to section: ${sectionKey}`);

        // Allow the component to render fully before hiding loading spinner
        await nextTick();
    } catch (error) {
        console.error(`Error changing to section ${sectionKey}:`, error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load section', life: 3000 });
    } finally {
        componentLoading.value = false;
    }
};
const refreshData = () => {
    loading.value = true;
    toast.add({ severity: 'info', summary: 'Refreshing', detail: 'Updating dashboard data...', life: 3000 });

    // Simulate API call
    setTimeout(() => {
        loading.value = false;
        toast.add({ severity: 'success', summary: 'Updated', detail: 'Dashboard data refreshed', life: 3000 });
    }, 1000);
};

// Function to handle logout with confirmation
const handleLogout = () => {
    confirm.require({
        message: 'Are you sure you want to logout?',
        header: 'Logout Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'No',
        acceptLabel: 'Yes',
        accept: () => {
            // Perform logout
            authStore.logout();
            toast.add({
                severity: 'success',
                summary: 'Logged Out',
                detail: 'You have been successfully logged out',
                life: 3000
            });
            router.push('/login');
        },
        reject: () => {
            // User cancelled logout
            toast.add({
                severity: 'info',
                summary: 'Cancelled',
                detail: 'Logout cancelled',
                life: 2000
            });
        }
    });
};

// Check authentication and fetch data on mount
onMounted(() => {
    activeSection.value = 'dashboard';
    refreshData();
});

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
}

/* Menu item styles */
.menu-item {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: left center;
}

.menu-item:hover {
    transform: translateX(4px) scale(1.02);
}

/* Custom animations */
@keyframes pulse-glow {

    0%,
    100% {
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
    }

    50% {
        box-shadow: 0 0 30px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.3);
    }
}

.menu-item.active {
    animation: pulse-glow 2s infinite;
}

/* Glassmorphism effect */
.backdrop-blur-sm {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #3b82f6, #6366f1);
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #2563eb, #4f46e5);
}

/* Loading animation enhancement */
@keyframes spin-slow {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.animate-spin-slow {
    animation: spin-slow 3s linear infinite;
}

/* Hover effects for cards */
.hover\:scale-102:hover {
    transform: scale(1.02);
}

/* Gradient text enhancement */
.bg-clip-text {
    background-clip: text;
    -webkit-background-clip: text;
}
</style>
