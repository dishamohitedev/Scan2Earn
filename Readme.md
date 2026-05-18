# Scan2Earn

## Local Shop Loyalty Points dApp on Base Sepolia

A beginner-friendly Web3 loyalty rewards platform where customers earn blockchain-based loyalty points from local shops by scanning QR codes.

Users do NOT need ETH in their wallet.

All blockchain transactions are powered by UGF (Universal Gasless Framework), allowing users to pay gas fees using Mock USD instead of ETH.

---

# Table of Contents

- Project Overview
- Problem Statement
- Solution
- Core Flow
- Features
- Tech Stack
- Architecture
- Folder Structure
- Installation & Setup
- Base Sepolia Setup
- Smart Contracts
- UGF Integration
- Firebase Setup
- QR Code System
- Frontend Pages
- Wallet Connection
- Routing
- Deployment
- Environment Variables
- ABI Setup
- Running Locally
- Demo Flow
- Gasless Transaction Flow
- Security Notes
- Future Scope
- Startup Potential
- Troubleshooting
- Glossary
- Resources
- Hackathon Checklist
- License

---

# Project Overview

Scan2Earn is a Web3 loyalty rewards platform for local businesses.

Shopkeepers can:
- Create stores
- Define loyalty rewards
- Generate QR codes
- Award customer points

Customers can:
- Scan QR codes
- Earn blockchain loyalty points
- Redeem rewards
- Use the app WITHOUT needing ETH

The blockchain transactions are handled gaslessly using UGF.

---

# Problem Statement

Traditional loyalty systems have multiple problems:

- Points are controlled entirely by companies
- Users lose rewards if apps shut down
- No interoperability between shops
- Rewards can expire unfairly
- Customers must install separate apps for every store

Web3 loyalty systems usually fail because:
- Users need ETH
- Gas fees are confusing
- Wallet setup is difficult

---

# Solution

Scan2Earn solves this by creating:

- Blockchain-based loyalty ownership
- QR-code based earning system
- Gasless user experience
- Mock USD gas payments via UGF
- Beginner-friendly UX
- One loyalty wallet for multiple shops

---

# Core Flow

1. Shopkeeper creates a store
2. Shopkeeper defines reward rules
3. QR code gets generated
4. Customer scans QR
5. Smart contract awards loyalty points
6. Customer earns blockchain tokens
7. Customer redeems rewards later
8. UGF handles gas fees invisibly
9. User never needs ETH

---

# Example Reward Rules

- Buy 5 coffees → Get 1 free
- Earn 10 points per purchase
- 100 points → Free haircut
- 50 points → Free dessert

---

# Features

## Shop Dashboard

- Create store
- Define rewards
- View customers
- View analytics
- Generate QR code

## Customer Wallet

- View points
- View rewards
- Redeem rewards
- View reward history

## QR Scan Flow

- Customer scans QR
- Smart contract awards points
- Gasless blockchain transaction
- Instant reward update

## Smart Contracts

- Loyalty points token
- Reward redemption logic
- Store ownership management

## UGF Integration

- Gasless transactions
- Mock USD payments
- No ETH required
- Better UX for non-crypto users

---

# Why This Project Is Strong

- Real business use case
- Easy to explain
- Beginner-friendly
- Non-crypto audience can use it
- Strong startup potential
- Solves actual Web3 onboarding issue

---

# Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React + Vite | UI |
| Styling | Tailwind CSS | Design |
| Blockchain | Base Sepolia | Testnet |
| Smart Contracts | Solidity | Onchain logic |
| Gasless Layer | UGF SDK | ETH-free transactions |
| Wallet | RainbowKit + wagmi | Wallet connection |
| Blockchain Library | ethers.js | Contract interaction |
| QR System | qrcode npm package | QR generation |
| Backend | Firebase | Offchain storage |
| Contract Dev | Hardhat | Deployment/testing |

---

# Architecture

```text
Customer
   ↓
QR Scan
   ↓
React Frontend
   ↓
UGF SDK
   ↓
Base Sepolia Smart Contracts
   ↓
Firebase Database
```

---

# Gasless Transaction Architecture

