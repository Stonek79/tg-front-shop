import { Product } from '@/types/product'
import useSWRInfinite from 'swr/infinite'
import { apiUrl } from '@/shared/consts/urls'

interface ProductsResponse {
    products: Product[]
    total: number
}

const fetcher = async (url: string) => {
    const response = await fetch(url)
    const data = await response.json()
    const total = parseInt(response.headers.get('X-Total-Count') || '0', 10)
    return { products: data, total }
}

// Custom hook with SWRInfinite
export const useGetProducts = (
    initialData: ProductsResponse | null,
    limit: number,
    filter: Record<string, string>,
    sort?: { field: string; order: string } | undefined,
) => {
    const getKey = (pageIndex: number, previousPageData: ProductsResponse) => {
        if (previousPageData && !previousPageData.products.length) return null
        const query = new URLSearchParams({
            filter: JSON.stringify(filter),
            _sort: sort?.field || '',
            _order: sort?.order || '',
            _start: (pageIndex * limit).toString(),
            _end: ((pageIndex + 1) * limit).toString(),
        })
        return `${apiUrl}/products?${query.toString()}`
    }

    const { data, size, setSize, isLoading, isValidating } = useSWRInfinite(
        getKey,
        fetcher,
        {
            initialSize: 1,
            fallbackData: initialData ? [initialData] : undefined,
            revalidateOnFocus: false,
        },
    )

    const products = data?.flatMap((page) => page.products) ?? []
    const total = data?.[0]?.total || 0

    return { products, total, size, setSize, isLoading, isValidating }
}
