import { useState } from 'react';
import { Search } from 'lucide-react';
import { FestivalService } from '../services/festival-service';
import type { FestivalCategory } from '../types/festival.types';
import { FestivalCard } from './festival-card';
import { useLanguage } from '../../../hooks/use-language';

export function FestivalList() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<FestivalCategory | 'all'>('all');

  const filteredFestivals = FestivalService.filter(searchQuery, categoryFilter);

  return (
    <div className="space-y-6">
      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#A9B8CC] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.festivals.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#071426] text-[#F4F3EF] pl-10 pr-4 py-2 rounded-xl border border-white/10 text-xs sm:text-sm focus:outline-none focus:border-[#E8BF70]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
              categoryFilter === 'all'
                ? 'bg-[#142A4D] text-[#E8BF70] border border-[#E8BF70]/30'
                : 'text-[#A9B8CC] hover:text-[#F4F3EF] hover:bg-white/5'
            }`}
          >
            {t.festivals.filterAll}
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter('buddhist')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
              categoryFilter === 'buddhist'
                ? 'bg-[#142A4D] text-[#E8BF70] border border-[#E8BF70]/30'
                : 'text-[#A9B8CC] hover:text-[#F4F3EF] hover:bg-white/5'
            }`}
          >
            {t.festivals.filterBuddhist}
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter('national')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
              categoryFilter === 'national'
                ? 'bg-[#142A4D] text-[#E8BF70] border border-[#E8BF70]/30'
                : 'text-[#A9B8CC] hover:text-[#F4F3EF] hover:bg-white/5'
            }`}
          >
            {t.festivals.filterNational}
          </button>
        </div>
      </div>

      {/* Festivals Grid */}
      {filteredFestivals.length === 0 ? (
        <div className="text-center py-12 glass-panel rounded-2xl text-sm text-[#A9B8CC]">
          រកមិនឃើញពិធីបុណ្យដែលត្រូវនឹងពាក្យស្វែងរកឡើយ &bull; No festivals match your query
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFestivals.map((fest) => (
            <FestivalCard key={fest.id} festival={fest} />
          ))}
        </div>
      )}
    </div>
  );
}
