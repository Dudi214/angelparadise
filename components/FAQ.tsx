"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faq = [
    {
      pergunta: "O passeio é compartilhado ou privativo?",
      resposta:
        "Todos os nossos passeios são 100% privativos. Você e seu grupo aproveitam com total conforto, sem dividir a embarcação com desconhecidos.",
    },
    {
      pergunta: "Quantas pessoas cabem na lancha?",
      resposta:
        "Trabalhamos com lanchas de diferentes tamanhos. Em média, comportam de 6 a 12 pessoas com conforto total.",
    },
    {
      pergunta: "O que está incluso no passeio?",
      resposta:
        "Incluímos marinheiro credenciado, gelo, água, cooler e toda estrutura básica. Algumas opções incluem churrasqueira a bordo.",
    },
    {
      pergunta: "Preciso levar alguma coisa?",
      resposta:
        "Recomendamos levar bebidas, alimentos, protetor solar e itens pessoais. Se quiser churrasco, leve a carne que nós cuidamos do restante.",
    },
    {
      pergunta: "Os roteiros são fixos?",
      resposta:
        "Não. Você pode personalizar o roteiro conforme sua preferência antes do passeio.",
    },
    {
      pergunta: "Como funciona o agendamento?",
      resposta:
        "Basta clicar no botão de WhatsApp e falar com nosso consultor. Ele vai te ajudar a escolher o melhor roteiro e data.",
    },
  ];

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section className="py-20 bg-slate-50 px-6">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-teal-600 font-bold tracking-widest text-sm uppercase">
            Dúvidas Frequentes
          </h2>

          <h3 className="text-3xl md:text-5xl font-light text-slate-800 mt-2">
            Perguntas Frequentes
          </h3>

          <p className="text-gray-500 mt-4">
            Tire suas dúvidas antes de reservar seu passeio
          </p>
        </motion.div>

        {/* ACCORDION */}
        <div className="space-y-4">
          {faq.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              {/* PERGUNTA */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-semibold text-slate-800">
                  {item.pergunta}
                </span>

                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown />
                </motion.div>
              </button>

              {/* RESPOSTA */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 overflow-hidden"
                  >
                    <p className="text-gray-600 text-sm pb-5">
                      {item.resposta}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA FINAL (CENTRO + ENTRANDO DA DIREITA) */}
        <div className="text-center mt-12 overflow-hidden">
          <motion.a
            href="https://wa.me/5524999695994?text=Tenho dúvidas sobre os passeios"
            target="_blank"
            initial={{ x: 120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-teal-600 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-700 transition"
          >
            Falar com um Consultor
          </motion.a>
        </div>

      </div>
    </section>
  );
}