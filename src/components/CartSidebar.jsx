import React from 'react';
import { useCart } from '../context/useCart';
import '../styles/CartSidebar.css';

function CartSidebar() {
  const {
    isCartOpen,
    toggleCart,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice
  } = useCart();

  return (
    <aside
      className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}
      aria-hidden={!isCartOpen}
      aria-label="Shopping cart"
    >
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button onClick={toggleCart} className="close-btn" aria-label="Close cart">
          x
        </button>
      </div>

      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />

              <div className="cart-item-details">
                <h4 className="cart-item-name">{item.name}</h4>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
                <p className="cart-item-subtotal">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="cart-item-quantity">
                <button
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  -
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  +
                </button>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name}`}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      )}
    </aside>
  );
}

export default CartSidebar;
