import axios from 'axios';
import { mockProducts, mockUsers } from '../data/mockData';

const USE_MOCK = true;

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

if (!USE_MOCK) {
  API.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

const getMockCart = () => {
  return JSON.parse(localStorage.getItem('mockCart') || '{"items": [], "totalPrice": 0}');
};

const saveMockCart = (cart) => {
  localStorage.setItem('mockCart', JSON.stringify(cart));
};

const getMockWishlist = () => {
  return JSON.parse(localStorage.getItem('mockWishlist') || '[]');
};

const saveMockWishlist = (list) => {
  localStorage.setItem('mockWishlist', JSON.stringify(list));
};

const getMockOrders = () => {
  return JSON.parse(localStorage.getItem('mockOrders') || '[]');
};

const saveMockOrders = (orders) => {
  localStorage.setItem('mockOrders', JSON.stringify(orders));
};

const findProductById = (id) => {
  return mockProducts.find((p) => p._id === id);
};

const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const findUserByToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const email = token.replace('mock-token-', '');
  return mockUsers.find((u) => u.email === email) || null;
};

export const authAPI = {
  register: async (data) => {
    if (!USE_MOCK) return API.post('/auth/register', data);

    const existing = mockUsers.find((u) => u.email === data.email);
    if (existing) {
      throw { response: { data: { message: 'User already exists' } } };
    }

    const id = `user${mockUsers.length + 1}`;
    const user = { id, name: data.name || data.email.split('@')[0], email: data.email, password: data.password };
    mockUsers.push(user);
    const token = `mock-token-${data.email}`;
    localStorage.setItem('token', token);

    return {
      data: {
        data: { user: { id: user.id, name: user.name, email: user.email }, token },
      },
    };
  },

  login: async (data) => {
    if (!USE_MOCK) return API.post('/auth/login', data);

    const user = mockUsers.find((u) => u.email === data.email && u.password === data.password);
    if (!user) {
      throw { response: { data: { message: 'Invalid credentials' } } };
    }

    const token = `mock-token-${user.email}`;
    localStorage.setItem('token', token);
    return {
      data: {
        data: { user: { id: user.id, name: user.name, email: user.email }, token },
      },
    };
  },

  getMe: async () => {
    if (!USE_MOCK) return API.get('/auth/me');

    const user = findUserByToken();
    if (!user) {
      throw { response: { data: { message: 'Unauthorized' } } };
    }

    return {
      data: {
        data: { user: { id: user.id, name: user.name, email: user.email } },
      },
    };
  },
};

export const productAPI = {
  getAllProducts: async (filters = {}) => {
    if (!USE_MOCK) return API.get('/products', { params: filters });

    let list = [...mockProducts];

    if (filters.brand) {
      list = list.filter((p) => p.brand.toLowerCase() === filters.brand.toLowerCase());
    }
    if (filters.category) {
      list = list.filter((p) => p.category.toLowerCase() === filters.category.toLowerCase());
    }
    if (filters.gender) {
      list = list.filter((p) => p.gender.toLowerCase() === filters.gender.toLowerCase());
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(searchLower) || p.brand.toLowerCase().includes(searchLower));
    }
    if (filters.color) {
      list = list.filter((p) => p.colors.map((c) => c.toLowerCase()).includes(filters.color.toLowerCase()));
    }
    if (filters.minPrice) {
      list = list.filter((p) => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      list = list.filter((p) => p.price <= Number(filters.maxPrice));
    }

    if (filters.sortBy === 'price_low') {
      list.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price_high') {
      list.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'newest') {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filters.sortBy === 'popularity') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return { data: { data: list } };
  },

  getProduct: async (id) => {
    if (!USE_MOCK) return API.get(`/products/single/${id}`);

    const product = findProductById(id);
    if (!product) {
      throw { response: { data: { message: 'Product not found' } } };
    }
    return { data: { data: product } };
  },

  getProductsByBrand: async (brand) => {
    if (!USE_MOCK) return API.get(`/products/brand/${brand}`);

    const list = mockProducts.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
    return { data: { data: list } };
  },
};

