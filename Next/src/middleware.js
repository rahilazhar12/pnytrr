import { NextResponse } from 'next/server';

export function middleware(req) {
  const { nextUrl: url } = req;

  // Check if the URL contains a query string
  if (url.search) {
    // Construct absolute URL for the redirect
    const redirectUrl = new URL('/404', url.origin);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
