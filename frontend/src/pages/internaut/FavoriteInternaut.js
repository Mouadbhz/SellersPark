import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/footer/footer";
import emptyFavoritesImage from "../../pages/images/heart.jpg";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";

const FavoriteInternaut = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to remove item from favorites
  const removeFromFavorites = (itemId) => {
    const updatedFavorites = favorites.filter((item) => item.id !== itemId);
    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  // Fetch favorite products from session storage
  useEffect(() => {
    const favoriteIds = JSON.parse(sessionStorage.getItem('favorites')) || [];
    setFavorites(favoriteIds);
    setLoading(false);
  }, []);

  return (
    <>
      <div className="mt-28">
        <h1 className="mt-20 text-left text-3xl font-bold font-serif">YOUR FAVORITES</h1>
        {loading ? (
          <div>Loading...</div>
        ) : favorites.length > 0 ? (
          <div className="mt-5">
            {favorites.map((item) => (
              <div key={item.id}>
                <FavoriteItemCard item={item} removeFromFavorites={removeFromFavorites} />
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
                <Link to="/internaut">
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

const FavoriteItemCard = ({ item, removeFromFavorites }) => {
  const handleDelete = () => {
    removeFromFavorites(item.id);
  };

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-4 items-center gap-4 ml-4">
        <ImCross
          onClick={handleDelete}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer text-1xl"
        />
        <div className="flex items-center flex-grow">
          <img className="w-32 h-32" src={item.image} alt={item.title} />
          <div className="ml-4 flex flex-col">
            <h1 className="font-titleFont font-semibold">{item.title}</h1>
            <p className="text-lg font-semibold">${item.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteInternaut;
