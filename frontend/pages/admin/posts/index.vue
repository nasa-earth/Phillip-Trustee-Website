<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Posts</h2>
      <NuxtLink to="/admin/posts/new" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Create New Post
      </NuxtLink>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Category</label>
          <select v-model="filters.categoryId"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Status</label>
          <select v-model="filters.published"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">All</option>
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Search</label>
          <input type="text" v-model="filters.search" placeholder="Search posts..."
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
      </div>
    </div>

    <!-- Posts table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="post in posts" :key="post.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ post.title }}
                </div>
                <div class="text-sm text-gray-500">{{ post.slug }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-gray-900">{{
                  post.category?.name
                }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="post.published
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                  ">
                  {{ post.published ? "Published" : "Draft" }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(post.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <NuxtLink :to="`/admin/posts/${post.id}`" class="text-blue-600 hover:text-blue-900 mr-3">
                  Edit
                </NuxtLink>
                <button @click="deletePost(post.id)" class="text-red-600 hover:text-red-900">
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
  categoryId: "",
  published: "",
  search: "",
});

const posts = ref([]);
const categories = ref([]);

// Load posts and categories
onMounted(async () => {
  try {    // Fetch posts
    const [postsData, categoriesData] = await Promise.all([
      $fetch("/api/posts/admin"),
      $fetch("/api/categories/admin"),
    ]);

    posts.value = postsData;
    categories.value = categoriesData;
  } catch (error) {
    console.error("Failed to load data:", error);
  }
});

// Watch for filter changes
watch(
  filters,
  async (newFilters) => {
    try {
      // Construct query parameters
      const params = new URLSearchParams();
      if (newFilters.categoryId)
        params.append("categoryId", newFilters.categoryId);
      if (newFilters.published !== "")
        params.append("published", newFilters.published);
      if (newFilters.search) params.append("search", newFilters.search);

      // Fetch filtered posts
      const filtered = await $fetch(`/api/posts/admin?${params.toString()}`);
      posts.value = filtered;
    } catch (error) {
      console.error("Failed to filter posts:", error);
    }
  },
  { deep: true }
);

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const deletePost = async (id) => {
  if (!confirm("Are you sure you want to delete this post?")) return;

  try {
    await $fetch(`/api/posts/${id}`, { method: "DELETE" });
    posts.value = posts.value.filter((post) => post.id !== id);
  } catch (error) {
    console.error("Failed to delete post:", error);
  }
};
</script>
