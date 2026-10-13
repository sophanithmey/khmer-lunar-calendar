import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, Flag, Moon } from 'lucide-react';
import { BuddhaIcon } from '../../../components/icons/buddha-icon';
import type { KhmerDayInfo } from '../types/lunar-date.types';
import { useLanguage } from '../../../hooks/use-language';
import { formatSolarDate } from '../../../lib/formatters';
import { KhmerLunarCalendarService } from '../services/lunar-calendar-service';

interface LunarDateDetailModalProps {
  dayInfo: KhmerDayInfo | null;
  onClose: () => void;
}

export function LunarDateDetailModal({ dayInfo, onClose }: LunarDateDetailModalProps) {
  const { language } = useLanguage();

  useEffect(() => {
    if (!dayInfo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dayInfo, onClose]);

  if (!dayInfo) return null;

  const fullKhmerStr = KhmerLunarCalendarService.formatKhmerString(dayInfo, language);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-3xl glass-panel-gold p-6 sm:p-8 shadow-2xl border border-[#E8BF70]/30 animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-xl text-[#A9B8CC] hover:text-[#F4F3EF] hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Moon className="w-5 h-5 text-[#E8BF70]" />
          <span className="text-xs uppercase tracking-wider text-[#E8BF70] font-semibold">
            ព័ត៌មានលម្អិត &bull; Details
          </span>
        </div>

        <h3 className="text-2xl font-bold text-[#F4F3EF] mb-2 leading-snug">{fullKhmerStr}</h3>

        <div className="flex items-center gap-2 text-sm text-[#A9B8CC] mb-6">
          <Calendar className="w-4 h-4 text-[#E8BF70]" />
          <span>{formatSolarDate(dayInfo.gregorianDate, language)}</span>
        </div>

        <div className="space-y-3 pt-4 border-t border-white/10 text-sm">
          {dayInfo.isObservanceDay && (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
              <BuddhaIcon className="w-5 h-5 text-amber-300 shrink-0" />
              <div>
                <p className="font-semibold text-xs sm:text-sm">
                  ថ្ងៃសីល (Buddhist Observance Day)
                </p>
                <p className="text-xs text-amber-200/80">
                  {dayInfo.day} {dayInfo.moonPhaseNameKm} &bull; ថ្ងៃបរិសុទ្ធសម្រាប់បំពេញកុសល
                </p>
              </div>
            </div>
          )}

          {dayInfo.festivalNames.length > 0 && (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200">
              <Flag className="w-5 h-5 text-rose-300 shrink-0" />
              <div>
                <p className="font-semibold text-xs sm:text-sm">ពិធីបុណ្យជាតិ / សាសនា</p>
                <p className="text-xs text-rose-200/90 font-medium">
                  {dayInfo.festivalNames.join(', ')}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-[#A9B8CC]">
            <div className="bg-[#0B1930] p-2.5 rounded-xl border border-white/5">
              <span className="block text-slate-400">ពុទ្ធសករាជ (B.E.)</span>
              <span className="font-bold text-[#F4F3EF] text-sm">{dayInfo.beYear}</span>
            </div>
            <div className="bg-[#0B1930] p-2.5 rounded-xl border border-white/5">
              <span className="block text-slate-400">ចុល្លសករាជ (J.S.)</span>
              <span className="font-bold text-[#F4F3EF] text-sm">{dayInfo.jsYear}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#142A4D] hover:bg-[#1E3E72] text-[#F4F3EF] text-sm font-semibold transition-colors"
          >
            យល់ព្រម &bull; Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
