<template>
    <div class="space-y-3">
        <!-- Header Section -->
        <div class="">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
                <div>
                    <h3
                        class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
                        FAQ Management
                    </h3>
                </div>
                <Button label="Add New FAQ" icon="pi pi-plus" @click="openFaqDialog()"
                    class="bg-gradient-to-r from-blue-500 to-blue-500 hover:from-blue-600 hover:to-indigo-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-semibold" />
            </div>
        </div>
        <!-- Summary Cards -->
        <!-- <div class="grid grid-cols-1 md:grid-cols-5 gap-4 justify-between">
        <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-black text-xl font-medium">Total FAQs</p>
                    <p class="text-2xl font-bold text-black">
                        {{ filteredFaqs.length }}
                    </p>
                </div>
            </div>
        </div>
        <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-black text-xl font-medium">Total Category</p>
                    <p class="text-2xl font-bold text-black">
                        {{ categoryOptions.length }}
                    </p>
                </div>
            </div>
        </div>
        </div> -->
        <!-- Filters and Search -->
            <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div class="flex flex-col sm:flex-row gap-4 flex-1">
                    <div class="flex-1 max-w-md">
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <!-- <i class="pi pi-search text-slate-400"></i> -->
                            </div>
                            <InputText v-model="searchQuery" placeholder="Search"
                                class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                @input="debouncedSearch" />
                        </div>
                    </div>
                </div>

            </div>
  

        <!-- Loading State -->
        <div v-if="loading && !faqs.length"
            class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-12">
            <div class="flex flex-col items-center justify-center">
                <div class="relative mb-6">
                    <div class="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin">
                    </div>
                    <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-400 rounded-full animate-spin"
                        style="animation-delay: 0.3s;"></div>
                </div>
                <h3 class="text-lg font-semibold text-slate-800 mb-2">Loading FAQs</h3>
                <p class="text-slate-600">Please wait while we fetch the latest FAQs...</p>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-12">
            <div class="text-center">
                <div
                    class="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <i class="pi pi-exclamation-triangle text-3xl text-white"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-800 mb-3">Error Loading FAQs</h3>
                <p class="text-slate-600 mb-6 max-w-md mx-auto">{{ error }}</p>
                <Button label="Try Again" icon="pi pi-refresh" @click="loadFaqs"
                    class="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-200 font-semibold" />
            </div>
        </div>

        <!-- FAQs Table -->
        <div v-else-if="filteredFaqs.length > 0"
            class="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 overflow-hidden">
            
            <DataTable :value="filteredFaqs" :loading="loading" :paginator="true" :rows="10"
                :rowsPerPageOptions="[5, 10, 20, 50]" filterDisplay="menu" responsiveLayout="scroll" stripedRows
                class="faq-table" :expandedRows="expandedRows" v-model:expandedRows="expandedRows" dataKey="id">

                <!-- Row Expander Column -->
                <Column :expander="true" headerStyle="width: 3rem" />

                <!-- Order Column -->
                <Column field="order" header="Order" :sortable="true" headerStyle="width: 5rem">
                    <template #body="{ data }">
                        <div class="flex items-center justify-center">
                            <span
                                class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                {{ data.order || 0 }}
                            </span>
                        </div>
                    </template>
                </Column>

                <!-- Question Column -->
                <Column field="question" header="Question" :sortable="true">
                    <template #body="{ data }">
                        <div class="space-y-2">
                            <div class="font-semibold text-slate-800 line-clamp-2">{{ data.question }}</div>
                            <div class="flex items-center gap-2">
                                <span
                                    class="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-semibold shadow-md">
                                    {{ data.category || 'General' }}
                                </span>
                            </div>
                        </div>
                    </template>
                </Column>

                <!-- Answer Preview Column -->
                <Column field="answer" header="Answer Preview" class="hidden lg:table-cell">
                    <template #body="{ data }">
                        <div class="text-slate-600 text-sm line-clamp-3 max-w-xs">
                            {{ stripHtml(data.answer).substring(0, 150) }}{{ stripHtml(data.answer).length > 150 ? '...'
                            : '' }}
                        </div>
                    </template>
                </Column>

                <!-- Created Date Column -->
                <Column field="createdAt" header="Created" :sortable="true" class="hidden md:table-cell">
                    <template #body="{ data }">
                        <div class="flex flex-col gap-1">
                            <div class="flex items-center gap-2">
                                <i class="pi pi-calendar text-blue-500"></i>
                                <span class="font-medium text-slate-700 text-sm">{{ formatDate(data.createdAt) }}</span>
                            </div>
                            <!-- <span v-if="data.updatedAt !== data.createdAt"
                                class="text-xs text-slate-500 flex items-center gap-1">
                                <i class="pi pi-clock text-green-500"></i>
                                Updated: {{ formatDateShort(data.updatedAt) }}
                            </span> -->
                        </div>
                    </template>
                </Column>

                <!-- Actions Column -->
                <Column header="Actions" headerStyle="width: 10rem">
                    <template #body="{ data }">
                        <div class="flex gap-1 justify-center">
                            <Button unstyled icon="pi pi-pencil" @click="editFaq(data)"
                                class="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white border-none rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer"
                                size="small" v-tooltip.top="'Edit FAQ'" />
                            <!-- <Button icon="pi pi-arrows-v" @click="openReorderDialog"
                                class="w-8 h-8 bg-purple-500 hover:bg-purple-600 text-white border-none rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
                                size="small" v-tooltip.top="'Reorder FAQs'" /> -->
                            <Button unstyled icon="pi pi-trash" @click="confirmDeleteFaq(data)"
                                class="w-8 h-8 bg-red-500 hover:bg-red-600 text-white border-none rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer"
                                size="small" v-tooltip.top="'Delete FAQ'" />
                        </div>
                    </template>
                </Column>

                <!-- Row Expansion Template -->
                <template #expansion="{ data }">
                    <div class="p-6 bg-gradient-to-r from-slate-50 to-slate-100 border-t border-slate-200">
                        <div class="space-y-4">
                            <div>
                                <h5 class="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                    <!-- <i class="pi pi-file-edit text-purple-500"></i> -->
                                    Full Answer
                                </h5>
                                <div class="prose max-w-none">
                                    <div v-html="data.answer"
                                        class="text-slate-700 leading-relaxed bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                    </div>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                                <div class="flex items-center gap-2">
                                    <!-- <i class="pi pi-tag text-purple-500"></i> -->
                                    <div>
                                        <p class="text-xs font-medium text-slate-500 uppercase">Category</p>
                                        <p class="font-semibold text-slate-800">{{ data.category || 'General' }}</p>
                                    </div>
                                </div>
                                <!-- <div class="flex items-center gap-2">
                                    <i class="pi pi-calendar text-blue-500"></i>
                                    <div>
                                        <p class="text-xs font-medium text-slate-500 uppercase">Created</p>
                                        <p class="font-semibold text-slate-800">{{ formatDate(data.createdAt) }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <i class="pi pi-clock text-green-500"></i>
                                    <div>
                                        <p class="text-xs font-medium text-slate-500 uppercase">Last Updated</p>
                                        <p class="font-semibold text-slate-800">{{ formatDate(data.updatedAt) }}</p>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </template>
            </DataTable>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-12">
            <div class="text-center">
                <div
                    class="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <i class="pi pi-question-circle text-4xl text-white"></i>
                </div>
                <h3 class="text-2xl font-bold text-slate-800 mb-3">No FAQs Found</h3>
                <p class="text-slate-600 mb-6 max-w-md mx-auto">
                    {{ searchQuery ? 'No FAQs match your search criteria. Try adjusting your filters or search terms.' :
                    'Get started by creating your first FAQ to help users find answers quickly.' }}
                </p>
                <div class="flex justify-center gap-3">
                    <Button v-if="!searchQuery" label="Add First FAQ" icon="pi pi-plus" @click="openFaqDialog()"
                        class="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-200 font-semibold" />
                    <Button v-else label="Clear Search" icon="pi pi-times" @click="clearSearch"
                        class="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg transition-all duration-200" />
                </div>
            </div>
        </div>

        <!-- FAQ Form Dialog -->
        <Dialog v-model:visible="faqDialog" :header="editingFaq ? 'Edit FAQ' : 'Create New FAQ'" modal
            class="p-fluid max-w-4xl">
            <template #header>
                <div class="flex items-center gap-3">
                    <div
                        class="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                        <i :class="editingFaq ? 'pi pi-pencil' : 'pi pi-plus'" class="text-white text-lg"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-800">{{ editingFaq ? 'Edit FAQ' : 'Create New FAQ' }}
                        </h3>
                        <p class="text-sm text-slate-500">{{ editingFaq ? 'Update FAQ information' : 'Add a new frequently asked question' }}</p>
                    </div>
                </div>
            </template>

            <form @submit.prevent="saveFaq" class="space-y-6 pt-4">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="lg:col-span-2">
                        <label for="question" class="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
                            <i class="pi pi-question-circle text-purple-500"></i>
                            Question *
                        </label>
                        <InputText id="question" v-model="faq.question" required autofocus
                            :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': submitted && !faq.question }"
                            class="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                            placeholder="Enter the FAQ question (e.g., What is a trust?)" />
                        <small class="text-red-500 text-xs flex items-center gap-1 mt-1"
                            v-if="submitted && !faq.question">
                            <i class="pi pi-exclamation-triangle"></i>
                            Question is required
                        </small>
                    </div>

                    <div class="lg:col-span-2">
                        <label for="answer" class="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
                            <i class="pi pi-file-edit text-purple-500"></i>
                            Answer *
                        </label>
                        <Textarea id="answer" v-model="faq.answer" required rows="6"
                            :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': submitted && !faq.answer }"
                            class="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none"
                            placeholder="Provide a detailed answer to the question..." />
                        <small class="text-red-500 text-xs flex items-center gap-1 mt-1"
                            v-if="submitted && !faq.answer">
                            <i class="pi pi-exclamation-triangle"></i>
                            Answer is required
                        </small>
                    </div>

                    <div>
                        <label for="category" class="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
                            <i class="pi pi-tag text-purple-500"></i>
                            Category *
                        </label>
                        <InputText id="category" v-model="faq.category" required
                            :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': submitted && !faq.category }"
                            class="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                            placeholder="e.g., Trust Basics, Services, Legal" />
                        <small class="text-red-500 text-xs flex items-center gap-1 mt-1"
                            v-if="submitted && !faq.category">
                            <i class="pi pi-exclamation-triangle"></i>
                            Category is required
                        </small>
                    </div>

                    <div>
                        <label for="order" class="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
                            <i class="pi pi-sort-numeric-up text-purple-500"></i>
                            Display Order
                        </label>
                        <InputNumber id="order" v-model="faq.order" :min="0" :max="1000"
                            class="w-full border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="0" />
                        <small class="text-slate-500 text-xs mt-1 flex items-center gap-1">
                            <i class="pi pi-info-circle"></i>
                            Lower numbers appear first. Leave empty to add at the end.
                        </small>
                    </div>
                </div>

                <div class="flex justify-end gap-3 pt-6 border-t border-slate-200">
                    <Button label="Cancel" icon="pi pi-times" @click="faqDialog = false" type="button"
                        class="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg transition-all duration-200" />
                    <Button :label="editingFaq ? 'Update FAQ' : 'Create FAQ'"
                        :icon="editingFaq ? 'pi pi-check' : 'pi pi-plus'" type="submit" :loading="saving"
                        class="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-none rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-semibold" />
                </div>
            </form>
        </Dialog>

        <!-- Reorder Dialog -->
        <!-- <Dialog v-model:visible="reorderDialog" header="Reorder FAQs" modal class="max-w-3xl">
            <template #header>
                <div class="flex items-center gap-3">
                    <div
                        class="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                        <i class="pi pi-arrows-v text-white text-lg"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-800">Reorder FAQs</h3>
                        <p class="text-sm text-slate-500">Adjust the display order of your FAQs</p>
                    </div>
                </div>
            </template>

            <div class="space-y-6 pt-4">
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div class="flex items-start gap-3">
                        <i class="pi pi-info-circle text-blue-500 mt-0.5"></i>
                        <div>
                            <p class="text-blue-800 font-medium">How to reorder</p>
                            <p class="text-blue-700 text-sm mt-1">
                                Adjust the order numbers to change how FAQs appear. Lower numbers appear first on the
                                website.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="space-y-3 max-h-96 overflow-y-auto">
                    <div v-for="(faq, index) in reorderFaqsList" :key="faq.id"
                        class="flex items-center gap-4 p-4 border border-slate-200 rounded-xl bg-white hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-lg">
                            <i class="pi pi-bars text-slate-400 cursor-move"></i>
                        </div>
                        <div class="w-20">
                            <InputNumber v-model="faq.order" :min="0" :max="1000"
                                class="w-full border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                        </div>
                        <div class="flex-1">
                            <div class="font-semibold text-slate-800 truncate">{{ faq.question }}</div>
                            <div class="text-sm text-slate-500 flex items-center gap-2 mt-1">
                                <span class="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-md text-xs">{{
                                    faq.category
                                    }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-end gap-3 pt-6 border-t border-slate-200">
                    <Button label="Cancel" icon="pi pi-times" @click="reorderDialog = false"
                        class="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg transition-all duration-200" />
                    <Button label="Save Order" icon="pi pi-check" @click="saveReorder" :loading="saving"
                        class="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-none rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-semibold" />
                </div>
            </div>
        </Dialog> -->

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
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
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
const expandedRows = ref([]);

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
    expandedRows.value = [...filteredFaqs.value];
};

const collapseAll = () => {
    expandedRows.value = [];
};

const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
};

