import React, { useState } from 'react';

function MakeDeposit() {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
  
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setName('');
      const token = localStorage.getItem('Authorization');
      try {
        const response = await fetch('http://localhost:8002/customer/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
          },
          body: JSON.stringify( { name } ),
        }).then(response => {
          if(response.ok){
            response.json().then(json => {
              console.log(json);
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
              onChange={(e) => setName(e.target.value)}
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
      setName('');
      const token = localStorage.getItem('Authorization');
      try {
        const response = await fetch('http://localhost:8002/customer/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
          },
          body: JSON.stringify( { name } ),
        }).then(response => {
          if(response.ok){
            response.json().then(json => {
              console.log(json);
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
              onChange={(e) => setName(e.target.value)}
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
  