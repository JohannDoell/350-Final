// ==== Import Statements ====

import React from 'react';
import $ from 'jquery';
import './index.css';

// === Images ===

import bannerImage from './images/banner.png';

// ==== Global Variables ====

// ==== Classes ====

class Banner extends React.Component {
    render() {
        return (
            <img className="banner" src={bannerImage} alt="banner"></img>
        );
    }
}

class NavBar extends React.Component {
    render() {
        return (
            <div className="navBar">
            <button className="navBarButton" onClick={this.props.onClick}>
                Home
            </button>
            <button className="navBarButton" onClick={this.props.onClick}>
                Members
            </button>
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div className="header">
            <Banner/>
            <Login></Login>
            <p>Welcome user!</p>
            <NavBar/>
            </div>
        );
    }
}

class Credits extends React.Component {
    render() {
        return (
            <div className="credits">
                <p>CMPT 350 - Winter 2019-2020</p>
            </div>
        );
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({username: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <div className="login">
                <p>Login:</p>
                <label>
                    <input type="text" value={this.state.username} onChange={this.handleChangeUsername}></input>
                    <input type="password" value={this.state.password} onChange={this.handleChangePassword}></input>
                    <input type="submit" value="Submit"/>
                </label>
            </div>
        );
    }
}

// === React Export ===

export default Header;
export {Header, Credits}