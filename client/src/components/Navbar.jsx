import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [loc]);

  const isActive = (path) => loc.pathname === path;

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(10,10,10,0.97)' : 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.06)'}`,
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
            <div style={{
              width: 32, height: 32, background: 'var(--gold)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={16} color="#0a0a0a" />
            </div>
            <span style={{
              fontFamily: 'var(--serif)', fontSize: '1.25rem', color: '#ffffff',
              letterSpacing: '-0.01em', lineHeight: 1,
            }}>
              Brand<span style={{ color: 'var(--gold)' }}>Forge</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }} className="nav-links-desktop">
            {[
              { to: '/generate', label: 'Generator' },
              { to: '/how-it-works', label: 'How it works' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} style={{
                  fontSize: '0.85rem', fontWeight: 400, letterSpacing: '0.02em',
                  color: isActive(to) ? '#ffffff' : 'rgba(255,255,255,0.5)',
                  textDecoration: 'none', position: 'relative', paddingBottom: '4px',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                  onMouseLeave={e => e.currentTarget.style.color = isActive(to) ? '#ffffff' : 'rgba(255,255,255,0.5)'}
                >
                  {label}
                  {isActive(to) && (
                    <span style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: '1px', background: 'var(--gold)',
                    }} />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + burger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/generate" className="nav-cta-desktop" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
              background: 'var(--gold)', color: '#0a0a0a',
              fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
              padding: '0.55rem 1.25rem', textDecoration: 'none',
              transition: 'background 0.2s, transform 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e0bc5c'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <Sparkles size={13} /> Generate Free
            </Link>

            {/* Mobile burger */}
            <button
              onClick={() => setOpen(!open)}
              className="nav-burger"
              style={{
                background: 'none', border: '1px solid rgba(255,255,255,0.15)',
                color: '#ffffff', padding: '6px 8px', cursor: 'pointer',
                display: 'none', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 0.2s',
              }}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div style={{
          maxHeight: open ? '340px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
          background: '#0f0f0f',
          borderTop: open ? '1px solid rgba(201,168,76,0.15)' : 'none',
        }}>
          <div style={{ padding: '0.5rem 0 1rem' }}>
            {[
              { to: '/generate', label: 'Generator' },
              { to: '/how-it-works', label: 'How it works' },
            ].map(({ to, label }) => (
              <Link key={to} to={to} style={{
                display: 'block', padding: '0.9rem 2rem',
                color: isActive(to) ? '#ffffff' : 'rgba(255,255,255,0.55)',
                fontSize: '0.95rem', textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                transition: 'color 0.2s, background 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = isActive(to) ? '#ffffff' : 'rgba(255,255,255,0.55)'; e.currentTarget.style.background = 'transparent'; }}
              >
                {label}
              </Link>
            ))}
            <div style={{ padding: '1rem 2rem 0.5rem' }}>
              <Link to="/generate" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                background: 'var(--gold)', color: '#0a0a0a',
                padding: '0.85rem', fontSize: '0.85rem', fontWeight: 600,
                letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
              }}>
                <Sparkles size={14} /> Generate Free Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
