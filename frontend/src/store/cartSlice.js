import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalPrice: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addToCartSuccess: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload.items || [];
      state.totalPrice = action.payload.totalPrice || 0;
    },
    addToCartError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCartSuccess: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload.items || [];
      state.totalPrice = action.payload.totalPrice || 0;
    },
    getCartError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeFromCartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    removeFromCartSuccess: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload.items || [];
      state.totalPrice = action.payload.totalPrice || 0;
    },
    removeFromCartError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCartItemStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateCartItemSuccess: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload.items || [];
      state.totalPrice = action.payload.totalPrice || 0;
    },
    updateCartItemError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    clearCartSuccess: (state) => {
      state.loading = false;
      state.cartItems = [];
      state.totalPrice = 0;
    },
    clearCartError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addToCartStart,
  addToCartSuccess,
  addToCartError,
  getCartStart,
  getCartSuccess,
  getCartError,
  removeFromCartStart,
  removeFromCartSuccess,
  removeFromCartError,
  updateCartItemStart,
  updateCartItemSuccess,
  updateCartItemError,
  clearCartStart,
  clearCartSuccess,
  clearCartError,
} = cartSlice.actions;

export default cartSlice.reducer;
