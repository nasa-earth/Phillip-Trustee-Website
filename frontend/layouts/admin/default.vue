<template>
    <div class="admin-layout">
        <!-- Modern Sidebar -->
        <div class="sidebar" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
            <div class="sidebar-header">
                <div class="logo-container">
                    <img src="/images/logo.svg" alt="Logo" class="admin-logo-img" />
                    <h1 class="admin-logo" v-if="!isSidebarCollapsed">
                        PT Admin
                    </h1>
                </div>
                <Button icon="pi pi-angle-left" text rounded @click="toggleSidebar"
                    :class="{ 'p-button-rotate-180': isSidebarCollapsed }" />
            </div>

            <div class="user-profile" v-if="user && !isSidebarCollapsed">
                <Avatar :label="getUserInitials()" shape="circle" size="large" class="user-avatar" />
                <div class="user-info-sidebar">
                    <span class="user-name-sidebar">{{ user.name }}</span>
                    <Tag :value="user.role" :severity="user.role === 'ADMIN' ? 'danger' : 'info'" size="small" />
                </div>
            </div>
            <div class="user-profile-collapsed" v-if="user && isSidebarCollapsed">
                <Avatar :label="getUserInitials()" shape="circle" size="normal" class="user-avatar" />
            </div>

            <div class="sidebar-content">
                <!-- Custom menu instead of PanelMenu for better styling -->
                <ul class="sidebar-menu">
                    <li v-for="(item, i) in sidebarItems" :key="i" :class="{ 'active': activeMenuItem === item.key }"
                        @click="navigateTo(item)">
                        <div class="menu-item">
                            <i :class="item.icon"></i>
                            <span v-if="!isSidebarCollapsed" class="menu-label">{{ item.label }}</span>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="sidebar-footer">
                <Button icon="pi pi-sign-out" :label="isSidebarCollapsed ? undefined : 'Logout'" severity="secondary"
                    outlined @click="logout" class="w-full logout-btn" />
            </div>
        </div>

        <!-- Main content -->
        <div class="main-content">
            <!-- Top header -->
            <header class="admin-header">
                <div class="header-left">
                    <Button icon="pi pi-bars" text rounded @click="toggleSidebar" class="mobile-menu-toggle" />
                    <Breadcrumb :model="breadcrumbItems" home-icon="pi pi-home" />
                </div>
                <div class="header-right">
                    <div class="header-actions">
                        <Button icon="pi pi-search" text rounded aria-label="Search" />
                        <Button icon="pi pi-bell" badge="2" severity="info" text rounded aria-label="Notifications" />
                        <Button icon="pi pi-cog" text rounded aria-label="Settings"
                            @click="navigateTo({ key: 'settings' })" />
                    </div>
                    <div v-if="user" class="user-info">
                        <Avatar :label="getUserInitials()" shape="circle" size="normal" class="mr-2" />
                        <div class="user-details">
                            <span class="user-name">{{ user.name }}</span>
                            <Tag :value="user.role" :severity="user.role === 'ADMIN' ? 'danger' : 'info'" />
                        </div>
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

// Current active menu item
const activeMenuItem = ref('dashboard');

// Sidebar navigation items
const sidebarItems = computed(() => {
    const items = [
        {
            key: 'dashboard',
            label: 'Dashboard',
            icon: 'pi pi-home',
            route: '/admin/dashboard'
        },
        {
            key: 'users',
            label: 'Users',
            icon: 'pi pi-users',
            route: '/admin/users'
        },
        {
            key: 'events',
            label: 'Events',
            icon: 'pi pi-calendar',
            route: '/admin/events'
        },
        {
            key: 'partners',
            label: 'Partners',
            icon: 'pi pi-briefcase',
            route: '/admin/partners'
        },
        {
            key: 'content',
            label: 'Content',
            icon: 'pi pi-file-edit',
            route: '/admin/content'
        },
        {
            key: 'faq',
            label: 'FAQs',
            icon: 'pi pi-question-circle',
            route: '/admin/faq'
        }
    ];

    // Add admin-only items
    if (user.value?.role === 'ADMIN') {
        items.push(
            {
                key: 'settings',
                label: 'Settings',
                icon: 'pi pi-cog',
                route: '/admin/settings'
            }
        );
    }

    return items;
});

