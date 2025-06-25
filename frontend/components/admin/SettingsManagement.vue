<template>
  <div class="settings-management-container">
    <div class="settings-header">
      <h3 class="section-title">Website Settings</h3>
      <Button 
        icon="pi pi-save" 
        label="Save Changes" 
        :disabled="!hasChanges"
        @click="saveSettings" 
      />
    </div>
    
    <div class="settings-body" v-if="settings">
      <TabView>
        <!-- General Settings -->
        <TabPanel header="General">
          <div class="p-fluid">
            <div class="field">
              <label for="siteName">Website Name</label>
              <InputText id="siteName" v-model="settings.siteName" />
            </div>
            
            <div class="field">
              <label for="tagline">Tagline</label>
              <InputText id="tagline" v-model="settings.tagline" />
            </div>
            
            <div class="field">
              <label for="description">Description</label>
              <Textarea id="description" v-model="settings.description" rows="3" />
            </div>
            
            <div class="field">
              <label for="address">Office Address</label>
              <Textarea id="address" v-model="settings.address" rows="2" />
            </div>
            
            <div class="field">
              <label for="email">Contact Email</label>
              <InputText id="email" v-model="settings.email" type="email" />
            </div>
            
            <div class="field">
              <label for="phone">Contact Phone</label>
              <InputText id="phone" v-model="settings.phone" />
            </div>
          </div>
        </TabPanel>
        
        <!-- Social Media Settings -->
        <TabPanel header="Social Media">
          <div class="p-fluid">
            <div class="field">
              <label for="facebook">Facebook URL</label>
              <InputText id="facebook" v-model="settings.facebook" />
            </div>
            
            <div class="field">
              <label for="twitter">Twitter URL</label>
              <InputText id="twitter" v-model="settings.twitter" />
            </div>
            
            <div class="field">
              <label for="instagram">Instagram URL</label>
              <InputText id="instagram" v-model="settings.instagram" />
            </div>
            
            <div class="field">
              <label for="linkedin">LinkedIn URL</label>
              <InputText id="linkedin" v-model="settings.linkedin" />
            </div>
            
            <div class="field">
              <label for="youtube">YouTube URL</label>
              <InputText id="youtube" v-model="settings.youtube" />
            </div>
          </div>
        </TabPanel>
        
        <!-- Footer Settings -->
        <TabPanel header="Footer">
          <div class="p-fluid">
            <div class="field">
              <label for="footerText">Footer Text</label>
              <Editor id="footerText" v-model="settings.footerText" editorStyle="height: 200px" />
            </div>
            
            <div class="field">
              <label for="copyrightText">Copyright Text</label>
              <InputText id="copyrightText" v-model="settings.copyrightText" />
            </div>
          </div>
        </TabPanel>
        
        <!-- Advanced Settings -->
        <TabPanel header="Advanced">
          <div class="p-fluid">
            <div class="field">
              <label for="googleAnalyticsId">Google Analytics ID</label>
              <InputText id="googleAnalyticsId" v-model="settings.googleAnalyticsId" />
            </div>
            
            <div class="field">
              <label for="headerScripts">Header Scripts</label>
              <Textarea id="headerScripts" v-model="settings.headerScripts" rows="4" />
              <small>JavaScript code that will be included in the head section</small>
            </div>
            
            <div class="field">
              <label for="footerScripts">Footer Scripts</label>
              <Textarea id="footerScripts" v-model="settings.footerScripts" rows="4" />
              <small>JavaScript code that will be included before the closing body tag</small>
            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>
    
    <div class="settings-loading" v-if="loading">
      <ProgressSpinner />
      <p>Loading settings...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useDataService } from '~/composables/useDataService';
import { useToast } from 'primevue/usetoast';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['loading']);

const dataService = useDataService();
const toast = useToast();

// Settings state
const settings = ref(null);
const originalSettings = ref(null);
const loading = computed(() => props.loading);

// Check if settings have changed
const hasChanges = computed(() => {
  if (!settings.value || !originalSettings.value) return false;
  return JSON.stringify(settings.value) !== JSON.stringify(originalSettings.value);
});

// Fetch settings from API
const fetchSettings = async () => {
  emit('loading', true);
  
  try {
    const response = await dataService.getSettings();
    settings.value = { ...response };
    originalSettings.value = { ...response };
  } catch (error) {
    console.error('Error fetching settings:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load settings',
      life: 3000
    });
  } finally {
    emit('loading', false);
  }
};

// Save settings
const saveSettings = async () => {
  if (!hasChanges.value) return;
  
  emit('loading', true);
  
  try {
    await dataService.updateSettings(settings.value);
    originalSettings.value = { ...settings.value };
    
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Settings saved successfully',
      life: 3000
    });
  } catch (error) {
    console.error('Error saving settings:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to save settings',
      life: 3000
    });
  } finally {
    emit('loading', false);
  }
};

// Initialize component
onMounted(() => {
  fetchSettings();
});
</script>

<style scoped>
.settings-management-container {
  background-color: #fff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
}

.settings-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
}

.settings-loading p {
  margin-top: 1rem;
  color: #64748B;
}

:deep(.p-tabview-panels) {
  padding: 1.5rem 0;
}
</style>
