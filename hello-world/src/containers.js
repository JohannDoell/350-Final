// ==== Import Statements ====

import React from 'react';
import $ from 'jquery';
import './index.css';
import { Link } from 'react-router-dom';

import blankSquare from './images/blanksquare.png';

// ==== Global Variables ====

// ==== Classes ====

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        categories: [],

        };
    }

    componentDidMount() {
        console.log("")
        console.log(this.props)
        //const { match : {params}} = this.props;
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
                        match = {this.props.match}
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
        const { match : {params}} = this.props;
        fetch(`http://localhost:5000/get/boards/1`)
          .then(response => response.json())
          .then((data) => {
            this.setState({ boards : data })
          })
    }

    renderBoards() {
        let boards = [];

        if (this.state.boards.length != 0){
            for (let i = 0; i < this.state.boards.length; i++) {
                boards.push(
                <Link to={`/boards/${this.state.boards[i]["boardID"]}`}>
                    <BoardContainer
                        match = {this.props.match}
                        boardTitle = {this.state.boards[i]["boardName"]}
                    />
                </Link>
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
        console.log("board") // prints
        console.log(this.props)
        const { match : {params}} = this.props;
        fetch(`http://localhost:5000/get/threads/${params.id}`)
          .then(response => response.json())
          .then((data) => {
            this.setState({ threads : data })
          })
    }

    renderThreads() {
        let threads = [];

        for (let i = 0; i < this.state.threads.length; i++) {
            if (this.state.threads.length != 0){
                threads.push(
                <Link to={`/thread/${this.state.threads[i]["threadID"]}`}>
                    <ThreadInfoContainer
                    match = {this.props.match}
                    threadInfoTitle = {this.state.threads[i]["title"]}
                    numOfReplies = {this.state.threads[i]['replies']}
                    numOfViews = {this.state.threads[i]["views"]}
                    />
                </Link>
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
                {this.renderThreads()}

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
        console.log("thread") // prints
        console.log(this.props)
        const { match : {params}} = this.props;
        fetch(`http://localhost:5000/get/replies/${params.id}`)
          .then(response => response.json())
          .then((data) => {
            this.setState({ replies : data })
          })
    }

    renderReplies() {
        let replies = [];

        for (let i = 0; i < this.state.replies.length; i++) {
            if (this.state.replies.length != 0){
                replies.push(

                   <Reply
                    match = {this.props.match}
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
                    <p>Thread: {this.props.threadInfoTitle}</p>
                </div>
                {this.renderReplies()}
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
                    <p>{this.props.replyUser}</p>
                </div>
                <div className="replyText">
                    <p>{this.props.replyText}</p>
                </div>
            </div>
        );
    }
}

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div>
                <div className="inputContainer">
                    <p>Reply</p>
                    <label>
                        <textarea className="inputBox" value={this.state.value} onChange={this.handleChange}></textarea>
                    </label>
                    <input type="submit" value="Submit"/>
                </div>
            </div>
        );
    }
}

// === React Export ===

export {HomeContainer, CategoryContainer, ThreadsContainer, Thread, Input}