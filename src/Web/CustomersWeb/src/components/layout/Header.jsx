import { Link, NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';

const Header = () => (
  <header className="app-header">
    <Link to="/" className="app-header__brand">
      <img src={logo} alt="Mini Billing Solution logo" className="app-header__logo" />
      <span>Mini Billing Solution</span>
    </Link>
    <nav className="app-header__actions" aria-label="Authentication">
      <NavLink to="/Login" className={({ isActive }) => `app-header__link${isActive ? ' app-header__link--active' : ''}`}>
        Login
      </NavLink>
      <NavLink
        to="/LoginGoogle"
        className={({ isActive }) => `app-header__link${isActive ? ' app-header__link--active' : ''}`}
      >
        Login with Google
      </NavLink>
    </nav>
  </header>
);

export default Header;
