# PolyDash 📊

A clean, minimal dashboard for viewing Polymarket markets with high probability outcomes. Built with Apple-inspired neumorphic design in white, cyan, and orange.

## Features

- **Real-time Market Data**: Fetches live data from Polymarket's Gamma API
- **Probability Filtering**: View markets in three ranges:
  - 90-99.9% (Extreme Confidence)
  - 80-90% (Very High)
  - 70-80% (High)
- **Neumorphic Design**: Soft, organic UI with subtle shadows and depth
- **Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Clean Interface**: Minimal, Apple-inspired design philosophy

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS with custom neumorphic components
- **API Client**: Axios
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Design System

### Colors
- **Primary Cyan**: `#06B6D4` - Main accent for highlights
- **Primary Orange**: `#FB923C` - Secondary accent for emphasis
- **Background**: `#FAFAFA` - Clean, light base

### Components
- **Neumorphic Cards**: Soft shadows creating depth without borders
- **Neumorphic Buttons**: Interactive elements with subtle shadow effects
- **Neumorphic Inputs**: Form elements with inset shadows

## API Integration

Uses Polymarket's Gamma API:
- Endpoint: `https://gamma-api.polymarket.com/markets`
- Fetches market data including prices, volume, and outcomes

## License

MIT
