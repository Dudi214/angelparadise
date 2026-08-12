"use client";

import { motion } from "framer-motion";

export default function Roteiros() {
  const roteiros = [
    {
      titulo: "Paradisíaco",
      destaque: "O cartão postal de Angra",
      imagem: "/paissagem1.jpeg",
      descricao:
        "Águas cristalinas, cenários paradisíacos e paradas nas praias mais famosas. Ideal para quem quer viver o melhor de Angra.",
      paradas: [
        "Ilhas Botinas",
        "Praia da Piedade",
        "Praia do Dentista",
        " Praia das Flechas",
      ],
    },
    {
      titulo: "Ilha Grande Experience",
      destaque: "Mergulho e natureza",
      imagem: "/paissagem2.jpeg",
      descricao:
        "Um mergulho na vida marinha com águas transparentes e natureza preservada. Perfeito para snorkel.",
      paradas: [
        
        "Lagoa Azul",
        "Praia de Grumixama",
        "Praia do Araçá",
        "Freguesia de Santana",
      ],
    },
    {
      titulo: "Águas Quentes",
      destaque: "Relaxamento total",
      imagem: "/paissagem3.jpeg",
      descricao:
        "Ambiente calmo, águas mornas e conforto total. Ideal para famílias e quem busca tranquilidade.",
      paradas: [
        "Ilha de Paquetá",
        "Ilha de Itanhangá",
        "Praia do Laboratório",
        "Praia Pingo D'Água",
      ],
    },
    {
      titulo: "Roteiro Personalizado",
      destaque: "100% do seu jeito",
      imagem: "/paissagem1.jpeg",
      descricao:
        "Você escolhe tudo: praias, horários e experiência. Um passeio exclusivo e totalmente privativo.",
      paradas: [
        "Paradas personalizadas",
        "Horário flexível",
        "Experiência privada",
      ],
    },
  ];

  const handleWhatsAppRedirect = (e: React.MouseEvent<HTMLAnchorElement>, titulo: string) => {
    e.stopPropagation(); // Evita interferência de eventos do Framer Motion
    const mensagem = encodeURIComponent(`Olá! Gostaria de saber mais informações sobre o roteiro *${titulo}*.`);
    const url = `https://wa.me/5524999695994?text=${mensagem}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gray-400 text-sm tracking-widest uppercase">
            Experiência Exclusiva
          </p>

          <h2 className="text-teal-600 font-bold tracking-widest text-sm uppercase mt-2">
            Roteiros Premium
          </h2>

          <h3 className="text-4xl md:text-6xl font-light text-slate-900 mt-3">
            Descubra Angra dos Reis
          </h3>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Passeios pensados para oferecer conforto, exclusividade e paisagens inesquecíveis.
          </p>

          <div className="w-24 h-[2px] bg-yellow-400 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {roteiros.map((r, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative group rounded-2xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl flex flex-col hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
            >

              {/* IMAGEM DO CARD */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={r.imagem}
                  alt={r.titulo}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-teal-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {r.destaque}
                </span>
              </div>

              {/* CONTEÚDO DO CARD */}
              <div className="p-6 flex flex-col flex-1">
                <h4 className="text-xl font-bold mb-2 text-slate-900">
                  {r.titulo}
                </h4>

                <p className="text-gray-600 text-sm mb-4">
                  {r.descricao}
                </p>

                <ul className="text-sm text-gray-700 space-y-1 mb-6">
                  {r.paradas.map((p, i) => (
                    <li key={i}>• {p}</li>
                  ))}
                </ul>

                {/* GATILHO */}
                <p className="text-xs text-gray-400 mb-3 mt-auto">
                  🔥 Alta procura essa semana
                </p>

                {/* BOTÃO COM NAVEGAÇÃO GARANTIDA EM NOVA GUIA */}
                <a
                  href={`https://wa.me/5524999695994?text=${encodeURIComponent(`Olá! Gostaria de saber mais informações sobre o roteiro *${r.titulo}*.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleWhatsAppRedirect(e, r.titulo)}
                  className="relative z-10 cursor-pointer bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-2.5 rounded-xl text-center font-semibold hover:scale-105 transition shadow-md block"
                >
                  Falar com Consultor
                </a>
              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}