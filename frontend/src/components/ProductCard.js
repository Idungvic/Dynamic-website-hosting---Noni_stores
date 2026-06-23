import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { useStore } from '../context/StoreContext';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { addToCart, addToWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.find(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product);
    toast.success(`${product.name} added to wishlist!`);
  };

  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        background: '#fff', borderRadius: '20px', overflow: 'hidden',
        border: '1px solid #f0f0f0', transition: 'all 0.3s',
        boxShadow: '0 2px 15px rgba(0,0,0,0.06)',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,107,107,0.15)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 15px rgba(0,0,0,0.06)'; }}
      >
        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
  <img
    src={product.image}
    alt={product.name}
    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
  />
          <div style={{ position: 'absolute', top: '0.8rem', right: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button onClick={handleWishlist} style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#fff', border: 'none', cursor: 'pointer', display: 'grid', placeItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <FiHeart size={14} color={isWishlisted ? '#ff6b6b' : '#6b7280'} fill={isWishlisted ? '#ff6b6b' : 'none'} />
            </button>
          </div>
          {product.badge && (
            <div style={{ position: 'absolute', top: '0.8rem', left: '0.8rem', background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700 }}>
              {product.badge}
            </div>
          )}
        </div>
        <div style={{ padding: '1.2rem' }}>
          <div style={{ fontSize: '0.72rem', color: '#ff6b6b', fontWeight: 700, marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{product.category}</div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1a1a2e' }}>{product.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.8rem' }}>
            {[1,2,3,4,5].map(s =><FiStar key={s} size={11} color="#ffd93d" fill={s <= product.rating ? '#ffd93d' : 'none'} />)}
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>({product.reviews})</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '1.1rem', color: '#ff6b6b' }}>₦{product.price.toLocaleString()}</span>
              {product.oldPrice &&<span style={{ fontSize: '0.78rem', color: '#9ca3af', textDecoration: 'line-through', marginLeft: '0.5rem' }}>₦{product.oldPrice.toLocaleString()}</span>}
            </div>
            <button onClick={handleAddToCart} style={{ background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <FiShoppingCart size={13} /> Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}