import { LunarCalendarGrid } from '../features/lunar-calendar/components/lunar-calendar-grid';
import { LunarDashboard } from '../features/lunar-dashboard/components/lunar-dashboard';
import { MoonPhaseView } from '../features/moon-explorer/components/moon-phase-view';
import { DateConverterForm } from '../features/date-converter/components/date-converter-form';
import { FestivalList } from '../features/festivals/components/festival-list';
import { KnowledgeList } from '../features/cultural-knowledge/components/knowledge-list';
import { SectionHeading } from '../components/ui/section-heading';
import { useLunarCalendar } from '../features/lunar-calendar/hooks/use-lunar-calendar';
import { useMoonPhase } from '../features/moon-explorer/hooks/use-moon-phase';
import { useLanguage } from '../hooks/use-language';

interface HomePageProps {
  onNavigateSection: (sectionId: string) => void;
}

export function HomePage({ onNavigateSection }: HomePageProps) {
  const { t } = useLanguage();
  const {
    selectedDate,
    selectedDateInfo,
    monthData,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    selectDate
  } = useLunarCalendar();

  const astroInfo = useMoonPhase(selectedDate);

  return (
    <div className="pt-6 sm:pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* 1. Primary Interactive Khmer Lunar Calendar (Moved to the Top!) */}
        <section id="calendar" className="scroll-mt-20">
          {/* <SectionHeading
            badge="ប្រតិទិន &bull; Calendar"
            title={t.calendar.title}
            subtitle={t.calendar.subtitle}
          /> */}
          <div className="glass-panel p-2.5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-[#E8BF70]/20 shadow-2xl">
            <LunarCalendarGrid
              monthData={monthData}
              selectedDate={selectedDate}
              onSelectDate={selectDate}
              onPrevMonth={goToPrevMonth}
              onNextMonth={goToNextMonth}
              onToday={goToToday}
            />
          </div>
        </section>

        {/* 2. Primary Lunar Dashboard (30-Day Cycle + Astronomy + Tools) */}
        <section id="dashboard" className="scroll-mt-20">
          <SectionHeading
            badge="ចន្ទគតិ &bull; Lunar Cycle"
            title="វដ្ដព្រះចន្ទ និងតារាសាស្ត្រប្រចាំថ្ងៃ"
            subtitle="Today's Lunar Phase, Astronomy & Cultural Tools"
          />
          <LunarDashboard
            khmerInfo={selectedDateInfo}
            astroInfo={astroInfo}
            selectedDate={selectedDate}
            onDateChange={selectDate}
            onNavigateSection={onNavigateSection}
          />
        </section>

        {/* 3. Moon and Earth Explorer */}
        <section id="explorer" className="scroll-mt-24">
          <SectionHeading
            badge="តារាសាស្ត្រ &bull; Astronomy"
            title={t.explorer.title}
            subtitle={t.explorer.subtitle}
          />
          <MoonPhaseView
            astroInfo={astroInfo}
            khmerInfo={selectedDateInfo}
            selectedDate={selectedDate}
            onDateChange={selectDate}
          />
        </section>

        {/* 4. Date Converter */}
        <section id="converter" className="scroll-mt-24">
          <SectionHeading
            badge="បម្លែង &bull; Convert"
            title={t.converter.title}
            subtitle={t.converter.subtitle}
          />
          <DateConverterForm />
        </section>

        {/* 5. Observance Days & Festivals */}
        <section id="festivals" className="scroll-mt-24">
          <SectionHeading
            badge="ប្រពៃណី &bull; Festivals"
            title={t.festivals.title}
            subtitle={t.festivals.subtitle}
          />
          <FestivalList />
        </section>

        {/* 6. Cultural Knowledge Articles */}
        <section id="knowledge" className="scroll-mt-24">
          <SectionHeading
            badge="ចំណេះដឹង &bull; Heritage"
            title={t.knowledge.title}
            subtitle={t.knowledge.subtitle}
          />
          <KnowledgeList />
        </section>
      </div>
    </div>
  );
}
