<template>
    <div class="p-6">
        <!-- Partners Management Header -->
        <div class="flex justify-between items-center mb-8">
            <h3 class="text-2xl font-semibold text-gray-800">Partners Management</h3>
            <Button label="Add Partner" icon="pi pi-plus" @click="showAddDialog = true"
                class="bg-green-600 hover:bg-green-700 border-green-600 text-white px-4 py-2 rounded-lg font-medium" />
        </div>

        <!-- Partners List -->
        <div v-if="loading" class="flex flex-col items-center py-12 gap-4">
            <ProgressSpinner />
            <p class="text-gray-600">Loading partners...</p>
            <Button label="Cancel" icon="pi pi-times" @click="cancelLoading" class="p-button-text p-button-sm"
                v-if="loading" />
        </div>

        <div v-else-if="error" class="mb-8">
            <Message severity="error" :closable="false">
                {{ error }}
                <template #slot>
                    <div class="flex justify-end mt-3">
                        <Button label="Retry" icon="pi pi-refresh" @click="retryLoadPartners" class="p-button-sm" />
                    </div>
                </template>
            </Message>
        </div>

        <div v-else class="bg-white rounded-lg shadow-sm border border-gray-200">
            <DataTable :value="partnersForManagement" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 20]"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} partners" class="p-datatable-sm"
                responsiveLayout="scroll" stripedRows :loading="loading">
                <template #empty>
                    <div class="text-center py-8">
                        <i class="pi pi-inbox text-4xl text-gray-400 mb-4"></i>
                        <p class="text-gray-500 text-lg">No partners found</p>
                        <p class="text-gray-400 text-sm">Add your first partner to get started</p>
                    </div>
                </template>

                <Column field="logo" header="Logo" class="w-40">
                    <template #body="slotProps">
                        <div class="flex justify-center">
                            <img v-if="slotProps.data.logo" :src="slotProps.data.logo" :alt="slotProps.data.name"
                                class="w-16 h-16 object-contain rounded-lg border border-gray-200 bg-gray-50" />
                            <div v-else
                                class="w-16 h-16 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                                <i class="pi pi-image text-2xl text-gray-400"></i>
                            </div>
                        </div>
                    </template>
                </Column>

                <Column field="name" header="Partner Name" sortable>
                    <template #body="slotProps">
                        <div class="font-semibold text-gray-900">
                            {{ slotProps.data.name }}
                        </div>
                    </template>
                </Column>

                <Column field="website" header="Website">
                    <template #body="slotProps">
                        <a v-if="slotProps.data.website" :href="slotProps.data.website" target="_blank"
                            class="text-blue-600 hover:text-blue-800 hover:underline text-sm">
                            {{ slotProps.data.website }}
                        </a>
                        <span v-else class="text-gray-400 text-sm">No website</span>
                    </template>
                </Column>

                <Column field="description" header="Description">
                    <template #body="slotProps">
                        <div class="max-w-xs">
                            <p v-if="slotProps.data.description" class="text-gray-600 text-sm line-clamp-3"
                                :title="slotProps.data.description">
                                {{ slotProps.data.description }}
                            </p>
                            <span v-else class="text-gray-400 text-sm">No description</span>
                        </div>
                    </template>
                </Column>

                <Column header="Actions" class="w-32">
                    <template #body="slotProps">
                        <div class="flex gap-2 justify-center">
                            <Button icon="pi pi-pencil" class="p-button-text p-button-sm p-button-rounded p-button-info"
                                @click="editPartner(slotProps.data)" v-tooltip="'Edit Partner'" />
                            <Button icon="pi pi-trash"
                                class="p-button-text p-button-sm p-button-rounded p-button-danger"
                                @click="confirmDeletePartner(slotProps.data)" v-tooltip="'Delete Partner'" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- Add Partner Dialog -->
        <Dialog v-model:visible="showAddDialog" :style="{ width: '500px' }" header="Add New Partner" :modal="true"
            class="p-fluid">
            <div class="field">
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Partner Name *</label>
                <InputText id="name" v-model="newPartner.name" required autofocus
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter partner name" />
            </div>

            <div class="field">
                <label for="website" class="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <InputText id="website" v-model="newPartner.website"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com" />
            </div>

            <div class="field">
                <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea id="description" v-model="newPartner.description" rows="3"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Partner description" />
            </div>

            <div class="field">
                <label class="block text-sm font-medium text-gray-700 mb-2">Logo *</label>
                <FileUpload mode="basic" name="logo" accept="image/*" :maxFileSize="5000000" :auto="false"
                    chooseLabel="Choose Logo" @select="onLogoSelect" @clear="onLogoClear" :disabled="uploadingLogo"
                    class="w-full" />
                <small class="text-gray-500 text-xs mt-1">Max file size: 5MB. Supported formats: JPG, PNG, GIF</small>

                <div v-if="newPartner.logo" class="logo-preview mt-3">
                    <img :src="newPartner.logo" alt="Logo preview"
                        class="max-w-48 max-h-24 rounded-lg border border-gray-200" />
                </div>
            </div>

            <template #footer>
                <div class="flex justify-end gap-2">
                    <Button label="Cancel" icon="pi pi-times" @click="showAddDialog = false"
                        class="p-button-text hover:bg-gray-100" />
                    <Button label="Add Partner" icon="pi pi-check" @click="addPartner" :loading="saving"
                        :disabled="!newPartner.name.trim() || !newPartner.logo?.trim()"
                        class="bg-green-600 hover:bg-green-700 border-green-600" />
                </div>
            </template>
        </Dialog>

        <!-- Edit Partner Dialog -->
        <Dialog v-model:visible="showEditDialog" :style="{ width: '500px' }" header="Edit Partner" :modal="true"
            class="p-fluid">
            <div class="field">
                <label for="editName" class="block text-sm font-medium text-gray-700 mb-2">Partner Name *</label>
                <InputText id="editName" v-model="editingPartner.name" required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter partner name" />
            </div>

            <div class="field">
                <label for="editWebsite" class="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <InputText id="editWebsite" v-model="editingPartner.website"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com" />
            </div>

            <div class="field">
                <label for="editDescription" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea id="editDescription" v-model="editingPartner.description" rows="3"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Partner description" />
            </div>

            <div class="field">
                <label class="block text-sm font-medium text-gray-700 mb-2">Logo *</label>
                <FileUpload mode="basic" name="editLogo" accept="image/*" :maxFileSize="5000000" :auto="false"
                    chooseLabel="Change Logo" @select="onEditLogoSelect" @clear="onEditLogoClear"
                    :disabled="uploadingLogo" class="w-full" />
                <small class="text-gray-500 text-xs mt-1">Max file size: 5MB. Supported formats: JPG, PNG, GIF</small>

                <div v-if="editingPartner.logo" class="logo-preview mt-3">
                    <img :src="editingPartner.logo" alt="Logo preview"
                        class="max-w-48 max-h-24 rounded-lg border border-gray-200" />
                </div>
            </div>

            <template #footer>
                <div class="flex justify-end gap-2">
                    <Button label="Cancel" icon="pi pi-times" @click="showEditDialog = false"
                        class="p-button-text hover:bg-gray-100" />
                    <Button label="Update Partner" icon="pi pi-check" @click="updatePartnerData" :loading="saving"
                        :disabled="!editingPartner.name.trim() || !editingPartner.logo?.trim()"
                        class="bg-blue-600 hover:bg-blue-700 border-blue-600" />
                </div>
            </template>
        </Dialog>
    </div>
