import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../pages/images/logo.png';

import './footer.css';

const Footer = () => {
  return (
    <footer className="clientfooter">
      <div className="footer-container">
        <div className="footer-column">
        <button className="logo">
            <Link to="/client-dashboard">
              <img src={logo} alt="Your Logo" />
            </Link>
          </button>
        </div>
        <div className="footer-column">
          <h4>Contact Us</h4>
          <p>Email: sellerspark@gmail.com</p>
          <p>Phone: +213-556-7890</p>
        </div>
        <div className="footer-column">

          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contactus">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 SellersPark .   All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
