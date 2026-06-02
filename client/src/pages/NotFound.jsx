import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', paddingTop: 64, textAlign: 'center', padding: '2rem' }}>
      <div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(5rem, 15vw, 10rem)', color: 'var(--black)', lineHeight: 1, opacity: 0.08, marginBottom: '-1rem' }}>404</div>
        <div style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>✦ Page not found</div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          This page doesn't exist
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--gray)', maxWidth: '38ch', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          Looks like you took a wrong turn. Head back and generate your brand kit.
        </p>
        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'var(--black)', color: 'var(--white)',
          padding: '0.85rem 2rem', fontSize: '0.82rem', fontWeight: 500,
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          <Sparkles size={14} /> Back to Home
        </Link>
      </div>
    </main>
  );
}
