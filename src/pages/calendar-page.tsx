import { LunarCalendarGrid } from '../features/lunar-calendar/components/lunar-calendar-grid';
import { SectionHeading } from '../components/ui/section-heading';
import { useLunarCalendar } from '../features/lunar-calendar/hooks/use-lunar-calendar';
import { useLanguage } from '../hooks/use-language';

export function CalendarPage() {
  const { t } = useLanguage();
  const { selectedDate, monthData, goToPrevMonth, goToNextMonth, goToToday, selectDate } =
    useLunarCalendar();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SectionHeading
        badge="ប្រតិទិនចន្ទគតិ"
        title={t.calendar.title}
        subtitle={t.calendar.subtitle}
      />
      <div className="glass-panel p-6 sm:p-8 rounded-3xl">
        <LunarCalendarGrid
          monthData={monthData}
          selectedDate={selectedDate}
          onSelectDate={selectDate}
          onPrevMonth={goToPrevMonth}
          onNextMonth={goToNextMonth}
          onToday={goToToday}
        />
      </div>
    </div>
  );
}
