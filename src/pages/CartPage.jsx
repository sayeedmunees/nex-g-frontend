import { useEffect, useState } from "react";
import { getCartAPI } from "../services/allAPI";
import { deleteCartAPI } from "../services/allAPI";
import { Link } from "react-router-dom";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  const removeFromCart = async (id) => {
    try {
      const removeCartItem = await deleteCartAPI(id);
      console.log(removeCartItem.data);
      fetchCartProducts();
    } catch (err) {
      setError("Failed to fetch products");
    }
  };

  const fetchCartProducts = async () => {
    try {
      const cartItems = await getCartAPI();
      console.log(cartItems.data);
      setCartItems(cartItems.data || []);
    } catch (err) {
      setError("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto mt-40  p-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
          <p className="text-gray-600">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow border border-gray-200"
          >
            <div className="flex items-center space-x-4">
              <Link to={`/view/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
              </Link>
              <div>
                <Link to={`/view/${item.id}`}>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center text-xl font-semibold">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage;
