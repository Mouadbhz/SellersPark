import React , {useState , useEffect} from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import axios from 'axios';
import "./ProductCard.css";

const ProductCardCategory = ({ categoryid }) => {

  const [products, setProducts] =useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [favorited, setFavorited] = useState({});

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
        // Fetch categories from backend
        axios
          .get(`/api/categories/${categoryid}/products/`, config)
          .then((response) => {
            setProducts(response.data);
            // console.log(response.data);
          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });
        }

 }, [categoryid]);

  console.log(products);

  const handleAddToCart = (productId) => {
    console.log(`Product added to cart: ${productId}`);
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

      axios.post(`/api/wishlist/add/${IDclient}/${productId}/`, {}, config)
        .then(response => {
          console.log("Add product to wishlist successfully: ", response.data);
        })
        .catch(error => {
          console.error("Error to Add product to wishlist:", error);
          if (error.response && error.response.data.message === 'Product already exists in the wishlist') {
            setErrorMessage('Product already exists in the wishlist');
            setTimeout(() => {
              setErrorMessage('');
            }, 2000);
          }
        });
    }
  };

  const handleToggleFavorite = (productId) => {
    setFavorited((prevFavorited) => ({
      ...prevFavorited,
      [productId]: !prevFavorited[productId],
    }));
    console.log("favorite",productId);

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

      axios.post(`/api/favorite/add/${IDclient}/${productId}/`, {}, config)
          .then(response => {
            console.log("Added product to favorite successfully: ", response.data);
          })
          .catch(error => {
            console.error("Error to Add product to wishlist:", error);
            if (error.response && error.response.data.message === 'Product already exists in the favorites') {
              setErrorMessage('Product already exists in the favorites');
              setTimeout(() => {
                setErrorMessage('');
              }, 2000);
            }
          });
    }
  };

  return (
    

    <div className="conatinerprod flex flex-wrap gap-5">
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
      {products ? (
       <>
      {products.map((product) => (
        <div key={product.id} className="product-card" style={{ marginLeft:'20px' }}>
          <div className="relative flex flex-col w-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md" style={{ width: '200px',  }}>
            <div className="relative flex flex-col h-48 overflow-hidden rounded-xl" >
              <img className="object-cover w-full h-full" src={product.image} alt="product image" />
              <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-75 p-2">
                <Link to={`/product-details/${product.id}`} className="text-lg tracking-tight text-slate-900">{product.title}</Link>
              </div>
            </div>
            <div className="px-4 py-3 flex flex-col items-center">
              <div className="flex items-center justify-between w-full">
                <p className="text-lg text-slate-900 font-bold">${product.price}</p>
                {product.oldPrice && (
                  <p className="text-sm text-gray-500 line-through">${product.old_price}</p>
                )}
              </div>
              
              <div className="flex items-center mt-2">
                <button className="flex items-center justify-center rounded-md bg-blue-900 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={() => handleAddToCart(product.id)}>
                  <i className="bi bi-cart mr-1"></i>
                  Add to Cart
                </button>
                <Link to={`/product-details/${product.id}`} className="bi bi-eye ml-2 cursor-pointer text-black"></Link>
                <i className={favorited[product.id] ? "fas fa-heart text-red-500 ml-2 cursor-pointer" : "far fa-heart  ml-2 cursor-pointer"} onClick={() => handleToggleFavorite(product.id)}></i>
              </div>
            </div>
          </div>
        </div>
      ))}
      </>
      ):(
        <p>loading...</p>
      )}
    </div>
  );

};

export default ProductCardCategory;
