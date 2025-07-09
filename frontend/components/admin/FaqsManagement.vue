<template>
    <div class="faqs-management space-y-6">
        <!-- Header Section -->
        <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="text-2xl font-bold text-gray-800">FAQ Management</h3>
                    <p class="text-gray-600 mt-1">Manage frequently asked questions</p>
                </div>
                <Button label="Add New FAQ" icon="pi pi-plus" severity="success" @click="openFaqDialog()"
                    class="bg-[#f15a22] hover:bg-orange-600 border-[#f15a22]" />
            </div>
        </div>

        <!-- Filters and Search -->
        <div class="bg-white rounded-lg shadow-sm p-4">
            <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div class="flex flex-col sm:flex-row gap-4 flex-1">
                    <div class="flex-1 max-w-md">
                        <span class="p-input-icon-left w-full">
                            <i class="pi pi-search" />
                            <InputText v-model="searchQuery" placeholder="Search FAQs..." class="w-full"
                                @input="debouncedSearch" />
                        </span>
                    </div>
                    <div class="min-w-48">
                        <Dropdown v-model="selectedCategory" :options="categoryOptions" placeholder="Filter by Category"
                            showClear class="w-full" />
                    </div>
                </div>
                <div class="flex gap-2">
                    <Button icon="pi pi-refresh" @click="loadFaqs" :loading="loading" outlined aria-label="Refresh" />
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading && !faqs.length" class="bg-white rounded-lg shadow-sm p-8">
            <div class="flex justify-center items-center">
                <div
                    class="w-16 h-16 border-4 border-t-[#f15a22] border-r-[#f15a22]/50 border-b-[#f15a22]/30 border-l-[#f15a22]/10 rounded-full animate-spin">
                </div>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-white rounded-lg shadow-sm p-8">
            <div class="text-center">
                <i class="pi pi-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Error Loading FAQs</h3>
                <p class="text-gray-600 mb-4">{{ error }}</p>
                <Button label="Try Again" icon="pi pi-refresh" @click="loadFaqs" />
            </div>
        </div>

        <!-- FAQs List -->
        <div v-else-if="filteredFaqs.length > 0" class="bg-white rounded-lg shadow-sm">
            <div class="p-6 border-b border-gray-200">
                <div class="flex justify-between items-center">
                    <h4 class="text-lg font-semibold text-gray-800">
                        FAQs ({{ filteredFaqs.length }})
                    </h4>
                    <div class="flex gap-2">
                        <Button label="Expand All" icon="pi pi-angle-down" size="small" outlined @click="expandAll" />
                        <Button label="Collapse All" icon="pi pi-angle-up" size="small" outlined @click="collapseAll" />
                    </div>
                </div>
            </div>

            <Accordion :multiple="true" class="faq-accordion">
                <AccordionTab v-for="(faq, index) in filteredFaqs" :key="faq.id" :header="faq.question">
                    <template #header>
                        <div class="flex justify-between items-center w-full pr-4">
                            <div class="flex items-center gap-3">
                                <span class="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                                    {{ faq.category || 'General' }}
                                </span>
                                <span class="font-medium">{{ faq.question }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                    Order: {{ faq.order }}
                                </span>
                            </div>
                        </div>
                    </template>

                    <div class="space-y-4">
                        <div class="prose max-w-none">
                            <div v-html="faq.answer" class="text-gray-700 leading-relaxed"></div>
                        </div>

                        <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div class="text-sm text-gray-500">
                                <span>Created: {{ formatDate(faq.createdAt) }}</span>
                                <span v-if="faq.updatedAt !== faq.createdAt" class="ml-4">
                                    Updated: {{ formatDate(faq.updatedAt) }}
                                </span>
                            </div>
                            <div class="flex gap-2">
                                <Button icon="pi pi-pencil" size="small" outlined @click="editFaq(faq)"
                                    v-tooltip="'Edit FAQ'" />
                                <Button icon="pi pi-arrows-v" size="small" outlined @click="openReorderDialog"
                                    v-tooltip="'Reorder FAQs'" />
                                <Button icon="pi pi-trash" size="small" severity="danger" outlined
                                    @click="confirmDeleteFaq(faq)" v-tooltip="'Delete FAQ'" />
                            </div>
                        </div>
                    </div>
                </AccordionTab>
            </Accordion>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-white rounded-lg shadow-sm p-8">
            <div class="text-center">
                <i class="pi pi-question-circle text-4xl text-gray-400 mb-4"></i>
                <h3 class="text-lg font-semibold text-gray-800 mb-2">No FAQs Found</h3>
                <p class="text-gray-600 mb-4">
                    {{ searchQuery ? 'No FAQs match your search criteria.' : 'Get started by creating your first FAQ.'
                    }}
                </p>
                <Button v-if="!searchQuery" label="Add First FAQ" icon="pi pi-plus" @click="openFaqDialog()" />
                <Button v-else label="Clear Search" icon="pi pi-times" @click="clearSearch" outlined />
            </div>
        </div>

        <!-- FAQ Form Dialog -->
        <Dialog v-model:visible="faqDialog" :header="editingFaq ? 'Edit FAQ' : 'Create New FAQ'" modal class="p-fluid"
            style="width: 70vw; max-width: 800px">
            <form @submit.prevent="saveFaq" class="space-y-6">
                <div class="space-y-4">
                    <div>
                        <label for="question" class="block text-sm font-medium text-gray-700 mb-2">
                            Question *
                        </label>
                        <InputText id="question" v-model="faq.question" required autofocus
                            :class="{ 'p-invalid': submitted && !faq.question }" placeholder="Enter the FAQ question" />
                        <small class="text-red-500" v-if="submitted && !faq.question">
                            Question is required.
                        </small>
                    </div>

                    <div>
                        <label for="answer" class="block text-sm font-medium text-gray-700 mb-2">
                            Answer *
                        </label>
                        <Textarea id="answer" v-model="faq.answer" required rows="6"
                            :class="{ 'p-invalid': submitted && !faq.answer }"
                            placeholder="Enter the detailed answer" />
                        <small class="text-red-500" v-if="submitted && !faq.answer">
                            Answer is required.
                        </small>
                    </div>

                    <div>
                        <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
                            Category *
                        </label>
                        <InputText id="category" v-model="faq.category" required
                            :class="{ 'p-invalid': submitted && !faq.category }"
                            placeholder="Enter the FAQ category (e.g., General, Trust Basics)" />
                        <small class="text-red-500" v-if="submitted && !faq.category">
                            Category is required.
                        </small>
                    </div>

                    <div>
                        <label for="order" class="block text-sm font-medium text-gray-700 mb-2">
                            Display Order
                        </label>
                        <InputNumber id="order" v-model="faq.order" :min="0" :max="1000"
                            placeholder="Display order (0 = first)" />
                        <small class="text-gray-500">
                            Lower numbers appear first. Leave empty to add at the end.
                        </small>
                    </div>
                </div>

                <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <Button label="Cancel" icon="pi pi-times" severity="secondary" @click="faqDialog = false"
                        type="button" />
                    <Button :label="editingFaq ? 'Update FAQ' : 'Create FAQ'" icon="pi pi-check" type="submit"
                        :loading="saving" class="bg-[#f15a22] hover:bg-orange-600 border-[#f15a22]" />
                </div>
            </form>
        </Dialog>

        <!-- Reorder Dialog -->
        <Dialog v-model:visible="reorderDialog" header="Reorder FAQs" modal style="width: 60vw; max-width: 600px">
            <div class="space-y-4">
                <p class="text-gray-600 mb-4">
                    Drag and drop to reorder FAQs. Lower order numbers appear first.
                </p>

                <div class="space-y-2">
                    <div v-for="(faq, index) in reorderFaqsList" :key="faq.id"
                        class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                        <i class="pi pi-bars text-gray-400 cursor-move"></i>
                        <InputNumber v-model="faq.order" :min="0" :max="1000" class="w-20" />
                        <span class="flex-1 font-medium">{{ faq.question }}</span>
                    </div>
                </div>

                <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <Button label="Cancel" icon="pi pi-times" severity="secondary" @click="reorderDialog = false" />
                    <Button label="Save Order" icon="pi pi-check" @click="saveReorder" :loading="saving"
                        class="bg-[#f15a22] hover:bg-orange-600 border-[#f15a22]" />
                </div>
            </div>
        </Dialog>

        <!-- Delete Confirmation Dialog -->
        <ConfirmDialog />

        <!-- Toast for notifications -->
        <Toast />
    </div>
</template>



<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useFaqs } from '~/composables/useFaqs';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

