import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the request headers so they are available to Server Components via headers()
  const requestHeaders = new Headers(request.headers);

  // Mock injecting workspace context
  requestHeaders.set('x-workspace-id', 'demo-workspace-id');
  requestHeaders.set('x-user-id', 'demo-user-id');

  // Determine mock role based on URL path for easier testing
  let mockRole = 'ADMIN';
  if (request.nextUrl.pathname.startsWith('/resident')) {
    mockRole = 'RESIDENT';
    requestHeaders.set('x-user-unit-id', 'demo-unit-101');
  } else if (request.nextUrl.pathname.startsWith('/maintenance')) {
    mockRole = 'STAFF';
  }

  requestHeaders.set('x-user-role', mockRole);

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
