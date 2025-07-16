import type { H3Event } from 'h3'

import { getCollectionByHandle } from '../../../queries/collections'

export default defineCachedEventHandler(async (event) => {
    const shopifyUrl = process.env.NUXT_SHOPIFY_URL
    const shopifyToken = process.env.NUXT_SHOPIFY_TOKEN

    const body = await readBody(event)

    if (!shopifyUrl || !shopifyToken) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Missing required environment variables'
        })
    }

    const collections = await $fetch(`https://${shopifyUrl}.myshopify.com/api/2025-07/graphql.json`, {
        method: 'POST',
        headers: {
            'X-Shopify-Storefront-Access-Token': `${shopifyToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: getCollectionByHandle(),
            variables: { ...body }
        })
    })

    return {
        collections
    }
}, {
    maxAge: 60 * 60,
    getKey: (event: H3Event) => event.path
    /* 1 hour */
})