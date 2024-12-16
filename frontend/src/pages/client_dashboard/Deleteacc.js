import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer'; // Adjust the path as per your project structure
import backgroundImage from '../../pages/images/white.jpeg'; // Adjust the path as per your project structure
import { FiUser, FiLock, FiTrash2 } from 'react-icons/fi'; // Import the desired icons from react-icons


const DeleteAccountPage = () => {
  const handleDeleteConfirmation = () => {
    // Perform the account deletion logic here
    console.log('Account deleted');
  };

  return (
    <>
      <div className="flex min-h-screen " style={{
      marginTop:'40px'
    }}>        <div className="flex flex-col  bg-white border-r border-gray-200 p-4"
    style={{
        width:'195px',
        backgroundImage: `url(${backgroundImage})`,

      }}>
          <h2 className="text-xl font-bold mb-6 text-gray-800">Dashboard</h2>
          <nav className="flex flex-col space-y-2">
          <Link to="/settings-client" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded">
              <FiUser className="mr-2" /> Profile Settings
            </Link>
            <Link to="/change-password" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded">
              <FiLock className="mr-2" /> change Password
            </Link>
            <Link to="/confirm-delete" className="flex items-center text-red-700 hover:bg-red-200 p-2 rounded">
              <FiTrash2 className="mr-2" /> Delete Account
            </Link>
          </nav>
        </div>
        <div className="flex-grow p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 flex">
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Delete Account</h2>
              <p className="text-gray-700">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <button
                onClick={handleDeleteConfirmation}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300 mt-4"
              >
                Confirm Account Deletion
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DeleteAccountPage;
