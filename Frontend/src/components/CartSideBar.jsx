import React, { useState } from "react";
import { createOrder } from "../services/api";

const CartSideBar = ({
  cartItems,
  isCartOpen,
  setIsCartOpen,
  updateQuantity,
  removeFromCart,
  setCartItems
}) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce( (sum, item) => sum + item.price * item.quantity, 0 );

  //  Checkout → Backend API
  const handleCheckout = async () => {
    try {
      setLoading(true);
      const orderItems = cartItems.map(item => ({
      product: item,        //  FULL product object
      qty: item.quantity    //  quantity → qty
    }));

    await createOrder(orderItems); 
     
      setCartItems([]);
      setShowSuccess(true);
    } catch (error) {
      alert("Order failed. Try again");
    } finally {
      setLoading(false);
    }
  };
   return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}`} >
      <div className="p-4 h-full flex flex-col justify-between">
        
        {/*  SUCCESS SCREEN */}
        {showSuccess ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 bg-green-500 flex items-center justify-center text-white text-4xl rounded-full mb-4">
              ✓
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Payment Successful
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for ordering.
              <br />
              Your payment is successfully completed.
            </p>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                setShowSuccess(false);
                setIsCartOpen(false);
              }}
            >
              Go To Home Page
            </button>
          </div>
        ) : (
          <>
            {/*  CART CONTENT */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-purple-800">
                  Your Cart
                </h2>
                <button className="text-gray-600 text-xl" onClick={() => setIsCartOpen(false)}> ✕ </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center mt-10 text-center">
                  <img src="cartisempty.jpeg" alt="empty cart" className="w-40 h-40 mb-4"/>
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Your Cart Is Empty
                  </h2>
                  <button onClick={() => setIsCartOpen(false)} className="bg-purple-600 text-white px-5 py-2 rounded-lg">
                    Shop Now
                  </button>
                </div>
              ) : (
                <div className="overflow-y-auto max-h-[60vh]">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex mb-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-contain mr-4"/>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold"> {item.name} </h3>
                        <p className="text-sm"> ₹{item.price} × {item.quantity} </p>

                        <div className="flex items-center mt-2">
                          <button className="px-2 py-1 bg-purple-300 rounded"
                            onClick={() => updateQuantity(item._id, item.quantity - 1) }> − </button>

                          <span className="mx-2">{item.quantity}</span>

                          <button className="px-2 py-1 bg-purple-300 rounded"
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}> + </button>

                          <button className="ml-4 text-red-500" onClick={() => removeFromCart(item._id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/*CHECKOUT */}
            <div className="border-t pt-4">
              <p className="text-lg font-semibold">
                Total: ₹{totalPrice.toFixed(2)}
              </p>

              <button
                className="w-full bg-purple-600 text-white py-2 rounded-lg mt-4 hover:bg-purple-700 transition disabled:opacity-50"
                disabled={cartItems.length === 0 || loading}
                onClick={handleCheckout}>
                {loading ? "Processing..." : "Proceed to Checkout"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSideBar;