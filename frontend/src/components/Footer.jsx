import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__glow" />
            <div className="container">
                <div className="footer__top">
                    {/* Brand */}
                    <div className="footer__brand">
                        <div className="footer__logo">
                            <span>⚡</span>
                            <span className="font-brand">TANGLE</span>
                        </div>
                        <p className="footer__tagline">
                            Electrify your taste. <br />
                            Three flavors. One obsession.
                        </p>
                        <div className="footer__socials">
                            {[
                                { icon: '𝕏', label: 'X' },
                                { icon: '📸', label: 'Instagram' },
                                { icon: '🎵', label: 'TikTok' }
                            ].map((social, i) => (
                                <a key={i} href="#" className="footer__social-icon" aria-label={social.label}>
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="footer__links-group">
                        <h4 className="footer__heading">Explore</h4>
                        <nav className="footer__links">
                            <Link to="/">Home</Link>
                            <Link to="/flavors">All Flavors</Link>
                            <Link to="/cart">Cart</Link>
                        </nav>
                    </div>

                    <div className="footer__links-group">
                        <h4 className="footer__heading">Flavors</h4>
                        <nav className="footer__links">
                            <Link to="/flavors">🍊 Orange</Link>
                            <Link to="/flavors">🍏 Green Apple</Link>
                            <Link to="/flavors">🍋 Lemon</Link>
                        </nav>
                    </div>

                    <div className="footer__links-group">
                        <h4 className="footer__heading">Legal</h4>
                        <nav className="footer__links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Refund Policy</a>
                        </nav>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>© 2025 Tangle Energy. All rights reserved.</p>
                    <p>Made with ⚡ for the bold.</p>
                </div>
            </div>
        </footer>
    );
}
