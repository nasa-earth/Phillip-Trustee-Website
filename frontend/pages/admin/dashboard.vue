<template>
    <div class="dashboard">
        <Toast />
        <!-- Welcome Header Section -->
        <div class="dashboard-header">
            <div class="welcome-container">
                <h2 class="welcome-message">Welcome back, {{ user?.name || 'User' }}</h2>
                <p class="date-message">{{ currentDate }}</p>
                <Chip :label="user?.role || 'USER'"
                    :class="{ 'bg-indigo-600 text-white': user?.role === 'ADMIN', 'bg-blue-500 text-white': user?.role === 'EDITOR' }"
                    class="role-chip" />
            </div>
            <div class="action-buttons">
                <Button icon="pi pi-refresh" @click="refreshData" rounded outlined aria-label="Refresh" />
                <Button icon="pi pi-bell" badge="3" severity="info" rounded outlined aria-label="Notifications" />
            </div>
        </div>

        <!-- Stats Overview -->
        <div class="stats-grid">
            <div v-for="(stat, index) in stats" :key="index" class="stat-card">
                <div class="stat-icon" :style="{ backgroundColor: stat.bgColor }">
                    <i :class="stat.icon"></i>
                </div>
                <div class="stat-content">
                    <h3 class="stat-value">{{ stat.value }}</h3>
                    <p class="stat-label">{{ stat.label }}</p>
                    <div class="stat-trend" :class="stat.trend > 0 ? 'positive' : 'negative'" v-if="stat.trend">
                        <i :class="stat.trend > 0 ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                        <span>{{ Math.abs(stat.trend) }}%</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Activities -->
        <div class="section">
            <div class="section-header">
                <h3>Recent Activities</h3>
                <Button label="View All" icon="pi pi-external-link" link />
            </div>
            <div class="activity-list">
                <Timeline :value="activities" class="custom-timeline">
                    <template #content="slotProps">
                        <Card class="activity-card">
                            <template #header>
                                <div class="activity-header">
                                    <Avatar :image="slotProps.item.avatar" shape="circle" />
                                    <span class="activity-time">{{ slotProps.item.time }}</span>
                                </div>
                            </template>
                            <template #title>
                                {{ slotProps.item.title }}
                            </template>
                            <template #content>
                                <p>{{ slotProps.item.text }}</p>
                                <Tag :value="slotProps.item.type" :severity="getTagSeverity(slotProps.item.type)" />
                            </template>
                        </Card>
                    </template>
                </Timeline>
            </div>
        </div>

        <!-- Management Modules -->
        <div class="section management-section">
            <div class="section-header">
                <h3>Management Modules</h3>
            </div>
            <div class="management-grid">
                <div v-for="(module, index) in managementModules" :key="index" class="management-card"
                    @click="navigateToModule(module.route)">
                    <div class="module-icon">
                        <i :class="module.icon"></i>
                    </div>
                    <h4>{{ module.title }}</h4>
                    <p>{{ module.description }}</p>
                    <div class="module-stats">
                        <span class="module-count">{{ module.count }}</span>
                        <Button :label="'Manage ' + module.title" icon="pi pi-arrow-right" link />
                    </div>
                </div>
            </div>
        </div>

        <!-- Admin Controls (Admin Only) -->
        <div v-if="user?.role === 'ADMIN'" class="section">
            <div class="section-header">
                <h3>Admin Controls</h3>
            </div>
            <div class="admin-controls-grid">
                <div v-for="(control, index) in adminControls" :key="index" class="admin-control-card">
                    <div class="control-icon" :style="{ backgroundColor: control.bgColor }">
                        <i :class="control.icon"></i>
                    </div>
                    <div class="control-content">
                        <h4>{{ control.title }}</h4>
                        <p>{{ control.description }}</p>
                        <Button :label="control.buttonText" :severity="control.severity" @click="control.action" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Actions for All Users -->
        <div class="section">
            <div class="section-header">
                <h3>Quick Actions</h3>
            </div>
            <div class="quick-actions-grid">
                <div v-for="(action, index) in quickActions" :key="index" class="quick-action-card"
                    @click="action.action">
                    <div class="action-icon-container" :style="{ backgroundColor: action.bgColor }">
                        <i :class="action.icon"></i>
                    </div>
                    <div class="action-text">{{ action.label }}</div>
                </div>
            </div>
        </div>

        <!-- Recent Posts Overview -->
        <div class="section">
            <div class="section-header">
                <h3>Recent Posts</h3>
                <Button label="All Posts" icon="pi pi-list" link />
            </div>
            <DataTable :value="recentPosts" class="recent-posts-table" :paginator="true" :rows="5"
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
                            <Button icon="pi pi-pencil" rounded text severity="success" aria-label="Edit" />
                            <Button icon="pi pi-trash" rounded text severity="danger" aria-label="Delete" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

