import React, { useState } from 'react';
import styles from './ProductFilters.module.scss';

// Define the filter type separately to avoid circular reference
export interface FilterType {
  search: string;
  category: string;
  min_price: string;
  max_price: string;
  sort: string;
  page: string;
}

export interface ProductFiltersProps {
  filters: FilterType;
  onFilterChange: (filters: Partial<FilterType>) => void;
}

// Local filters type (different from the main filter type)
interface LocalFilterType {
  min_price: string;
  max_price: string;
  category: string;
  in_stock: boolean;
  on_sale: boolean;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState<LocalFilterType>({
    min_price: filters.min_price,
    max_price: filters.max_price,
    category: filters.category,
    in_stock: false,
    on_sale: false,
  });

  const handlePriceChange = (field: 'min_price' | 'max_price', value: string) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    
    // Convert to FilterType for the parent component
    onFilterChange({ [field]: value });
  };

  const handleCategoryChange = (category: string) => {
    const newCategory = category === localFilters.category ? '' : category;
    setLocalFilters(prev => ({ ...prev, category: newCategory }));
    onFilterChange({ category: newCategory });
  };

  const handleCheckboxChange = (field: 'in_stock' | 'on_sale') => {
    const newValue = !localFilters[field];
    setLocalFilters(prev => ({ ...prev, [field]: newValue }));
    
    // You can add filter logic here if needed
    // For example, if you want to filter by stock status:
    // onFilterChange({ [field === 'in_stock' ? 'in_stock_only' : 'on_sale']: newValue });
  };

  const clearFilters = () => {
    setLocalFilters({
      min_price: '',
      max_price: '',
      category: '',
      in_stock: false,
      on_sale: false,
    });
    onFilterChange({
      min_price: '',
      max_price: '',
      category: '',
      // Clear other filters if needed
      search: '',
      sort: '-created',
      page: '1',
    });
  };

  const categories = [
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'home', name: 'Home & Garden' },
    { id: 'art', name: 'Art & Collectibles' },
    { id: 'jewelry', name: 'Jewelry' },
    { id: 'crafts', name: 'Craft Supplies' },
  ];

  return (
    <div className={styles.productFilters}>
      <div className={styles.filtersHeader}>
        <h3 className={styles.title}>Filters</h3>
        <button 
          type="button" 
          onClick={clearFilters}
          className={styles.clearButton}
        >
          Clear All
        </button>
      </div>

      {/* Price Range */}
      <div className={styles.filterSection}>
        <h4 className={styles.filterTitle}>Price Range</h4>
        <div className={styles.priceInputs}>
          <div className={styles.priceInput}>
            <label htmlFor="min-price" className={styles.priceLabel}>Min</label>
            <div className={styles.priceWrapper}>
              <span className={styles.currency}>$</span>
              <input
                id="min-price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0"
                value={localFilters.min_price}
                onChange={(e) => handlePriceChange('min_price', e.target.value)}
                className={styles.priceInputField}
              />
            </div>
          </div>
          <div className={styles.priceSeparator}>-</div>
          <div className={styles.priceInput}>
            <label htmlFor="max-price" className={styles.priceLabel}>Max</label>
            <div className={styles.priceWrapper}>
              <span className={styles.currency}>$</span>
              <input
                id="max-price"
                type="number"
                min="0"
                step="0.01"
                placeholder="1000"
                value={localFilters.max_price}
                onChange={(e) => handlePriceChange('max_price', e.target.value)}
                className={styles.priceInputField}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className={styles.filterSection}>
        <h4 className={styles.filterTitle}>Categories</h4>
        <div className={styles.categoryList}>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`${styles.categoryButton} ${
                localFilters.category === category.id ? styles.categoryButtonActive : ''
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div className={styles.filterSection}>
        <h4 className={styles.filterTitle}>Stock Status</h4>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={localFilters.in_stock}
            onChange={() => handleCheckboxChange('in_stock')}
            className={styles.checkbox}
          />
          <span className={styles.checkboxCustom} />
          <span className={styles.checkboxText}>In Stock Only</span>
        </label>
      </div>

      {/* On Sale */}
      <div className={styles.filterSection}>
        <h4 className={styles.filterTitle}>Sale Items</h4>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={localFilters.on_sale}
            onChange={() => handleCheckboxChange('on_sale')}
            className={styles.checkbox}
          />
          <span className={styles.checkboxCustom} />
          <span className={styles.checkboxText}>On Sale</span>
        </label>
      </div>
    </div>
  );
};

export default ProductFilters;