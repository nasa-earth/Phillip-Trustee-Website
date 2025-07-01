<template>
    <!-- Partners Section -->
                <div v-if="activeSection === 'partners'" class="content-section">
                    <div class="section-header">
                        <h3>Partners Management</h3>
                        <Button label="Add Partner" icon="pi pi-plus" severity="success" />
                    </div>

                    <div class="partners-grid">
                        <div v-for="(partner, idx) in partners" :key="idx" class="partner-card">
                            <img :src="partner.logo" :alt="partner.name" class="partner-logo" />
                            <div class="partner-details">
                                <h4>{{ partner.name }}</h4>
                                <p class="partner-type">{{ partner.type }}</p>
                                <div class="partner-actions">
                                    <Button icon="pi pi-pencil" text rounded />
                                    <Button icon="pi pi-trash" text rounded severity="danger" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
</template>


<script>

// Partners data
const partners = ref([
    {
        name: 'Phillip Bank',
        logo: '/images/about/1-phillip-bank.jpg',
        type: 'Financial Institution'
    },
    {
        name: 'Phillip General Insurance',
        logo: '/images/about/1-phillip-general-insurance.png',
        type: 'Insurance Provider'
    },
    {
        name: 'SaRaNa Law',
        logo: '/images/event/SARANA LAW_2.jpg',
        type: 'Legal Services'
    },
    {
        name: 'Yi Fung Real Estate',
        logo: '/images/event/Yi Fung Real Estate_1.jpg',
        type: 'Real Estate'
    },
    {
        name: 'Sunpay',
        logo: '/images/event/Sunpay_2.jpg',
        type: 'Payment Solutions'
    },
    {
        name: 'Dragon Land',
        logo: '/images/partners/Dragon Land.jpg',
        type: 'Real Estate'
    }
]);
</script>