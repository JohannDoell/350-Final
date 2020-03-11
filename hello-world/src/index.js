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

class CreateButton extends React.Component {
    render() {
        return (
            <button className="createbutton" onClick={this.props.onClick}>
                Create Room
            </button>
        );
    }
}

class LoginButton extends React.Component {
    render() {
        return (
            <button className="loginbutton" onClick={this.props.onClick}>
                Login
            </button>
        );
    }
}

class RoomButton extends React.Component {
    render() {
        return (
            <button className="roombutton" onClick={this.props.onClick}>
                {this.props.text}
            </button>
        );
    }
}

class ShowRoomsButton extends React.Component {
    render() {
        return (
            <button className="showroomsbutton" onClick={this.props.onClick}>
                {this.props.text}
            </button>
        );
    }
}

class Chatbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showchat: true,
            message: '',
            chatlog: []
        };
        this.handleMessageChange = this.handleMessageChange.bind(this);

        this.handleSendKeyPress = this.handleSendKeyPress.bind(this);
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

    renderRoomButtons() {
        // https://blog.cloudboost.io/for-loops-in-react-render-no-you-didnt-6c9f4aa73778

        let buttons = [];

        for (let i = 0; i < this.state.rooms.length; i++) {
            buttons.push(<RoomButton
                text={this.state.rooms[i]}
                onClick={() => this.roomClick(i)}
                index={i}
            />);
        }
        return buttons;
    }

    renderShowRoomButton(_text) {
        return (
            <ShowRoomsButton
                onClick={() => this.showRoomsClick()}
                text={_text}
            />
        );
    }

    // == Handle ==

    sendClick() {
        this.sendMessage(this.state.message);
        this.setState({ message: '' });
    }

    handleSendKeyPress(event) {
        if (event.key === "Enter") {
            this.sendMessage(this.state.message);
            this.setState({ message: '' });
        }
    }

    handleMessageChange(event) {
        this.setState({ message: event.target.value });
    }

    // == Functionality ==

    initUser() {
        username = this.state.username;

        console.log(username);

        if (username === "") {
            alert("Username cannot be empty");
        } else {
            this.registerUser();
            connected = true;
            setInterval(this.getChatlog, timeBetweenNextChatlogCheck);
            setInterval(this.getRooms, timeBetweenNextChatlogCheck);
            this.forceUpdate();
        }
    }

    // == Rest API ==

    // = POST =

    registerUser() {
        $.ajax({
            url: "http://localhost:5000/chatroom/register/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                "username": username,
            })
        }).done(function (data) {
            console.log(data);
        });
    }

    sendMessage(message) {

    }

    // = GET =

    getChatlog() {
        fetch("http://localhost:5000/chatroom/chatlog/" + username + "/")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({ chatlog: result });
                }
            )
    }

    // == Render Self ==

    render() {
                return (
                    <p>Hello World</p>
                );
    }
}

// ========================================

ReactDOM.render(
    <Chatbox />,
    document.getElementById('root')
);
