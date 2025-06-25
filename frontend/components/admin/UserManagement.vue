<template>
    <div class="w-full py-4">
        <Toast />
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 class="text-2xl font-bold text-slate-800 m-0">User Management</h2>
            <div class="flex flex-col w-full md:flex-row md:w-auto gap-4">
                <div class="flex flex-wrap gap-3">
                    <span class="p-input-icon-left w-full md:w-64 relative">
                        <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                        <InputText v-model="filters.global.value" placeholder="Search users..."
                            class="w-full pl-10 py-2 rounded-lg border-slate-200 focus:border-blue-400 focus:ring focus:ring-blue-100" />
                    </span>
                    <div class="flex gap-2">
                        <Dropdown v-model="statusFilter" :options="statusOptions" optionLabel="label"
                            placeholder="Status" class="w-36 md:w-40"
                            panelClass="dropdown-panel-modern shadow-xl rounded-lg border-0" />
                        <Dropdown v-model="roleFilter" :options="roleOptions" optionLabel="label" placeholder="Role"
                            class="w-36 md:w-40" panelClass="dropdown-panel-modern shadow-xl rounded-lg border-0" />
                    </div>
                </div>
                <div class="flex gap-2 items-center self-end md:self-auto">
                    <Button label="Add New User" icon="pi pi-plus" severity="success"
                        class="px-4 py-2 shadow-sm hover:shadow transition-all rounded-lg" @click="openNewUserDialog" />
                    <Button icon="pi pi-refresh" rounded text class="hover:bg-slate-100 p-2" @click="fetchUsers"
                        v-tooltip.top="'Refresh Data'" />
                </div>
            </div>
        </div>

        <!-- Error message panel -->
        <Message v-if="apiError" severity="error" :closable="true" @close="apiError = null"
            class="mb-4 border-l-4 border-rose-500 bg-rose-50 shadow-sm rounded-lg">
            <div class="flex items-center gap-2">
                <i class="pi pi-exclamation-circle text-rose-500 text-xl"></i>
                <div>
                    <p class="font-medium text-rose-700">{{ apiError }}</p>
                    <Button label="Try Again" icon="pi pi-refresh" class="p-button-sm mt-2" @click="fetchUsers" />
                </div>
            </div>
        </Message>

        <!-- User Data Table -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100">
            <DataTable :value="filteredUsers" v-model:filters="filters" v-model:selection="selectedUsers"
                :paginator="true" :rows="8" :rowsPerPageOptions="[8, 16, 24]" filterDisplay="menu"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users" responsiveLayout="scroll"
                :loading="loading" stripedRows class="user-table" emptyMessage="No users found" :rowHover="true"
                removableSort>

                <template #empty>
                    <div class="flex flex-col items-center justify-center py-12 text-slate-500 text-center">
                        <i class="pi pi-users text-5xl mb-4 text-slate-300"></i>
                        <p class="text-xl font-medium mb-2">No users found</p>
                        <small v-if="!apiError" class="text-slate-400">Try adding a new user or modifying your search
                            criteria.</small>
                        <small v-else class="text-slate-400">There was a problem loading user data.</small>
                        <Button v-if="!loading" label="Add First User" icon="pi pi-plus" class="mt-4 p-button-outlined"
                            @click="openNewUserDialog" />
                    </div>
                </template>

                <template #loading>
                    <div class="flex flex-col items-center justify-center py-12 text-slate-500 text-center">
                        <i class="pi pi-spinner pi-spin text-4xl mb-4 text-blue-400"></i>
                        <p class="text-xl font-medium">Loading user data...</p>
                    </div>
                </template>

                <Column selectionMode="multiple" headerStyle="width: 3rem" class="select-column"></Column>

                <Column field="name" header="Name" sortable style="min-width: 14rem">
                    <template #header>
                        <div class="text-sm font-semibold text-slate-600 uppercase tracking-wider">Name</div>
                    </template>
                    <template #body="{ data }">
                        <div class="flex items-center gap-4">
                            <Avatar :image="data.avatar" :label="getUserInitials(data.name)" shape="circle" size="large"
                                class="border-2 border-white shadow-sm"
                                :style="{ 'background-color': getAvatarColor(data.name) }" />
                            <div class="flex flex-col">
                                <span class="font-semibold text-slate-800 mb-1">{{ data.name }}</span>
                                <span class="text-sm text-slate-500 flex items-center">
                                    <i class="pi pi-envelope text-xs mr-1"></i>
                                    {{ data.email }}
                                </span>
                            </div>
                        </div>
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by name"
                            class="p-column-filter w-full px-3 py-2" />
                    </template>
                </Column>

                <Column field="role" header="Role" sortable style="min-width: 10rem">
                    <template #header>
                        <div class="text-sm font-semibold text-slate-600 uppercase tracking-wider">Role</div>
                    </template>
                    <template #body="{ data }">
                        <Tag :value="data.role" :class="{
                            'bg-gradient-to-r from-rose-500 to-pink-500 font-medium text-white shadow-sm': data.role === 'ADMIN',
                            'bg-gradient-to-r from-blue-500 to-indigo-500 font-medium text-white shadow-sm': data.role === 'EDITOR'
                        }" />
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="roleOptions"
                            optionLabel="label" optionValue="value" placeholder="Select a role"
                            class="p-column-filter w-full" />
                    </template>
                </Column>

                <Column field="lastActive" header="Last Active" sortable style="min-width: 10rem">
                    <template #header>
                        <div class="text-sm font-semibold text-slate-600 uppercase tracking-wider">Last Active</div>
                    </template>
                    <template #body="{ data }">
                        <div class="flex items-center text-slate-600">
                            <i class="pi pi-calendar mr-2 text-sm"></i>
                            <span>{{ formatDate(data.lastActive) }}</span>
                        </div>
                    </template>
                </Column>

                <Column field="status" header="Status" sortable style="min-width: 8rem">
                    <template #header>
                        <div class="text-sm font-semibold text-slate-600 uppercase tracking-wider">Status</div>
                    </template>
                    <template #body="{ data }">
                        <div class="flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full animate-pulse"
                                :class="{ 'bg-green-500': data.status === 'Active', 'bg-amber-500': data.status === 'Inactive' }"></span>
                            <Tag :value="data.status" :class="{
                                'bg-green-100 text-green-800 border border-green-200': data.status === 'Active',
                                'bg-amber-100 text-amber-800 border border-amber-200': data.status === 'Inactive'
                            }" />
                        </div>
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="statusOptions"
                            optionLabel="label" optionValue="value" placeholder="Select a status"
                            class="p-column-filter w-full" />
                    </template>
                </Column>

                <Column header="Actions" :exportable="false" style="min-width: 12rem">
                    <template #header>
                        <div class="text-sm font-semibold text-slate-600 uppercase tracking-wider">Actions</div>
                    </template>
                    <template #body="{ data }">
                        <div class="flex gap-2 justify-center">
                            <Button icon="pi pi-eye" rounded text severity="info"
                                class="hover:bg-blue-50 p-2 transition-colors" v-tooltip.top="'View Details'"
                                @click="viewUserDetails(data)" />
                            <Button icon="pi pi-pencil" rounded text severity="success"
                                class="hover:bg-green-50 p-2 transition-colors" v-tooltip.top="'Edit User'"
                                @click="editUser(data)" />
                            <Button icon="pi pi-trash" rounded text severity="danger"
                                class="hover:bg-rose-50 p-2 transition-colors" v-tooltip.top="'Delete User'"
                                @click="confirmDeleteUser(data)" />
                        </div>
                    </template>
                </Column>

                <template #footer>
                    <div class="flex justify-between items-center px-4 py-2">
                        <div class="text-sm text-slate-500">
                            {{ selectedUsers.length > 0 ? `${selectedUsers.length} users selected` : '' }}
                        </div>
                        <Button v-if="selectedUsers.length > 0" label="Delete Selected" icon="pi pi-trash"
                            severity="danger" @click="deleteUsersDialog = true" />
                    </div>
                </template>
            </DataTable>
        </div>

        <!-- User Dialog (Add/Edit) -->
        <Dialog v-model:visible="userDialog" :style="{ width: '500px' }" header="User Details" :modal="true"
            class="user-dialog" :dismissableMask="true" :closeOnEscape="true">
            <div class="p-4">
                <div class="mb-6 flex justify-center">
                    <Avatar :image="user.avatar" :label="getUserInitials(user.name)" shape="circle" size="xlarge"
                        class="w-24 h-24 text-4xl border-4 border-white shadow-lg"
                        :style="{ 'background-color': getAvatarColor(user.name) }" />
                </div>

                <div class="field mb-4">
                    <label for="name" class="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <InputText id="name" v-model.trim="user.name" required autofocus class="w-full rounded-lg"
                        :class="{ 'p-invalid': submitted && !user.name }" />
                    <small class="text-rose-500" v-if="submitted && !user.name">Name is required.</small>
                </div>

                <div class="field mb-4">
                    <label for="email" class="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <InputText id="email" v-model.trim="user.email" required class="w-full rounded-lg"
                        :class="{ 'p-invalid': submitted && !user.email }" />
                    <small class="text-rose-500" v-if="submitted && !user.email">Email is required.</small>
                </div>

                <div class="field mb-4">
                    <label for="role" class="block text-sm font-medium text-slate-700 mb-1">Role</label>
                    <Dropdown id="role" v-model="user.role" :options="roleOptions" optionLabel="label"
                        optionValue="value" placeholder="Select a Role" class="w-full rounded-lg" />
                </div>

                <div class="field mb-4">
                    <label class="block text-sm font-medium text-slate-700 mb-2">Status</label>
                    <div class="flex gap-4">
                        <div class="field-radiobutton flex items-center">
                            <RadioButton id="status1" name="status" value="Active" v-model="user.status" />
                            <label for="status1" class="ml-2 text-slate-600">Active</label>
                        </div>
                        <div class="field-radiobutton flex items-center">
                            <RadioButton id="status2" name="status" value="Inactive" v-model="user.status" />
                            <label for="status2" class="ml-2 text-slate-600">Inactive</label>
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="flex justify-end gap-2">
                    <Button label="Cancel" icon="pi pi-times" text class="px-4 py-2" @click="hideDialog" />
                    <Button label="Save" icon="pi pi-check" text
                        class="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100" @click="saveUser" />
                </div>
            </template>
        </Dialog>

        <!-- Delete Confirmation Dialog -->
        <Dialog v-model:visible="deleteUserDialog" :style="{ width: '450px' }" header="Confirm Deletion" :modal="true"
            :dismissableMask="true" :closeOnEscape="true">
            <div class="confirmation-content p-4">
                <div class="flex items-center">
                    <i class="pi pi-exclamation-triangle text-3xl text-amber-500 mr-4"></i>
                    <div>
                        <h3 class="text-xl font-semibold mb-2">Delete Confirmation</h3>
                        <p v-if="user">Are you sure you want to delete <b>{{ user.name }}</b>?</p>
                        <p class="text-slate-500 mt-2 text-sm">This action cannot be undone.</p>
                    </div>
                </div>
            </div>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <Button label="Cancel" icon="pi pi-times" text @click="deleteUserDialog = false" />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" @click="deleteUser" />
                </div>
            </template>
        </Dialog>

        <!-- Delete Multiple Users Confirmation Dialog -->
        <Dialog v-model:visible="deleteUsersDialog" :style="{ width: '450px' }" header="Confirm Multiple Deletion"
            :modal="true" :dismissableMask="true" :closeOnEscape="true">
            <div class="confirmation-content p-4">
                <div class="flex items-center">
                    <i class="pi pi-exclamation-triangle text-3xl text-amber-500 mr-4"></i>
                    <div>
                        <h3 class="text-xl font-semibold mb-2">Delete Selected Users</h3>
                        <p>Are you sure you want to delete the {{ selectedUsers.length }} selected users?</p>
                        <p class="text-slate-500 mt-2 text-sm">This action cannot be undone.</p>
                    </div>
                </div>
            </div>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <Button label="Cancel" icon="pi pi-times" text @click="deleteUsersDialog = false" />
                    <Button label="Delete All" icon="pi pi-trash" severity="danger" @click="deleteSelectedUsers" />
                </div>
            </template>
        </Dialog>

        <!-- User Details View Dialog -->
        <Dialog v-model:visible="userViewDialog" :style="{ width: '600px' }" header="User Details" :modal="true"
            :dismissableMask="true" :closeOnEscape="true">
            <div v-if="selectedViewUser" class="p-4">
                <div class="flex flex-col items-center mb-8 text-center">
                    <Avatar :image="selectedViewUser.avatar" :label="getUserInitials(selectedViewUser.name)"
                        shape="circle" size="xlarge" class="w-28 h-28 text-5xl mb-4 border-4 border-white shadow-lg"
                        :style="{ 'background-color': getAvatarColor(selectedViewUser.name) }" />
                    <h3 class="text-2xl font-bold text-slate-800 mt-2 mb-1">{{ selectedViewUser.name }}</h3>
                    <Tag :value="selectedViewUser.role" :class="{
                        'bg-gradient-to-r from-rose-500 to-pink-500 font-medium text-white shadow-sm': selectedViewUser.role === 'ADMIN',
                        'bg-gradient-to-r from-blue-500 to-indigo-500 font-medium text-white shadow-sm': selectedViewUser.role === 'EDITOR'
                    }" />
                    <p class="text-slate-500 mt-3 mb-0 flex items-center justify-center gap-1">
                        <i class="pi pi-envelope"></i>
                        {{ selectedViewUser.email }}
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-slate-50 p-6 rounded-xl">
                    <div class="flex flex-col gap-2">
                        <span class="font-semibold text-slate-500 text-sm">Status:</span>
                        <div class="flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full"
                                :class="{ 'bg-green-500 animate-pulse': selectedViewUser.status === 'Active', 'bg-amber-500': selectedViewUser.status === 'Inactive' }"></span>
                            <Tag :value="selectedViewUser.status" :class="{
                                'bg-green-100 text-green-800 border border-green-200': selectedViewUser.status === 'Active',
                                'bg-amber-100 text-amber-800 border border-amber-200': selectedViewUser.status === 'Inactive'
                            }" />
                        </div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="font-semibold text-slate-500 text-sm">Last Active:</span>
                        <span class="flex items-center text-slate-700">
                            <i class="pi pi-clock mr-2"></i>
                            {{ formatDate(selectedViewUser.lastActive) }}
                        </span>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="font-semibold text-slate-500 text-sm">Account Created:</span>
                        <span class="flex items-center text-slate-700">
                            <i class="pi pi-calendar-plus mr-2"></i>
                            {{ formatDate(selectedViewUser.createdAt || '2025-01-01') }}
                        </span>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="font-semibold text-slate-500 text-sm">Last Login:</span>
                        <span class="flex items-center text-slate-700">
                            <i class="pi pi-sign-in mr-2"></i>
                            {{ formatDate(selectedViewUser.lastLogin || selectedViewUser.lastActive) }}
                        </span>
                    </div>
                </div>

                <div class="flex justify-center gap-4 pt-4 border-t border-slate-100">
                    <Button label="Edit User" icon="pi pi-pencil" outlined class="px-4 py-2" @click="editViewedUser" />
                    <Button label="Close" icon="pi pi-times" text class="px-4 py-2" @click="userViewDialog = false" />
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '~/stores/auth';

