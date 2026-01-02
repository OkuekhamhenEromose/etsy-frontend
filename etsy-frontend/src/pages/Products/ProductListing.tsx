// src/pages/Products/ProductListing.tsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchProducts } from '../../store/slices/productSlice';
import ProductCard from '../../components/ui/Rating/product/ProductCard/ProductCard';
import ProductFilters from '../../components/product/ProductFilters/ProductFilters';
import LoadingSpinner from '../../components/ui/LoadSpinner/LoadSpinner';
import Pagination from '../../components/ui/Pagination/Pagination';
import EmptyState from '../../components/shared/EmptyState/EmptyState';
import styles from './ProductListing.module.scss';

const ProductListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { products, loading, error, totalCount, pageCount } = useSelector(
    (state: RootState) => state.product
  );
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    min_price: searchParams.get('min_price') || '',
    max_price: searchParams.get('max_price') || '',
    sort: searchParams.get('sort') || '-created',
    page: searchParams.get('page') || '1',
  });

  useEffect(() => {
    // Remove empty filters
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    );
    
    setSearchParams(activeFilters);
    dispatch(fetchProducts(activeFilters));
  }, [filters, dispatch, setSearchParams]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: '1' }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page: page.toString() }));
  };

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3>Error loading products</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.productListing}>
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Sidebar Filters */}
          <aside className={styles.sidebar}>
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </aside>

          {/* Main Content */}
          <main className={styles.main}>
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.header__content}>
                <h1 className={styles.title}>Products</h1>
                {filters.search && (
                  <p className={styles.searchResults}>
                    Search results for: "{filters.search}"
                  </p>
                )}
              </div>
              
              <div className={styles.header__controls}>
                <div className={styles.totalResults}>
                  {totalCount} products found
                </div>
                
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange({ sort: e.target.value })}
                  className={styles.sortSelect}
                >
                  <option value="-created">Newest</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                  <option value="-rating">Top Rated</option>
                  <option value="-review_count">Most Reviews</option>
                  <option value="title">Name: A-Z</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className={styles.loadingContainer}>
                <LoadingSpinner />
              </div>
            ) : products.length > 0 ? (
              <>
                <div className={styles.productsGrid}>
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {/* Pagination */}
                {pageCount > 1 && (
                  <div className={styles.paginationContainer}>
                    <Pagination
                      currentPage={parseInt(filters.page)}
                      totalPages={pageCount}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <EmptyState
                title="No products found"
                message="Try adjusting your search or filter criteria"
                actionLabel="Clear Filters"
                onAction={() => {
                  setFilters({
                    search: '',
                    category: '',
                    min_price: '',
                    max_price: '',
                    sort: '-created',
                    page: '1',
                  });
                }}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;