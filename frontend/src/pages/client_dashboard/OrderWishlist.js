import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const OrderWishlist = () => {
  const { productId } = useParams();
  
  const [clientInfo, setClientInfo] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [cardNumber, setCardNumber] = useState("");
  //----------------------------------------------------
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [fullNameCard, setfullNameCard] = useState("");
  // ---------------------------------------------------
  const [items, setItems] = useState([]);
  const [step, setStep] = useState(1);

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
    }
  }, []);
//--------------------
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
          const product = response.data;
          const item = {
            product: product.id,
            qty: quantity,
            price: product.price,
            total: (quantity * product.price).toFixed(2)
          };
          setItems([item]);
        })
        .catch(error => {
          console.error("Error fetching product:", error);
        });
    }
  }, [productId, quantity]);

  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmitFinal = (e) => {
    e.preventDefault();
    const clientId = parseInt(localStorage.getItem("idClient"));
    
    const orderData = {
      client: clientId,
      total: items.reduce((acc, item) => acc + parseFloat(item.total), 0).toFixed(2),
      card_number: cardNumber,
      items: items
    };

    console.log(orderData);

    // axios.post("/api/create-order/", orderData)
    //   .then(response => {
    //     console.log("Order created successfully:", response.data);
    //     // Redirect or handle success
    //   })
    //   .catch(error => {
    //     console.error("Error creating order:", error);
    //     // Handle error
    //   });
  };

  return (
    <div className="container">
      <h1>Order</h1>
      {step === 1 ? (
        <form onSubmit={handleSubmitStep1}>
          <div>
            <label htmlFor="first_name">First Name:</label>
            <input type="text" id="first_name" name="first_name" value={clientInfo.first_name} onChange={handleClientInfoChange} />
          </div>
          <div>
            <label htmlFor="last_name">Last Name:</label>
            <input type="text" id="last_name" name="last_name" value={clientInfo.last_name} onChange={handleClientInfoChange} />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" value={clientInfo.address} onChange={handleClientInfoChange} />
          </div>
          <div>
            <label htmlFor="contact">Contact:</label>
            <input type="text" id="contact" name="contact" value={clientInfo.contact} onChange={handleClientInfoChange} />
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" min="1" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <button type="submit">Next</button>
        </form>
      ) : (
        <form onSubmit={handleSubmitFinal}>
          <div>
            <label htmlFor="cardNumber">Card Number:</label>
            <input type="text" id="cardNumber" name="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
          </div>
          <div>
            <label htmlFor="fullName">Full Name on Card:</label>
            <input type="text" id="fullName" name="fullName"  value={fullNameCard} onChange={(e) => setfullNameCard(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="expiryMonth">Expiry Month:</label>
            <input type="text" id="expiryMonth" name="expiryMonth" value={expiryMonth} onChange={(e) => setExpiryMonth(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="expiryYear">Expiry Year:</label>
            <input type="text" id="expiryYear" name="expiryYear" value={expiryYear} onChange={(e) => setExpiryYear(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="securityCode">Security Code:</label>
            <input type="text" id="securityCode" name="securityCode"  value={securityCode} onChange={(e) => setSecurityCode(e.target.value)}/>
          </div>
          <button type="submit">Submit Order</button>
        </form>
      )}
      <Link to={`/product-view/${productId}`}>Back to Product</Link>
    </div>
  );
};

export default OrderWishlist;




