import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiFilter, FiSearch } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const categories = ['All', 'Shoes', 'Clothes', 'Dresses', 'Bags', 'Accessories', 'Jewelry'];

export default function Products() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialCategory = params.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  let filtered = products.filter(p => {
    const matchCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (sort === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div className="page">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>All Products</h2>
        <p style={{ color: '#6b7280' }}>{filtered.length} products found</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <FiSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
          <input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.8rem', border: '2px solid #f0f0f0', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', background: '#f8f8f8' }} />
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)}
          style={{ padding: '0.75rem 1rem', border: '2px solid #f0f0f0', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', background: '#f8f8f8', cursor: 'pointer' }}>
          <option value="default">Sort by: Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '0.7rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            padding: '0.5rem 1.2rem', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
            background: activeCategory === cat ? 'linear-gradient(135deg, #ff6b6b, #ff8e53)' : '#f0f0f0',
            color: activeCategory === cat ? '#fff' : '#6b7280',
            transition: 'all 0.2s',
          }}>{cat}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
          <h3>No products found</h3>
          <p style={{ marginTop: '0.5rem' }}>Try a different search or category</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {filtered.map(product =><ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  );
}