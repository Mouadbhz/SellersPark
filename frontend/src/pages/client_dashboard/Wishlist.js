import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

import { emptyCart } from "../../assets/images/index";
import Footer from "../../components/footer/footer";
import { ImCross } from "react-icons/im";
import {
  deleteItem,
  decreaseQuantity,
  increaseQuantity,
  updateQuantity,
  resetCart,
} from "../../redux/cardSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0); // Initialize as 0
  const [shippingCharge, setShippingCharge] = useState(0); // Initialize as 0
  const [loading, setLoading] = useState(true);

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

      axios
        .get(`/api/wishlist/${IDClient}/`, config)
        .then((response) => {
          const validProducts = response.data.filter(item => item.product !== null);
          setProducts(validProducts);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching wishlist:", error);
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    const calculateTotal = async () => {
      let price = 0;
      for (const item of products) {
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
            const response = await axios.get(`/api/product/${item.product}/`, config);
            const product = response.data;
            price += parseFloat(product.price) * item.qty;
          } catch (error) {
            console.error(`Error fetching product details for product ${item.product}:`, error);
          }
        }
      }
      setTotalAmt(price.toFixed(2));
    };

    console.log("totalAmt",totalAmt);
  
    const intervalId = setInterval(calculateTotal, 500);
  
    return () => clearInterval(intervalId);
  }, [products]);
  
  const handleQuantityChange = (productId, newQuantity) => {
    // Update the quantity of the item in the products state
    const updatedProducts = products.map((wishlistItem) => {
      if (wishlistItem.product === productId) {
        return { ...wishlistItem, qty: newQuantity };
      }
      return wishlistItem;
    });
    setProducts(updatedProducts);
  
    // Recalculate the total amount based on the updated quantities
    let totalPrice = 0;
    updatedProducts.forEach((wishlistItem) => {
      if (wishlistItem.product !== null) {
        const productPrice = parseFloat(wishlistItem.price);
        totalPrice += productPrice * wishlistItem.qty;
      }
    });
    setTotalAmt(totalPrice.toFixed(2));
  };
  
  
  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else if (totalAmt > 401) {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  const handleDelete = (productId) => {
    console.log(productId);
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
        .delete(`/api/wishlist/delete/${IDClient}/${productId}/`, config)
        .then((response) => {
          console.log("Product deleted successfully:", response.data);
          // Fetch updated wishlist after deletion
          axios
            .get(`/api/wishlist/${IDClient}/`, config)
            .then((response) => {
              const validProducts = response.data.filter(item => item.product !== null);
              setProducts(validProducts);
            })
            .catch((error) => {
              console.error("Error fetching updated wishlist:", error);
            });
        })
        .catch((error) => {
          console.error("Error deleting product from wishlist:", error);
        });
    }
  };

  let totalToPass = (parseFloat(totalAmt) + parseFloat(shippingCharge)).toFixed(2);
  console.log(totalToPass);


  return (
    <>
      <div className=""style={{ marginTop: '40px' }}
      >
        <h1 className=" text-left text-3xl font-bold font-serif">
          YOUR WISH LIST
        </h1>
        <div className="flex justify-between items-center h-15 mt-5 bg-blue-200 text-primeColor px-6 py-4 text-lg font-titleFont font-semibold">
          <h2 className="flex-1 ml-10 ">Product</h2>
          <h2 className="flex-1 ml-80 mr-6">Quantity</h2>
          <h2 className="flex-1">Sub Total</h2>
        </div>

        <div className="mt-5">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {products.length > 0 ? (
                products.map((item) => (
                  <div key={item.id}>
                    <ItemCard item={item} onDelete={handleDelete}
                    onQuantityChange={(newQuantity) => handleQuantityChange(item.product, newQuantity)}
                    />
                  </div>
                ))
              ) : (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
                >
                  <div>
                    <img
                      className="w-80 rounded-lg p-4 mx-auto"
                      src={emptyCart}
                      alt="emptyCart"
                    />
                  </div>
                  <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
                    <h1 className="font-titleFont text-xl font-bold uppercase">
                      Your Cart feels lonely.
                    </h1>
                    <p className="text-sm text-center px-10 -mt-2">
                      Your Shopping cart lives to serve. Give it purpose - fill
                      it with books, electronics, videos, etc. and make it
                      happy.
                    </p>
                    <Link to="/shop">
                      <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="max-w-7xl gap-4 flex justify-end mt-4">
        <div className="w-96 flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-center ">Cart totals</h1>
          <div>
            <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
              Subtotal
              <span className="font-semibold tracking-wide font-titleFont">
                ${totalAmt}
              </span>
            </p>
            <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
              Shipping Charge
              <span className="font-semibold tracking-wide font-titleFont">
                ${shippingCharge}
              </span>
            </p>
            <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
              Total
              <span className="font-bold tracking-wide text-lg font-titleFont">
                $
                {(parseFloat(totalAmt) + parseFloat(shippingCharge)).toFixed(2)}
              </span> 
            </p>
          </div>
          <div className="flex justify-center">
            <Link to={`/payment/order/from-wishlist/${totalToPass}`}>
              <button
                className="w-52 h-10 bg-blue-500 text-white border-blue-500 border-2 rounded-md hover:bg-white hover:text-blue-500 hover:shadow-md duration-300"
              >
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const ItemCard = ({ item, onDelete, onQuantityChange }) => {
  const [product, setProduct] = useState(null); // Initialize with null
  const [quantity, setQuantity] = useState(item.qty);


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

  console.log("quantity",quantity);

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    console.log(newQuantity);

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
        .post(
          `/api/wishlist/add/${item.client}/${item.product}/`,
          { qty: newQuantity },
          config
        )
        .then((response) => {
          console.log('Wishlist updated', response.data);
        })
        .catch((error) => {
          console.error('Error updating wishlist:', error);
        });
    }
    // Execute the callback function to notify the parent component of the quantity change
    onQuantityChange(newQuantity);
  };

  const handleDelete = () => {
    onDelete(product.id); // Call the onDelete function passed from props
  };

  if (!product) {
    return <div>Loading...</div>; // Show a loading state until product is fetched
  }

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={handleDelete}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer text-1xl" // Adjusted icon size
        />
        <div className="flex items-center flex-grow">
          <img
            className="w-32 h-32"
            src={product.imageCard}
            alt={product.title}
          />
          <div className="ml-4 flex flex-col">
            <h1 className="font-titleFont font-semibold">{product.title}</h1>
            <div className="text-lg font-semibold">${product.price}</div>
          </div>
        </div>
        <div className="col-span-5 mdl:col-span-3 flex items-left justify-left py-4 ml-10 mr-40 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
          <div className=" flex justify-left gap-6 text-lg">
            <input
              type="number"
              id="quantity"
              min="1"
              name="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 text-center"
              style={{ width: "25px" }}
            />
          </div>
          <div className="w-1/3 flex items-center ml-40 font-titleFont font-bold text-lg">
            <p>${quantity * product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

// --------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Wishlist = () => {
//   const [wishlist, setWishlist] = useState([]);

//   useEffect(() => {
//     const authToken = localStorage.getItem("access");
//     if (authToken) {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `JWT ${authToken}`,
//           Accept: "application/json",
//         },
//       };

//       const IDClient = parseInt(localStorage.getItem("idClient"));
//       console.log("IDClient " + IDClient);

//       // Fetch wishlist from backend
//       axios
//         .get(`/api/wishlist/${IDClient}/`, config)
//         .then((response) => {
//           setWishlist(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching wishlist:", error);
//         });
//     }
//   }, []);

//   const handleDelete = (productId) => {
//     const authToken = localStorage.getItem("access");
//     if (authToken) {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `JWT ${authToken}`,
//           Accept: "application/json",
//         },
//       };

//       const IDClient = parseInt(localStorage.getItem("idClient"));
//       console.log("IDClient " + IDClient);

//       console.log("productId "+productId);

//       // Make delete request to backend
//        axios
//          .delete(`/api/wishlist/delete/${IDClient}/${productId}/`, config)
//          .then((response) => {
//            console.log("Product deleted successfully:", response.data);
//            // Fetch updated wishlist after deletion
//            axios
//              .get(`/api/wishlist/${IDClient}/`, config)
//              .then((response) => {
//                setWishlist(response.data);
//              })
//              .catch((error) => {
//                console.error("Error fetching updated wishlist:", error);
//              });
//          })
//          .catch((error) => {
//            console.error("Error deleting product from wishlist:", error);
//          });
//     }
//   };

//   return (
//     <div className="main-content">
//       <h1>Wishlist</h1>
//       <p>Explore our latest products and discover something new!</p>
//       <div className="wishlist-items">
//         {wishlist.map((item) => (
//           <WishlistItem
//             key={item.id}
//             productId={item.product}
//             onDelete={handleDelete}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const WishlistItem = ({ productId, onDelete }) => {
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     if (productId) {
//       const authToken = localStorage.getItem("access");
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `JWT ${authToken}`,
//           Accept: "application/json",
//         },
//       };

//       axios
//         .get(`/api/product/${productId}/`, config)
//         .then((response) => {
//           setProduct(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching product:", error);
//         });
//     }
//   }, [productId]);

//   const handleDelete = () => {
//     onDelete(productId); // Call the onDelete function passed from props
//   };

//   const handleAddToFavorite = () => {
//     const authToken = localStorage.getItem("access");
//     if (authToken) {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `JWT ${authToken}`,
//           Accept: "application/json",
//         },
//       };

//       const IDClient = parseInt(localStorage.getItem("idClient"));

//       // Make POST request to add product to favorites
//       axios
//         .post(`/api/favorite/add/${IDClient}/${productId}/`, {}, config)
//         .then((response) => {
//           console.log("Product added to favorites:", response.data);
//           // Optionally, you can update the UI or display a message
//         })
//         .catch((error) => {
//           console.error("Error adding product to favorites:", error);
//         });
//     }
//   };

//   return (
//     <div className="wishlist-item">
//       {product ? (
//         <div>
//           <h2>{product.title}</h2>
//           <img src={product.imageCard} alt={product.title} />
//           <p>{product.description}</p>
//           <p>Price: ${product.price}</p>
//           <button onClick={handleDelete}>Remove from Wishlist</button>
//           <button onClick={handleAddToFavorite}>Add to Favorite</button>
//         </div>
//       ) : (
//         <>
//         </>
//       )}
//     </div>
//   );
// };

// export default Wishlist;
