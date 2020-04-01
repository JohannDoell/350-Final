import sqlite3 as sq
from sqlite3 import Error
import os.path


def create_connection():
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sq.connect(os.path.abspath("../db/forum.db"), check_same_thread=False)
        print(sq.version)
    except Error as e:
        print(e)

    return conn


if __name__ == "__main__":
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM Threads")

    rows = cur.fetchall()

    for row in rows:
        print(row)

# EOF
