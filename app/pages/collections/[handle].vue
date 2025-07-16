<script lang="ts" setup>
import type { Collections } from '~/types/collections'

const route = useRoute();

const { data: collections } = await useAsyncData('collections', () =>
  $fetch<Collections>('/api/collections/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      handle: route.params.handle,
      first: 10,
      firstMedia: 10,
      firstCollections: 10,
      filters: []
    })
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
        <div class="max-w-screen-lg mx-auto px-4">
            <div class="w-full mt-5 mb-7">
                <h2 class="text-4xl font-semibold">{{ collectionTitle }}</h2>
                <p class="mt-7 text-xl">{{ collectionDescription }}</p>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-3 gap-5">
                <CardsCollectionCard 
                    v-for="{ node: product } in products" 
                    :key="product.id"
                    :preview-image="product.media.edges[0].node.previewImage" 
                    :title="product.title"
                    :compare-at-price-range="product.compareAtPriceRange"
                    :price-range="product.priceRange"
                />
            </div>
        </div>
    </NuxtLayout>
</template>