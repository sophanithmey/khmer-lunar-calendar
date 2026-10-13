import { FestivalList } from '../features/festivals/components/festival-list';
import { SectionHeading } from '../components/ui/section-heading';
import { useLanguage } from '../hooks/use-language';

export function FestivalsPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SectionHeading
        badge="ថ្ងៃសីល និងបុណ្យជាតិ"
        title={t.festivals.title}
        subtitle={t.festivals.subtitle}
      />
      <FestivalList />
    </div>
  );
}