const toast = useToast();
const authStore = useAuthStore();
const apiUrl = useApiUrl();
const loading = ref(false);
const userDialog = ref(false);
const deleteUserDialog = ref(false);
const deleteUsersDialog = ref(false);
const userViewDialog = ref(false);
const submitted = ref(false);
const apiError = ref(null);
const selectedUsers = ref([]);
const selectedViewUser = ref(null);
const statusFilter = ref(null);
const roleFilter = ref(null);
const filters = ref({
    global: { value: null, matchMode: 'contains' },
    name: { operator: 'and', constraints: [{ value: null, matchMode: 'startsWith' }] },
    role: { operator: 'and', constraints: [{ value: null, matchMode: 'equals' }] },
    status: { operator: 'and', constraints: [{ value: null, matchMode: 'equals' }] },
});

// Empty user object template
const emptyUser = {
    id: null,
    name: '',
    email: '',
    role: 'EDITOR',
    lastActive: new Date().toISOString().slice(0, 10),
    status: 'Active',
    avatar: null
};

const user = ref({ ...emptyUser });

// Users data from API
const users = ref([]);

// Options for dropdowns
const statusOptions = ref([
    { label: 'All Statuses', value: null },
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' }
]);

const roleOptions = ref([
    { label: 'All Roles', value: null },
    { label: 'Administrator', value: 'ADMIN' },
    { label: 'Editor', value: 'EDITOR' }
]);

