<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">User Management</h2>
      <button
        @click="openCreateModal"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Add New User
      </button>
    </div>

    <!-- Search Bar -->
    <div class="mb-6">
      <div class="relative">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search users by name or email..."
          class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <div v-if="isLoading" class="absolute right-3 top-2">
          <div
            class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"
          ></div>
        </div>
      </div>
    </div>
    <!-- Error Alert -->
    <div
      v-if="error"
      class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded"
    >
      {{ error }}
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
      ></div>
    </div>

    <!-- Users list -->
    <div v-else class="bg-white shadow-md rounded-lg overflow-hidden">
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
              Email
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Role
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
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-red-100 text-red-800': user.role === 'ADMIN',
                  'bg-blue-100 text-blue-800': user.role === 'EDITOR',
                  'bg-green-100 text-green-800': user.role === 'USER',
                }"
              >
                {{ user.role }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ formatDate(user.createdAt) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                @click="editUser(user)"
                class="text-blue-600 hover:text-blue-900 mr-3"
              >
                Edit
              </button>
              <button
                @click="deleteUser(user.id)"
                class="text-red-600 hover:text-red-900"
                v-if="user.role !== 'ADMIN'"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{
              (currentPage - 1) * perPage + 1
            }}</span>
            to
            <span class="font-medium">{{
              Math.min(currentPage * perPage, totalUsers)
            }}</span>
            of <span class="font-medium">{{ totalUsers }}</span> users
          </div>
          <div class="flex space-x-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-3 py-1 rounded border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              @click="currentPage++"
              :disabled="currentPage >= lastPage"
              class="px-3 py-1 rounded border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ editingUser ? "Edit User" : "Add New User" }}
        </h3>

        <form @submit.prevent="saveUser">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Name</label
              >
              <input
                type="text"
                v-model="userForm.name"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Email</label
              >
              <input
                type="email"
                v-model="userForm.email"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Password
                {{ editingUser ? "(leave blank to keep current)" : "" }}
              </label>
              <input
                type="password"
                v-model="userForm.password"
                :required="!editingUser"
                :minlength="8"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Role</label
              >
              <select
                v-model="userForm.role"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="USER">User</option>
                <option value="EDITOR">Editor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModal"
              :disabled="isLoading"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isLoading"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              <span v-if="isLoading" class="mr-2">
                <div
                  class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"
                ></div>
              </span>
              {{ editingUser ? "Update" : "Create" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

definePageMeta({
  layout: "admin",
});

const router = useRouter();
const users = ref([]);
const showModal = ref(false);
const editingUser = ref(null);
const isLoading = ref(false);
const error = ref("");
const currentPage = ref(1);
const totalUsers = ref(0);
const lastPage = ref(1);
const perPage = ref(10);
const searchQuery = ref("");
const searchTimeout = (ref < NodeJS.Timeout) | (null > null);
const userForm = ref({
  name: "",
  email: "",
  password: "",
  role: "USER",
});

// Load users
onMounted(async () => {
  await loadUsers();
});

async function loadUsers() {
  isLoading.value = true;
  error.value = "";
  try {
    const response = await $fetch("/api/users", {
      params: {
        page: currentPage.value,
        limit: perPage.value,
        search: searchQuery.value,
      },
    });
    users.value = response.users;
    totalUsers.value = response.total;
    lastPage.value = response.lastPage;
  } catch (err) {
    console.error("Failed to load users:", err);
    error.value =
      err.data?.message || "Failed to load users. Please try again.";
  } finally {
    isLoading.value = false;
  }
}

function openCreateModal() {
  editingUser.value = null;
  userForm.value = {
    name: "",
    email: "",
    password: "",
    role: "USER",
  };
  showModal.value = true;
}

function editUser(user) {
  editingUser.value = user;
  userForm.value = {
    name: user.name,
    email: user.email,
    role: user.role,
  };
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  editingUser.value = null;
  userForm.value = {
    name: "",
    email: "",
    password: "",
    role: "USER",
  };
}

async function saveUser() {
  isLoading.value = true;
  error.value = "";
  try {
    if (editingUser.value) {
      await $fetch(`/api/users/${editingUser.value.id}`, {
        method: "PATCH",
        body: userForm.value,
      });
    } else {
      await $fetch("/api/users", {
        method: "POST",
        body: userForm.value,
      });
    }

    await loadUsers();
    closeModal();
  } catch (err) {
    console.error("Failed to save user:", err);
    error.value = err.data?.message || "Failed to save user. Please try again.";
  } finally {
    isLoading.value = false;
  }
}

async function deleteUser(id) {
  if (!confirm("Are you sure you want to delete this user?")) return;

  isLoading.value = true;
  error.value = "";
  try {
    await $fetch(`/api/users/${id}`, { method: "DELETE" });
    await loadUsers();
  } catch (err) {
    console.error("Failed to delete user:", err);
    error.value =
      err.data?.message || "Failed to delete user. Please try again.";
  } finally {
    isLoading.value = false;
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Watch for page changes
watch(currentPage, () => {
  loadUsers();
});

// Watch for search query changes
watch(searchQuery, () => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
  searchTimeout.value = setTimeout(() => {
    currentPage.value = 1; // Reset to first page when searching
    loadUsers();
  }, 300);
});
</script>
