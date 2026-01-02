// src/api/endpoints/categories.api.ts
import { apiClient } from '../index';
import { Category } from '../../types/api/product.types';
import { ApiResponse } from '../../types/api/common.types';

export const categoryAPI = {
  // Get all categories
  async getAll(): Promise<ApiResponse<Category[]>> {
    return apiClient.get<Category[]>('/categories/');
  },
  
  // Get category by slug
  async getBySlug(slug: string): Promise<ApiResponse<Category>> {
    return apiClient.get<Category>(`/category/${slug}/`);
  },
  
  // Get category products
  async getCategoryProducts(slug: string, params?: any): Promise<ApiResponse<any>> {
    return apiClient.get(`/category/${slug}/products/`, { params });
  },
  
  // Get navigation data
  async getNavigation(): Promise<ApiResponse<any>> {
    return apiClient.get('/navigation/');
  },
  
  // Get top 100 gifts
  async getTop100Gifts(random?: boolean, count?: number): Promise<ApiResponse<any>> {
    const params: any = {};
    if (random) params.random = 'true';
    if (count) params.count = count;
    return apiClient.get('/top-100-gifts/', { params });
  },
};