import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Busca as variáveis diretamente do ambiente (sem credenciais de fallback genéricas)
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const authSecret = process.env.AUTH_SECRET;

    // Se as variáveis de ambiente não estiverem configuradas na Vercel
    if (!adminEmail || !adminPassword || !authSecret) {
      console.error("Variáveis de ambiente (ADMIN_EMAIL, ADMIN_PASSWORD, AUTH_SECRET) não configuradas.");
      return NextResponse.json(
        { error: "Erro de configuração no servidor. Verifique as variáveis de ambiente." },
        { status: 500 }
      );
    }

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

    // Gravação segura do cookie com expiração automática (ex: 8 horas)
    response.cookies.set("admin_session", authSecret, {
      httpOnly: true, // Protege contra scripts maliciosos (XSS)
      secure: process.env.NODE_ENV === "production", // Garante envio via HTTPS na Vercel
      sameSite: "lax",
      path: "/", // Válido em todo o site
      maxAge: 60 * 60 * 8, // Expirar e apagar do navegador automaticamente após 8 horas
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