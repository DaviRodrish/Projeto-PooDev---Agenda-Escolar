from db import conectar
from .usuario import Usuario
import time  # Para matricula de alunos

class Secretario(Usuario):
    def __init__(self, nome, email, senha, idSecretario):
        super().__init__(nome, email, senha)
        self.idSecretario = idSecretario

    def mostraInfos(self):
        super().mostraInfos()
        print(f"ID do Secretário: {self.idSecretario}")

    def alocaSala(self, turma, sala):
        print(f"A turma {turma} foi alocada para a sala {sala}.")

    def cadastrarUsuario(self, tipo, nome, email, senha):
        conn = conectar()
        cursor = conn.cursor()
        try:
            # Senha armazenada em texto plano (removido hashing com bcrypt)
            # hashed_senha = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            
            # Verifique se o email já existe na tabela usuario
            cursor.execute("SELECT id FROM usuario WHERE email = %s", (email,))
            if cursor.fetchone():
                raise ValueError("Email já cadastrado.")
            
            # Insira na tabela usuario e pegue o ID gerado
            cursor.execute("""
                INSERT INTO usuario (nome, email, senha, tipo)
                VALUES (%s, %s, %s, %s)
                RETURNING id
            """, (nome, email, senha, tipo.lower()))  # Use 'senha' diretamente
            usuario_id = cursor.fetchone()[0]
            
            if tipo.lower() == 'aluno':
                # Gere matricula simples (timestamp)
                matricula = str(int(time.time()))
                
                # Insira na tabela alunos
                cursor.execute("""
                    INSERT INTO alunos (id, matricula)
                    VALUES (%s, %s)
                """, (usuario_id, matricula))
                print(f"Aluno '{nome}' cadastrado com sucesso! Matrícula: {matricula}")
            
            elif tipo.lower() == 'professor':
                # Gere id_professor sequencial (PROF001, PROF002, etc.)
                cursor.execute("SELECT COALESCE(MAX(CAST(SUBSTRING(id_professor FROM 5) AS INTEGER)), 0) FROM professores")
                ultimo_num = cursor.fetchone()[0]
                proximo_num = ultimo_num + 1
                id_professor = f"PROF{proximo_num:03d}"  # Ex.: PROF001
                
                # Insira na tabela professores
                cursor.execute("""
                    INSERT INTO professores (id_usuario, id_professor)
                    VALUES (%s, %s)
                """, (usuario_id, id_professor))
                print(f"Professor '{nome}' cadastrado com sucesso! ID Professor: {id_professor}")
            
            else:
                raise ValueError("Tipo inválido! Use 'aluno' ou 'professor'.")
            
            conn.commit()
        
        except ValueError as ve:
            print(f"Erro de validação: {ve}")
            conn.rollback()
            raise
        except Exception as e:
            print(f"Erro ao cadastrar {tipo}: {e}")
            conn.rollback()
            raise
        finally:
            cursor.close()
            conn.close()
