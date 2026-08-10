import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// Define o tipo exato baseado no retorno do groupBy do seu model Produto
type CategoriaGroup = Prisma.ProdutoGroupByOutputType;

export async function GET() {
  try {
    const [
      totalProdutos,
      totalPasseios,
      totalAlugueis,
      totalVendas,
      recentes,
      categorias,
    ] = await Promise.all([
      prisma.produto.count(),

      prisma.produto.count({
        where: {
          tipo: "passeio",
        },
      }),

      prisma.produto.count({
        where: {
          tipo: "aluguel",
        },
      }),

      prisma.produto.count({
        where: {
          tipo: "venda",
        },
      }),

      prisma.produto.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 6,
        select: {
          id: true,
          titulo: true,
          preco: true,
          tipo: true,
          categoria: true,
          imagens: true,
          createdAt: true,
        },
      }),

      prisma.produto.groupBy({
        by: ["categoria"],
        _count: {
          categoria: true,
        },
      }),
    ]);

    const totalValor = await prisma.produto.aggregate({
      _sum: {
        preco: true,
      },
    });

    return Response.json({
      estatisticas: {
        totalProdutos,
        totalPasseios,
        totalAlugueis,
        totalVendas,
        valorCatalogo: totalValor._sum.preco || 0,
      },

      // 🔥 Tipagem aplicada no item para resolver o erro do build
     // Altere esta parte:
       categorias: categorias.map((item: CategoriaGroup) => ({
       categoria: item.categoria,
       quantidade: item._count?.categoria ?? 0, // 🔥 ?. e ?? 0 garantem que nunca dará erro de null
      })),

      recentes,
    });
  } catch (error) {
    console.error("ERRO DASHBOARD:", error);

    return Response.json(
      {
        error: "Erro ao carregar dashboard",
      },
      {
        status: 500,
      }
    );
  }
}