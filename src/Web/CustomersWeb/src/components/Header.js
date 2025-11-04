import React from 'react';
import Logo from '../images/logo.svg';
import './HomePage.css';

const Header = () => {
  return (
    <header className="topbar">
      <h1 className="topbar__title">Mini-Billing Solution</h1>

      <img src={Logo} alt="Logo" height="40" />

      <ul className="topbar__links">
        <li><a href="/Login">Login</a></li>
        <li><a href="/LoginGoogle">Login Google</a></li>
      </ul>
    </header>
  );
};

export default Header;
