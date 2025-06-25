<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
    <div v-for="(stat, key) in formattedStats" :key="key"
      class="bg-white rounded-xl p-6 flex items-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-l-4"
      :class="getCardColor(key)">
      <div class="w-12 h-12 rounded-full flex items-center justify-center mr-4" :class="getIconBackground(key)">
        <i :class="stat.icon" class="text-white text-xl"></i>
      </div>
      <div class="flex-1">
        <h3 class="text-2xl font-bold text-slate-800 m-0">{{ stat.value }}</h3>
        <p class="text-sm text-slate-500 m-0">{{ stat.label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  stats: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  }
});

// Card border color based on type
const getCardColor = (key) => {
  const colors = {
    users: 'border-indigo-600',
    posts: 'border-sky-500',
    publishedPosts: 'border-emerald-500',
    events: 'border-amber-500',
    publishedEvents: 'border-orange-500',
    partners: 'border-violet-500',
    pages: 'border-pink-500',
    faqs: 'border-cyan-500',
    categories: 'border-fuchsia-500'
  };
  return colors[key] || 'border-gray-500';
};

// Icon background color based on type
const getIconBackground = (key) => {
  const backgrounds = {
    users: 'bg-gradient-to-r from-indigo-600 to-violet-500',
    posts: 'bg-gradient-to-r from-sky-500 to-blue-400',
    publishedPosts: 'bg-gradient-to-r from-emerald-500 to-green-400',
    events: 'bg-gradient-to-r from-amber-500 to-yellow-400',
    publishedEvents: 'bg-gradient-to-r from-orange-500 to-orange-300',
    partners: 'bg-gradient-to-r from-violet-500 to-purple-400',
    pages: 'bg-gradient-to-r from-pink-500 to-pink-400',
    faqs: 'bg-gradient-to-r from-cyan-500 to-cyan-400',
    categories: 'bg-gradient-to-r from-fuchsia-500 to-pink-400'
  };
  return backgrounds[key] || 'bg-gradient-to-r from-gray-500 to-gray-400';
};

// Format stats for display
const formattedStats = computed(() => {
  const stats = props.stats;
  if (!stats) return {};

  return {
    users: {
      value: stats.users || 0,
      label: 'Users',
      icon: 'pi pi-users'
    },
    posts: {
      value: stats.posts || 0,
      label: 'Posts',
      icon: 'pi pi-file-edit'
    },
    publishedPosts: {
      value: stats.publishedPosts || 0,
      label: 'Published Posts',
      icon: 'pi pi-check-circle'
    },
    events: {
      value: stats.events || 0,
      label: 'Events',
      icon: 'pi pi-calendar'
    },
    publishedEvents: {
      value: stats.publishedEvents || 0,
      label: 'Published Events',
      icon: 'pi pi-calendar-plus'
    },
    partners: {
      value: stats.partners || 0,
      label: 'Partners',
      icon: 'pi pi-building'
    },
    pages: {
      value: stats.pages || 0,
      label: 'Pages',
      icon: 'pi pi-file'
    },
    faqs: {
      value: stats.faqs || 0,
      label: 'FAQs',
      icon: 'pi pi-question-circle'
    },
    categories: {
      value: stats.categories || 0,
      label: 'Categories',
      icon: 'pi pi-tags'
    },
  };
});
</script>
