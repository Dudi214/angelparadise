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

  // Validação rigorosa: verifica se o cookie existe E se o valor coincide com o AUTH_SECRET
  if (!session || !authSecret || session !== authSecret) {
    // Apaga o cookie corrompido/antigo do navegador automaticamente
    cookieStore.delete("admin_session");
    redirect("/login");
  }

  return <AdminClientLayout />;
}