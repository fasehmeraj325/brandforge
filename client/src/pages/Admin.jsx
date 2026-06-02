import React, { useState, useEffect, useCallback } from 'react';
import { Trash2, Eye, EyeOff, Star, ShieldCheck, LogOut, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../utils/api';

const SESSION_KEY = 'bf_admin_secret';

function StarDisplay({ rating }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(n => (
        <Star key={n} size={12} fill={rating >= n ? '#c9a84c' : 'none'} color={rating >= n ? '#c9a84c' : '#ddd'} />
      ))}
    </div>
  );
}

export default function Admin() {
  const [secret, setSecret] = useState(sessionStorage.getItem(SESSION_KEY) || '');
  const [input, setInput] = useState('');
  const [authed, setAuthed] = useState(!!sessionStorage.getItem(SESSION_KEY));
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  const fetchReviews = useCallback(async (s = secret) => {
    setLoading(true);
    try {
      const { data } = await API.get('/reviews/admin', {
        headers: { 'x-admin-secret': s }
      });
      setReviews(data);
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error('Wrong password');
        sessionStorage.removeItem(SESSION_KEY);
        setAuthed(false);
      } else {
        toast.error('Failed to load reviews');
      }
    } finally {
      setLoading(false);
    }
  }, [secret]);

  useEffect(() => {
    if (authed) fetchReviews();
  }, [authed, fetchReviews]);

  const handleLogin = (e) => {
    e.preventDefault();
    sessionStorage.setItem(SESSION_KEY, input);
    setSecret(input);
    setAuthed(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setSecret('');
    setInput('');
    setReviews([]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review permanently?')) return;
    try {
      await API.delete(`/reviews/${id}`, { headers: { 'x-admin-secret': secret } });
      setReviews(prev => prev.filter(r => r._id !== id));
      toast.success('Review deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleToggleApprove = async (id, current) => {
    try {
      await API.patch(`/reviews/${id}/approve`, {}, { headers: { 'x-admin-secret': secret } });
      setReviews(prev => prev.map(r => r._id === id ? { ...r, approved: !current } : r));
      toast.success(current ? 'Review hidden' : 'Review approved');
    } catch {
      toast.error('Failed to update');
    }
  };

  const filtered = reviews.filter(r =>
    filter === 'all' ? true : filter === 'approved' ? r.approved : !r.approved
  );

  const approved = reviews.filter(r => r.approved).length;
  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '—';

  if (!authed) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', padding: '2rem' }}>
        <div style={{ background: 'var(--white)', border: '1px solid var(--gray-light)', padding: '3rem', width: '100%', maxWidth: 400 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem' }}>
            <ShieldCheck size={22} color="var(--gold)" />
            <span style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem' }}>Admin Panel</span>
          </div>
          <form onSubmit={handleLogin} style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>
                Admin Password
              </label>
              <input
                type="password"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Enter your admin password"
                required
                style={{
                  width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--gray-light)',
                  fontSize: '0.9rem', fontFamily: 'var(--sans)', outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                onBlur={e => e.target.style.borderColor = 'var(--gray-light)'}
              />
            </div>
            <button type="submit" style={{
              background: 'var(--black)', color: 'var(--white)', border: 'none',
              padding: '0.85rem', fontSize: '0.82rem', fontWeight: 500,
              letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
              fontFamily: 'var(--sans)',
            }}>
              Sign In
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)', paddingTop: 64 }}>
      <div className="container" style={{ padding: '2.5rem clamp(1.25rem, 5vw, 2rem)' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldCheck size={22} color="var(--gold)" />
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', letterSpacing: '-0.01em' }}>Review Manager</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => fetchReviews()} style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              background: 'none', border: '1px solid var(--gray-light)', padding: '0.5rem 1rem',
              fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'var(--sans)', color: 'var(--gray)',
            }}>
              <RefreshCw size={13} /> Refresh
            </button>
            <button onClick={handleLogout} style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              background: 'none', border: '1px solid var(--gray-light)', padding: '0.5rem 1rem',
              fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'var(--sans)', color: 'var(--gray)',
            }}>
              <LogOut size={13} /> Sign Out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Reviews', value: reviews.length },
            { label: 'Approved', value: approved },
            { label: 'Hidden', value: reviews.length - approved },
            { label: 'Avg Rating', value: avg },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--white)', border: '1px solid var(--gray-light)', padding: '1.25rem' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', color: 'var(--black)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--gray)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '0.3rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {['all', 'approved', 'hidden'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '0.4rem 1rem', fontSize: '0.78rem', letterSpacing: '0.06em',
              textTransform: 'capitalize', fontFamily: 'var(--sans)', cursor: 'pointer',
              background: filter === f ? 'var(--black)' : 'var(--white)',
              color: filter === f ? 'var(--white)' : 'var(--gray)',
              border: '1px solid var(--gray-light)',
            }}>{f}</button>
          ))}
        </div>

        {/* Reviews table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray)' }}>Loading reviews…</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray)', border: '2px dashed var(--gray-light)' }}>No reviews found</div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {filtered.map(r => (
              <div key={r._id} style={{
                background: 'var(--white)', border: `1px solid ${r.approved ? 'var(--gray-light)' : 'rgba(201,168,76,0.3)'}`,
                padding: '1.25rem 1.5rem', display: 'grid',
                gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'start',
                opacity: r.approved ? 1 : 0.6,
              }}>
                <div style={{ display: 'grid', gap: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{r.name}</span>
                    {r.role && <span style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>{r.role}</span>}
                    <StarDisplay rating={r.rating} />
                    <span style={{
                      fontSize: '0.6rem', padding: '2px 8px', letterSpacing: '0.06em',
                      background: r.approved ? '#e8f5e9' : '#fff3e0',
                      color: r.approved ? '#2e7d32' : '#e65100',
                      border: `1px solid ${r.approved ? '#c8e6c9' : '#ffe0b2'}`,
                    }}>
                      {r.approved ? 'Approved' : 'Hidden'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--black)', lineHeight: 1.6, fontStyle: 'italic' }}>"{r.message}"</p>
                  <div style={{ fontSize: '0.65rem', color: 'var(--gray)' }}>
                    {new Date(r.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    <span style={{ marginLeft: '0.5rem', fontFamily: 'monospace', opacity: 0.5 }}>{r._id}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <button
                    onClick={() => handleToggleApprove(r._id, r.approved)}
                    title={r.approved ? 'Hide review' : 'Approve review'}
                    style={{
                      background: 'none', border: '1px solid var(--gray-light)', padding: '0.4rem 0.6rem',
                      cursor: 'pointer', color: r.approved ? 'var(--gray)' : 'var(--gold-dark)',
                      display: 'flex', alignItems: 'center',
                    }}
                  >
                    {r.approved ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                  <button
                    onClick={() => handleDelete(r._id)}
                    title="Delete review"
                    style={{
                      background: 'none', border: '1px solid #fecaca', padding: '0.4rem 0.6rem',
                      cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center',
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
