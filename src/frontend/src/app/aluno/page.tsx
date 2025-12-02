"use client";

import { useRouter } from "next/navigation";
import { FaUserGraduate, FaClipboardList, FaCalendarAlt, FaChartLine, FaBullhorn, FaSignOutAlt } from "react-icons/fa"; // Ícones para melhorar a estética

export default function AlunoPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* HEADER */}
      <header className="bg-linear-to-r from-blue-600 to-indigo-600 text-white py-10 px-10 shadow-2xl relative">
        <div className="flex items-center space-x-4">
          <FaUserGraduate className="text-5xl" />
          <div>
            <h1 className="text-5xl font-extrabold tracking-wide">Portal do Aluno</h1>
            <p className="text-blue-100 text-xl mt-2">Acompanhe suas informações acadêmicas em um só lugar</p>
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

      {/* CONTEÚDO */}
      <main className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* BOLETIM */}
          <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 group">
            <h2 className="text-3xl font-bold text-blue-700 mb-4 flex items-center space-x-3 group-hover:text-blue-800 transition">
              <FaClipboardList className="text-blue-600" />
              <span>Boletim</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Visualize suas notas, médias e desempenho por disciplina.
            </p>
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-xl text-gray-700 shadow-inner">
              Seu boletim aparecerá aqui.
            </div>
          </div>

          {/* HORÁRIOS */}
          <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 group">
            <h2 className="text-3xl font-bold text-blue-700 mb-4 flex items-center space-x-3 group-hover:text-blue-800 transition">
              <FaCalendarAlt className="text-blue-600" />
              <span>Horário das Aulas</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Confira seus horários, turmas e salas atualizados.
            </p>
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-xl text-gray-700 shadow-inner">
              O horário estará disponível aqui.
            </div>
          </div>

          {/* FREQUÊNCIA */}
          <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 group">
            <h2 className="text-3xl font-bold text-blue-700 mb-4 flex items-center space-x-3 group-hover:text-blue-800 transition">
              <FaChartLine className="text-blue-600" />
              <span>Frequência</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Acompanhe suas presenças e faltas ao longo do período.
            </p>
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-xl text-gray-700 shadow-inner">
              Os dados de frequência aparecerão aqui.
            </div>
          </div>

          {/* AVISOS */}
          <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 group">
            <h2 className="text-3xl font-bold text-blue-700 mb-4 flex items-center space-x-3 group-hover:text-blue-800 transition">
              <FaBullhorn className="text-blue-600" />
              <span>Avisos Importantes</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Fique por dentro das atualizações da escola.
            </p>
            <ul className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-xl text-gray-700 shadow-inner list-disc ml-6">
              <li>Nenhum aviso no momento.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}