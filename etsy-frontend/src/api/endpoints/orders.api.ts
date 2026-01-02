// src/api/endpoints/orders.api.ts
import { apiClient } from '../index';
import { ApiResponse } from '../../types/api/common.types';

export const ordersAPI = {
  // Get user orders
  async getUserOrders(): Promise<ApiResponse<any>> {
    return apiClient.get('/my-orders/');
  },
  
  // Get order by number
  async getOrderByNumber(orderNumber: string): Promise<ApiResponse<any>> {
    return apiClient.get(`/order/${orderNumber}/`);
  },
  
  // Create order (checkout)
  async createOrder(orderData: any): Promise<ApiResponse<any>> {
    return apiClient.post('/checkout/', orderData);
  },
};