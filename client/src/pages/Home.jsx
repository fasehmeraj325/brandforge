import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Download, Palette, Type, Zap, Shield, ChevronDown } from 'lucide-react';
import { getStats } from '../utils/api';
import ReviewsSection from '../components/ReviewsSection';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' } })
};

const FAQ_ITEMS = [
  { q: 'Is it really free?', a: 'Yes — generate and preview as many brand kits as you want, completely free. We earn through ads and optional premium features coming soon.' },
  { q: 'How is every result unique?', a: 'Each generation uses your inputs combined with a random seed sent to our AI, which creates genuinely new color systems, font pairings, and brand personalities every time.' },
  { q: 'Can I use the brand kit for my business?', a: 'Absolutely. All generated brand concepts are yours to use commercially, with no attribution required.' },
  { q: 'What formats will I get when I download?', a: 'Logo in SVG, PNG (transparent), and PDF; a color guide with hex codes; font pairing recommendations; and a one-page brand style guide PDF.' },
  { q: 'What premium features are coming?', a: 'A full in-browser brand editor where you can tweak colors, swap fonts, rearrange layouts, and export to Figma or Canva. Sign up free to get early access.' },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--gray-light)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1.25rem 0', background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--sans)', fontSize: '0.95rem', fontWeight: 500, color: 'var(--black)',
          textAlign: 'left', gap: '1rem'
        }}
      >
        {q}
        <ChevronDown size={18} style={{ color: 'var(--gold)', flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.7, paddingBottom: '1.25rem' }}>{a}</p>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [stats, setStats] = useState({ totalGenerations: 2400, totalUsers: 1680 });

  useEffect(() => {
    getStats().then(r => setStats(r.data)).catch(() => {});
  }, []);

  return (
    <main style={{ paddingTop: '64px' }}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem',
        padding: 'clamp(3rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
        alignItems: 'center', position: 'relative', overflow: 'hidden',
        maxWidth: '1200px', margin: '0 auto',
      }}>
        <div className="hero-orb" style={{
          position: 'absolute', top: '-150px', right: '-150px', width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--cream)', border: '1px solid var(--gold-light)',
              padding: '0.35rem 0.9rem', fontSize: '0.72rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '1.5rem'
            }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', animation: 'pulse 2s infinite', display: 'inline-block' }} />
            Powered by AI
          </motion.div>

          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
            style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
            Your brand,{' '}
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>beautifully</em>{' '}
            crafted in seconds
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
            style={{ fontSize: '1.05rem', color: 'var(--gray)', lineHeight: 1.7,
              maxWidth: '44ch', marginBottom: '2.5rem' }}>
            BrandForge AI generates 4 completely unique brand identities — colors, typography, logo — tailored to your business. Free, forever.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show"
            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/generate" style={{
              background: 'var(--black)', color: 'var(--white)', padding: '0.9rem 2rem',
              fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase',
              transition: 'background 0.2s', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-dark)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--black)'}
            >
              <Sparkles size={15} /> Generate Free Now
            </Link>
            <Link to="/how-it-works" style={{
              fontSize: '0.875rem', color: 'var(--black)',
              borderBottom: '1px solid var(--black)', paddingBottom: '2px'
            }}>
              See how it works ›
            </Link>
          </motion.div>

          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show"
            style={{ marginTop: '3rem', fontSize: '0.75rem', letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--gray)' }}>
            Trusted by <strong style={{ color: 'var(--black)' }}>{stats.totalUsers.toLocaleString()}+</strong> businesses worldwide
          </motion.div>
        </div>

        {/* Hero visual */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
          <div style={{ background: 'var(--black)', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(201,168,76,0.03) 40px,rgba(201,168,76,0.03) 41px)', pointerEvents: 'none' }} />
            <span style={{ position: 'absolute', top: '-10px', right: '2rem', background: 'var(--gold)', color: 'var(--black)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', padding: '0.3rem 0.7rem' }}>SAMPLE KIT</span>

            <div style={{ height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(201,168,76,0.2)', marginBottom: '1.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--white)' }}>Aura<span style={{ color: 'var(--gold)' }}>.</span></div>
                <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: 'var(--gray)', marginTop: 4 }}>WELLNESS STUDIO</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {['#1a1a2e','#c9a84c','#e8e5de','#4a7c5c'].map(c => (
                <div key={c} style={{ height: 36, flex: 1, background: c }} />
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem', display: 'grid', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.6rem', color: 'var(--gray)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Display</span>
                <span style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', color: 'var(--white)' }}>Instrument Serif</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.6rem', color: 'var(--gray)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Body</span>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>DM Sans — clean & modern</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem' }}>
              {['Logo SVG', 'Style Guide', 'Biz Card'].map(l => (
                <div key={l} style={{ flex: 1, padding: '0.5rem', textAlign: 'center', fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.08)' }}>{l}</div>
              ))}
            </div>
          </div>
        </motion.div>

        <style>{`
          @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
          @media (max-width: 768px) {
            section { grid-template-columns: 1fr !important; }
            .hero-orb { display: none; }
          }
        `}</style>
      </section>

      {/* ── STATS BAR ── */}
      <div style={{ background: 'var(--black)', padding: '1.5rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2rem, 8vw, 6rem)', flexWrap: 'wrap' }}>
          {[
            { n: `${stats.totalGenerations.toLocaleString()}+`, l: 'Brand kits generated' },
            { n: '4', l: 'Unique concepts per generation' },
            { n: '100%', l: 'Free to use' },
            { n: '<30s', l: 'Generation time' },
          ].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: 'var(--gold)', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', marginTop: '0.3rem', textTransform: 'uppercase' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section style={{ padding: 'clamp(3rem, 8vw, 6rem) 0', background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>✦ Why BrandForge</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.02em' }}>
              Everything your brand needs, instantly
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: <Sparkles size={22} />, title: 'AI-Powered Uniqueness', desc: 'Gemini AI crafts truly unique results every time — no templates, no repetition.' },
              { icon: <Palette size={22} />, title: '4 Concepts Per Gen', desc: 'Get 4 completely different visual directions. Pick the one that fits your vision.' },
              { icon: <Type size={22} />, title: 'Full Typography System', desc: 'Perfectly paired display and body fonts sourced from Google Fonts — free to use.' },
              { icon: <Zap size={22} />, title: 'Ready in Under 30s', desc: 'From blank form to complete brand kit in seconds. Faster than any designer or tool.' },
              { icon: <Download size={22} />, title: 'Download Everything', desc: 'SVG, PNG, PDF logos plus a style guide PDF with all your brand specifications.' },
              { icon: <Shield size={22} />, title: 'Yours to Keep', desc: '100% commercial rights included. No attribution, no recurring fees.' },
            ].map(f => (
              <motion.div key={f.title} whileHover={{ y: -4 }}
                style={{ background: 'var(--white)', padding: '1.75rem', border: '1px solid var(--gray-light)' }}>
                <div style={{ color: 'var(--gold)', marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', marginBottom: '0.6rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray)', lineHeight: 1.7 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* ── FAQ ── */}
      <section style={{ padding: 'clamp(3rem, 8vw, 6rem) 0', background: 'var(--cream)' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>✦ FAQ</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.02em', marginBottom: '2.5rem' }}>Common questions</h2>
          {FAQ_ITEMS.map(item => <FaqItem key={item.q} {...item} />)}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--black)', padding: 'clamp(4rem, 10vw, 8rem) 1.25rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(201,168,76,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Ready to build your brand?
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', maxWidth: '42ch', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Join {stats.totalUsers.toLocaleString()}+ businesses that launched with a BrandForge identity. Free, always.
          </p>
          <Link to="/generate" style={{
            background: 'var(--gold)', color: 'var(--black)', padding: '1rem 2.5rem',
            fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            transition: 'background 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-light)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}
          >
            <Sparkles size={15} /> Generate My Brand Kit — Free
          </Link>
        </div>
      </section>

    </main>
  );
}
