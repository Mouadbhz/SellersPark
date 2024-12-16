import React, { useState, useEffect, useRef } from 'react';
import Footer from "../../components/footer/footer";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const inputFileRefs = Array.from({ length: 5 }, () => React.createRef());

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [bigImageUrl, setBigImageUrl] = useState('');
  const [smallImageUrls, setSmallImageUrls] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    old_price: "",
    description: "",
    is_published: false,
    in_stock: false,
    imageCard: null,
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [imageEdit, setImageEdit] = useState(false);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("access");
    if (authToken) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${authToken}`,
          'Accept': 'application/json'
        }
      };
      axios.get(`/api/product/${productId}/`, config)
        .then(response => {
          const productData = response.data;
          setProduct(productData);
          setFormData({
            title: productData.title,
            price: productData.price,
            old_price: productData.old_price,
            description: productData.description,
            is_published: productData.is_published,
            in_stock: productData.in_stock,
            imageCard: productData.imageCard,
            image1: productData.image1,
            image2: productData.image2,
            image3: productData.image3,
            image4: productData.image4,
          });
          setBigImageUrl(productData.imageCard);
          setSmallImageUrls([productData.image1, productData.image2, productData.image3, productData.image4]);
        })
        .catch(error => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [productId]);

  const handleThumbnailClick = (thumbnail, index) => {
    if (!imageEdit) {
      setBigImageUrl(thumbnail);
    }
    setSelectedThumbnailIndex(index);
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleSaveChanges = () => {
    if (!formData.title || !formData.price || !formData.old_price || !formData.description) {
      alert("Please fill in all required fields.");
      return;
    }

    const authToken = localStorage.getItem("access");
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("old_price", formData.old_price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("is_published", formData.is_published);
    formDataToSend.append("in_stock", formData.in_stock);

    if (formData.imageCard instanceof File) formDataToSend.append("imageCard", formData.imageCard);
    if (formData.image1 instanceof File) formDataToSend.append("image1", formData.image1);
    if (formData.image2 instanceof File) formDataToSend.append("image2", formData.image2);
    if (formData.image3 instanceof File) formDataToSend.append("image3", formData.image3);
    if (formData.image4 instanceof File) formDataToSend.append("image4", formData.image4);

    axios.put(`/api/update-product/${productId}/`, formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${authToken}`,
      },
    })
      .then(response => {
        console.log("Product updated successfully:", response.data);
        setEditMode(false);
        const vendorId = localStorage.getItem("idVendor");
        navigate(`/seller-dashboard/${vendorId}`);
      })
      .catch(error => {
        console.error("Error updating product:", error);
      });
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (index === 0) {
          setBigImageUrl(result);
        } else {
          setSmallImageUrls(prevState => prevState.map((thumbnail, idx) => idx === index - 1 ? result : thumbnail));
        }
      };
      reader.readAsDataURL(file);

      setFormData({
        ...formData,
        [`image${index === 0 ? "Card" : index}`]: file,
      });
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "In Stock" ? true : value === "Publish" ? true : false,
    });
  };

  const handleImageEditClick = (index) => {
    setImageEdit(!imageEdit);
    setSelectedThumbnailIndex(index);
    if (!imageEdit) {
      inputFileRefs[index].current.click();
    }
  };

  const handleDeleteProduct = () => {
    const authToken = localStorage.getItem("access");
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${authToken}`,
        'Accept': 'application/json'
      }
    };
    console.log('delete prod');
    console.log(productId);

    axios.delete(`/api/delete-product/${productId}/`, config)
      .then(response => {
        console.log("Product deleted successfully");
        const vendorId = localStorage.getItem("idVendor");
        navigate(`/seller-dashboard/${vendorId}`);
      })
      .catch(error => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div className="productdetails">
<div className="flex justify-center items-start p-5" style={{ marginTop: '40px' }}>
        <div className="productdetails-container bg-white custom-shadow rounded-md p-8 flex w-full">
          <div className="productdetails-left w-1/2 pr-8 border-blue">
            <div className="relative">
              <img src={bigImageUrl} alt={"Product big image"} className="productdetails-big-image w-full h-auto mb-4 max-w-md max-h-64 ml-2 border-2 border-blue rounded-md" />
              {editMode && (
                <div className="absolute top-2 right-2 flex justify-between items-center bg-black bg-opacity-50 p-2 rounded" style={{ zIndex: 2 }}>
                  <button className="text-white mx-2" onClick={() => handleImageEditClick(0)}>
                    <i className="bi bi-pencil"></i>
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              {smallImageUrls.map((thumbnail, index) => (
                <div key={index} className="relative h-full">
                  <img src={thumbnail} alt={"Product thumbnail"} className="productdetails-small-image w-24 h-24 mb-4 border-2 border-blue cursor-pointer" onClick={() => handleThumbnailClick(thumbnail, index)} />
                  {editMode && (
                    <div className="absolute top-0 right-0 flex justify-between items-center bg-black bg-opacity-0 transition-opacity duration-300 hover:bg-opacity-25">
                      <button className="text-white mx-2" onClick={() => handleImageEditClick(index + 1)}>
                        <i className="bi bi-pencil"></i>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="productdetails-right w-1/2 pl-8 relative">
            {product ? (
              editMode ? (
                <div className="mb-4">
                  <input type="text" className="border border-gray-300 rounded p-2 mb-2 w-full" name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                  <div className="flex items-center mb-2">
                    <p className="mr-2">$</p>
                    <input type="number" className="border border-gray-300 rounded p-2 w-full" name="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                  </div>
                  <div className="flex items-center mb-2">
                    <p className="mr-2">$</p>
                    <input type="number" className="border border-gray-300 rounded p-2 w-full" name="old_price" value={formData.old_price} onChange={(e) => setFormData({ ...formData, old_price: e.target.value })} required />
                  </div>
                  <textarea className="border border-gray-300 rounded p-2 w-full mb-2" rows="4" name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required></textarea>
                  <div className="flex space-x-2 mb-2">
                    <select className="border border-gray-300 rounded p-2 w-full" name="in_stock" value={formData.in_stock ? "In Stock" : "Out of Stock"} onChange={handleSelectChange} required>
                      <option value="">Select Availability</option>
                      <option value="In Stock">In Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                    <select className="border border-gray-300 rounded p-2 w-full" name="is_published" value={formData.is_published ? "Publish" : "Draft"} onChange={handleSelectChange} required>
                      <option value="">Select Publishing</option>
                      <option value="Draft">Draft</option>
                      <option value="Publish">Publish</option>
                    </select>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="productdetails-title text-3xl font-bold mb-2">{formData.title}</h1>
                  <div className="flex items-center mb-2">
                    <p className="productdetails-price text-lg mr-2">${formData.price}</p>
                    <del className="text-gray-500">${formData.old_price}</del>
                  </div>
                  <p className="productdetails-description mb-4">{formData.description}</p>
                  <p className={`productdetails-availability mb-4 ${formData.in_stock ? 'text-green-500' : 'text-red-500'}`}>{formData.in_stock ? "In Stock" : "Out of Stock"}</p>
                </>
              )
            ) : (
              <p>Loading...</p>
            )}
            <div className="productdetails-right w-full mt-30 pl-8 relative flex items-center justify-between">
              <button className="flex items-center justify-center rounded-md bg-blue-900 px-20 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={editMode ? handleSaveChanges : handleEditClick}>
                <i className={`bi ${editMode ? 'bi-check' : 'bi-pencil'} mr-1`}></i>
                <span className="whitespace-nowrap">{editMode ? 'Save Changes' : 'Edit Product'}</span>
              </button>
              <button className="flex items-center justify-center rounded-md ml-4 bg-red-600 px-6 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300" onClick={() => setShowDeleteDialog(true)}>
                <i className="bi bi-trash mr-1"></i>
                <span className="whitespace-nowrap">Delete Product</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {inputFileRefs.map((inputRef, index) => (
        <input
          key={index}
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={(e) => handleFileChange(e, index)}
        />
      ))}
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

export default EditProduct;
