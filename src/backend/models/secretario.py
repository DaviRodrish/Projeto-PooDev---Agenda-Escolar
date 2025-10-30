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

    def cadastrarUsuario(self,tipo,nome,email,senha):
        conn = conectar()
        cursor = conn.cursor()
        try:
            if tipo.lower() == 'aluno':
                query = """
                    INSERT INTO aluno (nome, email, senha)
                    VALUES (%s, %s, %s)
                """
                cursor.execute(query, (nome, email, senha))
                print(f"Aluno '{nome}' cadastrado com sucesso!")

            elif tipo.lower() == 'professor':
                query = """
                    INSERT INTO professor (nome, email, senha)
                    VALUES (%s, %s, %s)
                """
                cursor.execute(query, (nome, email, senha))
                print(f"Professor '{nome}' cadastrado com sucesso!")

            else:
                print("Tipo inválido! Use 'aluno' ou 'professor'.")
                return

            conn.commit()

        except Exception as e:
            print(f"Erro ao cadastrar {tipo}: {e}")
            conn.rollback()

        finally:
            cursor.close()
            conn.close()

class ProReitor(Usuario):
    def __init__(self, nome, email, senha):
        super().__init__(nome, email, senha)

    def mostraInfos(self):
        super().mostraInfos()
        print("Cargo: Pró-Reitor")

