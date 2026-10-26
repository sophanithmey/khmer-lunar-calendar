# AGENTS.md — Development Rules for ចន្ទខ្មែរ (Chan Khmer)

This file defines the project guidelines, architecture, and coding rules for Antigravity and AI coding agents working on the **Chan Khmer (Khmer Lunar Calendar & Astronomy)** codebase.

---

## 1. Project Overview & Architecture

Chan Khmer is a bilingual React 19 + TypeScript web application that bridges traditional Cambodian lunar calendar reckoning (**ក្បួនចន្ទគតិខ្មែរ**) with modern astronomical science (**វិទ្យាសាស្ត្រតារាសាស្ត្រ**).

### Tech Stack
- **Framework**: React 19 + Vite + TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + Vanilla CSS tokens
- **Routing**: React Router v7
- **Lunar Calendar Engine**: `@thyrith/momentkh` & `khmer-hybrid-calendar`
- **Astronomical Engine**: `astronomy-engine`
- **3D Graphics**: Three.js & `@react-three/fiber` (with lightweight 2D Canvas fallback)
- **Icons**: `lucide-react`
- **Testing & Quality**: Vitest, ESLint, Prettier

### Directory Structure
```
src/
├── app/               # Application router and providers
├── components/        # Shared presentation & layout components
│   └── layout/        # AppHeader, AppNavigation, Footer, etc.
├── features/          # Feature-based modular architecture
│   ├── cultural-knowledge/   # Articles on Khmer lunar heritage
│   ├── date-converter/       # Gregorian <-> Khmer date converter
│   ├── festivals/            # Cambodian holidays & Buddhist festivals
│   ├── hero/                 # Hero section & daily lunar summary
│   ├── lunar-calendar/       # Monthly lunar grid & day cells
│   ├── lunar-dashboard/      # Quick converter, observance cards
│   └── moon-explorer/        # 3D/2D Moon & Earth phase visualizer
├── hooks/             # Shared React hooks (useLanguage, useTheme, etc.)
├── lib/               # Shared utilities, date helpers, formatters
├── locales/           # km.ts and en.ts dictionary files
├── styles/            # Global CSS, theme variables, glassmorphism
└── types/             # Shared global TypeScript types
```

---

## 2. Khmer Language & Localization Standards (CRITICAL)

### Authentic Khmer Vocabulary (Never Machine-Translated)
All Khmer translations must be culturally authentic, grammatically correct, and use standard Khmer terminology rather than literal/AI translation:
- **Waxing phase**: `ខ្នើត` (e.g. `១កើត`, `៨កើត`, `១៥កើត`)
- **Waning phase**: `រនោច` (e.g. `១រោច`, `៨រោច`)
- **Full Moon**: `ពេញបូណ៌មី` (always `១៥កើត`)
- **New Moon / Dark Moon**: `ដាច់ខែ` (`១៤រោច` សម្រាប់ខែខ្វះ ឬ `១៥រោច` សម្រាប់ខែពេញ)
- **Buddhist Observance Day**: `ថ្ងៃសីល` (8th waxing, 15th waxing, 8th waning, and 14th/15th waning)
- **Buddhist Era**: `ពុទ្ធសករាជ` (abbreviated: `ព.ស.`)
- **Jolak Era**: `ចុល្លសករាជ` (abbreviated: `ច.ស.`)
- **Animal Years (ឆ្នាំទាំង១២)**: `ជូត`, `ឆ្លូវ`, `ខាល`, `ថោះ`, `រោង`, `ម្សាញ់`, `មមី`, `មមែ`, `វក`, `រកា`, `ច`, `កុរ`
- **Saks (ស័កទាំង១០)**: `ឯកស័ក`, `ទោស័ក`, `ត្រីស័ក`, `ចត្វាស័ក`, `បញ្ចស័ក`, `ឆស័ក`, `សប្តស័ក`, `អដ្ឋស័ក`, `នព្វស័ក`, `សំរឹទ្ធិស័ក`
- **Lunar Months (ខែចន្ទគតិ)**: `មិគសិរ`, `បុស្ស`, `មាឃ`, `ផល្គុន`, `ចេត្រ`, `ពិសាខ`, `ជេស្ឋ`, `អាសាឍ`, `ស្រាពណ៍`, `ភទ្របទ`, `អស្សុជ`, `កត្តិក` (+ `បឋមាសាឍ`, `ទុតិយាសាឍ` ក្នុងឆ្នាំអធិកមាស)
- **Solar Months (ខែសុរិយគតិ)**: `មករា`, `កុម្ភៈ`, `មីនា`, `មេសា`, `ឧសភា`, `មិថុនា`, `កក្កដា`, `សីហា`, `កញ្ញា`, `តុលា`, `វិច្ឆិកា`, `ធ្នូ`

