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
            <p>Welcome user!</p>
            <NavBar/>
            </div>
        );
    }
}

// === React Export ===

export default Header;