<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">
        {{ isNew ? "Create Page" : "Edit Page" }}
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
          {{ page.published ? "Update" : "Publish" }}
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
            v-model="page.title"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <!-- Slug -->
        <div>
          <label class="block text-sm font-medium text-gray-700"> Slug </label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <span
              class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
            >
              /
            </span>
            <input
              type="text"
              v-model="page.slug"
              required
              class="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Content -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <!-- Add a rich text editor here -->
          <textarea
            v-model="page.content"
            rows="15"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>

        <div class="flex justify-end space-x-4 pt-5">
          <NuxtLink
            to="/admin/pages"
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

const page = ref({
  title: "",
  slug: "",
  content: "",
  published: false,
});

// Load page data if editing
onMounted(async () => {
  if (!isNew.value) {
    try {
      const pageData = await $fetch(`/api/pages/${route.params.id}`);
      page.value = pageData;
    } catch (error) {
      console.error("Failed to load page:", error);
    }
  }
});

// Auto-generate slug from title
watch(
  () => page.value.title,
  (newTitle) => {
    if (!page.value.slug || isNew.value) {
      page.value.slug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
  }
);

const saveAsDraft = () => {
  page.value.published = false;
  submit();
};

const publish = () => {
  page.value.published = true;
  submit();
};

const submit = async () => {
  try {
    if (isNew.value) {
      await $fetch("/api/pages", {
        method: "POST",
        body: page.value,
      });
    } else {
      await $fetch(`/api/pages/${route.params.id}`, {
        method: "PATCH",
        body: page.value,
      });
    }

    await router.push("/admin/pages");
  } catch (error) {
    console.error("Failed to save page:", error);
  }
};
</script>