### Date Formatting & Khmer Numerals
- **Never use `toLocaleDateString('km-KH')`**: Standard browser `Intl` implementations lack reliable Khmer month names and numerals, often falling back to Latin text (e.g. returning "Oct 26" instead of Khmer).
- **Always use dedicated project formatters** in `src/lib/formatters.ts`:
  - `formatSolarDate(date, language)` -> `ថ្ងៃទី២៦ ខែតុលា ឆ្នាំ២០២៦` (or `26 October 2026`)
  - `formatShortSolarDate(date, language)` -> `ថ្ងៃទី២៦ ខែតុលា` (or `Oct 26`)
  - `toKhmerNumeral(number)` -> converts Arabic digits `0-9` to Khmer numerals `០-៩`.
- Always mirror new string keys in both `src/locales/km.ts` and `src/locales/en.ts`.

---

## 3. Astronomical vs. Civil Calendar Separation

- **Keep calculations decoupled**:
  - **Traditional Civil Calendar**: Computed via `KhmerLunarCalendarService` using traditional Cambodian astronomical rules (Horasart/Krom Samdech Sangharaja Choun Nath rules for adhikamasa leap months and chhabak leap days).
  - **Astronomical Moon Phase**: Computed via `astronomy-engine` for continuous physical phase angle (0° to 360°), orbital distance, and true illumination.
- Acknowledge cultural nuances: True astronomical full moon and civil `១៥កើត` can occasionally differ by ±1 day due to the discrete integer-day nature of the civil lunar calendar.

---

## 4. UI, Styling & Aesthetics

### Color Palette & Theme
- **Primary Theme Tokens**:
  - Temple Gold: `#E8BF70`, `#C59B27`, `#9A7316` (accent, borders, highlights)
  - Night Sky / Deep Slate: `#0B1930`, `#142A4D`, `#1B365D` (dark backgrounds & card surfaces)
  - Light Mode Parchment / Ivory: `#FBF9F5`, `#F4F0E6`, `#EDE8DC` (subtle warm background)
  - Border highlights: `border-[#C59B27]/20`, `border-white/10`
- **Card Design**:
  - Rounded cards (`rounded-2xl` or `rounded-3xl`) with soft borders and subtle shadow.
  - Consistent layout widths across major sections (`max-w-7xl mx-auto px-4 sm:px-6`).

### Iconography Rules
- **DO NOT use generic AI `Sparkles` icons**: The user specifically requested avoiding `Sparkles` icons for cultural/traditional contexts.
- **Use meaningful, culturally resonant icons from `lucide-react`**:
  - Exploration / Navigation: `Compass`
  - Sacred / Cultural / Temples: `Landmark`, `Flame`, `Sun`, `Moon`
  - Calendar / Events: `Calendar`, `CalendarDays`, `Clock`
  - Knowledge / Education: `BookOpen`, `Info`, `Scroll`
  - Astrological / Astronomical: `Globe`, `Orbit`, `Telescope`, `Star`

### Mobile-First Responsiveness
- All components must be tested for and look pristine on mobile viewports (≤ 390px, 640px, 768px):
  - Use responsive grid classes: `grid-cols-1 sm:grid-cols-2 md:grid-cols-4`
  - Calendar grids must support scrolling or compact cell sizing on small screens.
  - Buttons and interactive selectors must have tap-friendly padding (`min-h-[44px]`).

---

## 5. Development Workflow & Commands

Always verify changes with the following commands before completing tasks:

```bash
# Typecheck TypeScript (Strict, 0 errors allowed)
npm run typecheck

# Run automated tests (Vitest)
npm test

# Production build verification
npm run build

# Code formatting
npm run format

# Start local dev server (default port 3000 / 3001)
npm run dev
```

---

## 6. Coding Guidelines & Best Practices

1. **Strict Modular Files**: Prefer concise, single-purpose components (<= 250 lines). If a component grows too large, extract subcomponents or custom hooks.
2. **Explicit TypeScript Types**: Define types under `src/features/<feature>/types/` or `src/types/`. Avoid `any`.
3. **No Unused Code**: Clean up unused imports, dead variables, or debug logging before submitting.
4. **Preserve Documentation & Comments**: Keep existing Khmer and English explanatory comments intact.
