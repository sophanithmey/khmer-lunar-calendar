import { useState, useEffect } from 'react';
import { Sun, Moon, Clock, CalendarDays } from 'lucide-react';
import { BuddhaIcon } from '../../../components/icons/buddha-icon';
import { useLanguage } from '../../../hooks/use-language';
import { KhmerLunarCalendarService } from '../services/lunar-calendar-service';
import { getKhmerTimeInfo, getKhmerSolarDateString } from '../../../lib/khmer-time-utils';

interface TodayKhmerTimeBannerProps {
  onSelectToday?: () => void;
  className?: string;
}

export function TodayKhmerTimeBanner({ onSelectToday, className = '' }: TodayKhmerTimeBannerProps) {
  const { language } = useLanguage();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Update live clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeInfo = getKhmerTimeInfo(currentDate);
  const todayKhmerInfo = KhmerLunarCalendarService.getKhmerDate(currentDate);
  const fullKhmerLunarStr = KhmerLunarCalendarService.formatKhmerString(todayKhmerInfo, language);
  const solarDateStr = getKhmerSolarDateString(currentDate, language);

  const isDaytime = currentDate.getHours() >= 6 && currentDate.getHours() < 18;
  const DaytimeIcon = isDaytime ? Sun : Moon;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl glass-panel-gold p-3.5 sm:p-5 border border-[#E8BF70]/30 shadow-2xl mb-4 sm:mb-6 bg-gradient-to-r from-[#0B1930]/95 via-[#142A4D]/80 to-[#0B1930]/95 ${className}`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-48 h-48 rounded-full bg-[#E8BF70]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        {/* Left Side: Today's Date in Khmer */}
        <div className="space-y-1 sm:space-y-1.5 flex-1">
          {/* Badge & Observance Notification */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl bg-[#E8BF70]/20 text-[#E8BF70] text-[10px] sm:text-xs font-bold border border-[#E8BF70]/30 tracking-wide uppercase">
              <CalendarDays className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{language === 'km' ? 'ថ្ងៃនេះ' : 'Today'}</span>
            </span>

            {todayKhmerInfo.isObservanceDay && (
              <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg sm:rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] sm:text-xs font-semibold shadow-sm animate-pulse">
                <BuddhaIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
                <span>{language === 'km' ? 'ថ្ងៃនេះជាថ្ងៃសីល' : 'Buddhist Holy Day'}</span>
              </span>
            )}

            {todayKhmerInfo.festivalNames.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] sm:text-xs font-semibold">
                <span>{todayKhmerInfo.festivalNames.join(', ')}</span>
              </span>
            )}
          </div>

          {/* Full Traditional Khmer Lunar Date */}
          <h2 className="text-base sm:text-xl md:text-2xl font-bold text-[#F4F3EF] leading-snug tracking-tight">
            {fullKhmerLunarStr}
          </h2>

          {/* Gregorian Solar Equivalent */}
          <p className="text-[11px] sm:text-sm text-[#A9B8CC] flex flex-wrap items-center gap-1 sm:gap-2">
            <span>
              {language === 'km' ? `ត្រូវនឹង ${solarDateStr}` : `Corresponds to ${solarDateStr}`}
            </span>
            {onSelectToday && (
              <button
                type="button"
                onClick={onSelectToday}
                className="text-[11px] sm:text-xs text-[#E8BF70] hover:underline font-medium cursor-pointer ml-1"
              >
                ({language === 'km' ? 'មើលលើប្រតិទិន' : 'View on calendar'})
              </button>
            )}
          </p>
        </div>

        {/* Right Side: Daytime Period & Live Clock in Khmer */}
        <div className="flex items-center shrink-0 self-start md:self-center">
          <div className="inline-flex items-center gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#071426]/80 border border-[#E8BF70]/25 shadow-inner">
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border shadow-sm shrink-0 ${
                isDaytime
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
              }`}
            >
              <DaytimeIcon className="w-4 h-4 sm:w-5 sm:h-5 animate-spin-slow" />
            </div>

            <div>
              {/* Daytime Period (ពេលព្រឹក, ពេលរសៀល, etc.) */}
              <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-[#E8BF70] font-semibold">
                <Clock className="w-3 h-3 text-[#E8BF70]" />
                <span>
                  {language === 'km'
                    ? timeInfo.daytimeCategoryKm
                    : `${timeInfo.daytimeCategoryEn} (${timeInfo.periodEn})`}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              </div>

              {/* Formatted Live Time in Khmer */}
              <div className="text-sm sm:text-base md:text-lg font-bold text-[#F4F3EF] tracking-wider font-mono">
                {language === 'km'
                  ? timeInfo.formattedTimeWithSecondsKm
                  : timeInfo.formattedTimeWithSecondsEn}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
