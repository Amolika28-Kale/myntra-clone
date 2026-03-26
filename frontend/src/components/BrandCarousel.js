import React, { useRef } from 'react';
import '../styles/carousel.css';

const BrandCarousel = ({ brands, onBrandClick }) => {
  const scrollRef = useRef(null);

  const brandImages = {
    'Nike': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png',
    'Adidas': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png',
    'Zara': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/1200px-Zara_Logo.svg.png',
    'H&M': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1200px-H%26M-Logo.svg.png',
    "Levi's": 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Levi%27s_logo.svg/1200px-Levi%27s_logo.svg.png',
    'Puma': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Puma_Logo.svg/1200px-Puma_Logo.svg.png',
    'UCB': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/United_Colors_of_Benetton_logo.svg/1200px-United_Colors_of_Benetton_logo.svg.png',
    'FASHIONISTA': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&auto=format&fit=crop',
  };

  const handleScroll = (direction) => {
    const carousel = scrollRef.current;
    const scrollAmount = 300;
    if (direction === 'left') {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="brand-carousel-section">
      <div className="section-header">
        <h2 className="section-title">Shop by Brand</h2>
        <div className="section-line"></div>
      </div>
      <div className="brand-carousel-container">
        <button className="carousel-btn left" onClick={() => handleScroll('left')} aria-label="Previous brands">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        
        <div className="brand-carousel-scroll" ref={scrollRef}>
          {brands.map((brand, index) => (
            <div 
              key={brand} 
              className="brand-card"
              onClick={() => onBrandClick(brand)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="brand-image-container">
                <img 
                  src={brandImages[brand] || 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=200&auto=format&fit=crop'} 
                  alt={`${brand} logo`}
                  className="brand-logo-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/120x80?text=' + brand;
                  }}
                />
              </div>
              <p className="brand-name">{brand}</p>
            </div>
          ))}
        </div>
        
        <button className="carousel-btn right" onClick={() => handleScroll('right')} aria-label="Next brands">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BrandCarousel;