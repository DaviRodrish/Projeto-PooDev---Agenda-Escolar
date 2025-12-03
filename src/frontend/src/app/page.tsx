"use client";

import { motion } from "framer-motion";
import { FaSchool, FaHistory, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import Image from "next/image"; // Adicionando import para otimização de imagem

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white font-sans text-gray-700">
      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-lg shadow-lg border-b border-blue-200">
        <nav className="container mx-auto flex justify-between items-center px-6 py-4 flex-wrap">
          <h1 className="text-3xl font-bold text-blue-600 flex items-center">
            <FaSchool className="mr-2 text-blue-500" />
            Rede Escolar
          </h1>
          <div className="flex space-x-6 text-sm font-medium text-gray-600 flex-wrap">
            <a href="#sobre" className="hover:text-blue-500 transition-colors duration-300">Sobre</a>
            <a href="#historia" className="hover:text-blue-500 transition-colors duration-300">História</a>
            <a href="#localizacao" className="hover:text-blue-500 transition-colors duration-300">Localização</a>
            <a href="/login" className="hover:text-blue-500 transition-colors duration-300 flex items-center">
              <FaUser className="mr-1" />
              Login
            </a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="flex flex-col justify-center items-center text-center min-h-screen px-6 pt-24 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 relative overflow-hidden">
        <motion.h2
          className="text-5xl sm:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Rede Escolar
        </motion.h2>
        <motion.p
          className="max-w-2xl text-xl text-gray-700 leading-relaxed relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        >
          Educação conectada, moderna e acessível para transformar o futuro das gerações.
        </motion.p>
        <motion.a
          href="#sobre"
          className="mt-10 px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 relative z-10"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          Saiba Mais
        </motion.a>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-24 px-6 text-center bg-white relative">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold mb-6 text-blue-600 flex items-center justify-center">
              <FaSchool className="mr-3 text-blue-500" />
              Sobre
            </h3>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
              A Rede Escolar conecta escolas, professores e comunidades através de tecnologia avançada, inclusão social e inovação pedagógica, promovendo um ambiente educacional colaborativo e sustentável.
            </p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <FaSchool className="text-4xl text-blue-500 mx-auto mb-4" />
                <h4 className="font-semibold text-blue-600">Inovação</h4>
                <p className="text-gray-600">Tecnologias modernas para o aprendizado.</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <FaUser className="text-4xl text-blue-500 mx-auto mb-4" />
                <h4 className="font-semibold text-blue-600">Inclusão</h4>
                <p className="text-gray-600">Acesso igualitário para todos os alunos.</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <FaMapMarkerAlt className="text-4xl text-blue-500 mx-auto mb-4" />
                <h4 className="font-semibold text-blue-600">Comunidade</h4>
                <p className="text-gray-600">Fortalecendo laços locais e globais.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HISTÓRIA */}
      <section id="historia" className="py-24 px-6 bg-gradient-to-r from-blue-50 to-blue-100 text-center relative">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold mb-10 text-blue-600 flex items-center justify-center">
              <FaHistory className="mr-3 text-blue-500" />
              História
            </h3>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <p className="text-lg text-gray-700"><span className="font-bold text-blue-600">2010:</span> Fundação e criação da primeira rede educacional inovadora.</p>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <p className="text-lg text-gray-700"><span className="font-bold text-blue-600">2015:</span> Expansão nacional com foco em inclusão digital e acessibilidade.</p>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <p className="text-lg text-gray-700"><span className="font-bold text-blue-600">2023:</span> Modernização completa com educação híbrida e tecnologias emergentes.</p>
              </div>
            </div>
          </motion.div>
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
      <footer className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-8 mt-auto">
        <div className="container mx-auto">
          <p className="text-lg">© {new Date().getFullYear()} Rede Escolar. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm opacity-80">Construindo o futuro da educação juntos.</p>
        </div>
      </footer>
    </div>
  );
}