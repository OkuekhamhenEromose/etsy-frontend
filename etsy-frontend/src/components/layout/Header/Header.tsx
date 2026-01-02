// src/components/layout/Header/Header.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import { logout } from '../../../store/slices/authSlice';
import Button from '../../ui/Button/Button';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth);
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const cartItemsCount = cart?.items_count || 0;

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        {/* Logo */}
        <div className={styles.header__logo}>
          <Link to="/" className={styles.header__logoLink}>
            <span className={styles.header__logoText}>EtsyClone</span>
          </Link>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className={styles.header__search}>
          <div className={styles.header__searchContainer}>
            <input
              type="text"
              placeholder="Search for anything"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.header__searchInput}
            />
            <button type="submit" className={styles.header__searchButton}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>
        </form>

        {/* Navigation */}
        <nav className={styles.header__nav}>
          {isAuthenticated ? (
            <>
              <Link to="/account" className={styles.header__navLink}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>{user?.fullname}</span>
              </Link>
              
              <Link to="/cart" className={styles.header__cartLink}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {cartItemsCount > 0 && (
                  <span className={styles.header__cartBadge}>
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="sm">
                  Register
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;