import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductList from './ProductList';
import { useCart } from '../context/useCart';

function CategoryPage({ products }) {
  const { category } = useParams();
  const { addToCart } = useCart();

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="category-page">
      <h2 className="category-title">{category} Products</h2>

      {filteredProducts.length === 0 ? (
        <div className="empty-category">
          <p>No products found in this category.</p>
          <Link to="/" className="back-home-link">
            Back to all products
          </Link>
        </div>
      ) : (
        <ProductList
          products={filteredProducts}
          onAddToCart={addToCart}
          title={`${category} Collection`}
        />
      )}
    </div>
  );
}

export default CategoryPage;
