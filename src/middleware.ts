import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./helpers";

export const middleware = (request: NextRequest) => {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/register";

  if (isPublicPath && isAuthenticated(request)) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !isAuthenticated(request)) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
};

export const config = {
  matcher: ["/", "/login", "/register"],
};
