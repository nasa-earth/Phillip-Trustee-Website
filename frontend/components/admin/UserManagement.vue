<template>
    <div class="space-y-3">
        <!-- Header Section -->
        <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
            <div>
                <h3
                    class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
                    <!-- <i class="pi pi-users text-blue-600"></i> -->
                    User Management
                </h3>
            </div>
            <Button v-if="isAdmin" label="Create User" icon="pi pi-plus" @click="openCreateUserDialog"
                class="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-semibold" />
        </div>

        <!-- Stats Cards -->
        <!-- <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-black text-xl font-medium">Total Users</p>
                        <p class="text-2xl font-bold text-brand-primary">{{ totalRecords }}</p>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-black text-xl font-medium">Admin Users</p>
                        <p class="text-2xl font-bold text-black">{{users.filter(u => u.role === 'ADMIN').length}}</p>
                    </div>

                </div>
            </div>
            <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-black text-xl font-medium">Editor Users</p>
                        <p class="text-2xl font-bold text-black">{{users.filter(u => u.role === 'EDITOR').length}}</p>
                    </div>

                </div>
            </div>
        </div> -->

        <!-- Search Section -->
        <div class="">
            <div class="flex items-center gap-3">
                <div class="relative flex-1 max-w-md">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <!-- <i class="pi pi-search text-slate-400"></i> -->
                    </div>
                    <InputText v-model="searchQuery" placeholder="Search" @input="debounceSearch"
                        class="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" />
                </div>
                <!-- <div class="flex items-center gap-2 text-sm text-slate-500">
                    <i class="pi pi-info-circle"></i>
                    <span>{{ totalRecords }} users found</span>
                </div> -->
            </div>
        </div>

        <!-- Users Data Table -->
        <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 overflow-hidden">
            <DataTable :value="users" :loading="loading" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 20]"
                v-model:filters="filters" filterDisplay="menu" responsiveLayout="scroll" stripedRows class="users-table"
                :totalRecords="totalRecords" :lazy="true" @page="onPage">
                <Column field="name" header="Name" :sortable="true">
                    <template #body="{ data }">
                        <div class="flex items-center gap-3">
                            <div class="relative">
                                <div
                                    class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                    {{ data.name ? data.name.charAt(0).toUpperCase() : '?' }}
                                </div>
                                <!-- <div
                                    class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
                                </div> -->
                            </div>
                            <div>
                                <span class="font-semibold text-slate-800">{{ data.name }}</span>
                                <!-- <div class="text-xs text-slate-500">{{ data.email }}</div> -->
                            </div>
                        </div>
                    </template>
                </Column>
                <Column field="email" header="Email" :sortable="true" class="hidden md:table-cell">
                    <template #body="{ data }">
                        <div class="flex items-center gap-2">
                            <i class="pi pi-envelope text-slate-400"></i>
                            <span class="text-slate-700">{{ data.email }}</span>
                        </div>
                    </template>
                </Column>
                <Column field="role" header="Role">
                    <template #body="{ data }">
                        <Tag :value="data.role" :class="{
                            'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg': data.role === 'ADMIN',
                            'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg': data.role === 'EDITOR',
                            'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg': data.role !== 'ADMIN' && data.role !== 'EDITOR'
                        }" class="px-3 py-1 rounded-full font-semibold text-xs" />
                    </template>
                </Column>
                <Column field="createdAt" header="Created At" :sortable="true" class="hidden lg:table-cell">
                    <template #body="{ data }">
                        <div class="flex flex-col gap-1">
                            <div class="flex items-center gap-2">
                                <i class="pi pi-calendar text-blue-500"></i>
                                <span class="font-medium text-slate-700">{{ formatDate(data.createdAt) }}</span>
                            </div>

                        </div>
                    </template>
                    <template #filter="{ filterModel }">
                        <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                    </template>
                </Column>

                <Column header="Actions" class="w-32">
                    <template #body="{ data }">
                        <div class="flex gap-1 justify-center">
                            <Button unstyled icon="pi pi-eye" @click="viewUser(data)"
                                class="w-8 h-8 bg-green-500 hover:bg-green-600 text-white border-none rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer"
                                size="small" v-tooltip.top="'View Details'" />
                            <Button v-if="isAdmin" unstyled icon="pi pi-pencil" @click="editUser(data)"
                                class="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white border-none rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer"
                                size="small" v-tooltip.top="'Edit User'" />
                            <Button v-if="isAdmin" unstyled="" icon="pi pi-trash" @click="confirmDeleteUser(data)"
                                class="w-8 h-8 bg-red-500 hover:bg-red-600 text-white border-none rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer"
                                size="small" v-tooltip.top="'Delete User'" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- Create/Edit User Dialog -->
        <Dialog v-model:visible="userDialog" :header="dialogMode === 'create' ? 'Create New User' : 'Edit User'"
            :modal="true" class="p-fluid max-w-md">
            <template #header>
                <div class="flex items-center gap-3">
                    <div
                        class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                        <i :class="dialogMode === 'create' ? 'pi pi-user-plus' : 'pi pi-user-edit'"
                            class="text-white text-lg"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-800">{{ dialogMode === 'create' ? 'Create New User' :
                            'Edit User' }}</h3>
                        <p class="text-sm text-slate-500">{{ dialogMode === 'create' ? 'Add a new user to the system' :
                            'Update user information' }}</p>
                    </div>
                </div>
            </template>

            <div class="space-y-6 pt-4">
                <div class="space-y-2">
                    <label for="name" class="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <i class="pi pi-user text-blue-500"></i>
                        Full Name
                    </label>
                    <InputText id="name" v-model="user.name" required autofocus
                        :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': submitted && !user.name }"
                        class="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="Enter full name" />
                    <small class="text-red-500 text-xs flex items-center gap-1" v-if="submitted && !user.name">
                        <i class="pi pi-exclamation-triangle"></i>
                        Name is required
                    </small>
                </div>

                <div class="space-y-2">
                    <label for="email" class="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <i class="pi pi-envelope text-blue-500"></i>
                        Email Address
                    </label>
                    <InputText id="email" v-model="user.email" required type="email"
                        :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': submitted && !user.email }"
                        class="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="Enter email address" />
                    <small class="text-red-500 text-xs flex items-center gap-1" v-if="submitted && !user.email">
                        <i class="pi pi-exclamation-triangle"></i>
                        Email is required
                    </small>
                </div>

                <div class="space-y-2" v-if="dialogMode === 'create'">
                    <label for="password" class="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <i class="pi pi-lock text-blue-500"></i>
                        Password
                    </label>
                    <Password id="password" v-model="user.password" required
                        :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': submitted && !user.password }"
                        class="w-full" placeholder="Enter secure password" toggleMask :feedback="false" />
                    <small class="text-red-500 text-xs flex items-center gap-1" v-if="submitted && !user.password">
                        <i class="pi pi-exclamation-triangle"></i>
                        Password is required
                    </small>
                </div>

                <div class="space-y-2">
                    <label for="role" class="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <i class="pi pi-shield text-blue-500"></i>
                        User Role
                    </label>
                    <Dropdown id="role" v-model="user.role" :options="roles" optionLabel="label" optionValue="value"
                        placeholder="Select a Role"
                        class="w-full border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
            </div>

            <template #footer>
                <div class="flex justify-end gap-3 pt-6 border-t border-slate-200">
                    <Button label="Cancel" icon="pi pi-times" @click="hideDialog"
                        class="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg transition-all duration-200" />
                    <Button :label="dialogMode === 'create' ? 'Create User' : 'Update User'"
                        :icon="dialogMode === 'create' ? 'pi pi-plus' : 'pi pi-check'" @click="saveUser"
                        class="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-none rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-semibold" />
                </div>
            </template>
        </Dialog>

        <!-- User View Dialog -->
        <Dialog v-model:visible="userViewDialog" :header="`User Profile`" :modal="true" class="max-w-lg">
            <template #header>
                <div class="flex items-center gap-3">
                    <div
                        class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <i class="pi pi-user text-white text-lg"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-800">User Profile</h3>
                    </div>
                </div>
            </template>

            <div v-if="selectedUser" class="space-y-6 pt-4">
                <!-- User profile header -->
                <div
                    class="flex flex-col items-center text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
                    <div class="relative mb-4">
                        <div
                            class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {{ selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : '?' }}
                        </div>

                    </div>
                    <h3 class="text-2xl font-bold text-slate-800 mb-1">{{ selectedUser.name }}</h3>
                    <p class="text-slate-600 mb-3 flex items-center gap-2">
                        <i class="pi pi-envelope text-blue-500"></i>
                        {{ selectedUser.email }}
                    </p>
                    <Tag :value="selectedUser.role" :class="{
                        'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg': selectedUser.role === 'ADMIN',
                        'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg': selectedUser.role === 'EDITOR',
                        'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg': selectedUser.role !== 'ADMIN' && selectedUser.role !== 'EDITOR'
                    }" class="px-4 py-2 rounded-full font-semibold" />
                </div>

                <!-- User timestamps details -->
                <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <h4 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <i class="pi pi-clock text-blue-500"></i>
                        Timeline Information
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div class="space-y-3">
                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <i class="pi pi-calendar text-blue-500"></i>
                                </div>
                                <div>
                                    <p class="text-xs font-medium text-slate-500 uppercase tracking-wide">Created At</p>
                                    <p class="font-semibold text-slate-800">{{ formatDate(selectedUser.createdAt) }}</p>

                                </div>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                    <i class="pi pi-sync text-green-500"></i>
                                </div>
                                <div>
                                    <p class="text-xs font-medium text-slate-500 uppercase tracking-wide">Last Updated
                                    </p>
                                    <p class="font-semibold text-slate-800">{{ formatDate(selectedUser.updatedAt) }}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="flex justify-end gap-3 pt-6 border-t border-slate-200">
                    <Button v-if="isAdmin" label="Edit User" icon="pi pi-pencil" @click="editFromViewDialog"
                        class="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-none rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-semibold" />
                    <Button label="Close" icon="pi pi-times" @click="userViewDialog = false"
                        class="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg transition-all duration-200" />
                </div>
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '~/stores/auth';
import { useDashboardEvents } from '~/composables/useDashboardEvents';

