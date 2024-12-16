import React, { useEffect, useState } from "react";
import Navbarcl from "../../components/Navbar/nav_client";
import Footer from "../../components/footer/footer";
import { SplOfferData } from "../../pages/Data/index2"; // Import the SplOfferData
import FavoriteItemCard from "./favoriteItemCrad";
import emptyFavoritesImage from "../../pages/images/heart.jpg"; // Import the image for empty favorites
import { Link } from "react-router-dom"; // Import Link from React Router

const Favorites = () => {
  // Initialize favorites state with SplOfferData
  const [favorites, setFavorites] = useState(SplOfferData);

  // Function to remove item from favorites
  const removeFromFavorites = (itemId) => {
    setFavorites(favorites.filter((item) => item._id !== itemId));
  };

  return (
    <>
      <Navbarcl />
      <div className="mt-28">
        <h1 className="mt-20 text-left text-3xl font-bold font-serif">YOUR FAVORITES</h1>
        {favorites.length > 0 ? (
          <div className="mt-5">
            {favorites.map((item) => (
              <div key={item._id}>
                <FavoriteItemCard
                  item={item}
                  removeFromFavorites={removeFromFavorites}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-10">
            <div className="flex flex-row items-center gap-4 bg-white p-4 rounded-md shadow-lg">
              <div className="max-w-[500px] flex flex-col items-center">
                <h1 className="font-titleFont text-xl font-bold uppercase">
                  Your Favorites List is Empty
                </h1>
                <p className="text-sm text-center px-10 -mt-2">
                  Your favorites list feels lonely. Add items to make it happy.
                </p>
                <Link to="/client-dashboard">
                  <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                    Continue Shopping
                  </button>
                </Link>
              </div>
              <div>
                <img
                  className="w-80 rounded-lg p-4"
                  src={emptyFavoritesImage}
                  alt="Empty Favorites"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Favorites;
