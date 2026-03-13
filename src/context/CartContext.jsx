import React, { useEffect, useState } from 'react';
import { CartContext } from './cartContextObject';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('quickcart-cart', []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    const loadingTimeout = window.setTimeout(() => {
      setIsLoading(false);
    }, 120);

    return () => {
      window.clearTimeout(loadingTimeout);
    };
  }, []);

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }

    const toastTimeout = window.setTimeout(() => {
      setToastMessage('');
    }, 1800);

    return () => {
      window.clearTimeout(toastTimeout);
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

  const value = {
    cart,
    isCartOpen,
    isLoading,
    toastMessage,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    clearCart,
    getTotalItems,
    getTotalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
