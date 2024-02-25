import React, { useState } from 'react';
import './Customers.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function CustomerForm({ onAddCustomer }) {
  const [name, setName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    onAddCustomer({ name });
    setName('');
    const token = localStorage.getItem('Authorization');
    try {
      await fetch('http://localhost:8002/customer/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ name }),
      }).then(response => {
        if (response.ok) {
          response.json().then(json => {
            console.log(json);
            return alert("Customer Created Successfully")
          })
        }
      });
    } catch (error) {
    } finally {
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Customer</h2>
      <input
        type="text"
        placeholder="Customer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Add Customer</button>
    </form>
  );
}

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const handleClick = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('Authorization');

    try {
      await fetch('http://localhost:8002/customer/searchcustomers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }).then(response => {
        if (response.ok) {
          response.json().then(json => {
            console.log(json);
            setCustomers(json);
          })
        }
      });
    } catch (error) {
    } finally {
    }
  }

  return (
    <div>
      <h2>Get All Customers</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Users Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button onClick={(handleClick)}>Get All Customers</button>
    </div>
  );
}

function CustomerPage() {
  const [customers, setCustomers] = useState([]);

  const handleAddCustomer = (customer) => {
    setCustomers([...customers, customer]);
  };

  return (
    <div>
      <CustomerForm onAddCustomer={handleAddCustomer} />
      <p></p>
      <CustomerList />
    </div>
  );
}

export default CustomerPage;