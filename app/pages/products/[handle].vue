<script setup>
const route = useRoute();

const handle = computed(() => route.params.handle)

const { data: product } = await useAsyncData(`collections:${handle.value}`, () =>
    $fetch('/api/products', {
        method: 'POST',
        body: {
            handle: handle.value,
            first: 10,
            firstMedia: 10,
            firstCollections: 10
        }
    }),
    {
        watch: [handle.value]
    }
)

const images = computed(() => product.value.media.edges)

const collections = computed(() => product.value.collections.edges[0]?.node.products.edges.map(item => item.node))

const containerRef = ref(null)
const slides = ref(Array.from({ length: 10 }))

const swiper = useSwiper(containerRef, {
    effect: 'creative',
    loop: true,
    autoplay: {
        delay: 1000,
    },
    creativeEffect: {
        prev: {
            shadow: true,
            translate: [0, 0, -400],
        },
        next: {
            shadow: true,
            translate: [0, 0, -400],
        },
    },
})

useSeoMeta({
    title: product.value.title,
    description: product.value.description,
})
</script>

<template>
    <NuxtLayout name="products" class="">
        <div class="flex flex-col gap-12">
            <div class="grid grid-cols-12 w-full py-4 gap-10">
                <div class="col-span-12 lg:col-span-7">
                    <ClientOnly>
                        <swiper-container ref="containerRef">
                            <swiper-slide v-for="(slide, idx) in images" :key="idx"
                                style="background-color: rgb(32, 233, 70); color: white;">
                                <NuxtImg :src="slide?.node?.previewImage?.url" class="rounded-lg"
                                    :alt="slide?.node?.previewImage?.altText || 'main-img'" fit="cover" format="webp"
                                    width="700" height="700" :modifiers="{ crop: 'center', padColor: 'ecebeb' }"
                                    preload />
                            </swiper-slide>
                        </swiper-container>
                    </ClientOnly>
                    <div class="flex gap-3 justify-end">
                        <button @click="swiper.prev()" class="bg-white border flex items-center">
                            <Icon name="material-symbols-light:navigate-next" class="text-4xl" style="color: black" />
                        </button>
                        <button @click="swiper.next()" class="bg-white border flex items-center">
                            <Icon name="material-symbols-light:navigate-next" class="text-4xl" style="color: black" />
                        </button>
                    </div>
                    <!-- <div class="overflow-hidden">
                        <NuxtImg :src="images[0]?.node?.previewImage?.url" class="rounded-lg"
                            :alt="images[0]?.node?.previewImage?.altText || 'main-img'" fit="cover" format="webp"
                            width="700" height="700" :modifiers="{ crop: 'center', padColor: 'ecebeb' }" preload />

                    </div>
                    <div class="flex justify-between gap-4 mt-4 ">
                        <div v-for="(img, i) in images.slice(0, 5)" :key="i">
                            <NuxtImg :src="img?.node?.previewImage?.url" class="border bg-[#ecebeb] rounded-md"
                                :alt="img?.node?.previewImage?.altText || 'main-img'" fit="cover" format="webp"
                                width="130" height="130" :modifiers="{ crop: 'center', padColor: 'ecebeb' }" preload />
                        </div>
                    </div> -->
                </div>
                <div class="col-span-12 lg:col-span-5">
                    <div class="flex flex-col gap-5">
                        <h2 class="text-4xl">{{ product.title }}</h2>
                        <span class="text-xl font-semibold">${{ product.priceRange.maxVariantPrice.amount }}</span>
                        <button class="bg-[#f9ff2b] py-2.5 text-lg font-base rounded-lg">Add to cart</button>
                        <div v-html="product.descriptionHtml"></div>
                    </div>
                </div>
            </div>
            <div>
                <h2 class="text-2xl">Related Products</h2>
                <div class="flex gap-5 mt-3">
                    <NuxtLink v-for="(collection, i) in collections.slice(0, 4)" :key="i"
                        :to="`/products/${product.handle}`">

                        <CardsCollectionCard :index="i" :preview-image="collection.featuredImage"
                            :preview-hovered-image="collection.featuredImage" :title="collection.title"
                            :compare-at-price-range="product.compareAtPriceRange" :price-range="product.priceRange" />
                    </NuxtLink>
                </div>
            </div>
            <div>
               
            </div>
        </div>
    </NuxtLayout>
</template>