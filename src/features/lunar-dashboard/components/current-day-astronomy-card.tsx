import { Sparkles, CalendarDays, Moon, Compass } from 'lucide-react';
import type { KhmerDayInfo } from '../../lunar-calendar/types/lunar-date.types';
import type { MoonAstronomyInfo } from '../../moon-explorer/types/astronomy.types';
import { toKhmerNumeral } from '../../lunar-calendar/utils/khmer-numerals';

interface CurrentDayAstronomyCardProps {
  khmerInfo: KhmerDayInfo;
  astroInfo: MoonAstronomyInfo;
}

export function CurrentDayAstronomyCard({
  khmerInfo,
  astroInfo
}: CurrentDayAstronomyCardProps) {
  const isWaxing = khmerInfo.moonPhase === 'waxing';
  const illumPct = astroInfo.illuminationPct;
  const fraction = illumPct / 100;

  // Astrological element based on day of week in traditional Khmer astrology
  const DAY_ELEMENTS_KM: Record<number, { name: string; element: string }> = {
    0: { name: 'ថ្ងៃអាទិត្យ (ព្រះអាទិត្យ)', element: 'ធាតុភ្លើង' },
    1: { name: 'ថ្ងៃច័ន្ទ (ព្រះច័ន្ទ)', element: 'ធាតុទឹក' },
    2: { name: 'ថ្ងៃអង្គារ (ព្រះអង្គារ)', element: 'ធាតុភ្លើង' },
    3: { name: 'ថ្ងៃពុធ (ព្រះពុធ)', element: 'ធាតុទឹក' },
    4: { name: 'ថ្ងៃព្រហស្បតិ៍ (ព្រះព្រហស្បតិ៍)', element: 'ធាតុខ្យល់' },
    5: { name: 'ថ្ងៃសុក្រ (ព្រះសុក្រ)', element: 'ធាតុដី' },
    6: { name: 'ថ្ងៃសៅរ៍ (ព្រះសៅរ៍)', element: 'ធាតុកក' }
  };

  const dayAstrology = DAY_ELEMENTS_KM[khmerInfo.dayOfWeek] ?? {
    name: khmerInfo.dayOfWeekNameKm,
    element: 'ធាតុទឹក'
  };

  const getPhaseReflection = () => {
    if (khmerInfo.day === 15 && isWaxing) {
      return 'ព្រះចន្ទពេញបូណ៌មី រស្មីភ្លឺថ្លាពេញបរិបូរណ៍ ប្រៀបដូចចិត្តដែលពោរពេញដោយសេចក្ដីស្ងប់';
    }
    if (khmerInfo.day <= 3 && isWaxing) {
      return 'ព្រះចន្ទវង្កខ្នើត ចាប់ផ្ដើមរះថ្មី ប្រៀបដូចការចាប់ផ្ដើមនៃសេចក្ដីសង្ឃឹម និងបុណ្យកុសល';
    }
    if (isWaxing) {
      return 'ព្រះចន្ទកើតស្ទើរ ដូចជាការប្រុងប្រៀប និងការលូតលាស់នៃសេចក្ដីល្អក្នុងចិត្ត';
    }
    if (khmerInfo.day >= 14 && !isWaxing) {
      return 'ព្រះចន្ទដាច់ខែ រំលឹកអំពីការត្រៀមចាប់ផ្ដើមវដ្ដជីវិត និងរស្មីថ្មី';
    }
    return 'ព្រះចន្ទរោច ស្រុតចុះតាមកាលវេលា រំលឹកនូវសច្ចធម៌នៃធម្មជាតិ';
  };

  return (
    <div className="rounded-3xl glass-panel p-6 sm:p-7 border border-[#E8BF70]/25 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
      {/* Background celestial lighting */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#E8BF70]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[#142A4D]/40 blur-3xl pointer-events-none" />

      {/* Top: Luminous Photorealistic Moon Sphere */}
      <div className="flex flex-col items-center text-center pt-2">
        <div className="relative mb-5 group">
          {/* Outer Radiant Lunar Aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E8BF70]/20 via-[#F4F3EF]/30 to-transparent blur-2xl scale-125 pointer-events-none" />

          {/* NASA Photo Realistic Moon Sphere with Phase Shadow Mask */}
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-[0_0_35px_rgba(232,191,112,0.25)] border border-white/20 bg-[#071426] flex items-center justify-center">
            {/* Real NASA Moon Texture Photograph */}
            <img
              src="/moon-realistic.jpg"
              alt="Realistic Moon"
              className="w-full h-full object-cover rounded-full"
            />

            {/* Realistic Phase Shadow Mask */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none mix-blend-multiply"
              style={{
                background: isWaxing
                  ? `linear-gradient(90deg, rgba(7,20,38,0.96) 0%, rgba(7,20,38,${Math.max(0, 0.95 - fraction * 1.1)}) ${Math.max(10, (1 - fraction) * 100)}%, transparent 100%)`
                  : `linear-gradient(270deg, rgba(7,20,38,0.96) 0%, rgba(7,20,38,${Math.max(0, 0.95 - fraction * 1.1)}) ${Math.max(10, (1 - fraction) * 100)}%, transparent 100%)`
              }}
            />

            {/* Earthshine Night Ambient Tint */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none opacity-20"
              style={{
                background:
                  'radial-gradient(circle at 35% 35%, rgba(56,189,248,0.4), transparent 70%)'
              }}
            />

            {/* Glowing Golden Rim */}
            <div className="absolute inset-0 rounded-full border border-[#E8BF70]/40 pointer-events-none" />
          </div>
        </div>

        {/* Date Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F4F3EF] tracking-tight">
          ថ្ងៃ {toKhmerNumeral(khmerInfo.day)} {khmerInfo.moonPhaseNameKm}
        </h2>
        <p className="text-sm sm:text-base text-[#E8BF70] font-semibold mt-1">
          ខែ{khmerInfo.monthNameKm} ឆ្នាំ{khmerInfo.animalYearNameKm}
        </p>

        {/* Moon Phase Status Pill */}
        <div className="mt-3.5 px-4 py-1.5 rounded-full bg-[#142A4D]/80 border border-[#E8BF70]/30 inline-flex items-center gap-2 text-xs sm:text-sm shadow-sm">
          <Moon className="w-4 h-4 text-[#E8BF70]" />
          <span className="text-[#F4F3EF] font-medium">
            ដំណាក់កាល: <span className="text-[#E8BF70] font-bold">{astroInfo.phaseNameKm}</span>
          </span>
        </div>

        {/* Illumination Progress Bar */}
        <div className="w-full max-w-xs mt-4">
          <div className="flex justify-between items-center text-xs text-[#A9B8CC] mb-1.5 font-medium">
            <span>ពន្លឺព្រះចន្ទ (Illumination)</span>
            <span className="text-[#E8BF70] font-bold font-mono">{illumPct}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-[#0B1930] overflow-hidden border border-white/10 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#D4AC5D] via-[#E8BF70] to-[#FFFDF7] transition-all duration-500 shadow-sm"
              style={{ width: `${illumPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Details List Cards */}
      <div className="my-5 space-y-2.5 pt-4 border-t border-white/10 text-xs sm:text-sm">
        {/* Holy Day (ថ្ងៃសីល) */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0B1930]/80 border border-white/5">
          <div className="flex items-center gap-2.5 text-[#A9B8CC]">
            <Sparkles className="w-4 h-4 text-[#E8BF70]" />
            <span className="font-medium">ថ្ងៃសីល</span>
          </div>
          <span
            className={`font-semibold ${
              khmerInfo.isObservanceDay
                ? 'text-[#E8BF70] bg-[#E8BF70]/15 px-3 py-0.5 rounded-xl border border-[#E8BF70]/40 shadow-sm'
                : 'text-[#F4F3EF]'
            }`}
          >
            {khmerInfo.isObservanceDay
              ? `ថ្ងៃសីល (${toKhmerNumeral(khmerInfo.day)} ${khmerInfo.moonPhaseNameKm})`
              : 'មិនមែនថ្ងៃសីល'}
          </span>
        </div>

        {/* Festivals (ពិធីបុណ្យ) */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0B1930]/80 border border-white/5">
          <div className="flex items-center gap-2.5 text-[#A9B8CC]">
            <CalendarDays className="w-4 h-4 text-[#E8BF70]" />
            <span className="font-medium">ពិធីបុណ្យ</span>
          </div>
          <span className="font-semibold text-[#F4F3EF] truncate max-w-[200px]">
            {khmerInfo.festivalNames.length > 0
              ? khmerInfo.festivalNames.join(', ')
              : 'មិនមានពិធីបុណ្យសំខាន់'}
          </span>
        </div>

        {/* Astrological / Day Element (អាកាសធាតុ / ធាតុ) */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0B1930]/80 border border-white/5">
          <div className="flex items-center gap-2.5 text-[#A9B8CC]">
            <Compass className="w-4 h-4 text-[#E8BF70]" />
            <span className="font-medium">អាកាសធាតុ (ធាតុ/រាសី)</span>
          </div>
          <span className="font-semibold text-[#E8BF70]">
            {dayAstrology.name} • {dayAstrology.element}
          </span>
        </div>
      </div>

      {/* Cultural Wisdom Poetic Reflection Card */}
      <div className="pt-3 border-t border-white/10 text-center">
        <p className="text-xs text-[#A9B8CC] italic leading-relaxed px-3 font-serif">
          &ldquo;{getPhaseReflection()}&rdquo;
        </p>
        <div className="flex items-center justify-center gap-2 mt-2 text-[#E8BF70]">
          <span className="w-8 h-[1px] bg-[#E8BF70]/30" />
          <span className="text-xs">🪷</span>
          <span className="w-8 h-[1px] bg-[#E8BF70]/30" />
        </div>
      </div>
    </div>
  );
}
