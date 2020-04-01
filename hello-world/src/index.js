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


// === React Import ===

import {Header, Credits} from './header.js';
import {HomeContainer, ThreadsContainer, Thread, ToggleReplyForm, ThreadForm } from './containers.js';

// === Images ===

// ==== Global Variables ====

// ==== Classes ====


export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/boards/:id/submit" component={CreateThread}/>
          <Route path="/boards/:id" component={Boards} />
          <Route path="/thread/:id" component={AThread} />
          <Route path="/" component={Home} />
        </Switch>
    </Router>
  );
}

function isValid(text) {
    return text.length >= 0
}
// render functions

function renderHeader() {
    return (
        <Header
        />
    );
}

// components
class Home extends React.Component {

     renderHomeContainer(props) {
        let home = [];

        home.push(
            <HomeContainer
                match = {this.props.match}
            />
        )
        return home;
    }

    render() {
        console.log(this.props)
        return (
        <div className="generalContainer">
            {renderHeader()}
            {this.renderHomeContainer()}
            <Credits></Credits>
        </div>
        );
    }
}


class Boards extends React.Component {

    renderThreadInfo() {
        return <ThreadsContainer
            match = {this.props.match}
        />
    }

    render() {
        const { match : {params}} = this.props;
        return (
            <div className="generalContainer">
                {renderHeader()}
                {this.renderThreadInfo()}
                <Link to={`/boards/${params.id}/submit`}>New</Link>
                <Credits></Credits>
            </div>
        );
    }
}


class AThread extends React.Component {

    renderThread() {
        return <Thread
            match = {this.props.match}
        />
    }
    render() {
        return (
            <div className="generalContainer">
                {renderHeader()}
                {this.renderThread()}

                <ToggleReplyForm match={this.props.match}/>
                <Credits></Credits>
            </div>
        );
    }
}

class CreateThread extends React.Component {

    renderThreadForm() {
        return <ThreadForm
            match = {this.props.match}
        />
    }

    render() {
        return (
            <div className="generalContainer">
            {renderHeader()}
            {this.renderThreadForm()}
            <Credits></Credits>
            </div>
        );
    }
}
///////////// Routing practice


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        categories: [],
        };
    }

    // == Lifecycle ==

    componentDidMount() {
        //const { match : {params}} = this.props;
        fetch("http://localhost:5000/get/categories")
          .then(response => response.json())
          .then((data) => {
            this.setState({ categories : data })
            console.log(this.state)
          })
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

    // == Render Self ==

    render() {
        return (
            <div className="mainContainer">
                <Header/>
                {this.renderCategories(1)}
                {this.renderThreadInfo()}
                {this.renderThread()}
                <Credits></Credits>
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
