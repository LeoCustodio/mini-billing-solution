import React, { useState } from 'react';
import './Transaction.css'; // Import your CSS file for styling
import { Link } from "react-router-dom";

function TransactionPage() {
  const [customerName, setcustomerName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [receiptTransactions, setReceiptTransactions] = useState(false);
  const [receipts, setReceipts] = useState(false);
  const [transactions, setTransaction] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('Authorization');
    
    try {
      fetch(`http://localhost:8002/customer/gettransactions/${customerName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }).then(response => {
        if(response.ok){
          response.json().then(json => {
            setTransaction(json.transactions);
            setReceipts(json.receipts);

            json.transactions.forEach(tran => {
              json.receipts.forEach(rec => {
                if(rec.transactionId == tran.transactionId){
                  const transactionReceipt = {
                    transaction:tran,
                    receipt:rec
                  }
                  console.log("transactionReceipt",transactionReceipt);
                  setReceiptTransactions(transactionReceipt);
                }
              });
            });
            console.log("receiptTransactions",receiptTransactions);
            console.log("Transactions",transactions);
            console.log("receipt",receipts);

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
      <div className="login-container">
        <h2>Get Customer Transactions</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Username"
            value={customerName}
            onChange={(e) => setcustomerName(e.target.value)}
            required
            />
            {error && <div className="error">{error}</div>}
            <button type="submit" disabled={loading}>
            {loading ? 'Getting...' : 'Get Transactions'}
            {}
            </button>
        </form>
        {transactions ?
            <div className="receipt-container">
                <div className="receipt-header">
                    <h1>Transactions</h1>
                </div>
                <div className="receipt-content">
                    <div className="customer-info">
                        <p><strong>Customer Name:</strong> {customerName}</p>
                    </div>
                    <div className="items-list">
                        <h3>Transactions:</h3>
                        <ul>
                            {receiptTransactions.forEach(item => (
                                <li>
                                    - Customer Name:{item.customerName}  
                                    - Amount: ${parseFloat(item.amount.$numberDecimal)}  
                                    - Receipt: <Link to="/ReceiptPage"  state={{...item}} >Link</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div> : null
        }
      </div>
  );
}

export default TransactionPage;