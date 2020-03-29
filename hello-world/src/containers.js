// ==== Import Statements ====

import React from 'react';
import $ from 'jquery';
import './index.css';

import blankSquare from './images/blanksquare.png';

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
                <div className="categoryText">
                    <p>Category</p>
                </div>
            {this.renderBoards(this.props.boardNum)}
            </div>
        );
    }
}

class BoardContainer extends React.Component {
    render() {
        return (
            <div className="boardContainer">
                <div className="boardGeneralInfo">
                    <div className="boardTitle">
                        <p>Board</p>
                    </div>
                    <div className="boardInfoText">
                        <p>Info Text</p>
                    </div>
                </div>
                <div className="boardStats">
                    <p>Stats</p>
                </div>
                <div className="boardLastPost">
                    <p>Last Post</p>
                </div>
            
            </div>
        );
    }
}

class ThreadsContainer extends React.Component {

    renderThreads(num) {
        let threads = [];

        for (let i = 0; i < num; i++) {
            threads.push(
                <ThreadInfoContainer

                />
            )
        }

        return threads;
    }

    render() {
        return (
            <div className="threadsContainer">

                <div className="threadsContainerInfo">
                    <p>Threads</p>
                </div>
                {this.renderThreads(3)}

            </div>

        );
    }
}

class ThreadInfoContainer extends React.Component {
    render() {
        return (
            <div className="threadInfoContainer">
                <div className="threadGeneralInfo">

                    <div className="threadInfoTitle">
                        <p>Thread</p>
                    </div>

                    <div className="threadInfoText">
                        <p>Started by</p>
                    </div>

                </div>

                <div className="threadStats">
                    <p>Stats</p>
                </div>
                <div className="threadLastPost">
                    <p>Last Post</p>
                </div>

            </div>
        );
    }
}

class Thread extends React.Component {

    renderReplies(num) {
        let replies = [];

        for (let i = 0; i < num; i++) {
            replies.push(
                <Reply

                />
            )
        }

        return replies;
    }

    render() {
        return (
            <div className="threadContainer">
                <div className="threadTitle">
                    <p>Thread Title</p>
                </div>

                {this.renderReplies(3)}
            </div>

        );
    }
}

class Reply extends React.Component {
    render() {
        return (
            <div className="reply">
                <div className="replyUser">
                    <p>User</p>
                </div>
                <div className="replyText">
                    <p>Reply</p>
                </div>
            </div>
        );
    }
}

// === React Export ===

export {CategoryContainer, ThreadsContainer, Thread}