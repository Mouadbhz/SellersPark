import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/footer";
import { FaPlus } from "react-icons/fa";
import "./dashboardseller.css";
import "../client_dashboard/ProductCard.css";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
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
  }, []);

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

  return (
    <div className="seller-container">
      <div className="main-content">
        <div className="content-container">
          <div className="product-cards-container">
            <div className="title-container">
              <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 10 }}>YOUR PRODUCTS</h1>
              <Link to="/add-product" className="add-product-button">
                <FaPlus className="plus-icon" />
                Add Product
              </Link>
            </div>
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
              <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={() => setShowDeleteDialog(false)}>
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
};

const SellerProductsCard = ({ product, onDelete }) => {
  return (
    <div className="conatinerprod flex flex-wrap gap-5">
      <div key={product.id} className="product-card">
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
    </div>
  );
};

export default SellerDashboard;


// code iemchi




// ------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/footer";
import { FaPlus } from "react-icons/fa";
import "./dashboardseller.css";
import "../client_dashboard/ProductCard.css";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
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
  }, []);

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
        <div className="seller-dashboard-fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="seller-dashboard-bg-white p-4 rounded shadow-md">
            <p className="mb-4">Are you sure you want to delete this product?</p>
            <div className="flex justify-end space-x-2">
              <button className="seller-dashboard-px-4 py-2 bg-gray-500 text-white rounded" onClick={handleCancelDelete}>
                No
              </button>
              <button className="seller-dashboard-px-4 py-2 bg-red-600 text-white rounded" onClick={handleDeleteProduct}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SellerProductsCard = ({ product, onDelete }) => {
  return (
    <div key={product.id} className="seller-dashboard-product-card">
      <div className="seller-dashboard-relative flex flex-col w-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <div className="seller-dashboard-relative flex flex-col h-48 overflow-hidden rounded-xl">
          <img className="seller-dashboard-object-cover w-full h-full" src={product.imageCard} alt={product.title} />
          <div className="seller-dashboard-absolute bottom-0 left-0 w-full bg-white bg-opacity-75 p-2">
            <Link to={`/product-details-vendor/${product.id}`} className="seller-dashboard-text-lg tracking-tight text-slate-900">
              {product.title}
            </Link>
          </div>
        </div>
        <div className="seller-dashboard-px-4 py-3 flex flex-col items-center">
          <div className="seller-dashboard-flex items-center justify-between w-full">
            <p className="seller-dashboard-text-lg text-slate-900 font-bold">${product.price}</p>
            {product.old_price && <p className="seller-dashboard-text-sm text-gray-500 line-through">${product.old_price}</p>}
          </div>
          <div className="seller-dashboard-flex items-center mt-2">
            <Link className="seller-dashboard-flex items-center justify-center rounded-md bg-yellow-500 px-10 py-1.5 text-center text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300" to={`/edit-product/${product.id}`}>
              <i className="fas fa-edit seller-dashboard-mr-1"></i>
              Edit
            </Link>
            <i className="fas fa-trash-alt seller-dashboard-ml-2 cursor-pointer text-red-500" onClick={onDelete}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
