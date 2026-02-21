import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3500/api';

const api = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});

// ── Flavors ──────────────────────────────────────────────
export const getFlavors = () => api.get('/flavors');
export const getFlavorById = (id) => api.get(`/flavors/${id}`);

// ── Products ─────────────────────────────────────────────
export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);

// ── Cart ─────────────────────────────────────────────────
export const getCart = (sessionId) => api.get(`/cart/${sessionId}`);
export const addToCart = (data) => api.post('/cart', data);
export const updateCartItem = (cartId, quantity) => api.put(`/cart/${cartId}`, { quantity });
export const removeCartItem = (cartId) => api.delete(`/cart/${cartId}`);

// ── Orders ───────────────────────────────────────────────
export const createOrder = (data) => api.post('/orders', data);
export const getOrder = (id) => api.get(`/orders/${id}`);

export default api;
