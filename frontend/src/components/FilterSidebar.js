import React, { useState } from 'react';
import '../styles/filters.css';

const FilterSidebar = ({ onFilterChange, filters }) => {
  const [expandedCategory, setExpandedCategory] = useState('category');

  const categories = ['Topwear', 'Bottomwear', 'Footwear'];
  const sizes = {
    Topwear: ['S', 'M', 'L', 'XL', 'XXL'],
    Bottomwear: ['28', '30', '32', '34', '36', '38', '40'],
    Footwear: ['6', '7', '8', '9', '10', '11', '12'],
  };
  const colors = ['Red', 'Blue', 'Black', 'White', 'Green', 'Yellow', 'Pink', 'Purple'];

  return (
    <div className="filter-sidebar">
      <h3>Filters</h3>

      {/* Category Filter */}
      <div className="filter-section">
        <h4 
          className="filter-header"
          onClick={() => setExpandedCategory(expandedCategory === 'category' ? '' : 'category')}
        >
          Category {expandedCategory === 'category' ? '▼' : '▶'}
        </h4>
        {expandedCategory === 'category' && (
          <div className="filter-options">
            {categories.map((cat) => (
              <label key={cat} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.category === cat}
                  onChange={(e) => 
                    onFilterChange('category', e.target.checked ? cat : '')
                  }
                />
                {cat}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="filter-section">
        <h4 
          className="filter-header"
          onClick={() => setExpandedCategory(expandedCategory === 'price' ? '' : 'price')}
        >
          Price {expandedCategory === 'price' ? '▼' : '▶'}
        </h4>
        {expandedCategory === 'price' && (
          <div className="filter-options">
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => onFilterChange('minPrice', e.target.value)}
                className="price-input"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                className="price-input"
              />
            </div>
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div className="filter-section">
        <h4 
          className="filter-header"
          onClick={() => setExpandedCategory(expandedCategory === 'color' ? '' : 'color')}
        >
          Color {expandedCategory === 'color' ? '▼' : '▶'}
        </h4>
        {expandedCategory === 'color' && (
          <div className="filter-options color-options">
            {colors.map((color) => (
              <label key={color} className="color-label">
                <div 
                  className="color-dot"
                  style={{ backgroundColor: color.toLowerCase() }}
                />
                <input
                  type="checkbox"
                  checked={filters.color === color}
                  onChange={(e) =>
                    onFilterChange('color', e.target.checked ? color : '')
                  }
                />
                {color}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sort */}
      <div className="filter-section">
        <h4 className="filter-header">Sort By</h4>
        <select 
          value={filters.sortBy} 
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
          className="sort-select"
        >
          <option value="">Default</option>
          <option value="price_low">Price Low to High</option>
          <option value="price_high">Price High to Low</option>
          <option value="newest">Newest First</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      <button 
        className="clear-filters-btn"
        onClick={() => {
          onFilterChange('category', '');
          onFilterChange('minPrice', '');
          onFilterChange('maxPrice', '');
          onFilterChange('color', '');
          onFilterChange('sortBy', '');
        }}
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
