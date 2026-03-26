import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import '../styles/navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.auth-menu') && !event.target.closest('.mobile-menu')) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setSearchFocused(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setIsMobileMenuOpen(false)}>
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 7h-4.18A3 3 0 0 0 16 5.18V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1.18A3 3 0 0 0 8.18 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
            <circle cx="12" cy="13" r="3"/>
          </svg>
          <span className="logo-text">FASHIONISTA</span>
        </Link>

        {/* Desktop Search */}
        <div className="navbar-center desktop-search">
          <form onSubmit={handleSearch} className={`search-form ${searchFocused ? 'search-focused' : ''}`}>
            <div className="search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for brands, products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <span>Search</span>
            </button>
          </form>
        </div>

        {/* Desktop Icons */}
        <div className="navbar-right desktop-icons">
          <Link to="/wishlist" className="nav-icon-link">
            <div className="icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishlistItems.length > 0 && (
                <span className="badge">{wishlistItems.length}</span>
              )}
            </div>
            <span className="icon-label">Wishlist</span>
          </Link>

          <Link to="/cart" className="nav-icon-link">
            <div className="icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {totalCartItems > 0 && (
                <span className="badge">{totalCartItems}</span>
              )}
            </div>
            <span className="icon-label">Cart</span>
          </Link>

          {isAuthenticated ? (
            <div className="auth-menu">
              <button 
                className="user-menu-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenu(activeMenu === 'auth' ? null : 'auth');
                }}
              >
                <div className="user-avatar">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="user-name">{user?.name?.split(' ')[0]}</span>
                <svg className="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {activeMenu === 'auth' && (
                <div className="dropdown-menu">
                  <Link to="/account" className="dropdown-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    My Account
                  </Link>
                  <Link to="/orders" className="dropdown-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M3 6h18M9 12h6M7 18h10"/>
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                    </svg>
                    My Orders
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="auth-link login-btn">Sign In</Link>
              <Link to="/signup" className="auth-link signup-btn">Sign Up</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-header">
            {isAuthenticated ? (
              <div className="mobile-user-info">
                <div className="mobile-user-avatar">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="mobile-user-details">
                  <span className="mobile-user-name">{user?.name}</span>
                  <span className="mobile-user-email">{user?.email}</span>
                </div>
              </div>
            ) : (
              <div className="mobile-auth-buttons">
                <Link to="/login" className="mobile-login-btn">Sign In</Link>
                <Link to="/signup" className="mobile-signup-btn">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mobile-search-form">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mobile-search-input"
            />
            <button type="submit" className="mobile-search-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </form>

          <div className="mobile-menu-links">
            <Link to="/" className="mobile-link">Home</Link>
            <Link to="/products" className="mobile-link">All Products</Link>
            <Link to="/wishlist" className="mobile-link">
              Wishlist
              {wishlistItems.length > 0 && <span className="mobile-badge">{wishlistItems.length}</span>}
            </Link>
            <Link to="/cart" className="mobile-link">
              Cart
              {totalCartItems > 0 && <span className="mobile-badge">{totalCartItems}</span>}
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/account" className="mobile-link">My Account</Link>
                <Link to="/orders" className="mobile-link">My Orders</Link>
                <button onClick={handleLogout} className="mobile-logout-btn">Logout</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;