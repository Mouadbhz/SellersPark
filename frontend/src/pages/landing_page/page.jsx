import React, { useState } from 'react';
// import './contactus.css';

const Page = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate inputs
    if (!name.trim()) {
      setNameError('Please enter your name');
      return;
    } else {
      setNameError('');
    }
    if (!email.trim()) {
      setEmailError('Please enter your email');
      return;
    } else {
      setEmailError('');
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    } else {
      setEmailError('');
    }
    if (!message.trim()) {
      setMessageError('Please enter your message');
      return;
    } else {
      setMessageError('');
    }
    // Handle form submission if all inputs are valid
    setSuccessMessage('Your message has been sent successfully!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 2000); // Clear success message after 3 seconds
    // Clear input fields
    setName('');
    setEmail('');
    setMessage('');
  };

  const validateEmail = (email) => {
    // Simple email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg mt-20 flex" > {/* Form background image */}
          <div className="w-2/3 pr-8"> {/* Adjusted width and added pr-8 for right padding */}
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Rowdies, sans-serif' }}>Contact Us</h2> {/* Increased size and boldness and added font family */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`bg-white border border-gray-300 text-gray-900 placeholder-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${nameError ? 'border-red-500' : ''}`}
                  placeholder="Enter your name"
                />
                {nameError && <p className="mt-2 text-sm text-red-600">{nameError}</p>}
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  className={`bg-white border border-gray-300 text-gray-900 placeholder-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${emailError ? 'border-red-500' : ''} ${validateEmail(email) && !emailError ? 'border-green-500' : ''}`}
                  placeholder="Enter your email"
                />
                {!emailError && validateEmail(email) && <p className="mt-2 text-sm text-green-600">Email is valid.</p>}
                {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`bg-white border border-gray-300 text-gray-900 placeholder-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none h-24 w-full ${messageError ? 'border-red-500' : ''}`}
                  placeholder="Enter your message"
                ></textarea>
                {messageError && <p className="mt-2 text-sm text-red-600">{messageError}</p>}
              </div>
              <button
                type="submit"
                className="button"
              >
                Send Message
              </button>
            </form>
            {successMessage && (
              <p className="mt-2 text-sm text-green-600">{successMessage}</p>
            )}
          </div>
          <div className="w-3/5 flex flex-col justify-center items-center border-l-2 border-blue-800 pl-8"> {/* Adjusted width and added border */}
            <div className="text-left mb-4"> {/* Changed to text-left and added margin-bottom */}
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Rowdies, sans-serif' }}>Let's Get in Touch</h3> {/* Increased size, boldness, and added font family */}
              <p className="text-sm text-gray-600 font-bold">"Got a question or need assistance? We're here to help! Contact us for anything related to our products or your shopping experience. We're committed to providing excellent customer service and ensuring your satisfaction. "</p> {/* Your additional text */}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
