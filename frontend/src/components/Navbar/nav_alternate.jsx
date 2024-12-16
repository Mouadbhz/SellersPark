import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../pages/images/logo.png';
import { connect } from 'react-redux';
import { setPersonType } from '../../actions/auth';
import axios from 'axios'; // Import axios for making HTTP requests

import './nav_alternate.css';

const NavbarAlt = ({ setPersonType }) => {
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products
    fetchProducts();
    // Update favorites count every 1 second
    const interval = setInterval(() => {
      const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
      setFavoritesCount(favorites.length);
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/api/products/`);
      setProducts(response.data); // Assuming data is an array of products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  
    if (searchTerm.trim() === "") {
      // If search term is empty, clear suggestions
      setSuggestions([]);
      return;
    }
  
    // Filter products based on the search term
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Set suggestions to the filtered products
    setSuggestions(filteredProducts);
  };

  const handleSuggestionClick = () => {
    // Hide suggestions
    setSuggestions([]);
  };

  const handleLogoClick = () => {
    localStorage.removeItem('persontype'); // Remove persontype from localStorage
    setPersonType(null); // Dispatch action to set persontype to null in Redux store
  };

  return (
    <nav className="navigation1">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="first-section">
          <Link to="/" className="logo" onClick={handleLogoClick}>
            <img src={logo} alt="Your Logo" />
          </Link>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleChange}
            />
            <i className="fas fa-search search-icon"></i>
          </div>
          {/* Display suggestions */}
          <div className="suggestions-container" style={{marginLeft: '170px'}}>
            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((product) => (
                  <li key={product.id}>
                    <Link
                      to={`/product-details-alternate/${product.id}`}
                      onClick={handleSuggestionClick} // Add onClick to hide suggestions
                    >
                      {product.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="icons">
            <Link to="/favorite-internaut" className="relative">
              <i className="far fa-heart  relative">
                <span className="absolute bottom-4 left-5 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {favoritesCount}
                </span>
              </i>
            </Link>
          </div>
          <Link to="/login" className="nav-home-button">Log In</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default connect(null, { setPersonType })(NavbarAlt);
