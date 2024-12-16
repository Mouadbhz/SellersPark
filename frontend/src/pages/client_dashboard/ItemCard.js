// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// import { emptyCart } from "../../assets/images/index";
// import { SplOfferData } from "../../pages/Data/index2"; // Import the SplOfferData
// import Footer from "../../components/footer/footer";

// import { ImCross } from "react-icons/im";
// import {
//     addToWishlist,
//     deleteItem,
//     decreaseQuantity,
//     increaseQuantity,
//     resetCart,
//     toggleBrand,
//     toggleCategory,
// } from "../../redux/cardSlice";

// const Wishlist = () => {
//   const dispatch = useDispatch();
//   // Initialize products state with SplOfferData
//   const [products, setProducts] = useState(SplOfferData);
//   const [totalAmt, setTotalAmt] = useState("");
//   const [shippingCharge, setShippingCharge] = useState("");

//   useEffect(() => {
//     let price = 0;
//     products.forEach((item) => {
//       price += parseFloat(item.price) * item.quantity; // Convert price to float
//     });
//     setTotalAmt(price.toFixed(2)); // Round total amount to 2 decimal places
//   }, [products]);

//   useEffect(() => {
//     if (totalAmt <= 200) {
//       setShippingCharge(30);
//     } else if (totalAmt <= 400) {
//       setShippingCharge(25);
//     } else if (totalAmt > 401) {
//       setShippingCharge(20);
//     }
//   }, [totalAmt]);

//   return (
//     <>
//       <div className="mt-28">
//       <h1 className="mt-20 text-left text-3xl font-bold font-serif">YOUR WISH LIST</h1>
//   <div className="flex justify-between items-center h-15 mt-5 bg-blue-200 text-primeColor px-6 py-4 text-lg font-titleFont font-semibold">
//     <h2 className="flex-1 ml-10 ">Product</h2>
//     <h2 className="flex-1 ml-80 mr-6">Quantity</h2>
//     <h2 className="flex-1">Sub Total</h2>
//   </div>

//         <div className="mt-5">
//           {products.length > 0 ? (
//             products.map((item) => (
//               <div key={item._id}>
//                 <ItemCard 
//                   item={{
//                     _id: item._id,
//                     name: item.productName,
//                     price: item.price,
//                     quantity: item.quantity,
//                     image: item.img
//                   }} 
//                 />
//               </div>
//             ))
//           ) : (
//             <motion.div
//               initial={{ y: 30, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.4 }}
//               className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
//             >
//               <div>
//                 <img
//                   className="w-80 rounded-lg p-4 mx-auto"
//                   src={emptyCart}
//                   alt="emptyCart"
//                 />
//               </div>
//               <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
//                 <h1 className="font-titleFont text-xl font-bold uppercase">
//                   Your Cart feels lonely.
//                 </h1>
//                 <p className="text-sm text-center px-10 -mt-2">
//                   Your Shopping cart lives to serve. Give it purpose - fill it with
//                   books, electronics, videos, etc. and make it happy.
//                 </p>
//                 <Link to="/shop">
//                   <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
//                     Continue Shopping
//                   </button>
//                 </Link>
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </div>
//       <button
//         onClick={() => dispatch(resetCart())}
//         className="py-2 px-10 bg-red-500 text-white rounded font-semibold ml-6 uppercase mb-4 hover:bg-red-700 duration-300"
//       >
//         Reset cart
//       </button>
//       <div className="max-w-7xl gap-4 flex justify-end mt-4">
//         <div className="w-96 flex flex-col gap-4">
//           <h1 className="text-2xl font-semibold text-center ">Cart totals</h1>
//           <div>
//             <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
//               Subtotal
//               <span className="font-semibold tracking-wide font-titleFont">
//                 ${totalAmt}
//               </span>
//             </p>
//             <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
//               Shipping Charge
//               <span className="font-semibold tracking-wide font-titleFont">
//                 ${shippingCharge}
//               </span>
//             </p>
//             <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
//               Total
//               <span className="font-bold tracking-wide text-lg font-titleFont">
//                 ${(parseFloat(totalAmt) + parseFloat(shippingCharge)).toFixed(2)}
//               </span>
//             </p>
//           </div>
//           <div className="flex justify-center">
//     <Link to="/paymentinformation">
//         <button className="w-52 h-10 bg-blue-500 text-white border-blue-500 border-2 rounded-md hover:bg-white hover:text-blue-500 hover:shadow-md duration-300">
//             Proceed to Checkout
//         </button>
//     </Link>
// </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// const ItemCard = ({ item }) => {
//   const dispatch = useDispatch();
//   return (
//       <div className="w-full grid grid-cols-5 mb-4 border py-2">
//           <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
//               <ImCross
//                   onClick={() => dispatch(deleteItem(item._id))}
//                   className="text-primeColor hover:text-red-500 duration-300 cursor-pointer text-1xl" // Adjusted icon size
//               />
//               <div className="flex items-center flex-grow"> {/* Container for image and title */}
//                   <img className="w-32 h-32" src={item.image} alt="productImage" />
//                   <div className="ml-4 flex flex-col"> {/* Adjusted layout for name and price */}
//                       <h1 className="font-titleFont font-semibold">{item.name}</h1>
//                       <div className="text-lg font-semibold">${item.price}</div>
//                   </div>
              