</template>

<script setup>
// Import PrimeVue components
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

// Import required composables
import { useAuthStore } from '~/stores/auth';
import { useApiUrl } from '~/composables/useApiUrl';
import { useAuth } from '~/composables/useAuth';
import { useFileUpload } from '~/composables/useFileUpload';
import { usePartners } from '~/composables/usePartners';

const props = defineProps({
    activeSection: {
        type: String,
        default: 'partners'
    }
});

const toast = useToast();
const confirm = useConfirm();
const authStore = useAuthStore();
const { uploadFile } = useFileUpload();
const { checkAuthStatus, isValidTokenFormat, getAuthHeaders } = useAuth();
const apiUrls = useApiUrl();

// Helper function to get auth token
const getAuthToken = () => {
    return authStore.accessToken;
};

// Helper function to handle logout and navigation
const handleLogout = async () => {
    try {
        await authStore.logout();
        await navigateTo('/login');
    } catch (error) {
        console.error('Logout error:', error);
        // Force navigation even if logout fails
        await navigateTo('/login');
    }
};

const {
    partners: partnersForManagement,
    loading,
    error,
    getPartners: fetchPartners,
    createPartner,
    updatePartner,
    deletePartner,
    onPartnerChange
} = usePartners();

// Validate that we have the composable functions
if (!onPartnerChange || typeof onPartnerChange !== 'function') {
    console.error('usePartners composable did not return onPartnerChange function');
}

