import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThreeJsCanvas from '../components/ThreeJsCanvas';
import { getFlavors } from '../api/client';
import './Home.css';

const FLAVORS_STATIC = [
    { id: 1, flavor_name: 'Orange', color_hex: '#FF4500', description: 'Bold & electric. A citrus punch that wakes you up instantly.', icon: '🍊' },
    { id: 2, flavor_name: 'Green Apple', color_hex: '#22CC44', description: 'Crisp, tangy & refreshing. The rebel of the Tangle lineup.', icon: '🍏' },
    { id: 3, flavor_name: 'Lemon', color_hex: '#FFDD00', description: 'Sour meets sweet. The perfect electrifying hit of extreme lemon.', icon: '🍋' },
];

export default function Home() {
    const [flavors, setFlavors] = useState(FLAVORS_STATIC);
    const [activeFlavor, setActiveFlavor] = useState('Orange');

    useEffect(() => {
        getFlavors()
            .then(res => { if (res.data.data?.length) setFlavors(res.data.data); })
            .catch(() => { });
    }, []);

    const activeConfig = flavors.find(f => f.flavor_name === activeFlavor) || flavors[0];

    return (
        <div className="home page-enter">
            {/* ── HERO ── */}
            <section className="hero">
                <div className="hero__bg" style={{ '--hero-color': activeConfig?.color_hex || '#FF4500' }} />

                <div className="container hero__inner">
                    {/* Text side */}
                    <div className="hero__text">
                        <div className="badge hero__badge" style={{ background: `${activeConfig?.color_hex}22`, color: activeConfig?.color_hex, border: `1px solid ${activeConfig?.color_hex}44` }}>
                            ⚡ Energy Unleashed
                        </div>
                        <h1 className="hero__title font-brand">
                            <span>TANGLE</span>
                            <span className="hero__title-sub">ENERGY</span>
                        </h1>
                        <p className="hero__desc">
                            Three electrifying flavors. A jolt of energy that hits different.
                            Made for the bold. Designed to make you <em>feel alive</em>.
                        </p>

                        {/* Flavor switcher */}
                        <div className="hero__flavors">
                            {(flavors.length > 0 ? flavors : FLAVORS_STATIC).map(f => (
                                <button
                                    key={f.flavor_name}
                                    className={`hero__flavor-btn ${activeFlavor === f.flavor_name ? 'active' : ''}`}
                                    style={{
                                        '--fc': f.color_hex,
                                        borderColor: activeFlavor === f.flavor_name ? f.color_hex : 'transparent',
                                        background: activeFlavor === f.flavor_name ? `${f.color_hex}22` : 'rgba(255,255,255,0.04)',
                                    }}
                                    onClick={() => setActiveFlavor(f.flavor_name)}
                                >
                                    <span className="flavor-dot" style={{ background: f.color_hex }} />
                                    {f.flavor_name}
                                </button>
                            ))}
                        </div>

                        <div className="hero__ctas">
                            <Link to="/flavors" className="btn btn-primary btn-lg">
                                Explore Flavors ⚡
                            </Link>
                            <Link to="/cart" className="btn btn-secondary btn-lg">
                                View Cart
                            </Link>
                        </div>
                    </div>

                    {/* 3D Can */}
                    <div className="hero__canvas-wrap">
                        <div className="hero__canvas-glow" style={{ background: `radial-gradient(ellipse, ${activeConfig?.color_hex}40 0%, transparent 70%)` }} />
                        <ThreeJsCanvas flavor={activeFlavor} interactive={false} />
                    </div>
                </div>

                {/* Scroll cue */}
                <div className="hero__scroll-cue animate-bounce">
                    <span>scroll</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                </div>
            </section>

            {/* ── STATS ── */}
            <section className="stats-bar">
                <div className="container stats-bar__inner">
                    {[
                        { val: '3', label: 'Epic Flavors' },
                        { val: '200mg', label: 'Caffeine' },
                        { val: '0g', label: 'Sugar' },
                        { val: '100%', label: 'Electrified' },
                    ].map(({ val, label }) => (
                        <div key={label} className="stat-item">
                            <div className="stat-item__val font-brand">{val}</div>
                            <div className="stat-item__label">{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FLAVOR SHOWCASE ── */}
            <section className="section flavor-showcase">
                <div className="container">
                    <div className="section-header">
                        <span className="badge" style={{ background: 'rgba(255,69,0,0.12)', color: '#FF4500' }}>⚡ The Lineup</span>
                        <h2 className="section-title">Pick Your Poison</h2>
                        <p className="section-desc">Three ways to get electrified. Each flavor hits different.</p>
                    </div>

                    <div className="flavors-grid">
                        {(flavors.length > 0 ? flavors : FLAVORS_STATIC).map((flavor, i) => {
                            const staticF = FLAVORS_STATIC.find(f => f.flavor_name === flavor.flavor_name) || FLAVORS_STATIC[0];
                            return (
                                <Link
                                    key={flavor.id}
                                    to={`/flavors/${flavor.id}`}
                                    className="flavor-card glass glass-hover"
                                    style={{ '--fcolor': flavor.color_hex, animationDelay: `${i * 0.1}s` }}
                                >
                                    <div className="flavor-card__canvas">
                                        <ThreeJsCanvas flavor={flavor.flavor_name} />
                                    </div>
                                    <div className="flavor-card__info">
                                        <div className="flavor-card__icon">{staticF.icon}</div>
                                        <h3 className="flavor-card__name">{flavor.flavor_name}</h3>
                                        <p className="flavor-card__desc">{staticF.description}</p>
                                        <div className="flavor-card__price">$20.00</div>
                                        <div className="flavor-card__cta btn btn-primary" style={{ background: `linear-gradient(135deg, ${flavor.color_hex}, ${flavor.color_hex}cc)`, boxShadow: `0 0 20px ${flavor.color_hex}55` }}>
                                            Shop Now →
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── BRAND STORY ── */}
            <section className="section brand-story">
                <div className="container brand-story__inner">
                    <div className="brand-story__text">
                        <span className="badge" style={{ background: 'rgba(255,165,0,0.12)', color: '#FFA500' }}>Our Story</span>
                        <h2 className="section-title">Born to Electrify</h2>
                        <p>
                            Tangle was created for the generation that doesn't slow down.
                            Teens, gamers, creators — people who need fuel that matches their energy.
                        </p>
                        <p>
                            Each can is packed with 200mg of caffeine, zero sugar, and a full lineup
                            of B-vitamins. The lightning on the can isn't just design — it's a promise.
                        </p>
                        <Link to="/flavors" className="btn btn-primary" style={{ marginTop: '24px' }}>
                            Try All 3 Flavors ⚡
                        </Link>
                    </div>
                    <div className="brand-story__visual">
                        <div className="brand-story__canvas">
                            <ThreeJsCanvas flavor="Orange" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA SECTION ── */}
            <section className="section cta-section">
                <div className="container cta-section__inner glass">
                    <div className="cta-section__glow" />
                    <h2 className="font-brand cta-section__title">READY TO TANGLE?</h2>
                    <p className="cta-section__desc">$20 per can. Free shipping. Zero regrets.</p>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Link to="/flavors" className="btn btn-primary btn-lg">Shop Now ⚡</Link>
                        <Link to="/cart" className="btn btn-secondary btn-lg">View Cart</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