// PrimeVue Components
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

// Props
const props = defineProps({
    activeSection: {
        type: String,
        default: 'faq'
    }
});

// Composables
const toast = useToast();
const confirm = useConfirm();
const {
    faqs,
    loading,
    error,
    getAdminFaqs,
    createFaq,
    updateFaq,
    deleteFaq,
    reorderFaqs,
    searchFaqs,
    getCategories
} = useFaqs();

// State
const faqDialog = ref(false);
const reorderDialog = ref(false);
const editingFaq = ref(null);
const submitted = ref(false);
const saving = ref(false);
const searchQuery = ref('');
const selectedCategory = ref(null);
const searchTimeout = ref(null);

// Form data
const faq = ref({
    question: '',
    answer: '',
    category: '',
    order: null
});

// Reorder state
const reorderFaqsList = ref([]);

// Computed
const filteredFaqs = computed(() => {
    if (!faqs.value || !Array.isArray(faqs.value)) return [];
    return searchFaqs(searchQuery.value, selectedCategory.value);
});

const categoryOptions = computed(() => {
    const categories = getCategories();
    return categories.map(cat => ({ label: cat, value: cat }));
});

// Methods
const loadFaqs = async () => {
    try {
        await getAdminFaqs();
    } catch (err) {
        console.error('Error loading FAQs:', err);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load FAQs',
            life: 3000
        });
    }
};

