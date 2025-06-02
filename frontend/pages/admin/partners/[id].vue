<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">
        {{ isNew ? "Add Partner" : "Edit Partner" }}
      </h2>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <form @submit.prevent="submit" class="space-y-6">
        <!-- Logo -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Logo</label>
          <div class="mt-1 flex items-center">
            <div
              v-if="partner.logo"
              class="relative w-32 h-32 border rounded-lg overflow-hidden"
            >
              <img
                :src="partner.logo"
                :alt="partner.name"
                class="w-full h-full object-contain"
              />
              <button
                type="button"
                @click="removeLogo"
                class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <input
              v-else
              type="file"
              accept="image/*"
              @change="handleLogoUpload"
              class="ml-5"
            />
          </div>
        </div>

        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700"> Name </label>
          <input
            type="text"
            v-model="partner.name"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <!-- Website -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Website URL
          </label>
          <input
            type="url"
            v-model="partner.website"
            required
            placeholder="https://"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            v-model="partner.description"
            rows="4"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>

        <div class="flex justify-end space-x-4 pt-5">
          <NuxtLink
            to="/admin/partners"
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

const partner = ref({
  name: "",
  website: "",
  logo: "",
  description: "",
});

// Load partner data if editing
onMounted(async () => {
  if (!isNew.value) {
    try {
      const response = await $fetch(`/api/partners/${route.params.id}`);
      partner.value = response;
    } catch (error) {
      console.error("Failed to load partner:", error);
    }
  }
});

const handleLogoUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await $fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    partner.value.logo = response.url;
  } catch (error) {
    console.error("Failed to upload logo:", error);
  }
};

const removeLogo = () => {
  partner.value.logo = "";
};

const submit = async () => {
  try {
    if (isNew.value) {
      await $fetch("/api/partners", {
        method: "POST",
        body: partner.value,
      });
    } else {
      await $fetch(`/api/partners/${route.params.id}`, {
        method: "PATCH",
        body: partner.value,
      });
    }

    await router.push("/admin/partners");
  } catch (error) {
    console.error("Failed to save partner:", error);
  }
};
</script>
