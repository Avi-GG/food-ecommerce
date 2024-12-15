import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccessful = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center flex-col text-center p-8">
      {/* Thank You Image */}
      <img
        src="https://www.sendx.io/hubfs/Email-Messages-for-Order-Confirmation-Page-v3.png" // Replace with an actual image URL
        alt="Thank You"
        className="w-full max-w-xl mb-8"
      />
      
      {/* Success message */}
      <h1 className="text-2xl font-semibold mb-4">Thank you for your order!</h1>
      <p className="text-lg mb-6">Your order has been successfully placed. We will notify you once it's on its way.</p>

      {/* Button to go back to home */}
      <button
        onClick={goHome}
        className="px-8 py-3 bg-blue-500 text-white rounded-lg"
      >
        Go to Home
      </button>
    </div>
  );
};

export default OrderSuccessful;
