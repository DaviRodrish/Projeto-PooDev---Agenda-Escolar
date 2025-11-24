"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-gray-700">
      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <nav className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-500">Rede Escolar</h1>
          <div className="space-x-6 text-sm font-medium text-gray-600">
            <a href="#sobre" className="hover:text-blue-500 transition">Sobre</a>
            <a href="#historia" className="hover:text-blue-500 transition">História</a>
            <a href="#localizacao" className="hover:text-blue-500 transition">Localização</a>
            <a href="/login" className="hover:text-blue-500 transition">Login</a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="flex flex-col justify-center items-center text-center min-h-screen px-6 pt-24 bg-blue-100">
        <motion.h2
          className="text-5xl sm:text-6xl font-bold mb-4 text-blue-600"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Rede Escolar
        </motion.h2>
        <motion.p
          className="max-w-xl text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Educação conectada, moderna e acessível para transformar o futuro.
        </motion.p>
        <motion.a
          href="#sobre"
          className="mt-8 px-8 py-3 bg-blue-500 text-white rounded-full font-semibold shadow-md hover:bg-blue-600 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Saiba Mais
        </motion.a>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-20 px-6 text-center bg-white">
        <h3 className="text-3xl font-bold mb-4 text-blue-600">Sobre</h3>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          A Rede Escolar conecta escolas, professores e comunidades através de tecnologia, inclusão e inovação.
        </p>
      </section>

      {/* HISTÓRIA */}
      <section id="historia" className="py-20 px-6 bg-blue-50 text-center">
        <h3 className="text-3xl font-bold mb-8 text-blue-600">História</h3>
        <div className="max-w-4xl mx-auto space-y-6 text-gray-600">
          <p><span className="font-semibold text-blue-600">2010:</span> Fundação e criação da primeira rede educacional.</p>
          <p><span className="font-semibold text-blue-600">2015:</span> Expansão nacional e inclusão digital.</p>
          <p><span className="font-semibold text-blue-600">2023:</span> Modernização com foco em educação híbrida.</p>
        </div>
      </section>

      {/* LOCALIZAÇÃO */}
      <section id="localizacao" className="py-20 px-6 text-center bg-white">
        <h3 className="text-3xl font-bold mb-4 text-blue-600">Localização</h3>
        <p className="max-w-xl mx-auto text-gray-600 mb-6">
          Sede principal em Campos dos Goytacazes, com atuação em todo o Brasil.
        </p>
        <div className="bg-blue-100 h-64 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src="/mapa.png"
            alt="Mapa da localização"
            className="object-cover w-full h-full"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-100 text-gray-600 text-center py-6 mt-auto">
        <p>© {new Date().getFullYear()} Rede Escolar. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
