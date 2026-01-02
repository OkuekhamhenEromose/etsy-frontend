// src/types/api/order.types.ts
import { Product } from './product.types';
import { Profile } from './auth.types';

export interface OrderItem {
  id: number;
  product: Product | null;
  product_name: string;
  product_price: number;
  quantity: number;
  selected_size: string | null;
  subtotal: number;
  created: string;
  updated: string;
}

export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod = 
  | 'paystack'
  | 'paypal'
  | 'transfer'
  | 'cash';

export interface Order {
  id: number;
  order_number: string;
  user: Profile;
  amount: number;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  order_status: OrderStatus;
  order_status_display: string;
  payment_method: PaymentMethod;
  payment_method_display: string;
  payment_complete: boolean;
  items: OrderItem[];
  items_count: number;
  created: string;
  updated: string;
}