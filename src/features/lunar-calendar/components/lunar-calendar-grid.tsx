import { useState } from 'react';
import type { CalendarMonthData, KhmerDayInfo } from '../types/lunar-date.types';
import { useLanguage } from '../../../hooks/use-language';
import { LunarDayCell } from './lunar-day-cell';
import { LunarMonthNavigation } from './lunar-month-navigation';
import { TodayKhmerTimeBanner } from './today-khmer-time-banner';
import { LunarDateDetailModal } from './lunar-date-detail-modal';
import { BuddhaIcon } from '../../../components/icons/buddha-icon';
import { isSameDay } from '../../../lib/date-utils';
import { Info } from 'lucide-react';

interface LunarCalendarGridProps {
  monthData: CalendarMonthData;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

const WEEKDAYS_KM = ['អាទិត្យ', 'ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'];
const WEEKDAYS_SHORT_KM = ['អា', 'ច', 'អ', 'ពុ', 'ព្រ', 'សុ', 'ស'];
const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEKDAYS_SHORT_EN = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function LunarCalendarGrid({
  monthData,
  selectedDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  onToday
}: LunarCalendarGridProps) {
  const { language, t } = useLanguage();
  const [modalDay, setModalDay] = useState<KhmerDayInfo | null>(null);

  const handleCellClick = (dayInfo: KhmerDayInfo) => {
    onSelectDate(dayInfo.gregorianDate);
    setModalDay(dayInfo);
  };

  const weekdays = language === 'km' ? WEEKDAYS_KM : WEEKDAYS_EN;
  const shortWeekdays = language === 'km' ? WEEKDAYS_SHORT_KM : WEEKDAYS_SHORT_EN;

  return (
    <div className="w-full">
      {/* Today's Full Khmer Date, Daytime & Live Clock */}
      <TodayKhmerTimeBanner onSelectToday={onToday} />

      {/* Month Navigation */}
      <LunarMonthNavigation
        year={monthData.gregorianYear}
        monthIndex={monthData.gregorianMonth}
        lunarMonthNames={monthData.lunarMonthNames}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
        onToday={onToday}
      />

      {/* Weekdays Header */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center">
        {weekdays.map((wd, index) => (
          <div
            key={wd}
            className={`py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg sm:rounded-xl ${
              index === 0 || index === 6 ? 'text-[#E8BF70]/90 font-bold' : 'text-[#A9B8CC]'
            }`}
          >
            <span className="sm:hidden">{shortWeekdays[index]}</span>
            <span className="hidden sm:inline">{wd}</span>
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {monthData.days.map((dayInfo, idx) => {
          if (!dayInfo) {
            return (
              <div
                key={`empty-${idx}`}
                className="min-h-[62px] sm:min-h-[88px] rounded-xl sm:rounded-2xl bg-[#0B1930]/20 border border-transparent"
              />
            );
          }

          const isSelected = isSameDay(dayInfo.gregorianDate, selectedDate);
          return (
            <LunarDayCell
              key={dayInfo.gregorianDate.toISOString()}
              dayInfo={dayInfo}
              isSelected={isSelected}
              onSelect={handleCellClick}
            />
          );
        })}
      </div>

      {/* Legends and Month Rules info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 text-[11px] sm:text-xs text-[#A9B8CC]">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-amber-500/30 border border-amber-500/50 flex items-center justify-center shrink-0">
              <BuddhaIcon className="w-2.5 h-2.5 text-amber-300" />
            </span>
            <span>{t.calendar.observanceLegend}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
            <span>{t.calendar.festivalLegend}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400">
          <Info className="w-3.5 h-3.5 text-[#E8BF70] shrink-0" />
          <span>{t.calendar.selectPrompt}</span>
        </div>
      </div>

      {/* Detail Inspection Modal */}
      <LunarDateDetailModal dayInfo={modalDay} onClose={() => setModalDay(null)} />
    </div>
  );
}
