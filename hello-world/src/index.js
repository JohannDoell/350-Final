// To run use: "npm start"
// If "npm start" does not work (the server doesn't start because you're missing modules)
// use "npm install"

// ==== Import Statements ====

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.css';

// ==== Global Variables ====


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
                  <div>
                    <p>Hello World</p>
                    <p>{this.state.response}</p>
                  </div>
                );
    }
}

// ========================================

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);
