import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProdutoCard from "@/components/ProdutoCard";
import { Ship, Home, Zap } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Produto } from "@prisma/client";

// Força o Next.js a revalidar a rota no acesso e evita erros no build da Vercel
export const dynamic = "force-dynamic";

export default async function AlugueisPage() {
  // Busca direta no banco com tipagem explícita no retorno
  const itens: Produto[] = await prisma.produto.findMany({
    where: {
      tipo: "aluguel",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Filtros por categoria com tipagem no retorno e no parâmetro
  const lanchas: Produto[] = itens.filter(
    (i: Produto) => i.categoria?.toLowerCase() === "lancha"
  );
  const imoveis: Produto[] = itens.filter(
    (i: Produto) =>
      i.categoria?.toLowerCase() === "casa" ||
      i.categoria?.toLowerCase() === "chale"
  );
  const jetski: Produto[] = itens.filter(
    (i: Produto) => i.categoria?.toLowerCase() === "jetski"
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfc]">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070"
            className="w-full h-full object-cover"
            alt="Background Luxo"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#fcfcfc]"></div>
        </div>

        <div className="relative z-10 text-center px-6 mt-20">
          <span className="text-teal-400 font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4 block animate-bounce">
            Experiências Exclusivas
          </span>
          <h1 className="text-4xl md:text-7xl font-serif text-white mb-6">
            O Luxo de Viver <br />{" "}
            <span className="italic font-light text-teal-200">
              Angra dos Reis
            </span>
          </h1>

          {/* Menu de Navegação Rápida */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <a
              href="#lanchas"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition-all text-sm font-medium"
            >
              Lanchas
            </a>
            <a
              href="#imoveis"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition-all text-sm font-medium"
            >
              Casas & Chalés
            </a>
            <a
              href="#jetski"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition-all text-sm font-medium"
            >
              Jet Skis
            </a>
          </div>
        </div>
      </section>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="flex-grow">
        {/* SEÇÃO: LANCHAS */}
        <section id="lanchas" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-teal-100 p-3 rounded-2xl text-teal-700">
              <Ship size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Aluguel de Lanchas
              </h2>
              <p className="text-slate-500">
                Embarcações de alto padrão com marinheiro incluso.
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
              Nenhuma lancha disponível no momento.
            </p>
          )}
        </section>

        {/* BANNER INTERMEDIÁRIO */}
        <div className="w-full bg-slate-900 py-16 px-6 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-light mb-4">
            Procura algo{" "}
            <span className="text-teal-400 font-bold">Personalizado?</span>
          </h3>
          <p className="text-slate-400 mb-8">
            Fale com nossos especialistas e monte seu roteiro sob medida.
          </p>
          <a
            href="https://wa.me/SEUNUMERO"
            target="_blank"
            className="inline-block bg-teal-600 hover:bg-teal-500 px-10 py-4 rounded-full font-bold transition-all shadow-lg shadow-teal-900/20"
          >
            Chamar no WhatsApp
          </a>
        </div>

        {/* SEÇÃO: CASAS E CHALÉS */}
        <section id="imoveis" className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12 justify-end text-right">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">
                  Casas e Chalés
                </h2>
                <p className="text-slate-500">
                  Sua casa fora de casa, com o pé na areia.
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-2xl text-amber-700">
                <Home size={32} />
              </div>
            </div>

            {imoveis.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {imoveis.map((item: Produto) => (
                  <ProdutoCard key={item.id} produto={item} />
                ))}
              </div>
            ) : (
              <p className="text-slate-400 italic text-right">
                Aguardando novas propriedades.
              </p>
            )}
          </div>
        </section>

        {/* SEÇÃO: JET SKIS */}
        <section id="jetski" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-blue-100 p-3 rounded-2xl text-blue-700">
              <Zap size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Jet Skis</h2>
              <p className="text-slate-500">Diversão e velocidade garantidas.</p>
            </div>
          </div>

          {jetski.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {jetski.map((item: Produto) => (
                <ProdutoCard key={item.id} produto={item} />
              ))}
            </div>
          ) : (
            <p className="text-slate-400 italic">
              Nenhum jet ski disponível no momento.
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}