// Composables and utilities
const apiUrl = useApiUrl();
const authStore = useAuthStore();
const confirm = useConfirm();
const toast = useToast();
const dashboardEvents = useDashboardEvents();

// Computed properties
const isAdmin = computed(() => {
    return authStore.user?.role === 'ADMIN';
});

// Data
const users = ref([]);
const user = ref({
    name: '',
    email: '',
    password: '',
    role: 'EDITOR'
});
const selectedUser = ref(null);
const roles = ref([
    { label: 'Admin', value: 'ADMIN' },
    { label: 'Editor', value: 'EDITOR' }
]);
const loading = ref(false);
const userDialog = ref(false);
const userViewDialog = ref(false);
const submitted = ref(false);
const dialogMode = ref('create');
const totalRecords = ref(0);
const currentPage = ref(1);
const rowsPerPage = ref(10);
const searchQuery = ref('');
const searchTimeout = ref(null);

// Custom filter match modes since primevue/api is not available
const FILTER_MODES = {
    CONTAINS: 'contains',
    STARTS_WITH: 'startsWith',
    ENDS_WITH: 'endsWith',
    EQUALS: 'equals'
};

// Filters for DataTable
const filters = ref({
    'name': { value: null, matchMode: FILTER_MODES.CONTAINS },
    'email': { value: null, matchMode: FILTER_MODES.CONTAINS }
});

