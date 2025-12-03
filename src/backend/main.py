from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from db import conectar, verificar_usuario
from models.professor import router as professor_router
from pydantic import BaseModel
from models.secretario import Secretario  # Importe a classe Secretario (ajuste o caminho se necessário)

# Se usar JWT, instale e importe: from fastapi_jwt_auth import AuthJWT
# app.config['JWT_SECRET_KEY'] = 'sua-chave-secreta'  # Configure no app

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
        "tipo": user["tipo"]
    }

# ======================
# CADASTRO DE USUÁRIOS (SECRETÁRIO)
# ======================

class UsuarioCadastro(BaseModel):
    tipo: str  # 'aluno' ou 'professor'
    nome: str
    email: str
    senha: str

@app.post("/api/cadastrar-usuario")
def cadastrar_usuario(dados: UsuarioCadastro):  # , Authorize: AuthJWT = Depends()  # Descomente se usar JWT
    try:
        # Se usar JWT, valide o token: Authorize.jwt_required()
        # current_user = Authorize.get_jwt_subject()  # Pegue o ID do usuário logado
        
        tipo = dados.tipo.lower()
        nome = dados.nome
        email = dados.email
        senha = dados.senha
        
        # Validação básica
        if tipo not in ['aluno', 'professor']:
            raise HTTPException(status_code=400, detail="Tipo inválido. Use 'aluno' ou 'professor'.")
        if not all([nome, email, senha]):
            raise HTTPException(status_code=400, detail="Todos os campos são obrigatórios.")
        
        # Instancie o Secretario (ajuste com dados reais do usuário logado, ex.: do JWT)
        # Exemplo: id_secretario = current_user  # Se usar JWT
        secretario = Secretario("Nome do Secretario", "email@exemplo.com", "senha", 1)  # Ajuste o ID
        
        # Chame o método para cadastrar
        secretario.cadastrarUsuario(tipo, nome, email, senha)
        
        return {"message": "Usuário cadastrado com sucesso"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")