// Filter users based on selected filters
const filteredUsers = computed(() => {
    let result = [...users.value];

    if (statusFilter.value?.value) {
        result = result.filter(user => user.status === statusFilter.value.value);
    }

    if (roleFilter.value?.value) {
        result = result.filter(user => user.role === roleFilter.value.value);
    }

    return result;
});

// Helper function to get user initials
const getUserInitials = (name) => {
    if (!name) return '??';
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
};

// Format the date in a more readable way
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
        return 'Today';
    } else if (diffDays <= 2) {
        return 'Yesterday';
    } else if (diffDays <= 7) {
        return `${diffDays} days ago`;
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
};

// Open dialog to add a new user
const openNewUserDialog = () => {
    user.value = { ...emptyUser };
    submitted.value = false;
    userDialog.value = true;
};

// Hide the user dialog
const hideDialog = () => {
    userDialog.value = false;
    submitted.value = false;
};

// Save the user (add or update)
const saveUser = async () => {
    submitted.value = true;

    if (user.value.name.trim() && user.value.email.trim()) {
        try {
            if (user.value.id) {
                // Update existing user
                await updateUser(user.value.id, user.value);
            } else {
                // Add new user
                await createUser(user.value);
            }

            userDialog.value = false;
            user.value = { ...emptyUser };
        } catch (error) {
            // Error handling is done in the API functions
            console.error('Error saving user:', error);
        }
    }
};

