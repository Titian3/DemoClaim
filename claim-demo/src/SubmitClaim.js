import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

function SubmitClaim() {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    CustomerId: '',
    ClaimDetails: '',
    Photo: null
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('FirstName', formData.FirstName);
    data.append('LastName', formData.LastName);
    data.append('CustomerId', formData.CustomerId);
    data.append('ClaimDetails', formData.ClaimDetails);
    data.append('Photo', formData.Photo);

    try {
      const response = await fetch('https://localhost:7278/Claims', {
        method: 'POST',
        body: data
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('Submission successful:', result);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };


  return (
    <div className="App">
      <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-5">Claim Submission</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input name="FirstName" value={formData.FirstName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="First Name" />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input name="LastName" value={formData.LastName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Last Name" />
          </div>

          <div className="mb-4">
            <label htmlFor="customerId" className="block text-gray-700 text-sm font-bold mb-2">
              Customer ID
            </label>
            <input name="CustomerId" value={formData.CustomerId} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="customerId" type="text" placeholder="Customer ID" />
          </div>

          <div className="mb-4">
            <label htmlFor="claimDetails" className="block text-gray-700 text-sm font-bold mb-2">
              Claim Details
            </label>
            <textarea name="ClaimDetails" value={formData.ClaimDetails} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="claimDetails" placeholder="Enter claim details"></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="photoUpload" className="block text-gray-700 text-sm font-bold mb-2">
              Upload Photo
            </label>
            <input name="Photo" onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="photoUpload" type="file" />
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitClaim;
