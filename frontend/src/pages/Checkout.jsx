import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api/client';
import './Checkout.css';

const FLAVOR_ICONS = { Orange: '🍊', 'Green Apple': '🍏', Lemon: '🍋' };

export default function Checkout() {
    const { cartItems, cartTotal, sessionId, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1=shipping, 2=payment, 3=review
    const [submitting, setSubmitting] = useState(false);

    const [shipping, setShipping] = useState({
        firstName: '', lastName: '', email: '',
        address: '', city: '', state: '', zip: '', country: 'US'
    });
    const [payment, setPayment] = useState({
        cardName: '', cardNumber: '', expiry: '', cvv: ''
    });

    const tax = cartTotal * 0.08;
    const total = cartTotal + tax;

    const updateShipping = (e) => setShipping(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const updatePayment = (e) => setPayment(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handlePlaceOrder = async () => {
        setSubmitting(true);
        try {
            const res = await createOrder({
                sessionId,
                items: cartItems.map(i => ({ flavor_id: i.flavor_id, quantity: i.quantity, price: i.price ?? 20 })),
                shippingAddress: shipping,
                email: shipping.email,
                total: total.toFixed(2),
            });
            clearCart();
            navigate(`/orders/${res.data.data.orderId}`);
        } catch (err) {
            alert('Order failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="checkout-page page-enter">
                <div className="container" style={{ paddingTop: '140px', textAlign: 'center' }}>
                    <h2>Nothing to checkout!</h2>
                    <Link to="/flavors" className="btn btn-primary" style={{ marginTop: '20px' }}>
                        Shop Flavors ⚡
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page page-enter">
            <div className="container checkout-inner">
                <Link to="/cart" className="btn btn-ghost checkout-back">← Back to Cart</Link>
                <h1 className="checkout-title font-brand">CHECKOUT</h1>

                <div className="checkout-layout">
                    {/* Left: Steps */}
                    <div className="checkout-steps">
                        {/* Step indicators */}
                        <div className="step-indicators">
                            {['Shipping', 'Payment', 'Review'].map((s, i) => (
                                <div key={s} className={`step-indicator ${step > i + 1 ? 'done' : step === i + 1 ? 'active' : ''}`}>
                                    <div className="step-indicator__num">{step > i + 1 ? '✓' : i + 1}</div>
                                    <span>{s}</span>
                                </div>
                            ))}
                        </div>

                        {/* STEP 1: Shipping */}
                        {step === 1 && (
                            <div className="checkout-form glass animate-fadeInUp">
                                <h2 className="checkout-form__title">📦 Shipping Information</h2>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">First Name</label>
                                        <input className="form-input" name="firstName" value={shipping.firstName} onChange={updateShipping} placeholder="John" required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Last Name</label>
                                        <input className="form-input" name="lastName" value={shipping.lastName} onChange={updateShipping} placeholder="Doe" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input className="form-input" name="email" type="email" value={shipping.email} onChange={updateShipping} placeholder="john@example.com" required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Street Address</label>
                                    <input className="form-input" name="address" value={shipping.address} onChange={updateShipping} placeholder="123 Main Street" required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">City</label>
                                        <input className="form-input" name="city" value={shipping.city} onChange={updateShipping} placeholder="New York" required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">State</label>
                                        <input className="form-input" name="state" value={shipping.state} onChange={updateShipping} placeholder="NY" required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">ZIP</label>
                                        <input className="form-input" name="zip" value={shipping.zip} onChange={updateShipping} placeholder="10001" required />
                                    </div>
                                </div>
                                <button
                                    className="btn btn-primary btn-lg checkout-next-btn"
                                    onClick={() => setStep(2)}
                                    disabled={!shipping.firstName || !shipping.email || !shipping.address}
                                >
                                    Continue to Payment →
                                </button>
                            </div>
                        )}

                        {/* STEP 2: Payment */}
                        {step === 2 && (
                            <div className="checkout-form glass animate-fadeInUp">
                                <h2 className="checkout-form__title">💳 Payment Details</h2>
                                <div className="payment-card-display glass">
                                    <div className="payment-card-display__chip">▬</div>
                                    <div className="payment-card-display__number">
                                        {payment.cardNumber.replace(/(.{4})/g, '$1 ').trim() || '•••• •••• •••• ••••'}
                                    </div>
                                    <div className="payment-card-display__bottom">
                                        <div>{payment.cardName || 'FULL NAME'}</div>
                                        <div>{payment.expiry || 'MM/YY'}</div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Name on Card</label>
                                    <input className="form-input" name="cardName" value={payment.cardName} onChange={updatePayment} placeholder="John Doe" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Card Number</label>
                                    <input
                                        className="form-input"
                                        name="cardNumber"
                                        value={payment.cardNumber}
                                        onChange={(e) => {
                                            const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                                            setPayment(p => ({ ...p, cardNumber: v }));
                                        }}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength={16}
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Expiry</label>
                                        <input className="form-input" name="expiry" value={payment.expiry} onChange={updatePayment} placeholder="MM/YY" maxLength={5} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">CVV</label>
                                        <input className="form-input" name="cvv" value={payment.cvv} onChange={updatePayment} placeholder="123" maxLength={4} type="password" />
                                    </div>
                                </div>
                                <div className="checkout-form__btns">
                                    <button className="btn btn-secondary" onClick={() => setStep(1)}>← Back</button>
                                    <button
                                        className="btn btn-primary btn-lg"
                                        onClick={() => setStep(3)}
                                        disabled={!payment.cardName || !payment.cardNumber}
                                    >
                                        Review Order →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: Review */}
                        {step === 3 && (
                            <div className="checkout-form glass animate-fadeInUp">
                                <h2 className="checkout-form__title">✅ Review Order</h2>
                                <div className="review-section">
                                    <h3>📦 Shipping to</h3>
                                    <p>{shipping.firstName} {shipping.lastName}</p>
                                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                                        {shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}<br />
                                        {shipping.email}
                                    </p>
                                </div>
                                <div className="review-section">
                                    <h3>💳 Payment</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.5)' }}>Card ending in ···· {payment.cardNumber.slice(-4)}</p>
                                </div>
                                <div className="review-items">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="review-item">
                                            <span>{FLAVOR_ICONS[item.flavor_name]} Tangle {item.flavor_name} ×{item.quantity}</span>
                                            <span>${(item.quantity * (item.price ?? 20)).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="checkout-form__btns">
                                    <button className="btn btn-secondary" onClick={() => setStep(2)}>← Back</button>
                                    <button
                                        className="btn btn-primary btn-lg"
                                        onClick={handlePlaceOrder}
                                        disabled={submitting}
                                        style={{ background: 'linear-gradient(135deg, #22CC44, #00FFAA)', boxShadow: '0 0 24px rgba(34,204,68,0.5)' }}
                                    >
                                        {submitting ? '⏳ Placing Order...' : `⚡ Place Order — $${total.toFixed(2)}`}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Order Summary */}
                    <div className="checkout-summary glass">
                        <h2 className="checkout-summary__title">Order Summary</h2>
                        <div className="checkout-summary__items">
                            {cartItems.map(item => (
                                <div key={item.id} className="checkout-summary__item">
                                    <span>{FLAVOR_ICONS[item.flavor_name] || '⚡'} Tangle {item.flavor_name} ×{item.quantity}</span>
                                    <span>${(item.quantity * (item.price ?? 20)).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="checkout-summary__divider" />
                        <div className="checkout-summary__line"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                        <div className="checkout-summary__line"><span>Shipping</span><span style={{ color: '#22CC44' }}>FREE</span></div>
                        <div className="checkout-summary__line"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                        <div className="checkout-summary__divider" />
                        <div className="checkout-summary__total"><span>Total</span><span>${total.toFixed(2)}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
