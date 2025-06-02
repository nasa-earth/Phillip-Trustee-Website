<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Categories</h2>
      <button
        @click="openCreateModal"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Create New Category
      </button>
    </div>

    <!-- Categories table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Posts Count
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created At
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="category in categories" :key="category.id">
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">
                  {{ category.name }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ category._count?.posts || 0 }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(category.createdAt) }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3"
              >
                <button
                  @click="editCategory(category)"
                  class="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </button>
                <button
                  v-if="category._count?.posts === 0"
                  @click="deleteCategory(category.id)"
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

    <!-- Create/Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ editingCategory ? "Edit Category" : "Create New Category" }}
        </h3>

        <form @submit.prevent="saveCategory">
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              v-model="categoryForm.name"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {{ editingCategory ? "Update" : "Create" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const categories = ref([]);
const showModal = ref(false);
const editingCategory = ref(null);
const categoryForm = ref({
  name: "",
});

// Load categories
onMounted(async () => {
  await loadCategories();
});

async function loadCategories() {
  try {
    const response = await $fetch("/api/admin/categories");
    categories.value = response;
  } catch (error) {
    console.error("Failed to load categories:", error);
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

function openCreateModal() {
  editingCategory.value = null;
  categoryForm.value = { name: "" };
  showModal.value = true;
}

function editCategory(category) {
  editingCategory.value = category;
  categoryForm.value = { name: category.name };
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  editingCategory.value = null;
  categoryForm.value = { name: "" };
}

async function saveCategory() {
  try {
    if (editingCategory.value) {
      await $fetch(`/api/categories/${editingCategory.value.id}`, {
        method: "PATCH",
        body: categoryForm.value,
      });
    } else {
      await $fetch("/api/categories", {
        method: "POST",
        body: categoryForm.value,
      });
    }

    await loadCategories();
    closeModal();
  } catch (error) {
    console.error("Failed to save category:", error);
  }
}

async function deleteCategory(id) {
  if (!confirm("Are you sure you want to delete this category?")) return;

  try {
    await $fetch(`/api/categories/${id}`, { method: "DELETE" });
    await loadCategories();
  } catch (error) {
    console.error("Failed to delete category:", error);
  }
}
</script>
