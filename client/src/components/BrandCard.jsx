import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

function isDark(hex = '#000') {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 145;
}

function Logo({ logoType, businessName, displayFont, bg, accent, textColor }) {
  const initial = (businessName || 'B')[0].toUpperCase();
  const words = (businessName || 'Brand').split(' ');

  if (logoType === 'lettermark') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 44, height: 44, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: `'${displayFont}', serif`, fontSize: '1.4rem', color: isDark(accent) ? '#fff' : '#000', fontWeight: 700, lineHeight: 1 }}>{initial}</span>
        </div>
        <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: '1.1rem', color: textColor, lineHeight: 1.1 }}>{businessName || 'Brand'}</div>
      </div>
    );
  }

  if (logoType === 'badge-wordmark') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, border: `2px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: `'${displayFont}', serif`, fontSize: '1rem', color: accent, fontWeight: 700 }}>{initial}</span>
        </div>
        <div>
          <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: '1rem', color: textColor, lineHeight: 1 }}>{businessName || 'Brand'}</div>
          <div style={{ width: '100%', height: 2, background: accent, marginTop: 4 }} />
        </div>
      </div>
    );
  }

  if (logoType === 'stacked-initial') {
    return (
      <div style={{ textAlign: 'inherit' }}>
        <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: '3rem', color: accent, lineHeight: 0.9, fontWeight: 700 }}>{initial}</div>
        <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: '0.9rem', color: textColor, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 4 }}>{businessName || 'Brand'}</div>
      </div>
    );
  }

  // default wordmark — nameSplit handled by parent
  return (
    <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: 'clamp(1.2rem, 3vw, 1.7rem)', color: textColor, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
      {words.length > 1 ? (
        <>
          <span style={{ color: accent }}>{words[0]} </span>
          <span>{words.slice(1).join(' ')}</span>
        </>
      ) : (
        <>
          {businessName?.slice(0, -1) || 'Brand'}
          <span style={{ color: accent }}>{businessName?.slice(-1) || '.'}</span>
        </>
      )}
    </div>
  );
}

function PaletteDisplay({ paletteDisplay, colors, names, accent }) {
  if (paletteDisplay === 'none') return null;

  if (paletteDisplay === 'tall-blocks') {
    return (
      <div style={{ display: 'flex', flexShrink: 0 }}>
        {colors.slice(0, 4).map((c, i) => (
          <div key={i} style={{ flex: 1, background: c, height: 48, display: 'flex', alignItems: 'flex-end', padding: '3px 4px' }}>
            <span style={{ fontSize: '0.42rem', color: isDark(c) ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)', letterSpacing: '0.04em', wordBreak: 'break-all' }}>{names[i] || c}</span>
          </div>
        ))}
      </div>
    );
  }

  if (paletteDisplay === 'dot-row') {
    return (
      <div style={{ display: 'flex', gap: 6, padding: '8px 14px', flexShrink: 0, borderTop: '1px solid var(--gray-light)' }}>
        {colors.slice(0, 4).map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: c, border: '1px solid rgba(0,0,0,0.1)' }} />
            <span style={{ fontSize: '0.5rem', color: '#888' }}>{names[i] || c}</span>
          </div>
        ))}
      </div>
    );
  }

  // default strip
  return (
    <div style={{ display: 'flex', height: 20, flexShrink: 0 }}>
      {colors.slice(0, 4).map((c, i) => <div key={i} style={{ flex: 1, background: c }} title={names[i] || c} />)}
    </div>
  );
}

export default function BrandCard({ concept, businessName, index, selected, onSelect, cardRef }) {
  const layout = concept.layout || {};
  const {
    heroAlign = 'center',
    heroStyle = 'solid',
    logoType = 'wordmark',
    accentBar = 'none',
    paletteDisplay = 'strip',
    nameSplit = false,
    heroHeight = 'medium',
    taglinePosition = 'below-name',
  } = layout;

  const bg = concept.palette?.background || '#0d0d0d';
  const accent = concept.palette?.primary || '#c9a84c';
  const neutral = concept.palette?.neutral || '#888';
  const colors = concept.palette?.colors || [bg, accent, '#f4f0e8', neutral];
  const names = concept.palette?.names || [];
  const dark = isDark(bg);
  const textColor = dark ? '#ffffff' : '#0a0a0a';
  const subColor = dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)';
  const displayFont = concept.typography?.display || 'Instrument Serif';
  const bodyFont = concept.typography?.body || 'DM Sans';

  const heroHeightMap = { compact: '90px', medium: '120px', tall: '160px' };
  const heroMinHeight = heroHeightMap[heroHeight] || '120px';

  const heroBg = heroStyle === 'gradient'
    ? `linear-gradient(135deg, ${bg} 55%, ${accent}55)`
    : heroStyle === 'split-panel'
    ? bg
    : bg;

  const heroBorder = heroStyle === 'outlined'
    ? `2px solid ${accent}`
    : 'none';

  const tagline = concept.tagline?.slice(0, 45) || '';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      onClick={() => onSelect(concept.id)}
      style={{
        border: selected ? '2px solid var(--gold)' : '2px solid var(--gray-light)',
        background: 'var(--white)',
        cursor: 'pointer',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: selected ? '0 0 0 4px rgba(201,168,76,0.15)' : 'none',
        borderRadius: '2px',
        display: 'flex',
        flexDirection: 'column',
      }}
      whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
    >
      {/* Selected badge */}
      {selected && (
        <div style={{
          position: 'absolute', top: '0.6rem', right: '0.6rem', zIndex: 3,
          background: 'var(--gold)', color: 'var(--black)',
          fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em',
          padding: '0.2rem 0.5rem', display: 'flex', alignItems: 'center', gap: 3
        }}>
          <Check size={10} /> Selected
        </div>
      )}

      {/* Concept label */}
      <div style={{
        position: 'absolute', top: '0.6rem', left: '0.6rem', zIndex: 3,
        background: 'rgba(0,0,0,0.4)', color: '#fff',
        fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em',
        padding: '0.15rem 0.45rem',
      }}>
        {concept.name}
      </div>

      {/* Accent bar — top */}
      {accentBar === 'top' && <div style={{ height: 5, background: accent, flexShrink: 0 }} />}

      {/* Hero */}
      <div style={{
        background: heroBg,
        border: heroBorder,
        minHeight: heroMinHeight,
        display: 'flex',
        flexDirection: heroStyle === 'split-panel' ? 'row' : 'column',
        alignItems: heroStyle === 'split-panel' ? 'stretch' : heroAlign === 'center' ? 'center' : 'flex-start',
        justifyContent: 'center',
        textAlign: heroAlign,
        padding: heroStyle === 'split-panel' ? '0' : `${heroHeight === 'compact' ? '1.5rem' : '2rem'} 1.5rem`,
        flexShrink: 0,
        position: 'relative',
      }}>
        {/* Left accent bar */}
        {accentBar === 'left' && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: accent }} />}

        {heroStyle === 'split-panel' ? (
          <>
            {/* Color panel */}
            <div style={{ width: '40%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 0.75rem' }}>
              <span style={{ fontFamily: `'${displayFont}', serif`, fontSize: '2rem', fontWeight: 700, color: isDark(accent) ? '#fff' : '#000' }}>
                {(businessName || 'B')[0]}
              </span>
            </div>
            {/* Text panel */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1rem', background: bg }}>
              {taglinePosition === 'above-name' && <div style={{ fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: subColor, marginBottom: 6 }}>{tagline}</div>}
              <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: '1rem', color: textColor, lineHeight: 1.1 }}>{businessName || 'Brand'}</div>
              {taglinePosition !== 'above-name' && <div style={{ fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: subColor, marginTop: 5 }}>{tagline}</div>}
            </div>
          </>
        ) : (
          <>
            {taglinePosition === 'above-name' && (
              <div style={{ fontSize: '0.5rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: subColor, marginBottom: 8 }}>{tagline}</div>
            )}
            <Logo logoType={logoType} businessName={businessName} displayFont={displayFont} bg={bg} accent={accent} textColor={textColor} nameSplit={nameSplit} />
            {taglinePosition === 'below-name' && (
              <div style={{ fontSize: '0.5rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: subColor, marginTop: 8 }}>{tagline}</div>
            )}
          </>
        )}

        {/* Tagline at bottom of hero */}
        {taglinePosition === 'bottom-of-hero' && heroStyle !== 'split-panel' && (
          <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, textAlign: heroAlign, fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: subColor, padding: '0 1rem' }}>{tagline}</div>
        )}
      </div>

      {/* Accent bar — bottom of hero */}
      {accentBar === 'bottom' && <div style={{ height: 4, background: accent, flexShrink: 0 }} />}

      {/* Palette display */}
      <PaletteDisplay paletteDisplay={paletteDisplay} colors={colors} names={names} accent={accent} />

      {/* Info section */}
      <div style={{ padding: '0.9rem 1.25rem', flex: 1 }}>
        <div style={{ fontSize: '0.62rem', color: 'var(--gray)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>
          {concept.theme} Direction
        </div>
        <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: '0.9rem', color: 'var(--black)', marginBottom: 2 }}>{displayFont}</div>
        <div style={{ fontSize: '0.68rem', color: 'var(--gray)', marginBottom: 8 }}>{displayFont} + {bodyFont}</div>

        {/* Color swatches */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
          {colors.slice(0, 4).map((c, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: '0.56rem', color: '#777' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: c, border: '1px solid rgba(0,0,0,0.1)', display: 'inline-block' }} />
              {names[i] || c}
            </span>
          ))}
        </div>

        {/* Mood words */}
        {concept.moodWords?.length > 0 && (
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {concept.moodWords.slice(0, 3).map(w => (
              <span key={w} style={{ fontSize: '0.58rem', padding: '2px 7px', background: 'var(--cream)', color: 'var(--gold-dark)', border: '1px solid var(--gold-light)', letterSpacing: '0.04em' }}>{w}</span>
            ))}
          </div>
        )}
      </div>

      {/* Select button */}
      <button
        onClick={(e) => { e.stopPropagation(); onSelect(concept.id); }}
        style={{
          width: '100%', padding: '0.65rem',
          border: '1px solid var(--black)',
          background: selected ? 'var(--black)' : 'transparent',
          color: selected ? 'var(--white)' : 'var(--black)',
          fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          transition: 'all 0.2s', fontFamily: 'var(--sans)', cursor: 'pointer', flexShrink: 0,
        }}
        onMouseEnter={e => { if (!selected) { e.currentTarget.style.background = 'var(--black)'; e.currentTarget.style.color = 'var(--white)'; } }}
        onMouseLeave={e => { if (!selected) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--black)'; } }}
      >
        {selected ? '✓ This concept selected' : 'Select this concept →'}
      </button>
    </motion.div>
  );
}
