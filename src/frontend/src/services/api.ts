const API_URL = "https://agenda-escolar-backend.onrender.com"; // substitui pelo link do Render se for diferente

export async function getAlunos() {
  const response = await fetch(`${API_URL}/alunos`);
  if (!response.ok) throw new Error("Erro ao buscar alunos");
  return response.json();
}

export async function cadastrarAluno(data: any) {
  const response = await fetch(`${API_URL}/alunos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erro ao cadastrar aluno");
  return response.json();
}
