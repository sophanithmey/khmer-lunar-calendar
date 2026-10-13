import { useState, lazy, Suspense } from 'react';
import type { MoonAstronomyInfo } from '../types/astronomy.types';
import type { KhmerDayInfo } from '../../lunar-calendar/types/lunar-date.types';
import { useLanguage } from '../../../hooks/use-language';
import { MoonCanvasFallback } from './moon-canvas-fallback';
import { DateTimeline } from './date-timeline';
import { formatIllumination, formatDistanceKm, formatShortSolarDate } from '../../../lib/formatters';
import { toKhmerNumeral } from '../../lunar-calendar/utils/khmer-numerals';
import { Compass, Info, CalendarDays, Sliders } from 'lucide-react';

const MoonScene = lazy(() => import('./moon-scene').then((m) => ({ default: m.MoonScene })));

interface MoonPhaseViewProps {
  astroInfo: MoonAstronomyInfo;
  khmerInfo: KhmerDayInfo;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  className?: string;
}

export function MoonPhaseView({
  astroInfo,
  khmerInfo,
  selectedDate,
  onDateChange,
  className = ''
}: MoonPhaseViewProps) {
  const { language, t } = useLanguage();
  const [use3D, setUse3D] = useState<boolean>(true);
  const [overrideDegrees, setOverrideDegrees] = useState<number | null>(null);

  const activeDegrees = overrideDegrees !== null ? overrideDegrees : astroInfo.phaseDegrees;
  // Calculate approximate illumination from degrees if manually scrubbed
  const activeIllumPct =
    overrideDegrees !== null
      ? Math.round(((1 - Math.cos((overrideDegrees * Math.PI) / 180)) / 2) * 1000) / 10
      : astroInfo.illuminationPct;

  // 8 Primary Lunar Phases presets
  const LUNAR_PHASES = [
    { nameKm: 'ដាច់ខែ', nameEn: 'New Moon', deg: 0, icon: '🌑' },
    { nameKm: 'ចំណិតកើត', nameEn: 'Waxing Crescent', deg: 45, icon: '🌒' },
    { nameKm: 'កន្លះដួងកើត', nameEn: 'First Quarter', deg: 90, icon: '🌓' },
    { nameKm: 'ជិតពេញវង់', nameEn: 'Waxing Gibbous', deg: 135, icon: '🌔' },
    { nameKm: 'ពេញបូណ៌មី', nameEn: 'Full Moon', deg: 180, icon: '🌕' },
    { nameKm: 'ចាប់ស្រក', nameEn: 'Waning Gibbous', deg: 225, icon: '🌖' },
    { nameKm: 'កន្លះដួងរោច', nameEn: 'Third Quarter', deg: 270, icon: '🌗' },
    { nameKm: 'ចំណិតរោច', nameEn: 'Waning Crescent', deg: 315, icon: '🌘' }
  ];

  const handlePhaseSelect = (deg: number) => {
    setOverrideDegrees(deg);
  };

  const handleResetToRealDate = () => {
    setOverrideDegrees(null);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Top Controls Bar: 3D / 2D Toggle & Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl glass-panel border border-[#E8BF70]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#142A4D] border border-[#E8BF70]/30 flex items-center justify-center text-[#E8BF70] shadow-md">
            <Compass className="w-5 h-5 text-[#E8BF70]" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#F4F3EF] leading-snug">
              {t.explorer.title}
            </h3>
            <p className="text-xs text-[#A9B8CC]">{t.explorer.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {overrideDegrees !== null && (
            <button
              type="button"
              onClick={handleResetToRealDate}
              className="px-3 py-1.5 rounded-xl bg-[#E8BF70]/15 hover:bg-[#E8BF70]/25 text-[#E8BF70] border border-[#E8BF70]/40 text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              ត្រឡប់មកថ្ងៃនេះ
            </button>
          )}

          <div className="flex items-center gap-1.5 bg-[#071426] p-1 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => setUse3D(true)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                use3D
                  ? 'bg-[#E8BF70] text-[#071426] shadow-md'
                  : 'text-[#A9B8CC] hover:text-[#F4F3EF]'
              }`}
            >
              3D Interactive
            </button>
            <button
              type="button"
              onClick={() => setUse3D(false)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                !use3D
                  ? 'bg-[#E8BF70] text-[#071426] shadow-md'
                  : 'text-[#A9B8CC] hover:text-[#F4F3EF]'
              }`}
            >
              2D Photo HD
            </button>
          </div>
        </div>
      </div>

      {/* 8 Primary Lunar Phases Quick Jump Bar */}
      <div className="p-3 sm:p-4 rounded-3xl glass-panel-subtle border border-white/10 overflow-x-auto">
        <div className="flex items-center justify-between gap-2 min-w-[620px]">
          {LUNAR_PHASES.map((p) => {
            const isSelected =
              Math.abs(activeDegrees - p.deg) < 22.5 ||
              (p.deg === 0 && activeDegrees >= 337.5);
            return (
              <button
                key={p.deg}
                type="button"
                onClick={() => handlePhaseSelect(p.deg)}
                className={`flex-1 flex flex-col items-center justify-center p-2 rounded-2xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#142A4D] border-2 border-[#E8BF70] shadow-lg shadow-[#E8BF70]/20 scale-105'
                    : 'bg-[#0B1930]/60 hover:bg-[#142A4D]/50 border border-white/5'
                }`}
              >
                <span className="text-xl sm:text-2xl mb-1">{p.icon}</span>
                <span
                  className={`text-[11px] font-bold leading-tight truncate max-w-[80px] text-center ${
                    isSelected ? 'text-[#E8BF70]' : 'text-[#A9B8CC]'
                  }`}
                >
                  {p.nameKm}
                </span>
                <span className="text-[9px] text-slate-400 font-mono mt-0.5">
                  {p.deg}&deg;
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Visual Display & Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Visual Moon Display Card */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl glass-panel border border-[#E8BF70]/20 relative overflow-hidden shadow-2xl">
          {/* Subtle background celestial radial wash */}
          <div className="absolute inset-0 bg-radial from-[#142A4D]/30 via-transparent to-transparent pointer-events-none" />

          {/* Interactive 3D / 2D Canvas */}
          <div className="relative z-10 w-full flex flex-col items-center justify-center">
            {use3D ? (
              <Suspense
                fallback={
                  <MoonCanvasFallback
                    phaseDegrees={activeDegrees}
                    illuminationPct={activeIllumPct}
                  />
                }
              >
                <MoonScene
                  phaseDegrees={activeDegrees}
                  illuminationPct={activeIllumPct}
                />
              </Suspense>
            ) : (
              <MoonCanvasFallback
                phaseDegrees={activeDegrees}
                illuminationPct={activeIllumPct}
              />
            )}
          </div>

          {/* Interactive Phase Angle Scrubber Slider */}
          <div className="w-full max-w-md mt-6 pt-4 border-t border-white/10 z-10">
            <div className="flex items-center justify-between text-xs text-[#A9B8CC] mb-2 font-medium">
              <span className="flex items-center gap-1.5 text-[#E8BF70]">
                <Sliders className="w-3.5 h-3.5" />
                <span>កែមុំដំណាក់កាលព្រះចន្ទ</span>
              </span>
              <span className="font-mono text-[#0F1E36] dark:text-[#F4F3EF] font-bold">
                {activeDegrees.toFixed(1)}&deg;
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={activeDegrees}
              onChange={(e) => setOverrideDegrees(parseFloat(e.target.value))}
              aria-label="Adjust moon phase angle"
              className="w-full h-2 rounded-lg bg-[#E5DFD3] dark:bg-[#0B1930] accent-[#C59B27] dark:accent-[#E8BF70] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#5D6B82] dark:text-[#A9B8CC] mt-1 font-mono">
              <span>0&deg; (ដាច់ខែ)</span>
              <span>90&deg; (៨ កើត)</span>
              <span>180&deg; (ពេញបូណ៌មី)</span>
              <span>270&deg; (៨ រោច)</span>
              <span>360&deg;</span>
            </div>
          </div>
        </div>

        {/* Astronomy Telemetry Details */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Status Header Card */}
          <div className="p-5 rounded-3xl glass-panel border border-[#E8BF70]/30 space-y-2 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#E8BF70] font-bold">
                {t.todayCard.astronomyPhase}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E8BF70]/15 text-[#E8BF70] font-semibold border border-[#E8BF70]/20">
                {activeIllumPct}% ពន្លឺ
              </span>
            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-[#0F1E36] dark:text-[#F4F3EF] tracking-tight">
              {language === 'km' ? astroInfo.phaseNameKm : astroInfo.phaseNameEn}
            </div>

            <div className="text-xs text-[#5D6B82] dark:text-[#A9B8CC] flex items-center gap-2">
              <CalendarDays className="w-3.5 h-3.5 text-[#9A7316] dark:text-[#E8BF70]" />
              <span>
                ថ្ងៃ {toKhmerNumeral(khmerInfo.day)} {khmerInfo.moonPhaseNameKm} ខែ{khmerInfo.monthNameKm} ឆ្នាំ{khmerInfo.animalYearNameKm}
              </span>
            </div>

            {/* Illumination Bar */}
            <div className="pt-2">
              <div className="w-full h-2 rounded-full bg-[#0B1930] overflow-hidden border border-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#D4AC5D] to-[#E8BF70] transition-all duration-300 shadow-sm"
                  style={{ width: `${activeIllumPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* 4 Telemetry Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-[#0B1930]/85 border border-white/5 shadow-sm">
              <span className="text-xs text-[#A9B8CC] block mb-1">
                {t.explorer.illumination}
              </span>
              <span className="text-lg sm:text-xl font-bold text-[#F4F3EF]">
                {formatIllumination(activeIllumPct / 100, language)}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B1930]/85 border border-white/5 shadow-sm">
              <span className="text-xs text-[#A9B8CC] block mb-1">
                {t.explorer.moonAge}
              </span>
              <span className="text-lg sm:text-xl font-bold text-[#F4F3EF]">
                {astroInfo.moonAgeDays} ថ្ងៃ
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B1930]/85 border border-white/5 shadow-sm">
              <span className="text-xs text-[#A9B8CC] block mb-1">
                {t.explorer.astronomyDistance}
              </span>
              <span className="text-sm sm:text-base font-bold text-[#F4F3EF]">
                {formatDistanceKm(astroInfo.distanceKm, language)}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B1930]/85 border border-white/5 shadow-sm">
              <span className="text-xs text-[#A9B8CC] block mb-1">
                មុំដំណាក់កាល (Angle)
              </span>
              <span className="text-lg sm:text-xl font-bold text-[#E8BF70] font-mono">
                {activeDegrees.toFixed(1)}&deg;
              </span>
            </div>
          </div>

          {/* Upcoming Lunar Event Milestones */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#F4F0E6] dark:bg-[#142A4D]/40 border border-[#C59B27]/20 dark:border-white/10">
              <span className="text-[11px] text-[#5D6B82] dark:text-[#A9B8CC] block mb-0.5">
                🌕 ពេញបូណ៌មីបន្ទាប់
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#9A7316] dark:text-[#E8BF70]">
                {formatShortSolarDate(astroInfo.nextFullMoon, language)}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F4F0E6] dark:bg-[#142A4D]/40 border border-[#C59B27]/20 dark:border-white/10">
              <span className="text-[11px] text-[#5D6B82] dark:text-[#A9B8CC] block mb-0.5">
                🌑 ដាច់ខែបន្ទាប់
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#0F1E36] dark:text-slate-300">
                {formatShortSolarDate(astroInfo.nextNewMoon, language)}
              </span>
            </div>
          </div>

          {/* Cultural & Astronomical Note */}
          <div className="p-4 rounded-2xl bg-[#F4F0E6] dark:bg-[#142A4D]/30 border border-[#C59B27]/20 dark:border-white/10 text-xs text-[#5D6B82] dark:text-[#A9B8CC] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#9A7316] dark:text-[#E8BF70] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              ដំណាក់កាលព្រះចន្ទខាងលើ គណនាតាមគន្លងព្រះចន្ទជាក់ស្ដែង។
              ចំណែកថ្ងៃខែចន្ទគតិខ្មែរ គណនាតាមក្បួនហោរាសាស្ត្រប្រពៃណី ដូច្នេះអាចខុសគ្នាមួយថ្ងៃម្ដងម្កាល។
            </p>
          </div>
        </div>
      </div>

      {/* Date Timeline Stepper */}
      <DateTimeline currentDate={selectedDate} onDateChange={onDateChange} />
    </div>
  );
}
