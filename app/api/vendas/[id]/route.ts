import { prisma } from "@/lib/prisma";

// PUT
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // 🔥 1. params tipado como Promise
) {
  try {
    const { id } = await params; // 🔥 2. Resolve o params com await
    const body = await req.json();

    // Se o seu model do Prisma for "venda", troque "produto" por "venda"
    const produto = await prisma.produto.update({
      where: {
        id: id,
      },
      data: {
        titulo: body.titulo,
        preco: Number(body.preco),
        descricao: body.descricao,
        categoria: body.categoria,
        imagens: body.imagens,
      },
    });

    return Response.json({
      data: produto,
    });
  } catch (error: any) {
    console.error("Erro no PUT /api/vendas/[id]:", error);

    return Response.json(
      { error: error?.message || "Erro ao atualizar produto" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // 🔥 1. params tipado como Promise
) {
  try {
    const { id } = await params; // 🔥 2. Resolve o params com await

    await prisma.produto.delete({
      where: {
        id: id,
      },
    });

    return Response.json({
      success: true,
    });
  } catch (error: any) {
    console.error("Erro no DELETE /api/vendas/[id]:", error);

    return Response.json(
      { error: error?.message || "Erro ao deletar produto" },
      { status: 500 }
    );
  }
}