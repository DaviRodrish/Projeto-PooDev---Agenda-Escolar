"use client";

import { useRouter } from "next/navigation";

export default function AlunoPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="bg-blue-600 text-white py-8 px-10 shadow-lg relative">
        <h1 className="text-4xl font-bold">Portal do Aluno</h1>
        <p className="text-blue-100 text-lg mt-1">
          Acompanhe suas informações acadêmicas em um só lugar
        </p>

        {/* BOTÃO DE SAIR */}
        <button
          onClick={handleLogout}
          className="absolute top-6 right-8 bg-red-500 hover:bg-red-600 transition text-white font-semibold px-4 py-2 rounded-xl shadow-md"
        >
          Sair
        </button>
      </header>

      {/* CONTEÚDO */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* BOLETIM */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition group">
            <h2 className="text-2xl font-semibold text-blue-600 group-hover:text-blue-700 transition">
              Boletim
            </h2>
            <p className="mt-3 text-gray-600">
              Visualize suas notas, médias e desempenho por disciplina.
            </p>
            <div className="mt-4 bg-blue-50 border border-blue-100 p-4 rounded-xl text-gray-700">
              Seu boletim aparecerá aqui.
            </div>
          </div>

          {/* HORÁRIOS */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition group">
            <h2 className="text-2xl font-semibold text-blue-600 group-hover:text-blue-700 transition">
              Horário das Aulas
            </h2>
            <p className="mt-3 text-gray-600">
              Confira seus horários, turmas e salas atualizados.
            </p>
            <div className="mt-4 bg-blue-50 border border-blue-100 p-4 rounded-xl text-gray-700">
              O horário estará disponível aqui.
            </div>
          </div>

          {/* FREQUÊNCIA */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition group">
            <h2 className="text-2xl font-semibold text-blue-600 group-hover:text-blue-700 transition">
              Frequência
            </h2>
            <p className="mt-3 text-gray-600">
              Acompanhe suas presenças e faltas ao longo do período.
            </p>
            <div className="mt-4 bg-blue-50 border border-blue-100 p-4 rounded-xl text-gray-700">
              Os dados de frequência aparecerão aqui.
            </div>
          </div>

          {/* AVISOS */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition group">
            <h2 className="text-2xl font-semibold text-blue-600 group-hover:text-blue-700 transition">
              Avisos Importantes
            </h2>
            <p className="mt-3 text-gray-600">
              Fique por dentro das atualizações da escola.
            </p>
            <ul className="mt-4 bg-blue-50 border border-blue-100 p-4 rounded-xl text-gray-700 list-disc ml-6">
              <li>Nenhum aviso no momento.</li>
            </ul>
          </div>

        </div>
      </main>

    </div>
  );
}
