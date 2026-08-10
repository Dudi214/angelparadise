"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white py-14 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className="font-bold text-2xl mb-3">
            Angel Paradise
          </h3>

          <p className="text-white/80 text-sm">
            Passeios exclusivos em Angra dos Reis. Viva uma experiência única.
          </p>
        </motion.div>

        {/* LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className="font-semibold mb-4">
            Navegação
          </h3>

          <ul className="space-y-3 text-white/80 text-sm">
            <li><a href="#inicio" className="hover:text-white">Início</a></li>
            <li><a href="#passeios" className="hover:text-white">Passeios</a></li>
            <li><a href="#alugueis" className="hover:text-white">Aluguéis</a></li>
          </ul>
        </motion.div>

        {/* CONTATO + REDES */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className="font-semibold mb-4">
            Contato
          </h3>

          <p className="text-white/80 text-sm">
            Angra dos Reis - RJ
          </p>

         

          {/* REDES */}
          <div className="flex gap-4">

            <a
              href="https://www.instagram.com/angelparadiseangra/"
              className="p-3 bg-white/20 rounded-full hover:bg-pink-500 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="p-3 bg-white/20 rounded-full hover:bg-blue-600 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://wa.me/5524999695994"
              className="p-3 bg-white/20 rounded-full hover:bg-green-500 transition"
            >
              <FaWhatsapp />
            </a>

          </div>
        </motion.div>

      </div>

      {/* LINHA FINAL */}
      <motion.div
        className="text-center text-white/70 mt-12 text-sm border-t border-white/20 pt-6"
      >
        © 2026 Angel Paradise — Todos os direitos reservados
      </motion.div>
    </footer>
  );
}