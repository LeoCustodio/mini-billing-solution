import { NavLink } from 'react-router-dom';

const NAVIGATION_LINKS = [
  { to: '/CustomerPage', label: 'Customers' },
  { to: '/PaymentPage', label: 'Payment' },
  { to: '/TransactionPage', label: 'Transactions' },
  { to: '/ReceiptPage', label: 'Receipts' },
];

const Navigation = () => (
  <nav className="app-sidebar" aria-label="Primary">
    <ul className="app-sidebar__list">
      {NAVIGATION_LINKS.map(({ to, label }) => (
        <li key={to} className="app-sidebar__item">
          <NavLink
            to={to}
            className={({ isActive }) =>
              `app-sidebar__link${isActive ? ' app-sidebar__link--active' : ''}`
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navigation;
