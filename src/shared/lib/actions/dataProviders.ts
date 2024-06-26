import { DataProvider, fetchUtils } from 'react-admin'
import { stringify } from 'query-string'

const apiUrl = 'https://dummyjson.com'
const httpClient = fetchUtils.fetchJson

export const DataProviders: DataProvider = {
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination
        const { field, order } = params.sort
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        }
        const url = `${apiUrl}/${resource}?skip=${(page - 1) * perPage}&limit=${perPage}&search=${query.filter}`

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'default',
        })

        const list = await res.json()

        console.log('products: ', list)
        return { data: list[`${resource}`], total: list.total }
    },

    getOne: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`
        console.log(url, 'URL')
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'default',
        })

        const data = await res.json()
        console.log('ITEM: ', data)
        return { data }
    },

    getMany: async (resource, params) => {
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        }
        const url = `${apiUrl}/${resource}?${stringify(query)}`
        const { json } = await httpClient(url)
        return { data: json }
    },

    getManyReference: async (resource, params) => {
        const { page, perPage } = params.pagination
        const { field, order } = params.sort
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        }
        const url = `${apiUrl}/${resource}?${stringify(query)}`
        const { json, headers } = await httpClient(url)
        return {
            data: json,
            total: parseInt(
                headers!.get('content-range')!.split('/').pop()!,
                10,
            ),
        }
    },

    create: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        })
        return { data: json }
    },

    update: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`
        const { json } = await httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        })
        return { data: json }
    },

    updateMany: async (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        }
        const url = `${apiUrl}/${resource}?${stringify(query)}`
        const { json } = await httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        })
        return { data: json }
    },

    delete: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`
        const { json } = await httpClient(url, {
            method: 'DELETE',
        })
        return { data: json }
    },

    deleteMany: async (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        }
        const url = `${apiUrl}/${resource}?${stringify(query)}`
        const { json } = await httpClient(url, {
            method: 'DELETE',
            body: JSON.stringify(params),
        })
        return { data: json }
    },
}
