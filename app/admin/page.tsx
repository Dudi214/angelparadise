import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminClientLayout from "./AdminClientLayout";

// Força o Next.js a ler a requisição do zero a cada acesso (sem cache)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  const authSecret = process.env.AUTH_SECRET;

  // Validação rigorosa
  if (!session || !authSecret || session !== authSecret) {
    // Redireciona direto para a tela de login se a sessão for inválida
    redirect("/login");
  }

  return <AdminClientLayout />;
}