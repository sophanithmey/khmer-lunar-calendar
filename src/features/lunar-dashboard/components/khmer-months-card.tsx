import { useState } from 'react';
import { Moon, Sparkles, Sun, CloudRain, Snowflake } from 'lucide-react';
import { toKhmerNumeral } from '../../lunar-calendar/utils/khmer-numerals';

interface KhmerMonthsCardProps {
  currentMonthIndex?: number;
  onSelectMonth?: (index: number) => void;
}

export function KhmerMonthsCard({
  currentMonthIndex = 10, // Default Assoch (អស្សុជ)
  onSelectMonth
}: KhmerMonthsCardProps) {
  const [selectedIdx, setSelectedIdx] = useState(currentMonthIndex);

  // 12 Traditional Khmer Lunar Months in sequence
  // Odd months = 29 days (ខែខ្វះ), Even months = 30 days (ខែពេញ)
  const KHMER_MONTHS = [
    {
      num: 1,
      idx: 0,
      name: 'មិគសិរ',
      days: 29,
      season: 'រដូវរងា (Cool)',
      seasonType: 'cool',
      highlight: 'ខែទី១ នៃប្រតិទិនចន្ទគតិ ត្រៀមច្រូតកាត់'
    },
    {
      num: 2,
      idx: 1,
      name: 'បុស្ស',
      days: 30,
      season: 'រដូវរងា (Cool)',
      seasonType: 'cool',
      highlight: 'ខែត្រជាក់ ក្រោយរដូវច្រូតកាត់ និងប្រមូលផល'
    },
    {
      num: 3,
      idx: 2,
      name: 'មាឃ',
      days: 29,
      season: 'រដូវក្ដៅ (Dry)',
      seasonType: 'dry',
      highlight: 'ពិធីបុណ្យមាឃបូជា (១៥ កើត ខែមាឃ)'
    },
    {
      num: 4,
      idx: 3,
      name: 'ផល្គុន',
      days: 30,
      season: 'រដូវក្ដៅ (Dry)',
      seasonType: 'dry',
      highlight: 'ចុងឆ្នាំចាស់ ត្រៀមទទួលទេវតាឆ្នាំថ្មី'
    },
    {
      num: 5,
      idx: 4,
      name: 'ចេត្រ',
      days: 29,
      season: 'រដូវក្ដៅ (Dry)',
      seasonType: 'dry',
      highlight: 'ពិធីបុណ្យចូលឆ្នាំថ្មីប្រពៃណីជាតិខ្មែរ'
    },
    {
      num: 6,
      idx: 5,
      name: 'ពិសាខ',
      days: 30,
      season: 'រដូវវស្សា (Monsoon)',
      seasonType: 'monsoon',
      highlight: 'បុណ្យវិសាខបូជា & ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល'
    },
    {
      num: 7,
      idx: 6,
      name: 'ជេស្ឋ',
      days: 29,
      season: 'រដូវវស្សា (Monsoon)',
      seasonType: 'monsoon',
      highlight: 'ខែចាប់ផ្ដើមរដូវវស្សា និងការបង្កបង្កើនផល'
    },
    {
      num: 8,
      idx: 7,
      name: 'អាសាឍ',
      days: 30,
      season: 'រដូវវស្សា (Monsoon)',
      seasonType: 'monsoon',
      highlight: 'ពិធីបុណ្យចូលព្រះវស្សារបស់ព្រះសង្ឃ'
    },
    {
      num: 9,
      idx: 8,
      name: 'ស្រាពណ៍',
      days: 29,
      season: 'រដូវវស្សា (Monsoon)',
      seasonType: 'monsoon',
      highlight: 'ខែពាក់កណ្ដាលព្រះវស្សា ទឹកជំនន់ទន្លេមេគង្គ'
    },
    {
      num: 10,
      idx: 9,
      name: 'ភទ្របទ',
      days: 30,
      season: 'រដូវវស្សា (Monsoon)',
      seasonType: 'monsoon',
      highlight: 'ពិធីបុណ្យកាន់បិណ្ឌ និងបុណ្យភ្ជុំបិណ្ឌធំ'
    },
    {
      num: 11,
      idx: 10,
      name: 'អស្សុជ',
      days: 29,
      season: 'រដូវរងា (Cool)',
      seasonType: 'cool',
      highlight: 'ពិធីបុណ្យចេញវស្សា & ពិធីបុណ្យអុំទូកធំ'
    },
    {
      num: 12,
      idx: 11,
      name: 'កត្តិក',
      days: 30,
      season: 'រដូវរងា (Cool)',
      seasonType: 'cool',
      highlight: 'ពិធីបុណ្យសំពះព្រះខែ អកអំបុក & កឋិនទាន'
    }
  ];

  const handleMonthClick = (idx: number) => {
    setSelectedIdx(idx);
    onSelectMonth?.(idx);
  };

  const activeMonth = KHMER_MONTHS[selectedIdx] ?? KHMER_MONTHS[10]!;

  const getSeasonIcon = (type: string) => {
    switch (type) {
      case 'cool':
        return <Snowflake className="w-3.5 h-3.5 text-sky-300" />;
      case 'dry':
        return <Sun className="w-3.5 h-3.5 text-amber-300" />;
      case 'monsoon':
        return <CloudRain className="w-3.5 h-3.5 text-teal-300" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#E8BF70]" />;
    }
  };

  return (
    <div className="rounded-3xl glass-panel p-6 border border-[#E8BF70]/25 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#E8BF70]/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#142A4D] to-[#E8BF70]/20 border border-[#E8BF70]/40 flex items-center justify-center text-[#E8BF70] shadow-md shrink-0">
              <Moon className="w-5 h-5 text-[#E8BF70]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F4F3EF] leading-snug">
                ខែចន្ទគតិខ្មែរ
              </h3>
              <p className="text-xs text-[#A9B8CC]">12 Lunar Months Cycle</p>
            </div>
          </div>

          <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#142A4D]/80 border border-[#E8BF70]/30 text-[#E8BF70] font-bold">
            ១២ ខែ
          </span>
        </div>

        {/* 4x3 Interactive Months Grid */}
        <div className="grid grid-cols-4 gap-2 my-4">
          {KHMER_MONTHS.map((m) => {
            const isSelected = selectedIdx === m.idx;
            return (
              <button
                key={m.idx}
                type="button"
                onClick={() => handleMonthClick(m.idx)}
                className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-200 cursor-pointer text-center ${
                  isSelected
                    ? 'bg-[#142A4D] text-[#E8BF70] border-2 border-[#E8BF70] shadow-lg shadow-[#E8BF70]/25 scale-105 z-10'
                    : 'bg-[#0B1930]/85 text-[#F4F3EF] hover:bg-[#142A4D]/70 border border-white/5 hover:border-[#E8BF70]/30'
                }`}
              >
                {/* Month Number & Day count */}
                <div className="flex items-center justify-between w-full px-1 text-[9px] text-[#A9B8CC]">
                  <span className="font-mono text-[#E8BF70]">{toKhmerNumeral(m.num)}</span>
                  <span>{m.days}ថ្ងៃ</span>
                </div>

                {/* Month Name */}
                <span
                  className={`text-xs font-bold mt-0.5 leading-tight ${
                    isSelected ? 'text-[#E8BF70]' : 'text-[#F4F3EF]'
                  }`}
                >
                  {m.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Month Cultural Banner */}
      <div className="mt-2 relative rounded-2xl overflow-hidden border border-[#E8BF70]/35 bg-[#0B1930] p-4 text-center shadow-lg group">
        {/* Landscape Angkor Wat backdrop image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: 'url(/angkor-moon-hero.jpg)' }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/90 via-[#071426]/70 to-[#071426]/60 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-sm font-extrabold text-[#F4F3EF] drop-shadow">
              ខែ{activeMonth.name}
            </span>
            <span className="text-xs text-[#E8BF70]">•</span>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#142A4D]/80 border border-white/10 text-[10px] text-[#F4F3EF]">
              {getSeasonIcon(activeMonth.seasonType)}
              <span>{activeMonth.season}</span>
            </div>
          </div>

          <p className="text-xs font-semibold text-[#E8BF70] mt-1 leading-snug drop-shadow">
            {activeMonth.highlight}
          </p>

          <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-[#A9B8CC]">
            <span>មាន {activeMonth.days} ថ្ងៃ</span>
            <span>•</span>
            <span className="text-[#E8BF70] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#E8BF70]" />
              <span>ប្រពៃណីខ្មែរ</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
