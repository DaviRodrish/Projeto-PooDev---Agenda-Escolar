from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from db import conectar

router = APIRouter(prefix="/professor")

class NotaEntrada(BaseModel):
    matricula: str
    disciplina: str
    nota: float
    tipo_avaliacao: str  # Novo campo obrigatório para diferenciar notas

@router.post("/lancar-nota")
def lancar_nota(dados: NotaEntrada):
    conn = conectar()
    if conn is None:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco de dados.")

    cur = conn.cursor()

    try:
        # Buscar aluno pela matrícula
        cur.execute("SELECT id FROM alunos WHERE matricula = %s", (dados.matricula,))
        aluno = cur.fetchone()
        if not aluno:
            raise HTTPException(status_code=404, detail="Aluno não encontrado.")

        aluno_id = aluno[0]

        # Buscar disciplina pelo nome
        cur.execute("SELECT id FROM disciplinas WHERE nome = %s", (dados.disciplina,))
        disc = cur.fetchone()
        if not disc:
            raise HTTPException(status_code=404, detail="Disciplina não encontrada.")

        disciplina_id = disc[0]

        # Inserir nota no banco (agora com tipo_avaliacao)
        cur.execute("""
            INSERT INTO notas (matricula, disciplina_id, nota, data_lancamento, tipo_avaliacao)
            VALUES (%s, %s, %s, NOW(), %s)
        """, (dados.matricula, disciplina_id, dados.nota, dados.tipo_avaliacao))

        conn.commit()

        return {"mensagem": "Nota lançada com sucesso!"}

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cur.close()
        conn.close()