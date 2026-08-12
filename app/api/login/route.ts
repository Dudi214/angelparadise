import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);

  if (bufA.length !== bufB.length) {
    return false;
  }

  return crypto.timingSafeEqual(bufA, bufB);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || !body.email || !body.password) {
      return NextResponse.json(
        { error: "E-mail e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const { email, password } = body;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const authSecret = process.env.AUTH_SECRET;

    if (!adminEmail || !adminPassword || !authSecret) {
      console.error(
        "Variáveis de ambiente (ADMIN_EMAIL, ADMIN_PASSWORD, AUTH_SECRET) não configuradas."
      );
      return NextResponse.json(
        { error: "Erro de configuração no servidor." },
        { status: 500 }
      );
    }

    const isEmailValid = safeCompare(email, adminEmail);
    const isPasswordValid = safeCompare(password, adminPassword);

    if (!isEmailValid || !isPasswordValid) {
      return NextResponse.json(
        { error: "E-mail ou senha incorretos." },
        { status: 401 }
      );
    }

    // Gera o token HMAC seguro
    const sessionToken = crypto
      .createHmac("sha256", authSecret)
      .update(adminEmail)
      .digest("hex");

    // Usa o helper nativo de cookies do Next.js
    const cookieStore = await cookies();
    cookieStore.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 horas
    });

    const response = NextResponse.json({ success: true });

    // Cabeçalhos anti-cache
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error("Erro na rota de login:", error);

    return NextResponse.json(
      { error: "Erro interno no servidor ao tentar fazer login." },
      { status: 500 }
    );
  }
}