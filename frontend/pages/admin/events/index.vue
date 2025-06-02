<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Events</h2>
      <NuxtLink
        to="/admin/events/new"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Create New Event
      </NuxtLink>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Status</label>
          <select
            v-model="filters.status"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Published</label
          >
          <select
            v-model="filters.published"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Search</label>
          <input
            type="text"
            v-model="filters.search"
            placeholder="Search events..."
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Events table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date & Time
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Location
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="event in events" :key="event.id">
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">
                  {{ event.title }}
                </div>
                <div v-if="!event.published" class="text-xs text-yellow-600">
                  (Draft)
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatDate(event.startDate) }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ formatTime(event.startDate) }} -
                  {{ formatTime(event.endDate) }}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ event.location }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="getStatusClass(event)"
                >
                  {{ getStatusText(event) }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3"
              >
                <NuxtLink
                  :to="`/admin/events/${event.id}`"
                  class="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </NuxtLink>
                <button
                  @click="deleteEvent(event.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const filters = ref({
  status: "",
  published: "",
  search: "",
});

const events = ref([]);

// Load events
onMounted(async () => {
  await loadEvents();
});

// Watch for filter changes
watch(
  filters,
  async () => {
    await loadEvents();
  },
  { deep: true }
);

async function loadEvents() {
  try {
    // Construct query parameters
    const params = new URLSearchParams();
    if (filters.value.status) params.append("status", filters.value.status);
    if (filters.value.published !== "")
      params.append("published", filters.value.published);
    if (filters.value.search) params.append("search", filters.value.search);

    const response = await $fetch(`/api/admin/events?${params.toString()}`);
    events.value = response;
  } catch (error) {
    console.error("Failed to load events:", error);
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusClass = (event) => {
  const now = new Date();
  const startDate = new Date(event.startDate);

  if (!event.published) return "bg-yellow-100 text-yellow-800";
  if (startDate > now) return "bg-green-100 text-green-800";
  return "bg-gray-100 text-gray-800";
};

const getStatusText = (event) => {
  const now = new Date();
  const startDate = new Date(event.startDate);

  if (!event.published) return "Draft";
  if (startDate > now) return "Upcoming";
  return "Past";
};

const deleteEvent = async (id) => {
  if (!confirm("Are you sure you want to delete this event?")) return;

  try {
    await $fetch(`/api/events/${id}`, { method: "DELETE" });
    await loadEvents();
  } catch (error) {
    console.error("Failed to delete event:", error);
  }
};
</script>
