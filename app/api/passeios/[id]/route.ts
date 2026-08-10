import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * 🔥 ATUALIZAR (PUT)
 * Rota: /api/passeios/[id]
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // No Next.js 15, precisamos dar await no params
    const { id } = await params;
    const body = await req.json();

    // Validação básica
    if (!id) {
      return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
    }

    const produto = await prisma.produto.update({
      where: { id: id },
      data: {
        titulo: body.titulo,
        preco: Number(body.preco),
        descricao: body.descricao,
        categoria: body.categoria,
        // imagens: body.imagens, // Descomente se for editar fotos também
      },
    });

    return NextResponse.json({ data: produto });

  } catch (error: any) {
    console.error("ERRO AO ATUALIZAR:", error);
    
    // Erro do Prisma quando não encontra o registro
    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Passeio não encontrado" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Erro interno ao atualizar" },
      { status: 500 }
    );
  }
}

/**
 * 🔥 DELETAR (DELETE)
 * Rota: /api/passeios/[id]
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });
    }

    await prisma.produto.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true, message: "Deletado com sucesso" });

  } catch (error: any) {
    console.error("ERRO AO DELETAR:", error);

    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Este passeio já não existe mais" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Erro interno ao deletar" },
      { status: 500 }
    );
  }
}