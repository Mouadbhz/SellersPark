import React from "react";
import './filter.css';
import backgroundImage from '../../pages/images/back2.jpg'; // Adjust the path as per your project structure

const RatingFilter = () => {
  return (
    <div
    className="fixed mr-20  rounded-lg"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      marginTop: '95px',
      padding: '2px',
      padding: '4px',
      width:'140px'
    }}
  >
      <h3 className="font-semibold mb-4">Sort By</h3>
      {/* Rating filter */}
      <div>
        <h4 className="font-semibold mb-1">Rating</h4>
        <div className="flex items-center gap-2 mb-2">
          <input type="checkbox" id="rating-5" />
          <label htmlFor="rating-5">
            <i className="bi bi-star-fill text-yellow-500"></i>
            <i className="bi bi-star-fill text-yellow-500"></i>
            <i className="bi bi-star-fill text-yellow-500"></i>
            <i className="bi bi-star-fill text-yellow-500"></i>
            <i className="bi bi-star-fill text-yellow-500"></i>
          </label>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <input type="checkbox" id="rating-4" />
          <label htmlFor="rating-4">
            <i className="bi bi-star-fill text-yellow-500"></i>
            <i className="bi bi-star-fill text-yellow-500"></i>
            <i className="bi bi-star-fill text-yellow-500"></i>
            <i className="bi bi-star-fill text-yellow-500"></i>
            <i className="bi bi-star"></i>
          </label>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <input type="checkbox" id="rating-3" />
          <label htmlFor="rating-3">
            <i className="bi bi-star-fill text-yellow-500"></i>
            <i className="bi bi-star-fill text-yellow-500"></i>
            <i className="bi bi-star-fill text-yellow-500"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
          </label>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <input type="checkbox" id="rating-2" />
          <label htmlFor="rating-2">
            <i className="bi bi-star-fill text-yellow-500"></i>
            <i className="bi bi-star-fill text-yellow-500"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
          </label>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <input type="checkbox" id="rating-1" />
          <label htmlFor="rating-1">
            <i className="bi bi-star-fill text-yellow-500"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
          </label>
        </div>
      </div>
      {/* Price filter */}
      <div className="mt-4">
        <h4 className="font-semibold mb-1">Price</h4>
        <div className="flex items-center gap-2 mb-2">
          <input type="checkbox" id="price-under-50" />
          <label htmlFor="price-under-50">$0 - $50</label>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <input type="checkbox" id="price-50-100" />
          <label htmlFor="price-50-100">$50 - $100</label>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <input type="checkbox" id="price-100-200" />
          <label htmlFor="price-100-200">$100 - $200</label>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <input type="checkbox" id="price-over-200" />
          <label htmlFor="price-over-200">Over $200</label>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-semibold mb-1">In Stock</h4>
        <div className="switch">
          <input type="checkbox" id="availability" />
          <label htmlFor="availability"></label>
        </div>
      </div>
    </div>
  );
};

export default RatingFilter;
