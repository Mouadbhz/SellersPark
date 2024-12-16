import React, { useState } from 'react';
import FaqItem from './faqitem';
import Footer from '../../components/footer/footer'; // Adjust the path as per your project structure


const FaqPage = () => {
  // Updated FAQ data
  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'You can place an order by browsing our products, selecting the items you want, and proceeding to checkout.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept Dahabia Card.',
    },
    {
      question: 'Can I track my order?',
      answer: 'Yes, you can track the status of your order once it has been shipped. Please check your order details for tracking information.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'No, we currently only offer shipping within Algeria.',
    },
    {
      question: 'How do I report a seller?',
      answer: 'If you encounter any issues with a seller or their products, you can report them by contacting our customer support team. We take seller misconduct seriously and will investigate any reported issues.',
    },
    {
      question: 'Can I see the status of my order?',
      answer: 'Yes, you can check the status of your order by logging into your account and viewing your order history. You will find detailed information about the current status of each of your orders.',
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  // Open all FAQ items by default
  const toggleAccordion = (index) => {
    // No toggling needed since all items are open
  };

  return (
    <>
      <div className="faq-page-container mx-auto px-4 py-8 bg-fixed">
        <h1 className="faq-page-title text-5xl font-semibold text-gray-800 mt-16 mb-4">FAQ</h1>
        <div className="faq-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq, index) => (
            <FaqItem 
              key={index} 
              faq={faq} 
              isOpen={true} // Set all FAQ items to be open by default
              toggleAccordion={() => toggleAccordion(index)} 
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FaqPage;
