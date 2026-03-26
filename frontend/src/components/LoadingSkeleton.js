import React from 'react';
import '../styles/loading.css';

const LoadingSkeleton = () => {
  return (
    <div className="products-grid">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton skeleton-image"></div>
          <div className="skeleton skeleton-text mt-2"></div>
          <div className="skeleton skeleton-text mt-1"></div>
          <div className="skeleton skeleton-text mt-1" style={{ width: '60%' }}></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
