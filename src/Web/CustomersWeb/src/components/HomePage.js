import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => (
  <section className="home">
    <div className="home__intro">
      <span className="home__eyebrow">Billing made simple</span>
      <h1 className="home__title">Manage customers and payments from one intuitive dashboard.</h1>
      <p className="home__description">
        Mini Billing Solution streamlines how you onboard customers, collect payments, and reconcile
        transactions so you can focus on growing your business.
      </p>
      <div className="home__actions">
        <Link className="home__action home__action--primary" to="/CustomerPage">
          Manage customers
        </Link>
        <Link className="home__action" to="/PaymentPage">
          Accept a payment
        </Link>
      </div>
    </div>
    <div className="home__card">
      <div className="home__stat">
        <span className="home__stat-value">99.9%</span>
        <span className="home__stat-label">Uptime for payments</span>
      </div>
      <div className="home__stat">
        <span className="home__stat-value"><span className="home__stat-currency">$</span>12M</span>
        <span className="home__stat-label">Processed annually</span>
      </div>
      <p className="home__card-copy">
        Secure, tokenized payments keep your customers safe while providing you with real-time
        visibility into every transaction.
      </p>
    </div>
  </section>
);

export default HomePage;
