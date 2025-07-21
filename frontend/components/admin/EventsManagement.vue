<template>
    <div class="events-management space-y-6">
        <!-- Header Section -->
        <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="text-2xl font-bold text-gray-800">Events Management</h3>
                </div>
                <Button label="Add New Event" icon="pi pi-plus" severity="success" @click="openEventDialog()"
                    class="bg-[#f15a22] hover:bg-orange-600 border-[#f15a22]" />
            </div>
        </div>

        <!-- Filters and Search -->
        <div class="bg-white rounded-lg shadow-sm p-4">
            <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div class="flex flex-col sm:flex-row gap-4 flex-1">
                    <div class="flex-1 max-w-md">
                        <span class="p-input-icon-left w-full">
                            <!-- <i class="pi pi-search" /> -->
                            <InputText v-model="searchQuery" placeholder="Search events..." @input="debounceSearch"
                                class="w-full" />
                        </span>
                    </div>
                    <div class="flex gap-2">
                        <Button :label="viewMode === 'table' ? 'Grid View' : 'Table View'"
                            :icon="viewMode === 'table' ? 'pi pi-th-large' : 'pi pi-list'" outlined
                            @click="toggleViewMode"
                            class="text-[#f15a22] border-[#f15a22] hover:bg-[#f15a22] hover:text-white" />
                        <!-- <Button icon="pi pi-refresh" outlined @click="loadEvents" :loading="loading"
                            v-tooltip="'Refresh Data'"
                            class="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white" /> -->
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row items-center gap-2 text-sm">
                    <div class="flex items-center" v-if="!loading">
                        <span class="inline-block w-2 h-2 rounded-full mr-2"
                            :class="{ 'bg-green-500': databaseConnected && totalRecords > 0, 'bg-red-500': !databaseConnected || totalRecords === 0 }"></span>
                        <span class="text-gray-600">{{ totalRecords }} events in database</span>
                    </div>
                    <div class="text-gray-500 italic" v-else>Loading from database...</div>
                    <!-- <div class="text-gray-500 text-xs" v-if="lastRefresh">
                        <i class="pi pi-clock mr-1"></i>Last updated: {{ formatTime(lastRefresh) }}
                    </div> -->
                </div>
            </div>
        </div>

        <!-- Table View -->
<div v-if="viewMode === 'table'" class="bg-white rounded-lg shadow-sm overflow-hidden">
    <DataTable 
        :value="filteredEvents" 
        :loading="loading" 
        :paginator="true" 
        :rows="rowsPerPage"
        :rowsPerPageOptions="[5, 10, 20, 50]" 
        :totalRecords="totalRecords" 
        :lazy="true"
        responsiveLayout="scroll" 
        stripedRows 
        @page="onPage" 
        class="events-table"
        :globalFilterFields="['title', 'description', 'slug']"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :currentPageReportTemplate="'Showing {first} to {last} of {totalRecords} events'">
        
        <template #empty>
            <div class="text-center py-8">
                <i class="pi pi-calendar text-4xl text-gray-300 mb-4"></i>
                <h3 class="text-lg text-gray-600 mb-2">No Events Found</h3>
                <p class="text-gray-500 mb-4">Get started by creating your first event</p>
                <Button 
                    label="Create Event" 
                    icon="pi pi-plus" 
                    @click="openEventDialog()"
                    class="bg-[#f15a22] hover:bg-orange-600 border-[#f15a22]" />
            </div>
        </template>

        <!-- Thumbnail Column -->
        <Column field="thumbnail" header="Image" :style="{ width: '80px' }">
            <template #body="slotProps">
                <img 
                    :src="slotProps.data.thumbnail || '/images/event/default.jpg'" 
                    :alt="slotProps.data.title"
                    class="w-16 h-16 object-cover rounded-lg border border-gray-200" />
            </template>
        </Column>

        <!-- Title Column -->
        <Column field="title" header="Title" sortable class="min-w-48">
            <template #body="slotProps">
                <div>
                    <h4 class="font-semibold text-gray-900 mb-1">{{ slotProps.data.title }}</h4>
                    <p class="text-sm text-gray-500 truncate max-w-xs">{{ slotProps.data.slug }}</p>
                </div>
            </template>
        </Column>

        <!-- Description Column -->
        <Column field="description" header="Description" sortable class="min-w-64">
            <template #body="slotProps">
                <div>
                    <p class="text-sm text-gray-700 line-clamp-2">{{ slotProps.data.description }}</p>
                </div>
            </template>
        </Column>

        <!-- Status Column -->
        <Column field="status" header="Status" :style="{ width: '100px' }">
            <template #body="slotProps">
                <Tag 
                    :value="slotProps.data.published ? 'Published' : 'Draft'"
                    :severity="slotProps.data.published ? 'success' : 'warning'" />
            </template>
        </Column>

        <!-- Created Date Column -->
        <Column field="createdAt" header="Created" sortable>
            <template #body="slotProps">
                <div class="text-sm">
                    <div class="text-gray-900">{{ formatDate(slotProps.data.createdAt) }}</div>
                    <div class="text-gray-500">{{ formatTime(slotProps.data.createdAt) }}</div>
                </div>
            </template>
        </Column>

        <!-- Actions Column -->
        <Column header="Actions" :style="{ width: '180px' }">
            <template #body="slotProps">
                <div class="flex gap-1">
                    <Button 
                        icon="pi pi-external-link" 
                        size="small" 
                        text 
                        severity="info"
                        @click="previewEvent(slotProps.data)" 
                        v-tooltip="'Preview'" />
                    <Button 
                        icon="pi pi-pencil" 
                        size="small" 
                        text 
                        severity="warning"
                        @click="editEvent(slotProps.data)" 
                        v-tooltip="'Edit'" />
                    <Button 
                        icon="pi pi-trash" 
                        size="small" 
                        text 
                        severity="danger"
                        @click="confirmDeleteEvent(slotProps.data)" 
                        v-tooltip="'Delete'" />
                </div>
            </template>
        </Column>
    </DataTable>
