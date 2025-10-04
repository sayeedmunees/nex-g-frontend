import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const { products } = useApp()
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    brand: '',
    size: '',
    priceRange: ''
  })
  const [sortBy, setSortBy] = useState('newest')

  // Get URL parameters on component mount and when they change
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl) {
      setFilters(prev => ({ ...prev, category: categoryFromUrl }))
    }
  }, [searchParams])

  // Get unique filter options
  const categories = [...new Set(products.map(p => p.category))]
  const types = [...new Set(products.map(p => p.type))]
  const brands = [...new Set(products.map(p => p.brand))]
  const allSizes = [...new Set(products.flatMap(p => p.size))]

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const currentPrice = product.discountedPrice || product.price
      
      return (
        (!filters.category || product.category === filters.category) &&
        (!filters.type || product.type === filters.type) &&
        (!filters.brand || product.brand === filters.brand) &&
        (!filters.size || product.size.includes(filters.size)) &&
        (!filters.priceRange || {
          'under-50': currentPrice < 50,
          '50-100': currentPrice >= 50 && currentPrice <= 100,
          '100-200': currentPrice >= 100 && currentPrice <= 200,
          'over-200': currentPrice > 200
        }[filters.priceRange])
      )
    })

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price))
        break
      case 'price-high':
        filtered.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price))
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
      default:
        filtered.sort((a, b) => b.id - a.id)
        break
    }

    return filtered
  }, [products, filters, sortBy])

  const clearFilters = () => {
    setFilters({
      category: '',
      type: '',
      brand: '',
      size: '',
      priceRange: ''
    })
    // Also clear URL parameters
    setSearchParams({})
  }

  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category }))
    // Update URL parameter when category changes
    if (category) {
      setSearchParams({ category })
    } else {
      setSearchParams({})
    }
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== '')

  // Get current category from URL for display
  const currentCategory = searchParams.get('category')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-dark-gray mb-2">
            {currentCategory ? `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}'s Collection` : 'All Products'}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} products found
            {hasActiveFilters && ' (filtered)'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-dark-gray">Filters</h3>
                {hasActiveFilters && (
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-luxury-green hover:text-luxury-gold transition-colors duration-300"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-dark-gray mb-3">Category</h4>
                <select 
                  value={filters.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:border-luxury-green focus:outline-none focus:ring-2 focus:ring-luxury-green/20"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-dark-gray mb-3">Product Type</h4>
                <select 
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:border-luxury-green focus:outline-none focus:ring-2 focus:ring-luxury-green/20"
                >
                  <option value="">All Types</option>
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-dark-gray mb-3">Price Range</h4>
                <select 
                  value={filters.priceRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:border-luxury-green focus:outline-none focus:ring-2 focus:ring-luxury-green/20"
                >
                  <option value="">All Prices</option>
                  <option value="under-50">Under $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="over-200">Over $200</option>
                </select>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-dark-gray mb-3">Brand</h4>
                <select 
                  value={filters.brand}
                  onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:border-luxury-green focus:outline-none focus:ring-2 focus:ring-luxury-green/20"
                >
                  <option value="">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-dark-gray mb-3">Size</h4>
                <select 
                  value={filters.size}
                  onChange={(e) => setFilters(prev => ({ ...prev, size: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:border-luxury-green focus:outline-none focus:ring-2 focus:ring-luxury-green/20"
                >
                  <option value="">All Sizes</option>
                  {allSizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Top Bar */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <p className="text-gray-600 mb-4 sm:mb-0">
                  Showing {filteredProducts.length} of {products.length} products
                  {hasActiveFilters && ' (filtered)'}
                </p>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 text-sm">Sort by:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 text-sm focus:border-luxury-green focus:outline-none focus:ring-2 focus:ring-luxury-green/20"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  onClick={clearFilters}
                  className="bg-luxury-green text-white px-6 py-3 rounded-lg hover:bg-luxury-green/90 transition-colors duration-300"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products