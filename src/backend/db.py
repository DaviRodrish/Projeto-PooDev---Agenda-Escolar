import psycopg2
import bcrypt

def conectar():
    try:
        conn = psycopg2.connect(
            host='localhost',
            database='ProjetoPooDev',
            user='postgres',
            password='123456789'
        )
        return conn
    except Exception as e:
        print("Erro ao conectar ao banco:", e)
        return None


def verificar_usuario(email, senha):
    conn = conectar()
    if not conn:
        return None
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT id, senha, tipo, nome FROM usuario WHERE email = %s", (email,))
        user = cursor.fetchone()

        if user and bcrypt.checkpw(senha.encode('utf-8'), user[1].encode('utf-8')):
            return {"id": user[0], "tipo": user[2], "nome": user[3]}

        return None

    except Exception as e:
        print("Erro ao verificar usuário:", e)
        return None

    finally:
        conn.close()
