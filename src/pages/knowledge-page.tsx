import { KnowledgeList } from '../features/cultural-knowledge/components/knowledge-list';
import { SectionHeading } from '../components/ui/section-heading';
import { useLanguage } from '../hooks/use-language';

export function KnowledgePage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SectionHeading
        badge="ចំណេះដឹងវប្បធម៌"
        title={t.knowledge.title}
        subtitle={t.knowledge.subtitle}
      />
      <KnowledgeList />
    </div>
  );
}
