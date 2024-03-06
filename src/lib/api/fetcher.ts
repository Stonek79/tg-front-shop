export const fetcher = (
    url: string,
    init?: {
        headers?: { 'Content-Type': string }
        method: string | 'GET'
        body: string
    },
) => fetch(url, init).then((res) => {
    console.log(res, 'RESPONSE')
    return res.json()
})
