import React from "react";

const CommandItemCard = ({ item, index }) => {
  // Example command status values
  const commandStatusExamples = ["Pending", "Delivered", "Rejected"];

  // Randomly select one of the example status values
  const randomStatus =
    commandStatusExamples[
      Math.floor(Math.random() * commandStatusExamples.length)
    ];

  // Define the color based on the command status
  let statusColor;
  switch (randomStatus) {
    case "Pending":
      statusColor = "text-gray-500";
      break;
    case "Delivered":
      statusColor = "text-green-500";
      break;
    case "Rejected":
      statusColor = "text-red-500";
      break;
    default:
      statusColor = "text-gray-500";
  }

  // Calculate the command number to start from 1 and increment by 1
  const commandNumber = (index + 1).toString();

  // Calculate the total price
  const totalPrice = (item.quantity * item.price).toFixed(2);

  return (
    <div className="w-full grid grid-cols-6 mb-4 border py-2 bg-white">
      {/* Added white background */}
      <div className="flex items-center gap-4 ml-2 col-span-4"> {/* Reduced margin from ml-4 to ml-2 */}
        <div className="font-semibold">{commandNumber}</div>{" "}
        {/* Display command number */}
        <div className="flex items-center">
          <img
            className="w-32 h-32 mr-4"
            src={item.imageCard}
            alt={item.title}
          />{" "}
          {/* Changed item.image to item.img */}
          <div className="ml-2 flex flex-col"> {/* Reduced margin from ml-4 to ml-2 */}
            <h1 className="font-titleFont font-semibold">
              {item.productName}
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
          }}>Quantity: {item.quantity}</p>{" "}
          {/* Display quantity */}
          <p className="text-lg ml-20 total-price">Total Price: ${totalPrice}</p>{" "}
          {/* Display total price */}
        </div>
      </div>
      <div className="flex items-center ">
        <p className="font-titleFont font-semibold mr-4"> Status:</p>{" "}
        {/* Display command status */}
        <p className={`text-lg command-status mr-10 ${statusColor}`} >{randomStatus}</p>{" "}
        {/* Apply color to command status */}
      </div>
    </div>
  );
};



export default CommandItemCard;





  // useEffect(() => {
  //   const authToken = localStorage.getItem("access");
  //   if (authToken && item && item.id) {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `JWT ${authToken}`,
  //         'Accept': 'application/json'
  //       }
  //     };
  
  //     axios.get(`/api/orderitems/order/${item.id}/`, config)
  //       .then(response => {
  //         const orderItems = response.data;
  //         setOrderItems(orderItems);
  //         console.log("order items ", orderItems);
  
  //         // Fetch products for each order item
  //         const productRequests = orderItems.map(orderItem => (
  //           axios.get(`/api/product/${orderItem.product}/`, config)
  //             .then(productResponse => productResponse.data)
  //         ));
  
  //         Promise.all(productRequests)
  //           .then(products => {
  //             const formattedProducts = products.map((product, index) => ({
  //               id_command: orderItems[index].id_orderItem,
  //               qty: orderItems[index].qty,
  //               price: orderItems[index].price,
  //               total: orderItems[index].total,
  //               status: orderItems[index].product_status,
  //               image: product.imageCard, // Assuming product object contains image and title
  //               title: product.title
  //             }));
  //             setProducts(formattedProducts);
  //             console.log("formatted products", formattedProducts);
  //           })
  //           .catch(error => {
  //             console.error("Error fetching products:", error);
  //           });
  //       })
  //       .catch(error => {
  //         console.error("Error fetching order items:", error);
  //       });
  
  //   }
  // }, [item.id]);