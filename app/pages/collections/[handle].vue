<script setup>

const route = useRoute();

const handle = computed(() => route.params.handle)

const { data } = await useAsyncData(`collections:${handle.value}`, () =>
    $fetch('/api/collections', {
        method: 'POST',
        body: {
            handle: handle.value,
            first: 10,
            firstMedia: 10,
            firstCollections: 10,
            sortKey: null,
            reverse: false,
            after: null,
            filters: []
        }
    }),
    {
        transform: (response) => {
            // Transform the API response
            return {
                collection: response.collection,
                products: response.collection.products.edges.map(item => item.node)
            }

        },
        watch: [handle.value]
    }
)

const collection = computed(() => data.value.collection)
const products = computed(() => data.value.products)


const collectionTitle = computed(() => data.value.collection?.title);
const collectionDescription = computed(() => data.value.collection?.description);

useSeoMeta({
    title: collectionTitle,
    description: collectionDescription,
})
</script>


<template>
    <NuxtLayout name="collections" class="">
        <div>
            <div class="w-full mt-5 mb-7">
                <h2 class="text-2xl lg:text-4xl font-semibold text-white">{{ collectionTitle }}</h2>
                <p class="mt-2 lg:mt-7 text-sm lg:text-xl text-gray-200">{{ collectionDescription }}</p>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-3 gap-5">
                <NuxtLink v-for="(product, i) in products" :key="product.id" :to="`/products/${product.handle}`">
                    <CardsCollectionCard :index="i" :preview-image="product.media.edges[0]?.node?.previewImage"
                        :preview-hovered-image="product.media.edges[1]?.node?.previewImage" :title="product.title"
                        :compare-at-price-range="product.compareAtPriceRange" :price-range="product.priceRange" />
                </NuxtLink>
            </div>
        </div>
    </NuxtLayout>
</template>