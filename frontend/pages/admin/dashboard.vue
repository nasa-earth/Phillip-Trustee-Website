<template>
    <div class="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Toast />
        <ConfirmDialog />
        <!-- Welcome Header Section -->
        <div class="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl m-4 border border-white/20 overflow-hidden">
            <div class="flex items-center justify-between p-6 gap-4">
                <!-- Left Side - Company Logo -->
                <div class="flex-shrink-0">
                    <img src="/images/logo/phillip trustee.png" alt="Phillip Trustee Logo"
                        class="h-25 w-auto object-contain" />
                </div>

                <!-- Center - User Welcome, Date & Role -->
                <div class="flex-1 text-center space-y-3">
                    <!-- User Welcome -->
                    <h2
                        class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Welcome back, {{ user?.name || 'User' }}
                    </h2>

                    <!-- Current Date -->
                    <p class="text-slate-600 font-medium text-lg">{{ currentDate }}</p>

                    <!-- User Role Badge -->
                    <div class="flex justify-center">
                        <Chip :label="user?.role || 'USER'" :class="{
                            'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg': user?.role === 'ADMIN',
                            'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg': user?.role === 'EDITOR',
                            // 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg': user?.role === 'USER'
                        }" class="text-xs font-semibold px-4 py-2 rounded-full shadow-md" />
                    </div>
                </div>

                <!-- Right Side - Logout Button -->
                <div class="flex-shrink-0">
                    <Button icon="pi pi-sign-out" @click="handleLogout"
                        class="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                        rounded aria-label="Logout" v-tooltip="'Logout'" />
                </div>
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
                    <!-- <p class="text-sm text-slate-500 mt-1">Manage your website content</p> -->
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
                        <span class="mt-4 block text-lg font-medium text-slate-600">Loading {{
                            getSectionDisplayName(activeSection) }}...</span>
                        <span class="text-sm text-slate-400">Please wait a moment</span>

                        <!-- Emergency reset button after 5 seconds -->
                        <div class="mt-6" v-if="showEmergencyReset">
                            <Button label="Something stuck? Click here to reset" icon="pi pi-refresh"
                                @click="emergencyResetLoading"
                                class="p-button-text p-button-sm text-red-600 hover:text-red-700" />
                        </div>
                    </div>
                </div>

                <!-- Users Section -->
                <div v-else-if="activeSection === 'users'" class="h-full">
                    <Transition name="fade" mode="out-in">
                        <Suspense>
                            <template #default>
                                <UserManagement key="users-management" />
                            </template>
                            <template #fallback>
                                <div class="h-full flex items-center justify-center">
                                    <div class="text-center">
                                        <div
                                            class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4">
                                        </div>
                                        <p class="text-gray-600">Loading Users Management...</p>
                                    </div>
                                </div>
                            </template>
                        </Suspense>
                    </Transition>
                </div>

                <!-- Events Section -->
                <div v-else-if="activeSection === 'events'" class="h-full">
                    <Transition name="fade" mode="out-in">
                        <Suspense>
                            <template #default>
                                <EventsManagement key="events-management" />
                            </template>
                            <template #fallback>
                                <div class="h-full flex items-center justify-center">
                                    <div class="text-center">
                                        <div
                                            class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4">
                                        </div>
                                        <p class="text-gray-600">Loading Events Management...</p>
                                    </div>
                                </div>
                            </template>
                        </Suspense>
                    </Transition>
                </div>

                <!-- Partners Section -->
                <div v-else-if="activeSection === 'partners'" class="h-full">
                    <Transition name="fade" mode="out-in">
                        <Suspense>
                            <template #default>
                                <PartnersManagement key="partners-management" />
                            </template>
                            <template #fallback>
                                <div class="h-full flex items-center justify-center">
                                    <div class="text-center">
                                        <div
                                            class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4">
                                        </div>
                                        <p class="text-gray-600">Loading Partners Management...</p>
                                    </div>
                                </div>
                            </template>
                        </Suspense>
                    </Transition>
                </div>

                <!-- FAQs Section -->
                <div v-else-if="activeSection === 'faq'" class="h-full">
                    <Transition name="fade" mode="out-in">
                        <Suspense>
                            <template #default>
                                <FaqsManagement key="faqs-management" />
                            </template>
                            <template #fallback>
                                <div class="h-full flex items-center justify-center">
                                    <div class="text-center">
                                        <div
                                            class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4">
                                        </div>
                                        <p class="text-gray-600">Loading FAQs Management...</p>
                                    </div>
                                </div>
                            </template>
                        </Suspense>
                    </Transition>
                </div>

                <!-- Settings Section -->
                <div v-else-if="activeSection === 'settings'" class="h-full">
                    <Transition name="fade" mode="out-in">
                        <Suspense>
                            <template #default>
                                <SettingsManagement key="settings-management" />
                            </template>
                            <template #fallback>
                                <div class="h-full flex items-center justify-center">
                                    <div class="text-center">
                                        <div
                                            class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4">
                                        </div>
                                        <p class="text-gray-600">Loading Settings...</p>
                                    </div>
                                </div>
                            </template>
                        </Suspense>
                    </Transition>
                </div>

                <!-- Dashboard View -->
                <div v-else-if="activeSection === 'dashboard'" class="h-full overflow-y-auto">
                    <div class="max-w-7xl mx-auto">
                        <!-- Dashboard Header -->
                        <div class="flex justify-between items-center mb-6">
                            <div>
                                <h2 class="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                            </div>
                            <Button label="Refresh Data" icon="pi pi-refresh" @click="refreshDashboardData"
                                :loading="dashboardLoading" class="bg-blue-600 hover:bg-blue-700" />
                        </div>

                        <!-- Loading State -->
                        <div v-if="dashboardLoading" class="flex justify-center items-center h-64">
                            <div class="text-center">
                                <div
                                    class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4">
                                </div>
                                <p class="text-gray-600">Loading dashboard data...</p>
                            </div>
                        </div>

                        <!-- Dashboard Content -->
                        <div v-else class="space-y-6">
                            <!-- Stats Cards -->
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <!-- Events Card -->
                                <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <p class="text-xl font-medium text-black">Events</p>
                                            <p class="text-2xl font-bold text-gray-900">{{ dashboardStats.events.total
                                            }}
                                            </p>
                                        </div>
                                        <div class="p-3 bg-blue-100 rounded-full">
                                            <i class="pi pi-calendar text-blue-600 text-xl"></i>
                                        </div>
                                    </div>

                                </div>

                                <!-- Users Card -->
                                <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <p class="text-xl font-medium text-black">Users</p>
                                            <p class="text-2xl font-bold text-gray-900">{{ dashboardStats.users.total }}
                                            </p>
                                        </div>
                                        <div class="p-3 bg-green-100 rounded-full">
                                            <i class="pi pi-users text-green-600 text-xl"></i>
                                        </div>
                                    </div>
                                    <div class="mt-4">
                                        <span class="text-lg text-blue-600">{{ dashboardStats.users.admins }}
                                            admins</span>
                                        <span class="text-lg text-gray-800 ml-2">{{ dashboardStats.users.editors }}
                                            editors</span>
                                    </div>
                                </div>

                                <!-- Partners Card -->
                                <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <p class="text-xl font-medium text-black">Partners</p>
                                            <p class="text-2xl font-bold text-gray-900">{{ dashboardStats.partners.total
                                            }}</p>
                                        </div>
                                        <div class="p-3 bg-purple-100 rounded-full">
                                            <i class="pi pi-briefcase text-purple-600 text-xl"></i>
                                        </div>
                                    </div>

                                </div>

                                <!-- FAQs Card -->
                                <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <p class="text-xl font-medium text-black">FAQs</p>
                                            <p class="text-2xl font-bold text-gray-900">{{ dashboardStats.faqs.total }}
                                            </p>
                                        </div>
                                        <div class="p-3 bg-yellow-100 rounded-full">
                                            <i class="pi pi-question-circle text-yellow-600 text-xl"></i>
                                        </div>
                                    </div>
                                    <div class="mt-4">
                                        <span class="text-lg text-blue-600">{{ dashboardStats.faqs.categories }}
                                            categories</span>
                                    </div>
                                </div>
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
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { useDashboardService } from '~/composables/useDashboardService';
import { useDashboardEvents } from '~/composables/useDashboardEvents';
import UserManagement from '~/components/admin/UserManagement.vue';
import EventsManagement from '~/components/admin/EventsManagement.vue';
import FaqsManagement from '~/components/admin/FaqsManagement.vue';
import PartnersManagement from '~/components/admin/PartnersManagement.vue';
import SettingsManagement from '~/components/admin/SettingsManagement.vue';

