import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * 🔥 EDITAR (PUT)
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Atualiza na tabela produto garantindo que os tipos batam
    const atualizado = await prisma.produto.update({
      where: { id: id },
      data: {
        titulo: body.titulo,
        preco: Number(body.preco),
        descricao: body.descricao,
        categoria: body.categoria, // Importante para a filtragem na página
        imagens: body.imagens,
      },
    });

    return NextResponse.json({ data: atualizado });
  } catch (error: any) {
    console.error("ERRO PUT ALUGUEL:", error);
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 });
  }
}

/**
 * 🔥 DELETAR (DELETE)
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
    }

    await prisma.produto.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("ERRO DELETE ALUGUEL:", error);
    
    // Caso o registro não exista
    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Registro não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 });
  }
}