const showAddDialog = ref(false);
const showEditDialog = ref(false);
const saving = ref(false);
const uploadingLogo = ref(false);

const newPartner = ref({
    name: '',
    logo: '',
    website: '',
    description: ''
});

const editingPartner = ref({
    id: '',
    name: '',
    logo: '',
    website: '',
    description: ''
});

// Watch for changes in partners data
watch(partnersForManagement, (newPartners) => {
    console.log('Partners data updated in management:', newPartners?.length || 0);
}, { immediate: true });

// Subscribe to partner change events
let unsubscribePartnerChanges = null;

onMounted(async () => {
    console.log('PartnersManagement component mounted');

    // Load partners in background, don't block component mounting
    loadPartners().catch(err => {
        console.error('Failed to load partners on mount:', err);
        // Component should still mount even if partners fail to load
    });

    // Listen for partner changes from other components
    try {
        if (onPartnerChange && typeof onPartnerChange === 'function') {
            unsubscribePartnerChanges = onPartnerChange((action, data) => {
                console.log(`Partner ${action} detected in management component:`, data);

                // Show appropriate toast message
                if (action === 'created') {
                    toast.add({
                        severity: 'success',
                        summary: 'Partner Added',
                        detail: `${data.name} has been added`,
                        life: 3000
                    });
                } else if (action === 'updated') {
                    toast.add({
                        severity: 'info',
                        summary: 'Partner Updated',
                        detail: `${data.name} has been updated`,
                        life: 3000
                    });
                } else if (action === 'deleted') {
                    toast.add({
                        severity: 'warn',
                        summary: 'Partner Deleted',
                        detail: `${data.name} has been deleted`,
                        life: 3000
                    });
                }
            });

            // Validate that we got a proper unsubscribe function
            if (!unsubscribePartnerChanges || typeof unsubscribePartnerChanges !== 'function') {
                console.warn('onPartnerChange did not return a valid unsubscribe function');
                unsubscribePartnerChanges = null;
            }
        } else {
            console.warn('onPartnerChange function is not available');
            unsubscribePartnerChanges = null;
        }
    } catch (error) {
        console.error('Error setting up partner change listener:', error);
        unsubscribePartnerChanges = null;
    }
});

// Clean up subscription on unmount
onUnmounted(() => {
    console.log('PartnersManagement component unmounting');

    // Safely unsubscribe from partner changes
    try {
        if (unsubscribePartnerChanges && typeof unsubscribePartnerChanges === 'function') {
            unsubscribePartnerChanges();
            console.log('Successfully unsubscribed from partner changes');
        } else {
            console.log('No valid unsubscribe function to call');
        }
    } catch (error) {
        console.error('Error during unsubscribe:', error);
    }

    // Reset the unsubscribe function
    unsubscribePartnerChanges = null;
});

const loadPartners = async () => {
    let timeoutId;

    try {
        // Debug: Check auth state
        console.log('Auth store state:', {
            isAuthenticated: authStore.isAuthenticated,
            hasAdminAccess: authStore.hasAdminAccess,
            user: authStore.user
        });

        // Set a timeout for the fetch operation
        const timeoutPromise = new Promise((_, reject) => {
            timeoutId = setTimeout(() => {
                reject(new Error('Request timeout: Partners data took too long to load'));
            }, 10000); // 10 second timeout
        });

        // Race between the fetch operation and timeout
        await Promise.race([
            fetchPartners(),
            timeoutPromise
        ]);

        // Clear timeout if fetch succeeds
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        console.log('Partners loaded successfully');
    } catch (err) {
        // Clear timeout on error
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        console.error('Load partners error:', err);

        // Show user-friendly error message
        let errorMessage = 'Failed to load partners';
        if (err.message.includes('timeout')) {
            errorMessage = 'Loading partners is taking too long. Please check your connection and try again.';
        } else if (err.message.includes('Network')) {
            errorMessage = 'Network error. Please check your connection.';
        } else if (err.message.includes('401') || err.message.includes('Unauthorized')) {
            errorMessage = 'Authentication expired. Please log in again.';
            // Optionally redirect to login
            setTimeout(async () => {
                await authStore.logout();
                await navigateTo('/login');
            }, 2000);
        } else if (err.message) {
            errorMessage = err.message;
        }

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
            life: 5000
        });

        // Set error state to prevent infinite loading
        error.value = errorMessage;
        loading.value = false;
    }
};

