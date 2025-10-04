import React, { createContext, useContext, useState } from "react";
import { getProductsAPI } from "../services/allAPI";

// Create Context
const AppContext = createContext();

// Sample product data matching the provided structure
const sampleProducts = getProductsAPI();
// [
//   {
//     id: 1,
//     title: "Long sleeve Jacket",
//     isNew: true,
//     oldPrice: "200",
//     price: 150,
//     discountedPrice: 135,
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
//     category: "women",
//     type: "jacket",
//     stock: 50,
//     brand: "FashionTrend",
//     size: ["S", "M", "L"],
//     image: "https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg",
//     rating: 4,
//   },
//   {
//     id: 2,
//     title: "Jacket with wollen hat",
//     isNew: true,
//     oldPrice: "70",
//     price: 65,
//     discountedPrice: 58.5,
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
//     category: "women",
//     type: "jacket",
//     stock: 30,
//     brand: "CozyWear",
//     size: ["M", "L", "XL"],
//     image: "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg",
//     rating: 3,
//   },
//   {
//     id: 3,
//     title: "Compact fashion t-shirt",
//     isNew: true,
//     oldPrice: "70",
//     price: 55.99,
//     discountedPrice: 50.39,
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
//     category: "women",
//     type: "t-shirt",
//     stock: 100,
//     brand: "TrendyTees",
//     size: ["XS", "S", "M", "L"],
//     image: "https://images.pexels.com/photos/2752045/pexels-photo-2752045.jpeg",
//     rating: 3,
//   },
//   {
//     id: 4,
//     title: "Premium Wool Coat",
//     isNew: false,
//     oldPrice: "300",
//     price: 249.99,
//     discountedPrice: 224.99,
//     description:
//       "Luxurious wool coat crafted for elegance and warmth. Perfect for sophisticated winter styling.",
//     category: "women",
//     type: "coat",
//     stock: 25,
//     brand: "NEX-G-FRON",
//     size: ["S", "M", "L", "XL"],
//     image:
//       "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop",
//     rating: 5,
//   },
//   {
//     id: 5,
//     title: "Designer Leather Jacket",
//     isNew: true,
//     oldPrice: "450",
//     price: 399.99,
//     discountedPrice: 359.99,
//     description:
//       "Premium leather jacket with exceptional craftsmanship and timeless design.",
//     category: "men",
//     type: "jacket",
//     stock: 15,
//     brand: "NEX-G-FRON",
//     size: ["M", "L", "XL"],
//     image:
//       "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
//     rating: 4,
//   },
//   {
//     id: 6,
//     title: "Evening Gown",
//     isNew: true,
//     oldPrice: "350",
//     price: 299.99,
//     discountedPrice: 269.99,
//     description:
//       "Stunning evening gown designed for red carpet moments and special events.",
//     category: "women",
//     type: "dress",
//     stock: 20,
//     brand: "NEX-G-FRON",
//     size: ["XS", "S", "M"],
//     image:
//       "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop",
//     rating: 4,
//   },
// ];

// Context Provider Component
export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [products] = useState(sampleProducts);

  // Add item to cart
  const addToCart = (product, quantity = 1, size = "M") => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.size === size
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity, size }];
    });
  };

  // Remove item from cart
  const removeFromCart = (productId, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === productId && item.size === size))
    );
  };

  // Update cart quantity
  const updateCartQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Calculate cart total
  const getCartTotal = () => {
    return cart.reduce(
      (total, item) =>
        total + (item.discountedPrice || item.price) * item.quantity,
      0
    );
  };

  // Get cart items count
  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Add to wishlist
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  // Remove from wishlist
  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Toggle wishlist item
  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Context value
  const value = {
    cart,
    wishlist,
    products,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getCartTotal,
    getCartItemsCount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
