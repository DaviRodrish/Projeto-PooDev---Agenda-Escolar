"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type NotaLancada = {
  matricula: string;
  disciplina: string;
  nota: number;
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
  const [notasLancadas, setNotasLancadas] = useState<NotaLancada[]>([]);

  const handleSubmit = async () => {
    const notaNum = parseFloat(nota);

    if (isNaN(notaNum) || notaNum < 0 || notaNum > 10) {
      alert("A nota deve ser um número entre 0 e 10.");
      return;
    }

    if (!matricula.trim() || !disciplina.trim()) {
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
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // se sua API devolve { erro: "..." } ou status != 2xx
        alert("Erro: " + (data.erro ?? JSON.stringify(data)));
        return;
      }

      // sucesso: atualiza lista localmente
      setNotasLancadas(prev => [
        ...prev,
        { matricula, disciplina, nota: notaNum },
      ]);

      // limpa campos
      setMatricula("");
      setDisciplina("");
      setNota("");

      alert("Nota lançada com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Falha ao conectar à API.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-purple-600 text-white py-8 px-10 shadow-lg relative">
        <h1 className="text-4xl font-bold">Portal do Professor</h1>
        <p className="text-purple-100 text-lg mt-1">Gerencie suas turmas e lance notas</p>

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

          <div className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Matrícula do aluno"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl placeholder-zinc-700 text-black"
            />

            <select
              value={disciplina}
              onChange={(e) => setDisciplina(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl text-black"
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


            <input
              type="number"
              step="0.01"
              placeholder="Nota (0 a 10)"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl placeholder-zinc-700 text-black"
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

          <ul className="mt-4 bg-purple-50 border border-purple-100 p-4 rounded-xl text-gray-700 list-disc ml-6">
            {notasLancadas.length === 0 ? (
              <li>Nenhuma nota lançada ainda.</li>
            ) : (
              notasLancadas.map((n, index) => (
                <li key={index}>
                  Matrícula: <b>{n.matricula}</b> — {n.disciplina}: <b>{n.nota}</b>
                </li>
              ))
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
