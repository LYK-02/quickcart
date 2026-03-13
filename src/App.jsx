import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import { products } from './data/products';
import './styles/App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });

    setToastMessage(`${product.name} added to cart`);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleCart = () => {
    setIsCartOpen((prevOpen) => !prevOpen);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage('');
    }, 1800);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [toastMessage]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen]);

  return (
    <div className="app">
      <Header cartItemCount={getTotalItems()} onCartClick={toggleCart} />
      <main className="main-content">
        <ProductList products={products} onAddToCart={addToCart} />
      </main>
      <CartSidebar
        isOpen={isCartOpen}
        onClose={toggleCart}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />
      {toastMessage && (
        <div className="toast-message" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;