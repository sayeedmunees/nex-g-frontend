import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const View = () => {
  const { id } = useParams();
  const { products, addToCart, toggleWishlist, isInWishlist } = useApp();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const isWishlisted = isInWishlist(product.id);
  const currentPrice = product.discountedPrice || product.price;
  const discountPercentage = product.discountedPrice
    ? Math.round(
        (1 - product.discountedPrice / parseFloat(product.oldPrice)) * 100
      )
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize && product.size.length > 0) {
      alert("Please select a size");
      return;
    }
    addToCart(product, quantity, selectedSize || product.size[0]);
    alert("Product added to cart!");
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
  };

  // Star rating component
  const renderRating = () => {
    return (
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < product.rating ? "text-luxury-gold" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-gray-600 ml-2">({product.rating}/5)</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 lg:h-[600px] object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="py-4">
            <div className="mb-4">
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {product.isNew && (
                  <span className="bg-luxury-green text-white px-3 py-1 text-sm font-semibold rounded-lg">
                    NEW
                  </span>
                )}
                {product.discountedPrice && (
                  <span className="bg-luxury-gold text-white px-3 py-1 text-sm font-semibold rounded-lg">
                    -{discountPercentage}% OFF
                  </span>
                )}
              </div>

              <p className="text-sm uppercase tracking-wider text-gray-500 mb-2 font-medium">
                {product.brand}
              </p>
              <h1 className="text-3xl font-light text-dark-gray mb-4">
                {product.title}
              </h1>

              {/* Rating */}
              {renderRating()}

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-2xl font-semibold text-luxury-green">
                  ${currentPrice}
                </span>
                {product.discountedPrice ? (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.oldPrice}
                    </span>
                    <span className="bg-luxury-gold text-white px-3 py-1 text-sm font-semibold rounded-lg">
                      Save $
                      {(parseFloat(product.oldPrice) - currentPrice).toFixed(2)}
                    </span>
                  </>
                ) : (
                  product.oldPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ${product.oldPrice}
                    </span>
                  )
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <p
                  className={`text-sm font-medium ${
                    product.stock > 10
                      ? "text-luxury-green"
                      : product.stock > 0
                      ? "text-orange-500"
                      : "text-red-500"
                  }`}
                >
                  {product.stock > 10
                    ? "In Stock"
                    : product.stock > 0
                    ? `Only ${product.stock} left in stock`
                    : "Out of Stock"}
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                {product.description}
              </p>

              {/* Category & Type */}
              <div className="flex gap-2 mb-6">
                <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded capitalize">
                  {product.category}
                </span>
                <span className="bg-luxury-green/10 text-luxury-green text-sm px-3 py-1 rounded capitalize">
                  {product.type}
                </span>
              </div>

              {/* Size Selector */}
              {product.size.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-dark-gray mb-3 text-lg">
                    Select Size
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.size.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 border-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          selectedSize === size
                            ? "border-luxury-gold bg-luxury-gold text-white shadow-lg"
                            : "border-gray-300 text-gray-700 hover:border-luxury-gold hover:shadow-md"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="font-medium text-dark-gray mb-3 text-lg">
                  Quantity
                </h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-luxury-gold transition-colors duration-300"
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
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="text-xl font-medium w-16 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-luxury-gold transition-colors duration-300"
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 py-4 font-semibold transition-colors duration-300 rounded-lg shadow-lg hover:shadow-xl text-lg ${
                    product.stock === 0
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-luxury-green text-white hover:bg-luxury-green/90"
                  }`}
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`flex items-center justify-center space-x-3 py-4 px-8 border-2 font-semibold transition-colors duration-300 rounded-lg text-lg ${
                    isWishlisted
                      ? "border-luxury-gold bg-luxury-gold text-white shadow-lg"
                      : "border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill={isWishlisted ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>
                    {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
                  </span>
                </button>
              </div>

              {/* Product Features */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-dark-gray mb-4 text-lg">
                  Product Features
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-luxury-green mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Premium quality materials
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-luxury-green mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Expert craftsmanship
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-luxury-green mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Free shipping on orders over $200
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-luxury-green mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    30-day return policy
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
