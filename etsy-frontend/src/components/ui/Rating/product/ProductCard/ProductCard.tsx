// src/components/product/ProductCard/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../../../store/hooks';
import { addToCart } from '../../../../../store/slices/cartSlice';
import { Product } from '../../../../../types/api/product.types';
import Button from '../../../Button/Button';
import Rating from '../../Rating';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ 
      productSlug: product.slug, 
      quantity: 1 
    }));
  };

  const productClasses = [
    styles.productCard,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={productClasses}>
      <Link to={`/products/${product.slug}`} className={styles.productCard__imageLink}>
        <div className={styles.productCard__imageContainer}>
          <img 
            src={product.main} 
            alt={product.title}
            className={styles.productCard__image}
            loading="lazy"
          />
          
          {/* Discount badge */}
          {product.discount_percentage > 0 && (
            <span className={styles.productCard__discountBadge}>
              -{product.discount_percentage}%
            </span>
          )}
          
          {/* Stock indicator */}
          {product.is_out_of_stock ? (
            <span className={styles.productCard__outOfStock}>
              Out of Stock
            </span>
          ) : product.is_low_stock ? (
            <span className={styles.productCard__lowStock}>
              Low Stock
            </span>
          ) : null}
        </div>
      </Link>
      
      <div className={styles.productCard__content}>
        {/* Category */}
        <div className={styles.productCard__category}>
          {product.category_name}
        </div>
        
        {/* Title */}
        <Link to={`/products/${product.slug}`} className={styles.productCard__titleLink}>
          <h3 className={styles.productCard__title}>
            {product.title}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className={styles.productCard__rating}>
          <Rating rating={product.rating} size="sm" showValue />
          <span className={styles.productCard__reviewCount}>
            ({product.review_count})
          </span>
        </div>
        
        {/* Price */}
        <div className={styles.productCard__price}>
          {product.discount_price ? (
            <>
              <span className={styles.productCard__currentPrice}>
                ${product.final_price.toFixed(2)}
              </span>
              <span className={styles.productCard__originalPrice}>
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className={styles.productCard__currentPrice}>
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Action buttons */}
        <div className={styles.productCard__actions}>
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={handleAddToCart}
            disabled={product.is_out_of_stock}
          >
            {product.is_out_of_stock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
        
        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className={styles.productCard__tags}>
            {product.tags.slice(0, 2).map(tag => (
              <span key={tag.id} className={styles.productCard__tag}>
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;