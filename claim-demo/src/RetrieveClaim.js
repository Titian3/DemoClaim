import React, { useState } from 'react';

function RetrieveClaim() {
  const [customerId, setCustomerId] = useState('');
  const [claimDetails, setClaimDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`https://localhost:7278/Claims?customerId=${customerId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setClaimDetails(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching claim:', error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-5">Retrieve Claim Details</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text" 
            value={customerId} 
            onChange={(e) => setCustomerId(e.target.value)} 
            placeholder="Enter Customer ID" 
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Retrieve</button>
      </form>

      {loading && <p>Loading...</p>}

      {claimDetails && (
        <div>
          <h2 className="text-xl font-bold my-4">Claim Details</h2>
          <p><strong>First Name:</strong> {claimDetails.firstName}</p>
          <p><strong>Last Name:</strong> {claimDetails.lastName}</p>
          <p><strong>Customer ID:</strong> {claimDetails.customerId}</p>
          <p><strong>Claim Details:</strong> {claimDetails.claimDetails}</p>
          {claimDetails.photoUrl && (
            <div>
              <p><strong>Claim Photo:</strong></p>
              <img src={claimDetails.photoUrl} alt="Claim" className="my-3 max-w-xs mx-auto" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RetrieveClaim;
