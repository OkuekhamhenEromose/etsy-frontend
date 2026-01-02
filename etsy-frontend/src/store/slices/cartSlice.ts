// src/store/slices/cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { cartAPI } from '../../api/endpoints/cart.api';
import { Cart, CartResponse, AddToCartRequest } from '../../types/api/cart.types';
import { ApiResponse } from '../../types/api/common.types';
import { CartState } from '../../types/store'; // Fixed import path

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
  addingToCart: false,
};

// Async thunks
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response: ApiResponse<Cart> = await cartAPI.getCart();
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data as Cart;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productSlug, quantity = 1, sizeId }: AddToCartRequest, { rejectWithValue }) => {
    try {
      const size_id = sizeId !== null && sizeId !== undefined ? sizeId : undefined;
      const response: ApiResponse<CartResponse> = await cartAPI.addToCart(productSlug, { 
        quantity, 
        size_id
      });
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data as CartResponse;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, action }: { itemId: number; action: 'inc' | 'dcr' | 'rmv' }, 
    { rejectWithValue }
  ) => {
    try {
      const response: ApiResponse = await cartAPI.updateCartItem(itemId, action);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return { itemId, action };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartState: (state) => {
      state.cart = null;
    },
    setCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.addingToCart = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.addingToCart = false;
        state.cart = action.payload.cart;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.addingToCart = false;
        state.error = action.payload as string;
      })
      
      // Update cart item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        if (state.cart && action.payload.action === 'rmv') {
          state.cart.items = state.cart.items.filter((item: any) => item.id !== action.payload.itemId);
        }
        // Recalculate totals after update
        if (state.cart) {
          state.cart.total = state.cart.items.reduce((sum: number, item: any) => sum + item.subtotal, 0);
          state.cart.items_count = state.cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
        }
      });
  },
});

export const { clearCartState, setCart } = cartSlice.actions;
export default cartSlice.reducer;