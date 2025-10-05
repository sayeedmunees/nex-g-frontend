import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProductsAPI } from "../services/allAPI";
import { Link } from "react-router-dom";

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  const fetchProducts = async () => {
    try {
      const result = await getProductsAPI();
      console.log(result.data);
      const allProducts = result.data || [];

      const featured = allProducts
        .filter((product) => product.category == "men")
        .slice(0, 4);
      setFeaturedProducts(featured);

      const arrivals = allProducts
        .filter(
          (product) => product.category == "kids" || product.category == "men"
        )
        .slice(4, 8);
      setNewArrivals(arrivals);
    } catch (err) {
      console.log("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to NEX-G</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover the latest trends in fashion with our exclusive collection.
            Quality meets style in every piece.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to={"/products"}>
              <button className="bg-white border-2 border-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-transparent hover:text-white transition-colors">
                Shop Now
              </button>
            </Link>
            <Link to={"/products"}>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                View Collection
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked selection of our most popular and trending items
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No featured products available</p>
            </div>
          )}

          <div className="text-center mt-8">
            <Link to={"/products"}>
              <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors">
                View All Featured
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              New Arrivals
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fresh styles just landed. Be the first to explore our latest
              collection
            </p>
          </div>

          {newArrivals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No new arrivals available</p>
            </div>
          )}

          <div className="text-center mt-8">
            <Link to={"/products"}>
              <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors">
                View All New Arrivals
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
