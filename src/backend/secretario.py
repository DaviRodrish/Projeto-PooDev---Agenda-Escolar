from db import conectar
from usuario import Usuario


class Secretario(Usuario):
    def __init__(self, nome, email, senha, idSecretario):
        super().__init__(nome, email, senha)
        self.idSecretario = idSecretario

    def mostraInfos(self):
        super().mostraInfos()
        print(f"ID do Secretário: {self.idSecretario}")

    def alocaSala(self, turma, sala):
        print(f"A turma {turma} foi alocada para a sala {sala}.")


class ProReitor(Usuario):
    def __init__(self, nome, email, senha):
        super().__init__(nome, email, senha)

    def mostraInfos(self):
        super().mostraInfos()
        print("Cargo: Pró-Reitor")

