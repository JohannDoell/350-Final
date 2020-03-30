// To run use: "npm start"
// If "npm start" does not work (the server doesn't start because you're missing modules)
// use "npm install"

// ==== Import Statements ====

import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import $ from 'jquery';
import './index.css';
import Header from './header.js';
import {CategoryContainer, ThreadsContainer, Thread} from './containers.js';

// === Images ===

// ==== Global Variables ====

// ==== Classes ====


///////////// Routing practice

class navBar extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    Home() {
      return (
        <div>
          <h2>Home</h2>
        </div>
      );
    }

    About() {
      return (
        <div>
          <h2>About</h2>
        </div>
      );
    }

    Dashboard() {
      return (
        <div>
          <h2>Dashboard</h2>
        </div>
      );
    }

    render() {
        return (
            <div class="router">
                <Router>
                  <div>
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/about">About</Link>
                      </li>
                      <li>
                        <Link to="/dashboard">Dashboard</Link>
                      </li>
                    </ul>

                    <hr />

                    {/*
                      A <Switch> looks through all its children <Route>
                      elements and renders the first one whose path
                      matches the current URL. Use a <Switch> any time
                      you have multiple routes, but you want only one
                      of them to render at a time
                    */}
                    <Switch>
                      <Route exact path="/">
                        {this.Home()}
                      </Route>
                      <Route path="/about">
                        {this.About()}

                      </Route>
                      <Route path="/dashboard">
                        {this.Dashboard()}
                      </Route>
                    </Switch>
                  </div>
                </Router>
            </div>
        );
    }
}
///////////// Routing practice


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                serverMessage={this.state.response}
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
        fetch("http://localhost:5000/get_test/")
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
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Router>
        <navBar />
    </Router>,
    <Main />,
    document.getElementById('root')
);
