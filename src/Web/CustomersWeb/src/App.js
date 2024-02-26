import './App.css';
import CustomerPage from "./components/Customers/Customers";
import Login from "./components/Login/Login";
import PaymentPage from "./components/Payment/Payment";
import Home from "./components/HomePage";
import Layout from "./components/Layout"
import TransactionPage from "./components/Transaction/Transaction"
import ReceiptPage from "./components/Receipt/Receipt"
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CustomerPage" element={<CustomerPage />} />
        <Route path="/PaymentPage" element={<PaymentPage />} />
        <Route path="/TransactionPage" element={<TransactionPage />} />
        <Route path="/ReceiptPage" element={<ReceiptPage />} />
      </Routes>
      </Layout>

    </div>
  );
}

export default App;
