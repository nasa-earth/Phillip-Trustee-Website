<template>
  <div class="posts-management-container">
    <div class="posts-header">
      <h3 class="section-title">Blog Posts</h3>
      <div class="header-actions">
        <span class="p-input-icon-left search-input">
          <i class="pi pi-search" />
          <InputText v-model="filters.search" placeholder="Search posts..." />
        </span>
        <Button label="New Post" icon="pi pi-plus" severity="success" @click="createNewPost" />
      </div>
    </div>

    <DataTable :value="posts" :loading="loading" v-model:filters="filters" filterDisplay="menu" :paginator="true"
      :rows="10"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 20]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      responsiveLayout="scroll" removableSort class="posts-table">
      <Column field="title" header="Title">
        <template #body="slotProps">
          <div class="post-title-cell">
            <div class="post-title">{{ slotProps.data.title }}</div>
            <div class="post-slug">{{ slotProps.data.slug }}</div>
          </div>
        </template>
      </Column>

      <Column field="author" header="Author">
        <template #body="slotProps">
          <div class="post-author">{{ slotProps.data.author?.name }}</div>
        </template>
      </Column>

      <Column field="category" header="Category">
        <template #body="slotProps">
          <Tag :value="slotProps.data.category?.name" severity="info" />
        </template>
      </Column>

      <Column field="published" header="Status">
        <template #body="slotProps">
          <Tag :value="slotProps.data.published ? 'Published' : 'Draft'"
            :severity="slotProps.data.published ? 'success' : 'warning'" />
        </template>
      </Column>

      <Column field="createdAt" header="Date">
        <template #body="slotProps">
          <div class="post-date">{{ formatDate(slotProps.data.createdAt) }}</div>
        </template>
      </Column>

      <Column header="Actions">
        <template #body="slotProps">
          <div class="action-buttons">
            <Button icon="pi pi-eye" outlined rounded title="View" @click="viewPost(slotProps.data)" />
            <Button icon="pi pi-pencil" outlined rounded title="Edit" @click="editPost(slotProps.data)" />
            <Button icon="pi pi-trash" outlined rounded severity="danger" title="Delete"
              @click="confirmDeletePost(slotProps.data)" />
          </div>
        </template>
      </Column>
    </DataTable>

    <!-- Category Filter -->
    <Menu ref="categoryMenu" :model="categoryMenuItems" :popup="true" />

    <!-- Post Preview Dialog -->
    <Dialog v-model:visible="previewDialog.visible" :style="{ width: '800px' }" :header="previewDialog.post?.title"
      :modal="true" class="post-preview-dialog">
      <div class="post-preview" v-if="previewDialog.post">
        <div class="post-meta">
          <div>
            <span class="meta-label">Author:</span>
            <span class="meta-value">{{ previewDialog.post.author?.name }}</span>
          </div>
          <div>
            <span class="meta-label">Category:</span>
            <span class="meta-value">{{ previewDialog.post.category?.name }}</span>
          </div>
          <div>
            <span class="meta-label">Published:</span>
            <Tag :value="previewDialog.post.published ? 'Yes' : 'No'"
              :severity="previewDialog.post.published ? 'success' : 'warning'" />
          </div>
          <div>
            <span class="meta-label">Date:</span>
            <span class="meta-value">{{ formatDate(previewDialog.post.createdAt) }}</span>
          </div>
        </div>

        <div class="post-content" v-html="previewDialog.post.content"></div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useDataService } from '~/composables/useDataService';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { useRouter } from 'vue-router';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['loading']);

const dataService = useDataService();
const toast = useToast();
const confirm = useConfirm();
const router = useRouter();

// Posts state
const posts = ref([]);
const categories = ref([]);
const loading = computed(() => props.loading);

// Filters
const filters = ref({
  global: { value: null, matchMode: 'contains' },
  search: '',
  category: null
});

// Preview dialog
const previewDialog = ref({
  visible: false,
  post: null
});

// Category menu
const categoryMenu = ref(null);
const categoryMenuItems = ref([]);

// Format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

// Fetch posts
const fetchPosts = async () => {
  emit('loading', true);

  try {
    const result = await dataService.getPosts(filters.value.category);
    posts.value = result;
  } catch (error) {
    console.error('Error fetching posts:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load posts',
      life: 3000
    });
  } finally {
    emit('loading', false);
  }
};

// Fetch categories
const fetchCategories = async () => {
  try {
    const result = await dataService.getCategories();
    categories.value = result;

    // Set up category menu items
    const items = [
      {
        label: 'All Categories',
        command: () => {
          filters.value.category = null;
          fetchPosts();
        }
      },
      { separator: true }
    ];

    categories.value.forEach(category => {
      items.push({
        label: category.name,
        command: () => {
          filters.value.category = category.id;
          fetchPosts();
        }
      });
    });

    categoryMenuItems.value = items;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// Toggle category menu
const toggleCategoryMenu = (event) => {
  categoryMenu.value.toggle(event);
};

// View post
const viewPost = (post) => {
  previewDialog.value = {
    visible: true,
    post: post
  };
};

// Edit post
const editPost = (post) => {
  // Navigate to post editor page with post ID
  router.push(`/admin/posts/edit/${post.id}`);
};

// Create new post
const createNewPost = () => {
  // Navigate to new post page
  router.push('/admin/posts/new');
};

// Confirm delete post
const confirmDeletePost = (post) => {
  confirm.require({
    message: `Are you sure you want to delete "${post.title}"?`,
    header: 'Delete Confirmation',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: () => deletePost(post.id),
  });
};

// Delete post
const deletePost = async (id) => {
  emit('loading', true);

  try {
    await dataService.deletePost(id);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Post deleted successfully',
      life: 3000
    });
    fetchPosts();
  } catch (error) {
    console.error('Error deleting post:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to delete post',
      life: 3000
    });
  } finally {
    emit('loading', false);
  }
};

// Watch for search changes
watch(() => filters.value.search, (newValue) => {
  if (newValue.length > 2 || newValue.length === 0) {
    fetchPosts();
  }
});

// Initialize component
onMounted(() => {
  fetchCategories();
  fetchPosts();
});
</script>

<style scoped>
.posts-management-container {
  background-color: #fff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.posts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-input {
  width: 250px;
}

.post-title-cell {
  display: flex;
  flex-direction: column;
}

.post-title {
  font-weight: 500;
  color: #1E293B;
}

.post-slug {
  font-size: 0.75rem;
  color: #64748B;
}

.post-author,
.post-date {
  color: #1E293B;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.post-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
  background-color: #F8FAFC;
  border-radius: 0.5rem;
  padding: 1rem;
}

.meta-label {
  font-weight: 500;
  color: #64748B;
  margin-right: 0.5rem;
}

.meta-value {
  color: #1E293B;
}

.post-content {
  line-height: 1.6;
  color: #1E293B;
}
</style>
