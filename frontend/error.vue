<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {{ error?.statusCode === 403 ? "Access Denied" : "Error" }}
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        {{ error?.message || "An error occurred" }}
      </p>
      <div class="mt-6 flex justify-center">
        <button
          @click="handleError"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          {{ error?.statusCode === 403 ? "Go Back" : "Return to Home" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { error } = defineProps({
  error: {
    type: Object as () => Error & { statusCode?: number },
    required: true,
  },
});

const handleError = () => {
  if (error?.statusCode === 403) {
    history.back();
  } else {
    navigateTo("/");
  }
};
</script>
