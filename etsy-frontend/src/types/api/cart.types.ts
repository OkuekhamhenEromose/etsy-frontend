// src/types/api/cart.types.ts
import { Product } from './product.types';
import { ProductSize } from './product.types';
import { Profile } from './auth.types';

export interface CartProduct {
  id: number;
  product: Product;
  product_id: number;
  quantity: number;
  selected_size: ProductSize | null;
  subtotal: number;
}

export interface Cart {
  id: number;
  profile: Profile | null;
  total: number;
  items: CartProduct[];
  items_count: number;
  created: string;
  updated: string;
}

export interface AddToCartRequest {
  productSlug: string;
  quantity: number;
  sizeId?: number | null;
}

export interface CartResponse {
  cart: Cart;
  message: string;
}