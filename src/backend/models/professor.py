from .usuario import Usuario
from db import conectar

class Professor(Usuario):
    def __init__(self, nome, email, senha, idProfessor):
        super().__init__(nome, email, senha)
        self.idProfessor = idProfessor

    
    def mostraInfos(self):
        super().mostraInfos()
        print(f"ID de Professor: {self.idProfessor}")

    
    def lancaNota(self, aluno, disciplina, nota):
        aluno.boletim[disciplina] = nota
        print(f"Nota {nota} lançada para {aluno.nome} em {disciplina}.")

    
    def editaNota(self, aluno, disciplina, novaNota):
        if disciplina in aluno.boletim:
            aluno.boletim[disciplina] = novaNota
            print(f"Nota de {aluno.nome} em {disciplina} alterada para {novaNota}.")
        else:
            print(f"{aluno.nome} não possui nota registrada em {disciplina}.")

    
    def salvar_no_banco(self):
        conn = conectar()
        if not conn:
            print("Falha na conexão com o banco")
            return

        try:
            cur = conn.cursor()
            cur.execute("""
                INSERT INTO usuarios (nome, email, senha, tipo)
                VALUES (%s, %s, %s, 'professor') RETURNING id;
            """, (self.nome, self.email, self.senha))
            id_usuario = cur.fetchone()[0]

            cur.execute("""
                INSERT INTO professores (id_usuario, idProfessor)
                VALUES (%s, %s);
            """, (id_usuario, self.idProfessor))

            conn.commit()
            print(f"Professor {self.nome} salvo com sucesso!")

        except Exception as e:
            conn.rollback()
            print("Erro ao salvar professor:", e)
        finally:
            cur.close()
            conn.close()

    
    @staticmethod
    def listar_todos():
        conn = conectar()
        if not conn:
            return []

        try:
            cur = conn.cursor()
            cur.execute("""
                SELECT u.nome, u.email, p.idProfessor
                FROM professores p
                JOIN usuarios u ON u.id = p.id_usuario;
            """)
            return cur.fetchall()
        finally:
            cur.close()
            conn.close()

