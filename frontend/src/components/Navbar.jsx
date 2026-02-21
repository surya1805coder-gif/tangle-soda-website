import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'Flavors', path: '/flavors' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__inner">
                {/* Logo */}
                <Link to="/" className="navbar__logo">
                    <span className="navbar__logo-icon">⚡</span>
                    <span className="font-brand navbar__logo-text">TANGLE</span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="navbar__links">
                    {navLinks.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right side */}
                <div className="navbar__right">
                    <Link to="/cart" className="navbar__cart" aria-label="Shopping cart">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {cartCount > 0 && (
                            <span key={cartCount} className="cart-badge">{cartCount > 9 ? '9+' : cartCount}</span>
                        )}
                    </Link>

                    {/* Hamburger (mobile) */}
                    <button
                        className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`navbar__mobile-menu ${menuOpen ? 'open' : ''}`}>
                {navLinks.map(link => (
                    <Link key={link.path} to={link.path} className="navbar__mobile-link">
                        {link.label}
                    </Link>
                ))}
                <Link to="/cart" className="navbar__mobile-link">
                    🛒 Cart {cartCount > 0 && `(${cartCount})`}
                </Link>
            </div>
        </nav>
    );
}
