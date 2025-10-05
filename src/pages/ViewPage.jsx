import React, { useEffect, useState } from "react";
import {
  FaRegHeart,
  FaCheck,
  FaTimes,
  FaInfoCircle,
  FaShoppingCart,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  addCartAPI,
  addWishlistAPI,
  deleteWishlistAPI,
  getCartAPI,
  getViewProductAPI,
  getWishlistAPI,
  updateCartItemAPI,
} from "../services/allAPI";

const ViewPage = () => {
  const { id } = useParams();
  console.log(id);

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const fetchViewProduct = async () => {
    try {
      setLoading(true);
      const result = await getViewProductAPI(id);
      console.log(result.data);
      setProductData(result.data || null);

      if (result.data) {
        setSelectedSize(result.data.size?.[0] || "");
        setActiveImage(result.data.image || "");
      }
    } catch (err) {
      setError("Failed to fetch product");
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchViewProduct();
    }
  }, [id]);

  const addToCart = async (product) => {
    setIsAddingToCart(true);
    try {
      const cartResponse = await getCartAPI();
      const existingCartItem = cartResponse.data.find(
        (item) => item.id === product.id
      );
      console.log("Existing Cart Item: ", existingCartItem);

      if (existingCartItem) {
        const updatedQuantity = existingCartItem.quantity + quantity;
        const updatePayload = {
          ...existingCartItem,
          quantity: updatedQuantity,
        };
        await updateCartItemAPI(existingCartItem.id, updatePayload);
        showNotification(`Item added to cart!`, "success");
      } else {
        const addPayload = {
          ...product,
          quantity: quantity,
        };
        await addCartAPI(addPayload);
        showNotification(`Item added to cart!`, "success");
      }

      console.log("Cart updated successfully");
    } catch (error) {
      console.error("Failed to update cart:", error);
      showNotification(
        "Failed to add item to cart. Please try again.",
        "error"
      );
    } finally {
      setIsAddingToCart(false);
    }
  };

  const addToWishlist = async (product) => {
    setIsUpdatingWishlist(true);
    try {
      const wishlistResponse = await getWishlistAPI();
      const existingWishlistItem = wishlistResponse.data.find(
        (item) => item.id === product.id
      );

      console.log("Existing Wishlist Item: ", existingWishlistItem);

      if (existingWishlistItem) {
        await deleteWishlistAPI(existingWishlistItem.id);
        showNotification("Removed from wishlist", "info");
      } else {
        const addPayload = {
          ...product,
          quantity: quantity,
        };
        await addWishlistAPI(addPayload);
        showNotification("Added to wishlist!", "success");
      }

      console.log("Wishlist updated successfully");
    } catch (error) {
      console.error("Failed to update wishlist:", error);
      showNotification("Failed to update wishlist. Please try again.", "error");
    } finally {
      setIsUpdatingWishlist(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading product...</div>
        </div>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">
            {error || "Product not found"}
          </div>
        </div>
      </div>
    );
  }

  const additionalImages = [
    productData.image,
    "https://images.pexels.com/photos/983497/pexels-photo-983497.jpeg",
    "https://images.pexels.com/photos/2866077/pexels-photo-2866077.jpeg",
    "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg",
  ];

  const discountPercentage =
    productData.oldPrice && productData.discountedPrice
      ? Math.round(
          ((parseFloat(productData.oldPrice) -
            parseFloat(productData.discountedPrice)) /
            parseFloat(productData.oldPrice)) *
            100
        )
      : 0;

  const renderRating = (rating) => {
    const validRating = rating || 0;
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < validRating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="mb-4 bg-white rounded-lg overflow-hidden border">
            <img
              src={activeImage || productData.image}
              alt={productData.title}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto p-2">
            {additionalImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(img)}
                className={`flex-shrink-0 w-20 h-20 border-2 rounded transition-all ${
                  activeImage === img
                    ? "border-gray-900 scale-105"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <img
                  src={img}
                  alt={`${productData.title} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {productData.title}
          </h1>
          <p className="text-lg text-gray-600 mb-4">by {productData.brand}</p>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {renderRating(productData.rating)}
              <span className="text-sm text-gray-600 ml-1">
                ({productData.rating || 0}/5)
              </span>
            </div>
            <span className="text-sm text-green-600">
              {productData.stock > 0
                ? `${productData.stock} in stock`
                : "Out of stock"}
            </span>
            {productData.isNew && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                NEW
              </span>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-bold text-gray-900">
                ${productData.discountedPrice || productData.price}
              </span>
              {productData.discountedPrice &&
                productData.discountedPrice < productData.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${productData.price}
                    </span>
                    <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                      -{discountPercentage}%
                    </span>
                  </>
                )}
            </div>
            {productData.oldPrice && (
              <p className="text-sm text-gray-500">
                Original price:{" "}
                <span className="line-through">${productData.oldPrice}</span>
              </p>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {productData.description}
            </p>
          </div>

          {productData.size && productData.size.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Size</h3>
              <div className="flex gap-2">
                {productData.size.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md font-medium transition-all ${
                      selectedSize === size
                        ? "border-gray-900 bg-blue-50 text-gray-950 shadow-md"
                        : "border-gray-300 text-gray-700 hover:border-gray-400 hover:shadow-sm"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <label className="text-lg font-semibold">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 min-w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => addToCart(productData)}
                disabled={productData.stock === 0 || isAddingToCart}
                className={`flex-1 py-3 px-6 rounded-md font-semibold transition-all flex items-center justify-center gap-2 ${
                  productData.stock === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : isAddingToCart
                    ? "bg-blue-600 text-white"
                    : "bg-gray-950 hover:bg-white hover:text-gray-950 border border-gray-950 hover:shadow-xl text-white"
                }`}
              >
                {isAddingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Adding...
                  </>
                ) : productData.stock === 0 ? (
                  "Out of Stock"
                ) : (
                  <>
                    <FaShoppingCart />
                    Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={() => addToWishlist(productData)}
                disabled={isUpdatingWishlist}
                className={`py-3 px-6 border inline-flex items-center gap-3 rounded-md font-semibold transition-all ${
                  isUpdatingWishlist
                    ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                    : "border-gray-900 text-gray-950 hover:bg-gray-950 hover:text-white"
                }`}
              >
                {isUpdatingWishlist ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                ) : (
                  <FaRegHeart />
                )}
                Wishlist
              </button>
            </div>

            {notification.show && (
              <div
                className={`mt-4 p-3 rounded-lg border-l-4 flex items-center gap-3 animate-fade-in ${
                  notification.type === "success"
                    ? "bg-green-50 border-green-500 text-green-700"
                    : notification.type === "error"
                    ? "bg-red-50 border-red-500 text-red-700"
                    : "bg-blue-50 border-blue-500 text-blue-700"
                }`}
              >
                {notification.type === "success" && (
                  <FaCheck className="text-green-500" />
                )}
                {notification.type === "error" && (
                  <FaTimes className="text-red-500" />
                )}
                {notification.type === "info" && (
                  <FaInfoCircle className="text-blue-500" />
                )}
                <span className="font-medium">{notification.message}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