const openFaqDialog = (faqToEdit = null) => {
    editingFaq.value = faqToEdit;
    submitted.value = false;

    if (faqToEdit) {
        faq.value = {
            question: faqToEdit.question,
            answer: faqToEdit.answer,
            category: faqToEdit.category || '',
            order: faqToEdit.order
        };
    } else {
        faq.value = {
            question: '',
            answer: '',
            category: '',
            order: null
        };
    }

    faqDialog.value = true;
};

const editFaq = (faqItem) => {
    openFaqDialog(faqItem);
};

const saveFaq = async () => {
    submitted.value = true;

    if (!faq.value.question?.trim() || !faq.value.answer?.trim() || !faq.value.category?.trim()) {
        return;
    }

    saving.value = true;

    try {
        const faqData = {
            question: faq.value.question.trim(),
            answer: faq.value.answer.trim(),
            category: faq.value.category.trim(),
            order: faq.value.order || undefined
        };

        if (editingFaq.value) {
            await updateFaq(editingFaq.value.id, faqData);
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'FAQ updated successfully',
                life: 3000
            });
        } else {
            await createFaq(faqData);
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'FAQ created successfully',
                life: 3000
            });
        }

        faqDialog.value = false;
        editingFaq.value = null;

    } catch (err) {
        console.error('Error saving FAQ:', err);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: editingFaq.value ? 'Failed to update FAQ' : 'Failed to create FAQ',
            life: 3000
        });
    } finally {
        saving.value = false;
    }
};

const confirmDeleteFaq = (faqItem) => {
    confirm.require({
        message: `Are you sure you want to delete this FAQ?\n\n"${faqItem.question}"`,
        header: 'Confirm Deletion',
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        accept: () => deleteFaqItem(faqItem)
    });
};

