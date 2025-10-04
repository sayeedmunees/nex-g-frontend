import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const navigate = useNavigate();

  const isWishlisted = isInWishlist(product.id);
  const currentPrice = product.discountedPrice || product.price;
  const discountPercentage = product.discountedPrice
    ? Math.round(
        (1 - product.discountedPrice / parseFloat(product.oldPrice)) * 100
      )
    : 0;

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1, product.size?.[0] || "M");
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  // Star rating component
  const renderRating = () => {
    return (
      <div className="flex items-center mt-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-3 h-3 ${
              i < product.rating ? "text-luxury-gold" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
      </div>
    );
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
            isWishlisted
              ? "bg-luxury-gold text-white shadow-lg"
              : "bg-white/90 text-gray-600 hover:bg-luxury-gold hover:text-white"
          }`}
        >
          <svg
            className="w-4 h-4"
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
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {/* New Badge */}
          {product.isNew && (
            <div className="bg-luxury-green text-white px-2 py-1 text-xs font-semibold rounded shadow-lg">
              NEW
            </div>
          )}

          {/* Discount Badge */}
          {product.discountedPrice && (
            <div className="bg-luxury-gold text-white px-2 py-1 text-xs font-semibold rounded shadow-lg">
              -{discountPercentage}%
            </div>
          )}
        </div>

        {/* Stock Status */}
        <div className="absolute top-3 left-3 right-3 flex justify-center">
          {product.stock < 10 && product.stock > 0 && (
            <div className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
              Only {product.stock} left
            </div>
          )}
        </div>

        {/* Quick Add Button - Slides in on hover */}
        <button
          onClick={handleQuickAdd}
          className={`absolute bottom-0 left-0 right-0 bg-luxury-green text-white py-3 font-semibold transition-all duration-300 transform ${
            isHovered
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          } hover:bg-luxury-green/90`}
        >
          Quick Add to Cart
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-medium">
          {product.brand}
        </p>
        <h3 className="font-medium text-dark-gray mb-2 line-clamp-2 leading-tight">
          {product.title}
        </h3>

        {/* Rating */}
        {renderRating()}

        {/* Price */}
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-lg font-semibold text-luxury-green">
            ${currentPrice}
          </span>
          {product.discountedPrice ? (
            <>
              <span className="text-sm text-gray-500 line-through">
                ${product.oldPrice}
              </span>
              <span className="text-sm text-luxury-gold font-semibold">
                Save ${(parseFloat(product.oldPrice) - currentPrice).toFixed(2)}
              </span>
            </>
          ) : (
            product.oldPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.oldPrice}
              </span>
            )
          )}
        </div>

        {/* Category & Type Tags */}
        <div className="mt-2 flex flex-wrap gap-1">
          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded capitalize">
            {product.category}
          </span>
          <span className="inline-block bg-luxury-green/10 text-luxury-green text-xs px-2 py-1 rounded capitalize">
            {product.type}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