export const wishlistAPI = {
  addToWishlist: async (productId) => {
    if (!USE_MOCK) return API.post('/wishlist', { productId });

    const list = getMockWishlist();
    if (!list.find((item) => item.product._id === productId)) {
      const product = findProductById(productId);
      if (!product) {
        throw { response: { data: { message: 'Product not found' } } };
      }
      list.push({ product, addedAt: new Date().toISOString() });
    }
    saveMockWishlist(list);
    return { data: { data: list } };
  },

  getWishlist: async () => {
    if (!USE_MOCK) return API.get('/wishlist');

    return { data: { data: getMockWishlist() } };
  },

  removeFromWishlist: async (productId) => {
    if (!USE_MOCK) return API.delete(`/wishlist/${productId}`);

    const list = getMockWishlist().filter((item) => item.product._id !== productId);
    saveMockWishlist(list);
    return { data: { data: list } };
  },
};

export const cartAPI = {
  addToCart: async (cartData) => {
    if (!USE_MOCK) return API.post('/cart', cartData);

    const cart = getMockCart();
    const existing = cart.items.find((item) => item.product._id === cartData.productId);
    const product = findProductById(cartData.productId);
    if (!product) {
      throw { response: { data: { message: 'Product not found' } } };
    }

    if (existing) {
      existing.quantity += cartData.quantity || 1;
      existing.selectedColor = cartData.selectedColor || existing.selectedColor;
      existing.selectedSize = cartData.selectedSize || existing.selectedSize;
    } else {
      cart.items.push({
        product,
        quantity: cartData.quantity || 1,
        selectedColor: cartData.selectedColor || product.colors[0],
        selectedSize: cartData.selectedSize || product.sizes[0],
        price: product.price,
      });
    }

    cart.totalPrice = calculateTotal(cart.items);
    saveMockCart(cart);
    return { data: { data: cart } };
  },

  getCart: async () => {
    if (!USE_MOCK) return API.get('/cart');

    return { data: { data: getMockCart() } };
  },

  updateCartItem: async (productId, data) => {
    if (!USE_MOCK) return API.put(`/cart/${productId}`, data);

    const cart = getMockCart();
    const item = cart.items.find((i) => i.product._id === productId);
    if (!item) {
      throw { response: { data: { message: 'Cart item not found' } } };
    }
    item.quantity = data.quantity ?? item.quantity;
    if (data.selectedColor) item.selectedColor = data.selectedColor;
    if (data.selectedSize) item.selectedSize = data.selectedSize;

    cart.totalPrice = calculateTotal(cart.items);
    saveMockCart(cart);
    return { data: { data: cart } };
  },

  removeFromCart: async (productId) => {
    if (!USE_MOCK) return API.delete(`/cart/${productId}`);

    const cart = getMockCart();
    cart.items = cart.items.filter((i) => i.product._id !== productId);
    cart.totalPrice = calculateTotal(cart.items);
    saveMockCart(cart);
    return { data: { data: cart } };
  },

  clearCart: async () => {
    if (!USE_MOCK) return API.delete('/cart');

    const cart = { items: [], totalPrice: 0 };
    saveMockCart(cart);
    return { data: { data: cart } };
  },
};

export const orderAPI = {
  createOrder: async (data) => {
    if (!USE_MOCK) return API.post('/orders', data);

    const orders = getMockOrders();
    const order = {
      id: `order_${orders.length + 1}`,
      items: data.items,
      totalAmount: data.totalAmount,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      phone: data.phone,
      status: 'pending',
      paymentStatus: 'completed',
      createdAt: new Date().toISOString(),
    };
    orders.push(order);
    saveMockOrders(orders);

    const cart = { items: [], totalPrice: 0 };
    saveMockCart(cart);

    return { data: { data: order } };
  },

  getUserOrders: async () => {
    if (!USE_MOCK) return API.get('/orders');

    return { data: { data: getMockOrders() } };
  },

  getOrder: async (orderId) => {
    if (!USE_MOCK) return API.get(`/orders/${orderId}`);

    const orders = getMockOrders();
    const order = orders.find((o) => o.id === orderId);
    if (!order) {
      throw { response: { data: { message: 'Order not found' } } };
    }
    return { data: { data: order } };
  },
};

export default API;

