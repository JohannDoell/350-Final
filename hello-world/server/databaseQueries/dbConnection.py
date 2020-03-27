import sqlite3 as sq
from sqlite3 import Error


def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sq.connect(db_file)
        print(sq.version)
    except Error as e:
        print(e)

    return conn

# EOF
