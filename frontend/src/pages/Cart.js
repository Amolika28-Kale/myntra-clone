import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCartStart, getCartSuccess, getCartError, removeFromCartStart, removeFromCartSuccess, removeFromCartError, updateCartItemStart, updateCartItemSuccess, updateCartItemError } from '../store/cartSlice';
import { cartAPI } from '../services/api';
import { showToast } from '../components/Toast';
import '../styles/cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalPrice, loading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    dispatch(getCartStart());
    try {
      const response = await cartAPI.getCart();
      dispatch(getCartSuccess(response.data.data));
    } catch (error) {
      dispatch(getCartError(error.message));
      showToast('Failed to load cart', 'error');
    }
  };

  const handleRemoveItem = async (productId) => {
    dispatch(removeFromCartStart());
    try {
      const response = await cartAPI.removeFromCart(productId);
      dispatch(removeFromCartSuccess(response.data.data));
      showToast('Removed from cart', 'info');
    } catch (error) {
      dispatch(removeFromCartError(error.message));
      showToast('Failed to remove item', 'error');
    }
  };

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) {
      handleRemoveItem(productId);
      return;
    }

    dispatch(updateCartItemStart());
    try {
      const response = await cartAPI.updateCartItem(productId, { quantity });
      dispatch(updateCartItemSuccess(response.data.data));
    } catch (error) {
      dispatch(updateCartItemError(error.message));
      showToast('Failed to update quantity', 'error');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showToast('Your cart is empty!', 'warning');
      return;
    }
    navigate('/checkout');
  };

  if (!isAuthenticated) {
    return (
      <div className="cart-page container">
        <div className="empty-cart">
          <h2>Please login to view your cart</h2>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Start shopping to add items to your cart</p>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            <h3>Items ({cartItems.length})</h3>
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img 
                  src={item.product?.images?.[0] || 'https://via.placeholder.com/150'} 
                  alt={item.product?.name}
                  className="item-image"
                />
                <div className="item-details">
                  <h4>{item.product?.name}</h4>
                  <p className="item-brand text-muted">{item.product?.brand}</p>
                  {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                  {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                  <p className="item-price">₹{item.price}</p>
                </div>

                <div className="item-quantity">
                  <label>Quantity:</label>
                  <div className="quantity-control">
                    <button 
                      onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                      disabled={loading}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                      disabled={loading}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="item-total">
                  <p>₹{item.price * item.quantity}</p>
                </div>

                <button 
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.product._id)}
                  disabled={loading}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Price Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free">Free</span>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <span className="discount">-₹0</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
            <button 
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={loading || cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
