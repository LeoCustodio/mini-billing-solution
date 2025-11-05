import HomePage from '../components/HomePage';
import Login from '../components/Login/Login';
import LoginGoogle from '../components/Login/LoginGoogle';
import CustomerPage from '../components/Customers/Customers';
import PaymentPage from '../components/Payment/Payment';
import TransactionPage from '../components/Transaction/Transaction';
import ReceiptPage from '../components/Receipt/Receipt';
import TokenPage from '../components/Token/Token';

const appRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/Login', element: <Login /> },
  { path: '/LoginGoogle', element: <LoginGoogle /> },
  { path: '/CustomerPage', element: <CustomerPage /> },
  { path: '/PaymentPage', element: <PaymentPage /> },
  { path: '/Token', element: <TokenPage /> },
  { path: '/TransactionPage', element: <TransactionPage /> },
  { path: '/ReceiptPage', element: <ReceiptPage /> },
];

export default appRoutes;
