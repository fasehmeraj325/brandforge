# BrandForge AI — MERN Stack SaaS

Full-stack brand kit generator powered by Gemini AI.
**Stack:** React · Node/Express · MongoDB · Gemini AI
**Deploy:** Vercel (frontend) + Render (backend) + MongoDB Atlas (database)

---

## ⚡ LOCAL SETUP (5 minutes)

### Step 1 — Clone & install
```bash
git clone <your-repo>
cd brandforge
npm run install-all
```

### Step 2 — Get your Gemini API key (FREE)
1. Go to → https://aistudio.google.com/app/apikey
2. Click "Create API key"
3. Copy the key

### Step 3 — Set up MongoDB Atlas (FREE)
1. Go to → https://cloud.mongodb.com
2. Create free account → "Build a Database" → M0 Free tier
3. Create a database user (remember username + password)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### Step 4 — Configure environment
```bash
cd server
cp .env.example .env
```
Edit `.env`:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/brandforge
GEMINI_API_KEY=AIzaSy...your_key_here
CLIENT_URL=http://localhost:3000
```

### Step 5 — Run locally
```bash
cd ..          # back to root
npm run dev    # starts both server (5000) + client (3000)
```

Open http://localhost:3000 — you're live! ✅

---

## 🚀 DEPLOY TO PRODUCTION (Free)

### PHASE 1 — Deploy Backend to Render

1. Push your code to GitHub
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/brandforge.git
   git push -u origin main
   ```

2. Go to → https://render.com → Sign up free

3. Click "New +" → "Web Service"

4. Connect your GitHub repo

5. Configure:
   - **Name:** brandforge-api
   - **Root Directory:** server
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

6. Add Environment Variables (in Render dashboard):
   ```
   MONGODB_URI    = (your Atlas connection string)
   GEMINI_API_KEY = (your Gemini key)
   CLIENT_URL     = https://brandforge-ai.vercel.app   ← (set after Vercel step)
   NODE_ENV       = production
   ```

7. Click "Deploy" — wait ~3 minutes

8. Copy your Render URL: `https://brandforge-api.onrender.com`

---

### PHASE 2 — Deploy Frontend to Vercel

1. Go to → https://vercel.com → Sign up free

2. Click "Add New" → "Project" → Import your GitHub repo

3. Configure:
   - **Framework Preset:** Create React App
   - **Root Directory:** client
   - **Build Command:** `npm run build`
   - **Output Directory:** build

4. Add Environment Variable:
   ```
   REACT_APP_API_URL = https://brandforge-api.onrender.com/api
   ```

5. Click "Deploy" — wait ~2 minutes

6. Your site is live at: `https://brandforge-ai.vercel.app` ✅

7. Go back to Render → Update `CLIENT_URL` to your Vercel URL → Redeploy

---

### PHASE 3 — Custom Domain (Optional, ~$12/year)

1. Buy domain from Namecheap or GoDaddy (e.g. brandforge.ai)
2. In Vercel: Settings → Domains → Add your domain
3. Follow Vercel's DNS instructions (takes ~10 min)

---

## 💰 MONETIZATION ROADMAP

### Now (free tier — build users)
- Google AdSense on the generator page (~$0.5–2 per 1000 visits)
- Collect emails → build newsletter → sell later

### Phase 2 (pay to download — $0 cost to start)
- Integrate Stripe: https://stripe.com
- Add to `.env`: `STRIPE_SECRET_KEY=sk_live_...`
- Users pay $9–19 to download clean files
- Takes ~30 min to set up

### Phase 3 (subscription — brand editor)
- Build in-browser editor (color picker, font swapper)
- $9/month subscription via Stripe
- This is your main revenue once you have 500+ users

### Realistic earnings projection:
| Users/month | Conversion | Revenue |
|-------------|------------|---------|
| 500         | 3%         | ~$285   |
| 2,000       | 3%         | ~$1,140 |
| 10,000      | 3%         | ~$5,700 |

---

## 📁 PROJECT STRUCTURE

```
brandforge/
├── package.json          ← root (runs both with concurrently)
├── server/
│   ├── index.js          ← Express entry point
│   ├── routes/
│   │   ├── brand.js      ← /api/brand routes
│   │   └── stats.js      ← /api/stats routes
│   ├── controllers/
│   │   └── brandController.js  ← generation logic
│   ├── models/
│   │   ├── BrandKit.js   ← MongoDB schema
│   │   └── Stats.js      ← stats schema
│   └── utils/
│       └── gemini.js     ← Gemini AI integration + fallback
└── client/
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js
        ├── index.js
        ├── index.css     ← global design tokens
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── BrandCard.jsx       ← one brand concept card
        │   ├── GeneratorForm.jsx   ← the input form
        │   └── LoadingState.jsx    ← animated loading
        ├── pages/
        │   ├── Home.jsx
        │   ├── Generator.jsx   ← main tool page
        │   ├── HowItWorks.jsx
        │   └── Pricing.jsx
        ├── hooks/
        │   └── useGenerator.js ← all generation state logic
        └── utils/
            └── api.js          ← axios wrapper
```

---

## 🛠 ADDING STRIPE PAYMENTS

When ready to charge for downloads:

```bash
cd server && npm install stripe
```

Add to `.env`:
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PRICE_ID=price_...   ← create in Stripe dashboard
```

Create `server/routes/payment.js`:
```js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    success_url: `${process.env.CLIENT_URL}/success?kitId=${req.body.kitId}`,
    cancel_url: `${process.env.CLIENT_URL}/generate`,
  });
  res.json({ url: session.url });
});
```

That's it — Stripe handles the entire payment flow.

---

## ❓ TROUBLESHOOTING

**"AI returned incomplete concepts"**
→ Gemini API key is wrong or over quota. Check https://aistudio.google.com

**"MongoDB connection error"**
→ Check your Atlas IP whitelist: Network Access → Allow 0.0.0.0/0 for all IPs

**CORS errors in production**
→ Make sure CLIENT_URL in Render matches your exact Vercel URL (no trailing slash)

**Render goes to sleep (free tier)**
→ Free Render services sleep after 15 min of inactivity. Use https://cron-job.org to ping /api/health every 10 min to keep it awake.