// Define layout and middleware for this page
definePageMeta({
    layout: 'default',
    middleware: ['admin']
});

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();
const confirm = useConfirm();
const dashboardService = useDashboardService();
const dashboardEvents = useDashboardEvents();

const user = computed(() => authStore.user);
const loading = ref(false);
const componentLoading = ref(false);
const dashboardLoading = ref(false);
const showEmergencyReset = ref(false);
const autoRefreshEnabled = ref(true);
const refreshInterval = ref(30000); // 30 seconds
let loadingTimeout = null; // Add timeout reference
let emergencyTimeout = null; // Emergency reset timeout
let autoRefreshTimer = null; // Auto refresh timer

// Dashboard data
const dashboardStats = ref({
    events: { total: 0 },
    users: { total: 0, admins: 0, editors: 0 },
    partners: { total: 0 },
    faqs: { total: 0, categories: 0 }
});

const recentActivities = ref([]);
const systemHealth = ref({
    database: 'unknown',
    api: 'unknown',
    uptime: 0,
    memoryUsage: { used: 0, total: 0 }
});

// Dashboard menu state
const activeSection = ref('dashboard');

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
    // {
    //     key: 'settings',
    //     label: 'Settings',
    //     icon: 'pi pi-cog'
    // },

]);



// Function to select dashboard section
const selectSection = async (sectionKey) => {
    // Prevent switching if already loading and clicking same section
    if (componentLoading.value && activeSection.value === sectionKey) {
        return;
    }

    // Clear any existing timeout
    if (loadingTimeout) {
        clearTimeout(loadingTimeout);
        loadingTimeout = null;
    }

    // Clear emergency timeout
    if (emergencyTimeout) {
        clearTimeout(emergencyTimeout);
        emergencyTimeout = null;
    }

    componentLoading.value = true;
    showEmergencyReset.value = false;

    // Show emergency reset button after 5 seconds
    emergencyTimeout = setTimeout(() => {
        if (componentLoading.value) {
            showEmergencyReset.value = true;
        }
    }, 5000);

    // Set a safety timeout to prevent infinite loading
    loadingTimeout = setTimeout(() => {
        if (componentLoading.value) {
            console.warn(`Loading timeout for section: ${sectionKey}`);
            componentLoading.value = false;
            toast.add({
                severity: 'warn',
                summary: 'Loading Timeout',
                detail: `${getSectionDisplayName(sectionKey)} took too long to load`,
                life: 3000
            });
        }
    }, 8000); // 8 second timeout to account for async component loading

    try {
        // Update the active section immediately
        activeSection.value = sectionKey;

        // Log section change for debugging
        console.log(`Switching to section: ${sectionKey}`);

        // For Partners section, add extra safeguards
        if (sectionKey === 'partners') {
            // Force reset loading after component should be mounted
            setTimeout(() => {
                if (componentLoading.value) {
                    console.log('Force resetting Partners component loading state');
                    componentLoading.value = false;
                }
            }, 3000);
        }

        // Add a small delay to show loading spinner
        await new Promise(resolve => setTimeout(resolve, 100));

        // Allow the component to render fully before hiding loading spinner
        await nextTick();

        console.log(`Successfully switched to section: ${sectionKey}`);
    } catch (error) {
        console.error(`Error changing to section ${sectionKey}:`, error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: `Failed to load ${getSectionDisplayName(sectionKey)}`,
            life: 5000
        });

        // If there's an error, revert to dashboard
        activeSection.value = 'dashboard';
    } finally {
        // Clear timeout and ensure loading is turned off
        if (loadingTimeout) {
            clearTimeout(loadingTimeout);
            loadingTimeout = null;
        }
        if (emergencyTimeout) {
            clearTimeout(emergencyTimeout);
            emergencyTimeout = null;
        }
        componentLoading.value = false;
        showEmergencyReset.value = false;
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

// Fetch dashboard data
const fetchDashboardData = async () => {
    try {
        dashboardLoading.value = true;

        const summaryData = await dashboardService.getSummaryData();

        if (summaryData.stats) {
            dashboardStats.value = summaryData.stats;
        }

        if (summaryData.activities) {
            recentActivities.value = summaryData.activities;
        }

        if (summaryData.health) {
            systemHealth.value = summaryData.health;
        }

        console.log('Dashboard data loaded successfully');
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load dashboard data',
            life: 3000
        });
    } finally {
        dashboardLoading.value = false;
    }
};

