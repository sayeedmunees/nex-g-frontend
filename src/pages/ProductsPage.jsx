import React from "react";
import { useState, useEffect } from "react";
import { getProductsAPI } from "../services/allAPI";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const result = await getProductsAPI();
      console.log(result.data);
      setProducts(result.data || []);
    } catch (err) {
      console.log("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl tracking-wide text-center font-bold mb-2">
        Our Products
      </h1>
      <p className="text-zinc-500 text-center mb-8 max-w-md mx-auto">
        Discover the latest trends in fashion with our exclusive collection.
        Quality meets style in every piece.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