// View user details
const viewUserDetails = (userData) => {
    selectedViewUser.value = { ...userData };
    userViewDialog.value = true;
};

// Edit user from the actions column
const editUser = (userData) => {
    user.value = { ...userData };
    userDialog.value = true;
};

// Edit user from the view dialog
const editViewedUser = () => {
    user.value = { ...selectedViewUser.value };
    userViewDialog.value = false;
    userDialog.value = true;
};

// Confirm deletion of a single user
const confirmDeleteUser = (userData) => {
    user.value = { ...userData };
    deleteUserDialog.value = true;
};

// Delete a single user
const deleteUser = async () => {
    try {
        await deleteUserFromApi(user.value.id);
        deleteUserDialog.value = false;
        user.value = { ...emptyUser };
    } catch (error) {
        // Error handling is done in the API function
        console.error('Error in delete user flow:', error);
    }
};

// Delete multiple selected users
const deleteSelectedUsers = async () => {
    try {
        loading.value = true;

        // Delete each selected user one by one
        const promises = selectedUsers.value.map(selectedUser =>
            deleteUserFromApi(selectedUser.id)
        );

        await Promise.all(promises);

        deleteUsersDialog.value = false;
        selectedUsers.value = [];
    } catch (error) {
        console.error('Error deleting multiple users:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Some users could not be deleted', life: 5000 });
    } finally {
        loading.value = false;
    }
};

