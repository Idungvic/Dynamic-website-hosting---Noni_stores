import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiTruck, FiHome } from 'react-icons/fi';

export default function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) return (
    <div className="page" style={{ textAlign: 'center', paddingTop: '5rem' }}>
      <h2>No order found</h2>
      <Link to="/" style={{ color: '#ff6b6b' }}>Go Home</Link>
    </div>
  );

  return (
    <div className="page" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', paddingTop: '3rem' }}>
      <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(255,107,107,0.15), rgba(255,142,83,0.15))', display: 'grid', placeItems: 'center', margin: '0 auto 1.5rem' }}>
        <FiCheckCircle size={44} color="#ff6b6b" />
      </div>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Order Confirmed!</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '1rem' }}>Thank you for shopping with Noni Store's! Your order has been placed successfully.</p>

      <div className="card" style={{ textAlign: 'left', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '2px solid #f0f0f0' }}>
          <span style={{ color: '#6b7280' }}>Order Reference</span>
          <span style={{ background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 900, fontSize: '1.2rem', fontFamily: 'Space Grotesk' }}>{order.orderRef}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
          <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Customer</span>
          <span style={{ fontWeight: 600 }}>{order.customerName}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
          <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Email</span>
          <span>{order.email}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
          <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Phone</span>
          <span>{order.phone}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
          <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Delivery Address</span>
          <span style={{ maxWidth: '200px', textAlign: 'right', fontSize: '0.9rem' }}>{order.address}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
          <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Payment Method</span>
          <span style={{ fontWeight: 600 }}>{order.paymentMethod}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '2px solid #f0f0f0' }}>
          <span style={{ fontWeight: 800, fontSize: '1rem' }}>Total Paid</span>
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: '1.3rem', background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>₦{order.total?.toLocaleString()}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
        {[{ icon:<FiPackage color="#ff6b6b" />, label: 'Order Confirmed' }, { icon:<FiTruck color="#4ecdc4" />, label: 'Out for Delivery' }, { icon:<FiHome color="#06d6a0" />, label: 'Delivered' }].map((step, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: i === 0 ? 'rgba(255,107,107,0.15)' : '#f0f0f0', display: 'grid', placeItems: 'center', margin: '0 auto 0.5rem' }}>{step.icon}</div>
            <div style={{ fontSize: '0.72rem', color: i === 0 ? '#ff6b6b' : '#6b7280', fontWeight: i === 0 ? 700 : 400 }}>{step.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/products" style={{ background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', color: '#fff', textDecoration: 'none', padding: '0.9rem 2rem', borderRadius: '12px', fontWeight: 700 }}>Continue Shopping</Link>
        <Link to="/" style={{ background: '#f8f8f8', color: '#1a1a2e', textDecoration: 'none', padding: '0.9rem 2rem', borderRadius: '12px', fontWeight: 600, border: '2px solid #f0f0f0' }}>Go Home</Link>
      </div>
    </div>
  );
}