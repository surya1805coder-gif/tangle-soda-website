import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ThreeJsCanvas from '../components/ThreeJsCanvas';
import { getFlavorById, getFlavors } from '../api/client';
import { useCart } from '../context/CartContext';
import './FlavorDetail.css';

const FLAVORS_STATIC = {
    1: { flavor_name: 'Orange', color_hex: '#FF4500', icon: '🍊', lightning: 'Orange', description: 'Bold & electric. A citrus punch that wakes you up instantly. Packed with 200mg of pure caffeine, B-vitamins, and zero sugar. The original Tangle experience.' },
    2: { flavor_name: 'Green Apple', color_hex: '#22CC44', icon: '🍏', lightning: 'Cyan', description: 'Crisp, tangy & refreshing. The rebel of the Tangle lineup. Sour-forward with a clean finish that lingers. Makes everything else taste boring.' },
    3: { flavor_name: 'Lemon', color_hex: '#FFDD00', icon: '🍋', lightning: 'White', description: 'Sour meets sweet. The most intense Tangle yet — Extreme Lemon hits hard and fades slow. Not for the faint-hearted. You\'ve been warned.' },
};

export default function FlavorDetail() {
    const { id } = useParams();
    const { addItem, cartCount } = useCart();
    const [flavor, setFlavor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const staticData = FLAVORS_STATIC[parseInt(id)] || FLAVORS_STATIC[1];
        setFlavor({ id: parseInt(id), ...staticData });

        getFlavorById(id)
            .then(res => {
                if (res.data.data) {
                    const apiF = res.data.data;
                    // Parse tags JSON string from DB
                    const tags = typeof apiF.tags === 'string' ? JSON.parse(apiF.tags || '[]') : (apiF.tags || staticData.tags || []);
                    setFlavor(prev => ({
                        ...prev,
                        ...apiF,
                        tags,
                        icon: apiF.icon || staticData.icon,
                        description: apiF.description || staticData.description,
                        lightning: apiF.lightning || staticData.lightning,
                    }));
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [id]);

    const handleAddToCart = async () => {
        if (!flavor) return;
        setAdding(true);
        const success = await addItem(flavor.id, quantity);
        setAdding(false);
        if (success) {
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        }
    };

    if (loading && !flavor) {
        return (
            <div className="flavor-detail-page page-enter">
                <div className="container" style={{ paddingTop: '140px' }}>
                    <div className="skeleton" style={{ height: '500px', borderRadius: '20px' }} />
                </div>
            </div>
        );
    }

    const config = flavor || FLAVORS_STATIC[1];

    return (
        <div className="flavor-detail-page page-enter">
            {/* Background glow */}
            <div className="fd-bg" style={{ '--fcolor': config.color_hex }} />

            <div className="container fd-inner">
                {/* Back */}
                <Link to="/flavors" className="fd-back btn btn-ghost">
                    ← Back to Flavors
                </Link>

                <div className="fd-layout">
                    {/* 3D Canvas */}
                    <div className="fd-canvas-wrap">
                        <div className="fd-canvas-glow" style={{ background: `radial-gradient(ellipse, ${config.color_hex}50 0%, transparent 65%)` }} />
                        <ThreeJsCanvas flavor={config.flavor_name} interactive={true} />
                        <p className="fd-canvas-hint">🖱️ Move mouse to interact</p>
                    </div>

                    {/* Product Info */}
                    <div className="fd-info">
                        <div className="fd-icon">{config.icon}</div>
                        <div className="badge fd-badge" style={{ background: `${config.color_hex}22`, color: config.color_hex, border: `1px solid ${config.color_hex}44` }}>
                            ⚡ {config.lightning} Lightning Edition
                        </div>
                        <h1 className="fd-title">{config.flavor_name} <span style={{ color: config.color_hex }}>ENERGY</span></h1>
                        <p className="fd-desc">{config.description}</p>

                        {/* Specs */}
                        <div className="fd-specs glass">
                            {[
                                { label: 'Caffeine', val: '200mg', icon: '⚡' },
                                { label: 'Sugar', val: '0g', icon: '🚫' },
                                { label: 'Calories', val: '10', icon: '🔥' },
                                { label: 'B-Vitamins', val: '100%', icon: '💊' },
                            ].map(({ label, val, icon }) => (
                                <div key={label} className="fd-spec">
                                    <span className="fd-spec__icon">{icon}</span>
                                    <div>
                                        <div className="fd-spec__val" style={{ color: config.color_hex }}>{val}</div>
                                        <div className="fd-spec__label">{label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Price */}
                        <div className="fd-price">
                            <span className="fd-price__amount">$20.00</span>
                            <span className="fd-price__note">per can · Free shipping</span>
                        </div>

                        {/* Quantity */}
                        <div className="fd-quantity">
                            <span className="fd-quantity__label">Quantity</span>
                            <div className="fd-qty-controls">
                                <button className="fd-qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}>−</button>
                                <span className="fd-qty-val">{quantity}</span>
                                <button className="fd-qty-btn" onClick={() => setQuantity(q => Math.min(12, q + 1))} disabled={quantity >= 12}>+</button>
                            </div>
                        </div>

                        {/* Add to cart */}
                        <div className="fd-actions">
                            <button
                                className="btn btn-primary btn-lg fd-add-btn"
                                style={{
                                    background: added ? '#22CC44' : `linear-gradient(135deg, ${config.color_hex}, ${config.color_hex}bb)`,
                                    boxShadow: `0 0 28px ${config.color_hex}60`,
                                    transition: 'all 0.4s ease'
                                }}
                                onClick={handleAddToCart}
                                disabled={adding}
                            >
                                {adding ? '⏳ Adding...' : added ? '✅ Added to Cart!' : `⚡ Add to Cart — $${(20 * quantity).toFixed(2)}`}
                            </button>
                            <Link to="/cart" className="btn btn-secondary btn-lg">
                                🛒 View Cart {cartCount > 0 && `(${cartCount})`}
                            </Link>
                        </div>

                        {/* Flavor highlights */}
                        <div className="fd-highlights">
                            {['Zero Sugar', '200mg Caffeine', 'B-Vitamins', 'Electrolytes'].map(h => (
                                <div key={h} className="fd-highlight" style={{ borderColor: `${config.color_hex}33`, color: 'rgba(255,255,255,0.7)' }}>
                                    <span style={{ color: config.color_hex }}>✓</span> {h}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related flavors */}
                <div className="fd-related">
                    <h2 className="fd-related__title">Try Other Flavors</h2>
                    <div className="fd-related__grid">
                        {Object.entries(FLAVORS_STATIC)
                            .filter(([fid]) => parseInt(fid) !== parseInt(id))
                            .map(([fid, f]) => (
                                <Link key={fid} to={`/flavors/${fid}`} className="fd-related-card glass glass-hover" style={{ '--fcolor': f.color_hex }}>
                                    <div style={{ height: '180px' }}>
                                        <ThreeJsCanvas flavor={f.flavor_name} />
                                    </div>
                                    <div style={{ padding: '16px 20px' }}>
                                        <div style={{ fontSize: '1.4rem' }}>{f.icon}</div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '4px 0 8px' }}>{f.flavor_name}</h3>
                                        <span className="btn btn-primary btn-sm" style={{ background: `linear-gradient(135deg, ${f.color_hex}, ${f.color_hex}bb)` }}>
                                            View →
                                        </span>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
