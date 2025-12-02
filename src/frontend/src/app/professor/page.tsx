"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaBookOpen, FaClipboardCheck, FaSignOutAlt, FaCheckCircle } from "react-icons/fa"; // Adicionando ícones para melhorar a estética

type NotaLancada = {
  matricula: string;
  disciplina: string;
  nota: number;
  tipo_avaliacao: string;
};

export default function ProfessorPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const [matricula, setMatricula] = useState<string>("");
  const [disciplina, setDisciplina] = useState<string>("");
  const [nota, setNota] = useState<string>("");
  const [tipoAvaliacao, setTipoAvaliacao] = useState<string>("");
  const [notasLancadas, setNotasLancadas] = useState<NotaLancada[]>([]);

  const handleSubmit = async () => {
    const notaNum = parseFloat(nota);

    if (isNaN(notaNum) || notaNum < 0 || notaNum > 10) {
      alert("A nota deve ser um número entre 0 e 10.");
      return;
    }

    if (!matricula.trim() || !disciplina.trim() || !tipoAvaliacao.trim()) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/professor/lancar-nota", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // se usar autenticação: Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          matricula,
          disciplina,
          nota: notaNum,
          tipo_avaliacao: tipoAvaliacao,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Erro: " + (data.erro ?? JSON.stringify(data)));
        return;
      }

      setNotasLancadas(prev => [
        ...prev,
        { matricula, disciplina, nota: notaNum, tipo_avaliacao: tipoAvaliacao },
      ]);

      setMatricula("");
      setDisciplina("");
      setNota("");
      setTipoAvaliacao("");

      alert("Nota lançada com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Falha ao conectar à API.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* HEADER */}
      <header className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-10 px-10 shadow-2xl relative">
        <div className="flex items-center space-x-4">
          <FaBookOpen className="text-5xl" />
          <div>
            <h1 className="text-5xl font-extrabold tracking-wide">Portal do Professor</h1>
            <p className="text-indigo-100 text-xl mt-2">Gerencie suas turmas e lance notas com facilidade</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="absolute top-6 right-8 bg-red-500 hover:bg-red-600 transition-all duration-300 text-white font-semibold px-5 py-3 rounded-full shadow-lg flex items-center space-x-2 transform hover:scale-105"
        >
          <FaSignOutAlt />
          <span>Sair</span>
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-16 space-y-12">
        {/* LANÇAR NOTAS */}
        <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200">
          <h2 className="text-3xl font-bold text-indigo-700 mb-8 flex items-center space-x-3">
            <FaClipboardCheck className="text-indigo-600" />
            <span>Lançar Notas</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Matrícula do Aluno</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Digite a matrícula"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-gray-500 text-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Disciplina</label>
              <select
                value={disciplina}
                onChange={(e) => setDisciplina(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-black"
              >
                <option value="">Selecione uma disciplina</option>
                <option value="Matemática">Matemática</option>
                <option value="Português">Português</option>
                <option value="Inglês">Inglês</option>
                <option value="História">História</option>
                <option value="Geografia">Geografia</option>
                <option value="Biologia">Biologia</option>
                <option value="Física">Física</option>
                <option value="Química">Química</option>
                <option value="Educação Física">Educação Física</option>
                <option value="Artes">Artes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Avaliação</label>
              <select
                value={tipoAvaliacao}
                onChange={(e) => setTipoAvaliacao(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-black"
              >
                <option value="">Selecione o tipo</option>
                <option value="Prova 1">Prova 1</option>
                <option value="Prova 2">Prova 2</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Atividade">Atividade</option>
                <option value="Final">Final</option>
                <option value="Recuperação">Recuperação</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nota (0 a 10)</label>
              <input
                type="number"
                step="0.01"
                placeholder="Digite a nota"
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-gray-500 text-black"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-8 w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <FaCheckCircle />
            <span>Lançar Nota</span>
          </button>
        </div>

        {/* NOTAS LANÇADAS */}
        <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200">
          <h2 className="text-3xl font-bold text-indigo-700 mb-8 flex items-center space-x-3">
            <FaClipboardCheck className="text-indigo-600" />
            <span>Notas Lançadas</span>
          </h2>

          {notasLancadas.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Nenhuma nota lançada ainda. Comece lançando uma!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notasLancadas.map((n, index) => (
                <div key={index} className="bg-linear-to-r from-green-50 to-blue-50 p-6 rounded-xl shadow-md border border-green-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-2 mb-2">
                    <FaUser className="text-green-600" />
                    <span className="font-semibold text-gray-800">Matrícula: {n.matricula}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaBookOpen className="text-blue-600" />
                    <span className="text-gray-700">{n.disciplina} ({n.tipo_avaliacao})</span>
                  </div>
                  <div className="text-2xl font-bold text-indigo-600">Nota: {n.nota}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