//           </div>
//           <div className="col-span-5 mdl:col-span-3 flex items-left justify-left py-4 ml-10 mr-40 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0"> {/* Adjusted justify-center */}
//               <div className=" flex justify-left gap-6 text-lg">
//                   <span
//                       onClick={() => dispatch(decreaseQuantity({ _id: item._id }))}
//                       className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
//                   >
//                       -
//                   </span>
//                   <p className="">{item.quantity}</p> {/* Adjusted margin-right */}
//                   <span
//                       onClick={() => dispatch(increaseQuantity({ _id: item._id }))}
//                       className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
//                   >
//                       +
//                   </span>
//               </div>
//               <div className="w-1/3 flex items-center ml-40 font-titleFont font-bold text-lg">
//                   <p>${item.quantity * item.price}</p>
//               </div>
//           </div>
//       </div>
//       </div>
//   );
// };

// export default Wishlist;



































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




// -----------------------------------------------------------------------------------------------------

// import React from "react";
// import { useDispatch } from "react-redux";
// import { ImCross } from "react-icons/im";
// import {
//     addToWishlist,
//     deleteItem,
//     decreaseQuantity,
//     increaseQuantity,
//     resetCart,
//     toggleBrand,
//     toggleCategory,
// } from "../../redux/cardSlice";

// const ItemCard = ({ item }) => {
//     const dispatch = useDispatch();
//     return (
//         <div className="w-full grid grid-cols-5 mb-4 border py-2">
//             <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
//                 <ImCross
//                     onClick={() => dispatch(deleteItem(item._id))}
//                     className="text-primeColor hover:text-red-500 duration-300 cursor-pointer text-1xl" // Adjusted icon size
//                 />
//                 <div className="flex items-center flex-grow"> {/* Container for image and title */}
//                     <img className="w-32 h-32" src={item.image} alt="productImage" />
//                     <div className="ml-4 flex flex-col"> {/* Adjusted layout for name and price */}
//                         <h1 className="font-titleFont font-semibold">{item.name}</h1>
//                         <div className="text-lg font-semibold">${item.price}</div>
//                     </div>
                
//             </div>
//             <div className="col-span-5 mdl:col-span-3 flex items-left justify-left py-4 ml-10 mr-40 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0"> {/* Adjusted justify-center */}
//                 <div className=" flex justify-left gap-6 text-lg">
//                     <span
//                         onClick={() => dispatch(decreaseQuantity({ _id: item._id }))}
//                         className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
//                     >
//                         -
//                     </span>
//                     <p className="">{item.quantity}</p> {/* Adjusted margin-right */}
//                     <span
//                         onClick={() => dispatch(increaseQuantity({ _id: item._id }))}
//                         className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
//                     >
//                         +
//                     </span>
//                 </div>
//                 <div className="w-1/3 flex items-center ml-40 font-titleFont font-bold text-lg">
//                     <p>${item.quantity * item.price}</p>
//                 </div>
//             </div>
//         </div>
//         </div>
//     );
// };

// export default ItemCard;


