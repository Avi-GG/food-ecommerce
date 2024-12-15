import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ShippingAddressPage = () => {
  // Define state for current addresses and the form
  const [addresses, setAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({
    name: 'Avi Gupta',
    line1: '696/9 Saket colony, Vishwakarma Chowk',
    line2: '',
    city: 'Greater Noida',
    state: 'Uttar Pradesh',
    zip: '251001',
    phone: '6969696969'
  });

  const navigate = useNavigate();
  // Load addresses (this could be from Redux or an API)
  useEffect(() => {
    // Assuming we load the addresses from localStorage or an API
    const savedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
    setAddresses(savedAddresses);
  }, []);

  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }, [addresses]);

  // Handle form change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit (add or update address)
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update the existing address
      const updatedAddresses = addresses.map((address) =>
        address.name === currentAddress.name ? currentAddress : address
      );
      setAddresses(updatedAddresses);
    } else {
      // Add new address
      const newAddress = { ...currentAddress };
      if (addresses.length === 0) {
        // Set this as the default address
        setAddresses([newAddress]);
      } else {
        setAddresses([newAddress, ...addresses]);
      }
    }

    // Save to localStorage (or Firestore if applicable)
    localStorage.setItem('addresses', JSON.stringify(addresses));

    // Reset form
    setIsEditing(false);
    setCurrentAddress({
      name: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
      phone: ''
    });
  };

  // Handle edit address
  const handleEdit = (address) => {
    setIsEditing(true);
    setCurrentAddress(address);
  };

  // Handle delete address
  const handleDelete = (address) => {
    const updatedAddresses = addresses.filter(
      (item) => item.name !== address.name
    );
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
  };

  return (
    <div className="container mx-auto p-4">
        <div className='w-8/12 mx-auto my-4 bg-gray-50 shadow-lg   border-2 border-transparent rounded-md p-4'>
            <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>

            {/* Default Address */}
            <div className="mb-4">
                {addresses.length > 0 ? (
                <div>
                    <h3 className="text-lg font-semibold">Default Address</h3>
                    <div className="border p-4 rounded-md">
                    <p>{addresses[0].name}</p>
                    <p>{addresses[0].line1}</p>
                    <p>{addresses[0].line2}</p>
                    <p>{addresses[0].city}, {addresses[0].state} - {addresses[0].zip}</p>
                    <p>{addresses[0].phone}</p>
                    <button
                        className="text-blue-500"
                        onClick={() => handleEdit(addresses[0])}
                    >
                        Edit
                    </button>
                    <button
                        className="text-red-500 ml-4"
                        onClick={() => handleDelete(addresses[0])}
                    >
                        Delete
                    </button>
                    </div>
                </div>
                ) : (
                <p>No default address set. Add a new address.</p>
                )}
            </div>

            {/* Address Form */}
            <div className="mt-4">
                <h3 className="text-lg font-semibold">{isEditing ? 'Edit Address' : 'Add Address'}</h3>
                <form  className="space-y-4">
                <input
                    type="text"
                    name="name"
                    value={currentAddress.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="line1"
                    value={currentAddress.line1}
                    onChange={handleInputChange}
                    placeholder="Address Line 1"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="line2"
                    value={currentAddress.line2}
                    onChange={handleInputChange}
                    placeholder="Address Line 2 (optional)"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="city"
                    value={currentAddress.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="state"
                    value={currentAddress.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="zip"
                    value={currentAddress.zip}
                    onChange={handleInputChange}
                    placeholder="ZIP Code"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    value={currentAddress.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full p-2 border rounded"
                    required
                />

                    <span className="flex justify-between gap-4">
                <button
                    type="submit"
                    onClick={handleFormSubmit}
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    {isEditing ? 'Update Address' : 'Add Address'}
                </button>
                <button
                    type="submit"
                    onClick={() => navigate("/checkout/orderSummary")}
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    Next
                </button>
                </span>
                </form>
            </div>
      </div>
    </div>
  );
};

export default ShippingAddressPage;