// Define layout and middleware for this page
definePageMeta({
    layout: 'admin/default',
    middleware: ['admin']
});

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();
const user = computed(() => authStore.user);
const loading = ref(false);

// Format the current date
const currentDate = computed(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('en-US', options);
});

// Dashboard stats data
const stats = ref([
    {
        label: 'Total Posts',
        value: '48',
        icon: 'pi pi-file',
        bgColor: 'var(--primary-color)',
        trend: 12
    },
    {
        label: 'Active Pages',
        value: '9',
        icon: 'pi pi-copy',
        bgColor: 'var(--green-500)',
        trend: 4
    },
    {
        label: 'Categories',
        value: '14',
        icon: 'pi pi-tags',
        bgColor: 'var(--orange-500)',
        trend: -2
    },
    {
        label: 'Total Users',
        value: '6',
        icon: 'pi pi-users',
        bgColor: 'var(--purple-500)',
        trend: 0
    }
]);

// Management modules
const managementModules = ref([
    {
        title: 'Users',
        description: 'Manage user accounts and permissions',
        icon: 'pi pi-users',
        count: '6 users',
        route: '/admin/users'
    },
    {
        title: 'Pages',
        description: 'Create and edit website pages',
        icon: 'pi pi-copy',
        count: '9 pages',
        route: '/admin/pages'
    },
    {
        title: 'Posts',
        description: 'Manage blog posts and articles',
        icon: 'pi pi-file',
        count: '48 posts',
        route: '/admin/posts'
    },
    {
        title: 'Categories',
        description: 'Organize content with categories',
        icon: 'pi pi-tags',
        count: '14 categories',
        route: '/admin/categories'
    },
    {
        title: 'Settings',
        description: 'Configure website settings',
        icon: 'pi pi-cog',
        count: 'System settings',
        route: '/admin/settings'
    }
]);

// Admin controls (for ADMIN role only)
const adminControls = ref([
    {
        title: 'User Management',
        description: 'Add, edit, or remove user accounts',
        icon: 'pi pi-user-edit',
        bgColor: 'var(--primary-color)',
        buttonText: 'Manage Users',
        severity: 'info',
        action: () => router.push('/admin/users')
    },
    {
        title: 'System Settings',
        description: 'Configure global website settings',
        icon: 'pi pi-cog',
        bgColor: 'var(--purple-500)',
        buttonText: 'Site Settings',
        severity: 'secondary',
        action: () => router.push('/admin/settings')
    }
]);

// Quick actions for all users
const quickActions = ref([
    {
        label: 'New Post',
        icon: 'pi pi-pencil',
        bgColor: 'var(--primary-color)',
        action: () => router.push('/admin/posts/create')
    },
    {
        label: 'New Page',
        icon: 'pi pi-file-edit',
        bgColor: 'var(--green-500)',
        action: () => router.push('/admin/pages/create')
    },
    {
        label: 'New Category',
        icon: 'pi pi-tag',
        bgColor: 'var(--orange-500)',
        action: () => router.push('/admin/categories/create')
    },
    {
        label: 'Profile',
        icon: 'pi pi-user',
        bgColor: 'var(--purple-500)',
        action: () => router.push('/admin/profile')
    }
]);

// Recent activities
const activities = ref([
    {
        title: 'New Post Published',
        text: 'You published "10 Tips for Financial Planning"',
        time: '10 minutes ago',
        type: 'post',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
    }, {
        title: 'Page Updated',
        text: 'Jane updated the "About Us" page',
        time: '2 hours ago',
        type: 'page',
        avatar: 'https://randomuser.me/api/portraits/women/24.jpg'
    },
    {
        title: 'New Category',
        text: 'John created a new category "Investment Tips"',
        time: '3 hours ago',
        type: 'category',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
        title: 'User Registration',
        text: 'A new editor has joined the team',
        time: '1 day ago',
        type: 'user',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    }
]);

// Recent posts data
const recentPosts = ref([
    {
        title: '10 Tips for Financial Planning',
        category: 'Finance',
        date: '2025-06-16',
        author: 'John Doe',
        status: 'published'
    },
    {
        title: 'Understanding Trust Funds',
        category: 'Education',
        date: '2025-06-14',
        author: 'Jane Smith',
        status: 'published'
    },
    {
        title: 'Retirement Planning Guide',
        category: 'Finance',
        date: '2025-06-12',
        author: 'John Doe',
        status: 'published'
    },
    {
        title: 'Estate Planning 101',
        category: 'Legal',
        date: '2025-06-10',
        author: 'Michael Brown',
        status: 'draft'
    },
    {
        title: 'Investment Strategies for 2025',
        category: 'Finance',
        date: '2025-06-08',
        author: 'Sarah Johnson',
        status: 'review'
    }
]);

