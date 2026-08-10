"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Importar estilos do Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function PasseioCard({ passeio }: any) {
  // Garantimos que imagens seja sempre um array para não quebrar o código
  const imagens = passeio?.imagens || [];
  const [mostrarDescricaoCompleta, setMostrarDescricaoCompleta] = useState(false);

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden border border-gray-100 flex flex-col h-full">
      
      {/* CONTAINER DE IMAGEM / SLIDER (Aumentado para h-72 / sm:h-80) */}
      <div className="h-72 sm:h-80 w-full relative overflow-hidden bg-slate-100">
        {imagens.length > 1 ? (
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation={true}
            className="h-full w-full mySwiper"
            style={{
              "--swiper-navigation-size": "18px",
              "--swiper-navigation-color": "#ffffff",
              "--swiper-pagination-color": "#2dd4bf", // teal-400
            } as any}
          >
            {imagens.map((img: string, index: number) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`${passeio?.titulo || "Passeio"} - foto ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          /* Caso tenha apenas uma imagem ou nenhuma */
          <img
            src={imagens[0] || "/placeholder.jpg"}
            alt={passeio?.titulo || "Passeio"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* ETIQUETA DE CATEGORIA */}
        {passeio?.categoria && (
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-800 shadow-sm">
            {passeio.categoria}
          </div>
        )}
      </div>

      {/* CONTEÚDO DO CARD */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-800 leading-tight">
            {passeio?.titulo}
          </h3>
        </div>

        {/* ÁREA DA DESCRIÇÃO AJUSTADA */}
        <div className="mb-4 flex-grow">
          <p
            className={`text-gray-600 text-sm leading-relaxed transition-all ${
              !mostrarDescricaoCompleta ? "line-clamp-3" : ""
            }`}
          >
            {passeio?.descricao}
          </p>

          {/* Botão interativo se a descrição for longa */}
          {passeio?.descricao && passeio.descricao.length > 100 && (
            <button
              onClick={() => setMostrarDescricaoCompleta(!mostrarDescricaoCompleta)}
              className="text-teal-600 font-bold text-xs mt-1 hover:underline focus:outline-none block"
            >
              {mostrarDescricaoCompleta ? "Ver menos ▲" : "Ler descrição completa ▼"}
            </button>
          )}
        </div>

        {/* RODAPÉ DO CARD COM PREÇO E BOTÃO DE RESERVA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
              A partir de
            </p>
            <p className="text-2xl font-black text-teal-600">
              R$ {passeio?.preco}
            </p>
          </div>

          <a
            href={`https://wa.me/5524999695994?text=${encodeURIComponent(
              `Olá! Gostaria de informações sobre o passeio: ${passeio?.titulo}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-2xl transition-colors shadow-md shadow-green-200 flex items-center justify-center"
            title="Reservar no WhatsApp"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}