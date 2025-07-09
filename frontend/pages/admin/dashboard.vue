<template>
    <div class="flex flex-col min-h-screen bg-gray-50">
        <Toast />
        <ConfirmDialog />
        <!-- Welcome Header Section -->
        <div class="flex justify-between items-center p-6 bg-white shadow-sm rounded-lg m-4">
            <div class="space-y-1">
                <h2 class="text-2xl font-semibold text-gray-800">Welcome back, {{ user?.name || 'User' }}</h2>
                <p class="text-gray-500">{{ currentDate }}</p>
                <Chip :label="user?.role || 'USER'"
                    :class="{ 'bg-indigo-600 text-white': user?.role === 'ADMIN', 'bg-blue-500 text-white': user?.role === 'EDITOR' }"
                    class="text-xs font-medium" />
            </div>
            <div class="flex gap-2">
                <Button icon="pi pi-refresh" @click="refreshData" rounded outlined aria-label="Refresh" />
                <!-- <Button icon="pi pi-bell" badge="3" severity="info" rounded outlined aria-label="Notifications" /> -->
                <Button icon="pi pi-sign-out" @click="handleLogout" severity="danger" rounded outlined
                    aria-label="Logout" />
            </div>
        </div>

        <!-- Admin Dashboard Content -->
        <div class="flex flex-1 mx-4 mb-4 gap-4">
            <!-- Left Side - Content Selection Menu -->
            <div class="w-64 bg-white rounded-lg shadow-sm p-4">
                <div class="pb-4 border-b border-gray-200">
                    <h3 class="text-lg font-medium text-gray-800">Admin Controls</h3>
                </div>
                <ul class="mt-4 space-y-1">
                    <li v-for="(item, idx) in dashboardMenuItems" :key="idx" :class="[
                        'flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors menu-item',
                        activeSection === item.key ? 'bg-blue-50 text-blue-600 shadow-sm' : 'hover:bg-gray-100'
                    ]" @click="selectSection(item.key)" :data-section="item.key">
                        <i
                            :class="[item.icon, 'mr-3', activeSection === item.key ? 'text-blue-600' : 'text-gray-500']"></i>
                        <span class="text-sm font-medium">{{ item.label }}</span>
                        <i v-if="activeSection === item.key" class="pi pi-chevron-right ml-auto text-blue-500"></i>
                    </li>
                </ul>
            </div>

            <!-- Right Side - Selected Content View -->
            <div class="flex-1 bg-white rounded-lg shadow-sm p-4">
                <!-- Component Loading Animation -->
                <div v-if="componentLoading" class="h-full flex items-center justify-center">
                    <i class="pi pi-spinner pi-spin text-4xl text-blue-500"></i>
                    <span class="ml-2 text-lg text-gray-600">Loading content...</span>
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
                    <div class="w-full max-w-md">
                        <h2 class="text-2xl font-bold text-blue-700 mb-4">Admin Dashboard</h2>
                        <p class="text-gray-600 mb-6">Select a section from the sidebar to manage your website content.
                        </p>
                        <div class="grid grid-cols-2 gap-4 mt-4">
                            <div v-for="(item, idx) in dashboardMenuItems.slice(0, 6)" :key="idx"
                                @click="selectSection(item.key)"
                                class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                                <i :class="[item.icon, 'text-2xl text-blue-600 mb-2']"></i>
                                <h3 class="font-medium">{{ item.label }}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Welcome View -->
                <div v-else-if="activeSection === 'welcome'"
                    class="h-full flex flex-col items-center justify-center p-8 text-center">
                    <div class="w-full max-w-md">
                        <h2 class="text-2xl font-bold text-blue-700 mb-4">Welcome to Admin Dashboard</h2>
                        <p class="text-gray-600 mb-6">Select a section from the sidebar to manage your website content.
                        </p>
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



// Function to refresh data
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
            // Redirect to login page
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
    // Authentication check is handled by middleware

    // Set initial section to dashboard
    activeSection.value = 'dashboard';

    // Fetch data for dashboard (simulated)
    refreshData();
});
</script>

<style scoped>
/* Transition animations */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Menu item styles */
.menu-item {
    transition: all 0.2s ease;
}

.menu-item:hover {
    transform: translateX(3px);
}
</style>