// Function to get status severity for PrimeVue tags
const getStatusSeverity = (status) => {
    switch (status.toLowerCase()) {
        case 'published':
            return 'success';
        case 'draft':
            return 'warning';
        case 'review':
            return 'info';
        default:
            return 'secondary';
    }
};

// Function to get activity type severity
const getTagSeverity = (type) => {
    switch (type.toLowerCase()) {
        case 'post':
            return 'info';
        case 'page':
            return 'success';
        case 'user':
            return 'warning';
        case 'category':
            return 'secondary';
        default:
            return 'info';
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

// Function to navigate to module pages
const navigateToModule = (route) => {
    router.push(route);
};

// Check authentication and fetch data on mount
onMounted(() => {
    // Authentication check is handled by middleware

    // Fetch data for dashboard (simulated)
    refreshData();
});
</script>

<style scoped>
.dashboard {
    padding: 1.5rem;
    max-width: 1400px;
    margin: 0 auto;
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--surface-border);
}

.welcome-message {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-color);
    margin: 0 0 0.5rem 0;
}

.date-message {
    color: var(--text-color-secondary);
    margin: 0;
    font-size: 1rem;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;
}

.stat-card {
    background-color: var(--surface-card);
    border-radius: var(--border-radius);
    box-shadow: var(--card-shadow);
    padding: 1.5rem;
    display: flex;
    align-items: center;
}

.stat-icon {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.25rem;
    font-size: 1.5rem;
    color: white;
}

.stat-content {
    flex: 1;
}

.stat-value {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 0.25rem 0;
    color: var(--text-color);
}

.stat-label {
    color: var(--text-color-secondary);
    font-size: 0.875rem;
    margin: 0;
}

.section {
    background-color: var(--surface-card);
    border-radius: var(--border-radius);
    box-shadow: var(--card-shadow);
    padding: 1.5rem;
    margin-bottom: 2rem;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--surface-border);
}

.section-header h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-color);
    margin: 0;
}

.view-all-btn {
    color: #3b82f6;
    background: none;
    border: none;
    font-size: 0.875rem;
    cursor: pointer;
    padding: 0.5rem;
}

.welcome-container {
    flex: 1;
}

.action-buttons {
    display: flex;
    gap: 1rem;
    align-items: center;
}

/* Role chip styling */
.role-chip {
    margin-top: 0.5rem;
}

/* Activity styling */
.custom-timeline {
    margin-top: 1.5rem;
}

.activity-card {
    margin-bottom: 0;
}

.activity-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
}

.activity-time {
    font-size: 0.75rem;
    color: var(--text-color-secondary);
}

/* Management modules grid */
.management-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
}

.management-card {
    padding: 1.5rem;
    border-radius: var(--border-radius);
    box-shadow: var(--card-shadow);
    background-color: var(--surface-card);
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;
}

.management-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.module-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
}

.module-icon i {
    font-size: 1.5rem;
    color: white;
}

.module-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--surface-border);
}

.module-count {
    font-weight: 600;
    color: var(--primary-color);
}

/* Admin controls grid */
.admin-controls-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
}

.admin-control-card {
    display: flex;
    gap: 1.5rem;
    padding: 1.5rem;
    border-radius: var(--border-radius);
    background-color: var(--surface-card);
    box-shadow: var(--card-shadow);
}

.control-icon {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.control-icon i {
    font-size: 1.75rem;
    color: white;
}

.control-content {
    flex: 1;
}

.control-content h4 {
    margin: 0 0 0.5rem 0;
}

.control-content p {
    margin: 0 0 1rem 0;
    color: var(--text-color-secondary);
}

/* Quick actions grid */
.quick-actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
}

.quick-action-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 1rem;
    border-radius: var(--border-radius);
    background-color: var(--surface-card);
    box-shadow: var(--card-shadow);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.quick-action-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.action-icon-container {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
}

.action-icon-container i {
    font-size: 1.5rem;
    color: white;
}

.action-text {
    font-weight: 600;
    text-align: center;
}

/* Recent posts table styling */
.recent-posts-table {
    margin-top: 1rem;
}

.action-buttons-cell {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}

/* Stats cards */
.stat-trend {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    margin-top: 0.25rem;
}

.stat-trend.positive {
    color: var(--green-500);
}

.stat-trend.negative {
    color: var(--red-500);
}

/* Responsive adjustments */
@media (max-width: 992px) {
    .dashboard-header {
        flex-direction: column;
        gap: 1rem;
    }

    .action-buttons {
        align-self: flex-end;
    }

    .stats-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }

    .management-grid,
    .admin-controls-grid {
        grid-template-columns: 1fr;
    }
}
</style>
