import React from 'react';
import Logo from '../images/logo.svg';
import './HomePage.css'; // Import CSS file for styling

const Header = () => {
    return (
    <header>
        <nav className="navbar">
        <h1>Mini-Billing Solution</h1>
        <img src={Logo} alt="Logo" height="40" />
        <ul>
        <li><a href="/Login">Login</a></li>
        <li><a href="/LoginGoogle">Login Google</a></li>

        </ul>
        </nav>
    </header>

    );
};
export default Header;