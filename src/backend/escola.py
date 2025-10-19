from db import conectar


class Escola:
    def __init__(self, nome, idUnidade, endereco):
        self.nome = nome
        self.idUnidade = idUnidade
        self.endereco = endereco
        self.alunos = []
        self.professores = []

    def mostraInfos(self):
        print(f"ID da Unidade: {self.idUnidade}")
        print(f"Nome: {self.nome}")
        print(f"Endereço: {self.endereco}")

    def adicionaAluno(self, aluno):
        self.alunos.append(aluno)
        print(f"Aluno {aluno.nome} adicionado à escola {self.nome}.")

    def adicionaProfessor(self, professor):
        self.professores.append(professor)
        print(f"Professor {professor.nome} adicionado à escola {self.nome}.")
