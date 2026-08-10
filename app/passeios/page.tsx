import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PasseioCard from "@/components/PasseioCard";
import { prisma } from "@/lib/prisma";
import { Produto } from "@prisma/client";

// Força a página a carregar dados atualizados no acesso e impede erro no build da Vercel
export const dynamic = "force-dynamic";

export default async function PasseiosPage() {
  // Busca direta no banco de dados via Prisma com tipagem explícita
  const passeios: Produto[] = await prisma.produto.findMany({
    where: {
      tipo: "passeio",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Filtros com tipagem no parâmetro e no retorno
  const jetski: Produto[] = passeios.filter(
    (p: Produto) => p.categoria?.toLowerCase() === "jetski"
  );

  const lancha: Produto[] = passeios.filter(
    (p: Produto) => p.categoria?.toLowerCase() === "lancha"
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* TÍTULO DA PÁGINA */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-light text-slate-800">
              Nossos <span className="font-bold text-teal-600">Passeios</span>
            </h1>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4"></div>
          </div>

          {/* SEÇÃO: JET SKI */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold mb-10 text-slate-700 border-l-4 border-teal-500 pl-4 uppercase tracking-wider">
              Passeio Jet Ski
            </h2>

            {jetski.length === 0 ? (
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-10 text-center">
                <p className="text-gray-400">Nenhum jet ski disponível no momento.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 p-2">
                {jetski.map((p: Produto) => (
                  <div key={p.id} className="transition-all duration-300 hover:-translate-y-2">
                    <PasseioCard passeio={p} />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* SEÇÃO: LANCHA */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold mb-10 text-slate-700 border-l-4 border-cyan-500 pl-4 uppercase tracking-wider">
              Passeio de Lanchas
            </h2>

            {lancha.length === 0 ? (
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-10 text-center">
                <p className="text-gray-400">Nenhuma lancha disponível no momento.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 p-2">
                {lancha.map((p: Produto) => (
                  <div key={p.id} className="transition-all duration-300 hover:-translate-y-2">
                    <PasseioCard passeio={p} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}