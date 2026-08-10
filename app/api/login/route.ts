import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Garante valores de fallback caso as variáveis do .env não estejam carregadas
    const adminEmail = process.env.ADMIN_EMAIL || "admin@exemplo.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "123456";
    const authSecret = process.env.AUTH_SECRET || "fallback_secret_key_123456789";

    // Validação das credenciais
    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        { error: "E-mail ou senha incorretos" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
    });

    // Gravação segura do cookie
    response.cookies.set("admin_session", authSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 dia
    });

    return response;
  } catch (error) {
    console.error("Erro na rota de login:", error);

    return NextResponse.json(
      { error: "Erro interno no servidor ao tentar fazer login" },
      { status: 500 }
    );
  }
}