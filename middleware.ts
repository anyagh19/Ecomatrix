// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const runtime = 'nodejs';

export async function middleware(req: NextRequest) {
  // Get token from cookies
  const token = req.cookies.get('accessToken')?.value;
  // console.log("token", token)
  if (!token) {
    return NextResponse.redirect(new URL('/sign-up', req.url)); // redirect if no token
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { _id: string };
    // console.log("decoded", decoded)
    // Optionally, attach userId to headers for server-side use
    const res = NextResponse.next();
    res.headers.set('x-user-id', decoded._id);

    return res;
  } catch (err) {
    // Invalid or expired token
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
}

// Specify which routes the middleware applies to
export const config = {
  matcher: ['/dashboard/:path*', '/inventory/:path*'], // protect these routes
};
