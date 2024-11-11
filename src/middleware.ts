import { NextResponse } from 'next/server'

export function middleware(request: { nextUrl: { pathname: any } }) {
    const pathname = request.nextUrl.pathname
    // Вы можете добавить pathname в cookies, headers или как подходит в вашем случае
    const response = NextResponse.next()
    response.cookies.set('pathname', pathname)

    return response
}
