<template>
    <!-- Events Section -->
    <div v-if="activeSection === 'events'" class="content-section">
        <div class="section-header">
            <h3>Event Management</h3>
            <Button label="Create Event" icon="pi pi-plus" severity="success" />
        </div>

        <DataTable :value="events" class="events-table" :paginator="true" :rows="5" responsiveLayout="scroll"
            stripedRows>
            <Column field="title" header="Event Title"></Column>
            <Column field="date" header="Date"></Column>
            <Column field="location" header="Location"></Column>
            <Column field="attendees" header="Attendees" dataType="numeric"></Column>
            <Column field="status" header="Status">
                <template #body="{ data }">
                    <Tag :value="data.status" :severity="getEventStatusSeverity(data.status)" />
                </template>
            </Column>
            <Column header="Actions">
                <template #body>
                    <div class="action-buttons-cell">
                        <Button icon="pi pi-eye" rounded text severity="info" aria-label="View" />
                        <Button icon="pi pi-pencil" rounded text severity="success" aria-label="Edit" />
                        <Button icon="pi pi-trash" rounded text severity="danger" aria-label="Delete" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>

</template>

<script>
import { Column, DataTable } from '#components';
// Events data
const events = ref([
    {
        title: 'Annual Finance Summit',
        date: '2025-07-15',
        location: 'Phnom Penh Convention Center',
        attendees: 120,
        status: 'upcoming'
    },
    {
        title: 'Investment Workshop',
        date: '2025-08-05',
        location: 'Phillip Trustee Office',
        attendees: 45,
        status: 'upcoming'
    },
    {
        title: 'Client Appreciation Day',
        date: '2025-06-10',
        location: 'Sofitel Phnom Penh',
        attendees: 85,
        status: 'completed'
    },
    {
        title: 'Financial Planning Seminar',
        date: '2025-05-20',
        location: 'Raffles Hotel',
        attendees: 60,
        status: 'completed'
    },
    {
        title: 'Partnership Launch',
        date: '2025-08-25',
        location: 'Rosewood Phnom Penh',
        attendees: 0,
        status: 'planning'
    }
]);

</script>