// API methods
const fetchUsers = async () => {
    try {
        loading.value = true;
        apiError.value = null;

        const response = await fetch(apiUrl.users.list, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authStore.accessToken}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to fetch users');
        }

        const data = await response.json();
        // Adapt the response data to match our component's structure if needed
        users.value = data.map(user => ({
            id: user.id,
            name: user.name || 'Unknown User',
            email: user.email,
            role: user.role || 'EDITOR',
            lastActive: user.lastActive || user.updatedAt || new Date().toISOString(),
            status: user.status || 'Active',
            avatar: user.avatar || null,
            createdAt: user.createdAt || null,
            lastLogin: user.lastLogin || user.lastActive || null
        }));
    } catch (error) {
        console.error('Error fetching users:', error);
        apiError.value = `Failed to load users: ${error.message}`;
        toast.add({ severity: 'error', summary: 'Error', detail: `Failed to load users: ${error.message}`, life: 5000 });
        // Fallback to empty array if API fails
        users.value = [];
    } finally {
        loading.value = false;
    }
};

const createUser = async (userData) => {
    try {
        loading.value = true;

        const response = await fetch(apiUrl.users.create, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authStore.accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to create user');
        }

        const createdUser = await response.json();
        toast.add({ severity: 'success', summary: 'Success', detail: 'User created successfully', life: 3000 });

        // Refresh the user list
        await fetchUsers();
        return createdUser;
    } catch (error) {
        console.error('Error creating user:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: `Failed to create user: ${error.message}`, life: 5000 });
        throw error;
    } finally {
        loading.value = false;
    }
};

const updateUser = async (id, userData) => {
    try {
        loading.value = true;

        const response = await fetch(apiUrl.users.update(id), {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authStore.accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to update user');
        }

        const updatedUser = await response.json();
        toast.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully', life: 3000 });

        // Refresh the user list
        await fetchUsers();
        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: `Failed to update user: ${error.message}`, life: 5000 });
        throw error;
    } finally {
        loading.value = false;
    }
};

