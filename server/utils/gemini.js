const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function generateBrandConcepts({ businessName, industry, tagline, styleDirection, personality }) {
  const randomSeed = Math.floor(Math.random() * 100000);
  const timestamp = Date.now();
  const colorFamilies = ['blues & teals', 'reds & oranges', 'greens & earth', 'purples & magentas', 'monochrome', 'yellows & golds', 'pinks & corals', 'deep darks'];
  const shuffled = colorFamilies.sort(() => Math.random() - 0.5).slice(0, 4);

  const prompt = `You are a world-class brand identity designer AND UI layout designer. Generate exactly 4 COMPLETELY DIFFERENT brand concepts for the following business. Each concept must have unique colors, fonts, AND a unique card layout definition.

Business Details:
- Name: "${businessName}"
- Industry: "${industry || 'General Business'}"
- Tagline hint: "${tagline || 'none'}"
- Style direction: "${styleDirection || 'Modern'}"
- Personality notes: "${personality || 'professional and trustworthy'}"
- Random seed: ${randomSeed}
- Timestamp: ${timestamp}
- Assign these color families to each concept in order: ${shuffled.join(', ')}

LAYOUT RULES — each concept gets its own layout object. Choose values creatively and differently for each concept:
- heroAlign: "center" | "left" | "right"
- heroStyle: "solid" | "gradient" | "split-panel" | "outlined"
- logoType: "wordmark" | "lettermark" | "badge-wordmark" | "stacked-initial"
- accentBar: "none" | "top" | "bottom" | "left"
- paletteDisplay: "strip" | "tall-blocks" | "dot-row" | "none"
- nameSplit: true (accent color on first word) | false (accent on last letter)
- heroHeight: "compact" | "medium" | "tall"
- taglinePosition: "below-name" | "above-name" | "bottom-of-hero"

CRITICAL RULES:
1. Each concept must be VISUALLY DISTINCT — different mood, color family, font pairing, AND layout
2. Colors must be real hex codes that work beautifully together
3. Font names must be real Google Fonts
4. Taglines should be punchy, memorable, 3-7 words
5. Every generation must feel completely fresh — never repeat the same palette or layout combo
6. Respect the style direction: "${styleDirection}" should influence all 4 concepts

Return ONLY valid JSON, no markdown, no explanation:
{
  "concepts": [
    {
      "id": "concept-a",
      "name": "Concept A",
      "theme": "one word theme",
      "palette": {
        "colors": ["#hex1", "#hex2", "#hex3", "#hex4"],
        "names": ["Name1", "Name2", "Name3", "Name4"],
        "background": "#hex1",
        "primary": "#hex2",
        "accent": "#hex3",
        "neutral": "#hex4"
      },
      "typography": {
        "display": "Google Font Name",
        "body": "Google Font Name",
        "displayWeight": "700",
        "bodyWeight": "400"
      },
      "layout": {
        "heroAlign": "center",
        "heroStyle": "solid",
        "logoType": "wordmark",
        "accentBar": "top",
        "paletteDisplay": "strip",
        "nameSplit": false,
        "heroHeight": "medium",
        "taglinePosition": "below-name"
      },
      "tagline": "Punchy tagline here",
      "personality": "2-sentence brand personality.",
      "moodWords": ["word1", "word2", "word3"],
      "logoAccentColor": "#hex from palette"
    },
    { "id": "concept-b", "name": "Concept B" },
    { "id": "concept-c", "name": "Concept C" },
    { "id": "concept-d", "name": "Concept D" }
  ]
}`;

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 1.2,
    max_tokens: 3000,
  });

  const text = completion.choices[0].message.content;
  const clean = text.replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(clean);

  if (!parsed.concepts || parsed.concepts.length < 4) {
    throw new Error('AI returned incomplete concepts');
  }

  return parsed.concepts;
}

function generateFallbackConcepts({ businessName, tagline }) {
  const name = businessName || 'YourBrand';

  const themes = [
    {
      theme: 'Luxurious', colors: ['#0d0d0d','#c9a84c','#f4f0e8','#8a6e2f'],
      names: ['Noir','Gold','Ivory','Bronze'], display: 'Playfair Display', body: 'DM Sans',
      tagline: `${name} — Where Excellence Meets Design`, personality: 'Premium and refined.',
      moodWords: ['Elegant','Timeless','Refined'],
      layout: { heroAlign: 'center', heroStyle: 'solid', logoType: 'wordmark', accentBar: 'none', paletteDisplay: 'strip', nameSplit: false, heroHeight: 'tall', taglinePosition: 'below-name' }
    },
    {
      theme: 'Minimal', colors: ['#1a1a1a','#f5f5f5','#e8e8e8','#999999'],
      names: ['Ink','Snow','Mist','Stone'], display: 'Libre Baskerville', body: 'DM Sans',
      tagline: `Less noise. More ${name}.`, personality: 'Clean and purposeful.',
      moodWords: ['Clean','Pure','Focused'],
      layout: { heroAlign: 'left', heroStyle: 'outlined', logoType: 'badge-wordmark', accentBar: 'left', paletteDisplay: 'dot-row', nameSplit: false, heroHeight: 'compact', taglinePosition: 'bottom-of-hero' }
    },
    {
      theme: 'Bold', colors: ['#e63946','#1d3557','#f1faee','#457b9d'],
      names: ['Crimson','Navy','Mist','Steel'], display: 'Lora', body: 'Raleway',
      tagline: `${name}. Unapologetically bold.`, personality: 'Energetic and confident.',
      moodWords: ['Bold','Dynamic','Fearless'],
      layout: { heroAlign: 'left', heroStyle: 'split-panel', logoType: 'stacked-initial', accentBar: 'top', paletteDisplay: 'tall-blocks', nameSplit: true, heroHeight: 'medium', taglinePosition: 'above-name' }
    },
    {
      theme: 'Natural', colors: ['#344e41','#a3b18a','#dad7cd','#588157'],
      names: ['Forest','Sage','Mist','Fern'], display: 'Lora', body: 'DM Sans',
      tagline: `Rooted in purpose. Built by ${name}.`, personality: 'Organic and grounded.',
      moodWords: ['Natural','Warm','Earthy'],
      layout: { heroAlign: 'center', heroStyle: 'gradient', logoType: 'lettermark', accentBar: 'bottom', paletteDisplay: 'strip', nameSplit: true, heroHeight: 'medium', taglinePosition: 'below-name' }
    }
  ];

  return themes.map((t, i) => ({
    id: `concept-${['a','b','c','d'][i]}`,
    name: `Concept ${['A','B','C','D'][i]}`,
    theme: t.theme,
    palette: { colors: t.colors, names: t.names, background: t.colors[0], primary: t.colors[1], accent: t.colors[2], neutral: t.colors[3] },
    typography: { display: t.display, body: t.body, displayWeight: '700', bodyWeight: '400' },
    layout: t.layout,
    tagline: t.tagline,
    personality: t.personality,
    moodWords: t.moodWords,
    logoAccentColor: t.colors[1]
  }));
}

module.exports = { generateBrandConcepts, generateFallbackConcepts };
