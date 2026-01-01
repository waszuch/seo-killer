import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSiteConfig } from '@/lib/config';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    try {
      const config = getSiteConfig();
      
      if (!config.admin?.enabled) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      console.error('Error checking admin config:', error);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};

