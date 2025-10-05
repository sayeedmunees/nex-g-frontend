import { Link } from "react-router-dom";
import { addCartAPI } from "../services/allAPI";
import { addWishlistAPI } from "../services/allAPI";

function ProductCard({ product }) {
  const addToWishlist = async (product) => {
    try {
      const result = await addWishlistAPI(product);
      console.log(result.data);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const addToCart = async (product) => {
    try {
      const result = await addCartAPI(product);
      console.log(result.data);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const handleWishlistToggle = () => {
    addToWishlist(product);
  };

  return (
    <Link to={`/view/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
          <p className="text-gray-600 mb-2">${product.price}</p>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
            >
              Add to Cart
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleWishlistToggle();
              }}
              className={`p-2 rounded-full transition-colors `}
              //   ${
              //   inWishlist
              //     ? "bg-red-100 text-red-600 hover:bg-red-200"
              //     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              // }`}
            >
              ❤️
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
