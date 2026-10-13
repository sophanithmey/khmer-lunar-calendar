import type { KhmerDayInfo } from '../types/lunar-date.types';
import { useLanguage } from '../../../hooks/use-language';
import { toKhmerNumeral } from '../utils/khmer-numerals';
import { isSameDay } from '../../../lib/date-utils';
import { BuddhaIcon } from '../../../components/icons/buddha-icon';

interface LunarDayCellProps {
  dayInfo: KhmerDayInfo;
  isSelected: boolean;
  onSelect: (day: KhmerDayInfo) => void;
}

export function LunarDayCell({ dayInfo, isSelected, onSelect }: LunarDayCellProps) {
  const { language } = useLanguage();
  const isToday = isSameDay(dayInfo.gregorianDate, new Date());

  const solarDay = dayInfo.gregorianDate.getDate();
  const khDayNumeral = toKhmerNumeral(dayInfo.day);
  const isWaxing = dayInfo.moonPhase === 'waxing';

  // State styling
  let containerClasses = 'bg-[#0B1930]/60 hover:bg-[#142A4D]/80 border-white/5';
  if (isSelected) {
    containerClasses = 'bg-[#142A4D] border-[#E8BF70] ring-2 ring-[#E8BF70]/50 shadow-lg';
  } else if (isToday) {
    containerClasses = 'bg-[#142A4D]/80 border-[#E8BF70]/60 shadow-md ring-1 ring-[#E8BF70]/30';
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(dayInfo)}
      aria-label={`Gregorian ${solarDay}, Khmer ${dayInfo.day} ${dayInfo.moonPhaseNameKm}`}
      className={`relative min-h-[62px] sm:min-h-[88px] p-1.5 sm:p-2 rounded-xl sm:rounded-2xl flex flex-col justify-between text-left transition-all duration-200 border cursor-pointer active:scale-95 group overflow-hidden ${containerClasses}`}
    >
      {/* Top row: Gregorian day & Sil badge */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-1">
          <span className={`text-[10px] sm:text-xs font-semibold ${isToday ? 'text-[#E8BF70] font-bold' : 'text-[#A9B8CC]'}`}>
            {solarDay}
          </span>
          {isToday && (
            <>
              <span className="hidden sm:inline-flex px-1 py-0.5 text-[9px] font-bold rounded bg-[#E8BF70]/20 text-[#E8BF70] border border-[#E8BF70]/40 leading-none">
                {language === 'km' ? 'ថ្ងៃនេះ' : 'Today'}
              </span>
              <span className="sm:hidden w-1.5 h-1.5 rounded-full bg-[#E8BF70] shadow-sm animate-pulse" title="ថ្ងៃនេះ" />
            </>
          )}
        </div>

        {dayInfo.isObservanceDay && (
          <span
            title="ថ្ងៃសីល (Buddhist Holy Day)"
            className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shrink-0"
          >
            <BuddhaIcon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-amber-300" />
          </span>
        )}
      </div>

      {/* Center: Khmer Lunar Day */}
      <div className="text-center my-0.5 sm:my-1">
        <span className="text-base sm:text-2xl font-bold text-[#F4F3EF] block leading-none group-hover:text-[#E8BF70] transition-colors">
          {khDayNumeral}
        </span>
        <span
          className={`text-[9px] sm:text-xs font-medium block mt-0.5 sm:mt-1 truncate leading-tight ${isWaxing ? 'text-amber-200/90' : 'text-slate-400'}`}
        >
          {language === 'km' ? dayInfo.moonPhaseNameKm : dayInfo.moonPhaseNameEn}
        </span>
      </div>

      {/* Bottom: Festival indicator tag if any */}
      <div className="min-h-[8px] sm:min-h-[14px] flex items-center justify-center">
        {dayInfo.festivalNames.length > 0 && (
          <span
            className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-rose-400 animate-ping inline-block"
            title={dayInfo.festivalNames.join(', ')}
          />
        )}
      </div>
    </button>
  );
}
