from db import conectar
from usuario import Usuario

class Aluno(Usuario):
    def __init__(self, nome, email, senha, matricula, curso, idAluno, id_usuario=None):
        super().__init__(nome, email, senha)
        self.matricula = matricula
        self.curso = curso
        self.idAluno = idAluno
        self.id_usuario = id_usuario

    def salvar_no_banco(self):
        conn = conectar()
        cur = conn.cursor()

        cur.execute("""
            INSERT INTO usuarios (nome, email, senha, tipo)
            VALUES (%s, %s, %s, 'aluno') RETURNING id;
        """, (self.nome, self.email, self.senha))
        id_usuario = cur.fetchone()[0]

    
        cur.execute("""
            INSERT INTO alunos (id_usuario, matricula, curso, idAluno)
            VALUES (%s, %s, %s, %s);
        """, (id_usuario, self.matricula, self.curso, self.idAluno))

        conn.commit()
        cur.close()
        conn.close()

        print(f"Aluno {self.nome} salvo com sucesso no banco!")

    @staticmethod
    def listar_todos():
        conn = conectar()
        cur = conn.cursor()
        cur.execute("""
            SELECT u.nome, u.email, a.matricula, a.curso, a.idAluno
            FROM alunos a
            JOIN usuarios u ON u.id = a.id_usuario;
        """)
        alunos = cur.fetchall()
        cur.close()
        conn.close()
        return alunos


    def mostraInfos(self):
        super().mostraInfos()
        print(f"Matrícula: {self.matricula}")
        print(f"Curso: {self.curso}")
        print(f"ID do Aluno: {self.idAluno}")

    def mostraBoletim(self):
        if not self.boletim:
            print("Boletim vazio.")
        else:
            print("Boletim:")
            for disciplina, nota in self.boletim.items():
                print(f"{disciplina}: {nota}")

    def mostraGradeHoraria(self):
        if not self.gradeHoraria:
            print("Grade horária não cadastrada.")
        else:
            print("Grade Horária:")
            for disciplina in self.gradeHoraria:
                print(f"- {disciplina}")
