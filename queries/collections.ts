export const getCollectionByHandle = () => {
    return `query getCollectionByHandle($handle: String!, $first: Int!, $firstMedia: Int!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean, $after: String, $filters: [ProductFilter!]) {
          collectionByHandle(handle: $handle) { 
              id
              title
              description
              handle  
              seo {
                title
                description
              }
              products(first: $first, sortKey: $sortKey, reverse: $reverse, after: $after, filters: $filters) {
                edges {
                  node {
                    id
                    title
                    handle
                    tags
                    availableForSale
                    variants(first: 30) {
                      edges {
                        node {
                          id
                          title
                          quantityAvailable
                          selectedOptions {
                            name
                            value
                          }
                          price {
                            amount
                            currencyCode
                          }
                          sellingPlanAllocations (first: 1) {
                            edges {
                              node {
                                priceAdjustments {
                                  compareAtPrice {
                                      amount
                                  }
                                  price {
                                      amount
                                  }
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
                          previewImage {
                            altText
                            height
                            id
                            url
                          }
                        }
                      }
                    }
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
                              priceAdjustments  {
                                adjustmentValue {
                                    ... on SellingPlanPercentagePriceAdjustment {
                                        adjustmentPercentage
                                    }
                                }
                                orderCount
                              }
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
                  }          
                }
                filters {
                  id
                  label
                  type
                  values {
                      count
                      id
                      label
                      input
                  }
                }
                pageInfo {
                  startCursor
                  hasNextPage
                  hasPreviousPage
                  endCursor
                }
              }
          }
      }`;
};
