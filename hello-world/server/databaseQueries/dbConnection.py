import sqlite3 as sq
from sqlite3 import Error


def create_connection():
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sq.connect("../forum.db")
        print(sq.version)
    except Error as e:
        print(e)

    return conn

# EOF
