import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { generateBrand, selectConcept as selectConceptAPI } from '../utils/api';

const SESSION_KEY = 'bf_session';

export function useGenerator() {
  const [loading, setLoading] = useState(false);
  const [concepts, setConcepts] = useState([]);
  const [brandKitId, setBrandKitId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const getSessionId = () => {
    let sid = localStorage.getItem(SESSION_KEY);
    if (!sid) { sid = crypto.randomUUID(); localStorage.setItem(SESSION_KEY, sid); }
    return sid;
  };

  const generate = useCallback(async (formData) => {
    setLoading(true);
    setSelectedId(null);
    setConcepts([]);

    // Animate loading steps
    const steps = [0, 1, 2, 3];
    steps.forEach((s, i) => setTimeout(() => setLoadingStep(s), i * 700));

    try {
      const { data } = await generateBrand({
        ...formData,
        sessionId: getSessionId()
      });
      setConcepts(data.concepts);
      setBrandKitId(data.brandKitId);
      toast.success('4 brand concepts ready!');
    } catch (err) {
      const msg = err.response?.data?.error || 'Generation failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
      setLoadingStep(0);
    }
  }, []);

  const selectConcept = useCallback(async (conceptId) => {
    setSelectedId(conceptId);
    if (brandKitId) {
      try { await selectConceptAPI({ brandKitId, conceptId }); } catch {}
    }
  }, [brandKitId]);

  return { loading, loadingStep, concepts, brandKitId, selectedId, generate, selectConcept };
}
