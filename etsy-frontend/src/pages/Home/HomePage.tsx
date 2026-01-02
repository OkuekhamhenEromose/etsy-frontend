// src/pages/Home/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchFeaturedProducts } from '../../store/slices/productSlice';
import ProductCard from '../../components/ui/Rating/product/ProductCard/ProductCard';
import Button from '../../components/ui/Button/Button';
import LoadingSpinner from '../../components/ui/LoadSpinner/LoadSpinner';
import styles from './HomePage.module.scss';
import FeaturedInterests from './HomeComponents/FeaturedInterests';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { featuredProducts, loading } = useSelector((state: RootState) => state.product);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(fetchFeaturedProducts(8));
    // Fetch categories and other data here
  }, [dispatch]);

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>
            Find unique handmade items, vintage treasures, and craft supplies
          </h1>
          <p className={styles.hero__subtitle}>
            Discover millions of one-of-a-kind items from independent sellers
          </p>
          <div className={styles.hero__actions}>
            <Button size="lg" variant="primary">
              Shop Now
            </Button>
            <Button size="lg" variant="outline">
              Explore Categories
            </Button>
          </div>
        </div>
      </section>
      
      {/* <section className={styles.section}>
        <div className={styles.section__header}>
          <h2 className={styles.section__title}>Jump into featured interests</h2>
        </div>
        <div className={styles.categoriesGrid}>
        </div>
      </section> */}
      <FeaturedInterests />

      {/* Featured Products */}
      <section className={styles.section}>
        <div className={styles.section__header}>
          <h2 className={styles.section__title}>Featured Products</h2>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        
        {loading ? (
          <div className={styles.loadingContainer}>
            <LoadingSpinner />
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className={styles.section}>
        <div className={styles.section__header}>
          <h2 className={styles.section__title}>Shop by Category</h2>
        </div>
        <div className={styles.categoriesGrid}>
          {/* Category cards will be added here */}
        </div>
      </section>

      {/* Top 100 Gifts */}
      <section className={styles.section}>
        <div className={styles.section__header}>
          <h2 className={styles.section__title}>Top 100 Gifts</h2>
          <p className={styles.section__description}>
            Curated collection of the best gifts for any occasion
          </p>
        </div>
        {/* Top 100 gifts will be added here */}
      </section>
    </div>
  );
};

export default HomePage;