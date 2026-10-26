import type { KhmerDayInfo } from '../../lunar-calendar/types/lunar-date.types';
import type { MoonAstronomyInfo } from '../../moon-explorer/types/astronomy.types';
import { LunarCycleOverviewCard } from './lunar-cycle-overview-card';
import { CurrentDayAstronomyCard } from './current-day-astronomy-card';
import { HolyDaysFestivalsCard } from './holy-days-festivals-card';
import { KhmerMonthsCard } from './khmer-months-card';

interface LunarDashboardProps {
  khmerInfo: KhmerDayInfo;
  astroInfo: MoonAstronomyInfo;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export function LunarDashboard({
  khmerInfo,
  astroInfo,
  selectedDate,
  onDateChange
}: LunarDashboardProps) {
  const handleSelectLunarDay = (targetDay: number, targetIsWaxing: boolean) => {
    // Calculate approximate date offset from current lunar day
    const currentDay = khmerInfo.day;
    const currentIsWaxing = khmerInfo.moonPhase === 'waxing';

    // Current lunar day index (1-15 for waxing, 16-30 for waning)
    const currentLunarIndex = currentIsWaxing ? currentDay : 15 + currentDay;
    const targetLunarIndex = targetIsWaxing ? targetDay : 15 + targetDay;
    const dayDiff = targetLunarIndex - currentLunarIndex;

    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + dayDiff);
    onDateChange(newDate);
  };

  return (
    <div className="w-full space-y-6">
      {/* SECTION 1: TOP ROW (Lunar Cycle Overview + Current Astronomy Card) */}
      <section aria-label="Lunar Overview" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 xl:col-span-7">
          <LunarCycleOverviewCard khmerInfo={khmerInfo} onSelectLunarDay={handleSelectLunarDay} />
        </div>
        <div className="lg:col-span-5 xl:col-span-5">
          <CurrentDayAstronomyCard khmerInfo={khmerInfo} astroInfo={astroInfo} />
        </div>
      </section>

      {/* SECTION 2: BOTTOM ROW (Holy Days + 12 Khmer Months) */}
      <section
        aria-label="Heritage and Holy Days"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <HolyDaysFestivalsCard />
        <KhmerMonthsCard currentMonthIndex={khmerInfo.monthIndex} />
      </section>
    </div>
  );
}
