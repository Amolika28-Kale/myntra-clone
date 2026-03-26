import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    brand: '',
    gender: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    color: '',
    sortBy: '',
    search: '',
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    getProductsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setFilter: (state, action) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    resetFilters: (state) => {
      state.filters = {
        brand: '',
        gender: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        color: '',
        sortBy: '',
        search: '',
      };
    },
    filterProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
  },
});

export const {
  getProductsStart,
  getProductsSuccess,
  getProductsError,
  setSelectedProduct,
  setFilter,
  resetFilters,
  filterProducts,
} = productSlice.actions;

export default productSlice.reducer;
