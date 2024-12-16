import React, { useState, useRef, useEffect } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";
import "./addproduct.css";
import Footer from "../../components/footer/footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const inputFileRefs = Array.from({ length: 5 }, () => React.createRef());

const AddProduct = () => {
  const vendorID = parseInt(localStorage.getItem("idVendor"));
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    old_price: "",
    imageCard: null,
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    is_published: false,
    in_stock: false,
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false); // State for duplicate dialog

  useEffect(() => {
    const authToken = localStorage.getItem("access");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${authToken}`,
        Accept: "application/json",
      },
    };

    axios
      .get("/api/categories/", config)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        [`image${index === 0 ? "Card" : index}`]: file,
      });
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === "in_stock") {
      setFormData({ ...formData, in_stock: value === "In Stock" });
    } else if (name === "is_published") {
      setFormData({ ...formData, is_published: value === "Publish" });
    } else if (name === "category") {
      setSelectedCategory(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var duplicate = false; // Initialize the duplicate variable as false
    const authToken = localStorage.getItem("access");
    const vendorId = localStorage.getItem("idVendor");

    const formDataToSend = new FormData();
    formDataToSend.append("vendor", vendorId);
    formDataToSend.append("category", selectedCategory);

    // Append form data to formDataToSend
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        formDataToSend.append(key, value);
      } else if (typeof value === "boolean" || typeof value === "number") {
        formDataToSend.append(key, value.toString());
      } else {
        formDataToSend.append(key, value);
      }
    });

    // Log each entry in the FormData object and check for duplicate title
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}: ${value}`);
      if (key === "title") {
        console.log("check title:", value);
        // Check for duplicate product title
        console.log(products);
        const duplicateProduct = products.find(
          (product) => product.title.toLowerCase() === value.toLowerCase()
        );
        if (duplicateProduct) {
          duplicate = true; // Set duplicate to true if a duplicate product title is found
          setShowDuplicateDialog(true);
          console.log("showDuplicateDialog: true");
          break; // Exit the loop early if a duplicate title is found
        }
      }
      // Check if any image is missing
      if (key.startsWith("image") && value === "null") {
        console.log(`${key} value is null`);
        alert("Please add all images.");
        return;
      }
    }

    // Check if any image is missing
    const missingImage = Array.from({ length: 5 }).some((_, index) => {
      const key = index === 0 ? "imageCard" : `image${index}`;
      return formData[key] instanceof File && !formData[key];
    });
    if (missingImage) {
      alert("Please add all images.");
      return;
    }

    // Display the value of duplicate
    console.log("duplicate var ", duplicate);

    // If no duplicate product title found, proceed with the axios post request
