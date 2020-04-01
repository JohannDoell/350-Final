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

var userID = -1;
var username = "";

// ==== Classes ====


export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/boards/:id/submit" component={CreateThread}/>
          <Route path="/boards/:id" component={Boards} />
          <Route path="/thread/:id" component={AThread} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={Home} />
        </Switch>
    </Router>
  );
}

function isValid(text) {
    return text.length >= 0
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

// render functions

function renderHeader() {

    console.log(getCookie("userID"));
    if (getCookie("userID") !== "") {
        userID = getCookie("userID");
    }
    username = getCookie("username");
    

    if (userID === -1) {
        return (
            <Header
            />
        );
    } else {
        return (
            <div>
            <Header
            givenUsernameMessage = {"Hello, " + username + "!"}
            />
            </div>
        );
    }
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
        if (userID === -1) {
            return (
                <div className="generalContainer">
                    {renderHeader()}
                    {this.renderThreadInfo()}
                    <Credits></Credits>
                </div>
            );
        } else {
            return(
                <div className="generalContainer">
                {renderHeader()}
                {this.renderThreadInfo()}
                <Link to={`/boards/${params.id}/submit`}>
                    <button className="navBarButton" onClick={this.props.onClick}>
                        New Thread
                    </button>
                </Link>
                <Credits></Credits>
                </div>
            );

        }

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

                <ToggleReplyForm match={this.props.match} givenUserID={userID}/>
                <Credits></Credits>
            </div>
        );
    }
}

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameValue: '',
            passwordValue: ''
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({usernameValue: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({passwordValue: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {
            username: this.state.usernameValue,
            password: this.state.passwordValue,
            };
        console.log(data);

        await fetch('http://localhost:5000/post/register_user/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        this.setState({ state: this.state });
    }

    render() {
        return (
            <div className="generalContainer">
                {renderHeader()}

                <div className="register">
                <p>Register:</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" value={this.state.usernameValue} onChange={this.handleChangeUsername}></input>
                        <input type="password" value={this.state.passwordValue} onChange={this.handleChangePassword}></input>
                        <input className="navBarButton" type="submit" value="Submit"/>
                    </label>
                </form>
                </div>

                <Credits></Credits>
            </div>
        );
    }
}

class CreateThread extends React.Component {

    renderThreadForm() {
        return (
            <ThreadForm
                match= {this.props.match} 
            />
        );
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

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameValue: '',
            passwordValue: ''
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({ usernameValue: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ passwordValue: event.target.value });
    }

    async handleSubmit(event) {
        // console.log(this.state.usernameValue);
        // console.log(this.state.passwordValue);
        event.preventDefault();
        const data = {
            username: this.state.usernameValue,
            password: this.state.passwordValue,
        };
        console.log(data);

        await fetch('http://localhost:5000/post/login_user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                userID = data;
                username = this.state.usernameValue;
                document.cookie = "userID=; username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "userID=" + userID + "; username=" + username + "; path=/;";
                console.log(document.cookie);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        this.setState({ state: this.state });
    }

    render() {
        return (

            <div className="generalContainer">
                {renderHeader()}

                <div className="login">
                <p>Login:</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" value={this.state.usernameValue} onChange={this.handleChangeUsername}></input>
                        <input type="password" value={this.state.passwordValue} onChange={this.handleChangePassword}></input>
                        <input className="navBarButton" type="submit" value="Submit" />
                    </label>
                </form>
                </div>

                <Credits></Credits>
            </div>


        );
    }
}

class Logout extends React.Component {

    componentDidMount() {
        // Clear cookie
        document.cookie = "userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        userID = -1;
        username = "";
        window.location.href = `/`;
    }

    render() {
        return(
            <div className="generalContainer">
            {renderHeader()}
            <Credits></Credits>
            </div>
        )
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