```text
User clicks button
      ↓
UGF intercepts transaction
      ↓
UGF pays ETH gas fee
      ↓
User pays with Mock USD
      ↓
Transaction gets confirmed
      ↓
User never touches ETH
```

---

# Folder Structure

```text
scan2earn/
│
├── contracts/
│   ├── LoyaltyToken.sol
│   ├── StoreRegistry.sol
│   └── RewardRedemption.sol
│
├── scripts/
│   └── deploy.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── ShopDashboard.jsx
│   │   │   ├── CustomerWallet.jsx
│   │   │   └── ScanQR.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── QRGenerator.jsx
│   │   │   └── WalletConnect.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useContract.js
│   │   │
│   │   ├── utils/
│   │   │   └── ugf.js
│   │   │
│   │   ├── abis/
│   │   │
│   │   ├── firebase.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── hardhat.config.js
├── .env
├── README.md
└── package.json
```

---

# Quick Start

## Clone Project

```bash
git clone <your_repo_url>
cd scan2earn
```

---

# Install Dependencies

## Root

```bash
npm install
```

## Frontend

```bash
cd frontend
npm install
```

---

# Install Main Packages

## Smart Contracts

```bash
npm install --save-dev hardhat
npm install @openzeppelin/contracts
npm install dotenv
```

## Frontend

```bash
npm install tailwindcss
npm install ethers
npm install wagmi viem
npm install @rainbow-me/rainbowkit
npm install firebase
npm install react-router-dom
npm install react-qr-code
npm install qrcode
npm install @tanstack/react-query
```

---

# Base Sepolia Setup

Add this network to MetaMask:

| Setting | Value |
|---|---|
| Network Name | Base Sepolia |
| RPC URL | https://sepolia.base.org |
| Chain ID | 84532 |
| Currency Symbol | ETH |
| Explorer | https://sepolia-explorer.base.org |

---

# Get Test ETH

Use faucets:

- https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
- https://faucet.quicknode.com/base/sepolia

---

# Smart Contracts

---

# LoyaltyToken.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LoyaltyToken is ERC20, Ownable {

    mapping(address => bool) public authorizedShops;

    constructor() ERC20("Scan2Earn Points", "S2E")
    Ownable(msg.sender)
    {}

    function authorizeShop(address shop) external onlyOwner {
        authorizedShops[shop] = true;
    }

    function mintPoints(address customer, uint256 amount) external {
        require(authorizedShops[msg.sender], "Not authorized");

        _mint(customer, amount * 10 ** decimals());
    }

    function redeemPoints(uint256 amount) external {
        _burn(msg.sender, amount * 10 ** decimals());
    }
}
```

---

# StoreRegistry.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StoreRegistry {

    struct Store {
        string name;
        string description;
        uint256 pointsPerPurchase;
        uint256 rewardThreshold;
        string rewardDescription;
        address owner;
        bool isActive;
    }

    mapping(uint256 => Store) public stores;

    uint256 public storeCount;

    event StoreCreated(
        uint256 storeId,
        address owner,
        string name
    );

    function createStore(
        string memory name,
        string memory description,
        uint256 pointsPerPurchase,
        uint256 rewardThreshold,
        string memory rewardDescription
    ) external returns (uint256) {

        uint256 storeId = storeCount++;

        stores[storeId] = Store({
            name: name,
            description: description,
            pointsPerPurchase: pointsPerPurchase,
            rewardThreshold: rewardThreshold,
            rewardDescription: rewardDescription,
            owner: msg.sender,
            isActive: true
        });

        emit StoreCreated(
            storeId,
            msg.sender,
            name
        );

        return storeId;
    }
}
```

---

# Hardhat Config

## hardhat.config.js

```js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",

  networks: {
    baseSepolia: {
      url: "https://sepolia.base.org",
      chainId: 84532,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
```

---

# Deployment Script

## scripts/deploy.js

