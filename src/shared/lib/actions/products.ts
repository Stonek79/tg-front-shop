import { apiUrl } from '@/shared/lib/actions/dataProviders'

export const getProducts = async (
    resource: string,
    params?: {
        page?: number
        limit?: number
        sort?: { field: string; order: string }
        search?: string | undefined
        filter?: Record<string, string>
    },
) => {
    const query = new URLSearchParams({
        filter: params?.filter ? JSON.stringify(params.filter) : '', // параметры фильтрации
        _sort: params?.sort?.field || '', // поле сортировки
        _order: params?.sort?.order || '', // порядок сортировки
        _start: params?.page
            ? ((params.page - 1) * (params.limit || 10)).toString()
            : '', // начальный элемент для пагинации
        _end: params?.page
            ? (params.page * (params.limit || 10)).toString()
            : '', // конечный элемент для пагинации
    })

    const url = `${apiUrl}/${resource}?${query.toString()}`

    console.log(url)
    const res = await fetch(url)

    const data = await res.json()

    const { headers, body } = res

    console.log(data, 'BODY')
    const count = headers.get('X-Total-Count') || '0'
    const total = parseInt(count, 10)
    return { data, total }
}

export const getProduct = async (source: string, id: string) => {
    const url = `${apiUrl}/${source}/${id}`

    try {
        const res = await fetch(url)
        return await res.json()
    } catch (e) {
        console.log('GET PRODUCT ERROR:', e)
    }
}
