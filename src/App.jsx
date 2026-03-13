import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import CartPage from './components/CartPage';
import CartSidebar from './components/CartSidebar';
import { useCart } from './context/useCart';
import { products } from './data/products';
import './styles/App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoading, toastMessage } = useCart();

  if (isLoading) {
    return <div className="loading-state">Loading QuickCart...</div>;
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<HomePage products={products} searchTerm={searchTerm} />}
            />
            <Route
              path="/category/:category"
              element={<CategoryPage products={products} />}
            />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
        <CartSidebar />
        {toastMessage && (
          <div className="toast-message" role="status" aria-live="polite">
            {toastMessage}
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;