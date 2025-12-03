from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from db import conectar, verificar_usuario
from models.professor import router as professor_router
from pydantic import BaseModel
from models.secretario import Secretario
from models.aluno import Aluno


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROTAS DO PROFESSOR
app.include_router(professor_router)

# ======================
# LOGIN
# ======================

class UsuarioLogin(BaseModel):
    email: str
    senha: str

@app.post("/login")
def login(usuario: UsuarioLogin):
    user = verificar_usuario(usuario.email, usuario.senha)
    if not user:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    return {
        "mensagem": f"Bem-vindo, {user['nome']}!",
        "tipo": user["tipo"],
        "id_usuario": user["id"]  # Adicione o ID para usar no frontend
    }

# ======================
# CADASTRO DE USUÁRIOS (SECRETÁRIO)
# ======================

class UsuarioCadastro(BaseModel):
    tipo: str
    nome: str
    email: str
    senha: str

@app.post("/api/cadastrar-usuario")
def cadastrar_usuario(dados: UsuarioCadastro):
    try:
        tipo = dados.tipo.lower()
        nome = dados.nome
        email = dados.email
        senha = dados.senha
        
        if tipo not in ['aluno', 'professor']:
            raise HTTPException(status_code=400, detail="Tipo inválido. Use 'aluno' ou 'professor'.")
        if not all([nome, email, senha]):
            raise HTTPException(status_code=400, detail="Todos os campos são obrigatórios.")
        
        secretario = Secretario("Nome do Secretario", "email@exemplo.com", "senha", 1)
        secretario.cadastrarUsuario(tipo, nome, email, senha)
        
        return {"message": "Usuário cadastrado com sucesso"}
    
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

# ======================
# PERFIL DO ALUNO
# ======================

class PerfilRequest(BaseModel):
    id_usuario: int

@app.post("/api/aluno/perfil")
def buscar_perfil_aluno(dados: PerfilRequest):
    try:
        perfil = Aluno.buscar_perfil(dados.id_usuario)
        if not perfil:
            raise HTTPException(status_code=404, detail="Perfil não encontrado")
        return perfil
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar perfil: {str(e)}")


