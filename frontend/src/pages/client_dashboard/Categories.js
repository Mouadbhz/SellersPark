import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/footer/footer";
import AllCategoriesProducts from "./allcategoriesproduct"; // Import the AllCategoriesProducts component
import RatingFilter from "./filterbar"; // Import RatingFilter component
import "./allcategories.css"; // Import custom CSS for styling

const Categories = () => {
  const [categoriess, setCategoriess] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const authToken = localStorage.getItem("access");
    if (authToken) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${authToken}`,
          'Accept': 'application/json'
        }
      };

      // Fetch categories from backend
      axios
        .get("/api/categories/", config)
        .then((response) => {
          setCategoriess(response.data);
          setIsLoading(false); // Set loading to false after data is fetched
          // console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
          setIsLoading(false); // Set loading to false even if there's an error
        });
    }
  }, []);

  console.log(categoriess);

  return (
    <div className="unique-container">
      <div className="unique-main-content">
        <div className="unique-content-container">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="unique-products-container">
              {categoriess.map((category, index) => (
                <div key={index} className="unique-category-products">
                  <AllCategoriesProducts categoryid={category.id} categoryname={category.category_name} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Categories;
