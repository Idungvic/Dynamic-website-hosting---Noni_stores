import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiArrowLeft, FiStar, FiTruck, FiShield } from 'react-icons/fi';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, addToWishlist } = useStore();
  const [qty, setQty] = useState(1);
  const product = products.find(p => p.id === id);
  const related = products.filter(p => p.category === product?.category && p.id !== id).slice(0, 4);

  if (!product) return (
    <div className="page" style={{ textAlign: 'center', paddingTop: '5rem' }}>
      <h2>Product not found</h2>
      <Link to="/products" style={{ color: '#ff6b6b' }}>Back to Products</Link>
    </div>
  );

  return (
    <div className="page">
      <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.9rem' }}>
        <FiArrowLeft /> Back to Products
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
        <div style={{ borderRadius: '24px', overflow: 'hidden', minHeight: '400px' }}>
  <img
    src={product.image}
    alt={product.name}
    style={{ width: '100%', height: '450px', objectFit: 'cover' }}
  />
</div>
        <div>
          <div style={{ fontSize: '0.8rem', color: '#ff6b6b', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase' }}>{product.category}</div>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1a1a2e' }}>{product.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {[1,2,3,4,5].map(s =><FiStar key={s} size={16} color="#ffd93d" fill={s <= product.rating ? '#ffd93d' : 'none'} />)}
            <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>({product.reviews} reviews)</span>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: '2.2rem', background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>₦{product.price.toLocaleString()}</span>
            {product.oldPrice &&<span style={{ fontSize: '1rem', color: '#9ca3af', textDecoration: 'line-through', marginLeft: '1rem' }}>₦{product.oldPrice.toLocaleString()}</span>}
          </div>
          <p style={{ color: '#6b7280', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>{product.description}</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Quantity:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8f8f8', borderRadius: '10px', padding: '0.3rem' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '1.1rem' }}>-</button>
              <span style={{ width: '30px', textAlign: 'center', fontWeight: 700 }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '1.1rem' }}>+</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button onClick={() => { addToCart({ ...product, qty }); toast.success('Added to cart!'); }} style={{ flex: 1, background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', color: '#fff', border: 'none', padding: '1rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1rem' }}>
              <FiShoppingCart /> Add to Cart
            </button>
            <button onClick={() => { addToWishlist(product); toast.success('Added to wishlist!'); }} style={{ padding: '1rem 1.5rem', border: '2px solid #f0f0f0', borderRadius: '12px', background: '#fff', cursor: 'pointer' }}>
              <FiHeart size={20} color="#ff6b6b" />
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            {[{ icon:<FiTruck size={16} />, text: 'Free delivery above ₦15,000' }, { icon:<FiShield size={16} />, text: '30 day easy returns' }].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.82rem', background: '#f8f8f8', padding: '0.6rem 1rem', borderRadius: '8px' }}>
                <span style={{ color: '#ff6b6b' }}>{item.icon}</span> {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Related Products</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {related.map(p =><ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}