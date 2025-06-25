<template>
    <div class="w-full bg-slate-50 min-h-screen">
        <Toast />
        <!-- Welcome Header Section -->
        <div class="flex justify-between items-center mb-8 p-6 bg-white rounded-xl shadow-sm">
            <div class="flex flex-col">
                <h2 class="text-2xl font-bold text-slate-800 mb-1">Welcome back, {{ user?.name || 'User' }}</h2>
                <p class="text-slate-500">{{ currentDate }}</p>
                <Chip :label="user?.role || 'ADMIN'"
                    :class="{ 'bg-indigo-600 text-white': user?.role === 'ADMIN', 'bg-blue-500 text-white': user?.role === 'EDITOR' }"
                    class="mt-2 w-min" />
            </div>
            <div class="flex gap-3">
                <Button icon="pi pi-refresh" @click="refreshData" rounded outlined aria-label="Refresh" />
                <Button icon="pi pi-bell" badge="3" severity="info" rounded outlined aria-label="Notifications" />
            </div>
        </div>

        <!-- Admin Dashboard Content -->
        <div class="flex gap-6">
            <!-- Left Side - Content Selection Menu -->
            <div class="w-64 bg-white rounded-xl shadow-sm p-4 h-fit">
                <div class="border-b border-slate-100 pb-3 mb-3">
                    <h3 class="text-lg font-semibold text-slate-800">Admin Controls</h3>
                </div>
                <ul class="space-y-2">
                    <li v-for="(item, idx) in dashboardMenuItems" :key="idx"
                        :class="{ 'bg-slate-100 text-indigo-600 font-medium': activeSection === item.key }"
                        class="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors duration-200"
                        @click="selectSection(item.key)">
                        <i :class="[item.icon, activeSection === item.key ? 'text-indigo-600' : 'text-slate-500']"></i>
                        <span>{{ item.label }}</span>
                    </li>
                </ul>
                <div class="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100 text-sm text-slate-600">
                    <div class="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>System Status: Online</span>
                </div>
            </div>

            <!-- Right Side - Selected Content View -->
            <div class="flex-1">
                <!-- Dashboard Overview -->
                <div v-if="activeSection === 'welcome'" class="space-y-6">
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-xl font-semibold text-slate-800">Dashboard Overview</h3>
                    </div>

                    <!-- Stats Cards -->
                    <DashboardStats :stats="dashboardStats" />

                    <!-- Quick Stats Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
                            <div class="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <i class="pi pi-eye text-blue-500 text-xl"></i>
                            </div>
                            <div>
                                <h4 class="text-xl font-bold text-slate-800">1,248</h4>
                                <span class="text-sm text-slate-500">Total Visits</span>
                            </div>
                        </div>
                        <div class="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
                            <div class="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                                <i class="pi pi-calendar text-amber-500 text-xl"></i>
                            </div>
                            <div>
                                <h4 class="text-xl font-bold text-slate-800">8</h4>
                                <span class="text-sm text-slate-500">Upcoming Events</span>
                            </div>
                        </div>
                        <div class="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
                            <div class="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                                <i class="pi pi-check-circle text-green-500 text-xl"></i>
                            </div>
                            <div>
                                <h4 class="text-xl font-bold text-slate-800">96%</h4>
                                <span class="text-sm text-slate-500">Task Completion</span>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Activity and Events Management -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <RecentActivity />
                        <EventsManagement :loading="false" />
                    </div>
                </div> <!-- Users Section -->
                <div v-if="activeSection === 'users'" class="space-y-4">
                    <h2 class="text-xl font-semibold text-slate-800 mb-4">User Management</h2>
                    <UserManagement />
                </div>

                <!-- Settings Section -->
                <div v-if="activeSection === 'settings'" class="space-y-4">
                    <h2 class="text-xl font-semibold text-slate-800 mb-4">Settings</h2>
                    <SettingsManagement />
                </div>

                <!-- Events Section -->
                <div v-if="activeSection === 'events'" class="space-y-4">
                    <h2 class="text-xl font-semibold text-slate-800 mb-4">Events Management</h2>
                    <EventsManagement :loading="false" />
                </div>

                <!-- Partners Section -->
                <div v-if="activeSection === 'partners'" class="space-y-4">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-semibold text-slate-800">Partners Management</h3>
                        <Button label="Add Partner" icon="pi pi-plus" severity="success" />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="(partner, idx) in partners" :key="idx"
                            class="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
                            <img :src="partner.logo" :alt="partner.name"
                                class="w-full h-40 object-cover object-center" />
                            <div class="p-4">
                                <h4 class="text-lg font-semibold text-slate-800 mb-1">{{ partner.name }}</h4>
                                <p class="text-sm text-slate-500 mb-4">{{ partner.type }}</p>
                                <div class="flex justify-end gap-2">
                                    <Button icon="pi pi-pencil" text rounded />
                                    <Button icon="pi pi-trash" text rounded severity="danger" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Settings Section -->
                <div class="dashboard-section" v-if="activeSection === 'settings'">
                    <div class="section-title">
                        <h2>Website Settings</h2>
                    </div>

                    <div class="section-content">
                        <SettingsManagement :loading="loading" @loading="setLoading" />
                    </div>
                </div>

                <!-- Events Section -->
                <div class="dashboard-section" v-if="activeSection === 'events'">
                    <div class="section-title">
                        <h2>Events Management</h2>
                    </div>

                    <div class="section-content">
                        <EventsManagement :loading="loading" @loading="setLoading" />
                    </div>
                </div>

                <!-- Partners Section -->
                <div v-if="activeSection === 'partners'" class="content-section">
                    <div class="section-header">
                        <h3>Partners Management</h3>
                        <Button label="Add Partner" icon="pi pi-plus" severity="success" />
                    </div>

                    <div class="partners-grid">
                        <div v-for="(partner, idx) in partners" :key="idx" class="partner-card">
                            <img :src="partner.logo" :alt="partner.name" class="partner-logo" />
                            <div class="partner-details">
                                <h4>{{ partner.name }}</h4>
                                <p class="partner-type">{{ partner.type }}</p>
                                <div class="partner-actions">
                                    <Button icon="pi pi-pencil" text rounded />
                                    <Button icon="pi pi-trash" text rounded severity="danger" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- FAQs Section -->
                <div v-if="activeSection === 'faq'" class="content-section">
                    <div class="section-header">
                        <h3>FAQ Management</h3>
                        <Button label="Add FAQ" icon="pi pi-plus" severity="success" />
                    </div>

                    <Accordion :multiple="true" class="faq-accordion">
                        <AccordionTab v-for="(faq, idx) in faqs" :key="idx" :header="faq.question">
                            <p class="faq-answer">{{ faq.answer }}</p>
                            <div class="faq-actions">
                                <Button label="Edit" icon="pi pi-pencil" text />
                                <Button label="Delete" icon="pi pi-trash" severity="danger" text />
                            </div>
                        </AccordionTab>
                    </Accordion>
                </div>

                <!-- Content Section -->
                <div v-if="activeSection === 'content'" class="content-section">
                    <div class="section-header">
                        <h3>Content Management</h3>
                    </div>
                    <TabView>
                        <TabPanel header="Posts">
                            <DataTable :value="recentPosts" class="content-table" :paginator="true" :rows="5"
                                responsiveLayout="scroll" stripedRows>
                                <Column field="title" header="Title" sortable></Column>
                                <Column field="category" header="Category" sortable>
                                    <template #body="{ data }">
                                        <Tag :value="data.category" severity="info" />
                                    </template>
                                </Column>
                                <Column field="date" header="Published" sortable></Column>
                                <Column field="author" header="Author"></Column>
                                <Column field="status" header="Status" sortable>
                                    <template #body="{ data }">
                                        <Tag :value="data.status" :severity="getStatusSeverity(data.status)" />
                                    </template>
                                </Column>
                                <Column header="Actions">
                                    <template #body>
                                        <div class="action-buttons-cell">
                                            <Button icon="pi pi-eye" rounded text severity="info" aria-label="View" />
                                            <Button icon="pi pi-pencil" rounded text severity="success"
                                                aria-label="Edit" />
                                            <Button icon="pi pi-trash" rounded text severity="danger"
                                                aria-label="Delete" />
                                        </div>
                                    </template>
                                </Column>
                            </DataTable>
                        </TabPanel>
                        <TabPanel header="Pages">
                            <DataTable :value="pages" class="content-table" :paginator="true" :rows="5"
                                responsiveLayout="scroll" stripedRows>
                                <Column field="title" header="Title" sortable></Column>
                                <Column field="slug" header="Slug" sortable></Column>
                                <Column field="lastUpdated" header="Last Updated" sortable></Column>
                                <Column field="status" header="Status" sortable>
                                    <template #body="{ data }">
                                        <Tag :value="data.status" :severity="getStatusSeverity(data.status)" />
                                    </template>
                                </Column>
                                <Column header="Actions">
                                    <template #body>
                                        <div class="action-buttons-cell">
                                            <Button icon="pi pi-eye" rounded text severity="info" aria-label="View" />
                                            <Button icon="pi pi-pencil" rounded text severity="success"
                                                aria-label="Edit" />
                                            <Button icon="pi pi-trash" rounded text severity="danger"
                                                aria-label="Delete" />
                                        </div>
                                    </template>
                                </Column>
                            </DataTable>
                        </TabPanel>
                    </TabView>
                </div>

                <!-- Posts Section -->
                <div class="dashboard-section" v-if="activeSection === 'posts'">
                    <div class="section-title">
                        <h2>Blog Posts</h2>
                    </div>

                    <div class="section-content">
                        <PostsManagement :loading="loading" @loading="setLoading" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import UserManagement from '~/components/admin/UserManagement.vue';