const onLogoSelect = async (event) => {
    const file = event.files[0];
    if (file) {
        try {
            uploadingLogo.value = true;

            const result = await uploadFile(file, 'partner-logos');

            // Handle both direct URL response and object response
            newPartner.value.logo = result.url || result;

            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Logo uploaded successfully',
                life: 3000
            });
        } catch (err) {
            console.error('Logo upload error:', err);

            toast.add({
                severity: 'error',
                summary: 'Upload Failed',
                detail: `Failed to upload logo: ${err.message}`,
                life: 5000
            });

            newPartner.value.logo = '';
        } finally {
            uploadingLogo.value = false;
        }
    }
};

const onLogoClear = () => {
    newPartner.value.logo = '';
};

const onEditLogoSelect = async (event) => {
    const file = event.files[0];
    if (file) {
        try {
            uploadingLogo.value = true;

            console.log('Starting logo upload for edit:', file.name);
            console.log('Current auth state:', {
                isAuthenticated: authStore.isAuthenticated,
                hasToken: !!authStore.accessToken,
                tokenLength: authStore.accessToken?.length || 0,
                userRole: authStore.user?.role
            });

            const result = await uploadFile(file, 'partner-logos');
            console.log('Upload result:', result);

            // Handle both direct URL response and object response
            editingPartner.value.logo = result.url || result;

            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Logo uploaded successfully',
                life: 3000
            });
        } catch (err) {
            console.error('Logo upload error:', err);

            toast.add({
                severity: 'error',
                summary: 'Upload Failed',
                detail: `Failed to upload logo: ${err.message}`,
                life: 5000
            });

            // Don't use fallback for now - let user know upload failed
            editingPartner.value.logo = '';
        } finally {
            uploadingLogo.value = false;
        }
    }
};

const onEditLogoClear = () => {
    editingPartner.value.logo = '';
};

const addPartner = async () => {
    if (!newPartner.value.name.trim()) {
        toast.add({
            severity: 'warn',
            summary: 'Warning',
            detail: 'Partner name is required',
            life: 3000
        });
        return;
    }

    if (!newPartner.value.logo?.trim()) {
        toast.add({
            severity: 'warn',
            summary: 'Warning',
            detail: 'Partner logo is required',
            life: 3000
        });
        return;
    }

    try {
        saving.value = true;

        // Check authentication before attempting create
        if (!authStore.isAuthenticated || !authStore.accessToken) {
            toast.add({
                severity: 'error',
                summary: 'Authentication Required',
                detail: 'Please log in again to add partners',
                life: 5000
            });
            alert(1);
            await authStore.logout();
            await navigateTo('/login');
            return;
        }

        console.log('Submitting partner data:', newPartner.value);

        // Validate required fields
        const partnerData = {
            name: newPartner.value.name.trim(),
            logo: newPartner.value.logo.trim(),
            website: newPartner.value.website?.trim() || null,
            description: newPartner.value.description?.trim() || null
        };

        console.log('Cleaned partner data:', partnerData);

        const result = await createPartner(partnerData);
        console.log('Partner creation result:', result);

        showAddDialog.value = false;
        resetNewPartner();

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Partner added successfully',
            life: 3000
        });
    } catch (err) {
        console.error('Partner creation error:', err);

        let errorMessage = 'Failed to add partner';

        // Handle specific error cases
        if (err.message.includes('Unauthorized') || err.message.includes('401')) {
            errorMessage = 'Authentication failed. Please log in again.';
            await authStore.logout();
            await navigateTo('/login');
        } else if (err.message.includes('Forbidden') || err.message.includes('403')) {
            errorMessage = 'You don\'t have permission to add partners';
        } else if (err.message) {
            errorMessage = err.message;
        }

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
            life: 5000
        });
    } finally {
        saving.value = false;
    }
};

const editPartner = (partner) => {
    editingPartner.value = { ...partner };
    showEditDialog.value = true;
};

