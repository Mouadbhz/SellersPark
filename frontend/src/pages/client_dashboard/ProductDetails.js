// ProductDetails.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/footer";
import avatar from "../../pages/images/avatar1.png";
import "./productdetails.css";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [vendor, setVendor] = useState(null);
  const { productId } = useParams();

  const [errorMessage, setErrorMessage] = useState("");

  //  console.log(productId);

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

      axios
        .get(`/api/product/${productId}/`, config)
        .then((response) => {
          setProduct(response.data);
          console.log(response.data);

          // fetch for vendor
          axios
            .get(`/api/vendor/${response.data.vendor}/vendor/`, config)
            .then((response) => {
              setVendor(response.data);
              // console.log(response.data);
            })
            .catch((error) => {
              console.error("Error fetching vendor:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, [productId]);

  // console.log(product);
  // console.log(vendor);

  // --------------------------------------------------------------------
  const [bigImageUrl, setBigImageUrl] = useState("");
  const [smallImageUrls, setSmallImageUrls] = useState([]);
  const [smallImage1, setSmallImage1] = useState("");
  const [smallImage2, setSmallImage2] = useState("");
  const [smallImage3, setSmallImage3] = useState("");
  const [smallImage4, setSmallImage4] = useState("");

  useEffect(() => {
    if (product) {
      setBigImageUrl(product.imageCard);
      setSmallImageUrls([
        product.image1,
        product.image2,
        product.image3,
        product.image4,
      ]);
      setSmallImage1(product.image1);
      setSmallImage2(product.image2);
      setSmallImage3(product.image3);
      setSmallImage4(product.image4);
    }
  }, [product]);

  const [showSellerInfo, setShowSellerInfo] = useState(false);

  const productRating = 4; // Replace this with the actual rating of the product
  const popoverRef = useRef(null);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [favoriteList, setFavoriteList] = useState();

  const [userReview, setUserReview] = useState({ rating: 0, comment: "" });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowSellerInfo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCloseClick = () => {
    setShowSellerInfo(false);
  };

  const [client, setClient] = useState();
  // Check if the product is in the favorite list
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
      const IDclient = parseInt(localStorage.getItem("idClient"));
      console.log(IDclient);
      console.log(productId);

      axios
        .get(`/api/favorite/${IDclient}/`, config)
        .then((response) => {
          setFavoriteList(response.data);
          console.log("favorite list: ", response.data);

          // Ensure productId is a number before comparison
          const numericProductId = parseInt(productId, 10);
          const productInFavorites = response.data.some(
            (item) => item.product === numericProductId
          );
          console.log("productinfavorites: ", productInFavorites);
          console.log("productId", productId);
          if (productInFavorites) {
            setIsHeartFilled(true);
          } else {
            setIsHeartFilled(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching favorite list:", error);
        });

      const idClient = parseInt(localStorage.getItem("idClient"));

      axios
        .get(`/api/client/${idClient}/client/`, config)
        .then((response) => {
          setClient(response.data);
          // Optionally, you can update the UI to reflect the new review
        })
        .catch((error) => {
          console.error("Error fetch client data:", error);
        });
    }
  }, [productId]);

  const addToFavorite = () => {
    console.log("Before toggle:", isHeartFilled);

    const authToken = localStorage.getItem("access");
    if (authToken) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authToken}`,
          Accept: "application/json",
        },
      };
      const IDclient = parseInt(localStorage.getItem("idClient"));
      console.log(IDclient);
      console.log(productId);

      if (!isHeartFilled) {
        axios
          .post(`/api/favorite/add/${IDclient}/${productId}/`, {}, config)
          .then((response) => {
            console.log(
              "Added product to favorite successfully: ",
              response.data
            );
            setIsHeartFilled(true); // Update state after successful API request
          })
          .catch((error) => {
            console.error("Error adding product to favorite:", error);
          });
      } else {
        // Make delete request to backend
        axios
          .delete(`/api/favorite/delete/${IDclient}/${productId}/`, config)
          .then((response) => {
            console.log(
              "Removed product from favorite successfully: ",
              response.data
            );
            setIsHeartFilled(false); // Update state after successful API request
          })
          .catch((error) => {
            console.error("Error removing product from favorite:", error);
          });

        console.log(isHeartFilled);
      }
    }
  };

  // add to favorite and wishlist
  const addToWishlist = () => {
    const authToken = localStorage.getItem("access");
    if (authToken) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authToken}`,
          Accept: "application/json",
        },
      };
      const IDclient = parseInt(localStorage.getItem("idClient"));
      console.log(IDclient);
      console.log(productId);

      axios
        .post(`/api/wishlist/add/${IDclient}/${productId}/`, {}, config)
        .then((response) => {
          console.log("Add product to wishlist successfully: ", response.data);
        })
        .catch((error) => {
          console.error("Error to Add product to wishlist:", error);
          if (
            error.response &&
            error.response.data.message ===
              "Product already exists in the wishlist"
          ) {
            setErrorMessage("Product already exists in the wishlist");
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
          }
        });
    }
  };

  // reviews
  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleCommentChange = (event) => {
    setReview(event.target.value);
  };

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmitReview = () => {
    const authToken = localStorage.getItem("access");
    if (authToken) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authToken}`,
          Accept: "application/json",
        },
      };
      const client_id = parseInt(localStorage.getItem("idClient"));
      console.log(client_id);
      console.log(productId);

      const reviewData = {
        client_id,
        product_id: productId,
        review,
        rating,
      };

      const body = JSON.stringify(reviewData);
      console.log(body);

      axios
        .post("/api/send-review/", body, config)
        .then((response) => {
          console.log("Review submitted successfully:", response.data);
          // Optionally, you can update the UI to reflect the new review
        })
        .catch((error) => {
          console.error("Error submitting review:", error);
        });
    }
  };


  const handleThumbnailClick = (thumbnail) => {
    const tempBigImage = bigImageUrl;
    setBigImageUrl(thumbnail);
    const updatedSmallImages = smallImageUrls.map((url) =>
      url === thumbnail ? tempBigImage : url
    );
    setSmallImageUrls(updatedSmallImages);
  };

  const handleSellerClick = () => {
    setShowSellerInfo(!showSellerInfo);
  };

  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const authToken = localStorage.getItem("access");
    const config = {
      headers: {
        'Authorization': `JWT ${authToken}`,
        'Accept': 'application/json'
      }
    };
  
    try {
      const response = await axios.get(`/api/reviews/${productId}/`, config);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };
  

  const toggleAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const fetchClient = async (clientId) => {
    try {
      const authToken = localStorage.getItem("access");
      const config = {
        headers: {
          'Authorization': `JWT ${authToken}`,
          'Accept': 'application/json'
        }
      };
  
      const response = await axios.get(`http://localhost:8000/api/client/${clientId}`, config);
      const clientData = response.data;
      // Update state or handle client data as needed
    } catch (error) {
      console.error('Error fetching client:', error);
    }
  };
  

  return (
    <div className="productdetails" style={{
      marginTop:'40px'
    }}>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <h1 className=" text-left ml-6 text-3xl font-bold font-serif">
        PRODUCT DETAIL{" "}
      </h1>
      <div className="flex justify-center items-start  p-5">
        {product ? (
          <div className="productdetails-container bg-white custom-shadow rounded-md p-8 flex w-full">
            <div className="productdetails-left w-1/2 pr-8 border-blue">
              <img
                src={bigImageUrl}
                alt={"Product big image"}
                className="productdetails-big-image w-full h-auto mb-4 max-w-md max-h-64 ml-2 border-2 border-blue rounded-md"
              />
              <div className="flex justify-between">
                {smallImageUrls.map((thumbnail, index) => (
                  <img
                    key={index}
                    src={thumbnail}
                    alt={"Product thumbnail"}
                    className="productdetails-small-image w-24 h-auto mb-4 border-2 border-blue cursor-pointer"
                    onClick={() => handleThumbnailClick(thumbnail)}
                  />
                ))}
              </div>
            </div>
            <div className="productdetails-right w-1/2 pl-8 relative">
              <h1 className="productdetails-title text-3xl font-bold mb-2">
                {product.title}
              </h1>
              {/* Other product details using product */}
              <div className="flex items-center mb-2">
                <p className="productdetails-price text-lg mr-2">
                  {product.price}
                </p>
                <del className="text-gray-500">{product.old_price}</del>
              </div>
              <p className="productdetails-description mb-4">
                {product.description}
              </p>
              {/* Render availability based on boolean value */}
              <p
                className={`productdetails-availability mb-4 ${
                  product.in_stock ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.in_stock ? "In Stock" : "Out of Stock"}
              </p>
              <div className="flex items-center mb-4">
                <p className="mr-2">Selling by:</p>
                <div className="relative flex items-center">
                  {vendor && vendor.image ? (
                    <>
                      <img
                        src={vendor.image}
                        alt="Seller avatar"
                        className="w-10 h-10 rounded-full cursor-pointer"
                        onClick={handleSellerClick}
                      />
                      <span className="ml-2">{`${vendor.first_name} ${vendor.last_name}`}</span>
                      {showSellerInfo && (
                        <div
                          ref={popoverRef}
                          className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-white p-6 shadow-lg rounded-lg"
                          style={{ maxWidth: "500px", width: "80%" }}
                        >
                          <button
                            className="absolute top-0 right-0 p-2"
                            onClick={handleCloseClick}
                          >
                            <i className="bi bi-x"></i>
                          </button>
                          <div className="flex items-center mb-4">
                            <img
                              src={vendor.image}
                              alt="Seller avatar"
                              className="w-20 h-20 rounded-full mr-4"
                            />
                            <div>
                              <h3 className="text-lg font-semibold">{`${vendor.first_name} ${vendor.last_name}`}</h3>
                              <p className="text-sm text-gray-600">
                                {vendor.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            {/* Use Link for navigating to report seller page */}
                            <Link
                              to={`/report-seller/${vendor.id}`}
                              className="flex items-center text-blue-500"
                            >
                              <i className="bi bi-info-circle"></i>
                              <span className="ml-1">Report Seller</span>
                            </Link>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <span>Loading vendor information...</span>
                  )}
                </div>
              </div>
              <div className="productdetails-right w-full mt-20 pl-8 relative flex items-center justify-between">
                <Link
                  to={`/payment/order/${productId}`}
                  className="flex items-center justify-center rounded-md bg-blue-900 px-24 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <i className="bi bi-cart mr-1"></i>
                  <span className="whitespace-nowrap">Buy Now</span>
                </Link>

                <i
                  className="bi bi-cart-plus text-blue-900 ml-3 cursor-pointer"
                  style={{ fontSize: "24px" }}
                  onClick={addToWishlist}
                ></i>

                <i
                  className={`far fa-heart text-red-500 cursor-pointer ${
                    isHeartFilled ? "fas" : ""
                  }`}
                  style={{ fontSize: "24px" }}
                  onClick={addToFavorite}
                ></i>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {/* reviews */}
      <div className="productdetails-reviews-container mt-4 bg-white shadow-lg rounded-md p-8 ml-5 mr-5">
      <h2 className="productdetails-reviews-title text-2xl font-bold mb-2">
        Reviews
      </h2>
      {/* Review Submission Form */}
      <div className="review-input flex flex-col items-start mb-4">
        <div className="flex items-center mb-2">
        {client && client.image ? (
      <img
        src={client.image}
        alt="Your avatar"
        className="reviewer-avatar w-12 h-12 rounded-full border border-black mr-4"
      />
    ) : (
      <img
            src={avatar}
            alt="Your avatar"
            className="reviewer-avatar w-12 h-12 rounded-full border border-black mr-4"
          />
    )}
          <div className="flex items-center">
            <p>Your rating :</p>
            {[...Array(5)].map((_, index) => (
              <i
                key={index}
                className={`bi bi-star-fill cursor-pointer ml-2 ${
                  index < rating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => handleRatingChange(index + 1)}
              />
            ))}
          </div>
        </div>
        <div className="flex w-full justify-between items-center">
          <textarea
            className="review-input-field flex-grow p-2 border border-gray-300 rounded"
            placeholder="Write your review..."
            onChange={handleCommentChange}
          />
          <button
            className="review-submit-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={handleSubmitReview}
          >
            Submit
          </button>
        </div>
      </div>
      {/* Render Reviews */}
      {reviews.slice(0, showAllReviews ? reviews.length : 2).map((review) => (
        <div className="review flex items-center mb-2" key={review.id}>
        {/* Reviewer Avatar */}
        <img
          src={avatar} // Replace with the actual avatar URL
          alt="Reviewer"
          className="reviewer-image w-12 h-12 rounded-full border border-black mr-4"
        />
        {/* Review Content */}
        <div>
          {/* Reviewer Name */}
          <h3 className="reviewer-name font-semibold">User</h3> {/* Replace with actual reviewer name */}
          <div className="flex items-center">
            {/* Star Rating */}
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <i
                  key={index}
                  className={`bi bi-star-fill ${
                    index < review.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            {/* Review Text */}
            <p className="review-comment ml-2">{review.review}</p>
          </div>
        </div>
      </div>
      ))}
      {/* Toggle Show/Hide All Reviews */}
      {!showAllReviews && (
        <p
          className="productdetails-see-all-reviews-link text-blue-500 cursor-pointer"
          onClick={toggleAllReviews}
        >
          See All Reviews
        </p>
      )}
      {/* Show All Reviews */}
      {showAllReviews && (
        <>
          {reviews.slice(2).map((review) => (
            <div className="review flex items-center mb-2" key={review.id}>
              {/* Review Content */}
              {/* Display reviewer avatar, name, rating, and comment */}
            </div>
          ))}
          {/* Hide All Reviews */}
          <p
            className="productdetails-hide-all-reviews-link text-blue-500 cursor-pointer"
            onClick={toggleAllReviews}
          >
            Hide All Reviews
          </p>
        </>
      )}
    </div>
      {/* YOU MAY LIKE Section */}
      {/* <h2>{product.category}</h2> */}
      {/* <div className="youmaylike mt-10 ml-10">
        <h2 className="youmaylike-title text-3xl font-bold mb-4">YOU MAY LIKE</h2>
        <div className="youmaylike-products flex justify-between">
          {products.map(product => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      </div>  */}

      <Footer />
    </div>
  );
};

export default ProductDetails;
