import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          NEX-G
        </Link>

        <div className="flex space-x-6">
          <Link to="/" className="hover:text-gray-300 transition-colors">
            <FaHome className="size-6" />
          </Link>
          <Link
            to="/wishlist"
            className="hover:text-gray-300 transition-colors"
          >
            <FaRegHeart className="size-6" />
          </Link>
          <Link to="/cart" className="hover:text-gray-300 transition-colors">
            <AiOutlineShoppingCart className="size-7" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
