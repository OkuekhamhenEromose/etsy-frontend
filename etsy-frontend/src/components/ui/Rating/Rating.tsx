// src/components/ui/Rating/Rating.tsx
import React from 'react';
// import styles from './Rating.module.scss';

interface RatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  maxStars?: number;
}

const Rating: React.FC<RatingProps> = ({ 
  rating, 
  size = 'md', 
  showValue = false, 
  maxStars = 5 
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`${styles.rating} ${styles[`rating--${size}`]}`}>
      <div className={styles.rating__stars}>
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, index) => (
          <span key={`full-${index}`} className={styles.rating__star}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </span>
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <span className={styles.rating__star}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <defs>
                <linearGradient id="half">
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="#e5e7eb" />
                </linearGradient>
              </defs>
              <path fill="url(#half)" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </span>
        )}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <span key={`empty-${index}`} className={`${styles.rating__star} ${styles['rating__star--empty']}`}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </span>
        ))}
      </div>
      
      {showValue && (
        <span className={styles.rating__value}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;