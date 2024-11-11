import { fetchUtils } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'

export const apiUrl = 'http://localhost:4200' // TODO: move to .env

export const dataProvider = simpleRestProvider(apiUrl)

dataProvider.getOne = async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`

    const res = await fetchUtils.fetchJson(url, {
        method: 'GET',
    })

    const contentType = res.headers.get('Content-Type')

    if (contentType && contentType.includes('image/jpeg')) {
        const name = res.headers.get('X-Additional-Data') || ''

        return { data: JSON.parse(name) }
    }

    return { data: res.json }
}

dataProvider.getList = async (resource, params = {}) => {
    const query = new URLSearchParams({
        ...params.filter, // параметры фильтрации
        _sort: params.sort?.field || '', // поле сортировки
        _order: params.sort?.order || '', // порядок сортировки
        _start:
            ((params?.pagination?.page || 1) - 1) *
            (params?.pagination?.perPage || 100), // начальный элемент для пагинации
        _end:
            (params?.pagination?.page || 1) *
            (params?.pagination?.perPage || 100), // конечный элемент для пагинации
    } as Record<string, string>) // Преобразуем все значения в строки

    const url = `${apiUrl}/${resource}?${query.toString()}`

    const res = await fetchUtils.fetchJson(url, {
        method: 'GET',
    })

    const { json, headers, body } = res

    const count = headers.get('X-Total-Count') || '0'
    const total = parseInt(count, 10)
    const data = JSON.parse(body)

    console.log(json, total, 'JSON')
    console.log(JSON.parse(body), 'BODY')
    return { data, total }
}

dataProvider.update = async (resource, params) => {
    let newdata

    if (params.data instanceof FormData) {
        newdata = params.data
    } else {
        newdata = JSON.stringify(params.data)
    }

    const url = `${apiUrl}/${resource}/${params.id}`
    const { json } = await fetchUtils.fetchJson(url, {
        method: 'PATCH',
        body: newdata,
    })
    return { data: json }
}

dataProvider.create = async (resource, params) => {
    let newdata

    if (params.data instanceof FormData) {
        newdata = params.data
    } else {
        newdata = JSON.stringify(params.data)
    }
    const url = `${apiUrl}/${resource}`

    const { json } = await fetchUtils.fetchJson(url, {
        method: 'POST',
        body: newdata,
    })

    return { data: json }
}
