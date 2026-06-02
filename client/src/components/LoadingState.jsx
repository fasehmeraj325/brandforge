import React from 'react';
import { motion } from 'framer-motion';

const STEPS = [
  'Analysing your brand identity…',
  'Crafting colour harmonies…',
  'Pairing typography systems…',
  'Composing 4 unique concepts…',
];

export default function LoadingState({ step }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: '2rem', minHeight: '400px',
      padding: '3rem'
    }}>
      {/* Animated ring */}
      <div style={{ position: 'relative', width: 64, height: 64 }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          border: '2px solid var(--gray-light)',
          borderTop: '2px solid var(--gold)',
          animation: 'spin 0.9s linear infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: '1.2rem', color: 'var(--gold)'
        }}>◈</div>
      </div>

      {/* Steps */}
      <div style={{ display: 'grid', gap: '0.75rem', textAlign: 'center', width: '100%', maxWidth: '280px' }}>
        {STEPS.map((s, i) => (
          <motion.div
            key={i}
            animate={{ opacity: i <= step ? 1 : 0.25, y: i === step ? 0 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              fontSize: '0.85rem',
              color: i === step ? 'var(--black)' : 'var(--gray)',
              fontWeight: i === step ? 500 : 400,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
            }}
          >
            {i < step && <span style={{ color: 'var(--gold)', fontSize: '0.7rem' }}>✓</span>}
            {i === step && <span style={{ color: 'var(--gold)', animation: 'pulse 1.5s infinite' }}>●</span>}
            {s}
          </motion.div>
        ))}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </div>
  );
}