// If no duplicate product title found, proceed with the axios post request
if (!duplicate) {
  console.log("no duplicate product title found");
  axios
    .post("/api/create/product/", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${authToken}`,
      },
    })
    .then((response) => {
      console.log("Product added successfully:", response.data);
      setShowSuccessDialog(true); // Show success dialog on success
      // Navigate to seller dashboard after 2 seconds
      setTimeout(() => {
        navigate(`/seller-dashboard/${vendorId}`);
      }, 2000);
    })
    .catch((error) => {
      console.error("Error adding product:", error);
    });
}

  };

  return (
    <div className="add-product" style={{ marginTop: '40px' }}>
      <h1 className=" ml-6 text-left text-3xl font-bold font-serif">
        ADD PRODUCT
      </h1>
      <div className="flex justify-center items-start mt-4 p-5 bg-white">
        <form
          className="productdetails-container bg-white custom-shadow rounded-md p-8 flex w-full"
          onSubmit={handleSubmit}
        >
          <div className="productdetails-left w-1/2 pr-8 border-blue">
            <label htmlFor="mainImage" className="block font-medium">
              Card Image
            </label>
            <div className="border border-gray-300 rounded-md p-4 flex justify-center items-center relative">
              {!formData.imageCard ? (
                <label
                  htmlFor="mainImageInput"
                  className="w-64 h-64 flex flex-col justify-center items-center border border-gray-300 rounded-md cursor-pointer"
                >
                  <FaPlus className="text-gray-400 text-4xl mb-2" />
                  <span className="text-gray-400">Add Card Image</span>
                  <input
                    type="file"
                    id="mainImageInput"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 0)}
                    className="hidden"
                    ref={inputFileRefs[0]}
                  />
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(formData.imageCard)}
                    alt="Main Image"
                    className="w-64 h-64 object-cover"
                  />
                  <FaEdit
                    className="absolute top-0 right-0 text-gray-600 cursor-pointer"
                    onClick={() => inputFileRefs[0].current.click()}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 0)}
                    className="hidden"
                    ref={inputFileRefs[0]}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between mt-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="relative h-full">
                  {formData[`image${index + 1}`] ? (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(formData[`image${index + 1}`])}
                        alt={`Additional Image ${index + 1}`}
                        className="w-24 h-24 object-cover"
                      />
                      <FaEdit
                        className="absolute top-0 right-0 text-gray-600 cursor-pointer"
                        onClick={() => inputFileRefs[index + 1].current.click()}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, index + 1)}
                        className="hidden"
                        ref={inputFileRefs[index + 1]}
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor={`additionalImageInput${index}`}
                      className="w-24 h-24 flex flex-col justify-center items-center border border-gray-300 rounded-md cursor-pointer"
                    >
                      <FaPlus className="text-gray-400 text-xl mb-1" />
                      <span className="text-gray-400">Add Image</span>
                      <input
                        type="file"
                        id={`additionalImageInput${index}`}
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, index + 1)}
                        className="hidden"
                        ref={inputFileRefs[index + 1]}
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="productdetails-right w-1/2 pl-8 relative">
            <div className="mb-4">
              <label htmlFor="category" className="block font-medium mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="border border-gray-300 rounded p-2 mb-2 w-full"
                value={selectedCategory}
                onChange={handleSelectChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="border border-gray-300 rounded p-2 mb-2 w-full"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Product Name"
              />
              <div className="flex items-center mb-2">
                <p className="mr-2">$</p>
                <input
                  type="number"
                  step="0.01"
                  className="border border-gray-300 rounded p-2 w-full"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="Product Price"
                />
              </div>
              <div className="flex items-center mb-2">
                <p className="mr-2">$</p>
                <input
                  type="number"
                  step="0.01"
                  className="border border-gray-300 rounded p-2 w-full"
                  name="old_price"
                  value={formData.old_price}
                  onChange={handleChange}
                  placeholder="Old Price"
                />
              </div>
              <textarea
                className="border border-gray-300 rounded p-2 w-full mb-2"
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Product Description"
              ></textarea>
              <div className="flex space-x-2">
                <select
                  className="border border-gray-300 rounded p-2 mb-2 w-full"
                  name="in_stock"
                  value={formData.in_stock ? "In Stock" : "Out of Stock"}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">Select Availability</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
                <select
                  className="border border-gray-300 rounded p-2 mb-2 w-full"
                  name="is_published"
                  value={formData.is_published ? "Publish" : "Draft"}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">Select Publishing</option>
                  <option value="Draft">Draft</option>
                  <option value="Publish">Publish</option>
                </select>
              </div>
            </div>
            <div className="productdetails-right w-full mt-30 pl-8 relative flex items-center justify-between">
              <button
                type="submit"
                className="flex items-center justify-center rounded-md bg-blue-900 px-20 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <FaPlus className="mr-2" />
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      {showSuccessDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <p className="mb-4">Product added successfully!</p>
            <Link>
              <button
                onClick={() => setShowSuccessDialog(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                OK
              </button>
            </Link>
          </div>
        </div>
      )}
      {showDuplicateDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <p className="mb-4">Product added successfully!</p>
            <Link to={`/seller-dashboard/${localStorage.getItem("idVendor")}`}>
              <button
                onClick={() => setShowSuccessDialog(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                OK
              </button>
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AddProduct;
