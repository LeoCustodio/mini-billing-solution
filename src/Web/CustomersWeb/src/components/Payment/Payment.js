import React, { useState } from 'react';
import './Payment.css';

function MakeDeposit() {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
  
    const handleSubmit = async (event) => {
      const action = 'MAKE_TRANSACTION';

      event.preventDefault();
      setName('');
      setAmount('');

      const token = localStorage.getItem('Authorization');
      try {
          await fetch('http://localhost:8081/customer/makedeposit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
          },
          body: JSON.stringify( { name, amount, action } ),
        }).then(response => {
          if(response.ok){
            response.json().then(json => {
              if(!json){
                return alert('Customer Not Found');
              }
            })
          }
        });
      } catch (error) {
      } finally {
      }
  
    };
  
    return (
      <section className="payment-card">
        <form className="payment-form" onSubmit={handleSubmit}>
          <h2 className="payment-card__title">Make Deposit</h2>
          <input
            type="text"
            placeholder="Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button type="submit">Make Deposit</button>
        </form>
      </section>
    );
}

function MakePayment() {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const action = 'MAKE_TRANSACTION';
      setName('');
      setAmount('');
      const token = localStorage.getItem('Authorization');
      try {
          await fetch('http://localhost:8081/customer/makepayment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
          },
          body: JSON.stringify( { name, amount, action } ),
        }).then(response => {
          if(response.ok){
            response.json().then(json => {
              if(!json){
                return alert('Customer Not Found');
              }
            })
          }
        });
      } catch (error) {
      } finally {
      }
  
    };
  
    return (
      <section className="payment-card">
        <form className="payment-form" onSubmit={handleSubmit}>
          <h2 className="payment-card__title">Make Payment</h2>
          <input
            type="text"
            placeholder="Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button type="submit">Make Payment</button>
        </form>
      </section>
    );
}

function PaymentPage() {
    return (
      <div className="payment-page">
        <div className="payment-grid">
          <MakeDeposit />
          <MakePayment />
        </div>
      </div>
    );
  }

  export default PaymentPage;
  