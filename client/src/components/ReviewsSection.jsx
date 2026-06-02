import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, X, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { getReviews, submitReview } from '../utils/api';

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, lineHeight: 1 }}
        >
          <Star
            size={24}
            fill={(hovered || value) >= n ? '#c9a84c' : 'none'}
            color={(hovered || value) >= n ? '#c9a84c' : '#ccc'}
            style={{ transition: 'all 0.15s' }}
          />
        </button>
      ))}
    </div>
  );
}

function StarDisplay({ rating }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <Star key={n} size={13} fill={rating >= n ? '#c9a84c' : 'none'} color={rating >= n ? '#c9a84c' : '#ddd'} />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }) {
  const initials = review.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const colors = ['#c9a84c', '#4a7c5c', '#1d3557', '#8a4a7c', '#7c4a4a'];
  const bg = colors[review.name.charCodeAt(0) % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      style={{
        background: 'var(--white)', border: '1px solid var(--gray-light)',
        padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%', background: bg, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em',
          }}>
            {initials}
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--black)' }}>{review.name}</div>
            {review.role && <div style={{ fontSize: '0.72rem', color: 'var(--gray)' }}>{review.role}</div>}
          </div>
        </div>
        <StarDisplay rating={review.rating} />
      </div>
      <p style={{
        fontFamily: 'var(--serif)', fontSize: '0.95rem', color: 'var(--black)',
        lineHeight: 1.65, fontStyle: 'italic',
      }}>
        "{review.message}"
      </p>
      <div style={{ fontSize: '0.65rem', color: 'var(--gray)', letterSpacing: '0.05em' }}>
        {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </div>
    </motion.div>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', rating: 0, message: '' });

  useEffect(() => {
    getReviews().then(r => setReviews(r.data)).catch(() => {});
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.rating) { toast.error('Please select a star rating'); return; }
    setSubmitting(true);
    try {
      const { data } = await submitReview(form);
      setReviews(prev => [data.review, ...prev]);
      setForm({ name: '', role: '', rating: 0, message: '' });
      setShowForm(false);
      toast.success('Thanks for your review!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--gray-light)',
    background: 'var(--white)', color: 'var(--black)', fontSize: '0.875rem',
    fontFamily: 'var(--sans)', outline: 'none', transition: 'border-color 0.2s',
    borderRadius: '2px',
  };

  return (
    <section style={{ padding: 'clamp(3rem, 8vw, 6rem) 0', background: 'var(--white)' }}>
      <div className="container">

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>✦ Reviews</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              What people are saying
            </h2>
            {avg && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.75rem' }}>
                <StarDisplay rating={Math.round(avg)} />
                <span style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>
                  <strong style={{ color: 'var(--black)' }}>{avg}</strong> out of 5 · {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowForm(true)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--black)', color: 'var(--white)', border: 'none',
              padding: '0.75rem 1.5rem', fontSize: '0.78rem', fontWeight: 500,
              letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
              fontFamily: 'var(--sans)', transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-dark)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--black)'}
          >
            <MessageSquare size={14} /> Leave a Review
          </button>
        </div>

        {/* Review cards grid */}
        {reviews.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {reviews.map((r, i) => <ReviewCard key={r._id} review={r} index={i} />)}
          </div>
        ) : (
          <div style={{
            textAlign: 'center', padding: '4rem 2rem', border: '2px dashed var(--gray-light)',
            color: 'var(--gray)',
          }}>
            <MessageSquare size={32} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
            <p style={{ fontSize: '0.95rem' }}>No reviews yet — be the first!</p>
          </div>
        )}
      </div>

      {/* Review form modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
              zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1.25rem',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--white)', width: '100%', maxWidth: 520,
                padding: '2.5rem', position: 'relative',
              }}
            >
              {/* Close */}
              <button
                onClick={() => setShowForm(false)}
                style={{
                  position: 'absolute', top: '1.25rem', right: '1.25rem',
                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray)',
                  padding: 4,
                }}
              >
                <X size={20} />
              </button>

              <div style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' }}>✦ Your Review</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', marginBottom: '1.75rem', letterSpacing: '-0.01em' }}>
                Share your experience
              </h3>

              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--black)', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>
                      Your Name *
                    </label>
                    <input
                      style={inputStyle} required placeholder="Jane Smith"
                      value={form.name} onChange={e => set('name', e.target.value)}
                      onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                      onBlur={e => e.target.style.borderColor = 'var(--gray-light)'}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--black)', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>
                      Role / Business
                    </label>
                    <input
                      style={inputStyle} placeholder="Founder, Agency…"
                      value={form.role} onChange={e => set('role', e.target.value)}
                      onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                      onBlur={e => e.target.style.borderColor = 'var(--gray-light)'}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--black)', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>
                    Rating *
                  </label>
                  <StarPicker value={form.rating} onChange={v => set('rating', v)} />
                </div>

                <div>
                  <label style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--black)', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>
                    Your Review *
                  </label>
                  <textarea
                    style={{ ...inputStyle, height: 110, resize: 'none' }}
                    required placeholder="Tell others about your experience with BrandForge…"
                    value={form.message} onChange={e => set('message', e.target.value)}
                    onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={e => e.target.style.borderColor = 'var(--gray-light)'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: submitting ? 'var(--gray)' : 'var(--black)',
                    color: 'var(--white)', border: 'none', padding: '0.9rem',
                    fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.08em',
                    textTransform: 'uppercase', cursor: submitting ? 'not-allowed' : 'pointer',
                    fontFamily: 'var(--sans)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '0.5rem', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = 'var(--gold-dark)'; }}
                  onMouseLeave={e => { if (!submitting) e.currentTarget.style.background = 'var(--black)'; }}
                >
                  <Send size={14} /> {submitting ? 'Submitting…' : 'Submit Review'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
