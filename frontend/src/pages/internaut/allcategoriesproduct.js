import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllCategoriesProducts = ({ categoryid, categoryname }) => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [favorited, setFavorited] = useState({});

  useEffect(() => {
    // Fetch categories from backend
    axios
      .get(`/api/categories/${categoryid}/products/`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setErrorMessage("Error fetching products");
      });
  }, [categoryid]);

  useEffect(() => {
    // Load favorites from session storage
    const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
    const favoritesMap = favorites.reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {});
    setFavorited(favoritesMap);
  }, []);

  const handleAddToCart = (productId) => {
    console.log(`Product added to cart: ${productId}`);
  };

  const handleAddToFavorite = (product) => {
    const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
    const isFavorite = favorited[product.id];

    let updatedFavorites;
    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favorites.filter((item) => item.id !== product.id);
    } else {
      // Add to favorites
      const newFavorite = { id: product.id, title: product.title, image: product.imageCard, price: product.price };
      updatedFavorites = [...favorites, newFavorite];
    }

    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorited((prevFavorited) => ({
      ...prevFavorited,
      [product.id]: !prevFavorited[product.id],
    }));
    console.log("favorite", product.id);
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">{categoryname}</h2>
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
      <div className="flex overflow-x-auto">
        {products.length > 0 ? (
          <div className="flex space-x-4 p-4 bg-white rounded-md">
            {products.map((product, index) => (
              <div key={index} className="relative flex flex-col w-52 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition duration-300 transform hover:shadow-lg hover:scale-105">
                <div className="relative flex flex-col h-48 overflow-hidden rounded-xl">
                  <img className="object-cover w-full h-full" src={product.imageCard} alt={product.title} />
                  <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-75 p-2">
                    <Link to={`/product-details-alternate/${product.id}`} className="text-lg tracking-tight text-slate-900">{product.title}</Link>
                  </div>
                </div>
                <div className="px-4 py-3 flex flex-col items-center">
                  <div className="flex items-center justify-between w-full">
                    <p className="text-lg text-slate-900 font-bold">${product.price}</p>
                    {product.old_price && (
                      <p className="text-sm text-gray-500 line-through">${product.old_price}</p>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    <p className="text-sm items-center text-slate-600">Rating:</p>
                    <span className="ml-1 text-yellow-500">⭐⭐⭐⭐</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <button className="flex items-center justify-center rounded-md bg-blue-900 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={() => handleAddToCart(product.id)}>
                      <i className="bi bi-cart mr-1"></i>
                      Add to Cart
                    </button>
                    <Link to={`/product-details-alternate/${product.id}`} className="bi bi-eye ml-2 cursor-pointer text-black"></Link>
                    <i className={favorited[product.id] ? "fas fa-heart text-red-500 ml-2 cursor-pointer" : "far fa-heart ml-2 cursor-pointer"} onClick={() => handleAddToFavorite(product)}></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AllCategoriesProducts;
