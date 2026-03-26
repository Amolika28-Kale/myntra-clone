import React, { useState } from 'react';
import '../styles/productcard.css';

const ProductCard = ({ product, onAddCart, onWishlist, isInWishlist }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [isHovered, setIsHovered] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const isLowStock = product.stock < 20;
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      onAddCart({
        productId: product._id,
        quantity: 1,
        selectedColor,
        selectedSize,
        price: product.price,
        name: product.name,
        image: product.images?.[0]
      });
      
      // Show success notification
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }
  };

  const getColorStyle = (color) => {
    const colorMap = {
      'black': '#1a1a1a',
      'white': '#ffffff',
      'blue': '#3b82f6',
      'red': '#ef4444',
      'green': '#10b981',
      'yellow': '#f59e0b',
      'purple': '#8b5cf6',
      'pink': '#ec489a',
      'grey': '#6b7280',
      'navy': '#1e3a8a',
      'beige': '#f5f5dc',
      'dark blue': '#1e3a8a',
      'light blue': '#93c5fd',
    };
    return colorMap[color.toLowerCase()] || color;
  };

  return (
    <div 
      className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Notification Toast */}
      {showNotification && (
        <div className="notification-toast">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          Added to cart!
        </div>
      )}

      {/* Badges */}
      <div className="product-badges">
        {discount >= 30 && (
          <span className="badge discount-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
            {discount}% OFF
          </span>
        )}
        {product.isNew && (
          <span className="badge new-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            NEW
          </span>
        )}
        {isLowStock && !isOutOfStock && (
          <span className="badge low-stock-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Low Stock
          </span>
        )}
        {isOutOfStock && (
          <span className="badge out-of-stock-badge">Sold Out</span>
        )}
      </div>

      {/* Image Container */}
      <div className="product-image-container">
        {!imageLoaded && (
          <div className="image-skeleton">
            <div className="skeleton-shimmer"></div>
          </div>
        )}
        <img 
          src={product.images?.[0] || 'https://via.placeholder.com/400x500?text=No+Image'} 
          alt={product.name}
          className={`product-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Quick Actions Overlay */}
        <div className={`product-quick-actions ${isHovered ? 'visible' : ''}`}>
          <button 
            className={`quick-action wishlist-action ${isInWishlist ? 'active' : ''}`}
            onClick={() => onWishlist(product._id)}
            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={isInWishlist ? "currentColor" : "none"} stroke="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button 
            className={`quick-action cart-action ${isOutOfStock ? 'disabled' : ''}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            title={isOutOfStock ? 'Out of stock' : 'Add to cart'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </button>
          <button 
            className="quick-action view-action"
            onClick={() => window.location.href = `/product/${product._id}`}
            title="Quick view"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>

        {/* Hover Action Buttons */}
        <div className={`product-hover-actions ${isHovered ? 'visible' : ''}`}>
          <button 
            className={`hover-cart-btn ${isOutOfStock ? 'disabled' : ''}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
          <button className="hover-buy-btn" onClick={() => window.location.href = `/product/${product._id}`}>
            Buy Now
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <div className="product-header">
          <span className="product-brand">{product.brand}</span>
          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.floor(product.rating || 0) ? "#fbbf24" : "#e5e7eb"} stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <span className="rating-value">{product.rating || 4.0}</span>
            <span className="review-count">({product.reviews || 0})</span>
          </div>
        </div>

        <h3 className="product-name">{product.name}</h3>
        
        <p className="product-description">{product.description?.substring(0, 60)}...</p>

        <div className="product-price-section">
          <div className="price-container">
            <span className="sale-price">₹{product.price.toLocaleString()}</span>
            <span className="original-price">₹{product.mrp.toLocaleString()}</span>
          </div>
          <div className="savings-badge">
            Save ₹{(product.mrp - product.price).toLocaleString()}
          </div>
        </div>

        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="product-colors">
            <label className="selection-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4l3 3"/>
              </svg>
              Color: {selectedColor}
            </label>
            <div className="color-swatches">
              {product.colors.slice(0, 5).map((color) => (
                <div
                  key={color}
                  className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: getColorStyle(color) }}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                >
                  {selectedColor === color && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
              ))}
              {product.colors.length > 5 && (
                <span className="more-colors">+{product.colors.length - 5}</span>
              )}
            </div>
          </div>
        )}

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="product-sizes">
            <label className="selection-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              Size:
            </label>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Action Buttons */}
        <div className="mobile-action-buttons">
          <button 
            className={`mobile-cart-btn ${isOutOfStock ? 'disabled' : ''}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Add to Cart
          </button>
          <button 
            className={`mobile-wishlist-btn ${isInWishlist ? 'active' : ''}`}
            onClick={() => onWishlist(product._id)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={isInWishlist ? "currentColor" : "none"} stroke="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;