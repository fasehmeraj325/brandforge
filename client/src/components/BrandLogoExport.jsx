import React from 'react';

function isDark(hex = '#000') {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 145;
}

// Clean logo-only render — no UI chrome, captured as PNG on download
export default function BrandLogoExport({ concept, businessName }) {
  if (!concept) return null;

  const layout = concept.layout || {};
  const bg = concept.palette?.background || '#0d0d0d';
  const accent = concept.palette?.primary || '#c9a84c';
  const dark = isDark(bg);
  const textColor = dark ? '#ffffff' : '#0a0a0a';
  const subColor = dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)';
  const displayFont = concept.typography?.display || 'Playfair Display';
  const words = (businessName || 'Brand').split(' ');
  const initial = (businessName || 'B')[0].toUpperCase();
  const tagline = concept.tagline || '';

  const heroBg = layout.heroStyle === 'gradient'
    ? `linear-gradient(135deg, ${bg} 55%, ${accent}55)`
    : bg;

  return (
    <div style={{
      width: 900,
      height: 500,
      background: heroBg,
      display: 'flex',
      flexDirection: layout.heroStyle === 'split-panel' ? 'row' : 'column',
      alignItems: layout.heroStyle === 'split-panel' ? 'stretch' : layout.heroAlign === 'center' ? 'center' : 'flex-start',
      justifyContent: 'center',
      textAlign: layout.heroAlign || 'center',
      padding: layout.heroStyle === 'split-panel' ? 0 : '80px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {layout.accentBar === 'top' && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: accent }} />}
      {layout.accentBar === 'left' && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, background: accent }} />}
      {layout.accentBar === 'bottom' && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 8, background: accent }} />}

      {layout.heroStyle === 'split-panel' ? (
        <>
          <div style={{ width: '38%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: `'${displayFont}', serif`, fontSize: '8rem', fontWeight: 700, color: isDark(accent) ? '#fff' : '#000', lineHeight: 1 }}>
              {initial}
            </span>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 50px', background: bg }}>
            <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: '3rem', color: textColor, lineHeight: 1.1, marginBottom: 16 }}>{businessName || 'Brand'}</div>
            <div style={{ fontSize: '0.9rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: subColor }}>{tagline}</div>
          </div>
        </>
      ) : (
        <>
          {layout.logoType === 'lettermark' || layout.logoType === 'badge-wordmark' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginBottom: 20 }}>
              <div style={{ width: 80, height: 80, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: `'${displayFont}', serif`, fontSize: '2.8rem', fontWeight: 700, color: isDark(accent) ? '#fff' : '#000' }}>{initial}</span>
              </div>
              <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: '3.2rem', color: textColor, lineHeight: 1 }}>{businessName || 'Brand'}</div>
            </div>
          ) : layout.logoType === 'stacked-initial' ? (
            <div style={{ marginBottom: 20, textAlign: layout.heroAlign || 'center' }}>
              <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: '8rem', color: accent, lineHeight: 0.85, fontWeight: 700 }}>{initial}</div>
              <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: '1.8rem', color: textColor, letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: 16 }}>{businessName}</div>
            </div>
          ) : (
            <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: '4.5rem', color: textColor, lineHeight: 1.05, marginBottom: 20, letterSpacing: '-0.02em' }}>
              {words.length > 1 ? (
                <><span style={{ color: accent }}>{words[0]} </span><span>{words.slice(1).join(' ')}</span></>
              ) : (
                <>{businessName?.slice(0, -1)}<span style={{ color: accent }}>{businessName?.slice(-1)}</span></>
              )}
            </div>
          )}
          <div style={{ fontSize: '1rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: subColor }}>{tagline}</div>
        </>
      )}
    </div>
  );
}
