// src/components/layout/Layout.tsx
import React from 'react';
import Header from './Header/Header';
// import Footer from './Footer/Footer';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.layout__main}>
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;