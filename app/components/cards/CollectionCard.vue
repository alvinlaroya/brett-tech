<script setup>
const props = defineProps({
    previewImage: {
        type: Object,
        required: true
    },
    previewHoveredImage: {
        type: Object,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    compareAtPriceRange: {
        type: Object,
        required: true
    },
    priceRange: {
        type: Object,
        required: true
    }
})

const { compareAtPriceRange, priceRange } = props;

const hovered = ref(false);

const isDiscounted = computed(() => compareAtPriceRange['maxVariantPrice']['amount'] - priceRange['maxVariantPrice']['amount'] > 0)
const currencyCode = computed(() => compareAtPriceRange['maxVariantPrice']['currencyCode'])
</script>

<template>
    <div @mouseover="() => hovered = true" @mouseleave="() => hovered = false">
        <div class="overflow-hidden rounded-md">
            <div :class="{ 'transition-all scale-125': hovered }">
                <NuxtImg :src="previewImage?.url" fit="cover" format="webp"
                    :modifiers="{ crop: 'center', padColor: 'ecebeb' }" />
            </div>
        </div>
        <BadgesSaleFlag v-if="isDiscounted" />
        <div class="py-3">
            <h1 class="text-[15px] mb-1 text-white">{{ title }}</h1>
            <div class="flex gap-5">
                <p :class="{ 'line-through': isDiscounted }" class="text-gray-400">{{
                    compareAtPriceRange['maxVariantPrice']['amount'] }} {{ currencyCode }}</p>
                <p class="font-semibold text-white">{{ priceRange['maxVariantPrice']['amount'] }} {{ currencyCode }}</p>
            </div>
        </div>
    </div>
</template>