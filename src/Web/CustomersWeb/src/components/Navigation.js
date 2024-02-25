import React from 'react';

const Navigation = () => {
    return (
        <nav className="sidebar">
        <ul>
          <li><a href="/CustomerPage">Customers</a></li>
          <li><a href="/PaymentPage">Payment</a></li>
          <li><a href="/TransactionPage">Transaction</a></li>
        </ul>
      </nav>
    );
};
export default Navigation;
