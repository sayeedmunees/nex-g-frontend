import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/view/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />

        <div className="p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-2">${product.price}</p>
          </div>

          <div className="flex justify-center items-center mt-4">
            <button className="bg-white border tracking-wide border-gray-900 w-full hover:bg-gray-900 hover:text-white hover:shadow-2xl text-gray-900 px-4 py-2 rounded transition-colors">
              View Product
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
