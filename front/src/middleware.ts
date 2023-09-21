"use server";

import { NextRequest, NextResponse } from "next/server";
import { getRoles, verifyJwtToken } from "@/libs/auth";

const AUTH_PAGES = ["/auth/connexion", "/auth/inscription"];

const isAuthPages = (url: string) => AUTH_PAGES.some((page) => page.startsWith(url));

export async function middleware(request: NextRequest) {
  const { url, nextUrl, cookies } = request;
  const { value: token } = cookies.get("token") ?? { value: null };

  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }

    const response = NextResponse.redirect(new URL(`/`, url));
    return response;
  }

  if (!hasVerifiedToken) {
    console.log("redirect to login :", token);
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);

    const response = NextResponse.redirect(
      new URL(`/auth/connexion?${searchParams}`, url)
    );
    response.cookies.delete("token");

    return response;
  }

  // check roles : 
    // admin => /admin
    // user => /front
    const roles = getRoles(token);

    if (roles.includes("admin") && nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.next();
    }

    if (roles.includes("user") && nextUrl.pathname.startsWith("/front")) {
      return NextResponse.next();
    }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/front/:path*"
  ]
};