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
                        key = {i}
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
                        key = {i}
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

// input components

class ToggleReplyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: false};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));

    }

    addToggleButton = props => {
        return
    }

    render() {
        if (this.props.givenUserID === -1) {
            return (
                <div>
                </div>
            );
        } else {
            return (
                <div>
                <button onClick={this.handleClick}>{this.state.isToggleOn ? 'Close' : 'Reply'}</button>
                {!this.state.isToggleOn && this.addToggleButton}
    
                {this.state.isToggleOn && this.addToggleButton && <ReplyForm match={this.props.match} givenUserID={this.props.givenUserID}/>}
    
                </div>
            );
        }

    }
}

class ReplyForm extends React.Component {

    constructor() {
        super();
         this.state = {
            threadID: '',
            userID: '',
            body: '',
            dateCreated: '',
            dateEdited: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({
        threadID: this.state.threadID,
        userID: this.props.givenUserID,
        body: event.target.value,
        dateCreated: "2020-03-31 18:30:41",
        dateEdited: "2020-03-31 18:30:41",
        });
    }


   async handleSubmit(event){
        const { match : {params}} = this.props;
        if (!this.state.body.length >= 1){
            alert("You can't post an empty reply! ")
            return;
        }
        event.preventDefault();
        const data = {
            threadID: this.state.threadID,
            userID: this.state.userID,
            body: this.state.body,
            dateCreated: this.state.dateCreated,
            dateEdited: this.state.dateEdited,
            };

        await fetch(`http://localhost:5000/get/threads/${params.id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        this.setState({ state: this.state });
        this.handleRedirect()
    }

     handleRedirect(){
        const { match : {params}} = this.props;
        window.location.href = `/thread/${params.id}`;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="inputContainer">
                    <p>Reply</p>

                        <textarea
                            className="inputBox"
                            value={this.state.value}
                            onChange={this.handleChange} />

                    <button type="submit" value="Submit">Submit</button>
                </div>

            </form>
        );
    }
}

class ThreadForm extends React.Component {
    constructor() {
        super();
        this.state = {
            boardID: '',
            isPinned: 0,
            title: '',
            replies: 0,
            views: 0,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            boardID: this.state.boardID,
            isPinned: 0,
            title: event.target.value,
            replies: 0,
            views: 0,
        });
    }


async handleSubmit(event){
    const { match : {params}} = this.props;
    if (!this.state.title.length >= 1){
        alert("You can't post a thread with an empty title!")
        return;
    }
    event.preventDefault();
    const data = {
            boardID: this.state.boardID,
            isPinned: this.state.isPinned,
            title: this.state.title,
            replies: this.state.replies,
            views: this.state.views,
    };

    await fetch(`http://localhost:5000/get/boards/${params.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
    })
    .catch((error) => {
    console.error('Error:', error);
    });
    this.setState({ state: this.state });
    this.handleRedirect()
}

    handleRedirect(){
        const { match : {params}} = this.props;
        window.location.href = `/boards/${params.id}`;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="inputContainer">
                    <p>New Thread!</p>

                        <input
                            type="text"
                            className="inputBox"
                            value={this.state.value}
                            onChange={this.handleChange}
                             placeHolder="Title..."/>

                    <button type="submit" value="Submit">Submit</button>
                </div>

            </form>
        );
    }
}



// === React Export ===

export {HomeContainer, CategoryContainer, ThreadsContainer, Thread, ReplyForm, ToggleReplyForm, ThreadForm}