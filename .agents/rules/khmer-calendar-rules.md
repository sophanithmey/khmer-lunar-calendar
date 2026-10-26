# Khmer Lunar Calendar Project Rules

## Key Principles & Conventions

1. **Khmer Language Accuracy**:
   - Translations must be authentic Cambodian terminology, never robotic machine translations.
   - Use correct traditional terms: `ខ្នើត`, `រនោច`, `ពេញបូណ៌មី`, `ដាច់ខែ`, `ថ្ងៃសីល`, `ពុទ្ធសករាជ (ព.ស.)`, `ចុល្លសករាជ (ច.ស.)`.
   - Animal years: `ជូត`, `ឆ្លូវ`, `ខាល`, `ថោះ`, `រោង`, `ម្សាញ់`, `មមី`, `មមែ`, `វក`, `រកា`, `ច`, `កុរ`.
   - Saks: `ឯកស័ក` through `សំរឹទ្ធិស័ក`.
   - Lunar months: `មិគសិរ`, `បុស្ស`, `មាឃ`, `ផល្គុន`, `ចេត្រ`, `ពិសាខ`, `ជេស្ឋ`, `អាសាឍ`, `ស្រាពណ៍`, `ភទ្របទ`, `អស្សុជ`, `កត្តិក` (+ `បឋមាសាឍ`, `ទុតិយាសាឍ`).

2. **Date & Numeral Formatting**:
   - Never rely on browser `toLocaleDateString('km-KH')`. Use `formatSolarDate`, `formatShortSolarDate`, and `toKhmerNumeral` from `src/lib/formatters.ts`.
   - Keep dates mirrored in `src/locales/km.ts` and `src/locales/en.ts`.

3. **UI & Iconography**:
   - Avoid generic `Sparkles` icon. Use contextually meaningful icons: `Compass`, `Landmark`, `Flame`, `Sun`, `Moon`, `Calendar`, etc.
   - Maintain the warm temple gold (`#E8BF70`, `#C59B27`) and deep night sky (`#0B1930`, `#142A4D`) color scheme with responsive card containers.
   - Mobile-first responsiveness across all viewports.

4. **Code Quality**:
   - Always run `npm run typecheck` and `npm test` before concluding tasks.
