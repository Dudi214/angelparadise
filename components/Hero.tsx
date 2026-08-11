"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-white px-6 pt-28">
        {/* FUNDO */}
        <div className="absolute inset-0 z-0">
          <img
            src="/fundoo.png"
            alt="Angra dos Reis"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        {/* TEXTO HERO */}
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col font-extrabold leading-tight"
          >
            {/* Nome principal maior */}
            <span className="text-5xl sm:text-7xl md:text-9xl tracking-tight">
              Angel Paradise
            </span>
            {/* Localização embaixo, um pouco menor e com mais espaçamento */}
            <span className="text-3xl sm:text-5xl md:text-6xl text-teal-400 font-light tracking-[0.2em] uppercase mt-2">
              Angra
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-8 text-lg md:text-2xl font-medium"
          >
            Passeios Privativos em Angra dos Reis
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 w-24 h-1 bg-yellow-400 mx-auto"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-xs tracking-[0.3em] uppercase opacity-80"
          >
            Exclusividade • Conforto • Privacidade
          </motion.p>
        </div>
      </section>

      {/* PASSEIOS */}
      <section id="passeios" className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          {/* TITULO */}
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
            <h3 className="text-3xl md:text-5xl font-light mt-2">
              Nossos Passeios
            </h3>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4"></div>
          </motion.div>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["/jet3.jpeg", "/ntbot.jpeg", "/lancha.jpg"].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl shadow-lg h-[400px]"
              >
                <img
                  src={img}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-yellow-400 text-xs uppercase">
                    {i === 0 ? "Privativo" : i === 1 ? "Luxo" : "Sunset"}
                  </p>
                  <h4 className="text-xl font-bold">
                    {i === 0
                      ? "Jet Ski"
                      : i === 1
                        ? "Lancha VIP"
                        : "Pôr do Sol"}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ALUGUÉIS */}
      <section id="alugueis" className="py-20 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* IMAGEM */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 rounded-3xl overflow-hidden shadow-2xl h-[450px]"
          >
            <img src="/casa.jpg" className="w-full h-full object-cover" />
          </motion.div>

          {/* TEXTO */}
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

            <h3 className="text-4xl md:text-5xl font-light">
              Casas e Chalés de Alto Padrão
            </h3>

            <p className="text-gray-600 text-lg">
              Selecione as melhores propriedades com total privacidade e
              conforto.
            </p>

            <button className="bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-teal-700">
              Conhecer Propriedades
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
