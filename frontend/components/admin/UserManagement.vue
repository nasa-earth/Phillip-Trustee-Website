<template>
    <div class="space-y-4">
        <div class="flex justify-between items-center">
            <h3 class="text-xl font-semibold text-gray-800">User Management</h3>
            <Button label="Create User" icon="pi pi-plus" severity="success" @click="openCreateUserDialog" />
        </div>

        <div class="mb-4">
            <span class="p-input-icon-left w-full sm:w-64">
                <i class="pi pi-search" />
                <InputText v-model="searchQuery" placeholder="Search users..." @input="debounceSearch" class="w-full" />
            </span>
        </div>

        <DataTable :value="users" :loading="loading" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 20]"
            v-model:filters="filters" filterDisplay="menu" responsiveLayout="scroll" stripedRows class="users-table"
            :totalRecords="totalRecords" :lazy="true" @page="onPage">
            <Column field="name" header="Name" :sortable="true">
                <template #body="{ data }">
                    <div class="flex items-center">
                        <div
                            class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-2">
                            {{ data.name ? data.name.charAt(0).toUpperCase() : '?' }}
                        </div>
                        <span>{{ data.name }}</span>
                    </div>
                </template>
            </Column>
            <Column field="email" header="Email" :sortable="true"></Column>
            <Column field="role" header="Role">
                <template #body="{ data }">
                    <Tag :value="data.role" :severity="getRoleSeverity(data.role)" />
                </template>
            </Column>
            <Column field="createdAt" header="Created At" :sortable="true">
                <template #body="{ data }">
                    <div class="flex flex-col">
                        <span>{{ formatDate(data.createdAt) }}</span>
                        <span v-if="data.createdAt" class="text-xs text-gray-500">
                            {{ new Date(data.createdAt).toLocaleTimeString() }}
                        </span>
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                </template>
            </Column>
            <Column field="lastActive" header="Last Active" :sortable="true">
                <template #body="{ data }">
                    <span v-tooltip.top="data.lastActive ? new Date(data.lastActive).toLocaleString() : 'Never'">
                        {{ formatDate(data.lastActive) }}
                    </span>
                </template>
            </Column>
            <Column header="Actions">
                <template #body="{ data }">
                    <div class="flex gap-2">
                        <Button icon="pi pi-eye" rounded text severity="info" aria-label="View"
                            @click="viewUser(data)" />
                        <Button icon="pi pi-pencil" rounded text severity="success" aria-label="Edit"
                            @click="editUser(data)" />
                        <Button icon="pi pi-trash" rounded text severity="danger" aria-label="Delete"
                            @click="confirmDeleteUser(data)" />
                    </div>
                </template>
            </Column>
        </DataTable>

        <!-- Create/Edit User Dialog -->
        <Dialog v-model:visible="userDialog" :header="dialogMode === 'create' ? 'Create User' : 'Edit User'"
            :modal="true" class="p-fluid">
            <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <InputText id="name" v-model="user.name" required autofocus
                    :class="{ 'p-invalid': submitted && !user.name, 'w-full': true }" />
                <small class="text-red-500 text-xs" v-if="submitted && !user.name">Name is required.</small>
            </div>
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <InputText id="email" v-model="user.email" required
                    :class="{ 'p-invalid': submitted && !user.email, 'w-full': true }" />
                <small class="text-red-500 text-xs" v-if="submitted && !user.email">Email is required.</small>
            </div>
            <div class="mb-4" v-if="dialogMode === 'create'">
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <Password id="password" v-model="user.password" required
                    :class="{ 'p-invalid': submitted && !user.password, 'w-full': true }" toggleMask />
                <small class="text-red-500 text-xs" v-if="submitted && !user.password">Password is required.</small>
            </div>
            <div class="mb-4">
                <label for="role" class="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <Dropdown id="role" v-model="user.role" :options="roles" optionLabel="label" optionValue="value"
                    placeholder="Select a Role" class="w-full" />
            </div>

            <template #footer>
                <div class="flex justify-end gap-2">
                    <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                    <Button label="Save" icon="pi pi-check" severity="success" @click="saveUser" />
                </div>
            </template>
        </Dialog>

        <!-- Delete User Confirmation -->
        <ConfirmDialog></ConfirmDialog>

        <!-- User View Dialog -->
        <Dialog v-model:visible="userViewDialog" :header="`User Details`" :modal="true" :style="{ width: '500px' }">
            <div v-if="selectedUser" class="space-y-6">
                <!-- User profile header -->
                <div class="flex flex-col items-center text-center">
                    <div
                        class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold mb-2">
                        {{ selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : '?' }}
                    </div>
                    <h3 class="text-xl font-semibold">{{ selectedUser.name }}</h3>
                    <p class="text-gray-600">{{ selectedUser.email }}</p>
                    <Tag :value="selectedUser.role" :severity="getRoleSeverity(selectedUser.role)" class="mt-2" />
                </div>

                <!-- User timestamps details -->
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="text-sm font-medium uppercase text-gray-500 mb-3">Timestamp Information</h4>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <p class="text-xs text-gray-500">Created At</p>
                            <div class="flex items-center">
                                <i class="pi pi-calendar text-blue-500 mr-2"></i>
                                <div>
                                    <p class="font-medium">{{ formatDate(selectedUser.createdAt) }}</p>
                                    <p class="text-xs text-gray-500" v-if="selectedUser.createdAt">
                                        {{ new Date(selectedUser.createdAt).toLocaleString() }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-1">
                            <p class="text-xs text-gray-500">Last Updated</p>
                            <div class="flex items-center">
                                <i class="pi pi-sync text-green-500 mr-2"></i>
                                <div>
                                    <p class="font-medium">{{ formatDate(selectedUser.updatedAt) }}</p>
                                    <p class="text-xs text-gray-500" v-if="selectedUser.updatedAt">
                                        {{ new Date(selectedUser.updatedAt).toLocaleString() }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-1">
                            <p class="text-xs text-gray-500">Last Active</p>
                            <div class="flex items-center">
                                <i class="pi pi-user text-amber-500 mr-2"></i>
                                <div>
                                    <p class="font-medium">{{ formatDate(selectedUser.lastActive) }}</p>
                                    <p class="text-xs text-gray-500" v-if="selectedUser.lastActive">
                                        {{ new Date(selectedUser.lastActive).toLocaleString() }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-1">
                            <p class="text-xs text-gray-500">Last Login</p>
                            <div class="flex items-center">
                                <i class="pi pi-sign-in text-purple-500 mr-2"></i>
                                <div>
                                    <p class="font-medium">{{ formatDate(selectedUser.lastLogin) }}</p>
                                    <p class="text-xs text-gray-500" v-if="selectedUser.lastLogin">
                                        {{ new Date(selectedUser.lastLogin).toLocaleString() }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="flex justify-end gap-2">
                    <Button label="Edit" icon="pi pi-pencil" severity="success" @click="editFromViewDialog" />
                    <Button label="Close" icon="pi pi-times" text @click="userViewDialog = false" />
                </div>
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '~/stores/auth';

// Composables and utilities
const apiUrl = useApiUrl();
const authStore = useAuthStore();
const confirm = useConfirm();
const toast = useToast();

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

        console.log('API Response structure:', Object.keys(data));

        // Debug user data from backend
        if (data.users && data.users.length > 0) {
            console.log('Sample user data from API:', data.users[0]);
        } else if (data.data && data.data.length > 0) {
            console.log('Sample user data from API (data property):', data.data[0]);
        } else if (Array.isArray(data) && data.length > 0) {
            console.log('Sample user data from API (array response):', data[0]);
        }

        // Determine the data structure from the response
        console.log('Full API response:', data);

        // Handle the nested response structure from NestJS with Interceptors
        if (data.status === 200 && data.data) {
            data = data.data; // Unwrap the data from the standard response format
        }

        let userData = [];
        if (Array.isArray(data)) {
            userData = data;
            totalRecords.value = data.length;
        } else if (data.users && Array.isArray(data.users)) {
            userData = data.users;
            totalRecords.value = data.total || data.users.length;
        } else if (data.data && Array.isArray(data.data)) {
            userData = data.data;
            totalRecords.value = data.total || data.count || data.data.length;
        } else {
            console.error('Unexpected API response format:', data);
            toast.add({
                severity: 'error',
                summary: 'API Error',
                detail: 'Unexpected data format received from server',
                life: 5000
            });
            // Try to handle the case where data might be in an unexpected format
            if (typeof data === 'object' && data !== null) {
                // Look for any array property that might contain users
                const possibleArrays = Object.values(data).filter(val => Array.isArray(val));
                if (possibleArrays.length > 0) {
                    userData = possibleArrays[0];
                    totalRecords.value = userData.length;
                    console.log('Found potential user data in an unexpected location:', userData);
                }
            }
        }

        // Process dates before assignment
        users.value = userData.map(user => ({
            ...user,
            // Ensure dates are properly formatted and handle nullish values
            createdAt: parseAndValidateDate(user.createdAt),
            updatedAt: parseAndValidateDate(user.updatedAt),
            lastActive: parseAndValidateDate(user.lastActive),
            lastLogin: parseAndValidateDate(user.lastLogin)
        }));

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
    user.value = { ...data };
    dialogMode.value = 'edit';
    submitted.value = false;
    userDialog.value = true;
};

const editFromViewDialog = () => {
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
    } catch (error) {
        console.error('Error deleting user:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete user', life: 3000 });
    }
};

const saveUser = async () => {
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
                throw new Error(
                    responseData?.message ||
                    (responseData?.error && typeof responseData.error === 'string' ? responseData.error : '') ||
                    `Create user failed with status: ${response.status}`
                );
            }

            // Check if response follows the NestJS standard format
            if (responseData && responseData.status === 201 && responseData.data) {
                console.log('Created user:', responseData.data);
            }

            toast.add({ severity: 'success', summary: 'Success', detail: 'User created successfully', life: 3000 });
        } else {
            const { id, ...updateData } = user.value;
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
                throw new Error(
                    responseData?.message ||
                    (responseData?.error && typeof responseData.error === 'string' ? responseData.error : '') ||
                    `Update user failed with status: ${response.status}`
                );
            }

            // Check if response follows the NestJS standard format
            if (responseData && responseData.status === 200 && responseData.data) {
                console.log('Updated user:', responseData.data);
            }

            toast.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully', life: 3000 });
        }

        hideDialog();
        loadUsers(currentPage.value, rowsPerPage.value, searchQuery.value);
    } catch (error) {
        console.error('Error saving user:', error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'Failed to save user',
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
/* Keep only PrimeVue specific styling that can't be handled with Tailwind */
:deep(.p-dropdown) {
    width: 100%;
}

:deep(.p-confirm-dialog-message) {
    margin-left: 1rem;
}

/* PrimeVue DataTable customization */
:deep(.p-datatable-wrapper) {
    border-radius: 0.5rem;
    overflow: hidden;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
    background-color: #f9fafb;
    color: #374151;
}

:deep(.p-datatable .p-datatable-tbody > tr:nth-child(even)) {
    background-color: #f9fafb;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
    background-color: #eff6ff;
}
</style>
