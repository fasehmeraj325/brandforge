import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const STEPS = [
  { n: '01', title: 'Tell us about your business', desc: 'Enter your business name, industry, preferred style direction, and any personality notes. The more detail, the more tailored your results.' },
  { n: '02', title: 'AI crafts 4 unique concepts', desc: 'Our AI analyses thousands of design patterns and your inputs to create four completely different brand identities — each with its own mood, palette, and typography.' },
  { n: '03', title: 'Pick your favourite', desc: 'Review all four concepts side by side. Select the one that matches your vision — or regenerate for a fresh batch.' },
  { n: '04', title: 'Download & launch', desc: 'Download your complete brand kit: logos in SVG, PNG & PDF, a full color guide, font pairing recommendations, and a one-page style guide.' },
];

export default function HowItWorks() {
  return (
    <main style={{ paddingTop: '64px' }}>
      <section style={{ background: 'var(--cream)', padding: 'clamp(3rem, 8vw, 6rem) 0', borderBottom: '1px solid var(--gray-light)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px' }}>
          <div style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>✦ The Process</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            From idea to brand in minutes
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--gray)', lineHeight: 1.7 }}>
            No design skills needed. No expensive agencies. Just your business details and 30 seconds.
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(3rem, 8vw, 6rem) 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          {STEPS.map((s, i) => (
            <motion.div key={s.n}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '2rem', marginBottom: '3rem', alignItems: 'start' }}>
              <div style={{ width: 64, height: 64, background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)', fontSize: '1.4rem', color: 'var(--white)', flexShrink: 0 }}>{s.n}</div>
              <div style={{ paddingTop: '0.75rem' }}>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', marginBottom: '0.75rem' }}>{s.title}</h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--gray)', lineHeight: 1.75 }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--black)', padding: 'clamp(3rem, 8vw, 6rem) 0', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--white)', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
          Ready to try it?
        </h2>
        <Link to="/generate" style={{
          background: 'var(--gold)', color: 'var(--black)', padding: '1rem 2.5rem',
          fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
        }}>
          <Sparkles size={15} /> Generate Free Now
        </Link>
      </section>
    </main>
  );
}
