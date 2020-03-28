// ==== Import Statements ====

import React from 'react';
import $ from 'jquery';
import './index.css';

// ==== Global Variables ====

// ==== Classes ====

class CategoryContainer extends React.Component {

    renderBoards(num) {
        let boards = [];

        for (let i = 0; i < num; i++) {
            boards.push(
                <BoardContainer

                />
            )
        }

        return boards;
    }

    render() {
        return (
            <div className="categoryContainer">
            <p>Category</p>
            {this.renderBoards(this.props.boardNum)}
            </div>
        );
    }
}

class BoardContainer extends React.Component {
    render() {
        return (
            <div className="boardContainer">
            <p>Board</p>
            </div>
        );
    }
}

class ThreadContainer extends React.Component {
    render() {
        return (
            <p>ThreadContainer</p>
        );
    }
}

class ReplyContainer extends React.Component {
    rende() {
        return(
            <p>ReplyContainer</p>
        );
    }
}

// === React Export ===

export default CategoryContainer;