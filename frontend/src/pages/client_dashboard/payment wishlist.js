import React, { useState, useEffect } from 'react';
import paymentImage from '../images/payment.png'; // Adjust the path as necessary
import { FaCreditCard } from 'react-icons/fa'; // Importing a card icon
import Footer from "../../components/footer/footer";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentWishlist = () => {
  const { total } = useParams();
  const navigate = useNavigate();
  console.log(total);

  let totalOrder = total;

  const [step, setStep] = useState(1);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [clientInfo, setClientInfo] = useState({});
  const [items, setItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // State for success message

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
      const clientId = parseInt(localStorage.getItem("idClient"));
  
      axios.get(`/api/client/${clientId}/client/`, config)
        .then(response => {
          setClientInfo(response.data);
        })
        .catch(error => {
          console.error("Error fetching client information:", error);
        });
  
      axios.get(`/api/wishlist/${clientId}/`, config)
        .then(response => {
          const filteredItems = response.data.filter(item => item.product !== null);
          console.log("filteredItems", filteredItems);
  
          const fetchProductPrice = async (productId) => {
            try {
              const response = await axios.get(`/api/product/${productId}/`, config);
              return response.data.price;
            } catch (error) {
              console.error(`Error fetching price for product ${productId}:`, error);
              return 0;
            }
          };
  
          const fetchPrices = async () => {
            const itemsWithPrices = await Promise.all(filteredItems.map(async (item) => {
              const price = await fetchProductPrice(item.product);
              return {
                product: item.product,
                qty: item.qty,
                price: price,
                total: (item.qty * price).toFixed(2)
              };
            }));
            setItems(itemsWithPrices);
          };
  
          fetchPrices();
        })
        .catch(error => {
          console.error("Error fetching wishlist items:", error);
        });
    }
  }, []);

  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    const numericValue = name === 'cvv' ? value.replace(/\D/g, '') : value;
    const formattedValue = name === 'cvv' ? numericValue.slice(0, 3) : numericValue;
    setPaymentInfo({ ...paymentInfo, [name]: formattedValue });
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleClientInfoChange = (e) => {
    const { name, value } = e.target;
    setClientInfo(prevClientInfo => {
      const updatedClientInfo = {
        ...prevClientInfo,
        [name]: value
      };
      console.log("Updated Client Info:", updatedClientInfo);
      return updatedClientInfo;
    });
  };

  const handleSubmitFinal = () => {
    console.log('Payment Info Submitted', paymentInfo);
  
    const clientId = parseInt(localStorage.getItem("idClient"));
    
    const orderData = {
      client: clientId,
      total: totalOrder,
      card_number: paymentInfo.cardNumber,
      items: items
    };
  
    console.log(orderData);
    console.log(JSON.stringify(orderData));
    const authToken = localStorage.getItem("access");
    if (authToken) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${authToken}`,
          'Accept': 'application/json'
        }
      };
  
      console.log(orderData);
  
      const body = JSON.stringify(orderData);
  
      console.log(body);
  
      axios.post("/api/create-order/", body , config)
      .then(response => {
        console.log("Order created successfully:", response.data);
        // Redirect or handle success
        setShowConfirmation(false);
        setShowSuccess(true); // Show success message
  
        // Delay redirection to client dashboard by 2 seconds
        setTimeout(() => {
          setShowSuccess(false); // Hide success message
          navigate('/client-dashboard');
        }, 2000);
      })
      .catch(error => {
        console.error("Error creating order:", error);
        // Handle error
      });
    }
  };
  

  const handleConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    navigate('/wishlist');
  };

  return (
    <>
      <h1 className="text-left ml-28 text-3xl font-bold font-serif" style={{ marginTop: '40px' }}>Checkout process Wishlist</h1>
      <div className="flex flex-col items-center min-h-screen p-2">
        <div className="flex bg-white shadow-lg rounded-2xl p-2 w-full max-w-4xl" style={{ boxShadow: '0 5px 25px #27419D' }}>
          <div className="w-full max-w-md p-6 border-r-4 border-blue">
            {step === 1 ? (
              <div className="user-info">
                <h2 className="text-2xl font-semibold text-center mb-6">User Information</h2>
                <label className="block mb-2">
                  <span className="text-gray-700">First Name</span>
                  <input 
                    type="text" 
                    name="firstName" 
                    value={clientInfo.first_name} 
                    onChange={handleClientInfoChange} 
                    className="mt-2 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                  />
                </label>
                <label className="block mb-2">
                  <span className="text-gray-700">Last Name</span>
                  <input 
                    type="text" 
                    name="lastName" 
                    value={clientInfo.last_name} 
                    onChange={handleClientInfoChange}
                    className="mt-2 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                  />
                </label>
                <label className="block mb-2">
                  <span className="text-gray-700">Address</span>
                  <input 
                    type="text" 
                    name="address" 
                    value={clientInfo.address} 
                    onChange={handleClientInfoChange}
                    className="mt-2 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                    />
                  </label>
                  <label className="block w-2/3">
                    <span className="text-gray-700">Phone Number</span>
                    <input 
                      type="tel" 
                      name="contact" 
                      value={clientInfo.contact}
                      onChange={handleClientInfoChange} 
                      pattern="[0-9]*" 
                      maxLength="10"  // Limit to 10 digits
                      className="mt-2 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      required
                    />
                  </label>
                  <button 
                    onClick={handleNext} 
                    className="mt-4 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                  >
                    Next
                  </button>
                </div>
              ) : (
                <div className="payment-info">
                  <h2 className="text-2xl font-semibold text-center mb-6">Payment Information</h2>
                  <label className="block mb-4 relative">
                    <span className="text-gray-700">Card Number</span>
                    <input 
                      type="text" 
                      name="cardNumber" 
                      value={paymentInfo.cardNumber} 
                      onChange={handlePaymentInfoChange} 
                      className="mt-2 block w-full rounded-lg border border-gray-300 p-3 pr-10 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      required
                    />
                    <FaCreditCard className="absolute top-3 right-3 text-gray-400" />
                  </label>
                  <label className="block mb-4">
                    <span className="text-gray-700">Expiry Date</span>
                    <input 
                      type="month" 
                      name="expiryDate" 
                      value={paymentInfo.expiryDate} 
                      onChange={handlePaymentInfoChange} 
                      className="mt-2 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    <span className="text-gray-700">CVV</span>
                    <input 
                      type="tel" 
                      name="cvv" 
                      value={paymentInfo.cvv} 
                      onChange={handlePaymentInfoChange} 
                      maxLength="3"  // Limit to 3 digits
                      className="mt-2 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      required
                    />
                  </label>
                  <div className="flex justify-between mt-6">
                    <button 
                      onClick={handleBack} 
                      className="bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition duration-200"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handleConfirmation} 
                      className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full max-w-sm ml-6 flex items-center justify-center">
              <img src={paymentImage} alt="Payment" className="w-full h-auto rounded-2xl shadow-lg" />
            </div>
          </div>
        </div>
  
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Confirmation</h2>
              <p className="mb-6">Would you like to continue?</p>
              <div className="flex justify-end">
                <button 
                  onClick={handleCancel} 
                  className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition duration-200 mr-2"
                >
                  No
                </button>
                <button 
                  onClick={handleSubmitFinal} 
                  className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
  
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Payment Successful</h2>
              <p className="mb-6">Your order has been successfully placed.</p>
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowSuccess(false)} 
                  className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
  
        <Footer />
      </>
    );
  };
  
  export default PaymentWishlist;
  

      
































// ------------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import paymentImage from '../images/payment.png'; // Adjust the path as necessary
// import { FaCreditCard } from 'react-icons/fa'; // Importing a card icon
// import Footer from "../../components/footer/footer";
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const PaymentWishlist = () => {
//   const { total } = useParams();
//   const navigate = useNavigate();
//   console.log(total);

//   let totalOrder = total;

//   const [step, setStep] = useState(1);
//   const [paymentInfo, setPaymentInfo] = useState({
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//   });
//   const [clientInfo, setClientInfo] = useState({});
//   const [items, setItems] = useState([]);
//   const [showConfirmation, setShowConfirmation] = useState(false);

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
//       const clientId = parseInt(localStorage.getItem("idClient"));
  
//       axios.get(`/api/client/${clientId}/client/`, config)
//         .then(response => {
//           setClientInfo(response.data);
//         })
//         .catch(error => {
//           console.error("Error fetching client information:", error);
//         });
  
//       axios.get(`/api/wishlist/${clientId}/`, config)
//         .then(response => {
//           const filteredItems = response.data.filter(item => item.product !== null);
//           console.log("filteredItems", filteredItems);
  
//           const fetchProductPrice = async (productId) => {
//             try {
//               const response = await axios.get(`/api/product/${productId}/`, config);
//               return response.data.price;
//             } catch (error) {
//               console.error(`Error fetching price for product ${productId}:`, error);
//               return 0;
//             }
//           };
  
//           const fetchPrices = async () => {
//             const itemsWithPrices = await Promise.all(filteredItems.map(async (item) => {
//               const price = await fetchProductPrice(item.product);
//               return {
//                 product: item.product,
//                 qty: item.qty,
//                 price: price,
//                 total: (item.qty * price).toFixed(2)
//               };
//             }));
//             setItems(itemsWithPrices);
//           };
  
//           fetchPrices();
//         })
//         .catch(error => {
//           console.error("Error fetching wishlist items:", error);
//         });
//     }
//   }, []);

//   const handlePaymentInfoChange = (e) => {
//     const { name, value } = e.target;
//     const numericValue = name === 'cvv' ? value.replace(/\D/g, '') : value;
//     const formattedValue = name === 'cvv' ? numericValue.slice(0, 3) : numericValue;
//     setPaymentInfo({ ...paymentInfo, [name]: formattedValue });
//   };

//   const handleNext = () => {
//     setStep(2);
//   };

//   const handleBack = () => {
//     setStep(1);
//   };

//   const handleClientInfoChange = (e) => {
//     const { name, value } = e.target;
//     setClientInfo(prevClientInfo => {
//       const updatedClientInfo = {
//         ...prevClientInfo,
//         [name]: value
//       };
//       console.log("Updated Client Info:", updatedClientInfo);
//       return updatedClientInfo;
//     });
//   };

//   const handleSubmitFinal = () => {
//     console.log('Payment Info Submitted', paymentInfo);

//     const clientId = parseInt(localStorage.getItem("idClient"));
    
//     const orderData = {
//       client: clientId,
//       total: totalOrder,
//       card_number: paymentInfo.cardNumber,
//       items: items
//     };

//     console.log(orderData);
//     console.log(JSON.stringify(orderData));
//     const authToken = localStorage.getItem("access");
//     if (authToken) {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `JWT ${authToken}`,
//           'Accept': 'application/json'
//         }
//       };

//       console.log(orderData);

//       const body = JSON.stringify(orderData);
  
//       console.log(body);

//       axios.post("/api/create-order/", body , config)
//       .then(response => {
//         console.log("Order created successfully:", response.data);
//         // Redirect or handle success
//         setShowConfirmation(false);
//         navigate('/client-dashboard');
//       })
//       .catch(error => {
//         console.error("Error creating order:", error);
//         // Handle error
//       });
//     }
//   };

//   const handleConfirmation = () => {
//     setShowConfirmation(true);
//   };

//   const handleCancel = () => {
//     setShowConfirmation(false);
//     navigate('/wishlist');
//   };

//   return (
//     <>
//       <h1 className="text-left mt-28 ml-28 text-3xl font-bold font-serif">Checkout process Wishlist</h1>
//       <div className="flex flex-col items-center min-h-screen p-2">
//         <div className="flex bg-white shadow-lg rounded-2xl p-2 w-full max-w-4xl" style={{ boxShadow: '0 5px 25px #27419D' }}>
//           <div className="w-full max-w-md p-6 border-r-4 border-blue">
//             {step === 1 ? (
//               <div className="user-info">
//                 <h2 className="text-2xl font-semibold text-center mb-6">User Information</h2>
//                 <label className="block mb-2">
//                   <span className="text-gray-700">First Name</span>
//                   <input 
//                     type="text" 
//                     name="firstName" 
//                     value={clientInfo.first_name} 
//                     onChange={handleClientInfoChange} 
//                     className="mt-2 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
//                   />
//                 </label>
//                 <label className="block mb-2">
//                   <span className="text-gray-700">Last Name</span>
//                   <input 
//                     type="text" 
//                     name="lastName" 
//                     value={clientInfo.last_name} 
//                     onChange={handleClientInfoChange}
//                     className="mt-2 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
//                   />
//                 </label>
//                 <label className="block mb-2">
//                   <span className="text-gray-700">Address</span>
//                   <input 
//                     type="text" 
//                     name="address" 
//                     value={clientInfo.address} 
//                     onChange={handleClientInfoChange}
//                     className="mt-2 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
//                   />
//                 </label>
//                   <label className="block w-2/3">
//                     <span className="text-gray-700">Phone Number</span>
//                     <input 
//                       type="tel" 
//                       name="contact" 
//                       value={clientInfo.contact}
//                       onChange={handleClientInfoChange} 
//                       pattern="[0-9]*" 
//                       maxLength="10"  // Limit to 10 digits
//                       className="mt-2 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
//                     />
//                   </label>
//                 <button 
//                   onClick={handleNext} 
//                   className="mt-4 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
//                 >
//                   Next
//                 </button>
//               </div>
//             ) : (
//               <div className="payment-info">
//                 <h2 className="text-2xl font-semibold text-center mb-6">Payment Information</h2>
//                 <label className="block mb-4 relative">
//                   <span className="text-gray-700">Card Number</span>
//                   <input 
//                     type="text" 
//                     name="cardNumber" 
//                     value={paymentInfo.cardNumber} 
//                     onChange={handlePaymentInfoChange} 
//                     className="mt-2 block w-full rounded-lg border border-gray-300 p-3 pr-10 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
//                   />
//                   <FaCreditCard className="absolute top-3 right-3 text-gray-400" />
//                 </label>
//                 <label className="block mb-4">
//                   <span className="text-gray-700">Expiry Date</span>
//                   <input 
//                     type="month" 
//                     name="expiryDate" 
//                     value={paymentInfo.expiryDate} 
//                     onChange={handlePaymentInfoChange} 
//                     className="mt-2 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
//                   />
//                 </label>
//                 <label className="block mb-4">
//                   <span className="text-gray-700">CVV</span>
//                   <input 
//                     type="tel" 
//                     name="cvv" 
//                     value={paymentInfo.cvv} 
//                     onChange={handlePaymentInfoChange} 
//                     maxLength="3"  // Limit to 3 digits
//                     className="mt-2 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
//                   />
//                 </label>
//                 <div className="flex justify-between mt-6">
//                   <button 
//                     onClick={handleBack} 
//                     className="bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition duration-200"
//                   >
//                     Back
//                   </button>
//                   <button 
//                     onClick={handleConfirmation} 
//                     className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="w-full max-w-sm ml-6 flex items-center justify-center">
//             <img src={paymentImage} alt="Payment" className="w-full h-auto rounded-2xl shadow-lg" />
//           </div>
//         </div>
//       </div>

//       {showConfirmation && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-2xl font-semibold mb-4">Confirmation</h2>
//             <p className="mb-6">Would you like to continue?</p>
//             <div className="flex justify-end">
//               <button 
//                 onClick={handleCancel} 
//                 className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition duration-200 mr-2"
//               >
//                 No
//               </button>
//               <button 
//                 onClick={handleSubmitFinal} 
//                 className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
//               >
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </>
//   );
// };

// export default PaymentWishlist;



