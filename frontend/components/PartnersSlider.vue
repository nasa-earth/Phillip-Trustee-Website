<template>
    <div class="partners-slider-wrapper overflow-hidden relative">
        <!-- Background effects (optional) -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent z-10"></div>

        <!-- Show loading state -->
        <div v-if="loading" class="flex justify-center items-center h-16 sm:h-20 md:h-24">
            <div class="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600"></div>
        </div>

        <!-- Show error state -->
        <div v-else-if="error" class="flex justify-center items-center h-16 sm:h-20 md:h-24 text-red-500">
            <p class="text-sm sm:text-base">{{ error }}</p>
        </div>

        <!-- Show empty state -->
        <div v-else-if="!partners || partners.length === 0"
            class="flex justify-center items-center h-16 sm:h-20 md:h-24 text-gray-500">
            <p class="text-sm sm:text-base">No partners to display</p>
        </div>

        <!-- Main slider container -->
        <div v-else class="partners-slider-container">
            <!-- First copy of images for seamless looping -->
            <div class="partners-track" :style="{ animationDuration: `${speed}s` }">
                <div v-for="(partner, index) in partners" :key="`first-${index}`" class="partner-item"
                    :class="[imageSize]">
                    <img :src="partner.logo || partner.image" :alt="'Partner logo'"
                        class="h-full object-contain px-2 sm:px-3 md:px-4" @error="onImageError" />
                </div>
            </div>

            <!-- Second copy of images for seamless looping -->
            <div class="partners-track" :style="{ animationDuration: `${speed}s` }">
                <div v-for="(partner, index) in partners" :key="`second-${index}`" class="partner-item"
                    :class="[imageSize]">
                    <img :src="partner.logo || partner.image" :alt="'Partner logo'"
                        class="h-full object-contain px-2 sm:px-3 md:px-4" @error="onImageError" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PartnersSlider',
    props: {
        partners: {
            type: Array,
            required: true,
            default: () => []
            // Expected format: [{ logo: '/path/to/image.jpg' }] or [{ image: '/path/to/image.jpg' }] 
            // Component will try to use 'logo' field first, then fall back to 'image'
        },
        speed: {
            type: Number,
            default: 30,
            // Animation speed in seconds - higher is slower
        },
        size: {
            type: String,
            default: 'medium',
            validator: (value) => ['small', 'medium', 'large'].includes(value)
        },
        loading: {
            type: Boolean,
            default: false
        },
        error: {
            type: String,
            default: null
        }
    },
    computed: {
        imageSize() {
            switch (this.size) {
                case 'small': return 'w-24 h-12 sm:w-28 sm:h-14 md:w-32 md:h-16';
                case 'large': return 'w-48 h-24 sm:w-56 sm:h-28 md:w-64 md:h-32';
                default: return 'w-28 h-14 sm:w-32 sm:h-16 md:w-36 md:h-18'; // medium
            }
        }
    },
    methods: {
        onImageError(event) {
            // Set a fallback image when the original fails to load
            event.target.src = '/images/placeholder-logo.png';
        }
    },
    mounted() {
        // Pause animation on hover
        const container = this.$el.querySelector('.partners-slider-container');
        if (container) {
            container.addEventListener('mouseenter', () => {
                const tracks = container.querySelectorAll('.partners-track');
                tracks.forEach(track => track.style.animationPlayState = 'paused');
            });

            container.addEventListener('mouseleave', () => {
                const tracks = container.querySelectorAll('.partners-track');
                tracks.forEach(track => track.style.animationPlayState = 'running');
            });
        }
    }
}
</script>

<style scoped>
.partners-slider-wrapper {
    width: 100%;
    margin: 0 auto;
    padding: 12px 0;
}

/* Mobile-first responsive padding */
@media (min-width: 640px) {
    .partners-slider-wrapper {
        padding: 16px 0;
    }
}

@media (min-width: 768px) {
    .partners-slider-wrapper {
        padding: 20px 0;
    }
}

.partners-slider-container {
    display: flex;
    overflow: hidden;
    position: relative;
    white-space: nowrap;
}

.partners-track {
    display: flex;
    animation: slide var(--duration, 30s) linear infinite;
}

.partner-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    height: 100%;
}

/* Gradient overlay on the sides for fade effect (optional) */
.partners-slider-wrapper::before,
.partners-slider-wrapper::after {
    content: '';
    position: absolute;
    top: 0;
    width: 30px;
    height: 100%;
    z-index: 2;
}

/* Responsive gradient widths */
@media (min-width: 640px) {

    .partners-slider-wrapper::before,
    .partners-slider-wrapper::after {
        width: 50px;
    }
}

@media (min-width: 768px) {

    .partners-slider-wrapper::before,
    .partners-slider-wrapper::after {
        width: 80px;
    }
}

@media (min-width: 1024px) {

    .partners-slider-wrapper::before,
    .partners-slider-wrapper::after {
        width: 100px;
    }
}

.partners-slider-wrapper::before {
    left: 0;
    background: linear-gradient(to right, var(--bg-color, #0e2a52), transparent);
}

.partners-slider-wrapper::after {
    right: 0;
    background: linear-gradient(to left, var(--bg-color, #0e2a52), transparent);
}

@keyframes slide {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-100%);
    }
}

/* Enhanced mobile responsiveness */
@media (max-width: 480px) {
    .partners-slider-wrapper {
        padding: 8px 0;
    }

    .partners-slider-wrapper::before,
    .partners-slider-wrapper::after {
        width: 20px;
    }

    /* Slightly faster animation on very small screens for better visual flow */
    .partners-track {
        animation-duration: calc(var(--duration, 30s) * 0.8) !important;
    }
}

/* Tablet and small desktop adjustments */
@media (min-width: 768px) and (max-width: 1024px) {

    .partners-slider-wrapper::before,
    .partners-slider-wrapper::after {
        width: 60px;
    }
}
</style>
