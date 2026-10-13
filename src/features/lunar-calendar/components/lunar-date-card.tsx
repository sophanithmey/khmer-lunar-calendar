import { Moon, Calendar, Orbit } from 'lucide-react';
import { BuddhaIcon } from '../../../components/icons/buddha-icon';
import type { KhmerDayInfo } from '../types/lunar-date.types';
import type { MoonAstronomyInfo } from '../../moon-explorer/types/astronomy.types';
import { useLanguage } from '../../../hooks/use-language';
import { toKhmerNumeral } from '../utils/khmer-numerals';
import { formatSolarDate, formatIllumination } from '../../../lib/formatters';
import { Badge } from '../../../components/ui/badge';

interface LunarDateCardProps {
  khmerInfo: KhmerDayInfo;
  astroInfo: MoonAstronomyInfo;
  onExploreMoon?: () => void;
  className?: string;
}

export function LunarDateCard({
  khmerInfo,
  astroInfo,
  onExploreMoon,
  className = ''
}: LunarDateCardProps) {
  const { language, t } = useLanguage();

  const dayDisplay = language === 'km' ? toKhmerNumeral(khmerInfo.day) : String(khmerInfo.day);
  const phaseLabel = language === 'km' ? khmerInfo.moonPhaseNameKm : khmerInfo.moonPhaseNameEn;
  const monthLabel = language === 'km' ? khmerInfo.monthNameKm : khmerInfo.monthNameEn;
  const animalYearLabel =
    language === 'km' ? khmerInfo.animalYearNameKm : khmerInfo.animalYearNameEn;
  const sakLabel = language === 'km' ? khmerInfo.sakNameKm : khmerInfo.sakNameEn;
  const beYearDisplay =
    language === 'km' ? toKhmerNumeral(khmerInfo.beYear) : String(khmerInfo.beYear);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl glass-panel-gold p-6 sm:p-8 shadow-2xl ${className}`}
    >
      {/* Background glow & subtle star accent */}
      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#E8BF70]/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-[#142A4D]/40 blur-3xl pointer-events-none" />

      {/* Top Header: Gregorian date & Observance badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#A9B8CC]">
          <Calendar className="w-4 h-4 text-[#E8BF70]" />
          <span>{formatSolarDate(khmerInfo.gregorianDate, language)}</span>
        </div>

        {khmerInfo.isObservanceDay && (
          <Badge variant="sil" className="animate-pulse">
            <BuddhaIcon className="w-3.5 h-3.5 text-[#E8BF70]" />
            <span>{t.todayCard.observanceDayNotice}</span>
          </Badge>
        )}
      </div>

      {/* Main Focus: Traditional Khmer Lunar Day */}
      <div className="my-6">
        <span className="text-xs uppercase tracking-widest text-[#E8BF70] font-semibold block mb-1">
          {t.todayCard.khmerLunar}
        </span>
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F4F3EF] tracking-tight">
            ថ្ងៃ{khmerInfo.dayOfWeekNameKm} {dayDisplay} {phaseLabel}
          </h1>
          <span className="text-xl sm:text-2xl text-[#E8BF70] font-medium">ខែ{monthLabel}</span>
        </div>
        <p className="text-sm sm:text-base text-[#A9B8CC] mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>ឆ្នាំ{animalYearLabel}</span>
          <span>&bull;</span>
          <span>{sakLabel}</span>
          <span>&bull;</span>
          <span>ព.ស. {beYearDisplay}</span>
        </p>
      </div>

      {/* Grid: Distinguished Astronomical Data */}
      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A9B8CC] flex items-center gap-1.5">
            <Orbit className="w-4 h-4 text-[#E8BF70]" />
            <span>{t.todayCard.astronomyPhase}</span>
          </span>
          {onExploreMoon && (
            <button
              type="button"
              onClick={onExploreMoon}
              className="text-xs text-[#E8BF70] hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <Moon className="w-3.5 h-3.5" />
              <span>{t.hero.explore3D}</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
          <div className="bg-[#0B1930]/80 p-3 rounded-2xl border border-white/5">
            <span className="text-[#A9B8CC] block text-xs mb-1">{t.todayCard.illumination}</span>
            <span className="text-base font-bold text-[#F4F3EF]">
              {formatIllumination(astroInfo.phaseFraction, language)}
            </span>
          </div>

          <div className="bg-[#0B1930]/80 p-3 rounded-2xl border border-white/5">
            <span className="text-[#A9B8CC] block text-xs mb-1">{t.explorer.phaseName}</span>
            <span className="text-xs sm:text-sm font-semibold text-[#E8BF70] truncate block">
              {language === 'km' ? astroInfo.phaseNameKm : astroInfo.phaseNameEn}
            </span>
          </div>

          <div className="bg-[#0B1930]/80 p-3 rounded-2xl border border-white/5">
            <span className="text-[#A9B8CC] block text-xs mb-1">{t.todayCard.nextFullMoon}</span>
            <span className="text-xs sm:text-sm font-medium text-[#F4F3EF] block">
              {formatSolarDate(astroInfo.nextFullMoon, language)}
            </span>
          </div>

          <div className="bg-[#0B1930]/80 p-3 rounded-2xl border border-white/5">
            <span className="text-[#A9B8CC] block text-xs mb-1">{t.todayCard.nextNewMoon}</span>
            <span className="text-xs sm:text-sm font-medium text-[#F4F3EF] block">
              {formatSolarDate(astroInfo.nextNewMoon, language)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
