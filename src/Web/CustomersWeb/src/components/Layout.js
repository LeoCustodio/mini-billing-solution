import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="page">
      <Header />
      <div className="app-body">
      <aside className="sidebar--left">
        <Navigation />
      </aside>
      <div className="main">
        <section className="content">
          {children}
        </section>
      </div>
    </div>
      </div>

  );
}