// Navigate to selected menu
const navigateTo = (item) => {
    activeMenuItem.value = item.key;
    if (item.route) {
        router.push(item.route);
    }
};

// Breadcrumb based on current route
const breadcrumbItems = computed(() => {
    const pathSegments = route.path.split('/').filter(segment => segment);
    return pathSegments.map((segment, index) => {
        const path = '/' + pathSegments.slice(0, index + 1).join('/');
        return {
            label: segment.charAt(0).toUpperCase() + segment.slice(1),
            to: path
        };
    });
});

// Get user initials for avatar
const getUserInitials = () => {
    if (!user.value?.name) return 'U';

    const nameParts = user.value.name.split(' ');
    if (nameParts.length >= 2) {
        return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
};

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
    font-family: var(--font-family);
    background-color: var(--surface-ground);
}

/* Modern Sidebar Styling */
.sidebar {
    width: 280px;
    background: linear-gradient(180deg, #1f2937 0%, #111827 100%);
    color: #f3f4f6;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    z-index: 999;
    position: relative;
}

.sidebar-collapsed {
    width: 80px;
}

.sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 1.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    overflow: hidden;
}

.admin-logo-img {
    height: 32px;
    width: auto;
}

.admin-logo {
    font-size: 1.125rem;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    color: white;
    margin: 0;
}

.p-button-rotate-180 .p-button-icon {
    transform: rotate(180deg);
}

/* User profile in sidebar */
.user-profile {
    padding: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    gap: 1rem;
}

.user-profile-collapsed {
    padding: 1.5rem 0;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info-sidebar {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.user-name-sidebar {
    font-weight: 600;
    color: white;
    font-size: 0.9rem;
}

.user-avatar {
    background-color: var(--primary-color) !important;
}

/* Custom sidebar menu */
.sidebar-content {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem 0;
}

.sidebar-menu {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.sidebar-menu li {
    margin-bottom: 0.5rem;
    transition: background-color 0.2s ease;
    cursor: pointer;
    border-radius: 0;
    padding: 0;
}

.sidebar-menu li:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.sidebar-menu li.active {
    background-color: var(--primary-color);
}

.sidebar-menu li .menu-item {
    display: flex;
    align-items: center;
    padding: 0.9rem 1.5rem;
    gap: 1rem;
    color: #f3f4f6;
}

.sidebar-menu li i {
    font-size: 1.25rem;
    width: 1.5rem;
    text-align: center;
}

.menu-label {
    font-size: 0.9rem;
    font-weight: 500;
}

.sidebar-footer {
    padding: 1.5rem 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.logout-btn {
    border-radius: 8px;
}

/* Main content area */
.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f9fafb;
}

.admin-header {
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.mobile-menu-toggle {
    display: none;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.header-actions {
    display: flex;
    gap: 0.75rem;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border-left: 1px solid #e5e7eb;
    padding-left: 1.5rem;
}

.user-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.user-name {
    font-weight: 600;
    color: var(--text-color);
}

.page-content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
    background-color: #f9fafb;
}

/* Responsive adjustments */
@media (max-width: 992px) {
    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        transform: translateX(-100%);
        box-shadow: none;
    }

    .sidebar:not(.sidebar-collapsed) {
        transform: translateX(0);
    }

    .sidebar-collapsed {
        transform: translateX(-100%);
    }

    .mobile-menu-toggle {
        display: block;
    }

    .main-content {
        width: 100%;
        margin-left: 0;
    }
}
</style>
