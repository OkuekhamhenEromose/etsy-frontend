// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { 
  authReducer, 
  cartReducer, 
  productReducer, 
  uiReducer 
} from './slices';
import type { ThunkAction, Action } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;