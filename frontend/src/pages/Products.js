import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { getProductsStart, getProductsSuccess, getProductsError, setFilter, filterProducts } from '../store/productSlice';
import { addToWishlistStart, addToWishlistSuccess, addToWishlistError } from '../store/wishlistSlice';
import { addToCartStart, addToCartSuccess, addToCartError } from '../store/cartSlice';
import { productAPI, wishlistAPI, cartAPI } from '../services/api';
import { showToast } from '../components/Toast';
import '../styles/products.css';

const Products = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filteredProducts, loading, filters, products } = useSelector((state) => state.products);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  useEffect(() => {
    const search = searchParams.get('search');
    const gender = searchParams.get('gender');
    const brand = searchParams.get('brand');

    if (search) dispatch(setFilter({ key: 'search', value: search }));
    if (gender) dispatch(setFilter({ key: 'gender', value: gender }));
    if (brand) dispatch(setFilter({ key: 'brand', value: brand }));
  }, [searchParams]);

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

  const applyFilters = () => {
    let filtered = products;

    if (filters.search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.brand.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.brand) {
      filtered = filtered.filter((p) => p.brand === filters.brand);
    }

    if (filters.gender) {
      filtered = filtered.filter((p) => p.gender === filters.gender);
    }

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters.minPrice) {
      filtered = filtered.filter((p) => p.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((p) => p.price <= Number(filters.maxPrice));
    }

    if (filters.color) {
      filtered = filtered.filter((p) => p.colors.includes(filters.color));
    }

    // Apply sorting
    if (filters.sortBy === 'price_low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price_high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'newest') {
      filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filters.sortBy === 'popularity') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    dispatch(filterProducts(filtered));
  };

  const handleFilterChange = (key, value) => {
    dispatch(setFilter({ key, value }));
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
    <div className="products-page container">
      <div className="products-container">
        <FilterSidebar onFilterChange={handleFilterChange} filters={filters} />

        <div className="products-main">
          <h2 className="products-title">All Products ({filteredProducts.length})</h2>

          {loading ? (
            <LoadingSkeleton />
          ) : filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddCart={handleAddCart}
                  onWishlist={handleWishlist}
                  isInWishlist={isInWishlist(product._id)}
                />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
