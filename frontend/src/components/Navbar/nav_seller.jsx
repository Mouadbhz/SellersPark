import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setPersonType } from "../../actions/auth";
import axios from "axios";
import logo from "../../pages/images/logo.png";
import avatar from "../../pages/images/avatar1.png";
import "./nav_cl.css";

const NavbarSeller = ({ logout , setPersonType}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const [categories, setCategories] = useState([]);
  // const [user, setUser] = useState([]);
  const [vendor, setVendor] = useState([]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout(); // Call the logout function passed from props
  };

  // Function to close the dropdown
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleSellerDashboardClick = () => {
    // Dispatch action to set persontype to "client"
    console.log("Setting persontype to client");
    setPersonType('client');
  };

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

  //     // Fetch users from backend
  //     axios
  //       .get("/auth/users/me/", config)
  //       .then((response) => {
  //         setUser(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching users:", error);
  //       });
  //     // Fetch vendors from backend
  //     axios
  //       .get("/api/vendors/", config)
  //       .then((response) => {
  //         setVendors(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching vendors:", error);
  //       });
  //   }
  // }, []);

  // console.log(categories);
  // console.log(user);
  // console.log(vendors);

  // // const hasVendorAccount = vendors.some((vendor) => vendor.user === user.id);
  // const hasVendorAccount = vendors.map(vendor => vendor.user === user.id);
  // console.log(hasVendorAccount);

  // const hasAnyVendorAccount = hasVendorAccount.includes(true); // Check if any vendor has an account

  // console.log(hasAnyVendorAccount); // This should output either true or false

  // // searching for the id of the vendor 

  // const vendorId = vendors.find(vendor => vendor.user === user.id)?.id;
  // console.log(vendorId);

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

          // Fetch client from backend
          const idVendorNumber = parseInt(localStorage.getItem("idVendor"));
      axios
      .get(`/api/vendor/${idVendorNumber}/vendor/`, config)
      .then((response) => {
        setVendor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching client:", error);
      });

    }
  }, []);

  const idVendorNumber = parseInt(localStorage.getItem("idVendor"));

  return (
    <nav className="navigation1 relative"style={{ marginTop: '20px' }}>
      <div className="max-w-7xl mx-auto flex justify-between items-center" >
        <div className="first-section flex items-center">
          <button className="logo">
            <Link to={`/seller-dashboard/${idVendorNumber}`}>
              <img src={logo} alt="Your Logo" />
            </Link>
          </button>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <i className="fas fa-search search-icon"></i>
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
              src={vendor.image}
              alt="user photo"
            />
          </button>
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-60 py-2 w-48 bg-white rounded-lg shadow-xl z-10">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">{`${vendor.first_name} ${vendor.last_name}`}</span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                {vendor.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                
                  <li className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    <Link to='/client-dashboard' onClick={handleSellerDashboardClick}>
                      <i className="fas fa-chart-line mr-2"></i>
                      <span>Client Dashboard</span>
                    </Link>
                  </li>
                
                <li className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  <Link to="/commands-seller" onClick={closeDropdown}>
                    <i className="fas fa-chart-line mr-2"></i>
                    <span>Commandes </span>
                  </Link>
                </li>
                <li className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  <Link to="/messages-seller" onClick={closeDropdown}>
                    <i className="bi bi-chat-right-dots mr-2"></i>
                    <span>Messages</span>
                  </Link>
                </li>
                <li className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  <Link to="/settings-seller" onClick={closeDropdown}>
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

    </nav>
  );
};

export default connect(null, { setPersonType })(NavbarSeller);
