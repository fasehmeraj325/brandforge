import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--black)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '3rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <div style={{ width: 28, height: 28, background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={14} color="#0a0a0a" />
              </div>
              <span style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', color: 'var(--white)' }}>
                Brand<span style={{ color: 'var(--gold)' }}>Forge</span>
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', maxWidth: '28ch', lineHeight: 1.6 }}>
              AI-powered brand identity for founders, startups, and creators.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>Product</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  { label: 'Generator', to: '/generate' },
                  { label: 'How it works', to: '/how-it-works' },
                ].map(({ label, to }) => (
                  <Link key={label} to={to} style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#fff'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
                  >{label}</Link>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>Legal</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  { label: 'Privacy Policy', to: '/privacy' },
                  { label: 'Terms of Use', to: '/terms' },
                ].map(({ label, to }) => (
                  <Link key={label} to={to} style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#fff'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
                  >{label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)' }}>
            © {new Date().getFullYear()} BrandForge AI. All rights reserved.
          </div>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)' }}>
            Free to use · No credit card required
          </div>
        </div>
      </div>
    </footer>
  );
}
