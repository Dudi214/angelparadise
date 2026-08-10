import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Buscamos na tabela 'produto' filtrando por tipo 'aluguel'
    const data = await prisma.produto.findMany({
      where: {
        tipo: "aluguel",
      },
      orderBy: { createdAt: "desc" },
    });

    // ✅ IMPORTANTE: Retornar dentro de um objeto { data: ... }
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Erro GET Alugueis:", error);
    return NextResponse.json({ data: [], error: "Erro ao buscar" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const novoAluguel = await prisma.produto.create({
      data: {
        titulo: body.titulo,
        preco: Number(body.preco),
        descricao: body.descricao,
        categoria: body.categoria, // ✅ Necessário para os filtros da Page
        tipo: "aluguel",           // ✅ Define que este item pertence aos aluguéis
        imagens: body.imagens || [],
      },
    });

    return NextResponse.json({ data: novoAluguel });
  } catch (error) {
    console.error("Erro POST Alugueis:", error);
    return NextResponse.json({ error: "Erro ao criar" }, { status: 500 });
  }
}