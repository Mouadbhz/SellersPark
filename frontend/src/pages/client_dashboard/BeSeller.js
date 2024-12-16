import React, { useState } from "react";
// import { Link } from "react-router-dom";

import "./sellersign.css";

const BeSeller = () => {
  // const [step, setStep] = useState(1);
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [phone, setPhone] = useState("");
  // const [address, setAddress] = useState("");
  // const [description, setDescription] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [firstNameError, setFirstNameError] = useState("");
  // const [lastNameError, setLastNameError] = useState("");
  // const [emailError, setEmailError] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  // const [phoneError, setPhoneError] = useState("");
  // const [addressError, setAddressError] = useState("");
  // const [descriptionError, setDescriptionError] = useState("");
  // const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // const validateFirstName = () => {
  //   if (!firstName.trim()) {
  //     setFirstNameError("First name is required");
  //     return false;
  //   }
  //   setFirstNameError("");
  //   return true;
  // };

  // const validateLastName = () => {
  //   if (!lastName.trim()) {
  //     setLastNameError("Last name is required");
  //     return false;
  //   }
  //   setLastNameError("");
  //   return true;
  // };

  // const validateEmail = () => {
  //   if (!email.trim()) {
  //     setEmailError("Email is required");
  //     return false;
  //   }
  //   if (!validateEmailFormat(email)) {
  //     setEmailError("Please enter a valid email address");
  //     return false;
  //   }
  //   setEmailError("");
  //   return true;
  // };

  // const validateEmailFormat = (email) => {
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return regex.test(email);
  // };

  // const validatePassword = () => {
  //   if (!password.trim()) {
  //     setPasswordError("Password is required");
  //     return false;
  //   }
  //   setPasswordError("");
  //   return true;
  // };

  // const validateConfirmPassword = () => {
  //   if (!confirmPassword.trim()) {
  //     setConfirmPasswordError("Confirm password is required");
  //     return false;
  //   }
  //   if (password !== confirmPassword) {
  //     setConfirmPasswordError("Passwords do not match");
  //     return false;
  //   }
  //   setConfirmPasswordError("");
  //   return true;
  // };

  // const validatePhone = () => {
  //   if (!phone.trim()) {
  //     setPhoneError("Phone number is required");
  //     return false;
  //   }
  //   setPhoneError("");
  //   return true;
  // };

  // const validateAddress = () => {
  //   if (!address.trim()) {
  //     setAddressError("Address is required");
  //     return false;
  //   }
  //   setAddressError("");
  //   return true;
  // };

  // const validateDescription = () => {
  //   if (!description.trim()) {
  //     setDescriptionError("Description is required");
  //     return false;
  //   }
  //   setDescriptionError("");
  //   return true;
  // };

  // const handleNext = () => {
  //   if (step === 1) {
  //     if (
  //       validateFirstName() &&
  //       validateLastName() &&
  //       validateEmail() &&
  //       validatePassword() &&
  //       validateConfirmPassword()
  //     ) {
  //       setStep(2);
  //     }
  //   } else if (step === 2) {
  //     if (validatePhone() && validateAddress() && validateDescription()) {
  //       setStep(3);
  //     }
  //   }
  // };

  // const handleBack = () => {
  //   setStep(step - 1);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic here
  //   console.log("Form submitted");
  // };


  const authToken = localStorage.getItem("access");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    contact: "",
    birth_day: "",
  });

// Inside handleChange function
const handleChange = (e) => {
  const updatedFormData = { ...formData, [e.target.name]: e.target.value };
  setFormData(updatedFormData);
  console.log("Updated formData:", updatedFormData);
};

// Inside handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();

  const clientId = parseInt(localStorage.getItem("idClient"));
  if (clientId) {
    await createUserVendor(clientId);
  }
  console.log("formData:", formData);
};


  console.log("idClient "+localStorage.getItem("idClient"));
  console.log("typeof "+typeof localStorage.getItem("idClient"));
  console.log("id :"+ parseInt(localStorage.getItem("idClient")));


  const createUserVendor = async (clientId) => {
    const requestData = {
      ...formData,
      client: clientId,
    };
     console.log("formedata"+formData);
     console.log("requestData"+requestData);
    try {
      const response = await fetch(
        "/api/create/vendor/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${authToken}`,
            Accept: "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create vendor");
      }
      const vendorData = await response.json();
      console.log("Vendor created successfully:", vendorData);
    } catch (error) {
      console.error("Error creating vendor:", error.message);
    }
  };


  return (
<div>
      <div className="seller-container-signup active">
        <div className="seller-form-container-signup">
          <form onSubmit={handleSubmit}>
            <h1 className="seller-signup-title">Be Seller </h1>
            <div className="input-group">
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter your first name"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
            </div>
            <div className="input-group">
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter your contact number"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </div>
            <div className="input-group">
              <input
                type="date"
                id="birth_day"
                name="birth_day"
                value={formData.birth_day}
                onChange={handleChange}
              />
            </div>
            <div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </form>
          <div className="seller-join-us-container">
            <h1 className="seller-join-us-title">Elevate Your Business</h1>
            <p className="seller-join-us-text">
              Join our community today and make every purchase a breeze! Your
              shopping experience awaits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeSeller;
