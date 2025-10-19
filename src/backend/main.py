from aluno import Aluno
from professor import Professor
from escola import Escola

aluno1 = Aluno('davi','davi@mail.com','123456','20250001','Ciencia da Computação', 'a1')
aluno1.salvar_no_banco()

alunos = Aluno.listar_todos()
for a in alunos:
    print(a)