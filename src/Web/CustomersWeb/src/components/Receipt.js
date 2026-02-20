import React from 'react';

const Receipt = ({ transaction }) => {
  return (
    <div>
      <h1>Receipt</h1>
      <h2>Transaction ID: {transaction.id}</h2>
      <p>Date: {transaction.date}</p>
      <p>Amount: ${transaction.amount}</p>
      <h3>Items:</h3>
      <ul>
        {transaction.items.map(item => (
          <li key={item.id}>{item.name} - ${item.price}</li>
        ))}
      </ul>
      <p>Total: ${transaction.total}</p>
    </div>
  );
};

export default Receipt;
