export const getProductByhandle = () => {
    return `query getProductByHandle($handle: String!, $first: Int!, $firstMedia: Int!, $firstCollections: Int!){
    product(handle: $handle) {
      id
      title
      descriptionHtml
      handle
      description
      onlineStoreUrl
      tags
      availableForSale
      compareAtPriceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      featuredImage {
        altText
        height
        id
        url
      }
      sellingPlanGroups(first:1) {
        edges {
          node {
            name
            options {
              name
              values
            }
            sellingPlans(first: 3) {
              edges {
                node {
                  id
                  name
                  description
                  recurringDeliveries
                  options {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
      media(first: $firstMedia) {
        edges {
          node {
            alt
            mediaContentType
            ... on Video {
              alt
              id
              sources {
                format
                height
                mimeType
                url
                width
              }
            }
            previewImage {
              altText
              height
              width
              id
              url
            }
          }
        }
      }
      variants(first: $first) {
        edges {
          node {
            id
            title
            weight
            quantityAvailable
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
            image {
              altText
              url
              id
              height
              width
            }
          }
        }
      }
      options {
        id
        name
        values
      }
      seo {
        title
        description
      }
      collections(first: $firstCollections) {
        edges {
          node {
            title
            handle
            products(first: 30) {
              edges {
                node {
                  title
                  handle
                  featuredImage {
                    altText
                    height
                    id
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }`
}