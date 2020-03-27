import dbConnection as dbConnection
def insertThread(conn, thread):
    """
    insert a thread into the database
    :param conn: connection to the db
    :param thread: the new thread data as a tuple
    :return: none
    """
    sql = '''   INSERT INTO Threads(Title, Body, CategoryID, time, UserID)
                VALUES(?,?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, thread)


conn = dbConnection.create_connection()
insertThread(conn,("this is my test thread", "hello", 1, ))