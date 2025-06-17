<template>
    <div class="dashboard">
        <div class="dashboard-header">
            <h2 class="welcome-message">Welcome back, {{ user?.name || 'Admin' }}</h2>
            <p class="date-message">{{ currentDate }}</p>
        </div>

        <!-- Stats Overview -->
        <div class="stats-grid">
            <div v-for="(stat, index) in stats" :key="index" class="stat-card">
                <div class="stat-icon" :style="{ backgroundColor: stat.color }">
                    <span>{{ stat.icon }}</span>
                </div>
                <div class="stat-content">
                    <h3 class="stat-value">{{ stat.value }}</h3>
                    <p class="stat-label">{{ stat.label }}</p>
                </div>
            </div>
        </div>

        <!-- Recent Activities -->
        <div class="section">
            <div class="section-header">
                <h3>Recent Activities</h3>
                <button class="view-all-btn">View All</button>
            </div>
            <div class="activity-list">
                <div v-for="(activity, index) in activities" :key="index" class="activity-item">
                    <div class="activity-icon" :style="{ backgroundColor: activity.iconBg }">
                        {{ activity.icon }}
                    </div>
                    <div class="activity-content">
                        <p class="activity-text">{{ activity.text }}</p>
                        <span class="activity-time">{{ activity.time }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="section">
            <div class="section-header">
                <h3>Quick Actions</h3>
            </div>
            <div class="quick-actions">
                <button v-for="(action, index) in quickActions" :key="index" class="quick-action-btn"
                    :style="{ backgroundColor: action.bgColor }">
                    <span class="quick-action-icon">{{ action.icon }}</span>
                    <span class="quick-action-text">{{ action.label }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';

// Define layout and middleware for this page
definePageMeta({
    layout: 'admin/default',
    middleware: ['admin']
});

const authStore = useAuthStore();
const user = computed(() => authStore.user);

// Format the current date
const currentDate = computed(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('en-US', options);
});

// Sample stats data 
const stats = ref([
    { label: 'Total Posts', value: '47', icon: '📝', color: '#3b82f6' },
    { label: 'Total Events', value: '12', icon: '📅', color: '#10b981' },
    { label: 'Total Partners', value: '8', icon: '🤝', color: '#f59e0b' },
    { label: 'Total Pages', value: '6', icon: '📄', color: '#8b5cf6' },
]);

// Sample activities data
const activities = ref([
    {
        text: 'You published a new post',
        time: '10 minutes ago',
        icon: '📝',
        iconBg: '#dbeafe'
    },
    {
        text: 'John updated the About Us page',
        time: '2 hours ago',
        icon: '📄',
        iconBg: '#e0e7ff'
    },
    {
        text: 'New event "Annual Conference" was created',
        time: 'Yesterday',
        icon: '📅',
        iconBg: '#d1fae5'
    },
    {
        text: 'New user registered',
        time: '2 days ago',
        icon: '👤',
        iconBg: '#fef3c7'
    },
]);

// Sample quick actions
const quickActions = ref([
    { label: 'Add New Post', icon: '✏️', bgColor: '#dbeafe' },
    { label: 'Create Event', icon: '🗓️', bgColor: '#d1fae5' },
    { label: 'Manage Users', icon: '👥', bgColor: '#fee2e2' },
    { label: 'Site Settings', icon: '⚙️', bgColor: '#fef3c7' },
]);

// Check authentication on mount
onMounted(() => {
    console.log('Dashboard mounted, checking authentication');
    console.log('Current user:', authStore.user);
    console.log('Is authenticated:', authStore.isAuthenticated);

    if (!authStore.isAuthenticated) {
        console.warn('User is not authenticated, redirecting to login');
        navigateTo('/login');
        return;
    }

    if (authStore.user?.role !== 'ADMIN') {
        console.warn('User is not an admin, redirecting to login');
        authStore.logout();
        navigateTo('/login?error=access_denied');
        return;
    }

    console.log('User is authenticated and is an admin');
    // Here you could fetch real dashboard data from the API
});
</script>

<style scoped>
.dashboard {
    max-width: 1400px;
    margin: 0 auto;
}

.dashboard-header {
    margin-bottom: 2rem;
}

.welcome-message {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 0.5rem 0;
}

.date-message {
    color: #64748b;
    margin: 0;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;
}

.stat-card {
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    display: flex;
    align-items: center;
}

.stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    font-size: 1.5rem;
}

.stat-content {
    flex: 1;
}

.stat-value {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
    color: #1e293b;
}

.stat-label {
    color: #64748b;
    font-size: 0.875rem;
    margin: 0;
}

.section {
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
}

.section-header h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
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

.view-all-btn:hover {
    text-decoration: underline;
}

.activity-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.activity-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid #f1f5f9;
}

.activity-item:last-child {
    border-bottom: none;
}

.activity-icon {
    min-width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    font-size: 1rem;
}

.activity-content {
    flex: 1;
}

.activity-text {
    margin: 0 0 0.25rem 0;
    font-size: 0.9375rem;
    color: #334155;
}

.activity-time {
    font-size: 0.75rem;
    color: #94a3b8;
}

.quick-actions {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
}

.quick-action-btn {
    background-color: #f8fafc;
    border: none;
    border-radius: 0.5rem;
    padding: 1rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s, box-shadow 0.2s;
}

.quick-action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.quick-action-icon {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.quick-action-text {
    color: #334155;
    font-size: 0.875rem;
    font-weight: 500;
}

@media (max-width: 768px) {
    .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    .quick-actions {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
}
</style>
