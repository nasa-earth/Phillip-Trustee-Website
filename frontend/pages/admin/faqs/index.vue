<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">FAQs</h2>
      <button
        @click="openCreateModal"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Add New FAQ
      </button>
    </div>

    <!-- FAQs list with drag and drop reordering -->
    <div class="space-y-4">
      <draggable
        v-model="faqs"
        handle=".drag-handle"
        item-key="id"
        @end="handleReorder"
        class="space-y-4"
      >
        <template #item="{ element: faq }">
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="p-6">
              <div class="flex items-start">
                <div
                  class="drag-handle cursor-move mr-4 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-medium text-gray-900">
                    {{ faq.question }}
                  </h3>
                  <p class="mt-2 text-sm text-gray-500">{{ faq.answer }}</p>
                </div>
                <div class="ml-4 flex-shrink-0 space-x-3">
                  <button
                    @click="editFaq(faq)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteFaq(faq.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </draggable>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ editingFaq ? "Edit FAQ" : "Add New FAQ" }}
        </h3>

        <form @submit.prevent="saveFaq">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Question
              </label>
              <input
                type="text"
                v-model="faqForm.question"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">
                Answer
              </label>
              <textarea
                v-model="faqForm.answer"
                required
                rows="4"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              ></textarea>
            </div>
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
              {{ editingFaq ? "Update" : "Create" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import draggable from "vuedraggable";

definePageMeta({
  layout: "admin",
});

const faqs = ref([]);
const showModal = ref(false);
const editingFaq = ref(null);
const faqForm = ref({
  question: "",
  answer: "",
});

// Load FAQs
onMounted(async () => {
  await loadFaqs();
});

async function loadFaqs() {
  try {
    const response = await $fetch("/api/faqs");
    faqs.value = response.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("Failed to load FAQs:", error);
  }
}

function openCreateModal() {
  editingFaq.value = null;
  faqForm.value = { question: "", answer: "" };
  showModal.value = true;
}

function editFaq(faq) {
  editingFaq.value = faq;
  faqForm.value = {
    question: faq.question,
    answer: faq.answer,
  };
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  editingFaq.value = null;
  faqForm.value = { question: "", answer: "" };
}

async function saveFaq() {
  try {
    if (editingFaq.value) {
      await $fetch(`/api/faqs/${editingFaq.value.id}`, {
        method: "PATCH",
        body: faqForm.value,
      });
    } else {
      await $fetch("/api/faqs", {
        method: "POST",
        body: {
          ...faqForm.value,
          order: faqs.value.length,
        },
      });
    }

    await loadFaqs();
    closeModal();
  } catch (error) {
    console.error("Failed to save FAQ:", error);
  }
}

async function deleteFaq(id) {
  if (!confirm("Are you sure you want to delete this FAQ?")) return;

  try {
    await $fetch(`/api/faqs/${id}`, { method: "DELETE" });
    await loadFaqs();
  } catch (error) {
    console.error("Failed to delete FAQ:", error);
  }
}

async function handleReorder() {
  try {
    const updates = faqs.value.map((faq, index) => ({
      id: faq.id,
      order: index,
    }));

    await $fetch("/api/faqs/reorder", {
      method: "POST",
      body: { items: updates },
    });
  } catch (error) {
    console.error("Failed to update FAQ order:", error);
    await loadFaqs(); // Reload original order on error
  }
}
</script>
