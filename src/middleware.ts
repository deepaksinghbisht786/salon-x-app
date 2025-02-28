import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Fixed the typo in 'customer' and expanded the public paths check
  const isPublicPath = path === '/auth/customer/login' || 
                      path === '/auth/customer/signup' || 
                      path === '/home'
  
  const token = request.cookies.get('token')?.value || ''
  

  console.log(`Path: ${path}, Public: ${isPublicPath}, Token exists: ${!!token}`)
  
  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/home', request.nextUrl))
  }
  
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/customer/login', request.nextUrl))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/profile',
    '/home',
    '/auth/customer/login',
    '/auth/customer/signup',
    '/verifyemail'
  ]
}