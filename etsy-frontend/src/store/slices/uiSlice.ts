// src/store/slices/uiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState } from '../../types/store'; // Fixed import path

const initialState: UIState = {
  sidebarOpen: false,
  mobileMenuOpen: false,
  loading: false,
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    showNotification: (
      state,
      action: PayloadAction<{
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
      }>
    ) => {
      state.notification = {
        ...action.payload,
        show: true,
      };
    },
    hideNotification: (state) => {
      if (state.notification) {
        state.notification.show = false;
      }
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const {
  toggleSidebar,
  toggleMobileMenu,
  setLoading,
  showNotification,
  hideNotification,
  clearNotification,
} = uiSlice.actions;

export default uiSlice.reducer;