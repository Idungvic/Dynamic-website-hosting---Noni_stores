import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiStar } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Home() {
  const featured = products.slice(0, 8);

  const categories = [
    { name: 'Shoes', emoji: '👟', bg: 'linear-gradient(135deg, #ff6b6b22, #ff8e5322)', color: '#ff6b6b' },
    { name: 'Clothes', emoji: '👗', bg: 'linear-gradient(135deg, #4ecdc422, #4361ee22)', color: '#4ecdc4' },
    { name: 'Dresses', emoji: '👘', bg: 'linear-gradient(135deg, #a855f722, #ff6b6b22)', color: '#a855f7' },
    { name: 'Bags', emoji: '👜', bg: 'linear-gradient(135deg, #ffd93d22, #ff8e5322)', color: '#f59e0b' },
    { name: 'Accessories', emoji: '💍', bg: 'linear-gradient(135deg, #06d6a022, #4361ee22)', color: '#06d6a0' },
    { name: 'Jewelry', emoji: '💎', bg: 'linear-gradient(135deg, #4361ee22, #a855f722)', color: '#4361ee' },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #fff5f5 0%, #fff0fa 50%, #f0f4ff 100%)',
        padding: '5rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(255,107,107,0.15), rgba(255,142,83,0.1))', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(78,205,196,0.15), rgba(67,97,238,0.1))', filter: 'blur(40px)' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', position: 'relative' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', padding: '0.4rem 1rem', borderRadius: '20px', marginBottom: '1.5rem' }}>
              <FiStar size={12} color="#ff6b6b" fill="#ff6b6b" />
              <span style={{ fontSize: '0.8rem', color: '#ff6b6b', fontWeight: 600 }}>Nigeria's Most Stylish Store</span>
            </div>
            <h1 style={{ fontSize: '3.8rem', fontWeight: 900, lineHeight: 1.05, marginBottom: '1.2rem', color: '#1a1a2e' }}>
              Dress to<br />
              <span style={{ background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Impress</span><br />
              Every Day
            </h1>
            <p style={{ color: '#6b7280', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.7 }}>
              Discover the latest fashion trends in shoes, clothes, dresses, bags, accessories, and jewelry. All at amazing prices.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/products" style={{ background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', color: '#fff', textDecoration: 'none', padding: '1rem 2.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Shop Now <FiArrowRight />
              </Link>
              <Link to="/products" style={{ background: '#fff', color: '#1a1a2e', textDecoration: 'none', border: '2px solid #f0f0f0', padding: '1rem 2.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 600 }}>
                View Collections
              </Link>
            </div>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem' }}>
              {[{ num: '10K+', label: 'Happy Customers' }, { num: '500+', label: 'Products' }, { num: '4.9★', label: 'Rating' }].map((stat, i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: '1.5rem', background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.num}</div>
                  <div style={{ fontSize: '0.78rem', color: '#6b7280' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {['👟', '👗', '👜', '💍'].map((emoji, i) => (
              <div key={i} style={{ background: ['linear-gradient(135deg, #fff5f5, #ffe0e0)', 'linear-gradient(135deg, #f0fff4, #d4f5e9)', 'linear-gradient(135deg, #fff8e1, #ffeaa7)', 'linear-gradient(135deg, #f3e8ff, #e8d5ff)'][i], borderRadius: '20px', padding: '2rem', textAlign: 'center', fontSize: '3.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="page" style={{ paddingTop: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Shop by Category</h2>
          <p style={{ color: '#6b7280' }}>Find exactly what you are looking for</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
          {categories.map((cat, i) => (
            <Link key={i} to={`/products?category=${cat.name}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: cat.bg, borderRadius: '16px', padding: '1.5rem 1rem', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s', border: `1px solid${cat.color}22` }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>{cat.emoji}</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: cat.color }}>{cat.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>Featured Products</h2>
            <p style={{ color: '#6b7280' }}>Our most loved items this season</p>
          </div>
          <Link to="/products" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ff6b6b', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
            View All <FiArrowRight />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {featured.map(product =><ProductCard key={product.id} product={product} />)}
        </div>
      </div>

      {/* Features */}
      <div style={{ background: 'linear-gradient(135deg, #fff5f5, #f0f4ff)', padding: '4rem 2rem', marginTop: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
          {[
            { icon:<FiTruck size={28} color="#ff6b6b" />, title: 'Free Delivery', desc: 'Free shipping on orders above ₦15,000' },
            { icon:<FiShield size={28} color="#4ecdc4" />, title: 'Secure Payment', desc: 'Multiple safe payment options available' },
            { icon:<FiRefreshCw size={28} color="#a855f7" />, title: 'Easy Returns', desc: '30 day hassle free return policy' },
            { icon:<FiStar size={28} color="#ffd93d" />, title: 'Premium Quality', desc: 'Only the best quality products for you' },
          ].map((feature, i) => (
            <div key={i} style={{ padding: '2rem 1.5rem', background: '#fff', borderRadius: '16px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
              <div style={{ marginBottom: '1rem' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.6 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}