import React, { useState, useEffect } from 'react';
import '../styles/hero.css';

const HeroBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="hero-banner">
      {/* Background Video/Image Overlay */}
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&auto=format&fit=crop&q=80"
          alt="Fashion Background"
          className="hero-bg-image"
        />
      </div>

      {/* Animated Particles */}
      <div className="hero-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}></div>
        ))}
      </div>

      <div className="hero-container">
        <div className={`hero-content ${isVisible ? 'fade-in-up' : ''}`}>
          {/* Badge */}
          <div className="hero-badge">
            <span className="badge-text">NEW SEASON 2026</span>
            <span className="badge-icon">✨</span>
          </div>

          {/* Main Title */}
          <h1 className="hero-title">
            <span className="title-gradient">FASHIONISTA</span>
            <span className="title-sub">Where Style Meets</span>
            <span className="title-highlight">Sophistication</span>
          </h1>

          {/* Description */}
          <p className="hero-description">
            Discover the latest trends in premium fashion. 
            Elevate your wardrobe with our exclusive collections designed for the modern trendsetter.
          </p>

          {/* Features */}
          <div className="hero-features">
            <div className="feature">
              <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Premium Quality</span>
            </div>
            <div className="feature">
              <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Free Shipping</span>
            </div>
            <div className="feature">
              <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Secure Payment</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-buttons">
            <button className="hero-btn-primary">
              Explore Collection
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button className="hero-btn-secondary">
              Shop Now
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>

         
        </div>

        {/* Featured Products Preview */}
        <div className={`hero-showcase ${isVisible ? 'fade-in-right' : ''}`}>
          <div className="showcase-card card-1">
            <img 
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&auto=format&fit=crop"
              alt="Fashion Model"
              className="showcase-image"
            />
            <div className="showcase-overlay">
              <span className="showcase-tag">New Arrival</span>
              <h4>Summer Collection 2026</h4>
            </div>
          </div>
          <div className="floating-badge discount-badge">
            <span className="discount-text">-30% OFF</span>
            <span className="discount-sub">Limited Time</span>
          </div>
          <div className="floating-badge trending-badge">
            <span className="trending-text">#Trending</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrow-down">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7m14-6l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;