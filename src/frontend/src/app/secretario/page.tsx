"use client";

import { useRouter } from "next/navigation";

export default function SecretarioPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="bg-green-600 text-white py-8 px-10 shadow-lg relative">
        <h1 className="text-4xl font-bold">Portal do Secretário</h1>
        <p className="text-green-100 text-lg mt-1">
          Visão administrativa da escola
        </p>

        <button
          onClick={handleLogout}
          className="absolute top-6 right-8 bg-red-500 hover:bg-red-600 transition text-white font-semibold px-4 py-2 rounded-xl shadow-md"
        >
          Sair
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* ALUNOS */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-green-600">Alunos</h2>
            <p className="text-gray-600 mt-3">
              Total cadastrado: <span className="font-bold">312</span>
            </p>
          </div>

          {/* PROFESSORES */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-green-600">Professores</h2>
            <p className="text-gray-600 mt-3">
              Total ativos: <span className="font-bold">28</span>
            </p>
          </div>

          {/* TURMAS */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-green-600">Turmas</h2>
            <p className="text-gray-600 mt-3">
              Total de turmas: <span className="font-bold">24</span>
            </p>
          </div>

        </div>

        {/* RELATÓRIO GERAL */}
        <div className="bg-white mt-10 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-green-600">Relatório Geral</h2>
          <p className="text-gray-600 mt-3">
            Aqui serão exibidos dados completos do sistema, como matrículas,
            documentos, horários e organização interna.
          </p>

          <div className="mt-4 bg-green-50 border border-green-100 p-4 rounded-xl text-gray-700">
            Relatórios aparecerão aqui.
          </div>
        </div>

      </main>

    </div>
  );
}
