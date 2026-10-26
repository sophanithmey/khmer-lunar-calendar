import { useState } from 'react';
import { ArrowRightLeft, Check, ArrowRight } from 'lucide-react';
import { formatIsoDate, parseIsoDate, addDays } from '../../../lib/date-utils';
import { KhmerLunarCalendarService } from '../../lunar-calendar/services/lunar-calendar-service';
import { toKhmerNumeral } from '../../lunar-calendar/utils/khmer-numerals';
import { formatSolarDate } from '../../../lib/formatters';
import { MoonPhaseDisc } from './moon-phase-disc';

interface QuickConverterCardProps {
  initialDate?: Date;
  onDateConverted?: (date: Date) => void;
}

export function QuickConverterCard({
  initialDate = new Date(),
  onDateConverted
}: QuickConverterCardProps) {
  const [mode, setMode] = useState<'gregorian-to-khmer' | 'khmer-to-gregorian'>(
    'gregorian-to-khmer'
  );
  const [dateStr, setDateStr] = useState(formatIsoDate(initialDate));
  const [activeDate, setActiveDate] = useState<Date>(initialDate);

  // Khmer-to-Gregorian state
  const [khDay, setKhDay] = useState<number>(2);
  const [khPhase, setKhPhase] = useState<'waxing' | 'waning'>('waxing');
  const [khMonthIdx, setKhMonthIdx] = useState<number>(10); // Assoch (អស្សុជ)
  const [khYear, setKhYear] = useState<number>(2026);

  const convertedInfo = KhmerLunarCalendarService.getKhmerDate(activeDate);

  const handleDateChange = (newDateStr: string) => {
    setDateStr(newDateStr);
    const parsed = parseIsoDate(newDateStr);
    if (!isNaN(parsed.getTime())) {
      setActiveDate(parsed);
      onDateConverted?.(parsed);
    }
  };

  const handleQuickJump = (daysOffset: number) => {
    const target = addDays(new Date(), daysOffset);
    const formatted = formatIsoDate(target);
    setDateStr(formatted);
    setActiveDate(target);
    onDateConverted?.(target);
  };

  // Convert Khmer inputs to Gregorian
  const handleConvertKhmerToSolar = () => {
    // Search within the target year for the date matching day, moonPhase, and monthIndex
    const start = new Date(khYear, 0, 1);
    let matchedDate = activeDate;
    for (let i = 0; i < 366; i++) {
      const d = addDays(start, i);
      const info = KhmerLunarCalendarService.getKhmerDate(d);
      if (info.monthIndex === khMonthIdx && info.moonPhase === khPhase && info.day === khDay) {
        matchedDate = d;
        break;
      }
    }
    setActiveDate(matchedDate);
    setDateStr(formatIsoDate(matchedDate));
    onDateConverted?.(matchedDate);
  };

  const KHMER_MONTHS_NAMES = [
    'មិគសិរ',
    'បុស្ស',
    'មាឃ',
    'ផល្គុន',
    'ចេត្រ',
    'ពិសាខ',
    'ជេស្ឋ',
    'អាសាឍ',
    'ស្រាពណ៍',
    'ភទ្របទ',
    'អស្សុជ',
    'កត្តិក'
  ];

  return (
    <div className="rounded-3xl glass-panel p-6 border border-[#E8BF70]/25 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#E8BF70]/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#142A4D] to-[#E8BF70]/20 border border-[#E8BF70]/40 flex items-center justify-center text-[#E8BF70] shadow-md shrink-0">
              <ArrowRightLeft className="w-5 h-5 text-[#E8BF70]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F4F3EF] leading-snug">បម្លែងកាលបរិច្ឆេទ</h3>
              <p className="text-xs text-[#A9B8CC]">Gregorian ↔ Khmer Lunar</p>
            </div>
          </div>

          <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#142A4D]/80 border border-[#E8BF70]/30 text-[#E8BF70] font-semibold">
            {mode === 'gregorian-to-khmer' ? 'សកល → ខ្មែរ' : 'ខ្មែរ → សកល'}
          </span>
        </div>

        {/* Mode Switch Tabs */}
        <div className="grid grid-cols-2 gap-1.5 my-4 p-1 rounded-2xl bg-[#0B1930] border border-white/5">
          <button
            type="button"
            onClick={() => setMode('gregorian-to-khmer')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
              mode === 'gregorian-to-khmer'
                ? 'bg-[#E8BF70] text-[#071426] shadow-md'
                : 'text-[#A9B8CC] hover:text-[#F4F3EF]'
            }`}
          >
            សកល → ខ្មែរ (Solar to Lunar)
          </button>
          <button
            type="button"
            onClick={() => setMode('khmer-to-gregorian')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
              mode === 'khmer-to-gregorian'
                ? 'bg-[#E8BF70] text-[#071426] shadow-md'
                : 'text-[#A9B8CC] hover:text-[#F4F3EF]'
            }`}
          >
            ខ្មែរ → សកល (Lunar to Solar)
          </button>
        </div>

        {/* Input Forms Based on Mode */}
        {mode === 'gregorian-to-khmer' ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-[#A9B8CC] font-medium">
              <label htmlFor="solar-date-input">កាលបរិច្ឆេទសកល (Solar Date)</label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickJump(0)}
                  className="px-2 py-0.5 rounded-lg bg-[#142A4D] hover:bg-[#1E3E72] text-[10px] text-[#E8BF70] border border-[#E8BF70]/30 cursor-pointer"
                >
                  ថ្ងៃនេះ
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickJump(1)}
                  className="px-2 py-0.5 rounded-lg bg-[#142A4D] hover:bg-[#1E3E72] text-[10px] text-slate-300 border border-white/10 cursor-pointer"
                >
                  +១ ថ្ងៃ
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickJump(7)}
                  className="px-2 py-0.5 rounded-lg bg-[#142A4D] hover:bg-[#1E3E72] text-[10px] text-slate-300 border border-white/10 cursor-pointer"
                >
                  +៧ ថ្ងៃ
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                id="solar-date-input"
                type="date"
                value={dateStr}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full bg-[#071426] text-[#F4F3EF] text-sm font-medium px-4 py-3 rounded-2xl border border-white/15 focus:outline-none focus:border-[#E8BF70] focus:ring-1 focus:ring-[#E8BF70] transition-colors"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <span className="text-xs text-[#A9B8CC] font-medium block">
              ជ្រើសរើសព័ត៌មានចន្ទគតិ (Khmer Lunar Inputs)
            </span>

            <div className="grid grid-cols-2 gap-2">
              {/* Day Selector (1 - 15) */}
              <div>
                <label className="text-[10px] text-[#A9B8CC] block mb-1">
                  ចំនួនថ្ងៃ (Day 1-15)
                </label>
                <select
                  value={khDay}
                  onChange={(e) => setKhDay(parseInt(e.target.value, 10))}
                  className="w-full bg-[#071426] text-[#F4F3EF] text-xs font-semibold px-2.5 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-[#E8BF70]"
                >
                  {Array.from({ length: 15 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      ថ្ងៃ {toKhmerNumeral(d)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Moon Phase (Waxing / Waning) */}
              <div>
                <label className="text-[10px] text-[#A9B8CC] block mb-1">ខ្នើត / រោច (Phase)</label>
                <select
                  value={khPhase}
                  onChange={(e) => setKhPhase(e.target.value as 'waxing' | 'waning')}
                  className="w-full bg-[#071426] text-[#F4F3EF] text-xs font-semibold px-2.5 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-[#E8BF70]"
                >
                  <option value="waxing">ខ្នើត (កើត)</option>
                  <option value="waning">រោច (រោច)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Month Selector */}
              <div>
                <label className="text-[10px] text-[#A9B8CC] block mb-1">ខែចន្ទគតិ (Month)</label>
                <select
                  value={khMonthIdx}
                  onChange={(e) => setKhMonthIdx(parseInt(e.target.value, 10))}
                  className="w-full bg-[#071426] text-[#F4F3EF] text-xs font-semibold px-2.5 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-[#E8BF70]"
                >
                  {KHMER_MONTHS_NAMES.map((name, idx) => (
                    <option key={idx} value={idx}>
                      ខែ{name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Selector */}
              <div>
                <label className="text-[10px] text-[#A9B8CC] block mb-1">ឆ្នាំសកល (Year)</label>
                <select
                  value={khYear}
                  onChange={(e) => setKhYear(parseInt(e.target.value, 10))}
                  className="w-full bg-[#071426] text-[#F4F3EF] text-xs font-semibold px-2.5 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-[#E8BF70]"
                >
                  {[2024, 2025, 2026, 2027, 2028].map((y) => (
                    <option key={y} value={y}>
                      {y} ({toKhmerNumeral(y)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleConvertKhmerToSolar}
              className="w-full py-2.5 rounded-xl bg-[#E8BF70] hover:bg-[#d4ac5d] text-[#071426] text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>បម្លែងមកកាលបរិច្ឆេទសកល</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Result Card: Rich Traditional Khmer Output */}
      <div className="mt-5 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-xs text-[#A9B8CC] mb-2 font-medium">
          <span className="uppercase tracking-wider">លទ្ធផលបម្លែង (Conversion Result)</span>
          <span className="text-[#E8BF70] flex items-center gap-1 font-semibold text-[11px]">
            <Check className="w-3 h-3" />
            <span>ត្រឹមត្រូវតាមក្បួនខ្នាត</span>
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B1930]/90 border border-[#E8BF70]/30 shadow-lg relative overflow-hidden group">
          {/* Subtle gold accent ribbon */}
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#E8BF70]/10 blur-xl pointer-events-none" />

          <div className="flex items-center gap-3.5 relative z-10">
            {/* Moon Phase Disc */}
            <div className="w-12 h-12 rounded-2xl bg-[#142A4D] border border-[#E8BF70]/40 flex items-center justify-center shadow-md shrink-0">
              <MoonPhaseDisc
                day={convertedInfo.day}
                isWaxing={convertedInfo.moonPhase === 'waxing'}
                size={28}
                glow
              />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="text-base font-extrabold text-[#F4F3EF] leading-snug truncate">
                ថ្ងៃ {convertedInfo.dayOfWeekNameKm} {toKhmerNumeral(convertedInfo.day)}{' '}
                {convertedInfo.moonPhaseNameKm}
              </div>
              <div className="text-xs text-[#E8BF70] font-semibold mt-0.5">
                ខែ{convertedInfo.monthNameKm} ឆ្នាំ{convertedInfo.animalYearNameKm}{' '}
                {convertedInfo.sakNameKm}
              </div>
              <div className="text-[11px] text-[#A9B8CC] mt-0.5">
                ពុទ្ធសករាជ {toKhmerNumeral(convertedInfo.beYear)} (
                {formatSolarDate(activeDate, 'km')})
              </div>
            </div>

            {/* Observance or Moon Tag */}
            <div className="shrink-0 text-right">
              <span
                className={`text-[10px] px-2.5 py-1 rounded-full font-bold border block ${
                  convertedInfo.isObservanceDay
                    ? 'bg-[#E8BF70]/20 text-[#E8BF70] border-[#E8BF70]/40'
                    : 'bg-[#142A4D] text-[#A9B8CC] border-white/10'
                }`}
              >
                {convertedInfo.isObservanceDay ? '✨ ថ្ងៃសីល' : convertedInfo.moonPhaseNameKm}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
