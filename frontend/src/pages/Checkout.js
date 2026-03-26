import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { orderAPI } from '../services/api';
import { clearCartSuccess } from '../store/cartSlice';
import { showToast } from '../components/Toast';
import '../styles/checkout.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || '',
    phone: user?.phone || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      showToast('Your cart is empty!', 'warning');
      return;
    }

    setLoading(true);
    try {
      const response = await orderAPI.createOrder(formData);
      dispatch(clearCartSuccess());
      showToast('Order placed successfully!', 'success');
      navigate('/orders');
    } catch (error) {
      showToast('Failed to place order', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page container">
        <div className="empty-checkout">
          <h2>Your cart is empty</h2>
          <p>Please add items to your cart before checkout</p>
          <a href="/products" className="btn btn-primary">Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <h1>Checkout</h1>

      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Delivery Address</h2>
          <form onSubmit={handleSubmit} className="address-form">
            <div className="form-group">
              <label>Full Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter your full address"
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="City"
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  placeholder="State"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  placeholder="Zip Code"
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <button type="submit" className="place-order-btn" disabled={loading}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cartItems.map((item) => (
              <div key={item._id} className="summary-item">
                <div className="item-name">
                  <p>{item.product?.name}</p>
                  <p className="item-qty">Qty: {item.quantity}</p>
                </div>
                <p className="item-price">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="summary-breakdown">
            <div className="breakdown-row">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="breakdown-row">
              <span>Shipping</span>
              <span className="free">Free</span>
            </div>
            <div className="breakdown-row">
              <span>Tax</span>
              <span>₹0</span>
            </div>
            <div className="breakdown-total">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
