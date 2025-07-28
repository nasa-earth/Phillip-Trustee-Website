<template>
    <div class="p-6 space-y-8">
        <h2 class="text-3xl font-bold text-primary mb-6">
            Tailwind CSS + PrimeVue Integration Demo
        </h2>

        <!-- Section 1: Using Semantic Colors from tailwindcss-primeui -->
        <div class="space-y-4">
            <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
                1. Semantic Colors (tailwindcss-primeui plugin)
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Primary Colors -->
                <div class="bg-primary text-primary-contrast p-4 rounded-lg">
                    <p>bg-primary + text-primary-contrast</p>
                </div>
                <!-- Surface Colors -->
                <div class="bg-surface-100 text-surface-900 p-4 rounded-lg border">
                    <p>bg-surface-100 + text-surface-900</p>
                </div>
                <!-- Muted Colors -->
                <div class="bg-surface-0 text-muted-color p-4 rounded-lg border">
                    <p>bg-surface-0 + text-muted-color</p>
                </div>
            </div>
        </div>

        <!-- Section 2: PrimeVue Components with Tailwind Utilities -->
        <div class="space-y-4">
            <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
                2. PrimeVue Components + Tailwind Utilities
            </h3>

            <!-- Buttons with Tailwind spacing and layout -->
            <div class="flex flex-wrap gap-4">
                <Button label="Primary Button" class="!shadow-lg hover:!shadow-xl transition-shadow duration-300" />
                <Button label="Secondary" severity="secondary" class="!rounded-full !px-6" />
                <Button label="Outlined" outlined class="!border-2 hover:!bg-primary-50" />
            </div>

            <!-- Card with Tailwind layout -->
            <Card class="!shadow-xl !border-0 !bg-gradient-to-br !from-primary-50 !to-surface-0">
                <template #header>
                    <div class="h-32 bg-gradient-to-r from-primary-400 to-primary-600 rounded-t-lg"></div>
                </template>
                <template #title>
                    <span class="text-primary-700">Enhanced Card</span>
                </template>
                <template #content>
                    <p class="text-surface-600 leading-relaxed">
                        This card combines PrimeVue's Card component with Tailwind's gradient, shadow, and spacing
                        utilities.
                    </p>
                </template>
            </Card>
        </div>

        <!-- Section 3: Form Components with Tailwind Layout -->
        <div class="space-y-4">
            <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
                3. Form Components with Tailwind Layout
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <InputText v-model="demoText" placeholder="Enter text here"
                        class="!w-full !rounded-lg !border-surface-300 focus:!border-primary-500 focus:!ring-2 focus:!ring-primary-200" />

                    <Dropdown v-model="selectedOption" :options="dropdownOptions" optionLabel="label"
                        placeholder="Select an option" class="!w-full !rounded-lg" />
                </div>

                <div class="space-y-4">
                    <Calendar v-model="selectedDate" placeholder="Select date" class="!w-full !rounded-lg" />

                    <MultiSelect v-model="selectedItems" :options="multiselectOptions" optionLabel="label"
                        placeholder="Choose items" class="!w-full !rounded-lg" />
                </div>
            </div>
        </div>

        <!-- Section 4: Data Display with Tailwind Responsive Design -->
        <div class="space-y-4">
            <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
                4. DataTable with Tailwind Responsive Classes
            </h3>

            <DataTable :value="tableData" class="!rounded-lg !overflow-hidden !shadow-lg" :paginator="true" :rows="5"
                responsiveLayout="scroll">
                <Column field="name" header="Name" class="!font-semibold"></Column>
                <Column field="role" header="Role"></Column>
                <Column field="status" header="Status">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status" :severity="getStatusSeverity(slotProps.data.status)"
                            class="!rounded-full !px-3 !py-1" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- Section 5: Toast Notification Demo -->
        <div class="space-y-4">
            <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
                5. Interactive Components
            </h3>

            <div class="flex flex-wrap gap-4">
                <Button label="Success Toast" @click="showSuccess" severity="success" class="!rounded-full !px-6" />
                <Button label="Warning Toast" @click="showWarning" severity="warning" class="!rounded-full !px-6" />
                <Button label="Error Toast" @click="showError" severity="danger" class="!rounded-full !px-6" />
            </div>
        </div>

        <!-- Toast component -->
        <Toast class="!rounded-lg" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

// Reactive data
const demoText = ref('')
const selectedOption = ref(null)
const selectedDate = ref(null)
const selectedItems = ref(null)

// Options for dropdowns
const dropdownOptions = ref([
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' }
])

const multiselectOptions = ref([
    { label: 'Item 1', value: 'item1' },
    { label: 'Item 2', value: 'item2' },
    { label: 'Item 3', value: 'item3' },
    { label: 'Item 4', value: 'item4' }
])

// Table data
const tableData = ref([
    { name: 'John Doe', role: 'Developer', status: 'Active' },
    { name: 'Jane Smith', role: 'Designer', status: 'Inactive' },
    { name: 'Bob Johnson', role: 'Manager', status: 'Active' },
    { name: 'Alice Brown', role: 'Analyst', status: 'Pending' },
    { name: 'Charlie Wilson', role: 'Tester', status: 'Active' }
])

// Toast functionality
const toast = useToast()

const showSuccess = () => {
    toast.add({
        severity: 'success',
        summary: 'Success!',
        detail: 'This is a success message with Tailwind styling',
        life: 3000
    })
}

const showWarning = () => {
    toast.add({
        severity: 'warn',
        summary: 'Warning!',
        detail: 'This is a warning message',
        life: 3000
    })
}

const showError = () => {
    toast.add({
        severity: 'error',
        summary: 'Error!',
        detail: 'This is an error message',
        life: 3000
    })
}

// Utility function for status severity
const getStatusSeverity = (status) => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'danger'
        case 'Pending': return 'warning'
        default: return 'info'
    }
}
</script>

<style scoped>
/* Custom styles to enhance the integration */
.demo-section {
    @apply bg-surface-0 rounded-lg p-6 border border-surface-200;
}
</style>
