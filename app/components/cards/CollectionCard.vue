<script setup>
const props = defineProps({
    previewImage: {
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

const isDiscounted = computed(() => compareAtPriceRange['maxVariantPrice']['amount'] - priceRange['maxVariantPrice']['amount'] > 0)
const currencyCode = computed(() => compareAtPriceRange['maxVariantPrice']['currencyCode'])
</script>

<template>
    <div class="shadow-lg">
        <NuxtImg :src="previewImage.url.replace('https://cdn.shopify.com', '')" width="400" height="400"
            modifiers="{ format: 'webp', crop: 'center', padColor: 'ffffff' }" class="rounded-md" />
        <div class="py-3">
            <h1 class="text-[15px] mb-1">{{ title }}</h1>
            <div class="flex gap-5">
                <p :class="{ 'line-through': isDiscounted }" class="text-red-500">{{
                    compareAtPriceRange['maxVariantPrice']['amount'] }} {{ currencyCode }}</p>
                <p class="font-semibold">{{ priceRange['maxVariantPrice']['amount'] }} {{ currencyCode }}</p>
            </div>
        </div>
    </div>
</template>