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

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/category:id/boards">Boards</Link>
            </li>
            <li>
              <Link to="/board:id/threads">Threads</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/category:id/boards">
            <Boards />
          </Route>
          <Route path="/board:id/threads">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function renderCategories(num) {

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

function renderThread() {
    return <Thread></Thread>;
}

function renderThreadInfo() {
    return <ThreadsContainer></ThreadsContainer>;
}

function Home() {
  return <div>{renderCategories(1)}</div>;
}

function Boards() {
  return <div>{renderThreadInfo()}</div>;
}

function Users() {
  return <div>{renderThread()}</div>;
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

//    renderCategories(num) {
//
//        let categories = [];
//
//        for (let i = 0; i < num; i++) {
//            categories.push(
//                <CategoryContainer
//                    boardNum={3}
//                />
//            )
//        }
//
//        return categories;
//    }

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
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    //<Main />,

    document.getElementById('root')
);
