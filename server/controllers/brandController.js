const { v4: uuidv4 } = require('uuid');
const BrandKit = require('../models/BrandKit');
const Stats = require('../models/Stats');
const { generateBrandConcepts, generateFallbackConcepts } = require('../utils/gemini');

// POST /api/brand/generate
async function generate(req, res) {
  try {
    const { businessName, industry, tagline, styleDirection, personality, sessionId } = req.body;

    if (!businessName || businessName.trim().length < 1) {
      return res.status(400).json({ error: 'Business name is required' });
    }

    const sid = sessionId || uuidv4();

    // Try Gemini AI, fall back gracefully if API key missing or fails
    let concepts;
    try {
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
        throw new Error('No API key configured');
      }
      concepts = await generateBrandConcepts({ businessName, industry, tagline, styleDirection, personality });
    } catch (aiError) {
      console.warn('⚠️  Gemini unavailable, using fallback:', aiError.message);
      concepts = generateFallbackConcepts({ businessName, tagline });
    }

    // Save to MongoDB
    const brandKit = new BrandKit({
      sessionId: sid,
      businessName: businessName.trim(),
      industry, tagline, styleDirection, personality,
      concepts
    });
    await brandKit.save();

    // Increment global stats
    await Stats.findOneAndUpdate(
      {},
      { $inc: { totalGenerations: 1 }, updatedAt: new Date() },
      { upsert: true }
    );

    res.json({ success: true, sessionId: sid, brandKitId: brandKit._id, concepts });

  } catch (err) {
    console.error('Generate error:', err);
    res.status(500).json({ error: 'Generation failed. Please try again.' });
  }
}

// POST /api/brand/select
async function selectConcept(req, res) {
  try {
    const { brandKitId, conceptId } = req.body;
    await BrandKit.findByIdAndUpdate(brandKitId, { selectedConcept: conceptId });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save selection' });
  }
}

// GET /api/brand/:id
async function getKit(req, res) {
  try {
    const kit = await BrandKit.findById(req.params.id);
    if (!kit) return res.status(404).json({ error: 'Brand kit not found' });
    res.json(kit);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch brand kit' });
  }
}

module.exports = { generate, selectConcept, getKit };
