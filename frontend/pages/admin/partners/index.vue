<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Partners</h2>
      <NuxtLink
        to="/admin/partners/new"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Add New Partner
      </NuxtLink>
    </div>

    <!-- Partners grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="partner in partners"
        :key="partner.id"
        class="bg-white rounded-lg shadow overflow-hidden"
      >
        <div class="p-6">
          <div class="aspect-w-16 aspect-h-9 mb-4">
            <img
              :src="partner.logo"
              :alt="partner.name"
              class="object-contain w-full h-full"
            />
          </div>
          <h3 class="text-lg font-medium text-gray-900">{{ partner.name }}</h3>
          <p class="mt-2 text-sm text-gray-500">{{ partner.description }}</p>
          <div class="mt-4 text-sm">
            <a
              :href="partner.website"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:text-blue-800"
            >
              Visit Website →
            </a>
          </div>
          <div class="mt-4 flex space-x-3">
            <NuxtLink
              :to="`/admin/partners/${partner.id}`"
              class="text-blue-600 hover:text-blue-900"
            >
              Edit
            </NuxtLink>
            <button
              @click="deletePartner(partner.id)"
              class="text-red-600 hover:text-red-900"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const partners = ref([]);

// Load partners
onMounted(async () => {
  try {
    const response = await $fetch("/api/partners");
    partners.value = response;
  } catch (error) {
    console.error("Failed to load partners:", error);
  }
});

const deletePartner = async (id) => {
  if (!confirm("Are you sure you want to delete this partner?")) return;

  try {
    await $fetch(`/api/partners/${id}`, { method: "DELETE" });
    partners.value = partners.value.filter((partner) => partner.id !== id);
  } catch (error) {
    console.error("Failed to delete partner:", error);
  }
};
</script>