</div>

        <!-- Grid View -->
        <div v-else class="bg-white rounded-lg shadow-sm p-6">
            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center py-20">
                <div
                    class="w-16 h-16 border-4 border-t-[#f15a22] border-r-[#f15a22]/50 border-b-[#f15a22]/30 border-l-[#f15a22]/10 rounded-full animate-spin">
                </div>
                <p class="mt-4 text-gray-600">Fetching events from database...</p>
            </div>

            <!-- Database Status -->
            <div v-if="!loading && displayedEvents.length > 0" class="mb-4 flex items-center justify-between">
                <div class="text-sm text-gray-600 flex items-center">
                    <span class="inline-block w-2 h-2 rounded-full mr-2 bg-green-500"></span>
                    <span>Connected to database</span>
                </div>
                <div class="text-sm text-gray-500">
                    Showing {{ displayedEvents.length }} of {{ totalRecords }} total events
                </div>
            </div>

            <!-- Events Grid -->
            <div v-else-if="displayedEvents.length > 0"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div v-for="event in displayedEvents" :key="event.id"
                    class="group bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 relative">

                    <!-- Status Badge -->
                    <div class="absolute top-3 left-3 z-10">
                        <Tag :value="event.published ? 'Published' : 'Draft'"
                            :severity="event.published ? 'success' : 'warning'" class="text-xs" />
                    </div>

                    <!-- Admin Action Buttons -->
                    <div
                        class="absolute top-3 right-3 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button icon="pi pi-eye" size="small" rounded severity="info" @click="previewEvent(event)"
                            v-tooltip="'Preview'" class="bg-blue-500 hover:bg-blue-600 border-blue-500 w-8 h-8" />
                        <Button icon="pi pi-pencil" size="small" rounded severity="warning" @click="editEvent(event)"
                            v-tooltip="'Edit'" class="bg-yellow-500 hover:bg-yellow-600 border-yellow-500 w-8 h-8" />
                        <Button icon="pi pi-trash" size="small" rounded severity="danger"
                            @click="confirmDeleteEvent(event)" v-tooltip="'Delete'"
                            class="bg-red-500 hover:bg-red-600 border-red-500 w-8 h-8" />
                    </div>

                    <div class="aspect-video bg-gray-100 overflow-hidden">
                        <img :src="event.thumbnail || '/images/event/default.jpg'" :alt="event.title"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>

                    <div class="p-4">
                        <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{{ event.title }}</h3>
                        <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ event.description }}</p>

                        <div class="space-y-2 text-xs text-gray-500">
                            <div class="flex items-center">
                                <i class="pi pi-calendar mr-1"></i>
                                <span>Created: {{ formatDate(event.createdAt) }}</span>
                            </div>
                            <div class="flex items-center"
                                v-if="event.updatedAt && event.updatedAt !== event.createdAt">
                                <i class="pi pi-clock mr-1"></i>
                                <span>Updated: {{ formatDate(event.updatedAt) }}</span>
                            </div>
                        </div>

                        <div class="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <code class="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{{ event.slug
                                }}</code>
                            </div>
                            <Button label="Preview" size="small" text @click="previewEvent(event)"
                                class="text-[#f15a22] hover:bg-orange-50" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-20">
                <i class="pi pi-calendar text-6xl text-gray-300 mb-4"></i>
                <h3 class="text-xl text-gray-600 mb-2">No Events Found</h3>
                <p class="text-gray-500 mb-6">Get started by creating your first event</p>
                <Button label="Create Event" icon="pi pi-plus" @click="openEventDialog()"
                    class="bg-[#f15a22] hover:bg-orange-600 border-[#f15a22]" />
            </div>
        </div>

        <!-- Event Dialog for Create/Edit -->
        <Dialog v-model:visible="eventDialog" :header="editingEvent ? 'Edit Event' : 'Create New Event'"
            :style="{ width: '80vw', maxWidth: '1000px' }" :modal="true" class="p-fluid">
            <form @submit.prevent="saveEvent" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Left Column -->
                <div class="space-y-4">
                    <div class="field">
                        <label for="title" class="font-medium">Title *</label>
                        <InputText id="title" v-model="eventForm.title" required placeholder="Enter event title"
                            class="w-full" @input="validateTitle" />
                        <small class="text-red-500" v-if="titleError">{{ titleError }}</small>
                    </div>

                    <div class="field">
                        <label for="slug" class="font-medium">Slug *</label>
                        <div class="flex gap-2">
                            <InputText id="slug" v-model="eventForm.slug" required placeholder="event-slug"
                                class="w-full" @input="validateSlug" />
                            <Button type="button" icon="pi pi-refresh" class="p-button-outlined"
                                @click="generateSlugFromTitle" v-tooltip="'Generate slug from title'" />
                        </div>
                        <small class="text-gray-600">This will be used in the URL (e.g., /events/your-slug)</small>
                        <small class="text-red-500" v-if="slugError">{{ slugError }}</small>
                    </div>

                    <div class="field">
                        <label for="description" class="font-medium">Description *</label>
                        <Textarea id="description" v-model="eventForm.description" required
                            placeholder="Detailed description of the event" rows="6" class="w-full"
                            @input="validateDescription" />
                        <small class="text-red-500" v-if="descriptionError">{{ descriptionError }}</small>
                    </div>

                    <div class="field">
                        <div class="flex align-items-center">
                            <Checkbox id="published" v-model="eventForm.published" :binary="true" />
                            <label for="published" class="ml-2 font-medium">Published</label>
                        </div>
                        <small class="text-gray-600">Check to make this event visible on the public website</small>
                    </div>

                    <div class="field">
                        <label for="thumbnail" class="font-medium">Thumbnail Image</label>
                        <FileUpload mode="basic" name="thumbnail" accept="image/*" :maxFileSize="5000000"
                            @select="onThumbnailSelect" @clear="onThumbnailClear" chooseLabel="Choose Thumbnail"
                            class="w-full" />
                        <div v-if="eventForm.thumbnailPreview" class="mt-3">
                            <img :src="eventForm.thumbnailPreview" alt="Thumbnail preview"
                                class="max-w-xs h-32 object-cover rounded-lg border">
                        </div>
                    </div>
                </div>

                <!-- Right Column -->
                <div class="space-y-4">
                    <div class="field">
                        <label for="eventImages" class="font-medium">Additional Images</label>
                        <FileUpload mode="advanced" name="eventImages" accept="image/*" :multiple="true"
                            :maxFileSize="5000000" @select="onImagesSelect" @remove="onImageRemove"
                            @clear="onImagesClear" chooseLabel="Choose Images" uploadLabel="Upload" cancelLabel="Cancel"
                            class="w-full">
                            <template #empty>
                                <p>Drag and drop images here or click to upload.</p>
                            </template>
                        </FileUpload>
                        <div v-if="eventForm.imagePreviews.length > 0" class="mt-3 grid grid-cols-2 gap-2">
                            <div v-for="(preview, index) in eventForm.imagePreviews" :key="index" class="relative">
                                <img :src="preview" :alt="`Preview ${index + 1}`"
                                    class="w-full h-24 object-cover rounded-lg border">
                                <button @click="removeImagePreview(index)"
                                    class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                    type="button">
                                    ×
                                </button>
                            </div>
                        </div>
                        <small class="text-gray-600 mt-1">Maximum file size: 5MB per image. Supported formats: JPG, PNG,
                            GIF</small>
                    </div>
                </div>

                <!-- Form Actions -->
                <div class="col-span-full flex justify-end gap-3 pt-4 border-t">
                    <Button label="Cancel" icon="pi pi-times" severity="secondary" @click="eventDialog = false"
                        type="button" :disabled="saving" />
                    <Button :label="editingEvent ? 'Update' : 'Create'" icon="pi pi-check" type="submit"
                        :loading="saving" :disabled="saving || !validateForm()"
                        class="bg-[#f15a22] hover:bg-orange-600 border-[#f15a22]" />
                </div>
            </form>
        </Dialog>

        <!-- Delete Confirmation Dialog -->
        <ConfirmDialog />

        <!-- Toast for notifications -->
        <Toast />
    </div>
