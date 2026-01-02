// src/api/index.ts
import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig,AxiosResponse, AxiosError } from 'axios';
import { ApiResponse } from '../types/api/common.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class ApiClient {
  private instance: AxiosInstance;
  
  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    this.setupInterceptors();
  }
  
  private setupInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('access_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );
    
    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
              refresh: refreshToken,
            });
            
            const { access } = response.data;
            localStorage.setItem('access_token', access);
            
            originalRequest.headers.Authorization = `Bearer ${access}`;
            return this.instance(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }
  
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.get<T>(url, config);
      return { data: response.data, status: response.status };
    } catch (error) {
      return this.handleError(error as AxiosError);
    }
  }
  
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.post<T>(url, data, config);
      return { data: response.data, status: response.status };
    } catch (error) {
      return this.handleError(error as AxiosError);
    }
  }
  
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.put<T>(url, data, config);
      return { data: response.data, status: response.status };
    } catch (error) {
      return this.handleError(error as AxiosError);
    }
  }
  
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.delete<T>(url, config);
      return { data: response.data, status: response.status };
    } catch (error) {
      return this.handleError(error as AxiosError);
    }
  }
  
  private handleError(error: AxiosError): ApiResponse {
    if (error.response) {
      const data = error.response.data as any;
      return {
        error: data?.error || data?.message || 'An error occurred',
        status: error.response.status,
      };
    } else if (error.request) {
      return {
        error: 'No response received from server',
        status: 0,
      };
    } else {
      return {
        error: error.message,
        status: 0,
      };
    }
  }
}

export const apiClient = new ApiClient();
export default apiClient;