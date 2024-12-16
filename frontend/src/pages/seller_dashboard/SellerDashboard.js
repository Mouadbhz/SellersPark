import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/footer";
import { FaPlus } from "react-icons/fa";
import "./dashboardseller.css";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [vendor, setVendor] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("access");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${authToken}`,
        Accept: "application/json",
      },
    };

    const vendorId = parseInt(localStorage.getItem("idVendor"));

    axios
      .get(`/api/products/by_vendor/${vendorId}/`, config)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });


      axios
      .get(`/api/vendor/${vendorId}/vendor/`, config)
      .then((response) => {
        setVendor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  console.log(vendor);

  const handleDeleteProduct = () => {
    const authToken = localStorage.getItem("access");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${authToken}`,
        Accept: "application/json",
      },
    };
    axios
      .delete(`/api/delete-product/${productIdToDelete}/`, config)
      .then((response) => {
        console.log("Product deleted successfully");
        setProducts(products.filter((product) => product.id !== productIdToDelete));
        setShowDeleteDialog(false);
        setProductIdToDelete(null);
        const vendorId = localStorage.getItem("idVendor");
        navigate(`/seller-dashboard/${vendorId}`);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setProductIdToDelete(null);
  };

  if (vendor && vendor.is_active) {
    return (
      <div className="seller-dashboard-container">
        <div className="seller-dashboard-main-content">
          <div className="seller-dashboard-content-container">
            <div className="seller-dashboard-title-container">
              <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 10 }}>YOUR PRODUCTS</h1>
              <Link to="/add-product" className="seller-dashboard-add-product-button">
                <FaPlus className="seller-dashboard-plus-icon" />
                Add Product
              </Link>
            </div>
            <div className="seller-dashboard-product-cards-grid">
              {products.map((product) => (
                <SellerProductsCard key={product.id} product={product} onDelete={() => { setProductIdToDelete(product.id); setShowDeleteDialog(true); }} />
              ))}
            </div>
          </div>
        </div>
        <Footer />

        {showDeleteDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-md">
              <p className="mb-4">Are you sure you want to delete this product?</p>
              <div className="flex justify-end space-x-2">
                <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={handleCancelDelete}>
                  No
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleDeleteProduct}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="seller-dashboard-container">
        <div className="seller-dashboard-main-content">
          <h1>Your account is under admin's review. Please wait for approval.</h1>
        </div>
        <Footer />
      </div>
    );
  }
};

const SellerProductsCard = ({ product, onDelete }) => {
  return (
    <div className="seller-dashboard-product-card">
      <div className="relative flex flex-col w-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <div className="relative flex flex-col h-48 overflow-hidden rounded-xl">
          <img className="object-cover w-full h-full" src={product.imageCard} alt={product.title} />
          <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-75 p-2">
            <Link to={`/product-details-vendor/${product.id}`} className="text-lg tracking-tight text-slate-900">
              {product.title}
            </Link>
          </div>
        </div>
        <div className="px-4 py-3 flex flex-col items-center">
          <div className="flex items-center justify-between w-full">
            <p className="text-lg text-slate-900 font-bold">${product.price}</p>
            {product.old_price && <p className="text-sm text-gray-500 line-through">${product.old_price}</p>}
          </div>
          <div className="flex items-center mt-2">
            <Link className="flex items-center justify-center rounded-md bg-yellow-500 px-10 py-1.5 text-center text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300" to={`/edit-product/${product.id}`}>
              <i className="fas fa-edit mr-1"></i>
              Edit
            </Link>
            <i className="fas fa-trash-alt ml-2 cursor-pointer text-red-500" onClick={onDelete}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
