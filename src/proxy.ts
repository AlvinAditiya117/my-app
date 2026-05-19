import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const hanyaAdmin = ["/admin"];
const hanyaEditor = ["/editor"];
const requireAuth = ["/produk", "/admin", "/profile", "/editor"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isProtected = requireAuth.some((path) => pathname.startsWith(path));

  if (isProtected) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      cookieName:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
    });

    if (!token) {
      // Bagian 5 – belum login → redirect ke login dengan callbackUrl
      const Url = new URL("/auth/login", request.url);
      Url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(Url);
    }

    // Bagian 6 – sudah login tapi bukan admin → tidak boleh akses /admin
    const isAdminPath = hanyaAdmin.some((path) => pathname.startsWith(path));
    if (token.role !== "admin" && isAdminPath) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Tugas 1 – role editor: hanya editor & admin yang boleh akses /editor
    const isEditorPath = hanyaEditor.some((path) => pathname.startsWith(path));
    if (token.role !== "editor" && token.role !== "admin" && isEditorPath) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/produk/:path*", "/admin/:path*", "/profile/:path*", "/editor/:path*"],
};
