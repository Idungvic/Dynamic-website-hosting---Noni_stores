import React, { useState, useEffect } from 'react';
import { FiShoppingBag, FiDollarSign, FiUsers, FiTrendingUp, FiRefreshCw } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import axios from 'axios';
import toast from 'react-hot-toast';

const API = 'http://localhost:5000/api';

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/orders`);
      setOrders(res.data);
    } catch {
      toast.error('Could not load orders');
    }
    setLoading(false);
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalItems = orders.reduce((sum, o) => sum + (o.items?.length || 0), 0);

  const paymentData = orders.reduce((acc, o) => {
    acc[o.paymentMethod] = (acc[o.paymentMethod] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(paymentData).map(([name, value]) => ({ name, value }));
  const colors = ['#ff6b6b', '#4ecdc4', '#a855f7', '#ffd93d', '#06d6a0', '#4361ee'];

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>Admin Dashboard</h2>
          <p style={{ color: '#6b7280' }}>Noni Store's — Sales Overview</p>
        </div>
        <button onClick={fetchOrders} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8f8f8', border: '2px solid #f0f0f0', padding: '0.7rem 1.2rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem', color: '#1a1a2e' }}>
          <FiRefreshCw size={14} /> Refresh
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { icon: <FiShoppingBag size={24} color="#ff6b6b" />, label: 'Total Orders', value: orders.length, bg: 'rgba(255,107,107,0.1)' },
          { icon: <FiDollarSign size={24} color="#06d6a0" />, label: 'Total Revenue', value: `₦${totalRevenue.toLocaleString()}`, bg: 'rgba(6,214,160,0.1)' },
          { icon: <FiUsers size={24} color="#4361ee" />, label: 'Customers', value: orders.length, bg: 'rgba(67,97,238,0.1)' },
          { icon: <FiTrendingUp size={24} color="#a855f7" />, label: 'Items Sold', value: totalItems, bg: 'rgba(168,85,247,0.1)' },
        ].map((stat, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: stat.bg, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#6b7280', marginBottom: '0.2rem' }}>{stat.label}</div>
              <div style={{ fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: '1.4rem', color: '#1a1a2e' }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Orders by Payment Method</h3>
          {chartData.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} />
                <YAxis allowDecimals={false} tick={{ fill: '#6b7280' }} />
                <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #f0f0f0' }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Recent Orders</h3>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>Loading...</div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>No orders yet</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '220px', overflowY: 'auto' }}>
              {orders.slice().reverse().slice(0, 6).map(o => (
                <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.7rem', background: '#f8f8f8', borderRadius: '10px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{o.customerName}</div>
                    <div style={{ fontSize: '0.72rem', color: '#6b7280' }}>{o.paymentMethod}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#ff6b6b', fontWeight: 700, fontSize: '0.88rem' }}>₦{o.total?.toLocaleString()}</div>
                    <div style={{ fontSize: '0.7rem', color: '#ff6b6b', fontWeight: 700 }}>{o.orderRef}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>All Orders</h3>
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛍️</div>
            <p>No orders yet. They will appear here once customers place orders.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                  {['Order Ref', 'Customer', 'Email', 'Items', 'Payment', 'Total', 'Status'].map(h => (
                    <th key={h} style={{ padding: '0.8rem', textAlign: 'left', color: '#6b7280', fontWeight: 600, fontSize: '0.8rem' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.slice().reverse().map(o => (
                  <tr key={o.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '0.8rem', color: '#ff6b6b', fontWeight: 700 }}>{o.orderRef}</td>
                    <td style={{ padding: '0.8rem', fontWeight: 600 }}>{o.customerName}</td>
                    <td style={{ padding: '0.8rem', color: '#6b7280', fontSize: '0.82rem' }}>{o.email}</td>
                    <td style={{ padding: '0.8rem' }}>{o.items?.length} item(s)</td>
                    <td style={{ padding: '0.8rem', color: '#6b7280' }}>{o.paymentMethod}</td>
                    <td style={{ padding: '0.8rem', color: '#ff6b6b', fontWeight: 700 }}>₦{o.total?.toLocaleString()}</td>
                    <td style={{ padding: '0.8rem' }}>
                      <span className="badge badge-success">{o.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}