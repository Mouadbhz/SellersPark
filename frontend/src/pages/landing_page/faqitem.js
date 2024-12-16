// FaqItem.js

import React from 'react';

const FaqItem = ({ faq, isOpen, toggleAccordion, largeItem }) => {
  return (
    <div className={`faq-item bg-white shadow-md rounded-md overflow-hidden ${largeItem ? 'w-full md:w-2/3 lg:w-1/2' : ''}`}>
      <div
        className="flex justify-between cursor-pointer p-4"
        onClick={toggleAccordion}
      >
        <h3 className="text-lg font-semibold">{faq.question}</h3>
        <svg
          className={`h-6 w-6 ${isOpen ? 'transform rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'}
          />
        </svg>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} p-4`}>
        <p className="text-gray-700">{faq.answer}</p>
      </div>
    </div>
  );
};

export default FaqItem;


