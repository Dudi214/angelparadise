"use client";

import { useEffect, useState } from "react";
import {
  Ship,
  Home,
  ShoppingBag,
  Package,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

type Produto = {
  id: string;
  titulo: string;
  preco: number;
  tipo: string;
  categoria: string;
  imagens: string[];
  createdAt: string;
};

type DashboardData = {
  estatisticas: {
    totalProdutos: number;
    totalPasseios: number;
    totalAlugueis: number;
    totalVendas: number;
    valorCatalogo: number;
  };

  categorias: {
    categoria: string;
    quantidade: number;
  }[];

  recentes: Produto[];
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  async function carregarDashboard() {
    try {
      setLoading(true);

      const res = await fetch("/api/dashboard", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Erro ao carregar dashboard");
      }

      const json = await res.json();

      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDashboard();
  }, []);

  const formatarPreco = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const nomeTipo = (tipo: string) => {
    switch (tipo) {
      case "passeio":
        return "Passeio";

      case "aluguel":
        return "Aluguel";

      case "venda":
        return "Venda";

      default:
        return tipo;
    }
  };

  const nomeCategoria = (categoria: string) => {
    switch (categoria) {
      case "jetski":
        return "Jet Ski";

      case "lancha":
        return "Lancha";

      case "casa":
        return "Casa";

      case "chale":
        return "Chalé";

      default:
        return categoria;
    }
  };

  const maiorQuantidade =
    data?.categorias.reduce(
      (maior, item) => Math.max(maior, item.quantidade),
      0
    ) || 1;

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="animate-spin text-teal-600" size={32} />

          <p className="text-sm text-slate-500">
            Carregando dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <p className="text-slate-500">
          Não foi possível carregar o dashboard.
        </p>

        <button
          onClick={carregarDashboard}
          className="mt-4 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-600">
            ANGEL PARADISE
          </p>

          <h1 className="mt-1 text-2xl font-black text-slate-900 md:text-3xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Visão geral do seu catálogo.
          </p>
        </div>

        <button
          onClick={carregarDashboard}
          className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <RefreshCw size={17} />
          Atualizar
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* TOTAL */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Produtos
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {data.estatisticas.totalProdutos}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
              <Package size={23} className="text-slate-700" />
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Total no catálogo
          </p>
        </div>

        {/* PASSEIOS */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Passeios
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {data.estatisticas.totalPasseios}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
              <Ship size={23} className="text-teal-600" />
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Experiências cadastradas
          </p>
        </div>

        {/* ALUGUEIS */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Aluguéis
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {data.estatisticas.totalAlugueis}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Home size={23} className="text-blue-600" />
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Itens disponíveis
          </p>
        </div>

        {/* VENDAS */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Vendas
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {data.estatisticas.totalVendas}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
              <ShoppingBag size={23} className="text-amber-600" />
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Produtos à venda
          </p>
        </div>
      </div>

      {/* VALOR DO CATÁLOGO */}
      <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">
              Valor total do catálogo
            </p>

            <p className="mt-2 text-3xl font-black md:text-4xl">
              {formatarPreco(data.estatisticas.valorCatalogo)}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Soma dos preços cadastrados no sistema.
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <TrendingUp size={28} />
          </div>
        </div>
      </div>

      {/* GRÁFICOS + CATEGORIAS */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* CATEGORIAS */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Produtos por categoria
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Distribuição atual do catálogo.
            </p>
          </div>

          <div className="space-y-5">
            {data.categorias.length === 0 ? (
              <p className="text-sm text-slate-400">
                Nenhuma categoria cadastrada.
              </p>
            ) : (
              data.categorias.map((item) => {
                const porcentagem =
                  (item.quantidade / maiorQuantidade) * 100;

                return (
                  <div key={item.categoria}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">
                        {nomeCategoria(item.categoria)}
                      </span>

                      <span className="text-sm font-bold text-slate-900">
                        {item.quantidade}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-teal-600 transition-all"
                        style={{
                          width: `${porcentagem}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RESUMO */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Resumo do catálogo
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Quantidade por tipo.
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-teal-50 p-4">
              <div className="flex items-center gap-3">
                <Ship size={20} className="text-teal-600" />

                <span className="font-semibold text-slate-700">
                  Passeios
                </span>
              </div>

              <strong className="text-lg text-teal-700">
                {data.estatisticas.totalPasseios}
              </strong>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-blue-50 p-4">
              <div className="flex items-center gap-3">
                <Home size={20} className="text-blue-600" />

                <span className="font-semibold text-slate-700">
                  Aluguéis
                </span>
              </div>

              <strong className="text-lg text-blue-700">
                {data.estatisticas.totalAlugueis}
              </strong>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-amber-50 p-4">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-amber-600" />

                <span className="font-semibold text-slate-700">
                  Vendas
                </span>
              </div>

              <strong className="text-lg text-amber-700">
                {data.estatisticas.totalVendas}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* RECENTES */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Últimos cadastrados
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Os produtos adicionados mais recentemente.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {data.recentes.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-400">
              Nenhum produto cadastrado.
            </div>
          ) : (
            data.recentes.map((produto) => (
              <div
                key={produto.id}
                className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5"
              >
                {/* IMAGEM */}
                <div className="h-20 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-20 sm:w-24">
                  <img
                    src={
                      produto.imagens?.[0] ||
                      "/placeholder.jpg"
                    }
                    alt={produto.titulo}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* INFORMAÇÕES */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-bold text-slate-800">
                    {produto.titulo}
                  </h3>

                  <div className="mt-1 flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase text-slate-600">
                      {nomeTipo(produto.tipo)}
                    </span>

                    <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-bold uppercase text-teal-700">
                      {nomeCategoria(produto.categoria)}
                    </span>
                  </div>
                </div>

                {/* PREÇO */}
                <div className="text-left sm:text-right">
                  <p className="font-black text-slate-900">
                    {formatarPreco(produto.preco)}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {new Date(
                      produto.createdAt
                    ).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}