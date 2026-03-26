import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlistStart, getWishlistSuccess, getWishlistError, removeFromWishlistStart, removeFromWishlistSuccess, removeFromWishlistError } from '../store/wishlistSlice';
import { addToCartStart, addToCartSuccess, addToCartError } from '../store/cartSlice';
import { wishlistAPI, cartAPI } from '../services/api';
import { showToast } from '../components/Toast';
import '../styles/wishlist.css';

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlistItems, loading } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [isAuthenticated]);

  const fetchWishlist = async () => {
    dispatch(getWishlistStart());
    try {
      const response = await wishlistAPI.getWishlist();
      dispatch(getWishlistSuccess(response.data.data));
    } catch (error) {
      dispatch(getWishlistError(error.message));
      showToast('Failed to load wishlist', 'error');
    }
  };

  const handleRemove = async (productId) => {
    dispatch(removeFromWishlistStart());
    try {
      const response = await wishlistAPI.removeFromWishlist(productId);
      dispatch(removeFromWishlistSuccess(response.data.data));
      showToast('Removed from wishlist', 'info');
    } catch (error) {
      dispatch(removeFromWishlistError(error.message));
      showToast('Failed to remove from wishlist', 'error');
    }
  };

  const handleMoveToCart = async (product) => {
    dispatch(addToCartStart());
    try {
      const response = await cartAPI.addToCart({
        productId: product._id,
        quantity: 1,
        selectedColor: product.colors?.[0],
        selectedSize: product.sizes?.[0],
      });
      dispatch(addToCartSuccess(response.data.data));
      await handleRemove(product._id);
      showToast('Moved to cart!', 'success');
    } catch (error) {
      dispatch(addToCartError(error.message));
      showToast('Failed to move to cart', 'error');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="wishlist-page container">
        <div className="empty-wishlist">
          <h2>Please login to view your wishlist</h2>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page container">
      <h1>My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <h2>Your wishlist is empty</h2>
          <p>Add items you love to your wishlist and they will appear here</p>
          <Link to="/products" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="wishlist-items">
          <h3>Items ({wishlistItems.length})</h3>
          {wishlistItems.map((item) => (
            <div key={item._id} className="wishlist-item">
              <img 
                src={item.product?.images?.[0] || 'https://via.placeholder.com/150'} 
                alt={item.product?.name}
                className="item-image"
              />
              <div className="item-info">
                <h4>{item.product?.name}</h4>
                <p className="item-brand text-muted">{item.product?.brand}</p>
                <div className="item-price-section">
                  <span className="original-price">₹{item.product?.mrp}</span>
                  <span className="sale-price">₹{item.product?.price}</span>
                  <span className="discount">
                    {Math.round(((item.product?.mrp - item.product?.price) / item.product?.mrp) * 100)}% OFF
                  </span>
                </div>
              </div>

              <div className="item-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => handleMoveToCart(item.product)}
                  disabled={loading}
                >
                  Move to Cart
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleRemove(item.product._id)}
                  disabled={loading}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
