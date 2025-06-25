<template>
  <div class="bg-white rounded-xl p-6 shadow-md">
    <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
      <h3 class="text-xl font-semibold text-slate-800 m-0">Events</h3>
      <div class="flex items-center gap-4">
        <span class="p-input-icon-left w-64">
          <i class="pi pi-search" />
          <InputText v-model="filters.search" placeholder="Search events..." />
        </span>
        <Button label="New Event" icon="pi pi-plus" severity="success" @click="createNewEvent" />
      </div>
    </div>

    <DataTable :value="events" :loading="loading" v-model:filters="filters" filterDisplay="menu" :paginator="true"
      :rows="10"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 20]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      responsiveLayout="scroll" sortField="startDate" :sortOrder="-1" removableSort class="events-table">
      <Column field="title" header="Title">
        <template #body="slotProps">
          <div class="flex flex-col">
            <div class="font-medium text-slate-800">{{ slotProps.data.title }}</div>
            <div class="text-xs text-slate-500">{{ slotProps.data.slug }}</div>
          </div>
        </template>
      </Column>

      <Column field="startDate" header="Date" sortable>
        <template #body="slotProps">
          <div class="flex flex-col">
            <div>{{ formatDate(slotProps.data.startDate) }}</div>
            <div class="text-sm text-slate-500">{{ formatTime(slotProps.data.startTime) }}</div>
          </div>
        </template>
      </Column>

      <Column field="location" header="Location">
        <template #body="slotProps">
          <div class="text-slate-800">{{ slotProps.data.location }}</div>
        </template>
      </Column>

      <Column field="published" header="Status">
        <template #body="slotProps">
          <Tag :value="getEventStatus(slotProps.data)" :severity="getEventStatusSeverity(slotProps.data)" />
        </template>
      </Column>

      <Column header="Actions">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button icon="pi pi-eye" outlined rounded title="View" @click="viewEvent(slotProps.data)" />
            <Button icon="pi pi-pencil" outlined rounded title="Edit" @click="editEvent(slotProps.data)" />
            <Button icon="pi pi-trash" outlined rounded severity="danger" title="Delete"
              @click="confirmDeleteEvent(slotProps.data)" />
          </div>
        </template>
      </Column>
    </DataTable>

    <!-- Event Preview Dialog -->
    <Dialog v-model:visible="previewDialog.visible" :style="{ width: '800px' }" :header="previewDialog.event?.title"
      :modal="true" class="event-preview-dialog">
      <div class="event-preview" v-if="previewDialog.event">
        <div class="grid grid-cols-2 gap-4 mb-6 bg-slate-50 rounded-lg p-4">
          <div>
            <span class="font-medium text-slate-500 mr-2">Date:</span>
            <span class="text-slate-800">{{ formatDate(previewDialog.event.startDate) }}</span>
          </div>
          <div>
            <span class="font-medium text-slate-500 mr-2">Time:</span>
            <span class="text-slate-800">{{ formatTime(previewDialog.event.startTime) }}</span>
          </div>
          <div>
            <span class="font-medium text-slate-500 mr-2">Location:</span>
            <span class="text-slate-800">{{ previewDialog.event.location }}</span>
          </div>
          <div>
            <span class="font-medium text-slate-500 mr-2">Status:</span>
            <Tag :value="getEventStatus(previewDialog.event)" :severity="getEventStatusSeverity(previewDialog.event)" />
          </div>
        </div>

        <div class="leading-relaxed text-slate-800" v-html="previewDialog.event.description"></div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useDataService } from '~/composables/useDataService';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { useRouter } from 'vue-router';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['loading']);

const dataService = useDataService();
const toast = useToast();
const confirm = useConfirm();
const router = useRouter();

// Events state
const events = ref([]);
const loading = computed(() => props.loading);

// Filters
const filters = ref({
  global: { value: null, matchMode: 'contains' },
  search: ''
});

// Preview dialog
const previewDialog = ref({
  visible: false,
  event: null
});

// Format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

// Format time
const formatTime = (timeString) => {
  if (!timeString) return '';
  return timeString;
};

// Get event status
const getEventStatus = (event) => {
  if (!event) return '';

  if (!event.published) return 'Draft';

  const now = new Date();
  const eventDate = new Date(event.startDate);

  if (eventDate < now) return 'Past';
  return 'Upcoming';
};

// Get event status severity
const getEventStatusSeverity = (event) => {
  if (!event) return 'info';

  if (!event.published) return 'warning';

  const now = new Date();
  const eventDate = new Date(event.startDate);

  if (eventDate < now) return 'info';
  return 'success';
};

// Fetch events
const fetchEvents = async () => {
  emit('loading', true);

  try {
    const result = await dataService.getEvents();
    events.value = result;
  } catch (error) {
    console.error('Error fetching events:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load events',
      life: 3000
    });
  } finally {
    emit('loading', false);
  }
};

// View event
const viewEvent = (event) => {
  previewDialog.value = {
    visible: true,
    event: event
  };
};

// Edit event
const editEvent = (event) => {
  // Navigate to event editor page with event ID
  router.push(`/admin/events/edit/${event.id}`);
};

// Create new event
const createNewEvent = () => {
  // Navigate to new event page
  router.push('/admin/events/new');
};

// Confirm delete event
const confirmDeleteEvent = (event) => {
  confirm.require({
    message: `Are you sure you want to delete "${event.title}"?`,
    header: 'Delete Confirmation',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: () => deleteEvent(event.id),
  });
};

// Delete event
const deleteEvent = async (id) => {
  emit('loading', true);

  try {
    await dataService.deleteEvent(id);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Event deleted successfully',
      life: 3000
    });
    fetchEvents();
  } catch (error) {
    console.error('Error deleting event:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to delete event',
      life: 3000
    });
  } finally {
    emit('loading', false);
  }
};

// Watch for search changes
watch(() => filters.value.search, (newValue) => {
  if (newValue.length > 2 || newValue.length === 0) {
    fetchEvents();
  }
});

// Initialize component
onMounted(() => {
  fetchEvents();
});
</script>
