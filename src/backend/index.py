class Usuario:
    def __init__(self, nome, email, senha):
        self.nome = nome
        self.email = email
        self.senha = senha

    def mostraInfos(self):
        print(f"Nome: {self.nome}")
        print(f"Email: {self.email}")


class Aluno(Usuario):
    def __init__(self, nome, email, senha, matricula, curso, idAluno):
        super().__init__(nome, email, senha)
        self.matricula = matricula
        self.idAluno = idAluno
        self.curso = curso
        self.boletim = {}  # dicionário {disciplina: nota}
        self.gradeHoraria = []  # lista de disciplinas/horários

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
