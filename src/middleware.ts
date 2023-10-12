import { NextRequest, NextResponse } from 'next/server'
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const smsSession = request.cookies.get('sms-session')?.value
    const req = await fetch(process.env.APP_URL + "api/auth", { method: "POST", body: JSON.stringify({ token: smsSession }) })
    const res = await req.json()

    if (res.success && res.data.role === 'ADMIN' && !pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    if (res.success && pathname === '/admin/login') {
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    if (!res.success && pathname !== '/admin/login') {
        return NextResponse.redirect(new URL('/admin/login', request.url))
    }
}
export const config = { matcher: '/((?!api|_next/static|_next/image|favicon.ico|assets).*)', };