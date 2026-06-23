import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { useStore } from '../context/StoreContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import emailjs from '@emailjs/browser';

const API = 'http://localhost:5000/api';

const PAYMENT_METHODS = [
  { id: 'card', label: 'Debit Card', icon: '💳', logo: null, desc: 'Visa, Mastercard, Verve' },
  { id: 'opay', label: 'OPay', icon: null, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/OPay_Logo.svg/200px-OPay_Logo.svg.png', desc: 'OPay wallet' },
  { id: 'palmpay', label: 'PalmPay', icon: null, logo: 'https://play-lh.googleusercontent.com/PKr5gNKDmqDsq0G3CyqoT9jVxUPYz1_hVi83VZOC5hKdFDJYvTWbf8eWNWxcfwXXWg=w240-h480-rw', desc: 'PalmPay wallet' },
  { id: 'paypal', label: 'PayPal', icon: null, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/200px-PayPal.svg.png', desc: 'International payments' },
  { id: 'moniepoint', label: 'Moniepoint', icon: '🏦', logo: null, desc: 'Moniepoint transfer' },
  { id: 'ussd', label: 'USSD', icon: '📱', logo: null, desc: 'No internet needed' },
  { id: 'cash', label: 'Cash Payment', icon: '💵', logo: null, desc: 'Walk-in customers' },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useStore();
  const [method, setMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ customerName: '', email: '', phone: '', address: '' });
  const [card, setCard] = useState({ name: '', number: '', expiry: '', cvv: '' });
  const delivery = cartTotal >= 15000 ? 0 : 2000;
  const total = cartTotal + delivery;

  if (cart.length === 0) {
    return (
      <div className="page" style={{ textAlign: 'center', paddingTop: '5rem' }}>
        <h2>Your cart is empty</h2>
        <p style={{ color: '#6b7280', marginTop: '1rem' }}>Add items to your cart before checking out.</p>
      </div>
    );
  }

  const handleOrder = async () => {
    if (!form.customerName || !form.email || !form.phone || !form.address) {
      toast.error('Please fill all delivery details'); return;
    }
    if (method === 'card' && (!card.name || !card.number || !card.expiry || !card.cvv)) {
      toast.error('Please fill all card details'); return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    try {
      const res = await axios.post(`${API}/orders`, {
        ...form,
        items: cart.map(item => ({ id: item.id, name: item.name, qty: item.qty, price: item.price })),
        total,
        paymentMethod: method,
      });
      clearCart();
      navigate('/order-confirmation', { state: { order: res.data.order } });
      await emailjs.send(
  "noni-service",
  'g8c2k4v',
  {
    customer_name: form.customerName,
    order_ref: order.orderRef,
    total: `₦${total.toLocaleString()}`,
    payment_method: method,
    address: form.address,
    email: form.email,
  },
  '9OgTRuKGVlPPXP8Wf'
);
      toast.success('Order placed successfully!');
    } catch {
      toast.error('Order failed, please try again');
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Checkout</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Delivery Information</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input placeholder="e.g. Chinonso Ojeri" value={form.customerName} onChange={e => setForm({ ...form, customerName: e.target.value })} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input placeholder="08012345678" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label>Delivery Address</label>
              <textarea placeholder="Enter your full delivery address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} rows={3} style={{ resize: 'none' }} />
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <FiLock size={16} color="#ff6b6b" />
              <h3 style={{ fontSize: '1.1rem' }}>Payment Method</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.7rem', marginBottom: '1.5rem' }}>
              {PAYMENT_METHODS.map(m => (
                <div key={m.id} onClick={() => setMethod(m.id)} style={{
                  padding: '0.8rem 0.5rem', borderRadius: '12px', textAlign: 'center', cursor: 'pointer',
                  background: method === m.id ? 'rgba(255,107,107,0.08)' : '#f8f8f8',
                  border: method === m.id ? '2px solid #ff6b6b' : '2px solid #f0f0f0',
                  transition: 'all 0.2s',
                }}>
                  {m.logo ? (
                    <img src={m.logo} alt={m.label} style={{ width: '36px', height: '36px', objectFit: 'contain', marginBottom: '0.3rem' }}
                      onError={e => { e.target.style.display = 'none'; }} />
                  ) : (
                    <div style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>{m.icon}</div>
                  )}
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: method === m.id ? '#ff6b6b' : '#1a1a2e' }}>{m.label}</div>
                  <div style={{ fontSize: '0.62rem', color: '#6b7280', marginTop: '0.1rem' }}>{m.desc}</div>
                </div>
              ))}
            </div>

            {method === 'card' && (
              <div>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input placeholder="Name on card" value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Card Number</label>
                  <input placeholder="0000 0000 0000 0000" maxLength={19} value={card.number} onChange={e => setCard({ ...card, number: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Expiry</label>
                    <input placeholder="MM/YY" maxLength={5} value={card.expiry} onChange={e => setCard({ ...card, expiry: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input placeholder="123" maxLength={3} type="password" value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} />
                  </div>
                </div>
              </div>
            )}

            {method === 'opay' && (
              <div style={{ padding: '1.2rem', background: '#f0fff4', borderRadius: '12px', border: '1px solid #c6f6d5' }}>
                <h4 style={{ marginBottom: '1rem', color: '#1aad19' }}>Pay with OPay</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.7rem' }}>
                  <span style={{ color: '#6b7280', fontSize: '0.88rem' }}>OPay Number</span>
                  <span style={{ fontWeight: 800, color: '#1aad19' }}>08012345678</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280', fontSize: '0.88rem' }}>Account Name</span>
                  <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>Noni Store's</span>
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.8rem' }}>Open your OPay app, send to this number, then click confirm.</p>
              </div>
            )}

            {method === 'palmpay' && (
              <div style={{ padding: '1.2rem', background: '#f0f4ff', borderRadius: '12px', border: '1px solid #c7d7fd' }}>
                <h4 style={{ marginBottom: '1rem', color: '#0066ff' }}>Pay with PalmPay</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.7rem' }}>
                  <span style={{ color: '#6b7280', fontSize: '0.88rem' }}>PalmPay Number</span>
                  <span style={{ fontWeight: 800, color: '#0066ff' }}>08087654321</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280', fontSize: '0.88rem' }}>Account Name</span>
                  <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>Noni Store's</span>
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.8rem' }}>Open your PalmPay app, send to this number, then click confirm.</p>
              </div>
            )}

            {method === 'paypal' && (
              <div style={{ padding: '1.2rem', background: '#f0f4ff', borderRadius: '12px', border: '1px solid #c7d7fd' }}>
                <h4 style={{ marginBottom: '1rem', color: '#003087' }}>Pay with PayPal</h4>
                <p style={{ color: '#6b7280', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1rem' }}>You will be redirected to PayPal to complete your payment securely. Accepted internationally.</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280', fontSize: '0.88rem' }}>PayPal Email</span>
                  <span style={{ fontWeight: 700, color: '#003087' }}>pay@Nonistores.com</span>
                </div>
              </div>
            )}

            {method === 'moniepoint' && (
              <div style={{ padding: '1.2rem', background: '#f0f4ff', borderRadius: '12px', border: '1px solid #c7d7fd' }}>
                <h4 style={{ marginBottom: '1rem', color: '#0052cc' }}>Pay with Moniepoint</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.7rem' }}>
                  <span style={{ color: '#6b7280', fontSize: '0.88rem' }}>Account Number</span>
                  <span style={{ fontWeight: 800, color: '#0052cc' }}>1234567890</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.7rem' }}>
                  <span style={{ color: '#6b7280', fontSize: '0.88rem' }}>Account Name</span>
                  <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>Noni Store's LTD</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280', fontSize: '0.88rem' }}>Bank</span>
                  <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>Moniepoint MFB</span>
                </div>
              </div>
            )}

            {method === 'ussd' && (
              <div style={{ padding: '1.2rem', background: '#f8f8f8', borderRadius: '12px' }}>
                <h4 style={{ marginBottom: '1rem', color: '#ff6b6b' }}>Dial any of these codes</h4>
                {[
                  { bank: 'GTBank', code: `*737*${total}#` },
                  { bank: 'First Bank', code: `*894*${total}#` },
                  { bank: 'Access Bank', code: `*901*${total}#` },
                  { bank: 'Zenith Bank', code: `*966*${total}#` },
                  { bank: 'UBA', code: `*919*${total}#` },
                ].map((u, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', padding: '0.5rem 0.8rem', background: '#fff', borderRadius: '8px' }}>
                    <span style={{ color: '#6b7280', fontSize: '0.82rem' }}>{u.bank}</span>
                    <span style={{ color: '#ff6b6b', fontWeight: 700, fontFamily: 'monospace', fontSize: '0.82rem' }}>{u.code}</span>
                  </div>
                ))}
              </div>
            )}

            {method === 'cash' && (
              <div style={{ padding: '1.2rem', background: 'rgba(6,214,160,0.08)', borderRadius: '12px', border: '1px solid rgba(6,214,160,0.3)' }}>
                <h4 style={{ marginBottom: '1rem', color: '#06d6a0' }}>Cash Payment</h4>
                <p style={{ color: '#6b7280', fontSize: '0.88rem', lineHeight: 1.7 }}>For walk-in customers only. Visit our store and make payment in cash. Please bring a valid ID.</p>
                <div style={{ marginTop: '1rem', padding: '0.8rem', background: '#fff', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#6b7280', fontSize: '0.82rem' }}>Store Address</span>
                    <span style={{ fontWeight: 600, fontSize: '0.82rem' }}>123 Fashion Street, Lagos</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280', fontSize: '0.82rem' }}>Opening Hours</span>
                    <span style={{ fontWeight: 600, fontSize: '0.82rem' }}>Mon-Sat, 9AM-7PM</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="card" style={{ height: 'fit-content', position: 'sticky', top: '100px' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Order Summary</h3>
          <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '1rem' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '0.8rem', marginBottom: '0.8rem', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{item.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>x{item.qty}</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>₦{(item.price * item.qty).toLocaleString()}</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '2px solid #f0f0f0', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.7rem' }}>
              <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Subtotal</span>
              <span style={{ fontWeight: 600 }}>₦{cartTotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Delivery</span>
              <span style={{ color: '#06d6a0', fontWeight: 600 }}>{delivery === 0 ? 'FREE' : `₦${delivery.toLocaleString()}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '2px solid #f0f0f0', marginBottom: '1.5rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Total</span>
              <span style={{ fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: '1.3rem', background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>₦{total.toLocaleString()}</span>
            </div>
            <button className="btn-primary" onClick={handleOrder} disabled={loading}>
              {loading ? 'Placing Order...' : method === 'cash' ? `Reserve Order - ₦${total.toLocaleString()}` : `Place Order - ₦${total.toLocaleString()}`}
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#6b7280', marginTop: '1rem' }}>
              This is a demo store. No real payments are processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}