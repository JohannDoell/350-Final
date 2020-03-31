import dbConnection
import json as json
import passwordHash


def insertThread(conn, threadJson):
    """
    insert a thread into the database
    :param conn: connection to the db
    :param threadJson: the new thread data as a json object
    :return: none
    """
    threadDict = json.loads(threadJson)
    thread = (
    threadDict["boardID"], threadDict["isPinned"], threadDict["title"], threadDict["replies"], threadDict["views"])
    sql = '''   INSERT INTO Threads(boardID, isPinned, title, replies, views)
                VALUES(?,?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, thread)


def getThreadsFromBoardAsJsons(conn, boardID):
    """
    return all threads with a specified boardID
    :param conn: connection to the database
    :param boardID: the boardID
    :return: a list of json objects
    """
    conn.row_factory = dbConnection.sq.Row
    cur = conn.cursor()
    cur.execute("SELECT * FROM Threads WHERE boardID=?", (boardID,))

    rows = [dict(row) for row in cur.fetchall()]

    jsonRows = json.dumps([row for row in rows])

    return jsonRows


def insertBoard(conn, boardJson):
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


def getBoardsFromCategoryAsJsons(conn, catID):
    """
    return all Boards with a specified categoryID
    :param conn: connection to the database
    :param catID: the categoryID
    :return: a list of json objects
    """
    conn.row_factory = dbConnection.sq.Row
    cur = conn.cursor()
    cur.execute("SELECT * FROM Boards WHERE categoryID=?", (catID,))

    rows = [dict(row) for row in cur.fetchall()]

    jsonRows = json.dumps([row for row in rows])

    return jsonRows


def insertCategory(conn, categoryJson):
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
    cur.execute(sql, (category,))


def getCategoriesAsJsons(conn):
    """
    return all categories
    :param conn: connection to the database
    :return: a list of json objects
    """
    conn.row_factory = dbConnection.sq.Row
    cur = conn.cursor()
    cur.execute("SELECT * FROM Categories")

    rows = [dict(row) for row in cur.fetchall()]

    jsonRows = json.dumps([row for row in rows])
    return jsonRows


def insertReply(conn, replyJson):
    replyDict = json.loads(replyJson)
    reply = (replyDict["threadID"], replyDict["userID"], replyDict["body"], replyDict["dateCreated"],
             replyDict["dateEdited"])

    sql = '''   INSERT INTO Replies(threadID, userID, body, dateCreated, dateEdited)
                VALUES(?,?,?,?,?)'''
    cur = conn.cursor()
    cur.execute(sql, reply)


def getUserAsDict(conn, userID):
    conn.row_factory = dbConnection.sq.Row
    cur = conn.cursor()
    cur.execute("SELECT * FROM Users WHERE userID=?", (userID,))

    row = dict(cur.fetchone())

    return row


def getRepliesFromThreadAsJsons(conn, threadID):
    """
    get all the replies of a certain thread
    :param conn: connection to database
    :param threadID: int foreign key of the thread
    :return: list of json replies objects
    """
    conn.row_factory = dbConnection.sq.Row
    cur = conn.cursor()
    cur.execute("SELECT * FROM Replies WHERE threadID=?", (threadID,))

    rows = [dict(row) for row in cur.fetchall()]

    for row in rows:
        row['username'] = getUserAsDict(conn, row['userID'])["username"]

    jsonRows = json.dumps([row for row in rows])
    return jsonRows


def getUserAsJson(conn, userID):
    """
    get a user's info from the database based on their id
    :param conn: the connection to the database
    :param userID: the id of the wanted user
    :return: a json about the user
    """
    conn.row_factory = dbConnection.sq.Row
    cur = conn.cursor()
    cur.execute("SELECT * FROM Users WHERE userID=?", (userID,))

    row = dict(cur.fetchone())

    return json.dumps(row)


def insertUser(conn, userJson):
    """

    :param conn: connection to database
    :param userJson: json with user info
    :return: none
    """
    userDict = json.loads(userJson)
    userDict["password"] = passwordHash.hashPassword(userDict["password"])
    user = (userDict["username"], userDict["password"])
    cur = conn.cursor()
    sql = '''   INSERT INTO Users(username,password)
                VALUES (?,?)'''

    cur.execute(sql, user)


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
    print(getCategoriesAsJsons(conn))

    # replies tests
    print("replies tests")
    insertReply(conn,
                '{"threadID": 1, "userID": 1, "body": "test reply", "dateCreated": "2020-03-27 22:17:56", "dateEdited": "2020-03-27 22:17:56"}')
    print(getRepliesFromThreadAsJsons(conn, 1))

    # users test
    print(getUserAsJson(conn, 1))
    insertUser(conn, '{"username": "tester", "password": "yuh"}')
    print(getUserAsJson(conn, 6))

    conn.commit()
    conn.close()
# EOF
