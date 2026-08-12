"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-white px-6 pt-28">
        {/* FUNDO HERO */}
        <div className="absolute inset-0 z-0">
          <img
            src="/fundoo.png"
            alt="Angra dos Reis"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* TEXTO HERO */}
        <div className="relative z-10 text-center drop-shadow-lg">
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col font-extrabold leading-tight"
          >
            <span className="text-5xl sm:text-7xl md:text-9xl tracking-tight text-white drop-shadow-md">
              Angel Paradise
            </span>
            <span className="text-3xl sm:text-5xl md:text-6xl text-teal-300 font-light tracking-[0.2em] uppercase mt-2 drop-shadow-md">
              Angra
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-8 text-lg md:text-2xl font-medium text-white drop-shadow-md"
          >
            Passeios Privativos em Angra dos Reis
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 w-24 h-1 bg-yellow-400 mx-auto shadow-sm"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-xs tracking-[0.3em] uppercase text-white font-semibold drop-shadow-md"
          >
            Exclusividade • Conforto • Privacidade
          </motion.p>
        </div>
      </section>

      {/* PASSEIOS SECTION */}
      <section id="passeios" className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-teal-600 font-bold text-sm uppercase">
              Experiências Exclusivas
            </h2>
            <h3 className="text-3xl md:text-5xl font-light mt-2 text-slate-800">
              Nossos Passeios
            </h3>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { src: "/jet3.jpeg", title: "Jet Ski", type: "Privativo" },
              { src: "/ntbot.jpeg", title: "Lancha VIP", type: "Luxo" },
              { src: "/lancha.jpg", title: "Pôr do Sol", type: "Sunset" },
            ].map((passeio, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl shadow-xl h-[400px] border border-slate-100"
              >
                <img
                  src={passeio.src}
                  alt={passeio.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50">
                  <p className="text-teal-600 font-semibold text-xs uppercase tracking-wider">
                    {passeio.type}
                  </p>
                  <h4 className="text-xl font-bold text-slate-900">
                    {passeio.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ALUGUÉIS SECTION (UMA ÚNICA IMAGEM DE DESTAQUE) */}
      <section id="alugueis" className="py-20 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* IMAGEM ÚNICA */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 h-[450px]"
          >
            <div className="group relative w-full h-full overflow-hidden rounded-2xl shadow-xl border border-slate-200/60">
              <img
                src="/casa2.jpg" // Altere para o caminho da imagem de casa/chalé que desejar
                alt="Casas e Chalés de Alto Padrão"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
            </div>
          </motion.div>

          {/* TEXTO INFORMATIVO */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 space-y-6"
          >
            <h2 className="text-teal-600 font-bold text-sm uppercase">
              Hospedagem Premium
            </h2>

            <h3 className="text-4xl md:text-5xl font-light text-slate-800">
              Casas e Chalés de Alto Padrão
            </h3>

            <p className="text-gray-600 text-lg">
              Selecione as melhores propriedades com total privacidade e
              conforto. Curta Angra dos Reis em locais paradisíacos.
            </p>

            <button className="bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-teal-700 transition shadow-md font-medium">
              Conhecer Propriedades
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}