"use client"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8000/login", { email, senha })
      alert(res.data.mensagem)
      router.push("/home")
    } catch (err: any) {
      setErro(err.response?.data?.detail || "Erro ao fazer login")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
        <input
          className="w-full border rounded-lg p-2 mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border rounded-lg p-2 mb-3"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        {erro && <p className="text-red-500 text-sm mb-2">{erro}</p>}
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700"
        >
          Entrar
        </button>
      </div>
    </div>
  )
}
