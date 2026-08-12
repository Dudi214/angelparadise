import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Desativa cache da rota para que as alterações reflitam imediatamente no site
export const dynamic = "force-dynamic";

/**
 * 🔥 ATUALIZAR (PUT)
 * Rota: /api/passeios/[id]
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // No Next.js 15, obrigatoriamente aguardamos a resolução de params
    const { id } = await params;
    const body = await req.json();

    // Validação básica de ID
    if (!id) {
      return NextResponse.json(
        { error: "ID do passeio não fornecido." },
        { status: 400 }
      );
    }

    // Atualiza o produto no banco de dados incluindo o array de imagens atualizado
    const produto = await prisma.produto.update({
      where: { id: id },
      data: {
        titulo: body.titulo,
        preco: Number(body.preco),
        descricao: body.descricao,
        categoria: body.categoria,
        // Garante a gravação do array de imagens atualizado
        imagens: Array.isArray(body.imagens) ? body.imagens : body.imagens,
      },
    });

    return NextResponse.json({ data: produto }, { status: 200 });
  } catch (error: any) {
    console.error("ERRO AO ATUALIZAR PASSEIO:", error);

    // Erro P2025 do Prisma: Registro não encontrado
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Passeio não encontrado no banco de dados." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Erro interno no servidor ao atualizar o passeio." },
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
      return NextResponse.json(
        { error: "ID obrigatório para exclusão." },
        { status: 400 }
      );
    }

    await prisma.produto.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { success: true, message: "Passeio deletado com sucesso." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("ERRO AO DELETAR PASSEIO:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Este passeio já não existe mais." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Erro interno no servidor ao deletar o passeio." },
      { status: 500 }
    );
  }
}