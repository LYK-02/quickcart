import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import '../styles/CartPage.css';

function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart-page">
          <p>Your cart is empty.</p>
          <Link to="/" className="continue-shopping-link">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-page-content">
          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-page-item">
                <img src={item.image} alt={item.name} />

                <div className="cart-page-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-page-price">${item.price.toFixed(2)}</p>
                  <p className="cart-page-subtotal">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <div className="cart-page-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>

            <button className="checkout-btn" type="button">
              Checkout
            </button>
            <button className="clear-summary-btn" onClick={clearCart} type="button">
              Clear Cart
            </button>
            <Link to="/" className="continue-shopping-link">
              Continue Shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}

export default CartPage;
