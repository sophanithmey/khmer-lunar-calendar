import { DateConverterForm } from '../features/date-converter/components/date-converter-form';
import { SectionHeading } from '../components/ui/section-heading';
import { useLanguage } from '../hooks/use-language';

export function ConverterPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SectionHeading
        badge="បម្លែងកាលបរិច្ឆេទ"
        title={t.converter.title}
        subtitle={t.converter.subtitle}
      />
      <DateConverterForm />
    </div>
  );
}