const deleteUserFromApi = async (id) => {
    try {
        loading.value = true;

        const response = await fetch(apiUrl.users.delete(id), {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authStore.accessToken}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to delete user');
        }

        toast.add({ severity: 'success', summary: 'Success', detail: 'User deleted successfully', life: 3000 });

        // Refresh the user list
        await fetchUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: `Failed to delete user: ${error.message}`, life: 5000 });
        throw error;
    } finally {
        loading.value = false;
    }
};

// Fetch users data from the API
onMounted(async () => {
    await fetchUsers();
});

// Add a function to generate consistent colors based on user name
const getAvatarColor = (name) => {
    if (!name) return '#6366f1'; // Default indigo color

    // Generate a simple hash from the name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Use predefined colors for better UI
    const colors = [
        '#6366f1', // indigo
        '#8b5cf6', // violet
        '#ec4899', // pink
        '#f43f5e', // rose
        '#0ea5e9', // sky
        '#10b981', // emerald
        '#f59e0b', // amber
        '#6d28d9', // purple
    ];

    return colors[Math.abs(hash) % colors.length];
};
</script>

<style>
/* All styles converted to Tailwind CSS utility classes */
.user-table .p-datatable-wrapper {
    border-radius: 0.75rem;
    overflow: hidden;
}

.user-table .p-datatable-header {
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
}

.user-table .p-datatable-thead>tr>th {
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    padding: 1rem;
}

.user-table .p-datatable-tbody>tr {
    transition: all 0.2s ease;
}

.user-table .p-datatable-tbody>tr:hover {
    background-color: #f1f5f9 !important;
}

.user-table .p-datatable-tbody>tr>td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #f1f5f9;
}

.user-table .p-paginator {
    background-color: #f8fafc;
    border-top: 1px solid #e2e8f0;
    padding: 0.75rem 1rem;
}

.user-dialog .p-dialog-header {
    border-bottom: 1px solid #e2e8f0;
    padding: 1.25rem;
}

.dropdown-panel-modern {
    margin-top: 0.5rem;
    border-radius: 0.5rem;
}
</style>
