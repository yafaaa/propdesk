import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from './lib/session';

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session')?.value;
  const payload = await verifySession(sessionToken);

  if (!payload) {
    if (request.nextUrl.pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // RBAC checks
  const role = payload.role as string;
  const path = request.nextUrl.pathname;
  if ((role === 'UNIT_OWNER' || role === 'TENANT') && (path.startsWith('/admin') || path.startsWith('/maintenance'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (role === 'STAFF' && (path.startsWith('/admin') || path.startsWith('/resident'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (role === 'ADMIN' && (path.startsWith('/resident') || path.startsWith('/maintenance'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-workspace-id', payload.workspaceId as string);
  requestHeaders.set('x-user-id', payload.userId as string);
  requestHeaders.set('x-user-role', role);

  if (payload.unitId) {
    requestHeaders.set('x-user-unit-id', payload.unitId as string);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
