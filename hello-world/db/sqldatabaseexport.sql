--
-- File generated with SQLiteStudio v3.2.1 on Tue Mar 31 18:07:35 2020
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: Boards
DROP TABLE IF EXISTS Boards;

CREATE TABLE Boards (
    boardID    INTEGER PRIMARY KEY AUTOINCREMENT
                       NOT NULL,
    boardName  TEXT    UNIQUE
                       NOT NULL,
    categoryID INTEGER NOT NULL,
    FOREIGN KEY (
        categoryID
    )
    REFERENCES Categories (categoryID) 
);

INSERT INTO Boards (boardID, boardName, categoryID) VALUES (1, 'General Chat', 1);
INSERT INTO Boards (boardID, boardName, categoryID) VALUES (2, 'Introduce Yourself!', 1);

-- Table: Categories
DROP TABLE IF EXISTS Categories;

CREATE TABLE Categories (
    categoryID   INTEGER PRIMARY KEY AUTOINCREMENT
                         NOT NULL,
    categoryName TEXT    UNIQUE
                         NOT NULL
);

INSERT INTO Categories (categoryID, categoryName) VALUES (1, 'General');

-- Table: Replies
DROP TABLE IF EXISTS Replies;

CREATE TABLE Replies (
    replyID     INTEGER  PRIMARY KEY AUTOINCREMENT
                         NOT NULL,
    threadID    INTEGER  NOT NULL,
    userID      INTEGER  NOT NULL,
    body        TEXT     NOT NULL,
    dateCreated DATETIME NOT NULL,
    dateEdited  DATETIME,
    FOREIGN KEY (
        threadID
    )
    REFERENCES Threads (threadID),
    FOREIGN KEY (
        userID
    )
    REFERENCES Users (userID) 
);

