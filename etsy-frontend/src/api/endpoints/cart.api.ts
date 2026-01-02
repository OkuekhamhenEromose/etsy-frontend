// src/api/endpoints/cart.api.ts
import { apiClient } from '../index';
import { 
  Cart, 
  CartResponse, 
} from '../../types/api/cart.types';
import { ApiResponse } from '../../types/api/common.types';

export const cartAPI = {
  // Get cart
  async getCart(): Promise<ApiResponse<Cart>> {
    return apiClient.get<Cart>('/my-cart/');
  },
  
  // Add to cart
  async addToCart(slug: string, data: { quantity: number; size_id?: number }): Promise<ApiResponse<CartResponse>> {
    return apiClient.post<CartResponse>(`/add-to-cart/${slug}/`, data);
  },
  
  // Update cart item
  async updateCartItem(itemId: number, action: 'inc' | 'dcr' | 'rmv'): Promise<ApiResponse> {
    return apiClient.post(`/manage-cart/${itemId}/`, { action });
  },
  
  // Clear cart
  async clearCart(): Promise<ApiResponse> {
    // Note: You'll need to implement this endpoint in your backend
    return apiClient.delete('/clear-cart/');
  },
};