"use client";

import { useState } from "react";

export default function ProdutoCard({ produto }: { produto: any }) {
  const [imagemAtual, setImagemAtual] = useState(0);
  const [mostrarDescricaoCompleta, setMostrarDescricaoCompleta] = useState(false);

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const imagens =
    produto?.imagens?.length > 0
      ? produto.imagens
      : ["https://via.placeholder.com/800x600?text=Sem+Foto"];

  // Garante que o preço seja tratado como número para não quebrar o formatter
  const precoNumerico = Number(produto?.preco) || 0;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full">

      {/* FOTO PRINCIPAL */}
      <div className="relative">
        <img
          src={imagens[imagemAtual]}
          alt={produto?.titulo || "Produto"}
          className="w-full h-72 sm:h-80 md:h-96 object-cover transition-all duration-300"
        />

        {produto?.categoria && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold uppercase shadow text-gray-800">
            {produto.categoria}
          </span>
        )}
      </div>

      {/* MINIATURAS (Com scroll suave e suporte para mais de 4 fotos) */}
      {imagens.length > 1 && (
        <div className="flex gap-2 overflow-x-auto p-3 scrollbar-thin scrollbar-thumb-gray-200">
          {imagens.map((img: string, index: number) => (
            <img
              key={index}
              src={img}
              alt={`${produto?.titulo} miniatura ${index + 1}`}
              onClick={() => setImagemAtual(index)}
              className={`h-16 w-20 rounded-lg object-cover cursor-pointer border-2 transition-all flex-shrink-0 ${
                imagemAtual === index
                  ? "border-teal-600 scale-105"
                  : "border-transparent opacity-70 hover:opacity-100 hover:border-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      {/* CONTEÚDO */}
      <div className="p-6 flex flex-col flex-grow">

        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          {produto?.titulo}
        </h3>

        {/* ÁREA DA DESCRIÇÃO COM EXPANSÃO OPCIONAL */}
        <div className="mb-6 flex-grow">
          <p
            className={`text-gray-500 leading-relaxed text-sm transition-all ${
              !mostrarDescricaoCompleta ? "line-clamp-3" : ""
            }`}
          >
            {produto?.descricao}
          </p>

          {produto?.descricao && produto.descricao.length > 120 && (
            <button
              onClick={() => setMostrarDescricaoCompleta(!mostrarDescricaoCompleta)}
              className="text-teal-600 font-bold text-xs mt-2 hover:underline focus:outline-none block"
            >
              {mostrarDescricaoCompleta ? "Ver menos ▲" : "Ler descrição completa ▼"}
            </button>
          )}
        </div>

        {/* RODAPÉ DO CARD ALINHADO */}
        <div className="border-t border-gray-100 pt-5 mt-auto">

          <span className="text-xs uppercase text-gray-400 font-semibold block">
            {produto?.tipo === "aluguel" ? "Valor da diária" : "Preço"}
          </span>

          <h2 className="text-3xl font-black text-teal-600 mt-1">
            {formatter.format(precoNumerico)}
            {produto?.tipo === "aluguel" && (
              <span className="text-base text-gray-400 font-medium"> /dia</span>
            )}
          </h2>

          <a
            href={`https://wa.me/5524999695994?text=${encodeURIComponent(
              `Olá! Gostaria de informações sobre o produto/serviço: ${produto?.titulo}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full flex justify-center items-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-2xl transition shadow-lg shadow-teal-100"
          >
            Falar no WhatsApp
          </a>

        </div>

      </div>
    </div>
  );
}