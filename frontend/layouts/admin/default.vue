<template>
    <div class="admin-layout">        <!-- Sidebar -->
        <div class="sidebar" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
            <div class="sidebar-header">
                <h1 class="admin-logo">
                    <i class="pi pi-shield mr-2"></i>
                    <span v-if="!isSidebarCollapsed">PT Admin</span>
                </h1>
                <Button icon="pi pi-angle-left" text rounded @click="toggleSidebar" 
                        :class="{'p-button-rotate-180': isSidebarCollapsed}" />
            </div>

            <div class="sidebar-content">
                <PanelMenu :model="menuItems" class="sidebar-menu" />
            </div>

            <div class="sidebar-footer">
                <Button icon="pi pi-sign-out" :label="isSidebarCollapsed ? undefined : 'Logout'" 
                       severity="secondary" outlined @click="logout" class="w-full" />
            </div>
        </div>

        <!-- Main content -->
        <div class="main-content">            <!-- Top header -->
            <header class="admin-header">
                <div class="header-left">
                    <Breadcrumb :model="breadcrumbItems" home-icon="pi pi-home" />
                </div>
                <div class="header-right">
                    <div class="header-actions">
                        <Button icon="pi pi-bell" badge="2" severity="info" text rounded aria-label="Notifications" />
                        <Button icon="pi pi-cog" text rounded aria-label="Settings" />
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

// Compute menu items based on user role for PrimeVue PanelMenu
const menuItems = computed(() => {
    const items = [
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            command: () => router.push('/admin/dashboard')
        },
        {
            label: 'Content',
            icon: 'pi pi-file-edit',
            items: [
                {
                    label: 'Posts',
                    icon: 'pi pi-file',
                    command: () => router.push('/admin/posts')
                },
                {
                    label: 'Categories',
                    icon: 'pi pi-tags',
                    command: () => router.push('/admin/categories')
                },
                {
                    label: 'Pages',
                    icon: 'pi pi-copy',
                    command: () => router.push('/admin/pages')
                }
            ]
        },
        {
            label: 'Events',
            icon: 'pi pi-calendar',
            command: () => router.push('/admin/events')
        }
    ];

    // Add admin-only menu items
    if (user.value?.role === 'ADMIN') {
        items.push(
            {
                label: 'Administration',
                icon: 'pi pi-shield',
                items: [
                    {
                        label: 'Users',
                        icon: 'pi pi-users',
                        command: () => router.push('/admin/users')
                    },
                    {
                        label: 'Settings',
                        icon: 'pi pi-cog',
                        command: () => router.push('/admin/settings')
                    }
                ]
            }
        );
    }
    
    return items;
});

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

.sidebar {
    width: 280px;
    background-color: var(--surface-overlay);
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    transition: width 0.3s ease;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.02), 0 0 2px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.08);
    z-index: 999;
}

.sidebar-collapsed {
    width: 80px;
}

.sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid var(--surface-border);
}

.admin-logo {
    font-size: 1.25rem;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    color: var(--primary-color);
    display: flex;
    align-items: center;
}

.p-button-rotate-180 .p-button-icon {
    transform: rotate(180deg);
}

.sidebar-content {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
}

.sidebar-menu {
    border: none;
    background: transparent;
}

.sidebar-menu :deep(.p-panelmenu-header-link) {
    padding: 0.75rem;
}

.sidebar-menu :deep(.p-menuitem-icon) {
    margin-right: 0.75rem;
}

/* Hide text in collapsed mode */
.sidebar-collapsed .sidebar-menu :deep(.p-menuitem-text), 
.sidebar-collapsed .sidebar-menu :deep(.p-submenu-icon) {
    display: none;
}

.sidebar-collapsed .sidebar-menu :deep(.p-panelmenu-header-link) {
    justify-content: center;
}

.sidebar-collapsed .sidebar-menu :deep(.p-menuitem-icon) {
    margin-right: 0;
}

.sidebar-footer {
    padding: 1rem;
    border-top: 1px solid var(--surface-border);
}

.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.admin-header {
    background-color: var(--surface-card);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--surface-border);
}

.header-left {
    display: flex;
    align-items: center;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.header-actions {
    display: flex;
    gap: 0.5rem;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
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
    background-color: var(--surface-ground);
}
</style>
