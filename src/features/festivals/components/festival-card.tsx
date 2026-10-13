import { Calendar, Flag, Star } from 'lucide-react';
import type { FestivalItem } from '../types/festival.types';
import { useLanguage } from '../../../hooks/use-language';
import { Badge } from '../../../components/ui/badge';
import { BuddhaIcon } from '../../../components/icons/buddha-icon';
import { SOLAR_MONTHS_KM, SOLAR_MONTHS_EN } from '../../../lib/khmer-time-utils';
import { toKhmerNumeral } from '../../lunar-calendar/utils/khmer-numerals';

interface FestivalCardProps {
  festival: FestivalItem;
}

export function FestivalCard({ festival }: FestivalCardProps) {
  const { language } = useLanguage();

  const title = language === 'km' ? festival.nameKm : festival.nameEn;
  const description = language === 'km' ? festival.descriptionKm : festival.descriptionEn;
  const rule = language === 'km' ? festival.lunarRuleKm : festival.lunarRuleEn;

  return (
    <div className="p-6 rounded-3xl glass-panel hover:border-[#C59B27]/40 dark:hover:border-[#E8BF70]/30 transition-all duration-300 flex flex-col justify-between group shadow-lg">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant={festival.category === 'buddhist' ? 'sil' : 'gold'}>
            {festival.category === 'buddhist' ? (
              <BuddhaIcon className="w-3 h-3" />
            ) : (
              <Flag className="w-3 h-3" />
            )}
            <span>{festival.category === 'buddhist' ? 'បុណ្យសាសនា' : 'បុណ្យជាតិ'}</span>
          </Badge>

          {festival.isPublicHoliday && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 dark:border-emerald-500/20">
              {language === 'km' ? 'ថ្ងៃឈប់សម្រាក' : 'Public Holiday'}
            </span>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-[#0F1E36] dark:text-[#F4F3EF] mb-2 group-hover:text-[#9A7316] dark:group-hover:text-[#E8BF70] transition-colors">
          {title}
        </h3>

        {rule && (
          <div className="flex items-center gap-1.5 text-xs text-[#9A7316] dark:text-[#E8BF70] font-medium mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>{rule}</span>
          </div>
        )}

        {festival.solarMonth && festival.solarDay && (
          <div className="flex items-center gap-1.5 text-xs text-sky-700 dark:text-sky-300 font-medium mb-3">
            <Star className="w-3.5 h-3.5" />
            <span>
              {language === 'km'
                ? `ថ្ងៃទី${toKhmerNumeral(festival.solarDay)} ខែ${SOLAR_MONTHS_KM[festival.solarMonth - 1] ?? ''}`
                : `${SOLAR_MONTHS_EN[festival.solarMonth - 1] ?? ''} ${festival.solarDay}`}
            </span>
          </div>
        )}

        <p className="text-xs sm:text-sm text-[#5D6B82] dark:text-[#A9B8CC] leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}
