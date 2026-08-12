import { NextResponse } from "next/server";
import crypto from "crypto";

// 1. Desativa completamente o cache da rota na Vercel e no Next.js
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Função de comparação segura para impedir ataques de tempo (Timing Attacks)
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
    // Trata erros de JSON malformado na requisição
    const body = await req.json().catch(() => null);

    if (!body || !body.email || !body.password) {
      return NextResponse.json(
        { error: "E-mail e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const { email, password } = body;

    // Busca variáveis de ambiente
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const authSecret = process.env.AUTH_SECRET;

    if (!adminEmail || !adminPassword || !authSecret) {
      console.error(
        "Variáveis de ambiente (ADMIN_EMAIL, ADMIN_PASSWORD, AUTH_SECRET) não configuradas."
      );
      return NextResponse.json(
        { error: "Erro de configuração no servidor. Verifique as variáveis de ambiente." },
        { status: 500 }
      );
    }

    // Validação segura de credenciais
    const isEmailValid = safeCompare(email, adminEmail);
    const isPasswordValid = safeCompare(password, adminPassword);

    if (!isEmailValid || !isPasswordValid) {
      return NextResponse.json(
        { error: "E-mail ou senha incorretos." },
        { status: 401 }
      );
    }

    // Gera um token seguro em vez de expor o AUTH_SECRET puro no cookie
    const sessionToken = crypto
      .createHmac("sha256", authSecret)
      .update(`${adminEmail}:${Date.now()}`)
      .digest("hex");

    const response = NextResponse.json({
      success: true,
    });

    // 2. Aplica cabeçalhos rígidos para bloquear cache no navegador/dispositivo
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    // Gravação segura do cookie de sessão
    response.cookies.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 horas
    });

    return response;
  } catch (error) {
    console.error("Erro na rota de login:", error);

    return NextResponse.json(
      { error: "Erro interno no servidor ao tentar fazer login." },
      { status: 500 }
    );
  }
}