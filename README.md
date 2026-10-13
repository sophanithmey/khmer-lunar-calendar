# ចន្ទខ្មែរ (Chan Khmer) — Khmer Lunar Calendar & Astronomy

A modern, responsive web application combining authentic Cambodian lunar calendar reckoning (**ក្បួនចន្ទគតិ**) with contemporary astronomical science.

---

## 🌟 Features

- **Today's Khmer Lunar Date**: Displays day of waxing (**ខ្នើត**) or waning (**រនោច**), lunar month, Buddhist era (**ព.ស.**), Jolak era (**ច.ស.**), animal year (**ឆ្នាំ**), and sak (**ស័ក**).
- **Interactive Khmer Calendar**: Monthly grid supporting 29-day (**ខែខ្វះ**) and 30-day (**ខែពេញ**) lunar months, month navigation, and date inspection modals.
- **Buddhist Observance Days (ថ្ងៃសីល)**: Automatically detects and highlights the four sacred observance days each month (8th waxing, 15th waxing / Full Moon, 8th waning, and end-of-waning).
- **Realistic Moon & Earth Explorer**: 
  - Isolated 3D Moon and Earth rendering with orbital phase illumination using Three.js and React Three Fiber.
  - Automatic fallback to a lightweight 2D HTML5 Canvas engine for unsupported browsers or reduced-motion preferences.
  - Telemetry: illumination percentage, phase angle, moon age in days, and orbital distance in kilometers via `astronomy-engine`.
- **Gregorian-to-Khmer Converter**: Bidirectional date conversion with instant copy action and error validation.
- **Traditional Festivals**: Searchable and filterable database of official Cambodian national holidays and Buddhist festivals.
- **Cultural Knowledge Base**: Bilingual educational articles detailing Khmer lunar mechanics, waxing/waning cycles, and Buddhist heritage.
- **Bilingual Interface**: Full support for Khmer (**ភាសាខ្មែរ**) and English, with persistent language toggle.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + Vanilla CSS tokens (Cinematic Dark-Space theme)
- **Navigation**: React Router v7
- **Icons**: Lucide React
- **3D Graphics**: Three.js (lazy-loaded with graceful 2D Canvas fallback)
- **Khmer Lunar Calculations**: `@thyrith/momentkh` & `khmer-hybrid-calendar`
- **Astronomical Calculations**: `astronomy-engine`
- **Testing**: Vitest
- **Code Quality**: ESLint + Prettier

---

## 🚀 Setup & Commands

Ensure Node.js 20+ LTS is active:

```bash
# If using NVM
nvm use

# Install dependencies with Yarn
yarn install

# Run automated unit tests
yarn test

# Type-check TypeScript strictly
yarn typecheck

# Run linter
yarn lint

# Format codebase
yarn format

# Build production bundle
yarn build

# Start development server
yarn dev
```

---

## 📐 Architecture & Standards

- All application files follow strict separation of concerns and kebab-case filenames.
- Every source file adheres to the <= 200 lines limit.
- Astronomical continuous phase calculations are kept strictly decoupled from civil Khmer calendar calculations.
