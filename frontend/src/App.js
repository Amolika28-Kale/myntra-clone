import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import ToastNotification from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import BrandProducts from './pages/BrandProducts';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';

import { getWishlistStart, getWishlistSuccess, getWishlistError } from './store/wishlistSlice';
import { getCartStart, getCartSuccess, getCartError } from './store/cartSlice';
import { wishlistAPI, cartAPI } from './services/api';
import './styles/index.css';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
      fetchCart();
    }
  }, [isAuthenticated]);

  const fetchWishlist = async () => {
    dispatch(getWishlistStart());
    try {
      const response = await wishlistAPI.getWishlist();
      dispatch(getWishlistSuccess(response.data.data));
    } catch (error) {
      dispatch(getWishlistError(error.message));
    }
  };

  const fetchCart = async () => {
    dispatch(getCartStart());
    try {
      const response = await cartAPI.getCart();
      dispatch(getCartSuccess(response.data.data));
    } catch (error) {
      dispatch(getCartError(error.message));
    }
  };

  return (
    <Router>
      <Navbar />
      <ToastNotification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/brand/:brandName" element={<BrandProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
