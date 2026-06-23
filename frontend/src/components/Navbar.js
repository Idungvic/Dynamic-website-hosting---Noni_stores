import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useStore } from '../context/StoreContext';

export default function Navbar() {
  const { cartCount, wishlist } = useStore();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Shop' },
    { path: '/wishlist', label: 'Wishlist' },
    { path: '/admin', label: 'Admin' },
  ];

  return (
    <nav style={{
      background: '#fff',
      borderBottom: '2px solid #f0f0f0',
      padding: '1rem 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)',
            display: 'grid', placeItems: 'center',
          }}>
            <FiShoppingBag size={22} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: '1.2rem', background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Noni Store's
            </div>
            <div style={{ fontSize: '0.62rem', color: '#6b7280', marginTop: '-2px' }}>Fashion for Everyone</div>
          </div>
        </Link>

        <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
          {links.map(link => (
            <Link key={link.path} to={link.path} style={{
              padding: '0.5rem 1rem', borderRadius: '8px', textDecoration: 'none',
              fontSize: '0.88rem', fontWeight: 500,
              background: location.pathname === link.path ? 'rgba(255,107,107,0.1)' : 'transparent',
              color: location.pathname === link.path ? '#ff6b6b' : '#6b7280',
              transition: 'all 0.2s',
            }}>{link.label}</Link>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
          <Link to="/wishlist" style={{ position: 'relative', color: '#6b7280', textDecoration: 'none' }}>
            <FiHeart size={22} />
            {wishlist.length > 0 && (
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#a855f7', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700 }}>{wishlist.length}</span>
            )}
          </Link>
          <Link to="/cart" style={{ position: 'relative', color: '#6b7280', textDecoration: 'none' }}>
            <FiShoppingCart size={22} />
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#ff6b6b', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700 }}>{cartCount}</span>
            )}
          </Link>
          <Link to="/checkout" style={{
            background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)',
            color: '#fff', textDecoration: 'none',
            padding: '0.6rem 1.4rem', borderRadius: '10px',
            fontSize: '0.85rem', fontWeight: 700,
          }}>Checkout</Link>
        </div>
      </div>
    </nav>
  );
}