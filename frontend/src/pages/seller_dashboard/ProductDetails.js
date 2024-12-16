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

const ProductDetailsVen = () => {
  const [product, setProduct] = useState(null);
  const [vendor, setVendor] = useState(null);
  const { productId } = useParams();

  //  console.log(productId);

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
          setProduct(response.data);
          console.log(response.data);

          // fetch for vendor 
          axios.get(`/api/vendor/${response.data.vendor}/vendor/`, config)
        .then(response => {
          setVendor(response.data);
          // console.log(response.data);
        })
        .catch(error => {
          console.error("Error fetching vendor:", error);
        });
        })
        .catch(error => {
          console.error("Error fetching product:", error);
        });
    }
  }, [productId]);

  // console.log(product);
  // console.log(vendor);

  // --------------------------------------------------------------------
  const [bigImageUrl, setBigImageUrl] = useState(bigImage);
  const [smallImageUrls, setSmallImageUrls] = useState([smallImage1, smallImage2, smallImage3, smallImage1]);

  const productRating = 4; // Replace this with the actual rating of the product
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [favoriteList , setFavoriteList] = useState();

  const [userReview, setUserReview] = useState({ rating: 0, comment: "" });
  const [showAllReviews, setShowAllReviews] = useState(false);




 // Check if the product is in the favorite list
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
    const IDclient = parseInt(localStorage.getItem("idClient"));
    console.log(IDclient);
    console.log(productId);

    axios.get(`/api/favorite/${IDclient}/`, config)
      .then(response => {
        setFavoriteList(response.data);
        console.log("favorite list: ",response.data);

        // Ensure productId is a number before comparison
        const numericProductId = parseInt(productId, 10);
        const productInFavorites = response.data.some(item => item.product === numericProductId);
        console.log("productinfavorites: ",productInFavorites);
        console.log("productId",productId);
        if (productInFavorites) {
          setIsHeartFilled(true);
        } else {
          setIsHeartFilled(false);
        }
      })
      .catch(error => {
        console.error("Error fetching favorite list:", error);
      });
  }
}, [productId]);


  const toggleAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };


  const handleThumbnailClick = (thumbnail) => {
    const tempBigImage = bigImageUrl;
    setBigImageUrl(thumbnail);
    const updatedSmallImages = smallImageUrls.map(url => url === thumbnail ? tempBigImage : url);
    setSmallImageUrls(updatedSmallImages);
  };



  return (
    <div className="productdetails" style={{ marginTop: '40px' }}>
      <h1 className=" text-left ml-6 text-3xl font-bold font-serif">PRODUCT DETAIL </h1>
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
      <Footer />
    </div>
  );
};

export default ProductDetailsVen;







// --------------------------------------------------------------------------------------------

// ProductView.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";


// const ProductView = () => {
//   const [product, setProduct] = useState(null);
//   const { productId } = useParams();

//   // console.log(productId);

//   useEffect(() => {
//     const authToken = localStorage.getItem("access");
//     if (authToken) {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `JWT ${authToken}`,
//           'Accept': 'application/json'
//         }
//       };

//       // console.log(productId);

//       // Fetch product details from backend using product id
//       axios.get(`/api/product/${productId}/`, config)
//         .then(response => {
//           setProduct(response.data);
//         })
//         .catch(error => {
//           console.error("Error fetching product:", error);
//         });
//     }
//   }, [productId]);

//   return (
//     <div className="container">
//       {product ? (
//         <div className="row">
//           <div className="col-md-6">
//             <img src={product.image} alt={product.title} />
//           </div>
//           <div className="col-md-6">
//             <h2>{product.title}</h2>
//             <p>{product.description}</p>
//             <p>Price: ${product.price}</p>
//             <button>report product</button>
//             {/* Add more details here if needed */}
//             <Link to={`/order/${productId}`} >Oder</Link>
//           </div>
//         </div>
//       ) : (
//         <>
//         <h1>this is a product page</h1>
//         </>
//       )}
//     </div>
//   );
// };

// export default ProductView;
