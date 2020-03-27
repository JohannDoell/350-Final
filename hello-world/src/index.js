// To run use: "npm start"
// If "npm start" does not work (the server doesn't start because you're missing modules)
// use "npm install"

// ==== Import Statements ====

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.css';
import Banner from './banner.png';

// ==== Global Variables ====
//hello

// ==== Classes ====

class SendButton extends React.Component {
    render() {
        return (
            <button className="sendbutton" onClick={this.props.onClick}>
                Send
            </button>
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
            {this.renderBoards(5)}
            </div>
        );
    }
}

class NavBar extends React.Component {
    render() {
        return (
            <div className="navBar">
            <p>NavBar</p>
            </div>
        );
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Old, just to show an example.
            showchat: true,
            message: '',
            chatlog: [],

            // New
            response: 'Not connected to server.'

        };
        // Bind functions here
        // EX:
        //this.handleMessageChange = this.handleMessageChange.bind(this);

        this.getTest = this.getTest.bind(this);


        this.getTest();
    }

    // == Lifecycle ==

    componentDidMount() {
    }

    // == Rendering ==

    renderSendButton() {
        return (
            <SendButton
                onClick={() => this.sendClick()}
            />
        );
    }

    renderCategories(num) {

        let categories = [];

        for (let i = 0; i < num; i++) {
            categories.push(
                <CategoryContainer

                />
            )
        }

        return categories;
    }

    renderNavBar() {
        return(
            <NavBar
            
            />
        );
    }

    // == Handle ==

    sendClick() {
        this.sendMessage(this.state.message);
        this.setState({ message: '' });
    }

    // == Functionality ==

    initUser() {
        //username = this.state.username;
        
        //console.log(username);

        /*
        if (username === "") {
            alert("Username cannot be empty");
        } else {
            this.registerUser();
            connected = true;
            setInterval(this.getChatlog, timeBetweenNextChatlogCheck);
            setInterval(this.getRooms, timeBetweenNextChatlogCheck);
            this.forceUpdate();
        }
        */
    }

    // == Rest API ==

    // = POST =

    registerUser() {
        $.ajax({
            url: "http://localhost:5000/chatroom/register/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                //"username": username,
                "username": "George",
            })
        }).done(function (data) {
            console.log(data);
        });
    }

    sendMessage(message) {

    }

    // = GET =

    getTest() {
      fetch("http://localhost:5000/get_test/")
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            this.setState({ response: result});
          }
        )
    }

    // == Render Self ==

    render() {
                return (
                  <div className="mainContainer">
                    <img className="banner" src={Banner} alt="banner"></img>
                    {this.renderNavBar()}
                    <p>Welcome to Generic Forum Software!</p>
                    <p>{this.state.response}</p>
                    {this.renderCategories(3)}
                  </div>
                );
    }
}

// ========================================

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);
