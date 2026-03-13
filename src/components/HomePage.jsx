import React from 'react';
import ProductList from './ProductList';
import { useCart } from '../context/useCart';

function HomePage({ products, searchTerm }) {
  const { addToCart } = useCart();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      {searchTerm && (
        <p className="search-results">
          Found {filteredProducts.length} product
          {filteredProducts.length === 1 ? '' : 's'} for "{searchTerm}"
        </p>
      )}

      {filteredProducts.length === 0 ? (
        <p className="no-results">No products found. Try another search term.</p>
      ) : (
        <ProductList products={filteredProducts} onAddToCart={addToCart} />
      )}
    </div>
  );
}

export default HomePage;
