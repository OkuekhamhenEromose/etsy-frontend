// src/api/endpoints/products.api.ts
import { apiClient } from '../index';
import { 
  Product, 
  ProductListResponse, 
  ProductFilterParams 
} from '../../types/api/product.types';
import { ApiResponse } from '../../types/api/common.types';

export const productAPI = {
  // Get all products with filters
  async getAll(params?: ProductFilterParams): Promise<ApiResponse<ProductListResponse>> {
    return apiClient.get<ProductListResponse>('/products/', { params });
  },
  
  // Get product by slug
  async getBySlug(slug: string): Promise<ApiResponse<Product>> {
    return apiClient.get<Product>(`/product/${slug}/`);
  },
  
  // Search products
  async search(query: string, params?: Partial<ProductFilterParams>): Promise<ApiResponse<ProductListResponse>> {
    return apiClient.get<ProductListResponse>('/products/', {
      params: { search: query, ...params },
    });
  },
  
  // Get featured products
  async getFeatured(limit?: number): Promise<ApiResponse<Product[]>> {
    return apiClient.get<Product[]>('/products/', {
      params: { featured: true, limit },
    });
  },
  
  // Get deals
  async getDeals(limit?: number): Promise<ApiResponse<Product[]>> {
    return apiClient.get<Product[]>('/products/', {
      params: { deal: true, limit },
    });
  },
  
  // Get new arrivals
  async getNewArrivals(limit?: number): Promise<ApiResponse<Product[]>> {
    return apiClient.get<Product[]>('/products/', {
      params: { new_arrival: true, limit },
    });
  },
};