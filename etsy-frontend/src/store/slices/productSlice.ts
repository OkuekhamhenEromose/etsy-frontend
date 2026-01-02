// src/store/slices/productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { productAPI } from '../../api/endpoints/products.api';
import { Product, ProductListResponse, ProductFilterParams } from '../../types/api/product.types';
import { ApiResponse } from '../../types/api/common.types';
import { ProductState } from '../../types/store';

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  bestsellers: [],
  deals: [],
  newArrivals: [],
  selectedProduct: null,
  loading: false,
  error: null,
  totalCount: 0,
  pageCount: 0,
  currentPage: 1,
};

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (params: ProductFilterParams = {}, { rejectWithValue }) => {
    try {
      const response: ApiResponse<ProductListResponse> = await productAPI.getAll(params);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data as ProductListResponse;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchProductBySlug = createAsyncThunk(
  'products/fetchBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response: ApiResponse<Product> = await productAPI.getBySlug(slug);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data as Product;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// FIX: Add explicit parameter type
export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeatured',
  async (limit: number = 10, { rejectWithValue }) => { // Explicitly type the parameter
    try {
      const response: ApiResponse<Product[]> = await productAPI.getFeatured(limit);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data as Product[];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductListResponse>) => {
        state.loading = false;
        state.products = action.payload.results;
        state.totalCount = action.payload.count;
        state.pageCount = action.payload.page_count;
        state.currentPage = action.payload.next 
          ? parseInt(new URL(action.payload.next).searchParams.get('page') || '1') - 1
          : 1;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch product by slug
      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch featured products
      .addCase(fetchFeaturedProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.featuredProducts = action.payload;
      });
  },
});

export const { clearSelectedProduct, clearError } = productSlice.actions;
export default productSlice.reducer;