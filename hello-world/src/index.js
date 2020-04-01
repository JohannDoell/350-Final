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
import { Helmet } from "react-helmet";
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

class Head extends React.PureComponent {
  render () {
    return (
        <Helmet>
          <title>titre</title>
          <link rel="icon" type="image/png" href="src/images/logo-via-logohub.png" sizes="16x16" />
        </Helmet>
    );
  }
}

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/boards/:id/submit" component={CreateThread}/>
          <Route path="/boards/:id" component={Boards} />
          <Route path="/thread/:id" component={AThread} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration} />
          <Route path="/" component={Home} />
        </Switch>
    </Router>
  );
}

// render functions

function renderHeader() {
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
                        <input type="submit" value="Submit"/>
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
                        <input type="submit" value="Submit" />
                    </label>
                </form>
                </div>

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
        <Head />,
        <App />
    </Router>,
    //<Main />,

    document.getElementById('root')
);
