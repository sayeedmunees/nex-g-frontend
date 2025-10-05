import React, { useEffect, useState } from "react";
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

  // State for product data, loading, and error
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for selected size and quantity
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");

  const fetchViewProduct = async () => {
    try {
      setLoading(true);
      const result = await getViewProductAPI(id);
      console.log(result.data);
      setProductData(result.data || null);

      // Set initial states after data is loaded
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
    try {
      // 1. Fetch the current cart
      const cartResponse = await getCartAPI();
      const existingCartItem = cartResponse.data.find(
        (item) => item.id === product.id
      ); // Ensure your cart items have an 'id' field

      console.log("Existing Cart Item: ", existingCartItem);

      if (existingCartItem) {
        const updatedQuantity = existingCartItem.quantity + quantity;
        // Create a new object with all original data and the updated quantity
        const updatePayload = {
          ...existingCartItem, // Spread all existing properties
          quantity: updatedQuantity, // Overwrite the quantity
        };
        await updateCartItemAPI(existingCartItem.id, updatePayload);
      } else {
        // 3. If it's new, add it with the selected quantity
        const addPayload = {
          ...product,
          quantity: quantity, // Use the component's quantity state
        };
        await addCartAPI(addPayload);
      }

      console.log("Cart updated successfully");
    } catch (error) {
      console.error("Failed to update cart:", error);
      // Provide user feedback on error
    }
  };

  const addToWishlist = async (product) => {
    try {
      // 1. Fetch the current cart
      const cartResponse = await getWishlistAPI();
      const existingCartItem = cartResponse.data.find(
        (item) => item.id === product.id
      ); // Ensure your cart items have an 'id' field

      console.log("Existing Cart Item: ", existingCartItem);

      if (existingCartItem) {
        await deleteWishlistAPI(existingCartItem.id);
      } else {
        // 3. If it's new, add it with the selected quantity
        const addPayload = {
          ...product,
          quantity: quantity, // Use the component's quantity state
        };
        await addWishlistAPI(addPayload);
      }

      console.log("Cart updated successfully");
    } catch (error) {
      console.error("Failed to update cart:", error);
      // Provide user feedback on error
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading product...</div>
        </div>
      </div>
    );
  }

  // Show error state
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

  // Sample additional images (in real app, this would come from API)
  const additionalImages = [
    productData.image,
    "https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg",
    "https://images.pexels.com/photos/2010812/pexels-photo-2010812.jpeg",
    "https://images.pexels.com/photos/1631181/pexels-photo-1631181.jpeg",
  ];

  // Calculate discount percentage safely
  const discountPercentage =
    productData.oldPrice && productData.discountedPrice
      ? Math.round(
          ((parseFloat(productData.oldPrice) -
            parseFloat(productData.discountedPrice)) /
            parseFloat(productData.oldPrice)) *
            100
        )
      : 0;

  // Render star rating
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

  // Handle add to cart
  const handleAddToCart = () => {
    const cartItem = {
      ...productData,
      selectedSize,
      quantity,
    };
    console.log("Added to cart:", cartItem);
    // Here you would typically dispatch to Redux or update context
    alert(`Added ${quantity} ${productData.title} (${selectedSize}) to cart!`);
  };

  return (
    <div className="max-w-7xl my-auto mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images Section */}
        <div className="md:w-1/2">
          <div className="mb-4 bg-white rounded-lg overflow-hidden border">
            <img
              src={activeImage || productData.image}
              alt={productData.title}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {additionalImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(img)}
                className={`flex-shrink-0 w-20 h-20 border-2 rounded ${
                  activeImage === img ? "border-blue-500" : "border-gray-300"
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

        {/* Product Details Section */}
        <div className="md:w-1/2">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-4">
            Home / {productData.category} / {productData.type} /{" "}
            {productData.title}
          </nav>

          {/* Product Title and Brand */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {productData.title}
          </h1>
          <p className="text-lg text-gray-600 mb-4">by {productData.brand}</p>

          {/* Rating and Stock */}
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

          {/* Price Section */}
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

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {productData.description}
            </p>
          </div>

          {/* Size Selection */}
          {productData.size && productData.size.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Size</h3>
              <div className="flex gap-2">
                {productData.size.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md font-medium ${
                      selectedSize === size
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <label className="text-lg font-semibold">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => addToCart(productData)}
                disabled={productData.stock === 0}
                className={`flex-1 py-3 px-6 rounded-md font-semibold ${
                  productData.stock === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {productData.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
              <button
                onClick={() => addToWishlist(productData)}
                className="py-3 px-6 border border-gray-300 rounded-md font-semibold hover:bg-gray-50"
              >
                ♡ Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
