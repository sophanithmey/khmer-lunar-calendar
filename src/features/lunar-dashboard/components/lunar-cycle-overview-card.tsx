import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import type { KhmerDayInfo } from '../../lunar-calendar/types/lunar-date.types';
import { MoonPhaseDisc } from './moon-phase-disc';
import { toKhmerNumeral } from '../../lunar-calendar/utils/khmer-numerals';
import { formatSolarDate } from '../../../lib/formatters';
import { useLanguage } from '../../../hooks/use-language';

interface LunarCycleOverviewCardProps {
  khmerInfo: KhmerDayInfo;
  onSelectLunarDay?: (day: number, isWaxing: boolean) => void;
}

export function LunarCycleOverviewCard({
  khmerInfo,
  onSelectLunarDay
}: LunarCycleOverviewCardProps) {
  const { language } = useLanguage();
  const [activeCycleView, setActiveCycleView] = useState<'all' | 'waxing' | 'waning'>('all');

  const isCurrentWaxing = khmerInfo.moonPhase === 'waxing';
  const currentDay = khmerInfo.day;

  // Traditional Khmer lunar calendar:
  // Odd lunar months (or deficiency months) have 29 days (15 waxing + 14 waning)
  // Even lunar months (full months) have 30 days (15 waxing + 15 waning)
  const isMonth30Days = khmerInfo.monthIndex % 2 === 1;
  const waningTotal = isMonth30Days ? 15 : 14;
  const totalDays = 15 + waningTotal;

  const waxingDays = Array.from({ length: 15 }, (_, i) => i + 1);
  const waningDays = Array.from({ length: waningTotal }, (_, i) => i + 1);

  return (
    <div className="rounded-3xl glass-panel p-6 sm:p-7 border border-[#E8BF70]/25 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
      {/* Background ambient gold gradient wash */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#E8BF70]/5 blur-3xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
        {/* Left: Luminous Moon icon & Gregorian Date */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#142A4D] to-[#E8BF70]/20 border border-[#E8BF70]/40 flex items-center justify-center shadow-lg shrink-0">
            <MoonPhaseDisc day={currentDay} isWaxing={isCurrentWaxing} size={30} glow />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#F4F3EF] leading-snug">
              {formatSolarDate(khmerInfo.gregorianDate, language)}
            </h3>
            <p className="text-xs text-[#A9B8CC] font-medium">កាលបរិច្ឆេទសកល (Gregorian)</p>
          </div>
        </div>

        {/* Right: Traditional Khmer Lunar Date Header */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#142A4D]/70 border border-[#E8BF70]/30 shadow-inner">
          <div className="w-8 h-8 rounded-xl bg-[#E8BF70]/15 flex items-center justify-center text-[#E8BF70]">
            <Sparkles className="w-4 h-4 text-[#E8BF70]" />
          </div>
          <div className="text-right">
            <div className="text-sm sm:text-base font-bold text-[#E8BF70] leading-none">
              ថ្ងៃ {toKhmerNumeral(currentDay)} {khmerInfo.moonPhaseNameKm}
            </div>
            <div className="text-xs text-[#A9B8CC] mt-1 font-medium">
              ខែ{khmerInfo.monthNameKm} ឆ្នាំ{khmerInfo.animalYearNameKm}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary Pills Row */}
      <div className="grid grid-cols-3 gap-3 my-5">
        <div className="px-3.5 py-3 rounded-2xl bg-[#0B1930]/80 border border-white/5 text-center shadow-sm">
          <span className="text-xs text-[#A9B8CC] block mb-1 font-medium">ខ្នើត (កើត)</span>
          <span className="text-sm sm:text-base font-bold text-[#F4F3EF]">1 - 15</span>
        </div>
        <div className="px-3.5 py-3 rounded-2xl bg-[#0B1930]/80 border border-white/5 text-center shadow-sm">
          <span className="text-xs text-[#A9B8CC] block mb-1 font-medium">រោច (រោច)</span>
          <span className="text-sm sm:text-base font-bold text-[#F4F3EF]">1 - {waningTotal}</span>
        </div>
        <div className="px-3.5 py-3 rounded-2xl bg-[#142A4D]/50 border border-[#E8BF70]/25 text-center shadow-sm">
          <span className="text-xs text-[#E8BF70] block mb-1 font-medium">
            សរុប {totalDays} ថ្ងៃ
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#F4F3EF]">
            {isMonth30Days ? 'ខែពេញ (30 ថ្ងៃ)' : 'ខែខ្វះ (29 ថ្ងៃ)'}
          </span>
        </div>
      </div>

      {/* Segmented Filter Pills */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#0B1930] border border-white/5 mb-4 max-w-sm">
        <button
          type="button"
          onClick={() => setActiveCycleView('all')}
          className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
            activeCycleView === 'all'
              ? 'bg-[#E8BF70] text-[#071426] shadow-md font-bold'
              : 'text-[#A9B8CC] hover:text-[#F4F3EF]'
          }`}
        >
          ទាំងអស់ ({totalDays} ថ្ងៃ)
        </button>
        <button
          type="button"
          onClick={() => setActiveCycleView('waxing')}
          className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
            activeCycleView === 'waxing'
              ? 'bg-[#E8BF70] text-[#071426] shadow-md font-bold'
              : 'text-[#A9B8CC] hover:text-[#F4F3EF]'
          }`}
        >
          ខ្នើត (១-១៥)
        </button>
        <button
          type="button"
          onClick={() => setActiveCycleView('waning')}
          className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
            activeCycleView === 'waning'
              ? 'bg-[#E8BF70] text-[#071426] shadow-md font-bold'
              : 'text-[#A9B8CC] hover:text-[#F4F3EF]'
          }`}
        >
          រោច (១-{waningTotal})
        </button>
      </div>

      {/* Visual 30-Day Moon Phases Interactive Cycle */}
      <div className="space-y-5 flex-1">
        {/* Waxing Grid (ខ្នើត: 1 - 15) */}
        {(activeCycleView === 'all' || activeCycleView === 'waxing') && (
          <div>
            <div className="flex items-center justify-between text-xs text-[#A9B8CC] mb-2.5 px-1 font-medium">
              <span className="text-[#E8BF70] flex items-center gap-2 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#E8BF70] inline-block" />
                ខ្នើត (កើត) ១ ដល់ ១៥
              </span>
              <span className="text-[11px] text-[#A9B8CC]">ចន្ទវង្ក → ពេញបូណ៌មី (១៥ កើត 🌕)</span>
            </div>

            {/* Spacious responsive grid (8 cols desktop / 5 cols mobile) */}
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-8 lg:grid-cols-8 gap-2">
              {waxingDays.map((d) => {
                const isSelected = isCurrentWaxing && currentDay === d;
                const isSil = d === 8 || d === 15;
                return (
                  <button
                    key={`waxing-${d}`}
                    type="button"
                    onClick={() => onSelectLunarDay?.(d, true)}
                    className={`group relative flex flex-col items-center justify-center py-2.5 px-1.5 rounded-2xl transition-all duration-200 cursor-pointer text-center ${
                      isSelected
                        ? 'bg-[#142A4D] border-2 border-[#E8BF70] shadow-xl shadow-[#E8BF70]/30 scale-105 z-10'
                        : isSil
                          ? 'bg-[#0B1930]/90 hover:bg-[#142A4D]/70 border border-[#E8BF70]/30'
                          : 'bg-[#0B1930]/75 hover:bg-[#142A4D]/60 border border-white/5 hover:border-white/20'
                    }`}
                  >
                    <MoonPhaseDisc day={d} isWaxing={true} size={26} glow={isSelected} />
                    <span
                      className={`text-xs font-bold mt-1.5 leading-none ${
                        isSelected
                          ? 'text-[#E8BF70]'
                          : isSil
                            ? 'text-amber-200 font-semibold'
                            : 'text-[#F4F3EF] group-hover:text-[#E8BF70]'
                      }`}
                    >
                      {toKhmerNumeral(d)} កើត
                    </span>

                    {/* Holy Day Indicator Dot */}
                    {isSil && (
                      <span
                        className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E8BF70] border-2 border-[#071426]"
                        title={d === 15 ? 'ថ្ងៃសីល & ពេញបូណ៌មី' : 'ថ្ងៃសីល'}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Waning Grid (រោច: 1 - 14/15) */}
        {(activeCycleView === 'all' || activeCycleView === 'waning') && (
          <div>
            <div className="flex items-center justify-between text-xs text-[#A9B8CC] mb-2.5 px-1 font-medium">
              <span className="text-slate-300 flex items-center gap-2 font-semibold">
                <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
                រោច (រោច) ១ ដល់ {waningTotal}
              </span>
              <span className="text-[11px] text-[#A9B8CC]">
                ស្រុតចុះ → ដាច់ខែ ({waningTotal} រោច 🌑)
              </span>
            </div>

            {/* Spacious responsive grid (8 cols desktop / 5 cols mobile) */}
            <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-7 gap-2">
              {waningDays.map((d) => {
                const isSelected = !isCurrentWaxing && currentDay === d;
                const isSil = d === 8 || d === waningTotal;
                return (
                  <button
                    key={`waning-${d}`}
                    type="button"
                    onClick={() => onSelectLunarDay?.(d, false)}
                    className={`group relative flex flex-col items-center justify-center py-2.5 px-1.5 rounded-2xl transition-all duration-200 cursor-pointer text-center ${
                      isSelected
                        ? 'bg-[#142A4D] border-2 border-[#E8BF70] shadow-xl shadow-[#E8BF70]/30 scale-105 z-10'
                        : isSil
                          ? 'bg-[#0B1930]/90 hover:bg-[#142A4D]/70 border border-[#E8BF70]/30'
                          : 'bg-[#0B1930]/75 hover:bg-[#142A4D]/60 border border-white/5 hover:border-white/20'
                    }`}
                  >
                    <MoonPhaseDisc day={d} isWaxing={false} size={26} glow={isSelected} />
                    <span
                      className={`text-xs font-bold mt-1.5 leading-none ${
                        isSelected
                          ? 'text-[#E8BF70]'
                          : isSil
                            ? 'text-amber-200 font-semibold'
                            : 'text-[#F4F3EF] group-hover:text-[#E8BF70]'
                      }`}
                    >
                      {toKhmerNumeral(d)} រោច
                    </span>

                    {/* Holy Day Indicator Dot */}
                    {isSil && (
                      <span
                        className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E8BF70] border-2 border-[#071426]"
                        title={d === waningTotal ? 'ថ្ងៃសីល ដាច់ខែ' : 'ថ្ងៃសីល'}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer Cultural / Astronomical Note */}
      <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-[#A9B8CC]">
        <p className="italic">
          ខែ{khmerInfo.monthNameKm} មាន {totalDays} ថ្ងៃ (ថ្ងៃពេញបូណ៌មី ១៥ កើត និងថ្ងៃដាច់ខែ{' '}
          {waningTotal} រោច)
        </p>
        <span className="text-[#E8BF70] text-xs font-semibold shrink-0 hidden sm:inline">
          ចន្ទគតិខ្មែរ
        </span>
      </div>
    </div>
  );
}
