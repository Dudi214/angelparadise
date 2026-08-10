import { prisma } from "@/lib/prisma";

// GET
export async function GET() {
  try {
    const vendas = await prisma.produto.findMany({
      where: {
        tipo: "venda",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      data: vendas,
    });
  } catch (error) {
    console.log("ERRO GET:", error);

    return Response.json(
      { error: "Erro ao buscar vendas" },
      { status: 500 }
    );
  }
}

// POST
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const categoriasValidas = [
      "lancha",
      "jetski",
      "casa",
      "chale",
    ];

    if (!categoriasValidas.includes(body.categoria)) {
      return Response.json(
        {
          error:
            "Categoria inválida. Use lancha, jetski, casa ou chale.",
        },
        { status: 400 }
      );
    }

    const produto = await prisma.produto.create({
      data: {
        titulo: body.titulo,
        preco: Number(body.preco),
        descricao: body.descricao,
        tipo: "venda",
        categoria: body.categoria,
        imagens: body.imagens || [],
      },
    });

    return Response.json({
      data: produto,
    });
  } catch (error) {
    console.log("ERRO POST:", error);

    return Response.json(
      { error: "Erro ao criar venda" },
      { status: 500 }
    );
  }
}