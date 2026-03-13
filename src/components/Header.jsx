import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import '../styles/Header.css';

function Header({ searchTerm, onSearchChange }) {
  const { getTotalItems, toggleCart } = useCart();
  const categories = ['Electronics', 'Accessories', 'Home', 'Sports'];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          <Link to="/" className="header-logo">
            <h1 className="header-title">🛒 QuickCart</h1>
          </Link>

          <button
            className="cart-icon-btn"
            onClick={toggleCart}
            aria-label="Open shopping cart"
          >
            <span aria-hidden="true">🛒</span>
            {getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </button>
        </div>

        <p className="header-subtitle">Your one-stop shop for everything</p>

        <nav className="header-nav" aria-label="Primary navigation">
          <Link to="/" className="nav-link">
            Home
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category}`}
              className="nav-link"
            >
              {category}
            </Link>
          ))}
          <Link to="/cart" className="nav-link">
            Cart Page
          </Link>
        </nav>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            className="search-input"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;