import { getCollectionByHandle } from '../../../queries/collections'

export default defineEventHandler(async (event) => {
    try {
        const shopifyUrl = process.env.NUXT_SHOPIFY_URL
        const shopifyToken = process.env.NUXT_SHOPIFY_TOKEN

        const body = await readBody(event)

        const variables = {
            handle: body.handle,
            first: 10,
            firstMedia: 10,
            firstCollections: 10,
            sortKey: null,
            reverse: false,
            after: null,
            filters: []
        }

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
                variables
            })
        })

        return {
            collection: collections?.data?.collectionByHandle
        }
    } catch (error) {
        // Handle errors
        if (error.statusCode) {
            throw error // Re-throw if it's already a proper HTTP error
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error',
            data: error.message
        })
    }
})