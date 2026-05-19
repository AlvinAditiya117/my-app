import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

type NextMiddlewareFn = (
  req: NextRequest,
  event: NextFetchEvent,
) => Promise<NextResponse | Response | undefined> | NextResponse | Response | undefined;

const hanyaAdmin = ["/admin"];

export default function withAuth(
  middleware: NextMiddlewareFn,
  requireAuth: string[] = [],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    // cek apakah pathname dimulai dengan salah satu path yang diproteksi
    const isProtected = requireAuth.some((path) => pathname.startsWith(path));

    if (isProtected) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        // pastikan nama cookie sesuai environment
        cookieName:
          process.env.NODE_ENV === "production"
            ? "__Secure-next-auth.session-token"
            : "next-auth.session-token",
      });

      console.log("TOKEN:", JSON.stringify(token), "| PATHNAME:", pathname);

      if (!token) {
        // Bagian 5 – redirect ke login dengan callbackUrl
        const Url = new URL("/auth/login", req.url);
        Url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(Url);
      }

      // Bagian 6 – jika bukan admin dan akses halaman admin → redirect ke home
      const isAdminPath = hanyaAdmin.some((path) => pathname.startsWith(path));
      if (token.role !== "admin" && isAdminPath) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return middleware(req, next);
  };
}
