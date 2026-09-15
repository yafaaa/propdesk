import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  // Read role from cookie
  const roleCookie = request.cookies.get('user-role');
  const role = roleCookie?.value;

  // Protect routes based on role
  if (!role) {
    if (request.nextUrl.pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // If trying to access login while logged in, redirect to root
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // RBAC checks
  const path = request.nextUrl.pathname;
  if (role === 'RESIDENT' && (path.startsWith('/admin') || path.startsWith('/maintenance'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (role === 'STAFF' && (path.startsWith('/admin') || path.startsWith('/resident'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (role === 'ADMIN' && (path.startsWith('/resident') || path.startsWith('/maintenance'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Inject workspace context (mocked for now, but in real app read from session/cookies)
  const workspaceId = request.cookies.get('workspace-id')?.value || 'demo-workspace-id';
  const userId = request.cookies.get('user-id')?.value || `demo-${role.toLowerCase()}-id`;
  const unitId = request.cookies.get('unit-id')?.value;

  requestHeaders.set('x-workspace-id', workspaceId);
  requestHeaders.set('x-user-id', userId);
  requestHeaders.set('x-user-role', role);

  if (unitId) {
    requestHeaders.set('x-user-unit-id', unitId);
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
