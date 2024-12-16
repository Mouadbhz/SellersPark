import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Footer from "../../components/footer/footer";
import axios from "axios";

const CommandsClient = () => {
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);

  const [formatOrders, setFormatOrders] = useState([]);
  // console.log(orders);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("access");
        if (authToken) {
          const clientId = parseInt(localStorage.getItem("idClient"));
          const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${authToken}`,
              'Accept': 'application/json'
            }
          };

          const response = await axios.get(`/api/order/client/${clientId}/`, config);
          setOrders(response.data);
          console.log(response.data);

          // Iterate over each order
          response.data.forEach(async (order) => {
            try {
              const orderItemsResponse = await axios.get(`/api/orderitems/order/${order.id}/`, config);
              const orderItems = orderItemsResponse.data;
              console.log("order items for order", order.id, ":", orderItems);

              // Iterate over each order item
              orderItems.forEach(async (orderItem) => {
                try {
                  const productResponse = await axios.get(`/api/product/${orderItem.product}/`, config);
                  const product = productResponse.data;
                  console.log("product details for order item", orderItem.id_orderItem, ":", product);

                  // Create a new formatted order object
                  const formattedOrder = {
                    id_command: orderItem.id_orderItem,
                    qty: orderItem.qty,
                    price: orderItem.price,
                    total: orderItem.total,
                    status: orderItem.product_status,
                    image: product.imageCard,
                    title: product.title
                  };

                  // Update the state with the new formatted order
                  setFormatOrders(prevState => [...prevState, formattedOrder]);

                } catch (error) {
                  console.error("Error fetching product details for order item:", orderItem.id_orderItem, error);
                }
              });

            } catch (error) {
              console.error("Error fetching order items for order:", order.id, error);
            }
          });
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, []);

  console.log(formatOrders);

  return (
    <>
      <div className="mt-28">
        <h1 className="text-3xl font-bold font-serif mb-4">Your Command</h1>
        <div className="command-items">
        {formatOrders.map((item, index) => (
            <CommandItemCard key={index} item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

const CommandItemCard = ({ item }) => {
  console.log(item);

  const [status, setStatus] = useState(item.status);

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

  const handleCancel = async (id_command) => {
    console.log(id_command);

    const authToken = localStorage.getItem("access");
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${authToken}`,
        'Accept': 'application/json'
      }
    };

    try {
      const response = await axios.put(`/api/orderitems/${id_command}/`, {
        product_status: 'client cancel'
      }, config);
      
      if (response.status === 200) {
        setStatus('client cancel');
      }
    } catch (error) {
      console.error("Error updating order item status:", error);
    }
  };

  return (
    <div className="w-full grid grid-cols-6 mb-4 border py-2 bg-white">
      {/* Added white background */}
      <div className="flex items-center gap-4 ml-2 col-span-4"> {/* Reduced margin from ml-4 to ml-2 */}
        <div className="font-semibold">{item.id_command}</div>{" "}
        {/* Display command number */}
        <div className="flex items-center">
          <img
            className="w-32 h-32 mr-4"
            src={item.image}
            alt={item.title}
          />{" "}
          {/* Changed item.image to item.img */}
          <div className="ml-2 flex flex-col"> {/* Reduced margin from ml-4 to ml-2 */}
            <h1 className="font-titleFont font-semibold">
              {item.title}
            </h1>{" "}
            {/* Display product name */}
            <p className="text-lg font-semibold">${item.price}</p>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <div className="flex flex-row">
          <p className="text-lg quantity" style={{
            marginLeft:'-400px'
          }}>Quantity: {item.qty}</p>{" "}
          {/* Display quantity */}
          <p className="text-lg ml-20 total-price">Total Price: ${item.total}</p>{" "}
          {/* Display total price */}
        </div>
      </div>
      <div className="flex items-center ">
        <p className="font-titleFont font-semibold mr-4"> Status:</p>{" "}
        {/* Display command status */}
        <p className={`text-lg command-status mr-10 ${statusColor}`}>{status}</p>{" "}
        {/* Apply color to command status */}
        {item.status === "processing" || item.status === "process" && (
          <button onClick={() => handleCancel(item.id_command)}>cancel</button>
        )}
      </div>
    </div>
  );
};

export default CommandsClient;