import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThreeJsCanvas from '../components/ThreeJsCanvas';
import { getFlavors } from '../api/client';
import './Flavors.css';

const FLAVORS_STATIC = [
    { id: 1, flavor_name: 'Orange', color_hex: '#FF4500', icon: '🍊', description: 'Bold & electric. A citrus punch that wakes you up instantly. Packed with 200mg caffeine and zero sugar.', lightning: 'Orange Lightning', tags: ['Citrus', 'Bold', 'Electric'] },
    { id: 2, flavor_name: 'Green Apple', color_hex: '#22CC44', icon: '🍏', description: 'Crisp, tangy & refreshing. The rebel of the Tangle lineup. Sour-forward with a clean finish.', lightning: 'Cyan Lightning', tags: ['Crisp', 'Tangy', 'Rebel'] },
    { id: 3, flavor_name: 'Lemon', color_hex: '#FFDD00', icon: '🍋', description: 'Sour meets sweet. The perfect electrifying hit of extreme lemon. Our most intense flavor.', lightning: 'White Lightning', tags: ['Sour', 'Sweet', 'Intense'] },
];

export default function Flavors() {
    const [flavors, setFlavors] = useState(FLAVORS_STATIC);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFlavors()
            .then(res => {
                if (res.data.data?.length) {
                    const merged = res.data.data.map(apiF => {
                        const staticF = FLAVORS_STATIC.find(s => s.flavor_name === apiF.flavor_name) || FLAVORS_STATIC[0];
                        // Parse tags JSON string from DB if it's a string
                        const tags = typeof apiF.tags === 'string' ? JSON.parse(apiF.tags || '[]') : (apiF.tags || staticF.tags);
                        return {
                            ...staticF,
                            ...apiF,
                            tags,
                            icon: apiF.icon || staticF.icon,
                            description: apiF.description || staticF.description,
                            lightning: apiF.lightning || staticF.lightning,
                        };
                    });
                    setFlavors(merged);
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="flavors-page page-enter">
            {/* Header */}
            <section className="flavors-hero">
                <div className="flavors-hero__glow" />
                <div className="container">
                    <span className="badge" style={{ background: 'rgba(255,69,0,0.12)', color: '#FF4500', marginBottom: '16px', display: 'inline-block' }}>
                        ⚡ The Lineup
                    </span>
                    <h1 className="flavors-hero__title font-brand">ALL FLAVORS</h1>
                    <p className="flavors-hero__desc">
                        Three electrifying choices. Each one crafted to hit differently.
                        Pick your weapon.
                    </p>
                </div>
            </section>

            {/* Flavor cards */}
            <section className="section">
                <div className="container">
                    {loading ? (
                        <div className="flavors-loading">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="skeleton" style={{ height: '500px', borderRadius: '20px' }} />
                            ))}
                        </div>
                    ) : (
                        <div className="flavors-list">
                            {flavors.map((flavor, i) => (
                                <div
                                    key={flavor.id}
                                    className={`flavor-detail-card glass ${i % 2 === 1 ? 'reverse' : ''}`}
                                    style={{ '--fcolor': flavor.color_hex }}
                                >
                                    {/* 3D Canvas side */}
                                    <div className="flavor-detail-card__canvas">
                                        <ThreeJsCanvas flavor={flavor.flavor_name} />
                                        <div className="flavor-detail-card__glow" style={{ background: `radial-gradient(ellipse, ${flavor.color_hex}40 0%, transparent 70%)` }} />
                                    </div>

                                    {/* Info side */}
                                    <div className="flavor-detail-card__info">
                                        <div className="flavor-detail-card__icon">{flavor.icon}</div>
                                        <h2 className="flavor-detail-card__name">{flavor.flavor_name} Flavor</h2>
                                        <div className="flavor-detail-card__color-bar" style={{ background: `linear-gradient(90deg, ${flavor.color_hex}, ${flavor.color_hex}55)` }} />
                                        <p className="flavor-detail-card__desc">{flavor.description}</p>

                                        {/* Tags */}
                                        <div className="flavor-detail-card__tags">
                                            {flavor.tags?.map(tag => (
                                                <span key={tag} className="flavor-tag" style={{ background: `${flavor.color_hex}18`, color: flavor.color_hex, border: `1px solid ${flavor.color_hex}44` }}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Stats */}
                                        <div className="flavor-detail-card__stats">
                                            {[
                                                { label: 'Caffeine', val: '200mg' },
                                                { label: 'Sugar', val: '0g' },
                                                { label: 'Calories', val: '10' },
                                                { label: 'Price', val: '$20' },
                                            ].map(({ label, val }) => (
                                                <div key={label} className="flavor-stat">
                                                    <div className="flavor-stat__val" style={{ color: flavor.color_hex }}>{val}</div>
                                                    <div className="flavor-stat__label">{label}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Lightning info */}
                                        <div className="flavor-lightning-info">
                                            <span>⚡</span>
                                            <span>{flavor.lightning || 'Electric Lightning'}</span>
                                        </div>

                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <Link
                                                to={`/flavors/${flavor.id}`}
                                                className="btn btn-primary"
                                                style={{ background: `linear-gradient(135deg, ${flavor.color_hex}, ${flavor.color_hex}bb)`, boxShadow: `0 0 24px ${flavor.color_hex}55` }}
                                            >
                                                Buy Now — $20 ⚡
                                            </Link>
                                            <Link to={`/flavors/${flavor.id}`} className="btn btn-secondary">
                                                Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Compare table */}
            <section className="section compare-section">
                <div className="container">
                    <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>Compare Flavors</h2>
                    <div className="compare-table glass">
                        <table>
                            <thead>
                                <tr>
                                    <th>Flavor</th>
                                    <th>Caffeine</th>
                                    <th>Sugar</th>
                                    <th>Intensity</th>
                                    <th>Vibe</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {flavors.map(f => (
                                    <tr key={f.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span className="flavor-dot" style={{ background: f.color_hex }} />
                                                {f.flavor_name}
                                            </div>
                                        </td>
                                        <td>200mg</td>
                                        <td>0g</td>
                                        <td>
                                            <div className="intensity-bar">
                                                <div
                                                    className="intensity-bar__fill"
                                                    style={{ width: f.flavor_name === 'Lemon' ? '95%' : f.flavor_name === 'Orange' ? '80%' : '70%', background: f.color_hex }}
                                                />
                                            </div>
                                        </td>
                                        <td style={{ color: f.color_hex }}>{f.flavor_name === 'Orange' ? 'Bold' : f.flavor_name === 'Green Apple' ? 'Crisp' : 'Extreme'}</td>
                                        <td>
                                            <Link to={`/flavors/${f.id}`} className="btn btn-primary btn-sm" style={{ background: `linear-gradient(135deg, ${f.color_hex}, ${f.color_hex}bb)` }}>
                                                Buy
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}
