# === Module Import Statements ===

import json
from flask import Flask, request, jsonify
import queries
import dbConnection

# === Other Class Import Statements ===

# import rooms
# Where we have a .py file named "rooms.py" in the same folder.

# === Global Variables ===

# == Flask ==

app = Flask(__name__)

# == Application ==

conn = dbConnection.create_connection()


# === Routes ===

# == Post ==

@app.route('/post_test/', methods=["POST"])
def register_user():
    response = request.get_json()
    json_as_dict = convert_json_to_dict(response)

    print(response)
    return jsonify("Received post test")


# == Get ==

@app.route('/get/categories', methods=["GET"])
def get_categories():
    categories = queries.getCategoriesAsJsons(conn)

    return categories


@app.route('/get/boards/<categoryID>', methods=["GET"])
def get_boards(categoryID):
    boards = queries.getBoardsFromCategoryAsJsons(conn, categoryID)

    return boards


@app.route('/get/threads/<boardID>', methods=["GET"])
def get_threads(boardID):
    threads = queries.getThreadsFromBoardAsJsons(conn, boardID)

    return threads


@app.route('/get/replies/<threadID>', methods=["GET"])
def get_replies(threadID):
    replies = queries.getRepliesFromThreadAsJsons(conn, threadID)
    return replies



# == Flask Helpers ==

@app.after_request
def add_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    return response


# === Utility ===

def convert_json_to_dict(json_to_convert):
    json_as_str = json.dumps(json_to_convert)
    json_as_dict = json.loads(json_as_str)
    return json_as_dict


# === Main ===

if __name__ == '__main__':

    # app.run()
    app.run(debug=True)
