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
                Test1
            </button>
            <button className="navBarButton" onClick={this.props.onClick}>
                Test2
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
            <p>Welcome user!</p>
            <p>{this.props.serverMessage}</p>
            <NavBar/>
            </div>
        );
    }
}

// === React Export ===

export default Header;