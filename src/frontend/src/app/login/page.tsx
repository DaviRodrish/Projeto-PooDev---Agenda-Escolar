"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Login() {
  const [loginType, setLoginType] = useState("aluno");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (
  e: React.FormEvent<HTMLFormElement>
): Promise<void> => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      const err = await response.json();
      setError(err.detail || "Erro ao fazer login");
      setLoading(false);
      return;
    }

    const data: { mensagem: string; tipo?: string } = await response.json();

    if (!data.tipo) {
      setError("Backend não retornou o tipo de usuário.");
      return;
    }

    // rota conforme o tipo
    if (data.tipo === "aluno") router.push("/aluno");
    else if (data.tipo === "professor") router.push("/professor");
    else if (data.tipo === "secretario") router.push("/secretario");
    else setError("Tipo de usuário inválido.");
  } catch (err) {
    console.error("Erro no login:", err);
    setError("Erro ao conectar com o servidor.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 font-sans">
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm">
        <nav className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-600">Rede Escolar</h1>
          <a href="/" className="text-sm font-medium hover:text-blue-500 transition">
            Voltar ao Início
          </a>
        </nav>
      </header>

      <section className="flex flex-col justify-center items-center min-h-screen px-6 pt-24">
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-blue-100"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-600">Acesso Institucional</h2>
          <p className="text-gray-600 mb-6 text-sm">Entre com seu e-mail e senha.</p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                className="w-full p-3 border border-blue-200 rounded-lg bg-blue-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full p-3 border border-blue-200 rounded-lg bg-blue-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </motion.div>
      </section>

      <footer className="bg-blue-50 text-gray-500 text-center py-6 mt-auto">
        <p>© {new Date().getFullYear()} Rede Escolar. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}