# 🐉 The Dragon Dispatch

> An immersive, modern editorial news portal & AI-powered newsletter platform built with **Next.js 14 App Router**, **Tailwind CSS**, **MongoDB Atlas**, **Groq AI**, **Stripe**, **Resend**, and **Pusher**.

[![Live Production](https://img.shields.io/badge/Live_Showcase-Vercel-black?style=for-the-badge&logo=vercel)](https://dragon-news-next-psi.vercel.app)
[![Next.js 14](https://img.shields.io/badge/Next.js_14-App_Router-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React 18](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Groq AI](https://img.shields.io/badge/Groq_AI-Qwen_3.8B-F05032?style=for-the-badge)](https://groq.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![Resend](https://img.shields.io/badge/Resend-Email_API-000000?style=for-the-badge&logo=resend&logoColor=white)](https://resend.com/)
[![Pusher](https://img.shields.io/badge/Pusher-WebSockets-300D4F?style=for-the-badge&logo=pusher&logoColor=white)](https://pusher.com/)

---

## 🌐 Live Showcase & Demo

- **Live Production URL:** [https://dragon-news-next-psi.vercel.app](https://dragon-news-next-psi.vercel.app)
- **GitHub Repository:** [https://github.com/islamrakibul9274/dragon-news-auth](https://github.com/islamrakibul9274/dragon-news-auth)

---

## 📖 Project Overview

Originally an outdated Vite + React starter, **The Dragon Dispatch** was completely rebuilt into a modern, magazine-grade publication and interactive digital newsletter.

It combines the timeless elegance of classic print journalism with cutting-edge web engineering: instant AI article summarization, real-time breaking news loops, Stripe-powered reader subscriptions, automated welcome newsletters delivered via Resend, and live WebSocket comments.

---

## ✨ Key Features

### 🗞️ Modern Editorial Interface
- **White Luxury Masthead:** High-contrast typography, live issue edition badge, and dynamic publication dates.
- **Breaking News Marquee Ticker:** Seamless, gap-free looping ticker built with `react-fast-marquee` showcasing live headlines with automatic fallbacks.
- **Full-Bleed Hero Featured Lead:** Magazine-style cover story with balanced contrast overlay, allowing the photography to shine through while keeping typography razor-sharp.
- **Categorized News Grid:** Live category filtering across Global Tech, Breaking Politics, International Affairs, Culture, and Science.

### ⚡ AI-Powered Newsroom (Groq LLM)
- **⚡ AI 30-Second Bulleted Briefings:** One-click drawer that analyzes any dispatch into an executive summary, key takeaways, and "Why It Matters".
- **🤖 In-Article AI Assistant Drawer:** Ask contextual questions directly about any article and receive instant answers.
- **🌅 AI Morning Digest:** Automatically curates and synthesizes today's top stories into a unified morning brief.
- **✍️ AI Newsletter Builder Studio (`/studio`):** Interactive creator workstation to generate and draft multi-section email dispatches.

### 📬 Automated Newsletter Subscriptions (Resend)
- **Instant Reader Subscriptions:** Subscribers are saved directly to MongoDB Atlas.
- **Automated Welcome Dispatch:** Dispatches a branded HTML welcome issue straight to the subscriber's email inbox using the Resend API.

### 💳 Dragon Insider VIP Membership (Stripe)
- **Tiered Reader Memberships (`/pricing`):** Monthly and Annual Pro tiers.
- **Stripe Checkout Session Integration:** Seamless redirects to secure Stripe checkout flows for subscriber upgrades.

### 💬 Real-Time Live Community Discussions (MongoDB + Pusher)
- **Live WebSocket Broadcasting:** When a reader posts a comment on an article, Pusher broadcasts the new comment instantly to all connected readers without page reloads.
- **Persistent Storage:** Comments stored reliably in MongoDB Atlas collections.

### 🔐 Resilient Dual-Mode Authentication (Firebase & Instant Sandbox)
- **Full Firebase Auth Support:** Seamlessly integrates with Google Firebase Email/Password, Google OAuth, and GitHub OAuth when credentials are provided.
- **Zero-Friction Sandbox Fallback:** Automatically provides an instant authenticated sandbox session if Firebase credentials are unset or invalid, ensuring smooth local and preview testing without blocking authentication errors.
- **Active Reader Sidebar Badge:** Displays user avatar, full name, email, and 1-click Sign Out.

### 👓 Elevated Reader Experience
- **In-Article Font Sizing:** Small, Normal, Large, and Extra-Large typography toggles.
- **Audio Read-Aloud (TTS):** Browser Web Speech API reader for hands-free listening.
- **Saved Bookmarks Drawer:** Save any dispatch for offline reading across sessions.
- **Interactive Search (`⌘K`):** Global search modal to quickly jump between articles and categories.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 14 (App Router, Server Components & Route Handlers) |
| **Language** | Modern JavaScript (ESNext, React 18) |
| **Styling** | Tailwind CSS + DaisyUI |
| **Database** | MongoDB Atlas with Mongoose ODM |
| **Artificial Intelligence** | Groq API (`qwen/qwen3.8-27b` & `openai/gpt-oss-20b`) |
| **Email API** | Resend |
| **Payment Processing** | Stripe API |
| **Real-time WebSockets** | Pusher Channels |
| **Authentication** | Firebase Authentication + Local Sandbox Fallback |
| **Icons & Animation** | Lucide React, Canvas Confetti, React Fast Marquee |
| **Deployment** | Vercel Serverless Edge Platform |

---

## 📁 Project Structure

```text
dragon-news-next/
├── src/
│   ├── app/                               # Next.js 14 App Router
│   │   ├── api/
│   │   │   ├── ai/                        # Groq AI summarize, ask, & studio endpoints
│   │   │   ├── checkout/                  # Stripe checkout session handler
│   │   │   ├── comments/                  # MongoDB + Pusher live comments
│   │   │   └── newsletter/subscribe/      # Resend newsletter subscription
│   │   ├── auth/                          # Login & Register views
│   │   ├── category/[id]/                 # Dynamic category news feed
│   │   ├── news/[id]/                     # Dynamic article reader with comments & AI
│   │   ├── pricing/                       # Dragon Insider VIP tiers
│   │   ├── studio/                        # AI Newsletter builder studio
│   │   ├── layout.jsx                     # Root layout with Auth & providers
│   │   └── page.jsx                       # Home edition page
│   ├── components/                        # Reusable UI components
│   │   ├── layout-component/              # LeftNav, RightNav, Editorial sidebars
│   │   ├── ArticleReader.jsx              # Audio TTS, font toggles, reaction pills
│   │   ├── Header.jsx                     # White masthead & live issue bar
│   │   ├── HeroFeatured.jsx               # Full-bleed image overlay lead story
│   │   ├── LatestNews.jsx                 # Infinite breaking news marquee
│   │   ├── MorningDigestAI.jsx            # Groq AI morning digest card
│   │   ├── Navbar.jsx                     # Sticky navigation & search trigger
│   │   ├── NewsletterSubscribe.jsx        # Resend subscription widgets
│   │   └── SocialLogin.jsx                # Active account card & OAuth
│   ├── data/
│   │   └── newsData.js                    # Curated resilient dispatches & fallback
│   ├── firebase/
│   │   └── firebase.config.js             # Dual-mode Firebase client configuration
│   ├── lib/
│   │   ├── mongodb.js                     # Cached Mongoose connection
│   │   └── pusher.js                      # Pusher server & client instances
│   ├── models/                            # Mongoose models (Subscriber, Comment)
│   └── provider/
│       └── AuthProvider.jsx               # Context provider for user state & OAuth
├── public/                                # Static assets and images
├── README.md                              # Project documentation
├── tailwind.config.js                     # Tailwind configuration
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/islamrakibul9274/dragon-news-auth.git
cd dragon-news-auth
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI="your_mongodb_connection_string"

# AI - Groq
GROQ_API_KEY="your_groq_api_key"

# Email - Resend
RESEND_API_KEY="your_resend_api_key"

# Payments - Stripe
STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"

# Real-Time - Pusher
PUSHER_APP_ID="your_pusher_app_id"
NEXT_PUBLIC_PUSHER_KEY="your_pusher_key"
PUSHER_SECRET="your_pusher_secret"
NEXT_PUBLIC_PUSHER_CLUSTER="mt1"

# App URL
AUTH_SECRET="your_random_auth_secret_key"
AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional: Firebase Cloud Sync (if omitted, instant sandbox auth is used automatically)
NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_firebase_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_firebase_storage_bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_firebase_messaging_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID="your_firebase_app_id"
```

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
```

---

## ☁️ Deployment

The project is optimized for deployment on [Vercel](https://vercel.com):

```bash
npm run build
npx vercel --prod
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
