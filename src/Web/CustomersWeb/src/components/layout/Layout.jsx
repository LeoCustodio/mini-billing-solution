import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import './Layout.css';

const Layout = () => (
  <div className="app-shell">
    <Header />
    <div className="app-shell__main">
      <Navigation />
      <main className="app-shell__content">
        <Outlet />
      </main>
    </div>
    <Footer />
  </div>
);

export default Layout;
