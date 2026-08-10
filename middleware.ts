import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("admin_session")?.value;
  const { pathname } = request.nextUrl;

  // Protege toda a área administrativa em /adm
  if (pathname.startsWith("/adm") && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redireciona quem já está logado e tenta acessar a tela de login
  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/adm", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/adm/:path*", "/login"],
};