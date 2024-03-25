export const fetcher = (
    url: string,
    init?: {
        headers?: {
            'Content-Type': string
            'Access-Control-Allow-Origin'?: string
            'Access-Control-Allow-Methods'?: string
        }
        method: string | 'GET'
        body: string
    },
) => fetch(url, init).then((res) => res.json())
