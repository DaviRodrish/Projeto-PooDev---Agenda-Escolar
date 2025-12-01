from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from db import conectar, verificar_usuario
from models.professor import router as professor_router
from pydantic import BaseModel

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
