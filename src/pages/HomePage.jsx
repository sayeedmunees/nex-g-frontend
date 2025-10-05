import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProductsAPI } from "../services/allAPI";

function HomePage() {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
