import React from 'react';

function isDark(hex = '#000') {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 145;
}

// This card is rendered off-screen and captured as PNG
export default function BrandExportCard({ concept, businessName }) {
  if (!concept) return null;

  const layout = concept.layout || {};
  const bg = concept.palette?.background || '#0d0d0d';
  const accent = concept.palette?.primary || '#c9a84c';
  const colors = concept.palette?.colors || [bg, accent, '#f4f0e8', '#888'];
  const names = concept.palette?.names || [];
  const dark = isDark(bg);
  const textColor = dark ? '#ffffff' : '#0a0a0a';
  const subColor = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)';
  const displayFont = concept.typography?.display || 'Playfair Display';
  const bodyFont = concept.typography?.body || 'DM Sans';
  const words = (businessName || 'Brand').split(' ');

  return (
    <div style={{ width: 800, background: '#ffffff', fontFamily: `'${bodyFont}', sans-serif` }}>

      {/* Hero */}
      <div style={{
        background: layout.heroStyle === 'gradient' ? `linear-gradient(135deg, ${bg} 55%, ${accent}55)` : bg,
        padding: '60px 56px',
        display: 'flex',
        flexDirection: layout.heroStyle === 'split-panel' ? 'row' : 'column',
        alignItems: layout.heroAlign === 'center' ? 'center' : 'flex-start',
        textAlign: layout.heroAlign || 'center',
        minHeight: 220,
        position: 'relative',
      }}>
        {layout.accentBar === 'top' && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: accent }} />}
        {layout.accentBar === 'left' && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: accent }} />}

        {layout.heroStyle === 'split-panel' ? (
          <>
            <div style={{ width: 180, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 220 }}>
              <span style={{ fontFamily: `'${displayFont}', serif`, fontSize: '5rem', fontWeight: 700, color: isDark(accent) ? '#fff' : '#000' }}>
                {(businessName || 'B')[0]}
              </span>
            </div>
            <div style={{ flex: 1, padding: '40px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: '2.2rem', color: textColor, lineHeight: 1.1 }}>{businessName || 'Brand'}</div>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: subColor, marginTop: 12 }}>{concept.tagline}</div>
            </div>
          </>
        ) : (
          <>
            {layout.logoType === 'lettermark' || layout.logoType === 'badge-wordmark' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
                <div style={{ width: 60, height: 60, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: `'${displayFont}', serif`, fontSize: '2rem', fontWeight: 700, color: isDark(accent) ? '#fff' : '#000' }}>
                    {(businessName || 'B')[0]}
                  </span>
                </div>
                <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: '2rem', color: textColor }}>{businessName || 'Brand'}</div>
              </div>
            ) : layout.logoType === 'stacked-initial' ? (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: '5rem', color: accent, lineHeight: 0.9, fontWeight: 700 }}>{(businessName || 'B')[0]}</div>
                <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: '1.2rem', color: textColor, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 8 }}>{businessName}</div>
              </div>
            ) : (
              <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: '3rem', color: textColor, lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.01em' }}>
                {words.length > 1 ? (
                  <><span style={{ color: accent }}>{words[0]} </span><span>{words.slice(1).join(' ')}</span></>
                ) : (
                  <>{businessName?.slice(0, -1)}<span style={{ color: accent }}>{businessName?.slice(-1)}</span></>
                )}
              </div>
            )}
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: subColor }}>{concept.tagline}</div>
          </>
        )}

        {layout.accentBar === 'bottom' && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, background: accent }} />}
      </div>

      {/* Color palette */}
      <div style={{ display: 'flex', height: 80 }}>
        {colors.slice(0, 4).map((c, i) => (
          <div key={i} style={{ flex: 1, background: c, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: '0 0 10px' }}>
            <span style={{ fontSize: '0.55rem', color: isDark(c) ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)', letterSpacing: '0.05em', fontWeight: 600 }}>{names[i] || ''}</span>
            <span style={{ fontSize: '0.5rem', color: isDark(c) ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.45)', letterSpacing: '0.04em', marginTop: 2 }}>{c}</span>
          </div>
        ))}
      </div>

      {/* Info section */}
      <div style={{ padding: '40px 56px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        {/* Typography */}
        <div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: 12 }}>Typography</div>
          <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: '1.6rem', color: '#0a0a0a', lineHeight: 1.1, marginBottom: 4 }}>{displayFont}</div>
          <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: '0.9rem', color: '#555' }}>Display Font — Headings & Logo</div>
          <div style={{ marginTop: 14, borderTop: '1px solid #eee', paddingTop: 14 }}>
            <div style={{ fontFamily: `'${bodyFont}', sans-serif`, fontSize: '1rem', color: '#0a0a0a', marginBottom: 4 }}>{bodyFont}</div>
            <div style={{ fontFamily: `'${bodyFont}', sans-serif`, fontSize: '0.85rem', color: '#555' }}>Body Font — Content & UI</div>
          </div>
        </div>

        {/* Personality & mood */}
        <div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: 12 }}>Brand Personality</div>
          <div style={{ fontSize: '0.85rem', color: '#333', lineHeight: 1.7, marginBottom: 16 }}>{concept.personality}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {concept.moodWords?.map(w => (
              <span key={w} style={{ fontSize: '0.65rem', padding: '3px 10px', background: '#faf8f3', color: '#8a6e2f', border: '1px solid #e8dfc5', letterSpacing: '0.06em' }}>{w}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #eee', padding: '18px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '0.6rem', color: '#bbb', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{concept.theme} Direction — {concept.name}</div>
        <div style={{ fontSize: '0.6rem', color: '#bbb', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Generated by BrandForge AI</div>
      </div>
    </div>
  );
}
