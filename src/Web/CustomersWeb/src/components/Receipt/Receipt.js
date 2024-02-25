import React, { useState, Component } from 'react';
import { useLocation } from "react-router";

function ReceiptPage(props) {
  const [customerName, setcustomerName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [receipts, setReceipt] = useState(false);
  const [transactions, setTransaction] = useState(false);
  let data = useLocation();
  console.log('DATA LOCATION TEST', data.state.transactionId);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('Authorization');
      await fetch(`http://localhost:8003/receipt/GetReceipGetReceiptByTransactionIdtById/${data.state.transactionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }).then(response => {
        if(response.ok){
          response.json().then(json => {
            if(json.receipts !== false){
            setReceipt(json.receipts);
            console.log(json.receipts);
            }

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
    <div>
    </div>
  );
}

export default ReceiptPage;