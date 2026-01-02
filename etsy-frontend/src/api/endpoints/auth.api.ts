// src/api/endpoints/auth.api.ts
import { apiClient } from '../index';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  Profile 
} from '../../types/api/auth.types';
import { ApiResponse } from '../../types/api/common.types';

export const authAPI = {
  // Login
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>('/auth/login/', credentials);
  },
  
  // Register
  async register(userData: RegisterRequest): Promise<ApiResponse> {
    const formData = new FormData();
    
    Object.keys(userData).forEach(key => {
      const value = userData[key as keyof RegisterRequest];
      if (value !== undefined) {
        if (key === 'profile_pix' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });
    
    return apiClient.post('/auth/register/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // Logout
  async logout(): Promise<ApiResponse> {
    return apiClient.post('/auth/logout/');
  },
  
  // Get current user profile
  async getProfile(): Promise<ApiResponse<Profile>> {
    return apiClient.get<Profile>('/auth/dashboard/');
  },
  
  // Update profile
  async updateProfile(profileData: Partial<Profile>): Promise<ApiResponse<Profile>> {
    return apiClient.put<Profile>('/auth/update/', profileData);
  },
  
  // Refresh token
  async refreshToken(refreshToken: string): Promise<ApiResponse<{ access: string }>> {
    return apiClient.post<{ access: string }>('/auth/refresh/', {
      refresh: refreshToken,
    });
  },
};