import { getProductByhandle } from '../../../queries/products'

export default defineEventHandler(async (event) => {
    try {
        const shopifyUrl = process.env.NUXT_SHOPIFY_URL
        const shopifyToken = process.env.NUXT_SHOPIFY_TOKEN

        const body = await readBody(event)

        const variables = {
            handle: body.handle,
            first: 10,
            firstMedia: 10,
            firstCollections: 10
        }

        if (!shopifyUrl || !shopifyToken) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Missing required environment variables'
            })
        }

        const response = await $fetch(`https://${shopifyUrl}.myshopify.com/api/2025-07/graphql.json`, {
            method: 'POST',
            headers: {
                'X-Shopify-Storefront-Access-Token': `${shopifyToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: getProductByhandle(),
                variables
            })
        })

        console.log("PRODUCT", response)

        return response.data.product
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