const updatePartnerData = async () => {
    if (!editingPartner.value.name.trim()) {
        toast.add({
            severity: 'warn',
            summary: 'Warning',
            detail: 'Partner name is required',
            life: 3000
        });
        return;
    }

    if (!editingPartner.value.logo?.trim()) {
        toast.add({
            severity: 'warn',
            summary: 'Warning',
            detail: 'Partner logo is required',
            life: 3000
        });
        return;
    }

    try {
        saving.value = true;

        // Check authentication before attempting update
        if (!authStore.isAuthenticated || !authStore.accessToken) {
            toast.add({
                severity: 'error',
                summary: 'Authentication Required',
                detail: 'Please log in again to update partners',
                life: 5000
            });
            await authStore.logout();
            await navigateTo('/login');
            return;
        }

        console.log('Updating partner:', editingPartner.value.id, {
            name: editingPartner.value.name,
            logo: editingPartner.value.logo,
            website: editingPartner.value.website,
            description: editingPartner.value.description
        });

        const updateData = {
            name: editingPartner.value.name,
            logo: editingPartner.value.logo,
            website: editingPartner.value.website,
            description: editingPartner.value.description
        };

        await updatePartner(editingPartner.value.id, updateData);
        showEditDialog.value = false;
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Partner updated successfully',
            life: 3000
        });
    } catch (err) {
        console.error('Partner update error:', err);

        let errorMessage = 'Failed to update partner';

        // Handle specific error cases
        if (err.message.includes('Unauthorized') || err.message.includes('401')) {
            errorMessage = 'Authentication failed. Please log in again.';
            await authStore.logout();
            await navigateTo('/login');
        } else if (err.message.includes('Forbidden') || err.message.includes('403')) {
            errorMessage = 'You don\'t have permission to update partners';
        } else if (err.message.includes('Not found') || err.message.includes('404')) {
            errorMessage = 'Partner not found';
        } else if (err.message) {
            errorMessage = err.message;
        }

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
            life: 5000
        });
    } finally {
        saving.value = false;
    }
};

const confirmDeletePartner = (partner) => {
    confirm.require({
        message: `Are you sure you want to delete "${partner.name}"?`,
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => deletePartnerData(partner.id)
    });
};

const deletePartnerData = async (partnerId) => {
    try {
        await deletePartner(partnerId);
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Partner deleted successfully',
            life: 3000
        });
    } catch (err) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete partner',
            life: 3000
        });
    }
};

const resetNewPartner = () => {
    newPartner.value = {
        name: '',
        logo: '',
        website: '',
        description: ''
    };
};

// Helper function to cancel loading
const cancelLoading = () => {
    console.log('User cancelled loading');
    loading.value = false;
    error.value = 'Loading was cancelled by user';
};

// Helper function to retry loading partners
const retryLoadPartners = async () => {
    console.log('Retrying to load partners');
    error.value = null;
    await loadPartners();
};


</script>

<style scoped>
.content-section {
    padding: 1.5rem;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.section-header h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
}

.loading-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem;
    gap: 1rem;
}

.error-section {
    margin-bottom: 2rem;
}

.field {
    margin-bottom: 1rem;
}

.field label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #374151;
}

.logo-preview {
    margin-top: 1rem;
    text-align: center;
}

.logo-preview img {
    border-radius: 0.375rem;
    border: 1px solid #e5e7eb;
}

.debug-panel {
    margin-top: 2rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 0.5rem;
    border: 1px solid #d1d5db;
}

.debug-panel h4 {
    margin: 0 0 1rem 0;
    color: #374151;
    font-size: 1rem;
}

.w-full {
    width: 100%;
}

.text-gray-600 {
    color: #6b7280;
}

/* DataTable Customizations */
:deep(.p-datatable) {
    border: none;
    background: white;
    border-radius: 0.5rem;
    overflow: hidden;
}

:deep(.p-datatable .p-datatable-header) {
    background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    padding: 1rem;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
    background: #f9fafb;
    color: #374151;
    font-weight: 600;
    font-size: 0.875rem;
    border-bottom: 1px solid #e5e7eb;
    padding: 1rem;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
    border-bottom: 1px solid #f3f4f6;
    transition: background-color 0.15s ease;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
    background-color: #f9fafb;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
    padding: 1rem;
    font-size: 0.875rem;
    vertical-align: middle;
}

:deep(.p-paginator) {
    background: white;
    border-top: 1px solid #e5e7eb;
    padding: 1rem;
    justify-content: space-between;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page) {
    min-width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    margin: 0 0.125rem;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page.p-highlight) {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
}

:deep(.p-dropdown) {
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
}

/* Line clamp utility for description */
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Empty state styling */
:deep(.p-datatable-emptymessage > td) {
    text-align: center;
    padding: 2rem !important;
}
</style>
