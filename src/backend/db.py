import psycopg2

def conectar():
    try:
        conn = psycopg2.connect(
            host='localhost',
            database='ProjetoPooDev',
            user='postgres',      # corrigido
            password='123456789'
        )
        return conn
    except Exception as e:
        print("Erro ao conectar ao banco:", e)
        return None
