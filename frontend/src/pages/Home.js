import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HeroBanner from '../components/HeroBanner';
import BrandCarousel from '../components/BrandCarousel';
import ProductCard from '../components/ProductCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { getProductsStart, getProductsSuccess, getProductsError } from '../store/productSlice';
import { addToWishlistStart, addToWishlistSuccess, addToWishlistError } from '../store/wishlistSlice';
import { addToCartStart, addToCartSuccess, addToCartError } from '../store/cartSlice';
import { productAPI, wishlistAPI, cartAPI } from '../services/api';
import { showToast } from '../components/Toast';
import '../styles/home.css';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filteredProducts, loading } = useSelector((state) => state.products);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [brands] = useState(['Nike', 'Adidas', 'Zara', 'H&M',  'Levi\'s', 'Puma', 'UCB']);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    dispatch(getProductsStart());
    try {
      const response = await productAPI.getAllProducts({});
      dispatch(getProductsSuccess(response.data.data));
    } catch (error) {
      dispatch(getProductsError(error.message));
      showToast('Failed to load products', 'error');
    }
  };

  const handleBrandClick = (brand) => {
    navigate(`/brand/${brand}`);
  };

  const handleAddCart = async (cartData) => {
    if (!isAuthenticated) {
      showToast('Please login to add items to cart', 'warning');
      navigate('/login');
      return;
    }

    dispatch(addToCartStart());
    try {
      const response = await cartAPI.addToCart(cartData);
      dispatch(addToCartSuccess(response.data.data));
      showToast('Added to cart!', 'success');
    } catch (error) {
      dispatch(addToCartError(error.message));
      showToast('Failed to add to cart', 'error');
    }
  };

  const handleWishlist = async (productId) => {
    if (!isAuthenticated) {
      showToast('Please login to add to wishlist', 'warning');
      navigate('/login');
      return;
    }

    dispatch(addToWishlistStart());
    try {
      const isInWishlist = wishlistItems.some(item => item.product._id === productId);
      if (isInWishlist) {
        await wishlistAPI.removeFromWishlist(productId);
        dispatch(addToWishlistSuccess(wishlistItems.filter(item => item.product._id !== productId)));
        showToast('Removed from wishlist', 'info');
      } else {
        const response = await wishlistAPI.addToWishlist(productId);
        dispatch(addToWishlistSuccess(response.data.data || response.data));
        showToast('Added to wishlist!', 'success');
      }
    } catch (error) {
      dispatch(addToWishlistError(error.message));
      showToast('Failed to update wishlist', 'error');
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.product?._id === productId);
  };

  return (
    <div className="home-page">
      <HeroBanner />

      <BrandCarousel brands={brands} onBrandClick={handleBrandClick} />

      <div className="view-all-section">
        <h2>View All Inventories</h2>
        <button className="view-all-btn" onClick={() => navigate('/products')}>
          Explore All Products →
        </button>
      </div>

      <section className="home-products-section container">
        <h2 className="section-title">Featured Products</h2>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="products-grid">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddCart={handleAddCart}
                onWishlist={handleWishlist}
                isInWishlist={isInWishlist(product._id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
