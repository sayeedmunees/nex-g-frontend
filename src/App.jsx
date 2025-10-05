import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import ProductsPage from "./pages/ProductsPage";
import Pnf from "./pages/Pnf";
import ViewPage from "./pages/ViewPage";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/view/:id" element={<ViewPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="*" element={<Pnf />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
