// ==== Import Statements ====

import React from 'react';
import $ from 'jquery';
import './index.css';
import {
    Link
} from "react-router-dom";


// === Images ===

import bannerImage from './images/banner.png';

// ==== Global Variables ====

// ==== Classes ====

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <Banner />
                <p>{this.props.givenUsernameMessage}</p>
                <NavBar />
            </div>
        );
    }
}

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
                <Link to={`/`}>
                    <button className="navBarButton" onClick={this.props.onClick}>
                        Home
                    </button>
                </Link>
                <Link to={`/members`}>
                    <button className="navBarButton" onClick={this.props.onClick}>
                        Members
                    </button>
                </Link>
                <Link to={`/login`}>
                    <button className="navBarButton" onClick={this.props.onClick}>
                        Login
                    </button>
                </Link>
                <Link to={`/register`}>
                    <button className="navBarButton" onClick={this.props.onClick}>
                        Register
                    </button>
                </Link>
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



// === React Export ===

export default Header;
export { Header, Credits }