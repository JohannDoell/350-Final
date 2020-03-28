// ==== Import Statements ====

import React from 'react';
import $ from 'jquery';
import './index.css';
import bannerImage from './banner.png';

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
            <p>NavBar</p>
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div className="header">
            <Banner/>
            <NavBar/>
            </div>
        );
    }
}

// === React Export ===

export default Header;