<template>
    <div class="partners-slider-wrapper overflow-hidden relative">
        <!-- Background effects (optional) -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent z-10"></div>

        <!-- Main slider container -->
        <div class="partners-slider-container">
            <!-- First copy of images for seamless looping -->
            <div class="partners-track" :style="{ animationDuration: `${speed}s` }">
                <div v-for="(partner, index) in partners" :key="`first-${index}`" class="partner-item"
                    :class="[imageSize]">
                    <img :src="partner.image" :alt="partner.name" class="h-full object-contain px-4" />
                </div>
            </div>

            <!-- Second copy of images for seamless looping -->
            <div class="partners-track" :style="{ animationDuration: `${speed}s` }">
                <div v-for="(partner, index) in partners" :key="`second-${index}`" class="partner-item"
                    :class="[imageSize]">
                    <img :src="partner.image" :alt="partner.name" class="h-full object-contain px-4" />
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
            // Expected format: [{ name: 'Partner Name', image: '/path/to/image.jpg' }]
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
        }
    },
    computed: {
        imageSize() {
            switch (this.size) {
                case 'small': return 'w-32 h-16';
                case 'large': return 'w-64 h-32';
                default: return 'w-36 h-18'; // medium
            }
        }
    },
    mounted() {
        // Pause animation on hover
        const container = this.$el.querySelector('.partners-slider-container');

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
</script>

<style scoped>
.partners-slider-wrapper {
    width: 100%;
    margin: 0 auto;
    padding: 20px 0;
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
    width: 100px;
    height: 100%;
    z-index: 2;
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

/* Responsive adjustments */
@media (max-width: 768px) {

    .partners-slider-wrapper::before,
    .partners-slider-wrapper::after {
        width: 50px;
    }
}
</style>
