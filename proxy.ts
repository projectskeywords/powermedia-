import { NextRequest, NextResponse } from 'next/server'

const LOCALES = ['ro', 'ru', 'en']
const DEFAULT_LOCALE = 'ro'
const ADMIN_COOKIE = 'pm_admin'
const ADMIN_LOGIN_PATH = '/admin/login'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Admin protection ──────────────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    if (pathname === ADMIN_LOGIN_PATH) return // allow login page always

    const token = request.cookies.get(ADMIN_COOKIE)?.value
    const validToken = process.env.ADMIN_SECRET

    if (!validToken || token !== validToken) {
      const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
    return // authenticated — allow through
  }

  // ── i18n redirect ─────────────────────────────────────────────────────────
  const hasLocale = LOCALES.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  )
  if (!hasLocale) {
    return NextResponse.redirect(
      new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
