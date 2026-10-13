import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../../hooks/use-language';
import { addDays, formatIsoDate } from '../../../lib/date-utils';
import { formatSolarDate } from '../../../lib/formatters';

interface DateTimelineProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  className?: string;
}

export function DateTimeline({ currentDate, onDateChange, className = '' }: DateTimelineProps) {
  const { language, t } = useLanguage();

  const handleStep = (days: number) => {
    onDateChange(addDays(currentDate, days));
  };

  const handleReset = () => {
    onDateChange(new Date());
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel ${className}`}
    >
      {/* Date display & step buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleStep(-1)}
          aria-label={t.explorer.stepPrevDay}
          className="p-2 rounded-xl bg-[#0B1930] hover:bg-[#142A4D] text-[#A9B8CC] hover:text-[#F4F3EF] border border-white/10 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center px-4">
          <span className="text-sm font-semibold text-[#F4F3EF] block">
            {formatSolarDate(currentDate, language)}
          </span>
          <span className="text-xs text-[#A9B8CC] block font-mono">
            {formatIsoDate(currentDate)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => handleStep(1)}
          aria-label={t.explorer.stepNextDay}
          className="p-2 rounded-xl bg-[#0B1930] hover:bg-[#142A4D] text-[#A9B8CC] hover:text-[#F4F3EF] border border-white/10 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Jump / Reset Today */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#142A4D] hover:bg-[#1E3E72] text-xs font-semibold text-[#E8BF70] border border-[#E8BF70]/30 transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.explorer.resetToday}</span>
        </button>
      </div>
    </div>
  );
}
