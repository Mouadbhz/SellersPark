import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/footer";
import emptyFavoritesImage from "../../pages/images/heart.jpg"; // Import the image for empty favorites
import { Link } from "react-router-dom"; // Import Link from React Router
import axios from "axios";
import { ImCross } from "react-icons/im";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const authToken = localStorage.getItem("access");
    if (authToken) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authToken}`,
          Accept: "application/json",
        },
      };

      const IDClient = parseInt(localStorage.getItem("idClient"));

      // Fetch favorites from backend
      axios
        .get(`/api/favorite/${IDClient}/`, config)
        .then((response) => {
          setFavorites(response.data);
          setLoading(false); // Set loading to false after data is fetched
        })
        .catch((error) => {
          console.error("Error fetching favorites:", error);
          setLoading(false); // Set loading to false even if there is an error
        });
    }
  }, []);

  const handleDelete = (productId) => {
    const authToken = localStorage.getItem("access");
    if (authToken) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authToken}`,
          Accept: "application/json",
        },
      };

      const IDClient = parseInt(localStorage.getItem("idClient"));

      // Make delete request to backend
      axios
        .delete(`/api/favorite/delete/${IDClient}/${productId}/`, config)
        .then((response) => {
          console.log("Product deleted successfully:", response.data);
          // Fetch updated favorites after deletion
          axios
            .get(`/api/favorite/${IDClient}/`, config)
            .then((response) => {
              setFavorites(response.data);
            })
            .catch((error) => {
              console.error("Error fetching updated favorites:", error);
            });
        })
        .catch((error) => {
          console.error("Error deleting product from favorites:", error);
        });
    }
  };

  const FavoriteItemCard = ({ item, removeFromFavorites }) => {
    const [product, setProduct] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
      const authToken = localStorage.getItem("access");
      if (authToken) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${authToken}`,
            Accept: "application/json",
          },
        };

        // Fetch product details from backend
        axios
          .get(`/api/product/${item.product}/`, config)
          .then((response) => {
            setProduct(response.data);
          })
          .catch((error) => {
            console.error("Error fetching product:", error);
          });
      }
    }, [item.product]);

    const addToWishlist = (productId) => {
      const authToken = localStorage.getItem("access");
      if (authToken) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${authToken}`,
            Accept: "application/json",
          },
        };

        const IDClient = parseInt(localStorage.getItem("idClient"));

        axios.post(`/api/wishlist/add/${IDClient}/${productId}/`, {}, config)
          .then(response => {
            console.log("Product added to wishlist successfully: ", response.data);
          })
          .catch(error => {
            console.error("Error adding product to wishlist:", error);
            if (error.response && error.response.data.message === 'Product already exists in the wishlist') {
              setErrorMessage('Product already exists in the wishlist');
              setTimeout(() => {
                setErrorMessage('');
              }, 2000);
            }
          });
      }
    };

    // Render nothing if the product data is not yet fetched
    if (!product) {
      return <div>Loading...</div>;
    }

    return (
      <div className="w-full grid grid-cols-5 mb-4 border py-2">
        <div className="flex col-span-4 items-center gap-4 ml-4">
          <ImCross
            onClick={() => removeFromFavorites(product.id)}
            className="text-primeColor hover:text-red-500 duration-300 cursor-pointer text-1xl"
          />
          <div className="flex items-center flex-grow">
            <img className="w-32 h-32" src={product.imageCard} alt={product.title} />
            <div className="ml-4 flex flex-col">
              <h1 className="font-titleFont font-semibold">{product.title}</h1>
              <p className="text-lg font-semibold">${product.price}</p>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-end pr-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 duration-300"
            onClick={() => addToWishlist(product.id)}
          >
            Add to Wishlist
          </button>
        </div>
        {errorMessage && (
          <div className="col-span-5 text-red-500 text-center mt-2">
            {errorMessage}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className=""style={{ marginTop: '40px' }}>
        <h1 className=" text-left text-3xl font-bold font-serif">YOUR FAVORITES</h1>
        {loading ? (
          <div className="flex items-center justify-center mt-10">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {favorites.length > 0 ? (
              <div className="mt-5">
                {favorites
                  .filter((item) => item.product !== null) // Filter out items with null product
                  .map((item) => (
                    <div key={item.id}>
                      <FavoriteItemCard
                        item={item}
                        removeFromFavorites={handleDelete}
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
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Favorites;