import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole } from "@/types/enums/UserRole";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value;
  const adminRoutes = [
    "/courses/add",
    "/courses/edit",
    "/instructor",
    "/student",
  ];

  const isAdmin = role === UserRole.ADMIN || role === UserRole.MANAGER;
  const isAdminRoute = adminRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (!isAdmin && isAdminRoute) {
    return NextResponse.redirect(new URL("/not-found", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/courses/:path*", "/instructor", "/student"],
};