import DashboardStats from '~/components/admin/DashboardStats.vue';
import RecentActivity from '~/components/admin/RecentActivity.vue';
import SettingsManagement from '~/components/admin/SettingsManagement.vue';
import EventsManagement from '~/components/admin/EventsManagement.vue';

// Define layout and middleware for this page
definePageMeta({
    layout: 'admin/default',
    middleware: ['admin']
});

const toast = useToast();

// Mock user data
const user = ref({
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'ADMIN'
});

// Dashboard data for stats component
const dashboardStats = ref({
    users: 42,
    posts: 128,
    publishedPosts: 96,
    events: 24,
    publishedEvents: 18,
    partners: 15,
    pages: 12,
    faqs: 36,
    categories: 8
});

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
        key: 'welcome',
        label: 'Dashboard',
        icon: 'pi pi-home'
    },
    {
        key: 'users',
        label: 'Users',
        icon: 'pi pi-users'
    },
    {
        key: 'posts',
        label: 'Blog Posts',
        icon: 'pi pi-file-edit'
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
        key: 'settings',
        label: 'Settings',
        icon: 'pi pi-cog'
    }
]);

// Mock partners data
const partners = ref([
    {
        id: 1,
        name: 'Acme Corporation',
        type: 'Technology Partner',
        logo: '/images/partners/1_Rose_Mavel.jpg'
    },
    {
        id: 2,
        name: 'Global Finances',
        type: 'Financial Partner',
        logo: '/images/partners/2_La_Maision.jpg'
    },
    {
        id: 3,
        name: 'Eco Solutions',
        type: 'Sustainability Partner',
        logo: '/images/partners/3_Vimean_Samnang.jpg'
    },
    {
        id: 4,
        name: 'MediaTech',
        type: 'Media Partner',
        logo: '/images/partners/4_IPS.jpg'
    },
    {
        id: 5,
        name: 'InnoVate Group',
        type: 'Innovation Partner',
        logo: '/images/partners/5_SaRaNa.jpg'
    }
]);

// Function to handle section selection
const selectSection = (section) => {
    activeSection.value = section;
};

// Function to handle data refresh
const refreshData = () => {
    toast.add({
        severity: 'success',
        summary: 'Refreshed',
        detail: 'Dashboard data has been refreshed',
        life: 3000
    });
};
</script>

<style>
@import '~/assets/css/dashboard.css';
</style>
