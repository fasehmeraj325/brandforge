const mongoose = require('mongoose');

const brandKitSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, index: true },
  businessName: { type: String, required: true },
  industry: String,
  tagline: String,
  styleDirection: String,
  personality: String,
  concepts: [
    {
      id: String,
      name: String,          // "Concept A"
      palette: {
        colors: [String],    // hex values
        names: [String],     // "Midnight", "Gold" etc
      },
      typography: {
        display: String,
        body: String,
        displayStack: String,
        bodyStack: String,
      },
      logoMark: String,      // SVG string
      tagline: String,
      personality: String,
      moodWords: [String],
    }
  ],
  selectedConcept: { type: String, default: null },
  downloaded: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 7 } // auto-delete after 7 days
});

module.exports = mongoose.model('BrandKit', brandKitSchema);
