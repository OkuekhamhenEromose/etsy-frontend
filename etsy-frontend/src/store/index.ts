// src/types/store/index.ts
import { Profile } from '../types/api/auth.types';
import { Product } from '../types/api/product.types';
import { Cart } from '../types/api/cart.types';

export interface AuthState {
  user: Profile | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface ProductState {
  products: Product[];
  featuredProducts: Product[];
  bestsellers: Product[];
  deals: Product[];
  newArrivals: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
  pageCount: number;
  currentPage: number;
}

export interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  addingToCart: boolean;
}

export interface UIState {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  loading: boolean;
  notification: {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    show: boolean;
  } | null;
}

export interface RootState {
  auth: AuthState;
  product: ProductState;
  cart: CartState;
  ui: UIState;
}