// Refresh dashboard data
const refreshDashboardData = async () => {
    await fetchDashboardData();
    toast.add({
        severity: 'success',
        summary: 'Refreshed',
        detail: 'Dashboard data has been updated',
        life: 3000
    });
};

// Auto-refresh functionality
const startAutoRefresh = () => {
    if (autoRefreshTimer) {
        clearInterval(autoRefreshTimer);
    }

    if (autoRefreshEnabled.value) {
        autoRefreshTimer = setInterval(async () => {
            console.log('Auto-refreshing dashboard data...');
            try {
                await fetchDashboardData();
                console.log('Dashboard auto-refresh completed');
            } catch (error) {
                console.error('Auto-refresh failed:', error);
            }
        }, refreshInterval.value);
        console.log(`Auto-refresh started with ${refreshInterval.value}ms interval`);
    }
};

const stopAutoRefresh = () => {
    if (autoRefreshTimer) {
        clearInterval(autoRefreshTimer);
        autoRefreshTimer = null;
        console.log('Auto-refresh stopped');
    }
};

const toggleAutoRefresh = () => {
    autoRefreshEnabled.value = !autoRefreshEnabled.value;
    if (autoRefreshEnabled.value) {
        startAutoRefresh();
        toast.add({
            severity: 'info',
            summary: 'Auto-refresh enabled',
            detail: 'Dashboard will update every 30 seconds',
            life: 3000
        });
    } else {
        stopAutoRefresh();
        toast.add({
            severity: 'info',
            summary: 'Auto-refresh disabled',
            detail: 'Dashboard will only update manually',
            life: 3000
        });
    }
};