const formatDateShort = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
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

/* Enhanced Accordion styling */
:deep(.faq-accordion) {
    border: none;
}

:deep(.faq-accordion .p-accordion-tab) {
    margin-bottom: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}

:deep(.faq-accordion .p-accordion-tab:hover) {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

:deep(.faq-accordion .p-accordion-header) {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border: none;
    border-radius: 0.75rem 0.75rem 0 0;
}

:deep(.faq-accordion .p-accordion-header:not(.p-disabled):hover) {
    background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
}

:deep(.faq-accordion .p-accordion-header-link) {
    padding: 1.25rem;
    border: none;
    border-radius: 0.75rem 0.75rem 0 0;
    transition: all 0.2s ease;
}

:deep(.faq-accordion .p-accordion-content) {
    padding: 1.5rem;
    border: none;
    background: white;
}

:deep(.faq-accordion .p-accordion-tab.p-accordion-tab-active .p-accordion-header) {
    background: linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%);
    border-radius: 0.75rem 0.75rem 0 0;
}

:deep(.faq-accordion .p-accordion-tab.p-accordion-tab-active) {
    border-color: #8b5cf6;
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.15);
}

/* Enhanced Dialog styling */
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

/* Enhanced DataTable styling */
:deep(.faq-table .p-datatable-wrapper) {
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

:deep(.faq-table .p-datatable .p-datatable-thead > tr > th) {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    color: #334155;
    font-weight: 600;
    border-bottom: 2px solid #e2e8f0;
    padding: 1rem 0.75rem;
}

:deep(.faq-table .p-datatable .p-datatable-tbody > tr) {
    transition: all 0.2s ease;
    border-bottom: 1px solid #f1f5f9;
}

:deep(.faq-table .p-datatable .p-datatable-tbody > tr:nth-child(even)) {
    background-color: #fafafa;
}

:deep(.faq-table .p-datatable .p-datatable-tbody > tr:hover) {
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
}

:deep(.faq-table .p-datatable .p-datatable-tbody > tr > td) {
    padding: 1rem 0.75rem;
    border: none;
    vertical-align: top;
}

/* Row expansion styling */
:deep(.faq-table .p-datatable .p-datatable-row-expansion) {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

/* Expander button styling */
:deep(.faq-table .p-row-toggler) {
    color: #8b5cf6;
    transition: all 0.2s ease;
}

:deep(.faq-table .p-row-toggler:hover) {
    color: #7c3aed;
    background: #f3f4f6;
}

/* Enhanced Paginator for table */
:deep(.faq-table .p-paginator) {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border: none;
    border-top: 1px solid #e2e8f0;
    padding: 1rem;
}

:deep(.faq-table .p-paginator .p-paginator-pages .p-paginator-page) {
    border-radius: 0.5rem;
    margin: 0 0.125rem;
    transition: all 0.2s ease;
}

:deep(.faq-table .p-paginator .p-paginator-pages .p-paginator-page:hover) {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    color: white;
    transform: scale(1.05);
}

:deep(.faq-table .p-paginator .p-paginator-pages .p-paginator-page.p-highlight) {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    color: white;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

/* Line clamp utilities */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

:deep(.p-inputtext) {
    transition: all 0.2s ease;
}

:deep(.p-inputtext:hover) {
    border-color: #64748b;
}

:deep(.p-inputtext:focus) {
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

:deep(.p-textarea) {
    transition: all 0.2s ease;
}

:deep(.p-textarea:hover) {
    border-color: #64748b;
}

:deep(.p-textarea:focus) {
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

:deep(.p-dropdown) {
    transition: all 0.2s ease;
}

:deep(.p-dropdown:hover) {
    border-color: #64748b;
}

:deep(.p-dropdown:focus-within) {
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

:deep(.p-inputnumber) {
    transition: all 0.2s ease;
}

:deep(.p-inputnumber:hover) {
    border-color: #64748b;
}

:deep(.p-inputnumber:focus-within) {
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

/* Button hover effects */
:deep(.p-button) {
    transition: all 0.2s ease;
}

:deep(.p-button:hover) {
    transform: translateY(-1px);
}

/* Loading spinner enhancement */
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
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
    background: linear-gradient(180deg, #8b5cf6, #6366f1);
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #7c3aed, #4f46e5);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    :deep(.p-dialog) {
        width: 95vw !important;
        margin: 1rem;
    }

    :deep(.faq-accordion .p-accordion-header-link) {
        padding: 1rem;
    }

    :deep(.faq-accordion .p-accordion-content) {
        padding: 1rem;
    }
}

/* Enhanced prose styling for FAQ answers */
.prose {
    max-width: none;
}

.prose p {
    margin-bottom: 0.75rem;
}

.prose ul,
.prose ol {
    padding-left: 1.5rem;
    margin-bottom: 0.75rem;
}

.prose li {
    margin-bottom: 0.25rem;
}

.prose strong {
    font-weight: 600;
    color: #1e293b;
}

.prose a {
    color: #8b5cf6;
    text-decoration: underline;
}

.prose a:hover {
    color: #7c3aed;
}
</style>