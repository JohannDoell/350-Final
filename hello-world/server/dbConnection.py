import psycopg2 as psy

conn = None
try:
    conn = psy.connect(host="localhost", database="forum", user="web", password="pass")

    cur = conn.cursor()
    cur.execute('SELECT version()')

    version = cur.fetchone()[0]

except psy.DatabaseError as e:

    print("Failed to connect to the database")
    print("Error:" + str(e))