</template>

<script>
import { useEventService } from '~/composables/useEvent'
import { useFileUpload } from '@/composables/useFileUpload'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Calendar from 'primevue/calendar'
import Checkbox from 'primevue/checkbox'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Dropdown from 'primevue/dropdown'
import FileUpload from 'primevue/fileupload'
import { ref } from 'vue'

export default {
    name: 'EventsManagement',
    components: {
        Button,
        Dialog,
        Toast,
        ConfirmDialog,
        InputText,
        Textarea,
        Calendar,
        Checkbox,
        DataTable,
        Column,
        Tag,
        Dropdown,
        FileUpload
    }, setup() {
        const toast = useToast()
        const confirm = useConfirm()
        const eventService = useEventService()
        const fileUpload = useFileUpload()

        return {
            toast,
            confirm,
            eventService,
            fileUpload
        }
    },
    data() {
        return {
            events: [],
            filteredEvents: [],
            loading: false,
            saving: false,
            eventDialog: false,
            editingEvent: null,
            viewMode: 'table', // 'table' or 'grid'
            searchQuery: '',
            statusFilter: null,
            searchTimeout: null,
            currentPage: 1,
            rowsPerPage: 10,
            totalRecords: 0,
            databaseConnected: false,
            lastRefresh: null,
            eventForm: {
                title: '',
                slug: '',
                description: '',
                published: true,
                thumbnailFile: null,
                thumbnailPreview: '',
                imageFiles: [],
                imagePreviews: []
            },
            uploadedThumbnail: null,
            uploadedImages: [],
            titleError: '',
            slugError: '',
            descriptionError: ''
        }
    },
    async mounted() {
        // Set default view mode from localStorage if available
        const savedViewMode = localStorage.getItem('events-view-mode');
        if (savedViewMode) {
            this.viewMode = savedViewMode;
        }

        // Load events data
        await this.loadEvents();
    },
    computed: {
        displayedEvents() {
            return this.filteredEvents || this.events || []
        }
    },
    watch: {
        'eventForm.title'(newTitle) {
            if (!this.editingEvent && newTitle) {
                // Auto-generate slug from title
                this.eventForm.slug = newTitle
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '')

                // Validate slug after generation
                this.validateSlug()
            }
        }
    },
    methods: {
        async loadEvents() {
            this.loading = true;
            let shouldRedirect = false;

            try {
                // Check authentication state first
                const authStore = useAuthStore();
                console.log('Auth state:', {
                    isAuthenticated: authStore.isAuthenticated,
                    hasToken: !!authStore.accessToken,
                    userRole: authStore.user?.role,
                    tokenPreview: authStore.accessToken ? authStore.accessToken.substring(0, 20) + '...' : 'None'
                });

                if (!authStore.isAuthenticated || !authStore.accessToken) {
                    console.warn('User not authenticated, redirecting to login');
                    this.toast.add({
                        severity: 'error',
                        summary: 'Authentication Required',
                        detail: 'Please log in to access the admin panel',
                        life: 5000
                    });
                    shouldRedirect = true;
                    return; // Exit early
                }

                // Try to refresh token if it might be expired
                if (authStore.refreshToken) {
                    console.log('Attempting to refresh token...');
                    const refreshSuccess = await authStore.refreshAccessToken();
                    if (!refreshSuccess) {
                        console.warn('Token refresh failed, redirecting to login');
                        this.toast.add({
                            severity: 'error',
                            summary: 'Session Expired',
                            detail: 'Please log in again',
                            life: 5000
                        });
                        await authStore.logout();
                        shouldRedirect = true;
                        return; // Exit early
                    }
                }

                // Set up pagination parameters for the API request
                const params = {
                    page: this.currentPage,
                    limit: this.rowsPerPage,
                    search: this.searchQuery || undefined
                };

                console.log('Fetching events with params:', params);
                const response = await this.eventService.getAdminEvents(params)

                // Process API response
                if (response && typeof response === 'object') {
                    // Handle paginated response structure (from backend)
                    if (Array.isArray(response.events)) {
                        this.events = response.events;
                        this.totalRecords = response.total || this.events.length;
                        console.log(`Loaded ${this.events.length} events out of ${this.totalRecords} total events`);
                    }
                    // Handle direct array response
                    else if (Array.isArray(response)) {
                        this.events = response;
                        this.totalRecords = response.length;
                        console.log(`Loaded ${this.events.length} events from admin API`);
                    }
                    // Handle other common response patterns
                    else if (Array.isArray(response.data)) {
                        this.events = response.data;
                        this.totalRecords = response.total || response.count || this.events.length;
                    }
                    // Fallback for unexpected format
                    else {
                        console.warn('API returned object but no recognizable events array:', response);
                        this.events = [];
                        this.totalRecords = 0;
                    }
                } else {
                    console.warn('Unexpected API response format:', response);
                    this.events = [];
                    this.totalRecords = 0;
                }

                // Enrich data with additional display properties
                this.events = this.events.map(event => ({
                    ...event,
                    formattedCreatedAt: this.formatDate(event.createdAt),
                    formattedUpdatedAt: this.formatDate(event.updatedAt),
                    imageCount: event.images?.length || 0,
                    statusLabel: event.published ? 'Published' : 'Draft',
                    statusSeverity: event.published ? 'success' : 'warning'
                }));

                // Update status information
                this.databaseConnected = true
                this.lastRefresh = new Date()

                // Apply any filters if needed (for client-side filtering)
                this.applySearch()
            } catch (error) {
                console.error('Load events error:', error);
                let needsRedirect = false;

                // Handle specific error cases
                if (error.status === 401 || error.statusCode === 401 || error.message.includes('Authentication required')) {
                    this.toast.add({
                        severity: 'error',
                        summary: 'Authentication Error',
                        detail: 'Your session has expired. Please log in again.',
                        life: 5000
                    });
                    const authStore = useAuthStore();
                    await authStore.logout();
                    shouldRedirect = true;
                } else if (error.status === 403 || error.statusCode === 403 || error.message.includes('Access denied')) {
                    this.toast.add({
                        severity: 'error',
                        summary: 'Access Denied',
                        detail: 'You do not have permission to access this resource.',
                        life: 5000
                    });
                } else {
                    this.toast.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.message || 'Failed to load events. Please try again.',
                        life: 3000
                    });
                }

                // Set empty array as fallback
                this.events = [];
                this.totalRecords = 0;
                this.applySearch();
            } finally {
                this.loading = false;

                // Handle redirection after everything else is done
                if (shouldRedirect) {
                    // Use window.location instead of navigateTo to avoid promise channel issues
                    window.location.href = '/login';
                }
            }
        },

        toggleViewMode() {
            this.viewMode = this.viewMode === 'table' ? 'grid' : 'table';
            // Save view mode preference to localStorage
            localStorage.setItem('events-view-mode', this.viewMode);
        },

        debounceSearch() {
            if (this.searchTimeout) clearTimeout(this.searchTimeout)
            this.searchTimeout = setTimeout(() => {
                // Reset to first page when searching
                this.currentPage = 1
                // Fetch new results from server with search parameter
                this.loadEvents()
            }, 300)
        },

        applySearch() {
            // If we're doing server-side filtering, this is just a backup
            // for any additional client-side filtering if needed

            // Make sure this.events is an array before trying to spread it
            if (!Array.isArray(this.events)) {
                console.warn('Events is not an array:', this.events)
                this.filteredEvents = []
                return
            }

            // In most cases, this will just pass through the server-filtered events
            this.filteredEvents = this.events
            console.log(`Using ${this.filteredEvents.length} events after filtering`);
        },

        onPage(event) {
            this.currentPage = event.page + 1
            this.rowsPerPage = event.rows

            // Load the new page of data from the server
            this.loadEvents()
        },

        formatDate(dateString) {
            if (!dateString) return 'No date'
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        },

        formatTime(dateString) {
            if (!dateString) return ''
            return new Date(dateString).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            })
        },

        openEventDialog(event = null) {
            this.editingEvent = event

            // Clear validation errors
            this.titleError = ''
            this.slugError = ''
            this.descriptionError = ''

            if (event) {
                // Edit mode
                this.eventForm = {
                    title: event.title || '',
                    slug: event.slug || '',
                    description: event.description || '',
                    published: event.published !== undefined ? event.published : true,
                    thumbnailFile: null,
                    thumbnailPreview: event.thumbnail || '',
                    imageFiles: [],
                    imagePreviews: event.images ? event.images.map(img => img.url || img) : []
                }
            } else {
                // Create mode
                this.resetForm()
            }
            this.eventDialog = true
        },

        resetForm() {
            this.eventForm = {
                title: '',
                slug: '',
                description: '',
                published: true,
                thumbnailFile: null,
                thumbnailPreview: '',
                imageFiles: [],
                imagePreviews: []
            }
            this.uploadedThumbnail = null
            this.uploadedImages = []
            this.titleError = ''
            this.slugError = ''
            this.descriptionError = ''
        },

        generateSlugFromTitle() {
            if (this.eventForm.title) {
                this.eventForm.slug = this.eventForm.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric characters with hyphens
                    .replace(/(^-|-$)/g, '')      // Remove leading/trailing hyphens
                    .replace(/-+/g, '-');         // Replace multiple hyphens with a single one

                this.validateSlug();

                this.toast.add({
                    severity: 'info',
                    summary: 'Slug Generated',
                    detail: `Slug created from title: ${this.eventForm.slug}`,
                    life: 3000
                });
            } else {
                this.toast.add({
                    severity: 'warn',
                    summary: 'No Title',
                    detail: 'Please enter a title first to generate a slug',
                    life: 3000
                });
            }
        },

        validateTitle() {
            this.titleError = ''
            if (!this.eventForm.title || this.eventForm.title.trim().length < 3) {
                this.titleError = 'Title must be at least 3 characters long'
                return false
            }
            if (this.eventForm.title.trim().length > 200) {
                this.titleError = 'Title must be less than 200 characters'
                return false
            }
            return true
        },

        validateSlug() {
            this.slugError = ''
            if (!this.eventForm.slug || this.eventForm.slug.trim().length < 3) {
                this.slugError = 'Slug must be at least 3 characters long'
                return false
            }
            if (this.eventForm.slug.trim().length > 100) {
                this.slugError = 'Slug must be less than 100 characters'
                return false
            }
            // Check for valid slug format
            const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
            if (!slugRegex.test(this.eventForm.slug)) {
                this.slugError = 'Slug can only contain lowercase letters, numbers, and hyphens'
                return false
            }
            return true
        },

        validateDescription() {
            this.descriptionError = ''
            if (!this.eventForm.description || this.eventForm.description.trim().length < 10) {
                this.descriptionError = 'Description must be at least 10 characters long'
                return false
            }
            if (this.eventForm.description.trim().length > 5000) {
                this.descriptionError = 'Description must be less than 5000 characters'
                return false
            }
            return true
        },

        validateForm() {
            const titleValid = this.validateTitle()
            const slugValid = this.validateSlug()
            const descriptionValid = this.validateDescription()

            return titleValid && slugValid && descriptionValid
        },

        async saveEvent() {
            this.saving = true
            try {
                // Check authentication state first
                const authStore = useAuthStore();
                if (!authStore.isAuthenticated || !authStore.accessToken) {
                    this.toast.add({
                        severity: 'error',
                        summary: 'Authentication Error',
                        detail: 'You are not properly authenticated. Please log in again.',
                        life: 5000
                    });
                    await authStore.logout();
                    await navigateTo('/login');
                    return;
                }

                // Validate required fields
                if (!this.validateForm()) {
                    this.toast.add({
                        severity: 'error',
                        summary: 'Validation Error',
                        detail: 'Please fix the errors in the form before submitting.',
                        life: 5000
                    });
                    return;
                }

                // Upload thumbnail if selected
                let thumbnailUrl = this.eventForm.thumbnailPreview
                if (this.eventForm.thumbnailFile) {
                    try {
                        thumbnailUrl = await this.uploadFile(this.eventForm.thumbnailFile, 'thumbnail')
                    } catch (uploadError) {
                        console.error('Thumbnail upload failed:', uploadError);
                        this.toast.add({
                            severity: 'error',
                            summary: 'Upload Error',
                            detail: 'Failed to upload thumbnail. Please check your authentication and try again.',
                            life: 5000
                        });
                        return;
                    }
                }

                // Upload additional images if selected
                let imageUrls = []
                if (this.eventForm.imageFiles.length > 0) {
                    try {
                        imageUrls = await Promise.all(
                            this.eventForm.imageFiles.map(file => this.uploadFile(file, 'gallery'))
                        )
                    } catch (uploadError) {
                        console.error('Image upload failed:', uploadError);
                        this.toast.add({
                            severity: 'warn',
                            summary: 'Upload Warning',
                            detail: 'Some images failed to upload. Proceeding with event creation.',
                            life: 5000
                        });
                        // Continue with event creation even if image upload fails
                    }
                }

                // Prepare event data to match database schema
                const eventData = {
                    title: this.eventForm.title.trim(),
                    slug: this.eventForm.slug.trim(),
                    description: this.eventForm.description.trim(),
                    published: this.eventForm.published,
                    thumbnail: thumbnailUrl || null,
                    // Don't include id, createdAt, or updatedAt as these are managed by the backend
                }

                let savedEvent
                if (this.editingEvent) {
                    savedEvent = await this.eventService.updateEvent(this.editingEvent.id, eventData)
                    this.toast.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Event updated successfully',
                        life: 3000
                    })
                } else {
                    savedEvent = await this.eventService.createEvent(eventData)
                    this.toast.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Event created successfully',
                        life: 3000
                    })
                }

                // Handle additional images if any
                if (imageUrls.length > 0 && savedEvent) {
                    try {
                        // Create event images (you'll need to implement this in the backend)
                        for (const imageUrl of imageUrls) {
                            await this.createEventImage(savedEvent.id, imageUrl)
                        }
                    } catch (imageError) {
                        console.warn('Failed to create additional images:', imageError)
                        this.toast.add({
                            severity: 'warn',
                            summary: 'Warning',
                            detail: 'Event created but some images failed to upload',
                            life: 3000
                        })
                    }
                }

                this.eventDialog = false
                // Force refresh the events cache to ensure UI consistency
                await eventService.refreshEventsCache();
                await this.loadEvents();
            } catch (error) {
                console.error('Save event error:', error);

                // Handle specific error cases
                if (error.status === 401 || error.statusCode === 401 || error.message.includes('Authentication')) {
                    this.toast.add({
                        severity: 'error',
                        summary: 'Authentication Error',
                        detail: 'Your session has expired. Please log in again.',
                        life: 5000
                    });
                    const authStore = useAuthStore();
                    await authStore.logout();
                    await navigateTo('/login');
                } else if (error.status === 403 || error.statusCode === 403) {
                    this.toast.add({
                        severity: 'error',
                        summary: 'Permission Error',
                        detail: 'You do not have permission to perform this action.',
                        life: 5000
                    });
                } else if (error.status === 409 || error.statusCode === 409) {
                    this.toast.add({
                        severity: 'error',
                        summary: 'Conflict Error',
                        detail: 'An event with this slug already exists. Please choose a different slug.',
                        life: 5000
                    });
                } else if (error.status === 500 || error.statusCode === 500) {
                    this.toast.add({
                        severity: 'error',
                        summary: 'Server Error',
                        detail: 'A server error occurred. Please try again or contact support.',
                        life: 5000
                    });
                } else {
                    this.toast.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.message || (this.editingEvent ? 'Failed to update event' : 'Failed to create event'),
                        life: 3000
                    })
                }
            } finally {
                this.saving = false
            }
        },

        async uploadFile(file, type) {
            try {
                // Check authentication before attempting upload
                const authStore = useAuthStore();
                if (!authStore.isAuthenticated || !authStore.accessToken) {
                    throw new Error('Authentication required. Please log in again.');
                }

                // Use the fileUpload service
                const result = await this.fileUpload.uploadFile(file, type);

                // Handle the response - it might be a URL string or an object with url property
                if (typeof result === 'string') {
                    return result;
                } else if (result && result.url) {
                    return result.url;
                } else {
                    throw new Error('Invalid upload response format');
                }
            } catch (error) {
                console.error('Upload failed:', error);

                // If authentication error, handle it specifically
                if (error.message.includes('Authentication') || error.status === 401 || error.statusCode === 401) {
                    this.toast.add({
                        severity: 'error',
                        summary: 'Authentication Error',
                        detail: 'Please log in again to upload files.',
                        life: 5000
                    });
                    throw error; // Re-throw to be handled by caller
                }

                // If it's a server error, throw it up
                if (error.status >= 500 || error.statusCode >= 500) {
                    throw new Error('Server error during file upload. Please try again.');
                }

                console.warn('Upload failed, using preview as fallback:', error);
                // Create a data URL synchronously instead of using a Promise
                const reader = new FileReader();
                return new Promise((resolve) => {
                    reader.onload = (e) => resolve(e.target.result);
                    reader.onerror = () => {
                        console.error('FileReader failed');
                        resolve(''); // Return empty string on error
                    };
                    reader.readAsDataURL(file);
                });
            }
        },

        async createEventImage(eventId, imageUrl) {
            try {
                const { useApiUrl } = await import('@/composables/useApiUrl')
                const { useAuth } = await import('@/composables/useAuth')

                const { getApiBase } = useApiUrl()
                const { getAuthHeaders } = useAuth()

                const response = await $fetch(`${getApiBase()}/api/events/${eventId}/images`, {
                    method: 'POST',
                    headers: getAuthHeaders(),
                    body: {
                        url: imageUrl,
                        eventId: eventId
                    }
                })
                return response
            } catch (error) {
                console.error('Error creating event image:', error)
                throw error
            }
        },

        async onThumbnailSelect(event) {
            if (!event || !event.files || !event.files.length) {
                console.warn('Invalid file selection in onThumbnailSelect');
                return;
            }

            const file = event.files[0];
            if (file) {
                // Validate file
                const validation = this.fileUpload.validateFile(file, {
                    maxSize: 5 * 1024 * 1024, // 5MB
                    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
                });

                if (!validation.isValid) {
                    this.toast.add({
                        severity: 'error',
                        summary: 'Invalid File',
                        detail: validation.errors.join(', '),
                        life: 5000
                    });
                    return;
                }

                // Set the file first so UI can be updated
                this.eventForm.thumbnailFile = file;

                // Create preview safely
                try {
                    // Set a placeholder first to avoid UI delay
                    this.eventForm.thumbnailPreview = '';

                    // Generate the preview
                    const preview = await this.fileUpload.createImagePreview(file);

                    // Only update if component is still mounted and the same file is selected
                    if (this.eventForm.thumbnailFile === file) {
                        this.eventForm.thumbnailPreview = preview;
                    }
                } catch (error) {
                    console.error('Failed to create thumbnail preview:', error);
                    this.toast.add({
                        severity: 'warn',
                        summary: 'Preview Warning',
                        detail: 'Could not generate thumbnail preview',
                        life: 3000
                    });
                }
            }
        },

        onThumbnailClear() {
            this.eventForm.thumbnailFile = null
            this.eventForm.thumbnailPreview = ''
        },

        async onImagesSelect(event) {
            if (!event || !event.files || !Array.isArray(event.files)) {
                console.warn('Invalid files received in onImagesSelect');
                return;
            }

            const files = Array.from(event.files);
            const validFiles = [];

            // Validate all files first
            for (const file of files) {
                // Validate each file
                const validation = this.fileUpload.validateFile(file, {
                    maxSize: 5 * 1024 * 1024, // 5MB
                    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
                });

                if (!validation.isValid) {
                    this.toast.add({
                        severity: 'error',
                        summary: 'Invalid File',
                        detail: `${file.name}: ${validation.errors.join(', ')}`,
                        life: 5000
                    });
                    continue;
                }

                validFiles.push(file);
            }

            // Update file list first
            this.eventForm.imageFiles = [...this.eventForm.imageFiles, ...validFiles];

            // Process all previews in parallel to avoid sequential async issues
            try {
                const previews = await Promise.all(
                    validFiles.map(file => this.fileUpload.createImagePreview(file)
                        .catch(error => {
                            console.error('Failed to create preview for', file.name, error);
                            return null; // Return null for failed previews
                        })
                    )
                );

                // Add only successful previews
                const validPreviews = previews.filter(preview => preview !== null);
                this.eventForm.imagePreviews = [...this.eventForm.imagePreviews, ...validPreviews];
            } catch (error) {
                console.error('Error creating image previews:', error);
                this.toast.add({
                    severity: 'warn',
                    summary: 'Preview Warning',
                    detail: 'Some image previews could not be generated',
                    life: 3000
                });
            }
        },

        onImageRemove(event) {
            const fileIndex = this.eventForm.imageFiles.indexOf(event.file)
            if (fileIndex > -1) {
                this.eventForm.imageFiles.splice(fileIndex, 1)
                this.eventForm.imagePreviews.splice(fileIndex, 1)
            }
        },

        onImagesClear() {
            this.eventForm.imageFiles = []
            this.eventForm.imagePreviews = []
        },

        removeImagePreview(index) {
            this.eventForm.imageFiles.splice(index, 1)
            this.eventForm.imagePreviews.splice(index, 1)
        },

        editEvent(event) {
            this.openEventDialog(event)
        },

        confirmDeleteEvent(event) {
            this.confirm.require({
                message: `Are you sure you want to delete "${event.title}"?`,
                header: 'Confirm Deletion',
                icon: 'pi pi-exclamation-triangle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    this.deleteEvent(event.id)
                }
            })
        },

        async deleteEvent(eventId) {
            try {
                // Check authentication before attempting delete
                const authStore = useAuthStore();
                if (!authStore.isAuthenticated || !authStore.accessToken) {
                    this.toast.add({
                        severity: 'error',
                        summary: 'Authentication Error',
                        detail: 'Please log in again to delete events.',
                        life: 5000
                    });
                    // Do logout first before navigation
                    await authStore.logout();
                    // Use window.location for reliable navigation that doesn't create promise issues
                    window.location.href = '/login';
                    return;
                }

                // Delete the event
                await this.eventService.deleteEvent(eventId);

                // Show success message
                this.toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Event deleted successfully',
                    life: 3000
                });

                // Force refresh the events cache to ensure UI consistency
                try {
                    await this.eventService.refreshEventsCache();
                    await this.loadEvents();
                } catch (refreshError) {
                    console.error('Error refreshing events after delete:', refreshError);
                    // Still considered successful even if refresh fails
                }
            } catch (error) {
                console.error('Delete event error:', error);

                // Handle specific error cases
                if (error.status === 401 || error.statusCode === 401 || error.message.includes('Authentication')) {
                    this.toast.add({
                        severity: 'error',
                        summary: 'Authentication Error',
                        detail: 'Your session has expired. Please log in again.',
                        life: 5000
                    });
                    const authStore = useAuthStore();
                    await authStore.logout();
                    await navigateTo('/login');
                } else if (error.status === 403 || error.statusCode === 403) {
                    this.toast.add({
                        severity: 'error',
                        summary: 'Permission Error',
                        detail: 'You do not have permission to delete this event.',
                        life: 5000
                    });
                } else if (error.status === 404 || error.statusCode === 404) {
                    this.toast.add({
                        severity: 'error',
                        summary: 'Not Found',
                        detail: 'Event not found. It may have been already deleted.',
                        life: 3000
                    });
                } else {
                    this.toast.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.message || 'Failed to delete event',
                        life: 3000
                    })
                }
            }
        },

        exportEventsData() {
            try {
                // Prepare the data for export (clean up sensitive or unnecessary fields)
                const exportData = this.events.map(event => ({
                    id: event.id,
                    title: event.title,
                    slug: event.slug,
                    description: event.description,
                    thumbnail: event.thumbnail,
                    published: event.published,
                    createdAt: event.createdAt,
                    updatedAt: event.updatedAt,
                    imagesCount: event.images ? event.images.length : 0
                }));

                // Create a JSON blob and download link
                const dataStr = JSON.stringify(exportData, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });

                // Create download link
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `events-data-${new Date().toISOString().split('T')[0]}.json`;

                // Trigger download and cleanup
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                this.toast.add({
                    severity: 'success',
                    summary: 'Export Successful',
                    detail: `Exported ${exportData.length} events`,
                    life: 3000
                });
            } catch (error) {
                console.error('Error exporting events data:', error);
                this.toast.add({
                    severity: 'error',
                    summary: 'Export Failed',
                    detail: error.message || 'Failed to export events data',
                    life: 3000
                });
            }
        },

        previewEvent(event) {
            // Open event details in new tab using the event slug
            // Add preview=true parameter to allow viewing unpublished events
            const url = `/EventDetails?slug=${event.slug}&preview=true`
            window.open(url, '_blank')
        },

        formatDate(dateString) {
            if (!dateString) return 'No date'
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        },

        formatTime(dateString) {
            if (!dateString) return ''
            return new Date(dateString).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            })
        },

        // Form validation methods
        validateTitle() {
            this.titleError = ''
            if (!this.eventForm.title || this.eventForm.title.trim().length < 3) {
                this.titleError = 'Title must be at least 3 characters long'
                return false
            }
            if (this.eventForm.title.trim().length > 200) {
                this.titleError = 'Title must be less than 200 characters'
                return false
            }
            return true
        },

        validateSlug() {
            this.slugError = ''
            if (!this.eventForm.slug || this.eventForm.slug.trim().length < 3) {
                this.slugError = 'Slug must be at least 3 characters long'
                return false
            }
            if (this.eventForm.slug.trim().length > 100) {
                this.slugError = 'Slug must be less than 100 characters'
                return false
            }
            // Check for valid slug format
            const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
            if (!slugRegex.test(this.eventForm.slug)) {
                this.slugError = 'Slug can only contain lowercase letters, numbers, and hyphens'
                return false
            }
            return true
        },

        validateDescription() {
            this.descriptionError = ''
            if (!this.eventForm.description || this.eventForm.description.trim().length < 10) {
                this.descriptionError = 'Description must be at least 10 characters long'
                return false
            }
            if (this.eventForm.description.trim().length > 5000) {
                this.descriptionError = 'Description must be less than 5000 characters'
                return false
            }
            return true
        },

        validateForm() {
            const titleValid = this.validateTitle()
            const slugValid = this.validateSlug()
            const descriptionValid = this.validateDescription()

            return titleValid && slugValid && descriptionValid
        }
    }
}
</script>

