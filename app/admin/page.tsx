import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, timingSafeEqual } from "crypto";
import AdminClientLayout from "./AdminClientLayout";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session")?.value;

  const authSecret = process.env.AUTH_SECRET;
  const adminEmail = process.env.ADMIN_EMAIL;

  // 1. Se faltar o cookie de sessão ou as variáveis de ambiente, bloqueia o acesso
  if (!sessionCookie || !authSecret || !adminEmail) {
    redirect("/login");
  }

  // 2. Calcula exatamente o mesmo token HMAC gerado na rota /api/login
  const expectedToken = createHmac("sha256", authSecret)
    .update(adminEmail)
    .digest("hex");

  // 3. Converte para Buffers para comparação segura contra Timing Attacks
  const sessionBuffer = Buffer.from(sessionCookie);
  const expectedBuffer = Buffer.from(expectedToken);

  const isValid =
    sessionBuffer.length === expectedBuffer.length &&
    timingSafeEqual(sessionBuffer, expectedBuffer);

  // 4. Se o token não for válido, redireciona para a página de login
  if (!isValid) {
    redirect("/login");
  }

  return <AdminClientLayout />;
}