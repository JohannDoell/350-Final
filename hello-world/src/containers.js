// ==== Import Statements ====

import React from 'react';
import $ from 'jquery';
import './index.css';


import blankSquare from './images/blanksquare.png';

// ==== Global Variables ====

// ==== Classes ====

export class HomeContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        categories: [],

        };
    }

    componentDidMount() {
        //console.log(match.params)
        fetch("http://localhost:5000/get/categories")
          .then(response => response.json())
          .then((data) => {
            this.setState({ categories : data })
          });
    }

    renderCategories(num) {
        let categories = [];

        if (this.state.categories.length != 0){
            for (let i = 0; i < num; i++) {
                categories.push(
                    <CategoryContainer
                        categoryTitle = {this.state.categories[i]["categoryName"]}
                    />
                )
            }
        }
        return categories;
    }

    render(){
        return <div>{this.renderCategories(this.state.categories.length)}</div>;
    }
}


class CategoryContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        boards: [],

        };
    }
    componentDidMount() {
        //const { match : {params}} = this.props;
        fetch("http://localhost:5000/get/boards/${params.categoryID")
          .then(response => response.json())
          .then((data) => {
            this.setState({ boards : data })
          })
    }

    renderBoards(num) {
        let boards = [];

        if (this.state.boards.length != 0){
            for (let i = 0; i < num; i++) {
                boards.push(
                    <BoardContainer
                        boardTitle = {this.state.boards[i]["boardName"]}
                    />
                )
            }
        }
        return boards;
    }

    render() {
        return (
            <div className="categoryContainer">
                <div className="categoryText">
                    <p>{this.props.categoryTitle}</p>
                </div>
            {this.renderBoards(this.state.boards.length)}
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
                        <p>{this.props.boardTitle}</p>
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


class ThreadsContainer extends React.Component { //board
    constructor(props) {
        super(props);

        this.state = {
        threads: [],
        };
    }
    componentDidMount() {
        fetch('http://localhost:5000/get/threads')
          .then(response => response.json())
          .then((data) => {
            this.setState({ threads : data })
          })
    }

    renderThreads(num) {
        let threads = [];

        for (let i = 0; i < num; i++) {
            if (this.state.threads.length != 0){
                threads.push(
                <ThreadInfoContainer
                threadInfoTitle = {this.state.threads[i]["title"]}
                numOfReplies = {this.state.threads[i]['replies']}
                numOfViews = {this.state.threads[i]["views"]}
                />
                )
            }
        }

        return threads;
    }

    render() {
        return (
            <div className="threadsContainer">

                <div className="threadsContainerInfo">
                    <p>Threads</p>
                </div>
                {this.renderThreads(this.state.threads.length)}

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
                        <p>{this.props.threadInfoTitle}</p>
                    </div>

                    <div className="threadInfoText">
                        <p>Started by</p>
                    </div>

                </div>

                <div className="threadStats">
                    <p>Replies: {this.props.numOfReplies}</p>
                    <p>Views: {this.props.numOfViews}</p>
                </div>
                <div className="threadLastPost">
                    <p>Last Post</p>
                </div>

            </div>
        );
    }
}


class Thread extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        replies: [],
        };
    }
    componentDidMount() {
        fetch('http://localhost:5000/get/replies')
          .then(response => response.json())
          .then((data) => {
            this.setState({ replies : data })
          })
    }

    renderReplies(num) {
        let replies = [];

        for (let i = 0; i < num; i++) {
            if (this.state.replies.length != 0){
                replies.push(

                   <Reply
                    replyText = {this.state.replies[i]['body']}
                    replyUser = {this.state.replies[i]['username']}
                   />

                )
            }
        }

        return replies;
    }

    render() {
        return (
            <div className="threadContainer">
                <div className="threadTitle">
                    <p>Thread Title</p>
                </div>
                {this.renderReplies(this.state.replies.length)}
            </div>

        );
    }
}


class Reply extends React.Component {
  constructor(props) {
    super(props);

  }
    render() {
        return (
            <div className="reply">
                <div className="replyUser">
                    <p>Author: {this.props.replyUser}</p>
                </div>
                <div className="replyText">
                    <p>{this.props.replyText}</p>
                </div>
            </div>
        );
    }
}

// === React Export ===

export {CategoryContainer, ThreadsContainer, Thread}