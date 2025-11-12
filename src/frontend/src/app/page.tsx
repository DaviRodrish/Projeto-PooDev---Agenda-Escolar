"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-50">
      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-gray-50/70 dark:bg-gray-900/70 backdrop-blur-md shadow-sm">
        <nav className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Rede Escolar
          </h1>
          <div className="space-x-6 text-sm font-medium">
            <a href="#sobre" className="hover:text-blue-500 dark:hover:text-blue-400 transition">Sobre</a>
            <a href="#historia" className="hover:text-blue-500 dark:hover:text-blue-400 transition">História</a>
            <a href="#localizacao" className="hover:text-blue-500 dark:hover:text-blue-400 transition">Localização</a>
            <a href="/login" className="hover:text-blue-500 dark:hover:text-blue-400 transition">Login</a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="flex flex-col justify-center items-center text-center min-h-screen px-6 pt-24 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <motion.h2
          className="text-5xl sm:text-6xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Rede Escolar
        </motion.h2>
        <motion.p
          className="max-w-2xl text-lg opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Uma instituição dedicada à educação de qualidade, conectando escolas e comunidades para um futuro melhor.
        </motion.p>
        <motion.a
          href="#sobre"
          className="mt-10 px-8 py-3 bg-gray-50 text-blue-600 rounded-full font-semibold shadow-md hover:bg-gray-200 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Saiba Mais
        </motion.a>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-24 px-6 bg-gray-50 dark:bg-gray-900 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400">
            Sobre a Rede
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            A Rede Escolar Brasil é uma instituição educacional sem fins lucrativos, fundada em 2010, com o objetivo de promover a educação inclusiva e de qualidade em todo o território brasileiro. Nossa missão é conectar escolas, alunos e professores através de tecnologias inovadoras, valores éticos e práticas pedagógicas avançadas.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <motion.div
              className="p-6 bg-blue-50 dark:bg-gray-800 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2">Missão</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Oferecer educação acessível e transformadora, preparando cidadãos para os desafios do século XXI.
              </p>
            </motion.div>
            <motion.div
              className="p-6 bg-blue-50 dark:bg-gray-800 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2">Visão</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Ser referência nacional em educação digital e inclusiva, impactando milhões de vidas.
              </p>
            </motion.div>
            <motion.div
              className="p-6 bg-blue-50 dark:bg-gray-800 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2">Valores</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Inovação, inclusão, ética, colaboração e excelência em tudo que fazemos.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HISTORIA */}
      <section id="historia" className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-12 text-blue-600 dark:text-blue-400">
            Nossa História
          </h3>
          <div className="space-y-8">
            <motion.div
              className="flex flex-col md:flex-row items-center gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
              }}
            >
              <div className="flex-1">
                <h4 className="text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-2">2010: Fundação</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Iniciamos com uma pequena rede de 5 escolas em São Paulo, focando em educação básica e acesso à tecnologia.
                </p>
              </div>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">2010</div>
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row-reverse items-center gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
              }}
            >
              <div className="flex-1">
                <h4 className="text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-2">2015: Expansão Nacional</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Alcançamos 50 escolas em todo o Brasil, introduzindo programas de inclusão digital e parcerias com universidades.
                </p>
              </div>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">2015</div>
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row items-center gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
              }}
            >
              <div className="flex-1">
                <h4 className="text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-2">2023: Inovação Contínua</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Hoje, somos uma rede de mais de 200 instituições, liderando em educação híbrida e sustentabilidade.
                </p>
              </div>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">2023</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LOCALIZACAO */}
      <section id="localizacao" className="py-24 px-6 bg-gray-50 dark:bg-gray-900 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400">
            Localização
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Nossa sede principal está localizada em São Paulo, mas atuamos em todo o Brasil através de parcerias regionais.
          </p>
          <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center">
            {/* Placeholder para mapa - substitua por um componente de mapa real, como Google Maps */}
            <p className="text-gray-500 dark:text-gray-400">Mapa Interativo - Rua das Escolas, 123, São Paulo - SP</p>
          </div>
          <div className="mt-8 text-left max-w-md mx-auto">
            <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2">Endereço</h4>
            <p className="text-gray-600 dark:text-gray-300">Rua das Escolas, 123<br />Centro, São Paulo - SP<br />CEP: 01234-567</p>
            <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mt-4 mb-2">Horário de Funcionamento</h4>
            <p className="text-gray-600 dark:text-gray-300">Segunda a Sexta: 8h às 18h<br />Sábado: 9h às 12h</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6">
        <p>© {new Date().getFullYear()} Rede Escolar Brasil. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
