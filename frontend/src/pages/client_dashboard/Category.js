import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCardCategory from "./ProductCardCategory";
import { useParams } from "react-router-dom";
import RatingFilter from "./filterbar"; // Import RatingFilter component
import "./dashboardclient.css";


const Category = () => {
  const { categoryId } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const authToken = localStorage.getItem("access");
        if (authToken) {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${authToken}`,
              Accept: "application/json",
            },
          };
          const response = await axios.get(
            `/api/categories/${categoryId}/products/`,
            config
          );
          setCategoryProducts(response.data);

          // Fetch category title based on category ID
          axios
            .get(`/api/category/${categoryId}/`, config)
            .then((response) => {
              setCategory(response.data);
            })
            .catch((error) => {
              console.error("Error fetching category title:", error);
            });
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };

    fetchCategoryProducts();
  }, [categoryId]);

  console.log(categoryProducts);
  console.log(category);

  return (
    <div className="clientcontainer">
      <div className="main-content">
        <div className="content-container">
          <div className="product-cards-container" style={{ marginTop: '40px' }}>
            <h1
              style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 10 }}
            >
              {category.category_name}
            </h1>
            <ProductCardCategory categoryid={categoryId} />
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="container">
  //     <h2>Category Products</h2>
  //     <h2>{categoryId}</h2>
  //     <div className="row">
  //       {categoryProducts.map((product) => (
  //         <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
  //           <ProductCard product={product} />
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default Category;

