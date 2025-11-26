"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfessorPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  // Estados (depois você troca pela API real)
  const [aluno, setAluno] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [nota, setNota] = useState("");

  const handleSubmit = () => {
    alert(`Nota lançada: ${aluno} - ${disciplina} = ${nota}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="bg-purple-600 text-white py-8 px-10 shadow-lg relative">
        <h1 className="text-4xl font-bold">Portal do Professor</h1>
        <p className="text-purple-100 text-lg mt-1">
          Gerencie suas turmas e lance notas
        </p>

        <button
          onClick={handleLogout}
          className="absolute top-6 right-8 bg-red-500 hover:bg-red-600 transition text-white font-semibold px-4 py-2 rounded-xl shadow-md"
        >
          Sair
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">

        {/* LANÇAR NOTAS */}
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-purple-600">Lançar Notas</h2>
          <p className="text-gray-600 mt-2">
           
          </p>

          <div className="mt-6 space-y-4">

            <input
              type="text"
              placeholder="Nome do aluno"
              value={aluno}
              onChange={(e) => setAluno(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl"
            />

            <input
              type="text"
              placeholder="Disciplina"
              value={disciplina}
              onChange={(e) => setDisciplina(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl"
            />

            <input
              type="number"
              placeholder="Nota"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl"
            />

            <button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl shadow-md transition"
            >
              Lançar Nota
            </button>
          </div>
        </div>

        {/* NOTAS LANÇADAS */}
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-purple-600">Notas Lançadas</h2>
          <p className="text-gray-600 mt-2">
            Histórico das notas registradas (mock).
          </p>

          <ul className="mt-4 bg-purple-50 border border-purple-100 p-4 rounded-xl text-gray-700 list-disc ml-6">
            <li>João — Matemática: 8.5</li>
            <li>Maria — Português: 9.0</li>
          </ul>
        </div>

      </main>

    </div>
  );
}
