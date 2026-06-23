import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer style={{ background: '#1a1a2e', color: '#f0f0f0', padding: '3rem 2rem 1.5rem', marginTop: '4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1rem' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', display: 'grid', placeItems: 'center' }}>
                <FiShoppingBag size={20} color="#fff" />
              </div>
              <span style={{ fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: '1.1rem', background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Noni Store's</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#9ca3af', lineHeight: 1.7 }}>Fashion for everyone. Discover the latest trends in shoes, clothes, dresses, bags, accessories, and jewelry.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>Quick Links</h4>
            {['Home', 'Shop', 'Cart', 'Wishlist'].map(link => (
              <Link key={link} to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} style={{ display: 'block', color: '#9ca3af', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{link}</Link>
            ))}
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>Categories</h4>
            {['Shoes', 'Clothes', 'Dresses', 'Bags', 'Accessories', 'Jewelry'].map(cat => (
              <div key={cat} style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{cat}</div>
            ))}
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>Contact Us</h4>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: 1.7 }}>
              hello@Nonistores.com<br />
              +234 801 234 5678<br />
              Lagos, Nigeria
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
              {[FiInstagram, FiTwitter, FiFacebook].map((Icon, i) => (
                <div key={i} style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(255,107,107,0.15)', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
                  <Icon size={16} color="#ff6b6b" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #2d2d4e', paddingTop: '1.5rem', textAlign: 'center', color: '#6b7280', fontSize: '0.82rem' }}>
          © 2026 Noni Store's. All rights reserved. Built with love by Chinonso Vivian Ojeri.
        </div>
      </div>
    </footer>
  );
}