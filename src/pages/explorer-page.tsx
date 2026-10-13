import { useState } from 'react';
import { MoonPhaseView } from '../features/moon-explorer/components/moon-phase-view';
import { SectionHeading } from '../components/ui/section-heading';
import { useMoonPhase } from '../features/moon-explorer/hooks/use-moon-phase';
import { useLunarDate } from '../features/lunar-calendar/hooks/use-lunar-date';
import { useLanguage } from '../hooks/use-language';

export function ExplorerPage() {
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const astroInfo = useMoonPhase(currentDate);
  const khmerInfo = useLunarDate(currentDate);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SectionHeading
        badge="តារាសាស្ត្រព្រះចន្ទ"
        title={t.explorer.title}
        subtitle={t.explorer.subtitle}
      />
      <MoonPhaseView
        astroInfo={astroInfo}
        khmerInfo={khmerInfo}
        selectedDate={currentDate}
        onDateChange={setCurrentDate}
      />
    </div>
  );
}
