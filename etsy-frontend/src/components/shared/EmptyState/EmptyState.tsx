import React from 'react';
import Button from '../../ui/Button/Button';
import styles from './EmptyState.module.scss';

export interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  icon,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = '',
}) => {
  const defaultIcon = (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 8C18.8 8 8 18.8 8 32C8 45.2 18.8 56 32 56C45.2 56 56 45.2 56 32C56 18.8 45.2 8 32 8ZM44 40H20C18.9 40 18 39.1 18 38C18 36.9 18.9 36 20 36H44C45.1 36 46 36.9 46 38C46 39.1 45.1 40 44 40ZM44 28H20C18.9 28 18 27.1 18 26C18 24.9 18.9 24 20 24H44C45.1 24 46 24.9 46 26C46 27.1 45.1 28 44 28Z"
        fill="#D1D5DB"
      />
    </svg>
  );

  return (
    <div className={`${styles.emptyState} ${className}`}>
      <div className={styles.iconContainer}>
        {icon || defaultIcon}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        
        {message && <p className={styles.message}>{message}</p>}
        
        <div className={styles.actions}>
          {actionLabel && onAction && (
            <Button
              variant="primary"
              onClick={onAction}
              className={styles.actionButton}
            >
              {actionLabel}
            </Button>
          )}
          
          {secondaryActionLabel && onSecondaryAction && (
            <Button
              variant="outline"
              onClick={onSecondaryAction}
              className={styles.secondaryActionButton}
            >
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyState;