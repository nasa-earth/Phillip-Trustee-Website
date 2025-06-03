<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">
        {{ isNew ? "Create Post" : "Edit Post" }}
      </h2>
      <div class="space-x-4">
        <button @click="saveAsDraft" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
          Save as Draft
        </button>
        <button @click="publish" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          {{ post.published ? "Update" : "Publish" }}
        </button>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <form @submit.prevent="submit" class="space-y-6">
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700"> Title </label>
          <input type="text" v-model="post.title" required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>

        <!-- Slug -->
        <div>
          <label class="block text-sm font-medium text-gray-700"> Slug </label>
          <input type="text" v-model="post.slug" required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>

        <!-- Category -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select v-model="post.categoryId" required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Select a category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Content -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <!-- Add a rich text editor here -->
          <textarea v-model="post.content" rows="10"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
        </div>

        <!-- Featured Image -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Featured Image
          </label>
          <div class="mt-1 flex items-center">
            <img v-if="post.featuredImage" :src="post.featuredImage" class="h-32 w-32 object-cover rounded-lg" />
            <input type="file" accept="image/*" @change="handleImageUpload" class="ml-5" />
          </div>
        </div>

        <div class="flex justify-end space-x-4 pt-5">
          <NuxtLink to="/admin/posts"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </NuxtLink>
          <button type="submit"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
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

const post = ref({
  title: "",
  slug: "",
  content: "",
  categoryId: "",
  published: false,
  featuredImage: null,
});

const categories = ref([]);    // Load post data if editing
onMounted(async () => {
  try {
    const post = await $fetch(`/api/posts/${route.params.id}`);
    // Load categories
    categories.value = await $fetch("/api/categories");

    // Load post data if editing
    if (!isNew.value) {
      const postData = await $fetch(`/api/posts/${route.params.id}`);
      post.value = postData;
    }
  } catch (error) {
    console.error("Failed to load data:", error);
  }
});

// Auto-generate slug from title
watch(
  () => post.value.title,
  (newTitle) => {
    if (!post.value.slug || isNew.value) {
      post.value.slug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
  }
);

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    // Create FormData
    const formData = new FormData();
    formData.append("image", file);

    // Upload image
    const response = await $fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    post.value.featuredImage = response.url;
  } catch (error) {
    console.error("Failed to upload image:", error);
  }
};

const saveAsDraft = () => {
  post.value.published = false;
  submit();
};

const publish = () => {
  post.value.published = true;
  submit();
};

const submit = async () => {
  try {
    if (isNew.value) {
      await $fetch("/api/posts", {
        method: "POST",
        body: post.value,
      });
    } else {
      await $fetch(`/api/posts/${route.params.id}`, {
        method: "PATCH",
        body: post.value,
      });
    }

    await router.push("/admin/posts");
  } catch (error) {
    console.error("Failed to save post:", error);
  }
};
</script>
