import { useEffect, useState } from "react";
import { addCartAPI, getCartAPI, updateCartItemAPI } from "../services/allAPI";
import { getWishlistAPI } from "../services/allAPI";
import { deleteWishlistAPI } from "../services/allAPI";
import { Link } from "react-router-dom";

function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);

  const fetchWishlistProducts = async () => {
    try {
      const wishlistItems = await getWishlistAPI();
      console.log(wishlistItems.data);
      setWishlistItems(wishlistItems.data || []);
    } catch (err) {
      console.error("Failed to fetch wishlist products", err);
    }
  };

  useEffect(() => {
    fetchWishlistProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      const cartResponse = await getCartAPI();
      const existingCartItem = cartResponse.data.find(
        (item) => item.id === product.id
      );

      console.log("Existing Cart Item: ", existingCartItem);

      if (existingCartItem) {
        const updatedQuantity = existingCartItem.quantity + 1;

        const updatePayload = {
          ...existingCartItem,
          quantity: updatedQuantity,
        };
        await updateCartItemAPI(existingCartItem.id, updatePayload);
      } else {
        const addPayload = {
          ...product,
          quantity: 1,
        };
        await addCartAPI(addPayload);
      }

      console.log("Cart updated successfully");
      removeFromWishlist(product.id);
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      const removeCartItem = await deleteWishlistAPI(id);
      console.log(removeCartItem.data);
      fetchWishlistProducts();
    } catch (err) {
      console.error("Failed to remove item from wishlist:", err);
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto mt-40  p-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-2">Your Wishlist</h1>
          <p className="text-gray-600">Your wishlist is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
          >
            <Link to={`/view/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
            </Link>

            <div className="p-4">
              <Link to={`/view/${product.id}`}>
                <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4">${product.price}</p>
              </Link>
              <div className="flex justify-between">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;
