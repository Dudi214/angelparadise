import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProdutoCard from "@/components/ProdutoCard";
import { Ship, Zap, Home } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Produto } from "@prisma/client";

// Força o Next.js a revalidar a rota no acesso e evita erros no build da Vercel
export const dynamic = "force-dynamic";

export default async function VendasPage() {
  // Busca direta no banco PostgreSQL via Prisma com tipagem explícita
  const itens: Produto[] = await prisma.produto.findMany({
    where: {
      tipo: "venda",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Filtros por categoria com tipagem no parâmetro e retorno
  const lanchas: Produto[] = itens.filter(
    (i: Produto) => i.categoria?.toLowerCase() === "lancha"
  );

  const jetski: Produto[] = itens.filter(
    (i: Produto) => i.categoria?.toLowerCase() === "jetski"
  );

  const imoveis: Produto[] = itens.filter(
    (i: Produto) =>
      i.categoria?.toLowerCase() === "casa" ||
      i.categoria?.toLowerCase() === "chale" ||
      i.categoria?.toLowerCase() === "terreno"
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfc]">
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2070"
            className="w-full h-full object-cover"
            alt="Vendas de Luxo"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#fcfcfc]"></div>
        </div>

        <div className="relative z-10 text-center px-6 mt-16">
          <span className="text-amber-400 font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4 block">
            Oportunidades Exclusivas
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
            Adquira seu Patrimônio em <br />
            <span className="italic font-light text-amber-200">
              Angra dos Reis
            </span>
          </h1>
        </div>
      </section>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        {/* LANCHAS À VENDA */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-amber-100 p-3 rounded-2xl text-amber-700">
              <Ship size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Lanchas à Venda
              </h2>
              <p className="text-slate-500">
                Embarcações revisadas e com documentação em dia.
              </p>
            </div>
          </div>

          {lanchas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {lanchas.map((item: Produto) => (
                <ProdutoCard key={item.id} produto={item} />
              ))}
            </div>
          ) : (
            <p className="text-slate-400 italic">
              Nenhuma lancha à venda no momento.
            </p>
          )}
        </section>

        {/* JET SKIS À VENDA */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-blue-100 p-3 rounded-2xl text-blue-700">
              <Zap size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Jet Skis à Venda
              </h2>
              <p className="text-slate-500">
                Modelos de alta performance para rápida negociação.
              </p>
            </div>
          </div>

          {jetski.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {jetski.map((item: Produto) => (
                <ProdutoCard key={item.id} produto={item} />
              ))}
            </div>
          ) : (
            <p className="text-slate-400 italic">
              Nenhum jet ski à venda no momento.
            </p>
          )}
        </section>

        {/* IMÓVEIS À VENDA */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-700">
              <Home size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Imóveis & Terrenos
              </h2>
              <p className="text-slate-500">
                Casas, chalés e terrenos de alto padrão na região.
              </p>
            </div>
          </div>

          {imoveis.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {imoveis.map((item: Produto) => (
                <ProdutoCard key={item.id} produto={item} />
              ))}
            </div>
          ) : (
            <p className="text-slate-400 italic">
              Nenhum imóvel disponível para venda no momento.
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}