```js
const hre = require("hardhat");

async function main() {

  console.log("Deploying contracts...");

  const LoyaltyToken =
    await hre.ethers.getContractFactory(
      "LoyaltyToken"
    );

  const loyaltyToken =
    await LoyaltyToken.deploy();

  await loyaltyToken.waitForDeployment();

  console.log(
    "LoyaltyToken deployed:",
    await loyaltyToken.getAddress()
  );

  const StoreRegistry =
    await hre.ethers.getContractFactory(
      "StoreRegistry"
    );

  const storeRegistry =
    await StoreRegistry.deploy();

  await storeRegistry.waitForDeployment();

  console.log(
    "StoreRegistry deployed:",
    await storeRegistry.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

---

# Compile Contracts

```bash
npx hardhat compile
```

---

# Export ABI Files

Copy ABI JSON files from:

```text
artifacts/contracts/
```

to:

```text
frontend/src/abis/
```

---

# Deploy Contracts

```bash
npx hardhat run scripts/deploy.js --network baseSepolia
```

---

# UGF Integration

## What Is UGF?

UGF = Universal Gasless Framework.

It allows users to perform blockchain transactions WITHOUT needing ETH.

Instead:
- UGF handles ETH gas
- User pays using Mock USD
- Transactions feel Web2-like

---

# Important Note

UGF APIs may differ depending on hackathon SDK versions.

The implementation below is conceptual and should be adjusted according to official UGF documentation provided during the hackathon.

---

# frontend/src/utils/ugf.js

```js
import { ugfSdk } from "@ugf/sdk";

export const ugf = ugfSdk.init({
  chainId: 84532,
  projectId: import.meta.env.VITE_UGF_PROJECT_ID,
  paymentToken: "MOCK_USD",
});

export async function sendGasless(
  contract,
  method,
  params
) {

  try {

    const tx =
      await ugf.executeGasless({
        contract: contract.address,
        abi: contract.interface,
        method,
        params,
      });

    await tx.wait();

    return tx;

  } catch (error) {

    console.error(error);
    throw error;
  }
}
```

---

# Firebase Setup

Go to:

https://console.firebase.google.com

Steps:
1. Create project
2. Add Web App
3. Enable Firestore
4. Copy config

---

# frontend/src/firebase.js

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
```

---

# QR Code System

## Install

```bash
npm install react-qr-code
npm install qrcode
```

---

# QRGenerator.jsx

```jsx
import QRCode from "react-qr-code";

function QRGenerator({ storeId }) {

  const scanUrl =
    `https://scan2earn.app/scan?storeId=${storeId}`;

  return (
    <QRCode
      value={scanUrl}
      size={200}
    />
  );
}

export default QRGenerator;
```

---

# Customer Identity Flow

Customer identity comes from the connected wallet address.

Example:

```js
const { address } = useAccount();
```

This wallet address becomes:
- loyalty account
- reward ownership account
- blockchain identity

No usernames/passwords needed.

---

# Wallet Connection

## main.jsx

```jsx
import React from "react";
import ReactDOM from "react-dom/client";

import {
  WagmiProvider
} from "wagmi";

import {
  RainbowKitProvider,
  getDefaultConfig
} from "@rainbow-me/rainbowkit";

import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

import { baseSepolia } from "wagmi/chains";

import "@rainbow-me/rainbowkit/styles.css";

import App from "./App";

const config = getDefaultConfig({
  appName: "Scan2Earn",
  projectId:
    import.meta.env
      .VITE_WALLETCONNECT_PROJECT_ID,
  chains: [baseSepolia],
});

