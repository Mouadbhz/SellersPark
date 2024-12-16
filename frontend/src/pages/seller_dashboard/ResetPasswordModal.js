import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer'; // Adjust the path as per your project structure
import DecorativeImage from '../images/password.png'; // Adjust the path as per your project structure
import backgroundImage from '../../pages/images/white.jpeg'; // Adjust the path as per your project structure
import { FiUser, FiLock, FiTrash2 } from 'react-icons/fi'; // Import the desired icons from react-icons



const ResetPasswordModalV = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Password updated:', { newPassword });
    // Add your password update logic here
  };

  return (
    <>
      <div className="flex min-h-screen " style={{
      marginTop:'40px'
    }}>        <div className="flex flex-col  bg-white border-r border-gray-200 p-4"
    style={{
        width:'195px',
        backgroundImage: `url(${backgroundImage})`
      }}>
          <h2 className="text-xl font-bold mb-6 text-gray-800">Dashboard</h2>
          <nav className="flex flex-col space-y-2">
          <Link to="/settings-seller" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded">
              <FiUser className="mr-2" /> Profile Settings
            </Link>
            <Link to="/change-password-seller" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded">
              <FiLock className="mr-2" /> change Password
            </Link>
            <Link to="/confirm-delete-seller" className="flex items-center text-red-700 hover:bg-red-200 p-2 rounded">
              <FiTrash2 className="mr-2" /> Delete Account
            </Link>
          </nav>
        </div>
        <div className="flex-grow p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 flex">
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Change Password</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Update Password
                </button>
              </form>
            </div>
            <div className="flex-shrink-0 ml-8">
              <img src={DecorativeImage} alt="Decorative" className="w-64 h-64 object-cover rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPasswordModalV;
