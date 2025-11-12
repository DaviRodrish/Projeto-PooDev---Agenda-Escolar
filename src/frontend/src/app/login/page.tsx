"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Login() {
  const [loginType, setLoginType] = useState<"aluno" | "professor">("aluno");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");  // Para exibir erros
  const router = useRouter();

  console.log("Página de login renderizada");  // Depuração: Verifique se aparece no console

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha, tipo: loginType }),
      });

      const data = await response.json();

      if (response.ok) {
        // Armazene o token no localStorage
        localStorage.setItem('token', data.token);
        alert(`Login realizado com sucesso como ${loginType}!`);
        router.push('/dashboard');  // Redirecione para página protegida
      } else {
        setError(data.message || "Erro desconhecido");
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-50">
      {/* NAVBAR SIMPLES */}
      <header className="fixed top-0 w-full z-50 bg-gray-50/70 dark:bg-gray-900/70 backdrop-blur-md shadow-sm">
        <nav className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Rede Escolar Brasil
          </h1>
          <a href="/" className="text-sm font-medium hover:text-blue-500 dark:hover:text-blue-400 transition">
            Voltar ao Início
          </a>
        </nav>
      </header>

      {/* LOGIN FORM */}
      <section className="flex flex-col justify-center items-center text-center min-h-screen px-6 pt-24">
        <motion.div
          className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl shadow-lg max-w-md w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
            Acesso Institucional
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Faça login como aluno ou professor para acessar recursos exclusivos.
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}  {/* Exibe erro se houver */}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Tipo de Usuário
              </label>
              <select
                value={loginType}
                onChange={(e) => setLoginType(e.target.value as "aluno" | "professor")}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="aluno">Aluno</option>
                <option value="professor">Professor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Esqueceu a senha? <a href="#" className="text-blue-500 hover:underline">Clique aqui</a>
            </p>
          </form>
        </motion.div>
      </section>

      {/* FOOTER SIMPLES */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-auto">
        <p>© {new Date().getFullYear()} Rede Escolar Brasil. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
