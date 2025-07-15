<template>
    <div class="debug-panel border border-gray-300 rounded p-4 m-4 bg-gray-50">
        <h3 class="text-lg font-bold mb-4">Partners Debug Panel</h3>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <h4 class="font-semibold mb-2">State Info</h4>
                <p><strong>Loading:</strong> {{ loading }}</p>
                <p><strong>Error:</strong> {{ error || 'None' }}</p>
                <p><strong>Partners Count:</strong> {{ partners.length }}</p>
                <p><strong>Data Fresh:</strong> {{ isDataFresh() ? 'Yes' : 'No' }}</p>
            </div>

            <div>
                <h4 class="font-semibold mb-2">Actions</h4>
                <div class="space-y-2">
                    <Button @click="testRefresh" :loading="loading" size="small">
                        Refresh Partners
                    </Button>
                    <Button @click="testCreate" severity="success" size="small">
                        Test Create
                    </Button>
                    <Button @click="testUpdate" severity="warn" size="small" :disabled="partners.length === 0">
                        Test Update
                    </Button>
                    <Button @click="testDelete" severity="danger" size="small" :disabled="partners.length === 0">
                        Test Delete
                    </Button>
                </div>
            </div>
        </div>

        <div class="mt-4">
            <h4 class="font-semibold mb-2">Partner List ({{ partners.length }})</h4>
            <div class="max-h-40 overflow-y-auto">
                <div v-for="partner in partners" :key="partner.id" class="text-sm border-b pb-1 mb-1">
                    <strong>{{ partner.name }}</strong> (ID: {{ partner.id }})
                </div>
            </div>
        </div>

        <div class="mt-4">
            <h4 class="font-semibold mb-2">Event Log</h4>
            <div class="max-h-32 overflow-y-auto bg-white p-2 border text-xs">
                <div v-for="(log, index) in eventLog" :key="index" class="mb-1">
                    <span class="text-gray-500">{{ log.time }}</span> -
                    <span class="font-medium">{{ log.action }}</span>:
                    {{ log.data }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { usePartners } from '~/composables/usePartners';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const eventLog = ref([]);

const {
    partners,
    loading,
    error,
    fetchPartners,
    createPartner,
    updatePartner,
    deletePartner,
    onPartnerChange,
    isDataFresh
} = usePartners();

const addToLog = (action, data) => {
    eventLog.value.unshift({
        time: new Date().toLocaleTimeString(),
        action,
        data: JSON.stringify(data)
    });

    // Keep only last 10 logs
    if (eventLog.value.length > 10) {
        eventLog.value = eventLog.value.slice(0, 10);
    }
};

const testRefresh = async () => {
    try {
        await fetchPartners(true);
        addToLog('Refresh', 'Success');
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Partners refreshed',
            life: 2000
        });
    } catch (err) {
        addToLog('Refresh', `Error: ${err.message}`);
    }
};

const testCreate = async () => {
    try {
        const testPartner = {
            name: `Test Partner ${Date.now()}`,
            logo: '/images/placeholder-logo.png',
            website: 'https://example.com',
            description: 'Test partner for debugging'
        };

        await createPartner(testPartner);
        addToLog('Create', `Created: ${testPartner.name}`);
    } catch (err) {
        addToLog('Create', `Error: ${err.message}`);
    }
};

const testUpdate = async () => {
    if (partners.value.length === 0) return;

    try {
        const partner = partners.value[0];
        const updateData = {
            name: `${partner.name} (Updated ${Date.now()})`,
            logo: partner.logo,
            website: partner.website,
            description: partner.description
        };

        await updatePartner(partner.id, updateData);
        addToLog('Update', `Updated: ${partner.name}`);
    } catch (err) {
        addToLog('Update', `Error: ${err.message}`);
    }
};

const testDelete = async () => {
    if (partners.value.length === 0) return;

    try {
        const partner = partners.value[0];
        await deletePartner(partner.id);
        addToLog('Delete', `Deleted: ${partner.name}`);
    } catch (err) {
        addToLog('Delete', `Error: ${err.message}`);
    }
};

onMounted(() => {
    // Subscribe to partner change events
    const unsubscribe = onPartnerChange((action, data) => {
        addToLog(`Event: ${action}`, data);
    });

    onUnmounted(() => {
        unsubscribe();
    });
});
</script>

<style scoped>
.debug-panel {
    font-family: 'Courier New', monospace;
}
</style>
