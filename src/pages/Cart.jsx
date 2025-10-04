import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal } = useApp();

  const handleQuantityChange = (productId, size, newQuantity) => {
    updateCartQuantity(productId, size, newQuantity);
  };

  const shippingCost = getCartTotal() > 0 ? 15 : 0;
  const totalCost = getCartTotal() + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="text-2xl font-light text-gray-900 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-8">
              Discover our luxury collection and add some stylish pieces to your
              cart.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-luxury-green text-white px-8 py-3 font-semibold hover:bg-luxury-green/90 transition-colors duration-300 rounded-lg shadow-lg hover:shadow-xl"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-light text-dark-gray mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center border-b border-gray-100 last:border-b-0 p-6 hover:bg-gray-50 transition-colors duration-300"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 ml-6">
                    <h3 className="font-medium text-dark-gray mb-1 text-lg">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                    {item.size && (
                      <p className="text-sm text-gray-600 mb-2">
                        Size: {item.size}
                      </p>
                    )}
                    <p className="text-lg font-semibold text-luxury-green">
                      ${item.price}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3 mr-6">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.id,
                          item.size,
                          item.quantity - 1
                        )
                      }
                      className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-luxury-gold transition-colors duration-300"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 12H4"
                        />
                      </svg>
                    </button>
                    <span className="w-12 text-center font-medium text-lg">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.id,
                          item.size,
                          item.quantity + 1
                        )
                      }
                      className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-luxury-gold transition-colors duration-300"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right mr-6">
                    <p className="text-lg font-semibold text-luxury-green">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300 p-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-dark-gray mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>
                    Subtotal (
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                {getCartTotal() > 200 && (
                  <div className="flex justify-between text-luxury-green">
                    <span>Shipping Discount</span>
                    <span>-${shippingCost.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold text-dark-gray">
                    <span>Total</span>
                    <span>
                      $
                      {(getCartTotal() > 200
                        ? getCartTotal()
                        : totalCost
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {getCartTotal() < 200 && (
                <div className="bg-luxury-gold/10 border border-luxury-gold/20 rounded-lg p-3 mb-4">
                  <p className="text-sm text-luxury-gold text-center">
                    Add ${(200 - getCartTotal()).toFixed(2)} more for free
                    shipping!
                  </p>
                </div>
              )}

              <button className="w-full bg-luxury-gold text-white py-4 font-semibold hover:bg-luxury-gold/90 transition-colors duration-300 rounded-lg shadow-lg hover:shadow-xl mb-4 text-lg">
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="w-full border-2 border-luxury-green text-luxury-green py-3 font-semibold text-center block hover:bg-luxury-green hover:text-white transition-colors duration-300 rounded-lg"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
