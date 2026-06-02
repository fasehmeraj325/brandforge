import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';

const PLANS = [
  {
    name: 'Free', price: '0', period: 'forever',
    desc: 'Everything you need to get started.',
    features: [
      { t: 'Unlimited brand kit generations', y: true },
      { t: '4 unique concepts per generation', y: true },
      { t: 'Logo preview (watermarked)', y: true },
      { t: 'Color palette guide', y: true },
      { t: 'Font pairing recommendations', y: true },
      { t: 'Clean SVG/PNG download', y: false },
      { t: 'Style guide PDF', y: false },
      { t: 'Brand kit editor', y: false },
    ],
    cta: 'Get Started Free', href: '/generate', featured: false
  },
  {
    name: 'Pro', price: '19', period: 'one-time',
    badge: 'Most Popular',
    desc: 'Download your brand kit, clean and ready.',
    features: [
      { t: 'Unlimited brand kit generations', y: true },
      { t: '4 unique concepts per generation', y: true },
      { t: 'Logo in SVG, PNG & PDF', y: true },
      { t: 'Color palette guide', y: true },
      { t: 'Font pairing recommendations', y: true },
      { t: 'Clean SVG/PNG download', y: true },
      { t: 'Style guide PDF', y: true },
      { t: 'Brand kit editor', y: false },
    ],
    cta: 'Get Pro', href: '/generate', featured: true
  },
  {
    name: 'Editor', price: '9', period: 'per month',
    badge: 'Coming Soon',
    desc: 'Edit every element of your brand kit in-browser.',
    features: [
      { t: 'Everything in Pro', y: true },
      { t: 'In-browser brand editor', y: true },
      { t: 'Custom color overrides', y: true },
      { t: 'Font swapper', y: true },
      { t: 'Export to Figma', y: true },
      { t: 'Export to Canva', y: true },
      { t: 'Unlimited downloads', y: true },
      { t: 'Priority support', y: true },
    ],
    cta: 'Join Waitlist', href: '/generate', featured: false, disabled: true
  },
];

export default function Pricing() {
  return (
    <main style={{ paddingTop: '64px' }}>
      <section style={{ background: 'var(--black)', padding: 'clamp(3rem, 8vw, 6rem) 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px' }}>
          <div style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>✦ Pricing</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Simple, honest pricing
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
            Generate and preview for free — always. Pay only when you want to download.
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', maxWidth: '960px', margin: '0 auto' }}>
            {PLANS.map(plan => (
              <div key={plan.name} style={{
                border: plan.featured ? '2px solid var(--gold)' : '1px solid var(--gray-light)',
                background: plan.featured ? 'rgba(201,168,76,0.03)' : 'var(--white)',
                padding: '2rem', position: 'relative'
              }}>
                {plan.badge && (
                  <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: plan.disabled ? 'var(--gray)' : 'var(--gold)', color: plan.disabled ? 'white' : 'var(--black)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', padding: '0.25rem 0.8rem', whiteSpace: 'nowrap' }}>
                    {plan.badge}
                  </div>
                )}
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>{plan.name}</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '3rem', lineHeight: 1, marginBottom: '0.25rem' }}>
                  <sup style={{ fontFamily: 'var(--sans)', fontSize: '1rem', verticalAlign: 'top', marginTop: '0.6rem', display: 'inline-block' }}>$</sup>
                  {plan.price}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray)', marginBottom: '0.75rem' }}>{plan.period}</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{plan.desc}</p>
                <div style={{ height: 1, background: 'var(--gray-light)', marginBottom: '1.5rem' }} />
                <ul style={{ listStyle: 'none', display: 'grid', gap: '0.7rem', marginBottom: '2rem' }}>
                  {plan.features.map(f => (
                    <li key={f.t} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: f.y ? 'var(--black)' : 'var(--gray-mid)' }}>
                      {f.y ? <Check size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} /> : <X size={14} style={{ color: 'var(--gray-light)', flexShrink: 0 }} />}
                      {f.t}
                    </li>
                  ))}
                </ul>
                <Link to={plan.href} style={{
                  display: 'block', textAlign: 'center', padding: '0.875rem',
                  background: plan.featured ? 'var(--black)' : 'transparent',
                  color: plan.featured ? 'var(--white)' : 'var(--black)',
                  border: plan.featured ? '1px solid var(--black)' : '1px solid var(--black)',
                  fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
                  opacity: plan.disabled ? 0.5 : 1, pointerEvents: plan.disabled ? 'none' : 'auto',
                  transition: 'all 0.2s'
                }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
