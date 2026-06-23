import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { useStore } from '../context/StoreContext';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  if (wishlist.length === 0) return (
    <div className="page" style={{ textAlign: 'center', paddingTop: '5rem' }}>
      <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>💝</div>
      <h2 style={{ marginBottom: '0.5rem' }}>Your wishlist is empty</h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Save your favorite items here</p>
      <Link to="/products" style={{ background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', color: '#fff', textDecoration: 'none', padding: '1rem 2rem', borderRadius: '12px', fontWeight: 700 }}>Browse Products</Link>
    </div>
  );

  return (
    <div className="page">
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>My Wishlist ({wishlist.length} items)</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        {wishlist.map(item => (
          <div key={item.id} style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', border: '1px solid #f0f0f0', boxShadow: '0 2px 15px rgba(0,0,0,0.06)' }}>
            <div style={{ height: '180px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4.5rem' }}>{item.emoji}</div>
            <div style={{ padding: '1.2rem' }}>
              <div style={{ fontSize: '0.72rem', color: '#ff6b6b', fontWeight: 700, marginBottom: '0.3rem' }}>{item.category}</div>
              <div style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>{item.name}</div>
              <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, color: '#ff6b6b', marginBottom: '1rem' }}>₦{item.price.toLocaleString()}</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => { addToCart(item); toast.success('Added to cart!'); }} style={{ flex: 1, background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', color: '#fff', border: 'none', padding: '0.6rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                  <FiShoppingCart size={13} /> Add to Cart
                </button>
                <button onClick={() => removeFromWishlist(item.id)} style={{ padding: '0.6rem', background: 'rgba(255,107,107,0.1)', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  <FiTrash2 size={14} color="#ff6b6b" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}