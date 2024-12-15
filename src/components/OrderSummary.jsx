import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CDN_URL } from '../utils/constants';

const OrderSummary = () => {
  const [shippingAddress, setShippingAddress] = useState(null);
  const cartItems = useSelector((state) => state.cart.items); // Assuming the cart items are stored in Redux state
  const navigate = useNavigate();

  useEffect(() => {
    // Load the shipping address (you can retrieve this from your state or localStorage)
    const savedAddress = JSON.parse(localStorage.getItem('addresses'))?.[0] || null;
    setShippingAddress(savedAddress);
  }, [])
  
  const deliveryCharge = 50;
  

  const handleOrderSubmit = () => {
    // Handle order submission (e.g., save to database, call API, etc.)
    console.log('Order submitted');
    // Redirect to confirmation or thank you page
    navigate('/checkout/orderSuccessful');
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item?.card?.info?.price || item?.card?.info?.defaultPrice) * item.count,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      {/* Cart Items */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Items</h3>
        {cartItems.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4">
                {console.log(item)}
                <img
                  src={CDN_URL + item?.card?.info?.imageId} // Assuming the product image URL is available in the item
                  alt={item.name}
                  className="w-20 h-20 object-cover mr-4 rounded-lg"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className='font-semibold'>Quantity: {item.count}</p>
                  <p>₹ {(item?.card?.info?.price || item?.card?.info?.defaultPrice) * item.count /100}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pricing Details */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Price Details</h3>
        <div className="border p-4 rounded-md">
          <div className="flex justify-between mb-2">
            <span>MRP</span>
            <span>₹ {(totalPrice/100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Discount</span>
            <span className='text-sm text-green-700'>- ₹ {(0.1*totalPrice/100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Delivery Charge</span>
            <span>₹ {deliveryCharge}</span>
          </div>
          <div className="flex justify-between font-semibold mt-4">
            <span>Total Amount</span>
            <span>₹ {((totalPrice/100)-(0.1*totalPrice/100)+deliveryCharge).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
        {shippingAddress ? (
          <div className="border p-4 rounded-md">
            <p>{shippingAddress.name}</p>
            <p>{shippingAddress.line1}</p>
            {shippingAddress.line2 && <p>{shippingAddress.line2}</p>}
            <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.zip}</p>
            <p>{shippingAddress.phone}</p>
          </div>
        ) : (
          <p>No shipping address set. Please add one.</p>
        )}
      </div>

      {/* Order Button */}
      <div className="text-center">
        <button
          onClick={handleOrderSubmit}
          className="bg-blue-500 text-white px-8 py-2 rounded-full"
          disabled={!shippingAddress || cartItems.length === 0}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
