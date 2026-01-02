import React from 'react';
import styles from './LoadSpinner.module.scss';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color,
  className = '',
}) => {
  const sizeClasses = {
    sm: styles.spinnerSmall,
    md: styles.spinnerMedium,
    lg: styles.spinnerLarge,
  };

  const spinnerClasses = [
    styles.spinner,
    sizeClasses[size],
    className,
  ].filter(Boolean).join(' ');

  const spinnerStyle = color ? { borderTopColor: color } : {};

  return (
    <div className={spinnerClasses}>
      <div className={styles.spinnerContainer}>
        <div className={styles.spinnerInner} style={spinnerStyle} />
      </div>
    </div>
  );
};

export default LoadingSpinner;