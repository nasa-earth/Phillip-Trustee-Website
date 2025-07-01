<template>
    <!-- Settings Section -->
                <div v-if="activeSection === 'settings'" class="content-section">
                    <div class="section-header">
                        <h3>System Settings</h3>
                        <Button label="Save Changes" icon="pi pi-save" severity="primary" />
                    </div>
                    <div class="settings-grid">
                        <div class="settings-card">
                            <h4>General Settings</h4>
                            <div class="setting-item">
                                <label>Site Title</label>
                                <InputText v-model="siteSettings.title" placeholder="Enter site title" />
                            </div>
                            <div class="setting-item">
                                <label>Site Description</label>
                                <Textarea v-model="siteSettings.description" rows="3"
                                    placeholder="Enter site description" />
                            </div>
                            <div class="setting-item">
                                <label>Contact Email</label>
                                <InputText v-model="siteSettings.email" placeholder="Enter contact email" />
                            </div>
                        </div>

                        <div class="settings-card">
                            <h4>Appearance Settings</h4>
                            <div class="setting-item">
                                <label>Theme Color</label>
                                <Dropdown v-model="siteSettings.theme" :options="themeOptions" optionLabel="name"
                                    placeholder="Select theme" class="w-full" />
                            </div>
                            <div class="setting-item">
                                <label>Font Size</label>
                                <InputNumber v-model="siteSettings.fontSize" suffix="px" :min="12" :max="20"
                                    showButtons />
                            </div>
                            <div class="setting-item">
                                <div class="flex align-items-center">
                                    <Checkbox v-model="siteSettings.darkMode" :binary="true" inputId="darkMode" />
                                    <label for="darkMode" class="ml-2">Enable Dark Mode</label>
                                </div>
                            </div>
                        </div>

                        <div class="settings-card">
                            <h4>Security Settings</h4>
                            <div class="setting-item">
                                <div class="flex align-items-center">
                                    <Checkbox v-model="siteSettings.twoFactor" :binary="true" inputId="twoFactor" />
                                    <label for="twoFactor" class="ml-2">Enable Two-Factor Authentication</label>
                                </div>
                            </div>
                            <div class="setting-item">
                                <label>Session Timeout</label>
                                <Dropdown v-model="siteSettings.sessionTimeout" :options="timeoutOptions"
                                    optionLabel="name" optionValue="value" placeholder="Select timeout"
                                    class="w-full" />
                            </div>
                        </div>
                    </div>
                </div>
</template>

<script>


// Site settings data
const siteSettings = ref({
    title: 'Phillip Trustee Website',
    description: 'Official website for Phillip Trustee Company',
    email: 'info@philliptrustee.com',
    theme: { name: 'Blue', code: 'blue' },
    fontSize: 14,
    darkMode: false,
    twoFactor: false,
    sessionTimeout: 30
});

</script>