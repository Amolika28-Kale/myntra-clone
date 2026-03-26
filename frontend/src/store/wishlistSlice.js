import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlistItems: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlistStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addToWishlistSuccess: (state, action) => {
      state.loading = false;
      state.wishlistItems = action.payload;
    },
    addToWishlistError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getWishlistStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getWishlistSuccess: (state, action) => {
      state.loading = false;
      state.wishlistItems = action.payload;
    },
    getWishlistError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeFromWishlistStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    removeFromWishlistSuccess: (state, action) => {
      state.loading = false;
      state.wishlistItems = action.payload;
    },
    removeFromWishlistError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addToWishlistStart,
  addToWishlistSuccess,
  addToWishlistError,
  getWishlistStart,
  getWishlistSuccess,
  getWishlistError,
  removeFromWishlistStart,
  removeFromWishlistSuccess,
  removeFromWishlistError,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
