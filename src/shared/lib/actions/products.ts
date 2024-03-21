import { Product } from '@/types/product'

export const getProducts = async (
    url: string,
    options?: {
        page?: number
        limit?: number
        search?: string | undefined
        store?: RequestCache
    },
) => {
    const {
        page = 0,
        limit = 10,
        search = '',
        store = 'default',
    } = options || {}

    const res = await fetch(
        `${url}?skip=${page * limit}&limit=${limit}&search=${search}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: store,
        },
    )

    const products: { products: Product[] } = await res.json()

    return products.products
}

export const getProduct = async (url: string, id: string) => {
    const res = await fetch(`${url}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return await res.json()
}
