import { useState, useMemo } from 'react';
import {
  ArrowLeftRight,
  RotateCcw,
  Copy,
  Check,
  Calendar,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Moon,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../../hooks/use-language';
import { KhmerLunarCalendarService } from '../../lunar-calendar/services/lunar-calendar-service';
import { formatSolarDate } from '../../../lib/formatters';
import { toKhmerNumeral } from '../../lunar-calendar/utils/khmer-numerals';
import {
  formatIsoDate,
  parseIsoDate,
  addDays,
  isSameDay,
  getDaysInGregorianMonth,
  getFirstDayOfWeekInMonth
} from '../../../lib/date-utils';
import { SOLAR_MONTHS_KM, SOLAR_MONTHS_EN } from '../../../lib/khmer-time-utils';
import { MoonPhaseDisc } from '../../lunar-dashboard/components/moon-phase-disc';
import { BuddhaIcon } from '../../../components/icons/buddha-icon';
import type { KhmerDayInfo } from '../../lunar-calendar/types/lunar-date.types';

const KHMER_LUNAR_MONTHS = [
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

export function DateConverterForm() {
  const { language, t } = useLanguage();

  // Mode: Solar -> Lunar or Lunar -> Solar
  const [mode, setMode] = useState<'solar-to-lunar' | 'lunar-to-solar'>('solar-to-lunar');

  // Active date state
  const [activeDate, setActiveDate] = useState<Date>(() => new Date());
  const [dateInput, setDateInput] = useState<string>(() => formatIsoDate(new Date()));
  const [copied, setCopied] = useState(false);
  const [showMiniCalendar, setShowMiniCalendar] = useState(false);

  // Mini calendar browsing month/year
  const [calMonth, setCalMonth] = useState<number>(() => new Date().getMonth());
  const [calYear, setCalYear] = useState<number>(() => new Date().getFullYear());

  // Lunar-to-Solar state
  const [khDay, setKhDay] = useState<number>(15);
  const [khPhase, setKhPhase] = useState<'waxing' | 'waning'>('waxing');
  const [khMonthIdx, setKhMonthIdx] = useState<number>(5); // Pisakh (ពិសាខ)
  const [khYear, setKhYear] = useState<number>(() => new Date().getFullYear());

  // Converted result
  const result: KhmerDayInfo = useMemo(() => {
    return KhmerLunarCalendarService.getKhmerDate(activeDate);
  }, [activeDate]);

  // Handler to set new active date and sync input
  const applyDate = (date: Date) => {
    setActiveDate(date);
    setDateInput(formatIsoDate(date));
    setCalMonth(date.getMonth());
    setCalYear(date.getFullYear());
  };

  // Quick jump helper
  const handleQuickStep = (days: number) => {
    const nextDate = addDays(activeDate, days);
    applyDate(nextDate);
  };

  const handleJumpToToday = () => {
    applyDate(new Date());
  };

  const handleJumpRelativeToday = (daysOffset: number) => {
    const nextDate = addDays(new Date(), daysOffset);
    applyDate(nextDate);
  };

  const handleJumpMonths = (monthOffset: number) => {
    const nextDate = new Date(activeDate);
    nextDate.setMonth(nextDate.getMonth() + monthOffset);
    applyDate(nextDate);
  };

  const handleJumpYears = (yearOffset: number) => {
    const nextDate = new Date(activeDate);
    nextDate.setFullYear(nextDate.getFullYear() + yearOffset);
    applyDate(nextDate);
  };

  // Direct date string input change
  const handleDateInputChange = (newIso: string) => {
    setDateInput(newIso);
    const parsed = parseIsoDate(newIso);
    if (!isNaN(parsed.getTime())) {
      setActiveDate(parsed);
      setCalMonth(parsed.getMonth());
      setCalYear(parsed.getFullYear());
    }
  };

  // Direct Day, Month, Year dropdown changes
  const handleSelectDay = (day: number) => {
    const updated = new Date(activeDate);
    updated.setDate(day);
    applyDate(updated);
  };

  const handleSelectMonth = (monthIdx: number) => {
    const updated = new Date(activeDate);
    const maxDays = getDaysInGregorianMonth(updated.getFullYear(), monthIdx);
    if (updated.getDate() > maxDays) {
      updated.setDate(maxDays);
    }
    updated.setMonth(monthIdx);
    applyDate(updated);
  };

  const handleSelectYear = (year: number) => {
    const updated = new Date(activeDate);
    updated.setFullYear(year);
    applyDate(updated);
  };

  // Convert Khmer Lunar inputs to Solar Date
  const handleConvertLunarToSolar = () => {
    const start = new Date(khYear, 0, 1);
    let matched = activeDate;
    for (let i = 0; i < 366; i++) {
      const d = addDays(start, i);
      const info = KhmerLunarCalendarService.getKhmerDate(d);
      if (info.monthIndex === khMonthIdx && info.moonPhase === khPhase && info.day === khDay) {
        matched = d;
        break;
      }
    }
    applyDate(matched);
  };

  // Copy full Khmer string
  const handleCopy = () => {
    if (!result) return;
    const str = KhmerLunarCalendarService.formatKhmerString(result, language);
    navigator.clipboard.writeText(str);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Days in selected Gregorian month for dropdown
  const daysInCurrentMonth = getDaysInGregorianMonth(
    activeDate.getFullYear(),
    activeDate.getMonth()
  );

  // Mini calendar grid generation
  const miniCalDaysInMonth = getDaysInGregorianMonth(calYear, calMonth);
  const miniCalStartWeekday = getFirstDayOfWeekInMonth(calYear, calMonth);

  const miniCalWeekdays = ['អា', 'ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហ', 'សុក្រ', 'សៅរ៍'];

  const handleMiniCalPrevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((prev) => prev - 1);
    } else {
      setCalMonth((prev) => prev - 1);
    }
  };

  const handleMiniCalNextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((prev) => prev + 1);
    } else {
      setCalMonth((prev) => prev + 1);
    }
  };

  const handleMiniCalDayClick = (dayNum: number) => {
    const picked = new Date(calYear, calMonth, dayNum, 12, 0, 0);
    applyDate(picked);
  };

  return (
    <div className="w-full space-y-6">
      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-[#EDE8DC] dark:bg-[#071426] border border-[#C59B27]/30 dark:border-white/10 shadow-sm">
        <button
          type="button"
          onClick={() => setMode('solar-to-lunar')}
          className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            mode === 'solar-to-lunar'
              ? 'bg-[#C59B27] dark:bg-[#E8BF70] text-white dark:text-[#071426] shadow-md scale-[1.01]'
              : 'text-[#5D6B82] dark:text-[#A9B8CC] hover:text-[#0F1E36] dark:hover:text-[#F4F3EF]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>សុរិយគតិ ➔ ចន្ទគតិ (Solar to Lunar)</span>
        </button>
        <button
          type="button"
          onClick={() => setMode('lunar-to-solar')}
          className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            mode === 'lunar-to-solar'
              ? 'bg-[#C59B27] dark:bg-[#E8BF70] text-white dark:text-[#071426] shadow-md scale-[1.01]'
              : 'text-[#5D6B82] dark:text-[#A9B8CC] hover:text-[#0F1E36] dark:hover:text-[#F4F3EF]'
          }`}
        >
          <Moon className="w-4 h-4" />
          <span>ចន្ទគតិ ➔ សុរិយគតិ (Lunar to Solar)</span>
        </button>
      </div>

      {/* Main Interactive Control Card */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-[#C59B27]/30 dark:border-[#E8BF70]/25 shadow-xl space-y-5">
        {mode === 'solar-to-lunar' ? (
          <>
            {/* Header with Title and Reset */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#C59B27]/20 dark:border-white/10">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0F1E36] dark:text-[#F4F3EF] flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-[#9A7316] dark:text-[#E8BF70]" />
                  <span>ជ្រើសរើសកាលបរិច្ឆេទសកល (Click to Change Date)</span>
                </h3>
                <p className="text-xs text-[#5D6B82] dark:text-[#A9B8CC] mt-0.5">
                  ចុចប៊ូតុងខាងក្រោម ឬជ្រើសរើសថ្ងៃខែឆ្នាំ ដើម្បីបម្លែងភ្លាមៗ
                </p>
              </div>

              <button
                type="button"
                onClick={handleJumpToToday}
                className="px-3.5 py-1.5 rounded-xl bg-[#EAE4D5] dark:bg-[#142A4D] hover:bg-[#E0D8C5] dark:hover:bg-[#1E3E72] text-[#9A7316] dark:text-[#E8BF70] text-xs font-semibold border border-[#C59B27]/30 dark:border-[#E8BF70]/30 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ត្រឡប់មកថ្ងៃនេះ</span>
              </button>
            </div>

            {/* Stepper Toolbar with Clickable Day Shift Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-[#F4F0E6] dark:bg-[#071426] border border-[#C59B27]/20 dark:border-white/10">
              <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  type="button"
                  onClick={() => handleQuickStep(-1)}
                  className="px-3 py-2 rounded-xl bg-white dark:bg-[#0B1930] hover:bg-[#EDE8DC] dark:hover:bg-[#142A4D] text-[#0F1E36] dark:text-[#F4F3EF] text-xs font-bold border border-[#C59B27]/30 dark:border-white/10 transition-all cursor-pointer flex items-center gap-1 shadow-sm active:scale-95"
                  title="ថយ ១ ថ្ងៃ"
                >
                  <ChevronLeft className="w-4 h-4 text-[#9A7316] dark:text-[#E8BF70]" />
                  <span>ថយ ១ ថ្ងៃ</span>
                </button>

                <button
                  type="button"
                  onClick={handleJumpToToday}
                  className="px-4 py-2 rounded-xl bg-[#C59B27] dark:bg-[#E8BF70] text-white dark:text-[#071426] text-xs font-bold shadow-md transition-all cursor-pointer hover:brightness-105 active:scale-95"
                >
                  ថ្ងៃនេះ
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickStep(1)}
                  className="px-3 py-2 rounded-xl bg-white dark:bg-[#0B1930] hover:bg-[#EDE8DC] dark:hover:bg-[#142A4D] text-[#0F1E36] dark:text-[#F4F3EF] text-xs font-bold border border-[#C59B27]/30 dark:border-white/10 transition-all cursor-pointer flex items-center gap-1 shadow-sm active:scale-95"
                  title="ទៅមុខ ១ ថ្ងៃ"
                >
                  <span>ទៅមុខ ១ ថ្ងៃ</span>
                  <ChevronRight className="w-4 h-4 text-[#9A7316] dark:text-[#E8BF70]" />
                </button>
              </div>

              {/* Quick Jump Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-1 sm:py-0">
                <button
                  type="button"
                  onClick={() => handleJumpRelativeToday(-1)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/70 dark:bg-[#0B1930] hover:bg-white dark:hover:bg-[#142A4D] text-[#5D6B82] dark:text-[#A9B8CC] hover:text-[#0F1E36] dark:hover:text-[#F4F3EF] text-[11px] font-medium border border-[#C59B27]/20 dark:border-white/5 transition-all cursor-pointer whitespace-nowrap"
                >
                  ម្សិលមិញ
                </button>
                <button
                  type="button"
                  onClick={() => handleJumpRelativeToday(1)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/70 dark:bg-[#0B1930] hover:bg-white dark:hover:bg-[#142A4D] text-[#5D6B82] dark:text-[#A9B8CC] hover:text-[#0F1E36] dark:hover:text-[#F4F3EF] text-[11px] font-medium border border-[#C59B27]/20 dark:border-white/5 transition-all cursor-pointer whitespace-nowrap"
                >
                  ថ្ងៃស្អែក
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickStep(-7)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/70 dark:bg-[#0B1930] hover:bg-white dark:hover:bg-[#142A4D] text-[#5D6B82] dark:text-[#A9B8CC] hover:text-[#0F1E36] dark:hover:text-[#F4F3EF] text-[11px] font-medium border border-[#C59B27]/20 dark:border-white/5 transition-all cursor-pointer whitespace-nowrap"
                >
                  -៧ ថ្ងៃ
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickStep(7)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/70 dark:bg-[#0B1930] hover:bg-white dark:hover:bg-[#142A4D] text-[#5D6B82] dark:text-[#A9B8CC] hover:text-[#0F1E36] dark:hover:text-[#F4F3EF] text-[11px] font-medium border border-[#C59B27]/20 dark:border-white/5 transition-all cursor-pointer whitespace-nowrap"
                >
                  +៧ ថ្ងៃ
                </button>
                <button
                  type="button"
                  onClick={() => handleJumpMonths(1)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/70 dark:bg-[#0B1930] hover:bg-white dark:hover:bg-[#142A4D] text-[#5D6B82] dark:text-[#A9B8CC] hover:text-[#0F1E36] dark:hover:text-[#F4F3EF] text-[11px] font-medium border border-[#C59B27]/20 dark:border-white/5 transition-all cursor-pointer whitespace-nowrap"
                >
                  +១ ខែ
                </button>
                <button
                  type="button"
                  onClick={() => handleJumpYears(1)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/70 dark:bg-[#0B1930] hover:bg-white dark:hover:bg-[#142A4D] text-[#5D6B82] dark:text-[#A9B8CC] hover:text-[#0F1E36] dark:hover:text-[#F4F3EF] text-[11px] font-medium border border-[#C59B27]/20 dark:border-white/5 transition-all cursor-pointer whitespace-nowrap"
                >
                  +១ ឆ្នាំ
                </button>
              </div>
            </div>

            {/* Direct Selectors: Day, Month, Year Dropdowns + Native Input */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              {/* Day Dropdown */}
              <div className="sm:col-span-3">
                <label className="text-xs font-semibold text-[#5D6B82] dark:text-[#A9B8CC] block mb-1.5">
                  ថ្ងៃ (Day)
                </label>
                <select
                  value={activeDate.getDate()}
                  onChange={(e) => handleSelectDay(parseInt(e.target.value, 10))}
                  className="w-full bg-white dark:bg-[#071426] text-[#0F1E36] dark:text-[#F4F3EF] font-bold text-sm px-3.5 py-2.5 rounded-xl border border-[#C59B27]/30 dark:border-white/15 focus:outline-none focus:border-[#C59B27] dark:focus:border-[#E8BF70] shadow-sm cursor-pointer"
                >
                  {Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      ថ្ងៃទី {toKhmerNumeral(d)} ({d})
                    </option>
                  ))}
                </select>
              </div>

              {/* Month Dropdown */}
              <div className="sm:col-span-4">
                <label className="text-xs font-semibold text-[#5D6B82] dark:text-[#A9B8CC] block mb-1.5">
                  ខែ (Month)
                </label>
                <select
                  value={activeDate.getMonth()}
                  onChange={(e) => handleSelectMonth(parseInt(e.target.value, 10))}
                  className="w-full bg-white dark:bg-[#071426] text-[#0F1E36] dark:text-[#F4F3EF] font-bold text-sm px-3.5 py-2.5 rounded-xl border border-[#C59B27]/30 dark:border-white/15 focus:outline-none focus:border-[#C59B27] dark:focus:border-[#E8BF70] shadow-sm cursor-pointer"
                >
                  {SOLAR_MONTHS_KM.map((monthName, idx) => (
                    <option key={idx} value={idx}>
                      ខែ{monthName} ({SOLAR_MONTHS_EN[idx]})
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Dropdown */}
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#5D6B82] dark:text-[#A9B8CC] block mb-1.5">
                  ឆ្នាំ (Year)
                </label>
                <select
                  value={activeDate.getFullYear()}
                  onChange={(e) => handleSelectYear(parseInt(e.target.value, 10))}
                  className="w-full bg-white dark:bg-[#071426] text-[#0F1E36] dark:text-[#F4F3EF] font-bold text-sm px-3.5 py-2.5 rounded-xl border border-[#C59B27]/30 dark:border-white/15 focus:outline-none focus:border-[#C59B27] dark:focus:border-[#E8BF70] shadow-sm cursor-pointer"
                >
                  {Array.from({ length: 101 }, (_, i) => 1950 + i).map((y) => (
                    <option key={y} value={y}>
                      {toKhmerNumeral(y)} ({y})
                    </option>
                  ))}
                </select>
              </div>

              {/* Native Date Picker Input */}
              <div className="sm:col-span-3">
                <label className="text-xs font-semibold text-[#5D6B82] dark:text-[#A9B8CC] block mb-1.5">
                  កាលបរិច្ឆេទសកល
                </label>
                <input
                  type="date"
                  value={dateInput}
                  onChange={(e) => handleDateInputChange(e.target.value)}
                  className="w-full bg-white dark:bg-[#071426] text-[#0F1E36] dark:text-[#F4F3EF] font-medium text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-[#C59B27]/30 dark:border-white/15 focus:outline-none focus:border-[#C59B27] dark:focus:border-[#E8BF70] shadow-sm cursor-pointer"
                />
              </div>
            </div>

            {/* Toggle Button for Mini Calendar Grid */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowMiniCalendar((prev) => !prev)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#F4F0E6] dark:bg-[#0B1930] hover:bg-[#EAE4D5] dark:hover:bg-[#142A4D] text-[#0F1E36] dark:text-[#F4F3EF] text-xs font-bold border border-[#C59B27]/30 dark:border-white/10 transition-all cursor-pointer flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#9A7316] dark:text-[#E8BF70]" />
                  <span>
                    {showMiniCalendar
                      ? 'បិទផ្ទាំងប្រតិទិនជ្រើសរើសថ្ងៃ'
                      : 'ចុចទីនេះ ដើម្បីបើកផ្ទាំងប្រតិទិនជ្រើសរើសថ្ងៃ (Interactive Calendar Picker)'}
                  </span>
                </div>
                {showMiniCalendar ? (
                  <ChevronUp className="w-4 h-4 text-[#9A7316] dark:text-[#E8BF70]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#9A7316] dark:text-[#E8BF70]" />
                )}
              </button>
            </div>

            {/* Expandable Mini Interactive Calendar Picker Grid */}
            {showMiniCalendar && (
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#071426] border border-[#C59B27]/30 dark:border-white/10 shadow-lg animate-in fade-in duration-200">
                {/* Month/Year Navigation */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#C59B27]/20 dark:border-white/10">
                  <button
                    type="button"
                    onClick={handleMiniCalPrevMonth}
                    className="p-1.5 rounded-lg hover:bg-[#F4F0E6] dark:hover:bg-[#142A4D] text-[#0F1E36] dark:text-[#F4F3EF] transition-colors cursor-pointer"
                    title="ខែមុន"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#9A7316] dark:text-[#E8BF70]" />
                  </button>

                  <div className="text-center font-bold text-sm text-[#0F1E36] dark:text-[#F4F3EF]">
                    <span>ខែ{SOLAR_MONTHS_KM[calMonth]}</span>{' '}
                    <span>
                      ឆ្នាំ{toKhmerNumeral(calYear)} ({calYear})
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleMiniCalNextMonth}
                    className="p-1.5 rounded-lg hover:bg-[#F4F0E6] dark:hover:bg-[#142A4D] text-[#0F1E36] dark:text-[#F4F3EF] transition-colors cursor-pointer"
                    title="ខែបន្ទាប់"
                  >
                    <ChevronRight className="w-5 h-5 text-[#9A7316] dark:text-[#E8BF70]" />
                  </button>
                </div>

                {/* Weekday Labels Header */}
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {miniCalWeekdays.map((wd, i) => (
                    <div
                      key={i}
                      className="text-[11px] font-bold text-[#5D6B82] dark:text-[#A9B8CC] py-1"
                    >
                      {wd}
                    </div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {/* Empty offset slots */}
                  {Array.from({ length: miniCalStartWeekday }).map((_, i) => (
                    <div key={`empty-${i}`} className="p-2" />
                  ))}

                  {/* Days */}
                  {Array.from({ length: miniCalDaysInMonth }).map((_, i) => {
                    const dayNum = i + 1;
                    const dateObj = new Date(calYear, calMonth, dayNum, 12, 0, 0);
                    const isSelected = isSameDay(dateObj, activeDate);
                    const isToday = isSameDay(dateObj, new Date());
                    const dayLunar = KhmerLunarCalendarService.getKhmerDate(dateObj);

                    return (
                      <button
                        key={dayNum}
                        type="button"
                        onClick={() => handleMiniCalDayClick(dayNum)}
                        className={`group relative flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#C59B27] dark:bg-[#E8BF70] text-white dark:text-[#071426] font-bold shadow-md scale-105 z-10'
                            : isToday
                              ? 'bg-[#EAE4D5] dark:bg-[#142A4D] text-[#9A7316] dark:text-[#E8BF70] font-bold border border-[#C59B27]/40'
                              : 'hover:bg-[#F4F0E6] dark:hover:bg-[#142A4D]/60 text-[#0F1E36] dark:text-[#F4F3EF]'
                        }`}
                      >
                        <span className="text-xs sm:text-sm leading-tight">
                          {toKhmerNumeral(dayNum)}
                        </span>
                        <span
                          className={`text-[9px] truncate max-w-full leading-none mt-0.5 ${
                            isSelected
                              ? 'text-white/90 dark:text-[#071426]/90 font-medium'
                              : dayLunar.isObservanceDay
                                ? 'text-[#9A7316] dark:text-[#E8BF70] font-bold'
                                : 'text-[#5D6B82] dark:text-[#A9B8CC]'
                          }`}
                        >
                          {dayLunar.isObservanceDay
                            ? '🪷សីល'
                            : `${toKhmerNumeral(dayLunar.day)}${dayLunar.moonPhase === 'waxing' ? 'កើត' : 'រោច'}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Mode 2: Lunar to Solar Inputs */
          <div className="space-y-4">
            <div className="pb-3 border-b border-[#C59B27]/20 dark:border-white/10">
              <h3 className="text-base sm:text-lg font-bold text-[#0F1E36] dark:text-[#F4F3EF] flex items-center gap-2">
                <Moon className="w-5 h-5 text-[#9A7316] dark:text-[#E8BF70]" />
                <span>ជ្រើសរើសព័ត៌មានចន្ទគតិ (Select Khmer Lunar Date)</span>
              </h3>
              <p className="text-xs text-[#5D6B82] dark:text-[#A9B8CC] mt-0.5">
                ជ្រើសរើសថ្ងៃខ្នើត/រោច ខែ និងឆ្នាំ ដើម្បីស្វែងរកកាលបរិច្ឆេទសកល
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Day Selector */}
              <div>
                <label className="text-xs font-semibold text-[#5D6B82] dark:text-[#A9B8CC] block mb-1">
                  ចំនួនថ្ងៃ (Day 1-15)
                </label>
                <select
                  value={khDay}
                  onChange={(e) => setKhDay(parseInt(e.target.value, 10))}
                  className="w-full bg-white dark:bg-[#071426] text-[#0F1E36] dark:text-[#F4F3EF] text-sm font-bold px-3 py-2.5 rounded-xl border border-[#C59B27]/30 dark:border-white/10 focus:outline-none focus:border-[#C59B27] dark:focus:border-[#E8BF70] shadow-sm cursor-pointer"
                >
                  {Array.from({ length: 15 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      ថ្ងៃ {toKhmerNumeral(d)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phase Selector */}
              <div>
                <label className="text-xs font-semibold text-[#5D6B82] dark:text-[#A9B8CC] block mb-1">
                  ខ្នើត / រោច (Phase)
                </label>
                <select
                  value={khPhase}
                  onChange={(e) => setKhPhase(e.target.value as 'waxing' | 'waning')}
                  className="w-full bg-white dark:bg-[#071426] text-[#0F1E36] dark:text-[#F4F3EF] text-sm font-bold px-3 py-2.5 rounded-xl border border-[#C59B27]/30 dark:border-white/10 focus:outline-none focus:border-[#C59B27] dark:focus:border-[#E8BF70] shadow-sm cursor-pointer"
                >
                  <option value="waxing">ខ្នើត (កើត)</option>
                  <option value="waning">រោច</option>
                </select>
              </div>

              {/* Month Selector */}
              <div>
                <label className="text-xs font-semibold text-[#5D6B82] dark:text-[#A9B8CC] block mb-1">
                  ខែចន្ទគតិ (Month)
                </label>
                <select
                  value={khMonthIdx}
                  onChange={(e) => setKhMonthIdx(parseInt(e.target.value, 10))}
                  className="w-full bg-white dark:bg-[#071426] text-[#0F1E36] dark:text-[#F4F3EF] text-sm font-bold px-3 py-2.5 rounded-xl border border-[#C59B27]/30 dark:border-white/10 focus:outline-none focus:border-[#C59B27] dark:focus:border-[#E8BF70] shadow-sm cursor-pointer"
                >
                  {KHMER_LUNAR_MONTHS.map((name, idx) => (
                    <option key={idx} value={idx}>
                      ខែ{name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Selector */}
              <div>
                <label className="text-xs font-semibold text-[#5D6B82] dark:text-[#A9B8CC] block mb-1">
                  ឆ្នាំសកល (Year)
                </label>
                <select
                  value={khYear}
                  onChange={(e) => setKhYear(parseInt(e.target.value, 10))}
                  className="w-full bg-white dark:bg-[#071426] text-[#0F1E36] dark:text-[#F4F3EF] text-sm font-bold px-3 py-2.5 rounded-xl border border-[#C59B27]/30 dark:border-white/10 focus:outline-none focus:border-[#C59B27] dark:focus:border-[#E8BF70] shadow-sm cursor-pointer"
                >
                  {Array.from({ length: 41 }, (_, i) => 2010 + i).map((y) => (
                    <option key={y} value={y}>
                      {toKhmerNumeral(y)} ({y})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleConvertLunarToSolar}
              className="w-full py-3 rounded-2xl bg-[#C59B27] dark:bg-[#E8BF70] hover:brightness-105 text-white dark:text-[#071426] text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>ស្វែងរកកាលបរិច្ឆេទសកល (Convert to Solar Date)</span>
            </button>
          </div>
        )}
      </div>

      {/* Revamped Luxury Result Card */}
      {result && (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel-gold border border-[#C59B27]/40 dark:border-[#E8BF70]/30 shadow-2xl space-y-6 relative overflow-hidden group">
          {/* Subtle gold ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#E8BF70]/10 blur-3xl pointer-events-none" />

          {/* Result Card Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#C59B27]/20 dark:border-white/10 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#EAE4D5] dark:bg-[#142A4D] border border-[#C59B27]/40 dark:border-[#E8BF70]/40 flex items-center justify-center shadow-inner">
                <MoonPhaseDisc
                  day={result.day}
                  isWaxing={result.moonPhase === 'waxing'}
                  size={22}
                  glow
                />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#9A7316] dark:text-[#E8BF70] font-bold block">
                  លទ្ធផលចន្ទគតិខ្មែរ (Khmer Lunar Result)
                </span>
                <span className="text-[11px] text-[#5D6B82] dark:text-[#A9B8CC]">
                  ត្រឹមត្រូវតាមក្បួនខ្នាតប្រតិទិនជាតិ
                </span>
              </div>
            </div>

            {/* Stepper + Copy Button */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-[#F4F0E6] dark:bg-[#071426] p-1 rounded-xl border border-[#C59B27]/25 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => handleQuickStep(-1)}
                  className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-[#142A4D] text-[#0F1E36] dark:text-[#F4F3EF] transition-colors cursor-pointer"
                  title="ថយ ១ ថ្ងៃ"
                >
                  <ChevronLeft className="w-4 h-4 text-[#9A7316] dark:text-[#E8BF70]" />
                </button>
                <span className="text-[11px] font-bold text-[#5D6B82] dark:text-[#A9B8CC] px-1">
                  ផ្លាស់ប្ដូរថ្ងៃ
                </span>
                <button
                  type="button"
                  onClick={() => handleQuickStep(1)}
                  className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-[#142A4D] text-[#0F1E36] dark:text-[#F4F3EF] transition-colors cursor-pointer"
                  title="ទៅមុខ ១ ថ្ងៃ"
                >
                  <ChevronRight className="w-4 h-4 text-[#9A7316] dark:text-[#E8BF70]" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#C59B27] dark:bg-[#E8BF70] hover:brightness-105 text-white dark:text-[#071426] text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-white dark:text-emerald-950" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copied ? 'បានចម្លងរួច' : 'ចម្លង'}</span>
              </button>
            </div>
          </div>

          {/* Main Khmer Date Headline */}
          <div className="relative z-10 space-y-2">
            {/* Observance and Festival Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {result.isObservanceDay && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C59B27]/20 dark:bg-[#E8BF70]/20 text-[#9A7316] dark:text-[#E8BF70] border border-[#C59B27]/40 dark:border-[#E8BF70]/40 text-xs font-bold shadow-sm">
                  <BuddhaIcon className="w-3.5 h-3.5" />
                  <span>
                    ថ្ងៃសីល ({toKhmerNumeral(result.day)} {result.moonPhaseNameKm})
                  </span>
                </span>
              )}

              {result.festivalNames.map((fest, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 text-xs font-bold shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{fest}</span>
                </span>
              ))}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F1E36] dark:text-[#F4F3EF] leading-snug tracking-tight">
              ថ្ងៃ{result.dayOfWeekNameKm} {toKhmerNumeral(result.day)} {result.moonPhaseNameKm} ខែ
              {result.monthNameKm} ឆ្នាំ{result.animalYearNameKm} {result.sakNameKm} ព.ស.{' '}
              {toKhmerNumeral(result.beYear)}
            </h2>

            <p className="text-sm sm:text-base text-[#5D6B82] dark:text-[#A9B8CC] font-medium flex items-center gap-2 pt-1">
              <Calendar className="w-4 h-4 text-[#9A7316] dark:text-[#E8BF70]" />
              <span>
                ត្រូវនឹង {formatSolarDate(result.gregorianDate, language)} (កាលបរិច្ឆេទសកល)
              </span>
            </p>
          </div>

          {/* 4 Information Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#C59B27]/20 dark:border-white/10 relative z-10 text-xs">
            <div className="bg-[#F4F0E6] dark:bg-[#071426] p-3.5 rounded-2xl border border-[#C59B27]/20 dark:border-white/5 shadow-sm">
              <span className="text-[#5D6B82] dark:text-slate-400 block mb-1 font-medium">
                {t.converter.animalYear}
              </span>
              <span className="text-sm sm:text-base font-bold text-[#0F1E36] dark:text-[#F4F3EF]">
                ឆ្នាំ{result.animalYearNameKm} ({result.sakNameKm})
              </span>
            </div>

            <div className="bg-[#F4F0E6] dark:bg-[#071426] p-3.5 rounded-2xl border border-[#C59B27]/20 dark:border-white/5 shadow-sm">
              <span className="text-[#5D6B82] dark:text-slate-400 block mb-1 font-medium">
                {t.converter.buddhistEra}
              </span>
              <span className="text-sm sm:text-base font-bold text-[#9A7316] dark:text-[#E8BF70]">
                ព.ស. {toKhmerNumeral(result.beYear)}
              </span>
            </div>

            <div className="bg-[#F4F0E6] dark:bg-[#071426] p-3.5 rounded-2xl border border-[#C59B27]/20 dark:border-white/5 shadow-sm">
              <span className="text-[#5D6B82] dark:text-slate-400 block mb-1 font-medium">
                {t.converter.chulaEra}
              </span>
              <span className="text-sm sm:text-base font-bold text-[#0F1E36] dark:text-[#F4F3EF]">
                ច.ស. {toKhmerNumeral(result.jsYear)}
              </span>
            </div>

            <div className="bg-[#F4F0E6] dark:bg-[#071426] p-3.5 rounded-2xl border border-[#C59B27]/20 dark:border-white/5 shadow-sm">
              <span className="text-[#5D6B82] dark:text-slate-400 block mb-1 font-medium">
                ថ្ងៃចន្ទគតិ
              </span>
              <span className="text-sm sm:text-base font-bold text-[#9A7316] dark:text-[#E8BF70]">
                {toKhmerNumeral(result.day)} {result.moonPhaseNameKm}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
