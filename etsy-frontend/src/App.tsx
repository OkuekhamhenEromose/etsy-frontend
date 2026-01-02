// src/App.tsx
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store, AppDispatch } from './store/store';
import AppRouter from './router/AppRouter';
import { fetchCart } from './store/slices/cartSlice';
import { getProfile } from './store/slices/authSlice';
// import './App.scss';

// Component to initialize app data
const AppInitializer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('access_token');
    if (token) {
      dispatch(getProfile());
      dispatch(fetchCart());
    }
  }, [dispatch]);

  return <AppRouter />;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppInitializer />
    </Provider>
  );
};

export default App;