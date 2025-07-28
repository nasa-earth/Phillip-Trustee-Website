<template>
    <div class="min-h-screen bg-gradient-to-br from-surface-50 to-primary-50">
        <!-- Header -->
        <div class="bg-primary text-primary-contrast py-8">
            <div class="container mx-auto px-6">
                <h1 class="text-4xl font-bold text-center">
                    Tailwind CSS + PrimeVue Integration
                </h1>
                <p class="text-center mt-2 text-primary-100">
                    Demonstrating the power of combining Tailwind utilities with PrimeVue components
                </p>
            </div>
        </div>

        <!-- Main Content -->
        <div class="container mx-auto px-6 py-8">
            <TailwindPrimeVueDemo />
        </div>

        <!-- Footer with examples -->
        <div class="bg-surface-900 text-surface-0 py-8 mt-12">
            <div class="container mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 class="text-lg font-semibold mb-4 text-primary-400">
                            Key Benefits
                        </h3>
                        <ul class="space-y-2 text-surface-300">
                            <li>• Semantic color utilities (bg-primary, text-surface-900)</li>
                            <li>• Full Tailwind layout and spacing system</li>
                            <li>• PrimeVue component functionality</li>
                            <li>• Easy customization with utility classes</li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold mb-4 text-primary-400">
                            Available Utilities
                        </h3>
                        <ul class="space-y-2 text-surface-300">
                            <li>• bg-primary, bg-surface-*</li>
                            <li>• text-primary-contrast, text-muted-color</li>
                            <li>• All standard Tailwind utilities</li>
                            <li>• Responsive design classes</li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold mb-4 text-primary-400">
                            Integration Tips
                        </h3>
                        <ul class="space-y-2 text-surface-300">
                            <li>• Use ! prefix to override PrimeVue styles</li>
                            <li>• Combine semantic colors with Tailwind layout</li>
                            <li>• Leverage both styled and unstyled modes</li>
                            <li>• Consider Volt UI for advanced use cases</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Set page metadata
useHead({
    title: 'Tailwind + PrimeVue Demo',
    meta: [
        { name: 'description', content: 'Demonstration of Tailwind CSS integration with PrimeVue components' }
    ]
})
</script>
