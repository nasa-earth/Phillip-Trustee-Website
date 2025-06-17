<template>
    <div class="admin-layout">
        <!-- Sidebar -->
        <div class="sidebar" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
            <div class="sidebar-header">
                <h1 class="admin-logo">PT Admin</h1>
                <button @click="toggleSidebar" class="collapse-btn">
                    <span v-if="isSidebarCollapsed">→</span>
                    <span v-else>←</span>
                </button>
            </div>

            <div class="sidebar-content">
                <ul class="sidebar-menu">
                    <li v-for="item in menuItems" :key="item.link" class="sidebar-item">
                        <NuxtLink :to="item.link" class="sidebar-link" :title="item.name">
                            <span class="sidebar-icon">{{ item.icon }}</span>
                            <span v-if="!isSidebarCollapsed" class="sidebar-text">{{ item.name }}</span>
                        </NuxtLink>
                    </li>
                </ul>
            </div>

            <div class="sidebar-footer">
                <button @click="logout" class="logout-btn" :title="isSidebarCollapsed ? 'Logout' : ''">
                    <span class="sidebar-icon">🚪</span>
                    <span v-if="!isSidebarCollapsed">Logout</span>
                </button>
            </div>
        </div>

        <!-- Main content -->
        <div class="main-content">
            <!-- Top header -->
            <header class="admin-header">
                <div class="header-left">
                    <h1 class="page-title">{{ currentPageTitle }}</h1>
                </div>
                <div class="header-right">
                    <div v-if="user" class="user-info">
                        <span class="user-name">{{ user.name }}</span>
                        <span class="user-role">{{ user.role }}</span>
                    </div>
                </div>
            </header>

            <!-- Page content -->
            <main class="page-content">
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const isSidebarCollapsed = ref(false);

// Get user from auth store
const user = computed(() => authStore.user);

// Admin menu items
const menuItems = [
    { name: 'Dashboard', link: '/admin/dashboard', icon: '📊' },
    { name: 'Posts', link: '/admin/posts', icon: '📝' },
    { name: 'Categories', link: '/admin/categories', icon: '🗂️' },
    { name: 'Events', link: '/admin/events', icon: '📅' },
    { name: 'Pages', link: '/admin/pages', icon: '📄' },
    { name: 'Users', link: '/admin/users', icon: '👥' },
    { name: 'Settings', link: '/admin/settings', icon: '⚙️' },
];

// Get current page title from route
const currentPageTitle = computed(() => {
    const currentRoute = route.path;
    const currentMenuItem = menuItems.find(item => currentRoute.includes(item.link));
    return currentMenuItem ? currentMenuItem.name : 'Admin';
});

// Toggle sidebar collapsed state
const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
    localStorage.setItem('adminSidebarCollapsed', isSidebarCollapsed.value);
};

// Logout function
const logout = () => {
    authStore.logout();
    router.push('/login');
};

// Check authentication and admin role
onMounted(() => {
    console.log('Admin layout mounted with path:', window.location.pathname);

    // Get sidebar collapsed state from localStorage
    const savedState = localStorage.getItem('adminSidebarCollapsed');
    if (savedState !== null) {
        isSidebarCollapsed.value = savedState === 'true';
    }

    console.log('Admin layout auth check:', {
        isAuthenticated: authStore.isAuthenticated,
        user: authStore.user,
        accessToken: !!authStore.accessToken,
        path: window.location.pathname
    });

    // Debug - try to force rehydration of auth state
    if (localStorage.getItem('access_token') && !authStore.isAuthenticated) {
        console.log('Found token in storage but auth state is not initialized, trying to restore');
        authStore.initFromStorage();
    }

    // Redirect if not authenticated or not admin
    if (!authStore.isAuthenticated) {
        console.warn('User not authenticated, redirecting to login');
        setTimeout(() => router.push('/login'), 100);
        return;
    }

    if (!authStore.user || authStore.user.role !== 'ADMIN') {
        console.warn('User is not admin, redirecting to login');
        authStore.logout();
        setTimeout(() => router.push('/login?error=access_denied'), 100);
        return;
    }

    console.log('User is authenticated and has admin role, showing dashboard');
});
</script>

<style scoped>
.admin-layout {
    display: flex;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.sidebar {
    width: 250px;
    background-color: #1e293b;
    color: white;
    display: flex;
    flex-direction: column;
    transition: width 0.3s ease;
}

.sidebar-collapsed {
    width: 70px;
}

.sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 1rem;
    border-bottom: 1px solid #334155;
}

.admin-logo {
    font-size: 1.25rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
}

.collapse-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px 8px;
    border-radius: 4px;
}

.collapse-btn:hover {
    background-color: #334155;
}

.sidebar-content {
    flex: 1;
    overflow-y: auto;
    padding: 1rem 0;
}

.sidebar-menu {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sidebar-item {
    margin-bottom: 0.25rem;
}

.sidebar-link {
    display: flex;
    align-items: center;
    padding: 0.75rem 1.25rem;
    color: #e2e8f0;
    text-decoration: none;
    border-radius: 0.25rem;
    margin: 0 0.5rem;
    transition: background-color 0.2s, color 0.2s;
}

.sidebar-link:hover {
    background-color: #334155;
    color: white;
}

.sidebar-link.router-link-active {
    background-color: #3b82f6;
    color: white;
}

.sidebar-icon {
    font-size: 1.25rem;
    margin-right: 1rem;
}

.sidebar-collapsed .sidebar-icon {
    margin-right: 0;
}

.sidebar-text {
    white-space: nowrap;
    overflow: hidden;
}

.sidebar-footer {
    border-top: 1px solid #334155;
    padding: 1rem;
}

.logout-btn {
    width: 100%;
    display: flex;
    align-items: center;
    background: none;
    border: 1px solid #475569;
    color: #e2e8f0;
    padding: 0.75rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

.logout-btn:hover {
    background-color: #475569;
}

.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f8fafc;
}

.admin-header {
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.page-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #334155;
    margin: 0;
}

.user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.user-name {
    font-weight: 600;
    color: #1e293b;
}

.user-role {
    font-size: 0.75rem;
    color: #64748b;
    text-transform: uppercase;
}

.page-content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
}
</style>
