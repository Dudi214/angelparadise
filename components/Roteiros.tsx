"use client";

import { motion } from "framer-motion";

export default function Roteiros() {
  const roteiros = [
    {
      titulo: "Ilhas Exclusivas",
      destaque: "O cartão postal de Angra",
      descricao:
        "Águas cristalinas, cenários paradisíacos e paradas nas praias mais famosas. Ideal para quem quer viver o melhor de Angra.",
      paradas: [
        "Ilhas Botinas",
        "Praia da Piedade",
        "Praia do Dentista",
        "Pitangueira e Vitorino",
      ],
    },
    {
      titulo: "Ilha Grande Experience",
      destaque: "Mergulho e natureza",
      descricao:
        "Um mergulho na vida marinha com águas transparentes e natureza preservada. Perfeito para snorkel.",
      paradas: [
        "Ilhas Cataguás",
        "Lagoa Azul",
        "Praia de Grumixama",
        "Freguesia de Santana",
      ],
    },
    {
      titulo: "Águas Tranquilas",
      destaque: "Relaxamento total",
      descricao:
        "Ambiente calmo, águas mornas e conforto total. Ideal para famílias e quem busca tranquilidade.",
      paradas: [
        "Ilha de Paquetá",
        "Ilha de Itanhangá",
        "Praia do Laboratório",
      ],
    },
    {
      titulo: "Roteiro Personalizado",
      destaque: "100% do seu jeito",
      descricao:
        "Você escolhe tudo: praias, horários e experiência. Um passeio exclusivo e totalmente privativo.",
      paradas: [
        "Paradas personalizadas",
        "Horário flexível",
        "Experiência privada",
      ],
    },
  ];

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
              className="relative group rounded-2xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl p-6 flex flex-col hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
            >

              {/* efeito brilho */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/30 blur-2xl rotate-45"></div>
              </div>

              <p className="text-teal-600 text-xs font-bold uppercase mb-2">
                {r.destaque}
              </p>

              <h4 className="text-xl font-bold mb-2">
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

              {/* gatilho */}
              <p className="text-xs text-gray-400 mb-3">
                🔥 Alta procura essa semana
              </p>

              {/* botão */}
              <a
                href="https://wa.me/5524999695994?text=Quero reservar esse roteiro"
                target="_blank"
                className="mt-auto bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-2 rounded-xl text-center font-semibold hover:scale-105 transition"
              >
                Falar com Consultor
              </a>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}