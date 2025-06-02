<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">
        {{ isNew ? "Create Event" : "Edit Event" }}
      </h2>
      <div class="space-x-4">
        <button
          @click="saveAsDraft"
          class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Save as Draft
        </button>
        <button
          @click="publish"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {{ event.published ? "Update" : "Publish" }}
        </button>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <form @submit.prevent="submit" class="space-y-6">
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700"> Title </label>
          <input
            type="text"
            v-model="event.title"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <!-- Date and Time -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              v-model="event.startDate"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">
              End Date & Time
            </label>
            <input
              type="datetime-local"
              v-model="event.endDate"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Location -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            v-model="event.location"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            v-model="event.description"
            rows="6"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>

        <!-- Registration URL -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Registration URL (Optional)
          </label>
          <input
            type="url"
            v-model="event.registrationUrl"
            placeholder="https://"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div class="flex justify-end space-x-4 pt-5">
          <NuxtLink
            to="/admin/events"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </NuxtLink>
          <button
            type="submit"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {{ isNew ? "Create" : "Update" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();
const isNew = computed(() => route.params.id === "new");

const event = ref({
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  location: "",
  registrationUrl: "",
  published: false,
});

// Load event data if editing
onMounted(async () => {
  if (!isNew.value) {
    try {
      const response = await $fetch(`/api/events/${route.params.id}`);
      // Format dates for datetime-local input
      response.startDate = formatDateForInput(response.startDate);
      response.endDate = formatDateForInput(response.endDate);
      event.value = response;
    } catch (error) {
      console.error("Failed to load event:", error);
    }
  }
});

const formatDateForInput = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16);
};

const saveAsDraft = () => {
  event.value.published = false;
  submit();
};

const publish = () => {
  event.value.published = true;
  submit();
};

const submit = async () => {
  try {
    const payload = {
      ...event.value,
      startDate: new Date(event.value.startDate).toISOString(),
      endDate: new Date(event.value.endDate).toISOString(),
    };

    if (isNew.value) {
      await $fetch("/api/events", {
        method: "POST",
        body: payload,
      });
    } else {
      await $fetch(`/api/events/${route.params.id}`, {
        method: "PATCH",
        body: payload,
      });
    }

    await router.push("/admin/events");
  } catch (error) {
    console.error("Failed to save event:", error);
  }
};
</script>