const deleteFaqItem = async (faqItem) => {
    try {
        await deleteFaq(faqItem.id);
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'FAQ deleted successfully',
            life: 3000
        });
    } catch (err) {
        console.error('Error deleting FAQ:', err);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete FAQ',
            life: 3000
        });
    }
};

const openReorderDialog = () => {
    if (!faqs.value || !Array.isArray(faqs.value)) {
        reorderFaqsList.value = [];
        return;
    }
    reorderFaqsList.value = [...faqs.value].sort((a, b) => a.order - b.order);
    reorderDialog.value = true;
};

const saveReorder = async () => {
    saving.value = true;

    try {
        const reorderData = reorderFaqsList.value.map(faq => ({
            id: faq.id,
            order: faq.order
        }));

        await reorderFaqs(reorderData);

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'FAQ order updated successfully',
            life: 3000
        });

        reorderDialog.value = false;

    } catch (err) {
        console.error('Error reordering FAQs:', err);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update FAQ order',
            life: 3000
        });
    } finally {
        saving.value = false;
    }
};

const expandAll = () => {
    // This would need to be implemented with the Accordion component's API
    console.log('Expand all FAQs');
};

const collapseAll = () => {
    // This would need to be implemented with the Accordion component's API
    console.log('Collapse all FAQs');
};

const debouncedSearch = () => {
    if (searchTimeout.value) clearTimeout(searchTimeout.value);
    searchTimeout.value = setTimeout(() => {
        // Search is reactive through computed property
    }, 300);
};

const clearSearch = () => {
    searchQuery.value = '';
    selectedCategory.value = null;
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Lifecycle
onMounted(() => {
    loadFaqs();
});

// Watch for active section changes
watch(() => props.activeSection, (newSection) => {
    if (newSection === 'faq') {
        loadFaqs();
    }
});
</script>

<style scoped>
.faqs-management {
    padding: 0;
}

:deep(.faq-accordion) {
    border: none;
}

:deep(.faq-accordion .p-accordion-tab) {
    margin-bottom: 0.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    overflow: hidden;
}

:deep(.faq-accordion .p-accordion-header) {
    background: #f9fafb;
    border: none;
    border-radius: 0.5rem 0.5rem 0 0;
}

:deep(.faq-accordion .p-accordion-header:not(.p-disabled):hover) {
    background: #f3f4f6;
}

:deep(.faq-accordion .p-accordion-header-link) {
    padding: 1rem;
    border: none;
    border-radius: 0.5rem 0.5rem 0 0;
}

:deep(.faq-accordion .p-accordion-content) {
    padding: 1.5rem;
    border: none;
    background: white;
}

:deep(.faq-accordion .p-accordion-tab.p-accordion-tab-active .p-accordion-header) {
    background: #eff6ff;
    border-radius: 0.5rem 0.5rem 0 0;
}

/* Loading spinner */
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}

/* Form styling */
:deep(.p-dialog .p-dialog-header) {
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
}

:deep(.p-dialog .p-dialog-content) {
    padding: 2rem;
}

/* Input styling */
:deep(.p-inputtext:focus) {
    border-color: #f15a22;
    box-shadow: 0 0 0 1px #f15a22;
}

:deep(.p-dropdown:not(.p-disabled).p-focus) {
    border-color: #f15a22;
    box-shadow: 0 0 0 1px #f15a22;
}

:deep(.p-inputnumber:not(.p-disabled).p-focus) {
    border-color: #f15a22;
    box-shadow: 0 0 0 1px #f15a22;
}

/* Custom button colors */
.bg-orange-500 {
    background-color: #f15a22;
}

.hover\:bg-orange-600:hover {
    background-color: #ea580c;
}

.border-orange-500 {
    border-color: #f15a22;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    :deep(.p-dialog) {
        width: 95vw !important;
        margin: 1rem;
    }

    :deep(.faq-accordion .p-accordion-header-link) {
        padding: 0.75rem;
    }

    :deep(.faq-accordion .p-accordion-content) {
        padding: 1rem;
    }
}
</style>