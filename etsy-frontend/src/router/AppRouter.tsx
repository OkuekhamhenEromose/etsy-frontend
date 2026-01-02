// src/router/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/store';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/Home/HomePage';
import ProductListing from '../pages/Products/ProductListing';
// import ProductDetail from '../pages/Products/ProductDetail';
import Login from '../pages/Auth/Login';
// import Register from '../pages/Auth/Register';
// import CartPage from '../pages/Cart/CartPage';
// import AccountDashboard from '../pages/Account/Dashboard';
// import NotFound from '../pages/Error/NotFound';

// Private Route Component
// const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
//   return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
// };

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListing />} />
          {/* <Route path="/product/:slug" element={<ProductDetail />} /> */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/cart" element={<CartPage />} /> */}
          
          {/* Private Routes
          <Route path="/account" element={
            <PrivateRoute>
              <AccountDashboard />
            </PrivateRoute>
          } /> */}
          
          {/* Error Routes */}
          {/* <Route path="/404" element={<NotFound />} /> */}
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;