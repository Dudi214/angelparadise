import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// 🔥 Define o runtime do Node.js obrigatoriamente para a Vercel
export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;

    // 🔥 Validação
    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado" },
        { status: 400 }
      );
    }

    // 1. Converte o arquivo recebido para Buffer e depois para Data URI (Base64)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString("base64");
    const fileUri = `data:${file.type};base64,${base64Data}`;

    // 2. Upload direto via Base64 (sem travar em Streams serverless)
    const upload = await cloudinary.uploader.upload(fileUri, {
      folder: "angel-paradise",
    });

    if (!upload || !upload.secure_url) {
      throw new Error("Erro ao obter URL do Cloudinary");
    }

    // Retorno exatamente igual ao original (não quebra nada no front-end)
    return NextResponse.json(
      { url: upload.secure_url },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Erro no upload para o Cloudinary:", error);

    return NextResponse.json(
      { error: error?.message || "Erro no upload" },
      { status: 500 }
    );
  }
}