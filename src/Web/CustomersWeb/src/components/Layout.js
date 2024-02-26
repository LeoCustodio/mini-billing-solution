import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import './Layout.css'; // Import CSS file for styling

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <div>
                <Header />
                <div className="container">
                <Navigation />
                    <div className='children'>
                    <main>{children}</main>
                    </div>
                    
                </div>
            </div>
        </React.Fragment>
    );
};
export default Layout;