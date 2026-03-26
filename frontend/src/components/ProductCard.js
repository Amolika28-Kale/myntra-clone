import React, { useState } from 'react';
import '../styles/productcard.css';

const ProductCard = ({ product, onAddCart, onWishlist, isInWishlist }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleAddToCart = () => {
    onAddCart({
      productId: product._id,
      quantity: 1,
      selectedColor,
      selectedSize,
    });
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.images?.[0] || 'https://via.placeholder.com/300'} alt={product.name} />
        <div className="product-overlay">
          <button className="buy-btn" onClick={handleAddToCart}>Add to Cart</button>
          <button className="buy-now-btn">Buy Now</button>
        </div>
      </div>

      <div className="product-info">
        <h3 className="product-brand text-muted">{product.brand}</h3>
        <h2 className="product-name">{product.name}</h2>

        <div className="product-rating">
          <span className="rating-stars">⭐ {product.rating || 4.0}</span>
          <span className="review-count">({product.reviews || 0})</span>
        </div>

        <div className="product-price">
          <span className="original-price">₹{product.mrp}</span>
          <span className="sale-price">₹{product.price}</span>
          <span className="discount-badge">{discount}% OFF</span>
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="product-colors">
            <label>Color:</label>
            <div className="color-swatches">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}

        {product.sizes && product.sizes.length > 0 && (
          <div className="product-sizes">
            <label>Size:</label>
            <select 
              value={selectedSize} 
              onChange={(e) => setSelectedSize(e.target.value)}
              className="size-select"
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        )}

        <button 
          className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
          onClick={() => onWishlist(product._id)}
        >
          {isInWishlist ? '❤️ In Wishlist' : '🤍 Wishlist'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