// Force refresh - useful when content is created/updated
const forceRefresh = async () => {
    console.log('Force refreshing dashboard...');
    dashboardLoading.value = true;
    try {
        await fetchDashboardData();
        toast.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Dashboard refreshed with latest data',
            life: 2000
        });
    } catch (error) {
        console.error('Force refresh failed:', error);
        toast.add({
            severity: 'error',
            summary: 'Refresh Failed',
            detail: 'Could not update dashboard data',
            life: 3000
        });
    } finally {
        dashboardLoading.value = false;
    }
};

// Utility functions
const getActivityIcon = (action) => {
    const icons = {
        'create': 'pi pi-plus',
        'update': 'pi pi-pencil',
        'delete': 'pi pi-trash',
        'login': 'pi pi-sign-in',
        'logout': 'pi pi-sign-out'
    };
    return icons[action] || 'pi pi-circle';
};

const getHealthStatusClass = (status) => {
    const classes = {
        'healthy': 'bg-green-100 text-green-800',
        'warning': 'bg-yellow-100 text-yellow-800',
        'error': 'bg-red-100 text-red-800',
        'unknown': 'bg-gray-100 text-gray-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const formatUptime = (seconds) => {
    if (!seconds) return 'Unknown';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
};

const formatMemoryUsage = (memory) => {
    if (!memory || !memory.total) return 'Unknown';
    const usedMB = Math.round(memory.used / 1024 / 1024);
    const totalMB = Math.round(memory.total / 1024 / 1024);
    return `${usedMB}MB / ${totalMB}MB`;
};

const formatSessionTime = () => {
    // Calculate session time since login or page load
    const sessionStart = authStore.loginTime || Date.now() - (1000 * 60 * 30); // fallback to 30 min ago
    const now = Date.now();
    const sessionDuration = Math.floor((now - sessionStart) / 1000 / 60); // minutes

    if (sessionDuration < 60) {
        return `${sessionDuration}m`;
    } else {
        const hours = Math.floor(sessionDuration / 60);
        const minutes = sessionDuration % 60;
        return `${hours}h ${minutes}m`;
    }
};

// Helper function to get section display name
const getSectionDisplayName = (sectionKey) => {
    const sectionNames = {
        'dashboard': 'Dashboard',
        'users': 'Users Management',
        'events': 'Events Management',
        'partners': 'Partners Management',
        'faq': 'FAQs Management',
        'settings': 'Settings',
        'welcome': 'Welcome'
    };
    return sectionNames[sectionKey] || 'Content';
};

// Force reset loading state (for debugging)
const forceResetLoading = () => {
    console.log('Force resetting loading state');
    if (loadingTimeout) {
        clearTimeout(loadingTimeout);
        loadingTimeout = null;
    }
    if (emergencyTimeout) {
        clearTimeout(emergencyTimeout);
        emergencyTimeout = null;
    }
    componentLoading.value = false;
    showEmergencyReset.value = false;
    toast.add({
        severity: 'info',
        summary: 'Reset',
        detail: 'Loading state has been reset',
        life: 2000
    });
};

// Emergency reset loading (user-triggered)
const emergencyResetLoading = () => {
    console.log('Emergency reset triggered by user');
    forceResetLoading();
    toast.add({
        severity: 'warn',
        summary: 'Emergency Reset',
        detail: 'Loading was manually reset. If this keeps happening, please refresh the page.',
        life: 5000
    });
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
onMounted(async () => {
    console.log('Dashboard component mounted');
    activeSection.value = 'dashboard';

    try {
        await fetchDashboardData();
        // Start auto-refresh after initial load
        startAutoRefresh();

        // Listen for dashboard refresh events from other components
        dashboardEvents.onDashboardRefresh(() => {
            console.log('Received dashboard refresh event');
            forceRefresh();
        });

    } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        // Don't block the dashboard if data fetch fails
        toast.add({
            severity: 'warn',
            summary: 'Warning',
            detail: 'Some dashboard data could not be loaded',
            life: 3000
        });
        // Still start auto-refresh even if initial load fails
        startAutoRefresh();

        // Still setup event listeners
        dashboardEvents.onDashboardRefresh(() => {
            console.log('Received dashboard refresh event');
            forceRefresh();
        });
    }
});

// Watch for activeSection changes to ensure loading state is properly managed
watch(activeSection, (newSection, oldSection) => {
    console.log(`Section changed from ${oldSection} to ${newSection}`);

    // If section changed but componentLoading is still true after a delay, reset it
    setTimeout(() => {
        if (componentLoading.value) {
            console.warn(`Resetting stuck loading state for section: ${newSection}`);
            componentLoading.value = false;
        }
    }, 6000); // Increased timeout for Suspense
});

// Watch componentLoading to debug loading issues
watch(componentLoading, (newValue, oldValue) => {
    console.log(`Component loading changed: ${oldValue} -> ${newValue}`);
});

// Handle Suspense component errors
const handleComponentError = (error, sectionName) => {
    console.error(`Error in ${sectionName} component:`, error);
    componentLoading.value = false;
    toast.add({
        severity: 'error',
        summary: 'Component Error',
        detail: `Failed to load ${sectionName}. Please try again.`,
        life: 5000
    });
    // Revert to dashboard on error
    activeSection.value = 'dashboard';
};

// Cleanup on unmount
onUnmounted(() => {
    if (loadingTimeout) {
        clearTimeout(loadingTimeout);
        loadingTimeout = null;
    }
    if (emergencyTimeout) {
        clearTimeout(emergencyTimeout);
        emergencyTimeout = null;
    }
    // Stop auto-refresh when component unmounts
    stopAutoRefresh();

    // Remove event listeners
    dashboardEvents.offDashboardRefresh(forceRefresh);
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
