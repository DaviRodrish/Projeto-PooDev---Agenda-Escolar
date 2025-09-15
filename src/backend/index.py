#criação das primeiras classes

class Usuario:
    def __init__(self, id, nome, email, senha):
        self.id = id
        self.nome = nome
        self.email = email
        self.senha = senha

    def mostraInfos(self):
        print(f"ID: {self.id}")
        print(f"Nome: {self.nome}")
        print(f"email: {self.email}")
        

class Aluno(Usuario):
    def __init__(self, id, nome, email, senha, matricula, curso):
        super().__init__(id, nome, email, senha)
        self.matricula = matricula
        self.curso = curso

    def mostraInfos(self):
        super().mostraInfos()
        print(f"Matricula: {self.matricula}")
        print(f"Curso: {self.curso}")

class Professor(Usuario):
    def __init__(self, id, nome, email, senha, idProfessor):
        super().__init__(id, nome, email, senha)
        self.idProfessor = idProfessor

    def mostraInfos(self):
        super().mostraInfos()
        print(f"id de Professor: {self.idProfessor}")



#testes