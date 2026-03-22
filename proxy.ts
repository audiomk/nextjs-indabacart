import NextAuth from 'next-auth'
import authConfig from './auth.config'
import { NextResponse } from 'next/server'
import { i18n } from './i18n-config'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { pathname } = req.nextUrl

  const localeCodes = i18n.locales.map((l) => l.code)

  const pathnameHasLocale = localeCodes.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (!pathnameHasLocale) {
    const locale = i18n.defaultLocale
    req.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(req.nextUrl)
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
