import { CULTURAL_ARTICLES } from '../data/articles';
import { KnowledgeCard } from './knowledge-card';

export function KnowledgeList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {CULTURAL_ARTICLES.map((article) => (
        <KnowledgeCard key={article.id} article={article} />
      ))}
    </div>
  );
}
