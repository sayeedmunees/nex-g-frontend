import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <NavLink
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-gray-900 transition-colors duration-300"
          >
            NEX-G
          </NavLink>

          <div className="flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative transition-colors duration-300 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-800 hover:text-blue-600"
                }`
              }
            >
              <FaHome className="size-6" />
            </NavLink>
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                `relative transition-colors duration-300 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-800 hover:text-blue-600"
                }`
              }
            >
              <FaRegHeart className="size-6" />
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative transition-colors duration-300 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-800 hover:text-blue-600"
                }`
              }
            >
              <AiOutlineShoppingCart className="size-7" />
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
