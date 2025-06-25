<template>
  <div class="bg-white rounded-xl p-6 shadow-md">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold text-slate-800 m-0">Recent Activity</h3>
      <Button icon="pi pi-refresh" @click="$emit('refresh')" outlined size="small" aria-label="Refresh" />
    </div>

    <DataTable :value="mockActivities" :loading="false" class="w-full" :rows="5" :paginator="true" stripedRows
      responsiveLayout="scroll">
      <Column field="user" header="User">
        <template #body="slotProps">
          <div class="flex items-center gap-3">
            <Avatar :label="getUserInitials(slotProps.data.user)" size="large" shape="circle"
              class="bg-gradient-to-r from-indigo-600 to-violet-500 text-white" />
            <span class="font-medium">{{ slotProps.data.user }}</span>
          </div>
        </template>
      </Column>

      <Column field="action" header="Action">
        <template #body="slotProps">
          <Tag :value="slotProps.data.action" :severity="getActionSeverity(slotProps.data.action)" />
        </template>
      </Column>

      <Column field="section" header="Section" />

      <Column field="date" header="Date">
        <template #body="slotProps">
          <div class="flex flex-col">
            <span>{{ formatDate(slotProps.data.date) }}</span>
            <small class="text-slate-500">{{ formatTime(slotProps.data.date) }}</small>
          </div>
        </template>
      </Column>
    </DataTable>

    <div v-if="mockActivities.length === 0" class="flex flex-col items-center justify-center py-12 text-slate-400">
      <i class="pi pi-inbox text-5xl mb-4"></i>
      <p class="text-lg">No recent activity found</p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

// Create mock data for development and design
const mockActivities = ref([
  {
    id: 1,
    user: 'John Doe',
    action: 'create',
    section: 'Posts',
    date: new Date(Date.now() - 1000 * 60 * 25).toISOString() // 25 minutes ago
  },
  {
    id: 2,
    user: 'Sarah Smith',
    action: 'update',
    section: 'Events',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
  },
  {
    id: 3,
    user: 'Admin User',
    action: 'publish',
    section: 'News',
    date: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() // 3 hours ago
  },
  {
    id: 4,
    user: 'Mike Johnson',
    action: 'delete',
    section: 'Comments',
    date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() // 5 hours ago
  },
  {
    id: 5,
    user: 'Jane Wilson',
    action: 'login',
    section: 'Authentication',
    date: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() // 8 hours ago
  },
  {
    id: 6,
    user: 'Robert Brown',
    action: 'unpublish',
    section: 'Pages',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
  }
]);

const emit = defineEmits(['refresh']);

// Get user initials for avatar
const getUserInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffInHours < 24) {
    return 'Today';
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString();
  }
};

// Format time
const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
};

// Get severity for action tag
const getActionSeverity = (action) => {
  const actionMap = {
    create: 'success',
    update: 'info',
    delete: 'danger',
    login: 'warning',
    logout: 'warning',
    publish: 'success',
    unpublish: 'warning'
  };

  return actionMap[action?.toLowerCase()] || 'info';
};
</script>

<style>
/* All styles converted to Tailwind CSS classes */
</style>
