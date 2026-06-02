import React from 'react';

export default function Privacy() {
  return (
    <main style={{ paddingTop: 64, minHeight: '100vh', background: 'var(--white)' }}>
      <div className="container" style={{ maxWidth: 720, padding: 'clamp(3rem, 8vw, 5rem) clamp(1.25rem, 5vw, 2rem)' }}>
        <div style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>✦ Legal</div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.02em', marginBottom: '2.5rem' }}>Privacy Policy</h1>
        {[
          { title: 'What we collect', body: 'We collect the business details you enter into the generator (name, industry, tagline) in order to generate your brand kit. We also collect anonymous usage statistics to improve the service.' },
          { title: 'How we use it', body: 'Your inputs are sent to our AI provider to generate brand concepts. We store the generated brand kit in our database for up to 7 days so you can retrieve it. We do not sell your data to third parties.' },
          { title: 'Reviews', body: 'If you submit a review, your name, role, and message are stored in our database and displayed publicly on the website. You can request removal by contacting us.' },
          { title: 'Cookies', body: 'We use a single session cookie to remember your generated brand kit within your current session. No advertising or tracking cookies are used.' },
          { title: 'Contact', body: 'For any privacy concerns, email us at privacy@brandforge.ai' },
        ].map(s => (
          <div key={s.title} style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', marginBottom: '0.6rem' }}>{s.title}</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--gray)', lineHeight: 1.8 }}>{s.body}</p>
          </div>
        ))}
        <p style={{ fontSize: '0.8rem', color: 'var(--gray)', borderTop: '1px solid var(--gray-light)', paddingTop: '1.5rem', marginTop: '1rem' }}>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
      </div>
    </main>
  );
}
