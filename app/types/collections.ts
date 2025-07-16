interface Seo {
    title: string;
    description: string;
}

interface Product {
    id: string;
    title: string;
    handle: string;
    tags: string[];
    availableForSale: boolean;
    variants: {
        edges: Variant[]
    },
    media: {
        edges: Media[]
    },
    compareAtPriceRange: {
        maxVariantPrice: Price,
        minVariantPrice: Price
    },
    priceRange: {
        maxVariantPrice: Price,
        minVariantPRice: Price
    },
    sellingPlanGroups: {
        edges: string[]
    }
}

interface Price {
    amount: string;
    currencyCode: string;
}

interface SelectedOption {
    name: string;
    value: string;
}


interface Media {
    alt: string;
    mediaContentType: string;
    previewImage: {
        altText: string;
        height: number;
        id: string;
        url: string;
    }
}

interface Variant {
    id: string;
    title: string;
    selectedOptions: SelectedOption[],
    price: Price,
    sellingPlanAllocations: {
        edges: string[]
    }
}

export interface Collections {
    collections: {
        data: {
            collectionByHandle: {
                id: string;
                title: string;
                description: string;
                handle: string;
                seo: Seo,
                products: {
                    edge: {
                        node: Product
                    }
                }
            }
        }
    }
}