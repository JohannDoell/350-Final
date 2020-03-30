// To run use: "npm start"
// If "npm start" does not work (the server doesn't start because you're missing modules)
// use "npm install"

// ==== Import Statements ====

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.css';

// === React Import ===

import {Header, Credits} from './header.js';
import { CategoryContainer, ThreadsContainer, Thread, Input } from './containers.js';

// === Images ===

// ==== Global Variables ====

// ==== Classes ====

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

    renderCategories(num) {

        let categories = [];

        for (let i = 0; i < num; i++) {
            categories.push(
                <CategoryContainer
                    boardNum={3}
                />
            )
        }

        return categories;
    }

    renderThreadInfo() {
        return <ThreadsContainer></ThreadsContainer>
    }

    renderThread() {
        return <Thread></Thread>
    }

    renderHeader() {
        return (
            <Header
            />
        );
    }

    // == Handle ==

    sendClick() {
        this.setState({ message: '' });
    }

    // == Functionality ==

    initUser() {

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

    // = GET =

    getTest() {
        fetch("http://localhost:5000/")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({ response: result });
                }
            )
    }

    // == Render Self ==

    render() {
        return (
            <div className="mainContainer">
                {this.renderHeader()}
                {this.renderCategories(1)}
                {this.renderThreadInfo()}
                {this.renderThread()}
                <Input></Input>
                <Credits></Credits>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);
