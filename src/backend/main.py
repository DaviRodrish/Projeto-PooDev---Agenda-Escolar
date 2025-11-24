from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from db import conectar
from models.aluno import Aluno
from models.escola import Escola
from models.professor import Professor
from models.secretario import Secretario
from models.usuario import Usuario

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou especificar o domínio do Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Usuario(BaseModel):
    email: str
    senha: str

class NovoUsuario(BaseModel):
    tipo: str
    nome: str
    email: str
    senha: str


@app.post("/login")
def login(usuario: Usuario):
    conn = conectar()
    cursor = conn.cursor()

    query = """
        SELECT nome, tipo 
        FROM usuario 
        WHERE email = %s AND senha = %s
    """
    cursor.execute(query, (usuario.email, usuario.senha))
    result = cursor.fetchone()

    if not result:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    nome, tipo = result

    return {
        "mensagem": f"Bem-vindo, {nome}!",
        "tipo": tipo
    }


@app.post("/cadastrar")
def cadastrar(novo: NovoUsuario):
    conn = conectar()
    cursor = conn.cursor()

    if novo.tipo not in ["aluno", "professor"]:
        raise HTTPException(status_code=400, detail="Tipo inválido")

    try:
        query = f"""
            INSERT INTO {novo.tipo} (nome, email, senha)
            VALUES (%s, %s, %s)
        """
        cursor.execute(query, (novo.nome, novo.email, novo.senha))
        conn.commit()
        return {"mensagem": f"{novo.tipo.capitalize()} cadastrado com sucesso!"}

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()
