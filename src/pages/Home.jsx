import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { products } = useApp();

  // Filter products by category
  const featuredProducts = products.slice(0, 4);
  const mensProducts = products
    .filter((product) => product.category === "men")
    .slice(0, 4);
  const womensProducts = products
    .filter((product) => product.category === "women")
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-luxury-green via-luxury-green/95 to-luxury-green/90 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
              Elevate Your Style with{" "}
              <span className="text-luxury-gold">NEX-G</span>
            </h1>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              Discover our exclusive collection of luxury fashion where timeless
              elegance meets contemporary design. Crafted for those who
              appreciate the finer things in life.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-luxury-gold text-white px-8 py-4 font-semibold hover:bg-luxury-gold/90 transition-colors duration-300 rounded-lg shadow-lg hover:shadow-xl"
            >
              Shop Now
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-dark-gray mb-4">
              Featured Collection
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Curated pieces that define luxury and sophistication. Each item is
              meticulously crafted to elevate your wardrobe with timeless
              elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center border-2 border-luxury-green text-luxury-green px-8 py-3 font-semibold hover:bg-luxury-green hover:text-white transition-colors duration-300 rounded-lg"
            >
              View All Products
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Men's Collection */}
      {mensProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-light text-dark-gray mb-4">
                  Men's Collection
                </h2>
                <p className="text-gray-600 text-lg">
                  Sophisticated styles for the modern gentleman
                </p>
              </div>
              <Link
                to="/products?category=men"
                className="text-luxury-green hover:text-luxury-gold transition-colors duration-300 font-semibold"
              >
                View All Men's →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {mensProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Women's Collection */}
      {womensProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-light text-dark-gray mb-4">
                  Women's Collection
                </h2>
                <p className="text-gray-600 text-lg">
                  Elegant pieces for the contemporary woman
                </p>
              </div>
              <Link
                to="/products?category=women"
                className="text-luxury-green hover:text-luxury-gold transition-colors duration-300 font-semibold"
              >
                View All Women's →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {womensProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Luxury Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark-gray mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Crafted with the finest materials and exceptional attention to
                detail.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark-gray mb-2">
                Secure Shopping
              </h3>
              <p className="text-gray-600">
                Your privacy and security are our top priorities.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark-gray mb-2">
                Easy Returns
              </h3>
              <p className="text-gray-600">
                30-day return policy for your complete peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
