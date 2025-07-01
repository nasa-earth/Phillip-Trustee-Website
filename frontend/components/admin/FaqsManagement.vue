<template>

    <!-- FAQs Section -->
                <div v-if="activeSection === 'faq'" class="content-section">
                    <div class="section-header">
                        <h3>FAQ Management</h3>
                        <Button label="Add FAQ" icon="pi pi-plus" severity="success" />
                    </div>

                    <Accordion :multiple="true" class="faq-accordion">
                        <AccordionTab v-for="(faq, idx) in faqs" :key="idx" :header="faq.question">
                            <p class="faq-answer">{{ faq.answer }}</p>
                            <div class="faq-actions">
                                <Button label="Edit" icon="pi pi-pencil" text />
                                <Button label="Delete" icon="pi pi-trash" severity="danger" text />
                            </div>
                        </AccordionTab>
                    </Accordion>
                </div>


</template>



<script>
// FAQ data
const faqs = ref([
    {
        question: 'What is a trust fund?',
        answer: 'A trust fund is a legal arrangement where one party (the trustee) holds assets on behalf of another party (the beneficiary). Trust funds are often established to manage assets for minors, people with disabilities, or as part of estate planning.'
    },
    {
        question: 'How do I set up a trust fund with Phillip Trustee?',
        answer: 'To set up a trust fund with Phillip Trustee, you would need to schedule a consultation with our trust specialists. We will guide you through the process of establishing the trust, including drafting the trust documents, funding the trust, and selecting appropriate trustees.'
    },
    {
        question: 'What are the benefits of a trust?',
        answer: 'Trusts offer several benefits including estate tax planning, protection from creditors, avoiding probate, ensuring privacy, providing for family members with special needs, and controlling how and when your assets are distributed to beneficiaries.'
    },
    {
        question: 'What types of trusts does Phillip Trustee offer?',
        answer: 'Phillip Trustee offers various types of trusts including revocable living trusts, irrevocable trusts, charitable trusts, special needs trusts, and testamentary trusts. Each serves different purposes and our specialists can help determine which is most appropriate for your needs.'
    }
]);


</script>