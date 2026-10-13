import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../../hooks/use-language';
import { toKhmerNumeral } from '../utils/khmer-numerals';
import { IconButton } from '../../../components/ui/icon-button';

interface LunarMonthNavigationProps {
  year: number;
  monthIndex: number;
  lunarMonthNames: string[];
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

const SOLAR_MONTHS_KM = [
  'មករា',
  'កុម្ភៈ',
  'មីនា',
  'មេសា',
  'ឧសភា',
  'មិថុនា',
  'កក្កដា',
  'សីហា',
  'កញ្ញា',
  'តុលា',
  'វិច្ឆិកា',
  'ធ្នូ'
];

const SOLAR_MONTHS_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export function LunarMonthNavigation({
  year,
  monthIndex,
  lunarMonthNames,
  onPrevMonth,
  onNextMonth,
  onToday
}: LunarMonthNavigationProps) {
  const { language, t } = useLanguage();

  const monthName = language === 'km' ? SOLAR_MONTHS_KM[monthIndex] : SOLAR_MONTHS_EN[monthIndex];
  const yearDisplay = language === 'km' ? toKhmerNumeral(year) : String(year);
  const lunarSubtitle = lunarMonthNames.map((m) => `ខែ${m}`).join(' / ');

  return (
    <div className="flex items-center justify-between gap-2 p-2.5 sm:p-4 rounded-2xl glass-panel mb-3 sm:mb-6">
      <div className="flex items-center gap-1 sm:gap-2">
        <IconButton ariaLabel={t.calendar.prevMonth} onClick={onPrevMonth} variant="secondary">
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </IconButton>

        <div className="text-left px-1 sm:px-2">
          <div className="text-base sm:text-2xl font-bold text-[#F4F3EF] flex items-center gap-1.5 sm:gap-2 leading-tight">
            <span>{monthName}</span>
            <span className="text-[#E8BF70]">{yearDisplay}</span>
          </div>
          {lunarSubtitle && (
            <p className="text-[11px] sm:text-sm text-[#A9B8CC] font-medium tracking-wide leading-tight mt-0.5">
              {lunarSubtitle}
            </p>
          )}
        </div>

        <IconButton ariaLabel={t.calendar.nextMonth} onClick={onNextMonth} variant="secondary">
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </IconButton>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToday}
          className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-[#142A4D] hover:bg-[#1E3E72] text-[11px] sm:text-xs font-semibold text-[#E8BF70] border border-[#E8BF70]/30 transition-all active:scale-95 cursor-pointer shadow-sm shrink-0"
        >
          <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>{t.calendar.todayBtn}</span>
        </button>
      </div>
    </div>
  );
}
