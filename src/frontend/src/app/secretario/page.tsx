"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SecretarioPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    tipo: "aluno",
    nome: "",
    email: "",
    senha: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);  // Para feedback de carregamento

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    
    try {
      const response = await fetch("http://localhost:8000/api/cadastrar-usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}`,  // Remova temporariamente para testes
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      console.log("Resposta do servidor:", data);  // Para depuração
      
      if (response.ok) {
        setMessage("Usuário cadastrado com sucesso!");
        setFormData({ tipo: "aluno", nome: "", email: "", senha: "" });
      } else {
        setMessage(data.detail || `Erro: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      setMessage("Erro de conexão. Verifique se o servidor está rodando e a URL está correta.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER (igual ao seu código) */}
      <header className="bg-green-600 text-white py-8 px-10 shadow-lg relative">
        <h1 className="text-4xl font-bold">Portal do Secretário</h1>
        <p className="text-green-100 text-lg mt-1">Visão administrativa da escola</p>
        <button
          onClick={handleLogout}
          className="absolute top-6 right-8 bg-red-500 hover:bg-red-600 transition text-white font-semibold px-4 py-2 rounded-xl shadow-md"
        >
          Sair
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Seções de alunos, professores e turmas (igual ao seu código) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-green-600">Alunos</h2>
            <p className="text-gray-600 mt-3">Total cadastrado: <span className="font-bold"></span></p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-green-600">Professores</h2>
            <p className="text-gray-600 mt-3">Total ativos: <span className="font-bold"></span></p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-green-600">Turmas</h2>
            <p className="text-gray-600 mt-3">Total de turmas: <span className="font-bold"></span></p>
          </div>
        </div>

        {/* CADASTRO DE USUÁRIOS */}
        <div className="bg-white mt-10 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-green-600">Cadastrar Novo Usuário</h2>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-gray-700">Tipo:</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
              >
                <option value="aluno">Aluno</option>
                <option value="professor">Professor</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Nome:</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Digite o nome completo"
                required
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Digite o email"
                required
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Senha:</label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                placeholder="Digite a senha"
                required
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-600"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition disabled:opacity-50"
            >
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>
          {message && (
            <p className={`mt-4 ${message.includes("sucesso") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </div>

        {/* RELATÓRIO GERAL (igual ao seu código) */}
        <div className="bg-white mt-10 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-green-600">Relatório Geral</h2>
          <p className="text-gray-600 mt-3">
            Aqui serão exibidos dados completos do sistema, como matrículas, documentos, horários e organização interna.
          </p>
          <div className="mt-4 bg-green-50 border border-green-100 p-4 rounded-xl text-gray-700">
            Relatórios aparecerão aqui.
          </div>
        </div>
      </main>
    </div>
  );
}