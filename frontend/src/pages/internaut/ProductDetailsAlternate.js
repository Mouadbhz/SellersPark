// ProductDetails.js

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import bigImage from '../../assets/images/products/imprimante1.png';
import smallImage1 from '../../assets/images/products/imprimante2.png';
import smallImage2 from '../../assets/images/products/encre1.png';
import smallImage3 from '../../assets/images/products/encre1.png';
import Footer from "../../components/footer/footer";
import avatar from '../../pages/images/avatar1.png';
import './productdetails.css';

const ProductDetailsAlternate = () => {
  const [product, setProduct] = useState(null);
  const [vendor, setVendor] = useState(null);
  const { productId } = useParams();

  const [errorMessage, setErrorMessage] = useState('');

  //  console.log(productId);

  useEffect(() => {
    axios.get(`/api/product/${productId}/`)
      .then(response => {
        setProduct(response.data);
        setBigImageUrl(response.data.imageCard);
        setSmallImageUrls([response.data.image1, response.data.image2, response.data.image3, response.data.image4]);
        console.log(response.data);
        axios.get(`/api/vendor/${response.data.vendor}/vendor/`)
          .then(response => {
            setVendor(response.data);
          })
          .catch(error => {
            console.error("Error fetching vendor:", error);
          });
      })
      .catch(error => {
        console.error("Error fetching product:", error);
      });
  }, [productId]);
  

  console.log("productId",productId);

  console.log(product);
  console.log(vendor);

  // --------------------------------------------------------------------
  const [bigImageUrl, setBigImageUrl] = useState('');
  const [smallImageUrls, setSmallImageUrls] = useState([]);
  
  const [showSellerInfo, setShowSellerInfo] = useState(false);

  const productRating = 4; // Replace this with the actual rating of the product
  const popoverRef = useRef(null);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [favoriteList , setFavoriteList] = useState();

  const [userReview, setUserReview] = useState({ rating: 0, comment: "" });
  const [showAllReviews, setShowAllReviews] = useState(false);


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

 // Check if the product is in the favorite list
//  useEffect(() => {
//   const authToken = localStorage.getItem("access");
//   if (authToken) {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `JWT ${authToken}`,
//         'Accept': 'application/json'
//       }
//     };
//     const IDclient = parseInt(localStorage.getItem("idClient"));
//     console.log(IDclient);
//     console.log(productId);

//     axios.get(`/api/favorite/${IDclient}/`, config)
//       .then(response => {
//         setFavoriteList(response.data);
//         console.log("favorite list: ",response.data);

//         // Ensure productId is a number before comparison
//         const numericProductId = parseInt(productId, 10);
//         const productInFavorites = response.data.some(item => item.product === numericProductId);
//         console.log("productinfavorites: ",productInFavorites);
//         console.log("productId",productId);
//         if (productInFavorites) {
//           setIsHeartFilled(true);
//         } else {
//           setIsHeartFilled(false);
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching favorite list:", error);
//       });
//   }
// }, [productId]);


// Load favorites from session storage


 useEffect(() => {
  const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
  setFavoriteList(favorites);
  const isFavorite = favorites.some(item => item.id === productId);
  setIsHeartFilled(isFavorite);
}, [productId]);

const addToFavorite = () => {
  const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
  const isFavorite = favorites.some(item => item.id === productId);

  if (isFavorite) {
    // Remove from favorites
    const updatedFavorites = favorites.filter(item => item.id !== productId);
    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavoriteList(updatedFavorites);
    setIsHeartFilled(false);
  } else {
    // Add to favorites
    const newFavorite = { id: productId, title: product.title, image: product.imageCard, price: product.price };
    const updatedFavorites = [...favorites, newFavorite];
    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavoriteList(updatedFavorites);
    setIsHeartFilled(true);
  }
};

    // add to favorite and wishlist 
  const addToWishlist = () => {
   console.log("add to wishlist");
  };

  // reviews 
  const handleRatingChange = (rating) => {
    setUserReview({ ...userReview, rating });
  };

  const handleCommentChange = (event) => {
    setUserReview({ ...userReview, comment: event.target.value });
  };

  const handleSubmitReview = () => {
    console.log("Submitting review:", userReview);
    setUserReview({ rating: 0, comment: "" });
  };

  const toggleAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };


  const handleThumbnailClick = (thumbnail) => {
    const tempBigImage = bigImageUrl;
    setBigImageUrl(thumbnail);
    const updatedSmallImages = smallImageUrls.map(url => url === thumbnail ? tempBigImage : url);
    setSmallImageUrls(updatedSmallImages);
  };



  const handleSellerClick = () => {
    setShowSellerInfo(!showSellerInfo);
  };

  return (
    <div className="productdetails">
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
      <h1 className="mt-28 text-left ml-6 text-3xl font-bold font-serif">PRODUCT DETAIL </h1>
      <div className="flex justify-center items-start  p-5">
      {product ? (
        <div className="productdetails-container bg-white custom-shadow rounded-md p-8 flex w-full">
          <div className="productdetails-left w-1/2 pr-8 border-blue">
            <img src={bigImageUrl} alt={"Product big image"} className="productdetails-big-image w-full h-auto mb-4 max-w-md max-h-64 ml-2 border-2 border-blue rounded-md" />
            <div className="flex justify-between">
              {smallImageUrls.map((thumbnail, index) => (
                <img key={index} src={thumbnail} alt={"Product thumbnail"} className="productdetails-small-image w-24 h-auto mb-4 border-2 border-blue cursor-pointer" onClick={() => handleThumbnailClick(thumbnail)} />
              ))}
            </div>
          </div>
          <div className="productdetails-right w-1/2 pl-8 relative">  
                <h1 className="productdetails-title text-3xl font-bold mb-2">{product.title}</h1>
                {/* Other product details using product */}
            <div className="flex items-center mb-2">
              <p className="productdetails-price text-lg mr-2">{product.price}</p>
              <del className="text-gray-500">{product.old_price}</del>
            </div>
            <p className="productdetails-description mb-4">{product.description}</p>
            {/* Render product rating with stars */}
            <div className="flex items-center mb-2">
              <p className="mr-2">Rating:</p>
              <div className="flex">
                {[...Array(productRating)].map((_, index) => (
                  <i key={index} className="bi bi-star-fill text-yellow-500"></i>
                ))}
              </div>
            </div>
            {/* Render availability based on boolean value */}
            <p className={`productdetails-availability mb-4 ${product.in_stock ? 'text-green-500' : 'text-red-500'}`}>
              {product.in_stock ? 'In Stock' : 'Out of Stock'}
            </p>
            <div className="flex items-center mb-4">
              <p className="mr-2">Selling by:</p>
              <div className="relative flex items-center">
              {vendor && vendor.image ? (
                    <>
                <img src={vendor.image} alt="Seller avatar" className="w-10 h-10 rounded-full cursor-pointer" onClick={handleSellerClick} />
                <span className="ml-2">{`${vendor.first_name} ${vendor.last_name}`}</span>
                {showSellerInfo && ( 
                  <div ref={popoverRef} className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-white p-6 shadow-lg rounded-lg" style={{ maxWidth: "500px", width: "80%" }}>
                    <button className="absolute top-0 right-0 p-2" onClick={handleCloseClick}>
                      <i className="bi bi-x"></i>
                    </button>
                    <div className="flex items-center mb-4">
                      <img src={vendor.image} alt="Seller avatar" className="w-20 h-20 rounded-full mr-4" />
                      <div>
                        <h3 className="text-lg font-semibold">{`${vendor.first_name} ${vendor.last_name}`}</h3>
                        <p className="text-sm text-gray-600">{vendor.description}</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Link href="/login" className="text-blue-500">See all products of this seller</Link>
                      {/* Use Link for navigating to report seller page */}
                      {/* <Link to="/login" className="flex items-center text-blue-500">
                        <i className="bi bi-info-circle"></i>
                        <span className="ml-1">Report Seller</span>
                      </Link> */}
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
            <Link to={`/payment/order/${productId}`} className="flex items-center justify-center rounded-md bg-blue-900 px-24 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <i className="bi bi-cart mr-1"></i>
              <span className="whitespace-nowrap">Buy Now</span>
            </Link>

              <i className="bi bi-cart-plus text-blue-900 ml-3 cursor-pointer" style={{ fontSize: '24px' }} onClick={addToWishlist}></i>
        
            <i
              className={`far fa-heart text-red-500 cursor-pointer ${isHeartFilled ? 'fas' : ''}`}
              style={{ fontSize: '24px' }}
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
        <h2 className="productdetails-reviews-title text-2xl font-bold mb-2">Reviews</h2>

        <div className="productdetails-reviews">
          <div className="review flex items-center mb-2">
            <img src={avatar} alt="Reviewer" className="reviewer-image w-12 h-12 rounded-full border border-black mr-4" />
            <div>
              <h3 className="reviewer-name font-semibold">John Doe</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={`bi bi-star-fill ${index < 4 ? 'text-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="review-comment ml-2">This product is amazing!</p>
              </div>
            </div>
          </div>
          <div className="review flex items-center mb-2">
            <img src={avatar} alt="Reviewer" className="reviewer-image w-12 h-12 rounded-full border border-black mr-4" />
            <div>
              <h3 className="reviewer-name font-semibold">Jane Doe</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={`bi bi-star-fill ${index < 5 ? 'text-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="review-comment ml-2">Great quality, highly recommend!</p>
              </div>
            </div>
          </div>
        </div>
        {!showAllReviews && (
          <p className="productdetails-see-all-reviews-link text-blue-500 cursor-pointer" onClick={toggleAllReviews}>See All Reviews</p>
        )}
        {showAllReviews && (
          <>
            <div className="review flex items-center mb-2">
              <img src={avatar} alt="Reviewer" className="reviewer-image w-12 h-12 rounded-full border border-black mr-4" />
              <div>
                <h3 className="reviewer-name font-semibold">Alice Smith</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <i
                        key={index}
                        className={`bi bi-star-fill ${index < 5 ? 'text-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="review-comment ml-2">Good product, fast shipping!</p>
                </div>
              </div>
            </div>
            <div className="review flex items-center mb-2">
              <img src={avatar} alt="Reviewer" className="reviewer-image w-12 h-12 rounded-full border border-black mr-4" />
              <div>
                <h3 className="reviewer-name font-semibold">Bob Johnson</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <i
                        key={index}
                        className={`bi bi-star-fill ${index < 4 ? 'text-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="review-comment ml-2">Could be better, but overall satisfied.</p>
                </div>
              </div>
            </div>
            <p className="productdetails-hide-all-reviews-link text-blue-500 cursor-pointer" onClick={toggleAllReviews}>Hide All Reviews</p>
          </>
        )}
      </div> 
      {/* YOU MAY LIKE Section */}
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

export default ProductDetailsAlternate;



