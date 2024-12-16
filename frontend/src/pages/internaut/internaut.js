import React, { useState, useEffect } from "react";
import axios from "axios";
import AllCategoriesProducts from "./allcategoriesproduct";
import Footer from "../../components/footer/footer";


const Internaut = () => {


  const [categoriess, setCategoriess] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {

          // Fetch categories from backend
          axios
            .get("/api/categories/")
            .then((response) => {
              setCategoriess(response.data);
              setIsLoading(false); // Set loading to false after data is fetched
              // console.log(response.data);
            })
            .catch((error) => {
              console.error("Error fetching categories:", error);
              setIsLoading(false); // Set loading to false even if there's an error
            });


  }, []);

  console.log(categoriess);

  return (
    <div className="custom-container">
      <h1>this is Internaut</h1>
      <div className="custom-main-content mt-28">
        <div className="custom-content-container">
        {categoriess ? (

          <div className="custom-products-container ml-40">
          {categoriess.map((category, index) => (
            <div key={index} className="custom-category-products">
              <AllCategoriesProducts categoryid={category.id} categoryname={category.category_name}/>
            </div>
          ))}
        </div>
            
          ) : (
           
            <p>Loading...</p>
            
          )}

        </div>
      </div>
     <Footer />
    </div>
  );

};

export default Internaut;

