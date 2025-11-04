import React, { useState } from 'react';
import './Transaction.css';
import { Link } from "react-router-dom";

function TransactionPage() {
  const [customerName, setcustomerName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransaction] = useState(false);
  const [file, setFile] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('Authorization');
    
    try {
      await fetch(`http://localhost:8081/customer/gettransactions/:customerName=${customerName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }).then(response => {
        if(response.ok){
          response.json().then(json => {
            setTransaction(json);

            console.log('transactionsssss',json);
          })
        }
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="transaction-page">
        <section className="transaction-panel">
          <h2 className="transaction-panel__title">Get Customer Transactions</h2>
          <form className="transaction-form" onSubmit={handleSubmit}>
              <input
              type="text"
              placeholder="Username"
              value={customerName}
              onChange={(e) => setcustomerName(e.target.value)}
              required
              />
              {error && <div className="transaction-error">{error}</div>}
              <button type="submit" disabled={loading}>
              {loading ? 'Getting...' : 'Get Transactions'}
              </button>
          </form>
        </section>
        {transactions ?
            <section className="transaction-results">
                <header className="transaction-results__header">
                    <h3>Transactions</h3>
                    <p className="transaction-results__customer">
                      <strong>Customer Name:</strong> {customerName}
                    </p>
                </header>
                <ul className="transaction-results__list">
                {transactions.map(item => (
                    <li key={`${item.customerName}-${item.amount.$numberDecimal}-${item.balance}`} className="transaction-results__item">
                        <span className="transaction-results__label">Customer:</span>
                        <span className="transaction-results__value">{item.customerName}</span>
                        <span className="transaction-results__label">Balance:</span>
                        <span className="transaction-results__value">{item.balance}</span>
                        <span className="transaction-results__label">Amount:</span>
                        <span className="transaction-results__value">${parseFloat(item.amount.$numberDecimal)}</span>
                        <Link className="transaction-results__link" to="/ReceiptPage" state={{ ...item }}>
                          Receipt
                        </Link>
                    </li>
                ))}
                </ul>
            </section> : null
        }
      </div>
  );
}

export default TransactionPage;