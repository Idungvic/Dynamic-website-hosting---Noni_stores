import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useStore } from '../context/StoreContext';

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal } = useStore();

  if (cart.length === 0) return (
    <div className="page" style={{ textAlign: 'center', paddingTop: '5rem' }}>
      <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🛒</div>
      <h2 style={{ marginBottom: '0.5rem' }}>Your cart is empty</h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Add some amazing products to get started</p>
      <Link to="/products" style={{ background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', color: '#fff', textDecoration: 'none', padding: '1rem 2rem', borderRadius: '12px', fontWeight: 700 }}>Start Shopping</Link>
    </div>
  );

  return (
    <div className="page">
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Shopping Cart ({cart.length} items)</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cart.map(item => (
            <div key={item.id} style={{ background: '#fff', borderRadius: '16px', padding: '1.2rem', border: '1px solid #f0f0f0', display: 'flex', gap: '1.2rem', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', flexShrink: 0 }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.72rem', color: '#ff6b6b', fontWeight: 700, marginBottom: '0.2rem' }}>{item.category}</div>
                <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{item.name}</div>
                <div style={{ color: '#ff6b6b', fontWeight: 800, fontFamily: 'Space Grotesk' }}>₦{item.price.toLocaleString()}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8f8f8', borderRadius: '10px', padding: '0.3rem' }}>
                <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: '28px', height: '28px', borderRadius: '6px', border: 'none', background: '#fff', cursor: 'pointer', fontWeight: 700 }}>-</button>
                <span style={{ width: '24px', textAlign: 'center', fontWeight: 700, fontSize: '0.9rem' }}>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: '28px', height: '28px', borderRadius: '6px', border: 'none', background: '#fff', cursor: 'pointer', fontWeight: 700 }}>+</button>
              </div>
              <div style={{ fontWeight: 800, fontFamily: 'Space Grotesk', color: '#1a1a2e', minWidth: '100px', textAlign: 'right' }}>₦{(item.price * item.qty).toLocaleString()}</div>
              <button onClick={() => removeFromCart(item.id)} style={{ background: 'rgba(255,107,107,0.1)', border: 'none', borderRadius: '8px', padding: '0.5rem', cursor: 'pointer' }}>
                <FiTrash2 size={16} color="#ff6b6b" />
              </button>
            </div>
          ))}
        </div>

        <div className="card" style={{ height: 'fit-content', position: 'sticky', top: '100px' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ color: '#6b7280' }}>Subtotal</span>
            <span style={{ fontWeight: 600 }}>₦{cartTotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ color: '#6b7280' }}>Delivery</span>
            <span style={{ color: '#06d6a0', fontWeight: 600 }}>{cartTotal >= 15000 ? 'FREE' : '₦2,000'}</span>
          </div>
          {cartTotal < 15000 && (
            <div style={{ background: 'rgba(255,107,107,0.08)', borderRadius: '8px', padding: '0.7rem', marginBottom: '1rem', fontSize: '0.8rem', color: '#ff6b6b' }}>
              Add ₦{(15000 - cartTotal).toLocaleString()} more for free delivery!
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '2px solid #f0f0f0', marginBottom: '1.5rem' }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Total</span>
            <span style={{ fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: '1.3rem', background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ₦{(cartTotal + (cartTotal >= 15000 ? 0 : 2000)).toLocaleString()}
            </span>
          </div>
          <Link to="/checkout" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', color: '#fff', textDecoration: 'none', padding: '1rem', borderRadius: '12px', fontWeight: 700, fontSize: '1rem' }}>
            Proceed to Checkout <FiArrowRight />
          </Link>
          <Link to="/products" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', color: '#6b7280', textDecoration: 'none', fontSize: '0.88rem' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}