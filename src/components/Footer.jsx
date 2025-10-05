import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
     
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">
              About NEX-G
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Where timeless elegance meets contemporary design. We craft luxury
              fashion pieces that celebrate individuality and sophisticated
              style for the modern connoisseur.
            </p>
          </div>

         
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">
              Customer Service
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Shipping Information
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">
              Newsletter
            </h3>
            <p className="text-white/80 text-sm mb-4">
              Subscribe to receive updates on new collections and exclusive
              offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 text-sm text-gray-800 bg-white border border-blue-400/30 rounded focus:outline-none focus:border-blue-400"
              />
              <button className="bg-blue-600 text-white px-6 py-2 text-sm hover:bg-blue-700 transition-colors duration-300 rounded whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex items-center">
            <div className="text-white/60 text-sm text-center md:text-right">
              &copy; 2025 NEX-G Luxury Fashion. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
