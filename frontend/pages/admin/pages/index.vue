<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Pages</h2>
      <NuxtLink
        to="/admin/pages/new"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Create New Page
      </NuxtLink>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Status</label>
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
            placeholder="Search pages..."
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Pages table -->
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
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="page in pages" :key="page.id">
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">
                  {{ page.title }}
                </div>
                <div class="text-sm text-gray-500">{{ page.slug }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="
                    page.published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  "
                >
                  {{ page.published ? "Published" : "Draft" }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(page.createdAt) }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3"
              >
                <NuxtLink
                  :to="`/admin/pages/${page.id}`"
                  class="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </NuxtLink>
                <a
                  :href="`/${page.slug}`"
                  target="_blank"
                  class="text-green-600 hover:text-green-900"
                >
                  View
                </a>
                <button
                  @click="deletePage(page.id)"
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
  published: "",
  search: "",
});

const pages = ref([]);

// Load pages
onMounted(async () => {
  try {
    const response = await $fetch("/api/admin/pages");
    pages.value = response;
  } catch (error) {
    console.error("Failed to load pages:", error);
  }
});

// Watch for filter changes
watch(
  filters,
  async (newFilters) => {
    try {
      // Construct query parameters
      const params = new URLSearchParams();
      if (newFilters.published !== "")
        params.append("published", newFilters.published);
      if (newFilters.search) params.append("search", newFilters.search);

      // Fetch filtered pages
      const filtered = await $fetch(`/api/admin/pages?${params.toString()}`);
      pages.value = filtered;
    } catch (error) {
      console.error("Failed to filter pages:", error);
    }
  },
  { deep: true }
);

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const deletePage = async (id) => {
  if (!confirm("Are you sure you want to delete this page?")) return;

  try {
    await $fetch(`/api/pages/${id}`, { method: "DELETE" });
    pages.value = pages.value.filter((page) => page.id !== id);
  } catch (error) {
    console.error("Failed to delete page:", error);
  }
};
</script>
