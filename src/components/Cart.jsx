import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemList from './ItemList';
import { clearCart } from '../utils/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  // Get cart items from Redux store
  const cartItems = useSelector((store) => store.cart.items);

  // Initialize useDispatch for dispatching actions
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Clear cart handler
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item?.card?.info?.price || item?.card?.info?.defaultPrice) * item.count,
    0
  );

  return (
    <div className="text-center m-4 p-4 min-h-[68vh]">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="w-8/12 m-auto">
        {/* Clear Cart Button */}
        {cartItems?.length > 0 && (
          <button
            className="p-2 m-2 bg-red-700 text-white rounded-lg hover:bg-gray-800"
            onClick={handleClearCart}
          >
            Clear
          </button>
        )}

        {/* Conditional Rendering for Empty and Populated Cart */}
        {cartItems?.length === 0 ? (
          <h1 className="text-lg font-medium mt-4">
            Cart is empty. Add items to the cart!
          </h1>
        ) : (
          <div>
            <div className="p-4 border rounded-lg shadow-md">
              <h1 className="text-lg font-bold mb-2">Price Details</h1>

              {/* Total Items */}
              <p className="mb-2">
                Total Items: <span className="font-semibold">{totalItems}</span>
              </p>
              <hr className="my-2" />

              {/* Item List */}
              {cartItems.map((item) => {
                console.log(item);
                
                const price = Number(item?.card?.info?.price || item?.card?.info?.defaultPrice)/100 || 0; // Safeguard: Convert to number or default to 0
                const count = Number(item.count) || 0;

                const itemTotal = price * count; // Total for this item

                return (
                  <p key={item?.card?.info?.id} className="text-gray-700">
                    {item.name}: ₹{price} × {count} = ₹{itemTotal}
                  </p>
                );
              })}

              <hr className="my-2" />

              {/* Calculations */}
              <p className='justify-between flex'>
                Total MRP{" "}
                
                <span className="font-semibold">
                  ₹
                  {(totalPrice/100).toFixed(2)}
                </span>
              </p>

              <p className='justify-between flex '>
                Discount on MRP{" "}(10% off)
                
                <span  className="text-green-600 font-semibold">
                  <span className='text-sm'>
                    -  ₹
                    {(
                      0.1 *
                      totalPrice/100
                    ).toFixed(2)}
                  </span>{" "}
                  
                </span>
              </p>

              <hr className="my-2" />

              <p className="text-lg font-bold">
                Total Amount:{" "}
                <span className="text-black">
                  ₹
                  {(
                    totalPrice /100 * 0.9
                  ).toFixed(2)}
                </span>
              </p>

              <hr className="my-2" />

              {/* Checkout Button */}
              <button onClick={()=> (navigate("/checkout/userAddress"))} className="mt-4 p-2 bg-black text-white rounded-lg hover:bg-gray-800">
                Checkout
              </button>
            </div>

            <ItemList items={cartItems} showRemoveBtn={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;