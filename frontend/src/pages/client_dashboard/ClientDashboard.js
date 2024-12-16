// clientDashboard.js
import React from "react";
import ProductsCard from "./ProductCard";
import RatingFilter from "../../components/filterbar";
import './dashboardclient.css';
import Footer from "../../components/footer/footer";

const ClientDashboard = () => {
 

  return (
    <div className="clientcontainer">
      <div className="main-content">

        <div className="content-container">
          <div className="product-cards-container">
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 10 , marginLeft:'15px' }}>OUR PRODUCTS</h1>
            <ProductsCard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

};

export default ClientDashboard;
