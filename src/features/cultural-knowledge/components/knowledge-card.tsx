import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import type { CulturalArticle } from '../types/article.types';
import { useLanguage } from '../../../hooks/use-language';
import { Badge } from '../../../components/ui/badge';

interface KnowledgeCardProps {
  article: CulturalArticle;
}

export function KnowledgeCard({ article }: KnowledgeCardProps) {
  const { language, t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const title = language === 'km' ? article.titleKm : article.titleEn;
  const summary = language === 'km' ? article.summaryKm : article.summaryEn;
  const category = language === 'km' ? article.categoryKm : article.categoryEn;
  const paragraphs = language === 'km' ? article.contentKm : article.contentEn;

  return (
    <article className="p-6 sm:p-7 rounded-3xl glass-panel hover:border-[#E8BF70]/30 transition-all duration-300 shadow-lg">
      <div className="flex items-center justify-between gap-3 mb-3">
        <Badge variant="gold">
          <BookOpen className="w-3 h-3 text-[#E8BF70]" />
          <span>{category}</span>
        </Badge>
        <span className="flex items-center gap-1 text-[11px] text-[#A9B8CC]">
          <Clock className="w-3 h-3" />
          <span>
            {article.readTimeMinutes} {t.knowledge.readTime}
          </span>
        </span>
      </div>

      <h3 className="text-xl font-bold text-[#F4F3EF] mb-2 leading-snug">{title}</h3>
      <p className="text-sm text-[#A9B8CC] leading-relaxed mb-4">{summary}</p>

      {expanded && (
        <div className="space-y-3 pt-4 border-t border-white/10 text-sm text-[#F4F3EF]/90 leading-relaxed animate-in fade-in duration-200">
          {paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#E8BF70] hover:underline cursor-pointer"
      >
        <span>{expanded ? 'បិទអាន' : 'អានបន្ត'}</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
    </article>
  );
}
