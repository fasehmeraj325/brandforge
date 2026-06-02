import React, { useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';

const STYLES = [
  { key: 'Luxury', icon: '◆', label: 'Luxury' },
  { key: 'Minimal', icon: '○', label: 'Minimal' },
  { key: 'Bold', icon: '▲', label: 'Bold' },
  { key: 'Playful', icon: '★', label: 'Playful' },
  { key: 'Corporate', icon: '■', label: 'Corporate' },
  { key: 'Natural', icon: '❋', label: 'Natural' },
];

const INDUSTRIES = [
  'Technology & SaaS', 'Health & Wellness', 'Food & Restaurant',
  'Fashion & Beauty', 'Finance & Consulting', 'Education & Coaching',
  'Creative & Design', 'Real Estate', 'E-commerce & Retail', 'Other'
];

export default function GeneratorForm({ onGenerate, loading }) {
  const [form, setForm] = useState({
    businessName: '', industry: '', tagline: '',
    styleDirection: 'Luxury', personality: ''
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.businessName.trim()) return;
    onGenerate(form);
  };

  const inputStyle = {
    width: '100%', fontFamily: 'var(--sans)', fontSize: '0.9rem',
    padding: '0.8rem 1rem', border: '1px solid var(--gray-light)',
    background: 'var(--white)', color: 'var(--black)', outline: 'none',
    transition: 'border-color 0.2s', borderRadius: '2px',
  };

  const labelStyle = {
    fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
    color: 'var(--black)', fontWeight: 500, marginBottom: '0.4rem', display: 'block'
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>

      <div>
        <label style={labelStyle}>Business Name *</label>
        <input
          style={inputStyle}
          placeholder="e.g. Aura Wellness, NovaTech…"
          value={form.businessName}
          onChange={e => set('businessName', e.target.value)}
          onFocus={e => e.target.style.borderColor = 'var(--gold)'}
          onBlur={e => e.target.style.borderColor = 'var(--gray-light)'}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Industry</label>
        <select
          style={{ ...inputStyle, cursor: 'pointer' }}
          value={form.industry}
          onChange={e => set('industry', e.target.value)}
          onFocus={e => e.target.style.borderColor = 'var(--gold)'}
          onBlur={e => e.target.style.borderColor = 'var(--gray-light)'}
        >
          <option value="">Select industry…</option>
          {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
        </select>
      </div>

      <div>
        <label style={labelStyle}>Tagline hint (optional)</label>
        <input
          style={inputStyle}
          placeholder="e.g. Elevate every moment"
          value={form.tagline}
          onChange={e => set('tagline', e.target.value)}
          onFocus={e => e.target.style.borderColor = 'var(--gold)'}
          onBlur={e => e.target.style.borderColor = 'var(--gray-light)'}
        />
      </div>

      <div>
        <label style={labelStyle}>Style Direction</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
          {STYLES.map(s => (
            <button
              key={s.key}
              type="button"
              onClick={() => set('styleDirection', s.key)}
              style={{
                padding: '0.6rem 0.4rem',
                border: form.styleDirection === s.key ? '1px solid var(--gold)' : '1px solid var(--gray-light)',
                background: form.styleDirection === s.key ? 'rgba(201,168,76,0.06)' : 'var(--white)',
                color: form.styleDirection === s.key ? 'var(--gold-dark)' : 'var(--gray)',
                fontSize: '0.72rem', textAlign: 'center', transition: 'all 0.2s',
                cursor: 'pointer', borderRadius: '2px',
              }}
            >
              <div style={{ fontSize: '1rem', marginBottom: '2px' }}>{s.icon}</div>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={labelStyle}>Brand Personality (optional)</label>
        <textarea
          style={{ ...inputStyle, height: '70px', resize: 'none' }}
          placeholder="e.g. trustworthy, innovative, warm, premium…"
          value={form.personality}
          onChange={e => set('personality', e.target.value)}
          onFocus={e => e.target.style.borderColor = 'var(--gold)'}
          onBlur={e => e.target.style.borderColor = 'var(--gray-light)'}
        />
      </div>

      <button
        type="submit"
        disabled={loading || !form.businessName.trim()}
        style={{
          background: loading ? 'var(--gray)' : 'var(--black)',
          color: 'var(--white)', border: 'none',
          padding: '1rem', fontSize: '0.85rem', fontWeight: 500,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
          transition: 'background 0.2s', width: '100%', cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: 'var(--sans)', borderRadius: '2px',
        }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'var(--gold-dark)'; }}
        onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'var(--black)'; }}
      >
        {loading
          ? <><RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} /> Generating…</>
          : <><Sparkles size={15} /> Generate 4 Brand Concepts</>
        }
      </button>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}
