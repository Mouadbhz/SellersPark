import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { setPersonType } from "../../actions/auth";
import landingImage from '../images/landing1.png';
import './home.css'; 

const Home = ({ setPersonType }) => {
  const handleGetStartedClick = () => {
    setPersonType("alternate");
  };

  return (
    <div>
      <div className="landing-page-container">
        <div className="landing-image">
          <img src={landingImage} alt="Landing Image" />
        </div>
        <div className="landing-title">
          <span className="first-sentence"> ONLINE </span>
          <span className="second-sentence"> SHOPPING</span>
          <p className="landing-paragraph">
            Shop hassle-free from home. Browse our wide range of products with ease and convenience. Your perfect purchase is just a click away. Enjoy exclusive deals and fast delivery, making your shopping experience even more delightful.
          </p>
          <div className="landing-buttons">
            <Link to="/internaut" className="landing-btn" onClick={handleGetStartedClick}>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { setPersonType })(Home);