INSERT INTO Replies (replyID, threadID, userID, body, dateCreated, dateEdited) VALUES (1, 1, 1, 'Since Vaendryl seems to be getting a tiny bit annoyed with us spamming literally every thread, and especially the Waifu topic, I decided to create this thread for all of a lot of our future stupid. Feel free to post any random stuff here. Don''t be shy, we don''t bite.', '2014-07-23 17:39:41 ', '2014-07-23 17:39:41 ');
INSERT INTO Replies (replyID, threadID, userID, body, dateCreated, dateEdited) VALUES (2, 1, 2, '
I love cakes.
', '2014-07-23 17:45:10', '2014-07-23 17:45:10');
INSERT INTO Replies (replyID, threadID, userID, body, dateCreated, dateEdited) VALUES (3, 1, 3, '
Everyone, we need to pick one topic and stick to it in this thread.
', '2014-07-23 17:45:23', '2014-07-23 17:45:23');
INSERT INTO Replies (replyID, threadID, userID, body, dateCreated, dateEdited) VALUES (4, 1, 4, 'I knew the Kooky Korner would be reborn, it was just a matter of time.

Since I''m probably the only one here who knows what I''m talking about, I''ll elaborate.
The Kooky Korner was a sub-forum used to contain the chaos away from the main forum. Sadly, the forum as a whole no longer exists.', '2014-07-23 17:46:47', '2014-07-23 17:48:22');
INSERT INTO Replies (replyID, threadID, userID, body, dateCreated, dateEdited) VALUES (5, 1, 2, '"Everyone, we need to pick one topic and stick to it in this thread." This is the best idea for a Spam thread ever :D', '2014-07-23 17:53:49', '2014-07-23 17:53:49');
INSERT INTO Replies (replyID, threadID, userID, body, dateCreated, dateEdited) VALUES (6, 1, 5, '
+EXP
+EXP
+EXP

:D?
', '2014-07-23 17:59:26', '2014-07-23 17:59:26');
INSERT INTO Replies (replyID, threadID, userID, body, dateCreated, dateEdited) VALUES (7, 4, 6, 'Hello I''ve never been a member of a forum before and I''ve recently downloaded Sunrider on steam and every time I try to play it crashes and I thought some one on here could help if so Thank You. This is a long sentence and I said and like 9 times.  :D', '2018-12-04 23:38:14', '2018-12-04 23:38:14');
INSERT INTO Replies (replyID, threadID, userID, body, dateCreated, dateEdited) VALUES (8, 4, 7, 'Hello, and welcome! Unfortunately Sunrider''s devs are no longer on this forum - they decided to move to a different one, so it might be better to ask on the Steam forums for this. However, it''s possible someone here might be able to help as a lot of people here have played the game, after all. Hope to see you around!', '2018-12-04 23:58:03', '2018-12-04 23:58:03');
INSERT INTO Replies (replyID, threadID, userID, body, dateCreated, dateEdited) VALUES (9, 4, 8, 'Well that''s a sight you don''t see everyday, a new member! Welcome! :P', '2018-12-08 10:46:41', '2018-12-08 10:46:41');

-- Table: Threads
DROP TABLE IF EXISTS Threads;

CREATE TABLE Threads (
    threadID    INTEGER PRIMARY KEY AUTOINCREMENT
                        NOT NULL,
    boardID     INTEGER NOT NULL,
    isPinned    INTEGER NOT NULL,
    title       TEXT    UNIQUE
                        NOT NULL,
    replies     INTEGER NOT NULL,
    views       INTEGER NOT NULL,
    lastReplyID INTEGER,
    FOREIGN KEY (
        boardID
    )
    REFERENCES Boards (boardID) 
);

INSERT INTO Threads (threadID, boardID, isPinned, title, replies, views, lastReplyID) VALUES (1, 1, 0, 'The almighty SPAM TOPIC!', 12955, 1582747, NULL);
INSERT INTO Threads (threadID, boardID, isPinned, title, replies, views, lastReplyID) VALUES (4, 2, 0, 'Hello every one', 2, 1810, NULL);

-- Table: Users
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    userID   INTEGER PRIMARY KEY AUTOINCREMENT
                     NOT NULL,
    username TEXT    UNIQUE
                     NOT NULL,
    password TEXT    NOT NULL
);

INSERT INTO Users (userID, username, password) VALUES (1, 'Elvis Strunk', '12345');
INSERT INTO Users (userID, username, password) VALUES (2, 'Oreo_Blue', '12345');
INSERT INTO Users (userID, username, password) VALUES (3, 'Endershadow', '12345');
INSERT INTO Users (userID, username, password) VALUES (4, 'Pal', '12345');
INSERT INTO Users (userID, username, password) VALUES (5, 'AkioKlaus', '12345');
INSERT INTO Users (userID, username, password) VALUES (6, 'pontrumlee', '12345');
INSERT INTO Users (userID, username, password) VALUES (7, 'Arraxis', '12345');
INSERT INTO Users (userID, username, password) VALUES (8, '[Astral|Zephyr]', '12345');

-- Trigger: updateLastPostDelete
DROP TRIGGER IF EXISTS updateLastPostDelete;
CREATE TRIGGER updateLastPostDelete
         AFTER DELETE
            ON Replies
BEGIN
    UPDATE Threads
       SET lastReplyID = (
               SELECT replyID
                 FROM Replies
                WHERE dateCreated IN (
                          SELECT MAX(dateCreated) 
                            FROM Replies
                           WHERE threadID = OLD.threadID
                      )
           )
     WHERE threadID = OLD.threadID;
END;


-- Trigger: updateLastPostInsert
DROP TRIGGER IF EXISTS updateLastPostInsert;
CREATE TRIGGER updateLastPostInsert
         AFTER INSERT
            ON Replies
BEGIN
    UPDATE Threads
       SET lastReplyID = (
               SELECT replyID
                 FROM Replies
                WHERE dateCreated IN (
                          SELECT MAX(dateCreated) 
                            FROM Replies
                           WHERE threadID = NEW.threadID
                      )
           )
     WHERE threadID = NEW.threadID;
END;


-- Trigger: updateReplyCountDelete
DROP TRIGGER IF EXISTS updateReplyCountDelete;
CREATE TRIGGER updateReplyCountDelete
         AFTER DELETE
            ON Replies
BEGIN
    UPDATE Threads
       SET replies = (
               SELECT COUNT( * ) 
                 FROM Replies
                WHERE threadID = OLD.threadID
           )
     WHERE threadID = OLD.threadID;
END;


-- Trigger: updateReplyCountInsert
DROP TRIGGER IF EXISTS updateReplyCountInsert;
CREATE TRIGGER updateReplyCountInsert
         AFTER INSERT
            ON Replies
BEGIN
    UPDATE Threads
       SET replies = (
               SELECT COUNT( * ) 
                 FROM Replies
                WHERE threadID = NEW.threadID
           )
     WHERE threadID = NEW.threadID;
END;


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
