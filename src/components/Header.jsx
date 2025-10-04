import React from "react";
import { NavLink } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";

const Header = () => {
  const { getCartItemsCount, wishlist } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl font-bold text-luxury-gold hover:text-luxury-gold transition-colors duration-300"
          >
            NEX-G
          </NavLink>

          {/* Navigation Links - Center */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className="font-semibold text-luxury-gold hover:text-luxury-green"
            >
              Home
            </NavLink>
            <NavLink
              to="/products?category=men"
              className=" font-semibold text-luxury-gold hover:text-luxury-green"
            >
              Men
            </NavLink>
            <NavLink
              to="/products?category=women"
              className=" font-semibold text-luxury-gold hover:text-luxury-green"
            >
              Women
            </NavLink>
          </nav>

          {/* Cart & Wishlist Icons - Right */}
          <div className="flex items-center space-x-6">
            <NavLink
              to="/wishlist"
              className="relative text-luxury-gold hover:text-luxury-green transition-colors duration-300"
            >
              <FaRegHeart className="size-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-luxury-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className="relative text-luxury-gold hover:text-luxury-green transition-colors duration-300"
            >
              <AiOutlineShoppingCart className="size-7" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-luxury-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </NavLink>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex md:hidden items-center justify-center space-x-6 mt-4 pt-4 border-t border-gray-200">
          <NavLink
            to="/"
            className="font-semibold text-luxury-gold hover:text-luxury-green"
          >
            Home
          </NavLink>
          <NavLink
            to="/products?category=men"
            className="font-semibold text-luxury-gold hover:text-luxury-green"
          >
            Men
          </NavLink>
          <NavLink
            to="/products?category=women"
            className="font-semibold text-luxury-gold hover:text-luxury-green"
          >
            Women
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
