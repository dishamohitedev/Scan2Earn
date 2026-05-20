# Scan2Earn

**Web3 Loyalty Rewards for Local Shops — No ETH Required**

Scan2Earn is a QR-based loyalty points platform for local businesses. Shopkeepers generate a QR code for their store; customers scan it to earn points and redeem rewards. The app is built as a pure-HTML frontend with Firebase for auth and data storage — no bundler, no Node server, no wallet required.

---

## Table of Contents

- [Overview](#overview)
- [Problem & Solution](#problem--solution)
- [Core User Flow](#core-user-flow)
- [Pages & Features](#pages--features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Firebase Setup](#firebase-setup)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Demo Flow](#demo-flow)
- [Security Notes](#security-notes)
- [Future Scope](#future-scope)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Overview

| Role | What they do |
|---|---|
| **Shopkeeper** | Sign in → set store name & rewards → share QR code → track customer points |
| **Customer** | Sign in → scan QR → earn points → redeem rewards → view history |

Points live in Firebase Firestore. The gasless / blockchain layer is a planned upgrade; the current build is a fully functional Web2 demo with Web3 aesthetics and UX.

---

## Problem & Solution

**Traditional loyalty programs:**
- Points are siloed per brand and expire arbitrarily
- Separate app per store
- Users lose rewards if a shop closes

**Web3 loyalty usually fails because:**
- Users need ETH and a wallet
- Gas fees confuse non-crypto users

**Scan2Earn's approach:**
- One account works across all participating stores
- No crypto knowledge needed — sign in with Google
- Points tracked on Firebase today, migratable to Base Sepolia later
- Gasless architecture planned via UGF (Universal Gasless Framework)

---

## Core User Flow

```
Landing page (index.html)
        ↓
  Choose role → Login (login.html)
        ↓
  Google OAuth via Firebase Auth
        ↓
  ┌─────────────────┬──────────────────┐
  │  Shopkeeper     │    Customer      │
  │  (shopkeeper    │  (customer.html) │
  │   .html)        │                  │
  │                 │                  │
  │ • Set store     │ • View points    │
  │ • Define        │ • Scan QR        │
  │   rewards       │   (scan.html)    │
  │ • View          │ • Redeem         │
  │   customers     │   rewards        │
  │ • Show QR code  │ • View history   │
  └─────────────────┴──────────────────┘
```

---

## Pages & Features

### `index.html` — Landing Page
- Hero section with product pitch
- Role selector (Shopkeeper / Customer) stored in `localStorage`
- Dark mode toggle (persisted in `localStorage`)
- Animated points card demo

### `login.html` — Authentication
- Role toggle: Shopkeeper or Customer
- **Google OAuth** via Firebase Auth (compat SDK v9)
- New shopkeeper → modal prompts for store name
- Returning user → role data merged into existing Firestore doc
- Redirects to `shopkeeper.html` or `customer.html` based on role
- Toast notifications for errors and success

### `shopkeeper.html` — Shop Dashboard
- View store name, QR code, and reward rules
- Set points per purchase and reward thresholds
- View list of customers and their point balances
- Analytics summary

### `customer.html` — Customer Wallet
- Display total points balance
- Show available rewards and redemption thresholds
- Transaction history
- Link to scan page

### `scan.html` — QR Scanner
- Simulated QR scan (paste URL or use demo button)
- Awards points from "Green Bean Coffee" demo store
- Updates `localStorage` balance and history
- Redirects to wallet on success

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML, Tailwind CSS (CDN), Font Awesome |
| Fonts | Inter via Google Fonts |
| Auth | Firebase Authentication (Google OAuth) |
| Database | Firebase Firestore |
| Firebase SDK | Firebase compat v9 (CDN, no bundler) |
| Config module | `firebase-config.js` (ES module, Firebase v10 CDN) |
| State | `localStorage` for session/UI preferences |
| Package manager | npm (only `firebase` package listed; unused in prod) |

> **No bundler.** All pages load Firebase directly from `gstatic.com` CDN. The `package.json` lists `firebase ^10.14.1` but the HTML files use the compat CDN builds — no build step is required.

---

## Project Structure

```
scan2earn/
├── index.html           # Landing / marketing page
├── login.html           # Auth page (Google sign-in, role selection)
├── shopkeeper.html      # Shopkeeper dashboard
├── customer.html        # Customer wallet
├── scan.html            # QR scan simulator
├── firebase-config.js   # Firebase init (ES module, v10 CDN)
├── package.json         # Lists firebase dependency
├── package-lock.json
├── .env                 # Firebase credentials (never commit)
├── .gitignore
└── README.md
```

---

## Firebase Setup

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Create a project (e.g. `scan2earn-771b6`)
3. Add a **Web App** and copy the config object
4. Enable **Authentication** → Sign-in method → **Google**
5. Enable **Firestore Database** → start in test mode

### Firestore Data Model

```
users/
  {uid}/
    uid: string
    email: string
    name: string
    type: "shopkeeper" | "customer"
    walletAddress: string          # randomly generated mock address
    createdAt: ISO string
    roles:
      shopkeeper:
        storeName: string
        pointsPerPurchase: number
        rewards: [{ name, points }]
        totalPoints: number
        customers: []
      customer:
        totalPoints: number
        history: [{ action, date, points }]
```

---

## Environment Variables

Copy `.env` and fill in your Firebase project values. These are used for reference — the actual credentials are hardcoded in `firebase-config.js` for the CDN module pattern. **Replace with your own project values before deploying.**

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

> ⚠️ Never commit real credentials. Add `.env` and `firebase-config.js` (if it contains keys) to `.gitignore`.

---

## Running Locally

No build step needed. Just serve the files with any static server:

```bash
# Option 1 — VS Code Live Server extension
# Right-click index.html → Open with Live Server

# Option 2 — Python
python3 -m http.server 8080

# Option 3 — npx serve
npx serve .
```

Then open `http://localhost:8080` in your browser.

> `firebase-config.js` uses ES module `import` syntax, so the page must be served over HTTP (not opened as `file://`).

---

## Demo Flow

1. Open `index.html`
2. Click **"I'm a shopkeeper"** → lands on `login.html` with Shopkeeper pre-selected
3. Click **Continue with Google** → enter store name in the modal
4. Redirected to `shopkeeper.html` — see store QR and reward rules
5. Open a new tab → go to `login.html`, select **Customer**, sign in
6. Redirected to `customer.html` — wallet shows 0 points
7. Click **Scan QR** → `scan.html` opens
8. Click **"Scan Demo Store"** → earns 10 points from Green Bean Coffee
9. Click **Go to Wallet** → points balance updated

---

## Security Notes

- Do **not** commit `.env` or expose API keys in public repos
- Current Firestore rules are in **test mode** — lock them down before any public launch:

```js
// Firestore rules — recommended minimum
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

- The QR scan page currently has no server-side rate limiting — add abuse prevention before production use
- Mock wallet addresses are randomly generated strings, not real blockchain addresses

---

## Future Scope

- **Real QR scanning** via camera (e.g. `html5-qrcode` library)
- **Base Sepolia smart contracts** — migrate points to `LoyaltyToken.sol` (ERC-20)
- **Gasless transactions** via UGF (Universal Gasless Framework) so users never need ETH
- **NFT loyalty badges** for milestone rewards
- **Multi-store wallet** — one customer account, points across shops
- **Analytics dashboard** for shopkeepers
- **WhatsApp / SMS notifications** on point milestones
- **GPS verification** to prevent fake scans

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Blank page / module error | Serve via HTTP, not `file://` |
| Google sign-in popup blocked | Allow popups for localhost in browser settings |
| `auth/unauthorized-domain` error | Add your domain to Firebase Auth → Authorized domains |
| Firestore permission denied | Check Firestore rules; ensure user is authenticated |
| Points not saving | Check browser console; Firestore write may have failed |
| Dark mode not persisting | `localStorage` must be enabled in browser |

---

## License

MIT License — free to use, modify, and distribute.

---

*Scan2Earn demonstrates how a Web3-ready loyalty product can be shipped with zero crypto complexity for end users — scan, earn, redeem.*