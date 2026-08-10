import { prisma } from "@/lib/prisma";

// GET
export async function GET() {
  try {
    const passeios = await prisma.produto.findMany({
      where: { tipo: "passeio" },
      orderBy: { createdAt: "desc" },
    });

    return Response.json({ data: passeios });
  } catch (error) {
    console.log("ERRO GET:", error);
    return Response.json({ error: "Erro ao buscar" }, { status: 500 });
  }
}

// POST
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔥 VALIDAÇÃO
    const categoriasValidas = ["jetski", "lancha"];

    if (!categoriasValidas.includes(body.categoria)) {
      return Response.json(
        { error: "Categoria inválida (use jetski ou lancha)" },
        { status: 400 }
      );
    }

    const produto = await prisma.produto.create({
      data: {
        titulo: body.titulo,
        preco: Number(body.preco),
        descricao: body.descricao,
        tipo: "passeio", // FIXO
        categoria: body.categoria, // ✅ CORRETO AGORA
        imagens: body.imagens || [],
      },
    });

    return Response.json({ data: produto });

  } catch (error) {
    console.log("ERRO POST:", error);
    return Response.json({ error: "Erro ao criar" }, { status: 500 });
  }
}