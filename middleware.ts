import { NextRequest, NextResponse } from "next/server";

const BASIC_AUTH_USER = process.env.BLOG_ADMIN_USERNAME || "owner";
const BASIC_AUTH_PASS = process.env.BLOG_ADMIN_PASSWORD;

function unauthorizedResponse() {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Blog Admin"',
    },
  });
}

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  if (!BASIC_AUTH_PASS) {
    return NextResponse.next();
  }

  const authorization = request.headers.get("authorization");
  if (!authorization) {
    return unauthorizedResponse();
  }

  const [scheme, encoded] = authorization.split(" ");
  if (scheme !== "Basic" || !encoded) {
    return unauthorizedResponse();
  }

  const decoded = atob(encoded);
  const [user, password] = decoded.split(":");

  if (user === BASIC_AUTH_USER && password === BASIC_AUTH_PASS) {
    return NextResponse.next();
  }

  return unauthorizedResponse();
}

export const config = {
  matcher: ["/blog/admin", "/blog/admin/:path*"],
};
