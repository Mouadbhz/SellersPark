import React, { useState } from 'react';
import Footer from "../../components/footer/footer";
import reportImage from "../../pages/images/report.jpg"; // Import the image for reporting
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const ReportSellerPage = () => {
  const  {vendorId} = useParams();
  console.log(vendorId);
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const reportReasons = [
    "Fraudulent activity",
    "Inappropriate behavior",
    "Violation of terms",
    "Poor product quality",
    "Scam",
    "Harassment",
    "Other"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let reason = selectedReason;
    if (selectedReason === 'Other') {
      reason = otherReason;
    }
    if (reason) {
      const authToken = localStorage.getItem("access");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authToken}`,
          Accept: "application/json",
        },
      };
      
      const body = JSON.stringify({
        client_id: parseInt(localStorage.getItem("idClient")), // Assuming you have stored client_id in localStorage
        vendor_id: vendorId, // Assuming vendorId is defined elsewhere
        notification_type: "CLIENT_REPORT",
        message: reason,
      });
  
      try {
        const response = await axios.post(`/api/report-seller/`, body, config);
        console.log('Report submitted successfully:', response.data);
        navigate('/client-dashboard');
      } catch (error) {
        console.error('Error submitting report:', error);
      }
    } else {
      alert("Please select a reason for reporting.");
    }
  };
  
  


  return (
    <>
      <div className="" style={{marginTop:'40px'}}>
        <h2 className="mt-20 ml-44 text-left text-3xl font-bold font-serif">Report Seller</h2>
        <div className="mt-5 flex bg-white p-6 rounded-md shadow-lg max-w-3xl mx-auto">
          <div className="flex-1">
            <form onSubmit={handleSubmit}>
              <h2 className="text-lg font-semibold mb-4">Select a reason for reporting the seller:</h2>
              <ul className="mb-6">
                {reportReasons.map((reason, index) => (
                  <li key={index} className="mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="reportReason"
                        value={reason}
                        onChange={() => setSelectedReason(reason)}
                        className="mr-2"
                      />
                      {reason}
                    </label>
                  </li>
                ))}
              </ul>
              {selectedReason === 'Other' && (
                <div className="mb-4">
                  <label htmlFor="otherReason" className="block font-semibold mb-2">Enter the reason:</label>
                  <input
                    type="text"
                    id="otherReason"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    placeholder="Enter the reason"
                  />
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <Link to='client-dashboard'>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedReason('');
                    setOtherReason('');
                  }}
                  className="bg-gray-500 text-white rounded-md px-4 py-2 font-semibold hover:bg-gray-700"
                >
                  Cancel
                </button>
                </Link>
                <button
                  type="submit"
                  className="bg-red-500 text-white rounded-md px-4 py-2 font-semibold hover:bg-red-700"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img
              className="w-80 rounded-lg"
              src={reportImage}
              alt="Report Seller"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReportSellerPage;
