"use client"
import { useState } from "react"
import axios from "axios"

export default function HomePage() {
  const [tipo, setTipo] = useState("aluno")
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [mensagem, setMensagem] = useState("")

  const handleCadastro = async () => {
    try {
      const res = await axios.post("http://localhost:8000/cadastrar", {
        tipo,
        nome,
        email,
        senha,
      })
      setMensagem(res.data.mensagem)
      setNome("")
      setEmail("")
      setSenha("")
    } catch (err: any) {
      setMensagem(err.response?.data?.detail || "Erro ao cadastrar")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px]">
        <h1 className="text-2xl font-semibold mb-4 text-center">Cadastrar Usuário</h1>

        <select
          className="border p-2 rounded-lg w-full mb-3"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="aluno">Aluno</option>
          <option value="professor">Professor</option>
        </select>

        <input
          className="border p-2 rounded-lg w-full mb-3"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          className="border p-2 rounded-lg w-full mb-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 rounded-lg w-full mb-3"
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          onClick={handleCadastro}
          className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700"
        >
          Cadastrar
        </button>

        {mensagem && <p className="text-center mt-4 text-gray-700">{mensagem}</p>}
      </div>
    </div>
  )
}
