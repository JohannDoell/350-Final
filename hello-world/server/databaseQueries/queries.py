import dbConnection as dbConnection
import datetime as datetime
import json as json


def insertThread(conn, threadJson):
    """
    insert a thread into the database
    :param conn: connection to the db
    :param threadJson: the new thread data as a json object
    :return: none
    """
    threadDict = json.loads(threadJson)
    thread = (threadDict["boardID"], threadDict["isPinned"], threadDict["title"], threadDict["replies"], threadDict["views"])
    sql = '''   INSERT INTO Threads(boardID, isPinned, title, replies, views)
                VALUES(?,?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, thread)
    print("inserted thread", thread)


def getThreadsFromBoardAsJsons(conn, boardID):
    """
    return all threads with a specified boardID
    :param conn: connection to the database
    :param boardID: the boardID
    :return: a list of json objects
    """
    conn.row_factory = dbConnection.sq.Row
    cur = conn.cursor()
    cur.execute("SELECT * FROM Threads WHERE boardID=?", (boardID, ))

    rows = [dict(row) for row in cur.fetchall()]  # list of tuples

    jsonRows = [json.dumps(row) for row in rows]

    return jsonRows

def insertBoard(conn,boardJson):
    """
    insert a board into the database
    :param conn: connection to the db
    :param boardJson: the new board data as a json object
    :return: none
    """
    boardDict = json.loads(boardJson)
    board = (boardDict["boardName"], boardDict["categoryID"])
    sql = '''   INSERT INTO Boards(boardName, categoryID)
                VALUES(?,?) '''
    cur = conn.cursor()
    cur.execute(sql, board)
    print("inserted board", board)

def getBoardsFromCategoryAsJsons(conn, catID):
    """
    return all Boards with a specified categoryID
    :param conn: connection to the database
    :param catID: the categoryID
    :return: a list of json objects
    """
    conn.row_factory = dbConnection.sq.Row
    cur = conn.cursor()
    cur.execute("SELECT * FROM Boards WHERE categoryID=?", (catID, ))

    rows = [dict(row) for row in cur.fetchall()]  # list of tuples

    jsonRows = [json.dumps(row) for row in rows]

    return jsonRows


def insertCategory(conn,categoryJson):
    """
    insert a category into the database
    :param conn: connection to the db
    :param categoryJson: the new category data as a json object
    :return: none
    """
    categoryDict = json.loads(categoryJson)
    category = (categoryDict["categoryName"])
    sql = '''   INSERT INTO Categories(categoryName)
                VALUES(?) '''
    cur = conn.cursor()
    cur.execute(sql, (category, ))
    print("inserted category", category)


def getCategoriesAsJsons(conn):
    """
    return all categories
    :param conn: connection to the database
    :return: a list of json objects
    """
    conn.row_factory = dbConnection.sq.Row
    cur = conn.cursor()
    cur.execute("SELECT * FROM Categories")

    rows = [dict(row) for row in cur.fetchall()]  # list of tuples

    jsonRows = [json.dumps(row) for row in rows]
    return jsonRows


if __name__ == "__main__":
    conn = dbConnection.create_connection()

    # thread tests
    insertThread(conn, '{"boardID": 1, "isPinned": 0, "title": "test thread", "replies": 1, "views": 2}')
    print("threads")
    print(getThreadsFromBoardAsJsons(conn, 1))


    # board tests
    print("boards")
    insertBoard(conn, '{"boardName": "board test", "categoryID": 1}')
    print(getBoardsFromCategoryAsJsons(conn, 1))

    # category tests
    print("category tests")
    insertCategory(conn, '{"categoryName": "test category"}')
    getCategoriesAsJsons(conn)

# EOF
