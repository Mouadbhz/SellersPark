import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import logo from "../../pages/images/logo.png";
import avatar from "../../pages/images/avatar1.png";
import "./nav_cl.css";
import { setPersonType, fetchVendorID } from "../../actions/auth";

const Navbarcl = ({ logout, setPersonType, fetchVendorID }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState([]);
  const [client, setClient] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [idVendorNumber, setIdVendorNumber] = useState(0);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    const idClientNumber = parseInt(localStorage.getItem("idClient"));
    fetchVendorID(idClientNumber);
    console.log(client);
    // ----------------------------------------------------
    const authToken = localStorage.getItem("access");
    if (authToken) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authToken}`,
          Accept: "application/json",
        },
      };

      axios
        .get(`/api/vendor/${client.id}/client/`, config)
        .then((response) => {
          setVendor(response.data);
          console.log("favorite list: ", response.data);
          setIdVendorNumber(response.data.id);
        })
        .catch((error) => {
          console.error("Error fetching vendor:", error);
        });
    }
  };

  const handleLogout = () => {
    logout(); // Call the logout function passed from props
  };

  const handleSellerDashboardClick = () => {
    // Dispatch action to set persontype to "seller"
    console.log("Setting persontype to seller");
    setPersonType("seller");
  };

  const handleDashboardClick = () => {
    // Dispatch action to set persontype to "seller"
    console.log("Setting persontype to seller");
    setPersonType("seller");
  };

  // Function to close the dropdown
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  // ---------------------------------------------------

  // useEffect(() => {
  //   const authToken = localStorage.getItem("access");
  //   if (authToken) {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `JWT ${authToken}`,
  //         Accept: "application/json",
  //       },
  //     };

  //     // Fetch categories from backend
  //     axios
  //       .get("/api/categories/", config)
  //       .then((response) => {
  //         setCategories(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching categories:", error);
  //       });

  //     // Fetch user from backend
  //     axios
  //       .get("/auth/users/me/", config)
  //       .then((response) => {
  //         setUser(response.data);

  //         // Fetch client from backend using the user's id
  //         axios
  //           .get(`/api/client/${response.data.id}/user/`, config)
  //           .then((response) => {
  //             setClient(response.data);
  //             // Fetch vendor from backend using the client's id
  //             axios
  //               .get(`/api/vendor/${response.data.id}/client/`, config)
  //               .then((response) => {
  //                 setVendor(response.data);
  //                 // console.log(response.data.id);
  //                 setIdVendorNumber(response.data.id); // Update idVendorNumber
  //               })
  //               .catch((error) => {
  //                 console.error("Error fetching client:", error);
  //                 if (error.request.statusText) {
  //                   setIdVendorNumber(0); // Update idVendorNumber
  //                 }
  //               });
  //           })
  //           .catch((error) => {
  //             console.error("Error fetching client:", error);
  //           });
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user:", error);
  //       });
  //   }
  // }, []);

  //---------------------------------------------------------

  useEffect(() => {
    // Function to fetch data from backend
    const fetchData = async () => {
      const authToken = localStorage.getItem("access");
      if (authToken) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${authToken}`,
            Accept: "application/json",
          },
        };

        try {
          // Fetch user from backend
          const userResponse = await axios.get("/auth/users/me/", config);
          setUser(userResponse.data);

          // Fetch client from backend using the user's id
          const clientResponse = await axios.get(
            `/api/client/${userResponse.data.id}/user/`,
            config
          );
          setClient(clientResponse.data);

          // Fetch vendor from backend using the client's id
          // const vendorResponse = await axios.get(`/api/vendor/${clientResponse.data.id}/client/`, config);
          // setVendor(vendorResponse.data);
          // setIdVendorNumber(vendorResponse.data.id);

          // Fetch wishlist from backend
          const wishlistResponse = await axios.get(
            `/api/wishlist/${clientResponse.data.id}/`,
            config
          );
          setWishlist(wishlistResponse.data);

          // Fetch favorite from backend
          const favoriteResponse = await axios.get(
            `/api/favorite/${clientResponse.data.id}/`,
            config
          );
          setFavorite(favoriteResponse.data);

          // Fetch categories from backend
          axios
            .get("/api/categories/", config)
            .then((response) => {
              setCategories(response.data);
              // console.log(response.data);
            })
            .catch((error) => {
              console.error("Error fetching categories:", error);
            });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data every second
    const intervalId = setInterval(fetchData, 1000);

    // Cleanup function to clear interval
    return () => clearInterval(intervalId);
  }, []);

  // console.log(categories);
  // console.log(user);
  // console.log(client);
  // console.log(vendor);

  // console.log(idVendorNumber);

  // console.log(favorite);
  // console.log(wishlist);

  // console.log(favorite.length);
  // console.log(wishlist.length);

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const authToken = localStorage.getItem("access");
      const config = {
        headers: {
          Authorization: `JWT ${authToken}`,
          Accept: "application/json",
        },
      };

      const response = await axios.get("/api/products/", config);
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
    setShowSuggestions(false);
  };

  return (
    <nav className="navigation1 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="first-section flex items-center">
          <button className="logo">
            <Link to="/client-dashboard">
              <img src={logo} alt="Your Logo" />
            </Link>
          </button>
          <div className="search-container">
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
            <div className="suggestions-container">
              {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestions">
                  {suggestions.map((product) => (
                    <li key={product.id}>
                      <Link
                        to={`/product-details/${product.id}`}
                        onClick={handleSuggestionClick} // Add onClick to hide suggestions
                      >
                        {product.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="icons">
            <button className="relative">
              <Link to="/wishlist">
                <i className="bi bi-cart3 relative ml-10">
                  <span className="absolute bottom-5 left-5 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {wishlist.length - 1}
                  </span>
                </i>
              </Link>
            </button>
            <button className="relative mr-10">
              <Link to="/favorites">
                <i className="far fa-heart  relative">
                  <span className="absolute bottom-4 left-5 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {favorite.length - 1}
                  </span>
                </i>
              </Link>
            </button>
          </div>
        </div>
        {/* Profile Dropdown */}
        <div className="flex items-center relative">
          {/* Profile Dropdown Button */}
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 relative z-20" // Add z-20 here
            id="user-menu-button"
            aria-expanded={isDropdownOpen}
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>

            <img
              className="w-10 h-10 rounded-full"
              src={client.image}
              alt="user photo"
            />
          </button>
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-60 py-2 w-48 bg-white rounded-lg shadow-xl z-10">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">{`${client.first_name} ${client.last_name}`}</span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                  {client.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                {idVendorNumber === 0 ? (
                  <li className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    <Link to="/be-seller" onClick={closeDropdown}>
                      <i className="fas fa-chart-line mr-2"></i>
                      <span>Be Seller</span>
                    </Link>
                  </li>
                ) : (
                  <li className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    <Link
                      to={`/seller-dashboard/${idVendorNumber}`}
                      onClick={handleSellerDashboardClick}
                    >
                      <i className="fas fa-chart-line mr-2"></i>
                      <span>Seller Dashboard</span>
                    </Link>
                  </li>
                )}

                <li className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  <Link to="/commands-client" onClick={closeDropdown}>
                    <i className="fas fa-chart-line mr-2"></i>
                    <span>Commandes</span>
                  </Link>
                </li>
                <li className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  <Link to="/messages-client" onClick={closeDropdown}>
                    <i className="bi bi-chat-right-dots mr-2"></i>
                    <span>Messages</span>
                  </Link>
                </li>
                <li className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  <Link to="/settings-client" onClick={closeDropdown}>
                    <i className="fas fa-cog mr-2"></i>
                    <span>Settings</span>
                  </Link>
                </li>
                <li className="flex items-center justify-between px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-200 dark:hover:text-white">
                  <Link to="/" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    <span>Log out</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {/* End Dropdown menu */}
        </div>
        {/* End Profile Dropdown */}
      </div>
      <div className="second-section">
        <div className="all-categories">
          <Link to="/categories">
            <span className="menu-icon">&#9776;</span>
            <span>All Categories</span>
          </Link>
          <div className={`category-dropdown ${isDropdownOpen ? "open" : ""}`}>
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/category/${category.id}`}>
                    {category.category_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="categoriescl">
          <button>
            <Link to="/client-dashboard">Home</Link>
          </button>
          <button>
            <Link to="/new">New</Link>
          </button>
          <button>
            <Link to="/category/4">Man</Link>
          </button>
          <button>
            <Link to="/category/3">Woman</Link>
          </button>
          <button>
            <Link to="/category/2">Sports</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default connect(null, { setPersonType, fetchVendorID })(Navbarcl);
