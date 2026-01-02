// src/config/env.ts
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'EtsyClone';
export const IS_DEV = import.meta.env.VITE_DEBUG === 'true' || process.env.NODE_ENV === 'development';