<style scoped>
@import '~/assets/css/theme.css';

.events-management .section-header {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
}

.events-management .field {
    margin-bottom: 1rem;
}

.events-management .field label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
}

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

@keyframes fadein {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadein {
    animation: fadein 1s cubic-bezier(.4, 0, .2, 1) both;
}

.animate-fadein.delay-200 {
    animation-delay: 0.2s;
}

@keyframes cardin {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-card {
    animation: cardin 0.7s cubic-bezier(.4, 0, .2, 1) both;
}

.animate-card:nth-child(2) {
    animation-delay: 0.1s;
}

.animate-card:nth-child(3) {
    animation-delay: 0.2s;
}

.animate-card:nth-child(4) {
    animation-delay: 0.3s;
}

.animate-card:nth-child(5) {
    animation-delay: 0.4s;
}

.animate-card:nth-child(6) {
    animation-delay: 0.5s;
}

@keyframes pulse-slow {

    0%,
    100% {
        opacity: 0.7;
    }

    50% {
        opacity: 0.3;
    }
}

.animate-pulse-slow {
    animation: pulse-slow 8s ease-in-out infinite;
}

/* PrimeVue component overrides */
.events-management :deep(.p-dialog .p-dialog-header) {
    background: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
}

.events-management :deep(.p-dialog .p-dialog-content) {
    padding: 2rem;
}

.events-management :deep(.p-button) {
    border-radius: 8px;
}

.events-management :deep(.p-inputtext),
.events-management :deep(.p-calendar),
.events-management :deep(.p-dropdown) {
    border-radius: 8px;
    border: 2px solid #e1e5e9;
    padding: 0.75rem;
}

.events-management :deep(.p-inputtext:focus),
.events-management :deep(.p-calendar:focus-within),
.events-management :deep(.p-dropdown:focus-within) {
    border-color: #f15a22;
    box-shadow: 0 0 0 0.2rem rgba(241, 90, 34, 0.2);
}

.events-management :deep(.p-inputtextarea) {
    border-radius: 8px;
    border: 2px solid #e1e5e9;
    padding: 0.75rem;
    resize: vertical;
    min-height: 100px;
}

.events-management :deep(.p-inputtextarea:focus) {
    border-color: #f15a22;
    box-shadow: 0 0 0 0.2rem rgba(241, 90, 34, 0.2);
}

.events-management :deep(.p-checkbox .p-checkbox-box) {
    border-radius: 4px;
    border: 2px solid #e1e5e9;
}

.events-management :deep(.p-checkbox .p-checkbox-box.p-highlight) {
    background: #f15a22;
    border-color: #f15a22;
}

/* FileUpload component styling */
.events-management :deep(.p-fileupload) {
    border-radius: 8px;
    border: 2px solid #e1e5e9;
}

.events-management :deep(.p-fileupload .p-button) {
    background: #f15a22;
    border-color: #f15a22;
    color: white;
}

.events-management :deep(.p-fileupload .p-button:hover) {
    background: #d14a1e;
    border-color: #d14a1e;
}

.events-management :deep(.p-fileupload-basic .p-button) {
    width: 100%;
    justify-content: center;
}

.events-management :deep(.p-fileupload-content) {
    padding: 1rem;
    border-top: 1px solid #e1e5e9;
}

.events-management :deep(.p-progressbar) {
    height: 0.5rem;
    background: #e1e5e9;
    border-radius: 4px;
}

.events-management :deep(.p-progressbar .p-progressbar-value) {
    background: #f15a22;
}
</style>