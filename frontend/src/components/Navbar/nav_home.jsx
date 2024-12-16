import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../pages/images/logo.png';
import './nav_home.css';

const NavHome = () => {
  const location = useLocation();


  const [favorites, setFavorites] = useState({});
  const [favoritesN, setFavoritesN] = useState(0);



  useEffect(() => {
    // Load favorites from session storage
    const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
    setFavoritesN(favorites.length);
    console.log(favorites.length);
    const favoritesMap = favorites.reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {});
    setFavorites(favoritesMap);
  }, []);

  console.log(favorites);
  console.log(favorites.length);


  return (
    <nav className="nav-home" style={{
      marginTop:'10px'
    }}> {/* Updated class name */}
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="nav-home-logo"> {/* Updated class name */}
          <img src={logo} alt="Your Logo" />
        </Link>

            {/* Navigation Links */}
            <div className="nav-home-links"> {/* Updated class name */}
              <Link to="/about" className="nav-home-link">About Us</Link> {/* Updated class name */}
              <Link to="/contactus" className="nav-home-link">Contact Us</Link> {/* Updated class name */}
              <Link to="/faq" className="nav-home-link">FAQ</Link> {/* Updated class name */}
            </div>


        {/* Buttons */}
        <div className="nav-home-buttons"> {/* Updated class name */}
          <Link to="/login" className="nav-home-button">Log In</Link> {/* Updated class name */}
          <Link to="/signup" className="signup-btn">Sign Up</Link> {/* Updated class name */}
        </div>
      </div>
    </nav>
  );
}

export default NavHome;
