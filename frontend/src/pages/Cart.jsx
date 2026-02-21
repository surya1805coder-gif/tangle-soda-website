import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const FLAVOR_ICONS = { Orange: '🍊', 'Green Apple': '🍏', Lemon: '🍋' };
const FLAVOR_COLORS = { Orange: '#FF4500', 'Green Apple': '#22CC44', Lemon: '#FFDD00' };

export default function Cart() {
    const { cartItems, cartTotal, cartCount, updateItem, removeItem, loading } = useCart();

    if (loading) {
        return (
            <div className="cart-page page-enter">
                <div className="container cart-inner">
                    <div className="skeleton" style={{ height: '300px', borderRadius: '16px' }} />
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="cart-page page-enter">
                <div className="container cart-inner">
                    <div className="cart-empty glass">
                        <div className="cart-empty__icon">🛒</div>
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added any Tangle yet. Go get electrified!</p>
                        <Link to="/flavors" className="btn btn-primary btn-lg" style={{ marginTop: '24px' }}>
                            Explore Flavors ⚡
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const shipping = 0; // Free shipping
    const tax = cartTotal * 0.08;
    const orderTotal = cartTotal + tax;

    return (
        <div className="cart-page page-enter">
            <div className="container cart-inner">
                <h1 className="cart-title font-brand">YOUR CART <span className="cart-count-badge">{cartCount}</span></h1>

                <div className="cart-layout">
                    {/* Cart items */}
                    <div className="cart-items">
                        {cartItems.map(item => {
                            const color = item.color_hex || FLAVOR_COLORS[item.flavor_name] || '#FF4500';
                            const icon = FLAVOR_ICONS[item.flavor_name] || '⚡';
                            return (
                                <div key={item.id} className="cart-item glass" style={{ '--fcolor': color }}>
                                    {/* Color accent */}
                                    <div className="cart-item__accent" style={{ background: color }} />

                                    {/* Icon / visual */}
                                    <div className="cart-item__visual" style={{ background: `${color}18`, border: `1px solid ${color}33` }}>
                                        <span className="cart-item__icon">{icon}</span>
                                    </div>

                                    {/* Info */}
                                    <div className="cart-item__info">
                                        <div className="cart-item__name">Tangle {item.flavor_name}</div>
                                        <div className="cart-item__sub">Energy Drink · 12oz Can</div>
                                        <div className="cart-item__unit-price" style={{ color }}>$20.00 each</div>
                                    </div>

                                    {/* Qty controls */}
                                    <div className="cart-item__controls">
                                        <button
                                            className="cart-qty-btn"
                                            onClick={() => item.quantity > 1 ? updateItem(item.id, item.quantity - 1) : removeItem(item.id)}
                                        >−</button>
                                        <span className="cart-qty-val">{item.quantity}</span>
                                        <button
                                            className="cart-qty-btn"
                                            onClick={() => updateItem(item.id, item.quantity + 1)}
                                            disabled={item.quantity >= 12}
                                        >+</button>
                                    </div>

                                    {/* Line total */}
                                    <div className="cart-item__total">${(item.quantity * 20).toFixed(2)}</div>

                                    {/* Remove */}
                                    <button className="cart-item__remove btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>
                                        Remove
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Order summary */}
                    <div className="cart-summary glass">
                        <h2 className="cart-summary__title">Order Summary</h2>

                        <div className="cart-summary__lines">
                            <div className="cart-summary__line">
                                <span>Subtotal ({cartCount} items)</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="cart-summary__line">
                                <span>Shipping</span>
                                <span style={{ color: '#22CC44' }}>FREE</span>
                            </div>
                            <div className="cart-summary__line">
                                <span>Tax (8%)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="cart-summary__divider" />

                        <div className="cart-summary__total">
                            <span>Total</span>
                            <span>${orderTotal.toFixed(2)}</span>
                        </div>

                        <Link to="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '24px', justifyContent: 'center' }}>
                            Checkout ⚡
                        </Link>

                        <Link to="/flavors" className="btn btn-secondary" style={{ width: '100%', marginTop: '10px', justifyContent: 'center' }}>
                            + Add More Flavors
                        </Link>

                        {/* Reassurance */}
                        <div className="cart-reassure">
                            {['🔒 Secure checkout', '🚚 Free shipping', '↩️ Easy returns'].map(r => (
                                <div key={r} className="cart-reassure__item">{r}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
