<script lang="ts" setup>
import type { Collections } from '~/types/collections'

const route = useRoute();

const body = reactive({
    handle: route.params.handle,
    first: 10,
    firstMedia: 10,
    firstCollections: 10,
    filters: []
})

const { data: collections } = await useAsyncData('collections', () =>
    $fetch<Collections>('/api/collections/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    })
)

const collectionTitle = computed(() => collections?.value?.collections?.data?.collectionByHandle.title);
const collectionDescription = computed(() => collections?.value?.collections?.data?.collectionByHandle.description);

useSeoMeta({
    title: collectionTitle,
    description: collectionDescription,
})

const products = computed(() => collections.value?.collections?.data?.collectionByHandle.products.edges)
</script>


<template>
    <NuxtLayout name="collections" class="bg-black text-white">
        <div class="max-w-screen-xl mx-auto px-4">
            <div class="w-full mt-5 mb-7">
                <h2 class="text-2xl lg:text-4xl font-semibold">{{ collectionTitle }}</h2>
                <p class="mt-2 lg:mt-7 text-sm lg:text-xl">{{ collectionDescription }}</p>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-3 gap-5">
                <NuxtLink v-for="{ node: product } in products" :key="product.id" :to="`/products/${product.handle}`">
                    <CardsCollectionCard :preview-image="product.media.edges[0].node.previewImage"
                        :preview-hovered-image="product.media.edges[1].node.previewImage" :title="product.title"
                        :compare-at-price-range="product.compareAtPriceRange" :price-range="product.priceRange" />
                </NuxtLink>
            </div>
        </div>
    </NuxtLayout>
</template>