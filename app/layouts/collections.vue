<script setup>
const props = defineProps({
    menus: {
        type: Array,
        default: [
            {
                title: 'Home',
                link: '/',
            },
            {
                title: 'Merch',
                link: '/collections/frontpage',
            },
            {
                title: 'Electronic Projects',
                link: '/collections/electronics-projects',
            }
        ]
    }
})

const route = useRoute();
</script>

<template>
    <div>
        <NuxtLoadingIndicator />
        <nav class="bg-white hidden lg:block border-b fixed top-0 w-full z-50">
            <div class="mx-auto max-w-screen-xl pr-5">
                <div class="relative flex h-16 items-center justify-between">
                    <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                        <div class="hidden sm:ml-6 sm:block">
                            <div class="flex space-x-4">
                                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                                <NuxtLink v-for="(menu, i) in menus" :key="i" :to="menu.link"
                                    class="rounded-md px-3 py-2 text-base font-normal text-gray-600 hover:text-gray"
                                    :class="{ 'bg-[#121212] text-white': route.path === menu.link, 'hover:underline': route.path !== menu.link }">
                                    {{ menu.title }}
                                </NuxtLink>

                            </div>
                        </div>
                    </div>
                    <div class="flex shrink-0 items-center">
                        <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                            alt="Your Company" class="h-8 w-auto" />
                    </div>
                    <div
                        class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button type="button"
                            class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                            <span class="absolute -inset-1.5"></span>
                            <span class="sr-only">View notifications</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                                data-slot="icon" aria-hidden="true" class="size-6">
                                <path
                                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>

                    </div>
                </div>
            </div>

            <!-- Mobile menu, show/hide based on menu state. -->
            <div id="mobile-menu" class="sm:hidden">
                <div class="space-y-1 px-2 pt-2 pb-3">
                    <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                    <a href="#" aria-current="page"
                        class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white">Dashboard</a>
                    <a href="#"
                        class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</a>
                    <a href="#"
                        class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
                    <a href="#"
                        class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
                </div>
            </div>
        </nav>
        <main class="mt-[4rem] bg-[#121212] py-3">
            <div class="max-w-screen-xl mx-auto px-10">
                <slot />
            </div>
        </main>
    </div>

</template>