// Methods
const loadUsers = async (page = 1, limit = 10, search = '') => {
    loading.value = true;
    try {
        const url = apiUrl.users.list + `?page=${page}&limit=${limit}&search=${search}`;
        console.log('Loading users from URL:', url);
        console.log('Loading users with params:', { page, limit, search });
        console.log('Using auth token:', authStore.accessToken ? 'Token exists' : 'No token found');

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authStore.accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();

        console.log('API Response structure:', data);

        // Handle the nested response structure from NestJS with Interceptors
        let actualData = data;
        if (data.status === 200 && data.data) {
            actualData = data.data; // Unwrap the data from the standard response format
        }

        // The backend returns: { users: User[], total: number, page: number, lastPage: number }
        users.value = actualData.users.map(user => ({
            ...user,
            // Ensure dates are properly formatted and handle nullish values
            createdAt: parseAndValidateDate(user.createdAt),
            updatedAt: parseAndValidateDate(user.updatedAt)
        }));

        totalRecords.value = actualData.total;

    } catch (error) {
        console.error('Error loading users:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load users', life: 3000 });
    } finally {
        loading.value = false;
    }
};

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    // Handle potential invalid dates
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        console.warn(`Invalid date format received: ${dateString}`);
        return 'Invalid Date';
    }

    // Calculate relative time for recent dates
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    // Show relative time for recent dates
    if (diffMinutes < 60) {
        return diffMinutes <= 1 ? 'Just now' : `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
        return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffDays < 7) {
        return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    }

    // Use Intl.DateTimeFormat for older dates
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
};

const getRoleSeverity = (role) => {
    switch (role) {
        case 'ADMIN':
            return 'danger';
        case 'EDITOR':
            return 'success';
        default:
            return 'info';
    }
};

const openCreateUserDialog = () => {
    if (!isAdmin.value) {
        toast.add({ severity: 'warn', summary: 'Access Denied', detail: 'Only admins can create users', life: 3000 });
        return;
    }
    user.value = {
        name: '',
        email: '',
        password: '',
        role: 'EDITOR'
    };
    dialogMode.value = 'create';
    submitted.value = false;
    userDialog.value = true;
};

const editUser = (data) => {
    if (!isAdmin.value) {
        toast.add({ severity: 'warn', summary: 'Access Denied', detail: 'Only admins can edit users', life: 3000 });
        return;
    }
    user.value = { ...data };
    dialogMode.value = 'edit';
    submitted.value = false;
    userDialog.value = true;
};

const editFromViewDialog = () => {
    if (!isAdmin.value) {
        toast.add({ severity: 'warn', summary: 'Access Denied', detail: 'Only admins can edit users', life: 3000 });
        return;
    }
    // Close view dialog and open edit dialog with selected user data
    userViewDialog.value = false;
    user.value = { ...selectedUser.value };
    dialogMode.value = 'edit';
    submitted.value = false;
    userDialog.value = true;
};

const viewUser = (data) => {
    // Show detailed user view in a dialog
    selectedUser.value = { ...data };
    userViewDialog.value = true;
};

const confirmDeleteUser = (data) => {
    if (!isAdmin.value) {
        toast.add({ severity: 'warn', summary: 'Access Denied', detail: 'Only admins can delete users', life: 3000 });
        return;
    }
    confirm.require({
        message: `Are you sure you want to delete ${data.name}?`,
        header: 'Confirm Deletion',
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        accept: () => {
            deleteUser(data);
        }
    });
};

const deleteUser = async (data) => {
    if (!isAdmin.value) {
        toast.add({ severity: 'warn', summary: 'Access Denied', detail: 'Only admins can delete users', life: 3000 });
        return;
    }
    try {
        const response = await fetch(apiUrl.users.delete(data.id), {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authStore.accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        // Try to parse the response if there's content
        let responseData = null;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            try {
                responseData = await response.json();
                console.log('Delete response:', responseData);
            } catch (e) {
                console.log('No JSON response body or empty response');
            }
        }

        if (!response.ok) {
            throw new Error(
                responseData?.message ||
                (responseData?.error ? responseData.error : `Delete request failed with status: ${response.status}`)
            );
        }

        // Success case - reload the users
        loadUsers(currentPage.value, rowsPerPage.value, searchQuery.value);
        toast.add({ severity: 'success', summary: 'Success', detail: 'User deleted successfully', life: 3000 });

        // Notify dashboard about user deletion
        dashboardEvents.notifyUserDeleted(data);
    } catch (error) {
        console.error('Error deleting user:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete user', life: 3000 });
    }
};

const saveUser = async () => {
    if (!isAdmin.value) {
        toast.add({ severity: 'warn', summary: 'Access Denied', detail: 'Only admins can create or edit users', life: 3000 });
        return;
    }

    submitted.value = true;

    if (!user.value.name || !user.value.email || (dialogMode.value === 'create' && !user.value.password)) {
        return;
    }

    loading.value = true;
    try {
        if (dialogMode.value === 'create') {
            const response = await fetch(apiUrl.users.create, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authStore.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user.value)
            });

            // Parse the response once
            let responseData;
            try {
                responseData = await response.json();
                console.log('Create user response:', responseData);
            } catch (e) {
                console.error('Error parsing response:', e);
                responseData = null;
            }

            if (!response.ok) {
                console.error('Create user failed. Response status:', response.status);
                console.error('Response data:', responseData);

                let errorMessage = `Create user failed with status: ${response.status}`;

                if (responseData?.message) {
                    // Handle nested message structure from NestJS validation
                    if (typeof responseData.message === 'object' && responseData.message.message) {
                        if (Array.isArray(responseData.message.message)) {
                            errorMessage = responseData.message.message.join(', ');
                        } else {
                            errorMessage = responseData.message.message;
                        }
                    } else if (typeof responseData.message === 'string') {
                        errorMessage = responseData.message;
                    } else if (Array.isArray(responseData.message)) {
                        errorMessage = responseData.message.join(', ');
                    }
                } else if (responseData?.error) {
                    if (typeof responseData.error === 'string') {
                        errorMessage = responseData.error;
                    } else if (responseData.error.message) {
                        errorMessage = responseData.error.message;
                    } else if (Array.isArray(responseData.error)) {
                        errorMessage = responseData.error.join(', ');
                    } else {
                        errorMessage = JSON.stringify(responseData.error);
                    }
                }

                throw new Error(errorMessage);
            }

            // Check if response follows the NestJS standard format
            if (responseData && responseData.status === 201 && responseData.data) {
                console.log('Created user:', responseData.data);
            }

            toast.add({ severity: 'success', summary: 'Success', detail: 'User created successfully', life: 3000 });

            // Notify dashboard about user creation
            dashboardEvents.notifyUserCreated(responseData?.data);
        } else {
            const { id, createdAt, updatedAt, ...updateData } = user.value;
            // Remove password if it's empty (not changed)
            if (!updateData.password) delete updateData.password;

            const response = await fetch(apiUrl.users.update(id), {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${authStore.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            // Parse the response once
            let responseData;
            try {
                responseData = await response.json();
                console.log('Update user response:', responseData);
            } catch (e) {
                console.error('Error parsing response:', e);
                responseData = null;
            }

            if (!response.ok) {
                console.error('Update user failed. Response status:', response.status);
                console.error('Response data:', responseData);

                let errorMessage = `Update user failed with status: ${response.status}`;

                if (responseData?.message) {
                    // Handle nested message structure from NestJS validation
                    if (typeof responseData.message === 'object' && responseData.message.message) {
                        if (Array.isArray(responseData.message.message)) {
                            errorMessage = responseData.message.message.join(', ');
                        } else {
                            errorMessage = responseData.message.message;
                        }
                    } else if (typeof responseData.message === 'string') {
                        errorMessage = responseData.message;
                    } else if (Array.isArray(responseData.message)) {
                        errorMessage = responseData.message.join(', ');
                    }
                } else if (responseData?.error) {
                    if (typeof responseData.error === 'string') {
                        errorMessage = responseData.error;
                    } else if (responseData.error.message) {
                        errorMessage = responseData.error.message;
                    } else if (Array.isArray(responseData.error)) {
                        errorMessage = responseData.error.join(', ');
                    } else {
                        errorMessage = JSON.stringify(responseData.error);
                    }
                }

                throw new Error(errorMessage);
            }

            // Check if response follows the NestJS standard format
            if (responseData && responseData.status === 200 && responseData.data) {
                console.log('Updated user:', responseData.data);
            }

            toast.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully', life: 3000 });

            // Notify dashboard about user update
            dashboardEvents.notifyUserUpdated(responseData?.data);
        }

        hideDialog();
        loadUsers(currentPage.value, rowsPerPage.value, searchQuery.value);
    } catch (error) {
        console.error('Error saving user:', error);

        let errorDetail = 'Failed to save user';
        if (error.message && error.message !== '[object Object]' && error.message !== 'Error: [object Object]') {
            errorDetail = error.message;
        } else if (error.toString && error.toString() !== '[object Object]') {
            errorDetail = error.toString();
        }

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: errorDetail,
            life: 3000
        });
    } finally {
        loading.value = false;
    }
};

const hideDialog = () => {
    userDialog.value = false;
    submitted.value = false;
};

const onPage = (event) => {
    currentPage.value = event.page + 1;
    rowsPerPage.value = event.rows;
    loadUsers(currentPage.value, rowsPerPage.value, searchQuery.value);
};

const debounceSearch = () => {
    if (searchTimeout.value) clearTimeout(searchTimeout.value);
    searchTimeout.value = setTimeout(() => {
        loadUsers(1, rowsPerPage.value, searchQuery.value);
        currentPage.value = 1;
    }, 500);
};

// Helper function to parse and validate date values from backend
const parseAndValidateDate = (dateValue) => {
    if (!dateValue) return null;

    // Handle timestamp numbers (milliseconds since epoch)
    if (typeof dateValue === 'number') {
        return new Date(dateValue).toISOString();
    }

    // Handle string dates
    if (typeof dateValue === 'string') {
        // If it's already an ISO string, return as is
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(dateValue)) {
            return dateValue;
        }

        // Try to parse other string formats
        const parsedDate = new Date(dateValue);
        if (!isNaN(parsedDate.getTime())) {
            return parsedDate.toISOString();
        }
    }

    return null;
};

// Lifecycle hooks
onMounted(() => {
    try {
        console.log('UserManagement component mounted, loading users...');
        loadUsers();
    } catch (error) {
        console.error('Error in onMounted lifecycle hook:', error);
        toast.add({
            severity: 'error',
            summary: 'Initialization Error',
            detail: 'Failed to initialize user management',
            life: 5000
        });
    }
});
</script>

<style scoped>
/* Enhanced Tailwind custom styles */

/* Custom animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in-up {
    animation: fadeInUp 0.3s ease-out;
}

/* Glassmorphism effect */
.backdrop-blur-sm {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

/* Custom gradient text */
.bg-clip-text {
    background-clip: text;
    -webkit-background-clip: text;
}

/* PrimeVue component customizations with enhanced styling */
:deep(.p-dropdown) {
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;
}

:deep(.p-dropdown:hover) {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

:deep(.p-dropdown:focus-within) {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

:deep(.p-confirm-dialog-message) {
    margin-left: 1rem;
}

/* Enhanced DataTable styling */
:deep(.p-datatable-wrapper) {
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    color: #334155;
    font-weight: 600;
    border-bottom: 2px solid #e2e8f0;
    padding: 1rem 0.75rem;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
    transition: all 0.2s ease;
    border-bottom: 1px solid #f1f5f9;
}

:deep(.p-datatable .p-datatable-tbody > tr:nth-child(even)) {
    background-color: #fafafa;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
    padding: 1rem 0.75rem;
    border: none;
}

/* Enhanced Paginator */
:deep(.p-paginator) {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border: none;
    border-top: 1px solid #e2e8f0;
    padding: 1rem;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page) {
    border-radius: 0.5rem;
    margin: 0 0.125rem;
    transition: all 0.2s ease;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page:hover) {
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    color: white;
    transform: scale(1.05);
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page.p-highlight) {
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    color: white;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* Enhanced Dialog */
:deep(.p-dialog) {
    border-radius: 1rem;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
}

:deep(.p-dialog .p-dialog-header) {
    border-bottom: 1px solid #e2e8f0;
    border-radius: 1rem 1rem 0 0;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    padding: 1.5rem;
}

:deep(.p-dialog .p-dialog-content) {
    padding: 0 1.5rem;
}

:deep(.p-dialog .p-dialog-footer) {
    padding: 1.5rem;
    border-top: 1px solid #e2e8f0;
    border-radius: 0 0 1rem 1rem;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

/* Enhanced Password component */
:deep(.p-password) {
    width: 100%;
}

:deep(.p-password .p-inputtext) {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;
}

:deep(.p-password .p-inputtext:focus) {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Enhanced InputText */
:deep(.p-inputtext) {
    transition: all 0.2s ease;
}

:deep(.p-inputtext:hover) {
    border-color: #64748b;
}

:deep(.p-inputtext:focus) {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Enhanced Tags */
:deep(.p-tag) {
    border-radius: 9999px;
    font-weight: 600;
    font-size: 0.75rem;
    padding: 0.375rem 0.75rem;
}

/* Button hover effects */
:deep(.p-button) {
    transition: all 0.2s ease;
}

:deep(.p-button:hover) {
    transform: translateY(-1px);
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
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
</style>
