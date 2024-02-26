import React, { useState } from 'react';

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
      <form onSubmit={handleSubmit}>
        <h2>Make Deposit</h2>
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
      <form onSubmit={handleSubmit}>
        <h2>Make Payment</h2>
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
    );
}

function PaymentPage() {
    const [customers, setCustomers] = useState([]);
  
    const handleAddCustomer = (customer) => {
      setCustomers([...customers, customer]);
    };
  
    return (
      <div>
        <MakeDeposit onAddCustomer={handleAddCustomer} />
        <MakePayment onAddCustomer={handleAddCustomer} />
      </div>
    );
  }
  
  export default PaymentPage;
  