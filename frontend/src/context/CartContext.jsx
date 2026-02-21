import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCart, addToCart, updateCartItem, removeCartItem } from '../api/client';

const CartContext = createContext(null);

// Generate or retrieve a browser session ID
function getSessionId() {
    let id = localStorage.getItem('tangle_session');
    if (!id) {
        id = 'sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem('tangle_session', id);
    }
    return id;
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const sessionId = getSessionId();

    const fetchCart = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getCart(sessionId);
            setCartItems(res.data.data || []);
        } catch (err) {
            console.error('Cart fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, [sessionId]);

    useEffect(() => { fetchCart(); }, [fetchCart]);

    const addItem = async (flavorId, quantity = 1) => {
        try {
            await addToCart({ sessionId, flavorId, quantity });
            await fetchCart();
            return true;
        } catch (err) {
            console.error('Add to cart error:', err);
            return false;
        }
    };

    const updateItem = async (cartId, quantity) => {
        try {
            await updateCartItem(cartId, quantity);
            await fetchCart();
        } catch (err) {
            console.error('Update cart error:', err);
        }
    };

    const removeItem = async (cartId) => {
        try {
            await removeCartItem(cartId);
            setCartItems(prev => prev.filter(i => i.id !== cartId));
        } catch (err) {
            console.error('Remove cart error:', err);
        }
    };

    const clearCart = () => setCartItems([]);

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cartItems.reduce((sum, item) => sum + (item.quantity * 20), 0);

    return (
        <CartContext.Provider value={{
            cartItems, cartCount, cartTotal,
            loading, sessionId,
            addItem, updateItem, removeItem, clearCart, refreshCart: fetchCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used inside CartProvider');
    return ctx;
}
