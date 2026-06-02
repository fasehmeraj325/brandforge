import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import { useGenerator } from '../hooks/useGenerator';
import GeneratorForm from '../components/GeneratorForm';
import BrandCard from '../components/BrandCard';
import BrandLogoExport from '../components/BrandLogoExport';
import LoadingState from '../components/LoadingState';

export default function Generator() {
  const { loading, loadingStep, concepts, brandKitId, selectedId, generate, selectConcept } = useGenerator();
  const resultsRef = useRef(null);
  const cardRefs = useRef({});
  const exportRef = useRef(null);
  const [lastFormData, setLastFormData] = useState({});
  const [downloading, setDownloading] = useState(false);

  const handleGenerate = async (formData) => {
    setLastFormData(formData);
    await generate(formData);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
  };

  const handleDownload = async () => {
    if (!selectedId) { toast.error('Please select a concept first!'); return; }
    if (!exportRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(exportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });
      const dataUrl = canvas.toDataURL('image/png');
      const filename = `${(lastFormData.businessName || 'brand').replace(/\s+/g, '-').toLowerCase()}-brandkit.png`;

      // Mobile-safe download
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        window.open(dataUrl, '_blank');
        toast.success('Image opened — long-press to save!');
      } else {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = filename;
        a.click();
        toast.success('Brand kit downloaded!');
      }
    } catch (err) {
      toast.error('Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const selectedConcept = concepts.find(c => c.id === selectedId);

  return (
    <main style={{ paddingTop: '64px', minHeight: '100vh' }}>

      {/* PAGE HEADER */}
      <div style={{ background: 'var(--cream)', padding: 'clamp(2.5rem, 6vw, 4rem) 0', borderBottom: '1px solid var(--gray-light)' }}>
        <div className="container">
          <div style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>✦ The Generator</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Create your brand kit
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--gray)', maxWidth: '52ch', lineHeight: 1.7 }}>
            Fill in your details — Gemini AI generates 4 completely unique brand concepts every single time. Pick your favourite, download it free.
          </p>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="container" style={{ padding: 'clamp(2rem, 5vw, 4rem) clamp(1.25rem, 5vw, 2rem)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(280px, 30%, 360px) 1fr',
          gap: 'clamp(1.5rem, 4vw, 3rem)',
          alignItems: 'start'
        }}>

          {/* FORM PANEL */}
          <div style={{
            background: 'var(--white)', border: '1px solid var(--gray-light)',
            padding: 'clamp(1.25rem, 3vw, 2rem)', position: 'sticky', top: '80px'
          }}>
            <GeneratorForm onGenerate={handleGenerate} loading={loading} />
          </div>

          {/* RESULTS PANEL */}
          <div ref={resultsRef}>
            <AnimatePresence mode="wait">

              {/* Placeholder */}
              {!loading && concepts.length === 0 && (
                <motion.div key="placeholder"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{
                    minHeight: '400px', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: '1rem',
                    border: '2px dashed var(--gray-light)', color: 'var(--gray)', textAlign: 'center',
                    padding: '3rem'
                  }}>
                  <div style={{ fontSize: '3rem', opacity: 0.2 }}>◈</div>
                  <div style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--black)' }}>4 unique brand concepts await</div>
                  <p style={{ fontSize: '0.875rem', maxWidth: '28ch', lineHeight: 1.6 }}>
                    Fill in your business details and hit generate — every result is freshly crafted by AI.
                  </p>
                </motion.div>
              )}

              {/* Loading */}
              {loading && (
                <motion.div key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <LoadingState step={loadingStep} />
                </motion.div>
              )}

              {/* Results */}
              {!loading && concepts.length > 0 && (
                <motion.div key="results"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray)' }}>
                      Choose your favourite concept
                    </div>
                    <button
                      onClick={() => document.querySelector('form button[type="submit"]')?.click()}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                        fontSize: '0.75rem', background: 'none', border: '1px solid var(--gray-light)',
                        padding: '0.4rem 0.9rem', color: 'var(--gray)', cursor: 'pointer', transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold-dark)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-light)'; e.currentTarget.style.color = 'var(--gray)'; }}
                    >
                      <RefreshCw size={12} /> Generate new options
                    </button>
                  </div>

                  {/* 4 brand cards grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '1.25rem'
                  }}>
                    {concepts.map((concept, i) => (
                      <BrandCard
                        key={concept.id}
                        concept={concept}
                        businessName={lastFormData.businessName}
                        index={i}
                        selected={selectedId === concept.id}
                        onSelect={selectConcept}
                        cardRef={el => cardRefs.current[concept.id] = el}
                      />
                    ))}
                  </div>

                  {/* Download bar */}
                  <AnimatePresence>
                    {selectedId && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                        style={{
                          marginTop: '1.5rem', background: 'var(--white)', border: '1px solid var(--gray-light)',
                          padding: '1.25rem 1.5rem', display: 'flex',
                          alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap'
                        }}>
                        <div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--black)' }}>
                            {selectedConcept?.name} selected
                            <span style={{ color: 'var(--gold)', marginLeft: '0.5rem' }}>✓</span>
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--gray)', marginTop: '2px' }}>
                            Logo, colors, fonts, style guide — ready to download
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
                          <button
                            onClick={handleDownload}
                            disabled={downloading}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '0.5rem',
                              background: downloading ? 'var(--gray)' : 'var(--black)', color: 'var(--white)', border: 'none',
                              padding: '0.75rem 1.5rem', fontSize: '0.8rem', fontWeight: 500,
                              letterSpacing: '0.08em', textTransform: 'uppercase', cursor: downloading ? 'not-allowed' : 'pointer',
                              transition: 'background 0.2s', fontFamily: 'var(--sans)'
                            }}
                            onMouseEnter={e => { if (!downloading) e.currentTarget.style.background = 'var(--gold-dark)'; }}
                            onMouseLeave={e => { if (!downloading) e.currentTarget.style.background = 'var(--black)'; }}
                          >
                            <Download size={14} /> {downloading ? 'Preparing…' : 'Download Kit — Free'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Hidden clean logo — captured on download */}
      <div style={{ position: 'fixed', top: '-9999px', left: '-9999px', pointerEvents: 'none' }}>
        <div ref={exportRef}>
          <BrandLogoExport concept={selectedConcept} businessName={lastFormData.businessName} />
        </div>
      </div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .container > div > div:first-child { position: static !important; }
          .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
