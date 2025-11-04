import React from "react";
// If you use React Router, uncomment the next line and replace <a> with <NavLink>
// import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="side-nav">
      <div className="side-nav__header">
        <h2 className="side-title">Menu</h2>
      </div>

      <ul className="side-list">
        {/* With React Router: use <NavLink to="/CustomerPage" className={({isActive}) => "side-link" + (isActive ? " is-active" : "")}> */}
        <li><a className="side-link" href="/CustomerPage">Customers</a></li>
        <li><a className="side-link" href="/PaymentPage">Payment</a></li>
        <li><a className="side-link" href="/TransactionPage">Transaction</a></li>
        <li><a className="side-link" href="/GetTokenPage">Get Token</a></li>
      </ul>
    </nav>
  );
}
