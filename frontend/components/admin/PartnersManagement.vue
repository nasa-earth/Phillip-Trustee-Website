<template>
    <!-- Partners Section -->
    <div v-if="activeSection === 'partners'" class="content-section">
        <div class="section-header">
            <h3>Partners Management</h3>
            <Button label="Add Partner" icon="pi pi-plus" severity="success" @click="showAddDialog = true" />
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center h-64">
            <ProgressSpinner />
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-red-500 text-center p-4">
            {{ error }}
            <Button label="Retry" icon="pi pi-refresh" @click="loadPartners" class="ml-2" />
        </div>

        <!-- Partners Grid -->
        <div v-else class="partners-grid">
            <div v-for="partner in partnersForManagement" :key="partner.id" class="partner-card">
                <img :src="partner.logo" :alt="partner.name" class="partner-logo" />
                <div class="partner-details">
                    <h4>{{ partner.name }}</h4>
                    <p class="partner-type">{{ partner.type }}</p>
                    <p v-if="partner.website" class="partner-website">
                        <a :href="partner.website" target="_blank" class="text-blue-600 hover:underline">
                            {{ partner.website }}
                        </a>
                    </p>
                    <div class="partner-actions">
                        <Button icon="pi pi-pencil" text rounded @click="editPartner(partner)"
                            v-tooltip="'Edit Partner'" />
                        <Button icon="pi pi-trash" text rounded severity="danger" @click="confirmDeletePartner(partner)"
                            v-tooltip="'Delete Partner'" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Partner Dialog -->
        <Dialog v-model:visible="showAddDialog" header="Add New Partner" modal style="width: 50vw">
            <div class="space-y-4">
                <div class="field">
                    <label for="name" class="block text-sm font-medium text-gray-700">Partner Name *</label>
                    <InputText id="name" v-model="newPartner.name" class="w-full" placeholder="Enter partner name" />
                </div>

                <div class="field">
                    <label for="logo" class="block text-sm font-medium text-gray-700">Logo</label>
                    <div class="space-y-2">
                        <FileUpload id="logo" mode="basic" name="logo" accept="image/*" :maxFileSize="1000000"
                            @select="onLogoSelect" @clear="onLogoClear" :auto="false" chooseLabel="Choose Logo"
                            class="p-button-outlined" />
                        <InputText v-model="newPartner.logo" class="w-full" placeholder="Or enter logo URL directly" />
                        <div v-if="newPartner.logo" class="mt-2">
                            <img :src="newPartner.logo" alt="Logo Preview"
                                class="w-20 h-20 object-contain border rounded" />
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label for="website" class="block text-sm font-medium text-gray-700">Website</label>
                    <InputText id="website" v-model="newPartner.website" class="w-full"
                        placeholder="Enter website URL" />
                </div>

                <div class="field">
                    <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                    <Textarea id="description" v-model="newPartner.description" class="w-full" rows="3"
                        placeholder="Enter partner description" />
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="showAddDialog = false" class="p-button-text" />
                <Button label="Add Partner" icon="pi pi-plus" @click="addPartner" :loading="loading" />
            </template>
        </Dialog>

        <!-- Edit Partner Dialog -->
        <Dialog v-model:visible="showEditDialog" header="Edit Partner" modal style="width: 50vw">
            <div class="space-y-4">
                <div class="field">
                    <label for="edit-name" class="block text-sm font-medium text-gray-700">Partner Name *</label>
                    <InputText id="edit-name" v-model="editingPartner.name" class="w-full"
                        placeholder="Enter partner name" />
                </div>

                <div class="field">
                    <label for="edit-logo" class="block text-sm font-medium text-gray-700">Logo</label>
                    <div class="space-y-2">
                        <FileUpload id="edit-logo" mode="basic" name="logo" accept="image/*" :maxFileSize="1000000"
                            @select="onEditLogoSelect" @clear="onEditLogoClear" :auto="false" chooseLabel="Choose Logo"
                            class="p-button-outlined" />
                        <InputText v-model="editingPartner.logo" class="w-full"
                            placeholder="Or enter logo URL directly" />
                        <div v-if="editingPartner.logo" class="mt-2">
                            <img :src="editingPartner.logo" alt="Logo Preview"
                                class="w-20 h-20 object-contain border rounded" />
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label for="edit-website" class="block text-sm font-medium text-gray-700">Website</label>
                    <InputText id="edit-website" v-model="editingPartner.website" class="w-full"
                        placeholder="Enter website URL" />
                </div>

                <div class="field">
                    <label for="edit-description" class="block text-sm font-medium text-gray-700">Description</label>
                    <Textarea id="edit-description" v-model="editingPartner.description" class="w-full" rows="3"
                        placeholder="Enter partner description" />
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="showEditDialog = false" class="p-button-text" />
                <Button label="Update Partner" icon="pi pi-check" @click="updatePartnerData" :loading="loading" />
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { usePartners } from '~/composables/usePartners';
import { useFileUpload } from '~/composables/useFileUpload';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

const props = defineProps({
    activeSection: {
        type: String,
        default: 'partners'
    }
});

const toast = useToast();
const confirm = useConfirm();
const { uploadFile } = useFileUpload();

const {
    partnersForManagement,
    loading,
    error,
    fetchPartners,
    createPartner,
    updatePartner,
    deletePartner,
    getAuthToken,
    apiUrls
} = usePartners();

const showAddDialog = ref(false);
const showEditDialog = ref(false);
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

const uploadingLogo = ref(false);

const loadPartners = async () => {
    try {
        // Debug: Check API URL and auth token
        console.log('API URLs:', apiUrls);
        console.log('Partners API URL:', apiUrls.partners);
        console.log('Auth token:', getAuthToken());

        await fetchPartners();
    } catch (err) {
        console.error('Load partners error:', err);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load partners',
            life: 3000
        });
    }
};

const onLogoSelect = async (event) => {
    const file = event.files[0];
    if (file) {
        try {
            uploadingLogo.value = true;
            const result = await uploadFile(file, 'partner-logos');
            newPartner.value.logo = result.url;
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Logo uploaded successfully',
                life: 3000
            });
        } catch (err) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to upload logo',
                life: 3000
            });
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
            const result = await uploadFile(file, 'partner-logos');
            editingPartner.value.logo = result.url;
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Logo uploaded successfully',
                life: 3000
            });
        } catch (err) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to upload logo',
                life: 3000
            });
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

    try {
        await createPartner(newPartner.value);
        showAddDialog.value = false;
        resetNewPartner();
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Partner added successfully',
            life: 3000
        });
    } catch (err) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add partner',
            life: 3000
        });
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

    try {
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
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update partner',
            life: 3000
        });
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

onMounted(() => {
    loadPartners();
});
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

.partners-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.partner-card {
    background: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    transition: box-shadow 0.2s;
}

.partner-card:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.partner-logo {
    width: 100%;
    height: 120px;
    object-fit: contain;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
    background: #f9fafb;
}

.partner-details h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
}

.partner-type {
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
}

.partner-website {
    font-size: 0.875rem;
    margin-bottom: 1rem;
}

.partner-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
}

.field {
    margin-bottom: 1rem;
}

.field label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}
</style>