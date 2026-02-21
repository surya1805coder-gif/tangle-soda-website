import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Flavors from './pages/Flavors';
import FlavorDetail from './pages/FlavorDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import './App.css';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flavors" element={<Flavors />} />
            <Route path="/flavors/:id" element={<FlavorDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders/:id" element={<OrderConfirmation />} />
            {/* 404 fallback */}
            <Route path="*" element={
              <div style={{ textAlign: 'center', padding: '160px 24px 80px' }}>
                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>⚡</div>
                <h1 style={{ fontSize: '5rem', fontWeight: 900, color: '#FF4500' }}>404</h1>
                <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>
                  This page got tangled up somewhere...
                </p>
                <a href="/" className="btn btn-primary">Go Home</a>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}