const queryClient = new QueryClient();

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <App />
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
```

---

# Frontend Routing

## App.jsx

```jsx
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import ShopDashboard from "./pages/ShopDashboard";
import CustomerWallet from "./pages/CustomerWallet";
import ScanQR from "./pages/ScanQR";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/dashboard"
          element={<ShopDashboard />}
        />

        <Route
          path="/wallet"
          element={<CustomerWallet />}
        />

        <Route
          path="/scan"
          element={<ScanQR />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
```

---

# ScanQR.jsx

```jsx
import { useSearchParams } from "react-router-dom";

function ScanQR() {

  const [searchParams] =
    useSearchParams();

  const storeId =
    searchParams.get("storeId");

  return (
    <div>
      Store ID: {storeId}
    </div>
  );
}

export default ScanQR;
```

---

# Environment Variables

## frontend/.env.local

```env
VITE_LOYALTY_TOKEN_ADDRESS=0x...
VITE_STORE_REGISTRY_ADDRESS=0x...

VITE_WALLETCONNECT_PROJECT_ID=your_project_id

VITE_UGF_PROJECT_ID=your_ugf_project_id

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

---

# Running Locally

## Start Local Blockchain

```bash
npx hardhat node
```

---

## Deploy Contracts

```bash
npx hardhat run scripts/deploy.js --network localhost
```

---

## Start Frontend

```bash
cd frontend
npm run dev
```

---

# Demo Flow

1. Shopkeeper creates store
2. QR code appears
3. Customer scans QR
4. Points minted
5. Customer sees points
6. Customer redeems reward
7. UGF handles gas invisibly

---

# Demo Talking Points

- “Users never need ETH”
- “Gas handled using Mock USD”
- “Blockchain loyalty without crypto complexity”
- “One wallet for loyalty everywhere”
- “Like Paytm rewards, but decentralized”

---

# Security Notes

- Never expose private keys
- Never commit `.env`
- Add `.env` to `.gitignore`
- Validate QR inputs
- Prevent QR spam abuse
- Use Base Sepolia only
- Never use production funds

---

# Future Scope

- NFT loyalty badges
- Multi-store reward marketplace
- GPS-based scan verification
- Analytics dashboard
- WhatsApp integration
- AI-powered reward recommendations
- Cross-shop loyalty ecosystem

---

# Startup Potential

Scan2Earn could evolve into:

- decentralized Paytm rewards
- loyalty infrastructure for local businesses
- interoperable loyalty ecosystem
- Web3 commerce platform

---

# Screenshots

## Shop Dashboard

(Add screenshot here)

---

## Customer Wallet

(Add screenshot here)

---

## QR Scan Flow

(Add screenshot here)

---

# Deployed Contracts

## Base Sepolia

LoyaltyToken:
```text
PASTE_ADDRESS_HERE
```

StoreRegistry:
```text
PASTE_ADDRESS_HERE
```

---

# Demo Wallets

## Shopkeeper Wallet

```text
PASTE_WALLET
```

## Customer Wallet

```text
PASTE_WALLET
```

---

# Troubleshooting

| Problem | Solution |
|---|---|
| Wrong network | Switch to Base Sepolia |
| Transaction failed | Get test ETH |
| Wallet not connecting | Verify WalletConnect Project ID |
| Firebase error | Check Firestore rules |
| QR not working | Check URL |
| ABI issue | Re-copy ABI files |

---

# Glossary

| Term | Meaning |
|---|---|
| Blockchain | Shared digital ledger |
| Smart Contract | Blockchain program |
| Gas Fee | Transaction fee |
| ERC20 | Fungible token standard |
| Wallet | Crypto account |
| Mint | Create tokens |
| Burn | Destroy tokens |
| Base Sepolia | Test blockchain |
| UGF | Gasless transaction framework |

---

# Useful Resources

## Base

https://base.org

## Base Explorer

https://sepolia-explorer.base.org

## Hardhat

https://hardhat.org

## RainbowKit

https://www.rainbowkit.com

## wagmi

https://wagmi.sh

## Firebase

https://firebase.google.com

## Solidity

https://soliditylang.org

---

# Hackathon Checklist

- [ ] Contracts deployed
- [ ] UGF integrated
- [ ] QR system working
- [ ] Wallet connection working
- [ ] Reward redemption working
- [ ] Firebase connected
- [ ] Frontend deployed
- [ ] Demo video recorded
- [ ] README completed
- [ ] GitHub repo uploaded

---

# Why Judges Will Like This

- Real-world use case
- Solves Web3 onboarding
- Gasless UX
- Easy demo flow
- Strong startup potential
- Beginner-friendly product

---

# License

MIT License

---

# Final Note

Scan2Earn demonstrates how blockchain can be invisible to normal users.

Customers simply:
- scan
- earn
- redeem

while UGF handles all blockchain complexity behind the scenes.

This creates a Web2-like experience powered by Web3 infrastructure.