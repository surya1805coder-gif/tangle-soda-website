import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrder } from '../api/client';
import ThreeJsCanvas from '../components/ThreeJsCanvas';
import './OrderConfirmation.css';

const FLAVOR_ICONS = { Orange: '🍊', 'Green Apple': '🍏', Lemon: '🍋' };
const FLAVOR_COLORS = { Orange: '#FF4500', 'Green Apple': '#22CC44', Lemon: '#FFDD00' };

export default function OrderConfirmation() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOrder(id)
            .then(res => setOrder(res.data.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="oc-page page-enter">
                <div className="container oc-inner">
                    <div className="skeleton" style={{ height: '400px', borderRadius: '20px' }} />
                </div>
            </div>
        );
    }

    return (
        <div className="oc-page page-enter">
            <div className="oc-bg" />

            <div className="container oc-inner">
                {/* Success animation */}
                <div className="oc-success-icon animate-bounce">⚡</div>
                <h1 className="oc-title font-brand">ORDER CONFIRMED!</h1>
                <p className="oc-subtitle">You're officially <strong>electrified</strong>. Your Tangle is on the way!</p>

                <div className="oc-layout">
                    {/* Order details */}
                    <div className="oc-details">
                        <div className="oc-card glass">
                            <div className="oc-card__header">
                                <span className="oc-order-num">Order #{id}</span>
                                <span className="oc-status">
                                    <span className="oc-status-dot" />
                                    Pending
                                </span>
                            </div>

                            {order?.shippingAddress && (
                                <div className="oc-shipping">
                                    <h3 className="oc-card__label">📦 Shipping To</h3>
                                    <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                                        {order.shippingAddress.address}<br />
                                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                                        {order.shippingAddress.email}
                                    </p>
                                </div>
                            )}

                            {order?.items?.length > 0 && (
                                <div className="oc-items">
                                    <h3 className="oc-card__label">🛒 Items Ordered</h3>
                                    {order.items.map(item => (
                                        <div key={item.id} className="oc-item" style={{ '--fcolor': item.color_hex || FLAVOR_COLORS[item.flavor_name] || '#FF4500' }}>
                                            <span className="oc-item__icon">{FLAVOR_ICONS[item.flavor_name] || '⚡'}</span>
                                            <div className="oc-item__info">
                                                <div>Tangle {item.flavor_name}</div>
                                                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>×{item.quantity}</div>
                                            </div>
                                            <div className="oc-item__price">${(item.quantity * (item.price_at_purchase || 20)).toFixed(2)}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="oc-total">
                                <span>Total Charged</span>
                                <span>${parseFloat(order?.total_price || 0).toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Expected delivery */}
                        <div className="oc-delivery glass">
                            <div className="oc-delivery__steps">
                                {['Order Placed ✅', 'Processing 🔄', 'Shipped 🚚', 'Delivered 🏠'].map((s, i) => (
                                    <div key={s} className={`oc-delivery__step ${i === 0 ? 'done' : ''}`}>
                                        <div className="oc-delivery__dot" />
                                        <div className="oc-delivery__label">{s}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="oc-actions">
                            <Link to="/flavors" className="btn btn-primary btn-lg">
                                Shop More Flavors ⚡
                            </Link>
                            <Link to="/" className="btn btn-secondary btn-lg">
                                Back to Home
                            </Link>
                        </div>
                    </div>

                    {/* 3D Can */}
                    <div className="oc-canvas-wrap">
                        <div className="oc-canvas-glow" />
                        {order?.items?.[0] ? (
                            <ThreeJsCanvas flavor={order.items[0].flavor_name || 'Orange'} />
                        ) : (
                            <ThreeJsCanvas flavor="Orange" />
                        )}
                        <p className="oc-canvas-label">Your order has been electrified! ⚡</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
