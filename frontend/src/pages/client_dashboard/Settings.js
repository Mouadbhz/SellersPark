import React, { useState, useRef } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer'; // Adjust the path as per your project structure
import backgroundImage from '../../pages/images/white.jpeg'; // Adjust the path as per your project structure
import { FiUser, FiLock, FiTrash2 } from 'react-icons/fi'; // Import the desired icons from react-icons


const SettingsClient = () => {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [username, setUsername] = useState('johndoe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [address, setAddress] = useState('123 Main Street');
  const [dob, setDob] = useState('1990-01-01');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', { firstName, lastName, username, email, address, dob, phoneNumber, profileImage });
    setEditMode(false);
  };

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const renderProfileField = (label, value, onChange, type = 'text') => (
    <div className="mb-4">
      <label htmlFor={label.toLowerCase()} className="block text-gray-700">{label}</label>
      <input
        type={type}
        id={label.toLowerCase()}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        disabled={!editMode || (label.toLowerCase() === 'email')}
      />
    </div>
  );

  const handlePhoneNumberChange = (e) => {
    const inputPhoneNumber = e.target.value.replace(/\D/g, '');
    if (inputPhoneNumber.length <= 10) {
      setPhoneNumber(inputPhoneNumber);
    }
  };

  return (
    <>
      <div className="flex min-h-screen " style={{
      marginTop:'40px'
    }}>        <div className="flex flex-col  bg-white border-r border-gray-200 p-4"
    style={{
      backgroundImage: `url(${backgroundImage})`,

        width:'195px',
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
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </div>
                {editMode && (
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    onClick={handleImageClick}
                  >
                    <FaEdit />
                  </button>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>
            <div className="ml-8 flex-grow">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Profile Settings</h2>
              <form onSubmit={handleSubmit}>
                {renderProfileField("First Name", firstName, (e) => setFirstName(e.target.value))}
                {renderProfileField("Last Name", lastName, (e) => setLastName(e.target.value))}
                {renderProfileField("Email", email, (e) => setEmail(e.target.value))}
                {renderProfileField("Address", address, (e) => setAddress(e.target.value))}
                {renderProfileField("Date of Birth", dob, (e) => setDob(e.target.value), 'date')}
                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    maxLength={10}
                    disabled={!editMode}
                  />
                </div>
                {editMode && (
                  <button                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Update Profile
                </button>
                )}
              </form>
              {!editMode && (
                <button
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SettingsClient;















// ---------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const SettingsClient = () => {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [user, setUser] = useState(null); // Initialize user state as null

//   const [updatedUser, setUpdatedUser] = useState(null);
//   const [imageFile, setImageFile] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const authToken = localStorage.getItem("access");
//         if (authToken) {
//           const config = {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `JWT ${authToken}`,
//               Accept: "application/json",
//             },
//           };
//           // Fetch user data from backend
//           const response = await axios.get("/auth/users/me/", config);
//           setUser(response.data); // Update user state with fetched data
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//     fetchUser(); // Call fetchUser function when component mounts
//   }, []); // Empty dependency array ensures useEffect runs only once when the component mounts

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//   };

//   console.log("user");
//   console.log(user);

//   // const handleInputChange = (e) => {
//   //   setUpdatedUser({
//   //     ...updatedUser,
//   //     [e.target.name]: e.target.value,
//   //   });
//   // };

//   // const handleUpdate = async () => {
//   //   try {
//   //     const authToken = localStorage.getItem('access');
//   //     if (authToken && updatedUser) {
//   //       const config = {
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //           Authorization: `JWT ${authToken}`,
//   //           Accept: 'application/json',
//   //         },
//   //       };
//   //       // Send PUT request to update user information
//   //       await axios.put('/auth/users/me/', updatedUser, config);
//   //       alert('User information updated successfully!');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error updating user:', error);
//   //     alert('Failed to update user information. Please try again.');
//   //   }
//   // };

//   const handleInputChange = (e) => {
//     setUpdatedUser({
//       ...updatedUser,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImageChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const handleUpdate = async () => {
//     try {
//       const authToken = localStorage.getItem("access");
//       if (authToken && updatedUser) {
//         const formData = new FormData();
//         formData.append(
//           "first_name",
//           updatedUser.first_name || user.first_name
//         );
//         formData.append("last_name", updatedUser.last_name || user.last_name);
//         formData.append("email", updatedUser.email || user.email);
//         if (imageFile) {
//           formData.append("image", imageFile);
//         }

//         const config = {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `JWT ${authToken}`,
//             Accept: "application/json",
//           },
//         };

//         await axios.put("/auth/users/me/", formData, config);
//         alert("User information updated successfully!");
//       }
//     } catch (error) {
//       console.error("Error updating user:", error);
//       alert("Failed to update user information. Please try again.");
//     }
//   };

//   const renderContent = () => {
//     switch (selectedOption) {
//       case "profile":
//         return (
//           <div>
//             <h2>User Profile</h2>
//             {user && (
//               <div>
//                 <input
//                   type="text"
//                   name="first_name"
//                   placeholder="First Name"
//                   value={updatedUser?.first_name || user.first_name}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="text"
//                   name="last_name"
//                   placeholder="Last Name"
//                   value={updatedUser?.last_name || user.last_name}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={updatedUser?.email || user.email}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="text"
//                   name="address"
//                   placeholder="Address"
//                   value={updatedUser?.address || user.address}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="date"
//                   name="birth_day"
//                   placeholder="Birth Day"
//                   value={updatedUser?.birth_day || user.birth_day}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                 />
//                 <button onClick={handleUpdate}>Update</button>
//               </div>
//             )}
//           </div>
//         );
//       case "resetPassword":
//         return (
//           <div>
//             {/* Display reset password form here */}
//             <h2>Reset Password</h2>
//             {/* Add reset password form */}
//             <input type="email" placeholder="Email" />
//             <input type="password" placeholder="New Password" />
//             <button>Reset Password</button>
//           </div>
//         );
//       case "deleteAccount":
//         return (
//           <div>
//             {/* Display delete account button here */}
//             <h2>Delete Account</h2>
//             <button>Delete Account</button>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="main-content">
//       <h1>Settings</h1>
//       <p>Explore our latest products and discover something new!</p>

//       <div className="sidebar">
//         <button onClick={() => handleOptionClick("profile")}>Profile</button>
//         <button onClick={() => handleOptionClick("resetPassword")}>
//           Reset Password
//         </button>
//         <button onClick={() => handleOptionClick("deleteAccount")}>
//           Delete Account
//         </button>
//       </div>

//       <div className="content">{renderContent()}</div>
//     </div>
//   );
// };

// export default SettingsClient;
