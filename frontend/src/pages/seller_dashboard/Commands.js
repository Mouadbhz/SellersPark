import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Footer from "../../components/footer/footer";



const Commands = () => {
  const dispatch = useDispatch();

  const [commandsItem, setCommandsItem] = useState([]);

  useEffect(() => {
    const fetchCommandsItem = async () => {
      const authToken = localStorage.getItem("access");
      if (authToken) {
        const vendorId = parseInt(localStorage.getItem("idVendor"), 10);
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${authToken}`,
            'Accept': 'application/json'
          }
        };

        try {
          const response = await axios.get(`/api/products/by_vendor_with_orderitems_and_client/${vendorId}/`, config);
          // setCommandsItem(response.data);
          console.log(response.data);

          const formattedOrders = [];
          for (const item of response.data) {
            const productResponse = await axios.get(`/api/product/${item.product}/`, config);
            const clientResponse = await axios.get(`/api/client/${item.client_id}/client/`, config);

            // console.log("product data",productResponse.data);
            // console.log("client data",clientResponse.data);

            const formattedOrder = {
              id: item.id,
              client_id: item.client_id,
              client_image: clientResponse.data.image,
              client_first_name: clientResponse.data.first_name,
              client_last_name: clientResponse.data.last_name,
              client_address: clientResponse.data.address,
              client_contact: clientResponse.data.contact,
              id_orderItem: item.id_orderItem,
              qty: item.qty,
              total: item.total,
              price: item.price,
              product_status: item.product_status,
              order_id: item.order,
              product: item.product,
              product_image: productResponse.data.imageCard,
              product_title: productResponse.data.title,
            };

            formattedOrders.push(formattedOrder);
          }
          setCommandsItem(formattedOrders);
          console.log(formattedOrders);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchCommandsItem();
  }, []);

  console.log(commandsItem);



  return (
    <>
      <div className=" container mx-auto px-4" style={{ marginTop: '40px' }}>
        <h1 className="text-3xl font-bold font-serif mb-4">Commands You received </h1>
        <div className="command-items space-y-4">
          {commandsItem.map((item) => (
            <CommandItemCard  item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};


const CommandItemCard = ({ item }) => {

  console.log(item);

    // Define the color based on the command status
    let statusColor;
    switch (item.product_status) {
      case "processing":
        statusColor = "text-gray-500";
        break;
      case "delivered":
        statusColor = "text-green-500";
        break;
      case "vendor cancel":
      case "client cancel":
        statusColor = "text-red-500";
        break;
      default:
        statusColor = "text-gray-500";
    }

    const authToken = localStorage.getItem("access");
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${authToken}`,
      'Accept': 'application/json'
    }
  };

  const handleDeliver = async (id_command) => {
    console.log(id_command);
    try {
      await axios.put(`/api/orderitems/${id_command}/`, { product_status: "delivered" }, config);
      console.log("Order delivered successfully!");
      // You may want to refresh the data or update the UI after delivering the order
    } catch (error) {
      console.error("Error delivering order:", error);
    }
  };

  const handleDecline = async (id_command) => {
    console.log(id_command);
    try {
      await axios.put(`/api/orderitems/${id_command}/`, { product_status: "vendor cancel" }, config);
      console.log("Order declined successfully!");
      // You may want to refresh the data or update the UI after declining the order
    } catch (error) {
      console.error("Error declining order:", error);
    }
  };

  // Define whether to display the buttons based on the command status
let displayButtons = true;
if (["delivered", "vendor cancel", "client cancel"].includes(item.product_status)) {
  displayButtons = false;
}


  return (
    <div className="w-full mb-4 border py-2 bg-white">
      {/* Client view */}
      <div className="grid grid-cols-6">
        <div className="flex items-center gap-4 ml-2 col-span-4">
          <div className="font-semibold">{item.id_orderItem}</div>
          <div className="flex items-center">
            <img className="w-32 h-32 mr-4" src={item.product_image} alt={item.product_title} />
            <div className="ml-2 flex flex-col">
              <h1 className="font-titleFont font-semibold">{item.product_title}</h1>
              <p className="text-lg font-semibold">${item.price}</p>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <div className="flex flex-row">
            <p className="text-lg quantity" style={{ marginLeft: '-400px' }}>
              Quantity: {item.qty}
            </p>
            <p className="text-lg ml-20 total-price">Total Price: ${item.total}</p>
          </div>
        </div>
        <div className="flex items-center">
          <p className="font-titleFont font-semibold mr-4">Status:</p>
          <p className={`text-lg command-status mr-10 ${statusColor}`}>{item.product_status}</p>
        </div>
      </div>
      {/* Seller view */}
      <div className="grid grid-cols-6 mt-4 border-t pt-4 items-center">
        <div className="flex items-center gap-4 ml-2 col-span-4">
          <img className="w-16 h-16 rounded-full" src={item.client_image} alt={item.client_first_name} />
          <div className="ml-4 flex flex-wrap items-center">
            <div className="mr-6">
              <h2 className="font-titleFont font-semibold">{`${item.client_first_name} ${item.client_last_name}`}</h2>
            </div>
            <div className="ml-20">
              <p className="text-sm">{item.client_address}</p>
            </div>
            <div className="ml-20">
              <p className="text-sm">{item.client_contact}</p>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex justify-end items-center gap-4">
        {displayButtons && (
        <div className="col-span-2 flex justify-end items-center gap-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleDeliver(item.id_orderItem)}>
            Deliver
          </button>
          <button className="bg-red-500 mr-4 text-white px-4 py-2 rounded" onClick={() => handleDecline(item.id_orderItem)}>
            Decline
          </button>
        </div>
      )}
      {!displayButtons && (
        <div className="col-span-2 flex justify-end items-center gap-4">
          <button className="bg-red-500 mr-4 text-white px-4 py-2 rounded" onClick={() => handleDecline(item.id_orderItem)}>
            Decline
          </button>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default Commands;















// --------------------------------------------------------------------


// // New.jsx
// import React from 'react';

// const CommandsSeller = () => {
//   return (
//     <div className="main-content">
//       <h1>Commands</h1>
//       <p>Explore our latest products and discover something new!</p>
//     </div>
//   );
// };

// export default CommandsSeller;