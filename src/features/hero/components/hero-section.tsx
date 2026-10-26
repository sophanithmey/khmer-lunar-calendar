import { useState } from 'react';
import {
  CalendarSearch,
  Moon,
  Sun,
  Globe,
  Calendar,
  ArrowRightLeft,
  BookOpen,
  Info
} from 'lucide-react';
import { LotusIcon } from '../../../components/icons/lotus-icon';
import { useLanguage } from '../../../hooks/use-language';
import { formatIsoDate, parseIsoDate } from '../../../lib/date-utils';

interface HeroSectionProps {
  onDateSelect: (date: Date) => void;
  onNavigateSection: (sectionId: string) => void;
}

export function HeroSection({ onDateSelect, onNavigateSection }: HeroSectionProps) {
  const { language, toggleLanguage } = useLanguage();
  const [dateQuery, setDateQuery] = useState(formatIsoDate(new Date()));
  const [isDark, setIsDark] = useState(true);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dateQuery) {
      const parsed = parseIsoDate(dateQuery);
      if (!isNaN(parsed.getTime())) {
        onDateSelect(parsed);
      }
    }
  };

  const quickPills = [
    {
      id: 'converter',
      title: 'បម្លែងកាលបរិច្ឆេទ',
      subtitle: 'Gregorian ↔ Khmer',
      icon: ArrowRightLeft
    },
    {
      id: 'explorer',
      title: 'មើលដំណាក់កាលព្រះចន្ទ',
      subtitle: 'Moon Phases',
      icon: Moon
    },
    {
      id: 'festivals',
      title: 'ថ្ងៃសីល & ពិធីបុណ្យ',
      subtitle: 'Buddhist Festivals',
      icon: LotusIcon
    },
    {
      id: 'knowledge',
      title: 'ចំណេះដឹង',
      subtitle: 'Knowledge',
      icon: BookOpen
    }
  ];

  return (
    <section className="relative overflow-hidden border-b border-[#E8BF70]/20 min-h-[440px] sm:min-h-[500px]">
      {/* Cinematic Angkor Wat Full Moon Background with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: 'url(/angkor-moon-hero.jpg)'
        }}
      />
      {/* Atmospheric dark gradient overlays to ensure text clarity */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071426]/85 via-[#071426]/75 to-[#071426] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#071426]/90 via-transparent to-[#071426]/80 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 relative z-10">
        {/* Top Bar inside Hero */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#142A4D] to-[#E8BF70]/30 border-2 border-[#E8BF70]/50 flex items-center justify-center shadow-xl shadow-[#E8BF70]/10">
              <Moon className="w-6 h-6 text-[#E8BF70]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#F4F3EF] leading-tight tracking-tight font-moul">
                ប្រតិទិនចន្ទគតិខ្មែរ
              </h1>
              <p className="text-xs sm:text-sm text-[#E8BF70] font-medium tracking-wide">
                Khmer Lunar Calendar
              </p>
            </div>
          </div>

          {/* Top Right Controls: Theme & Language */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              aria-label="Toggle theme"
              className="p-2 rounded-xl bg-[#0B1930]/80 hover:bg-[#142A4D] border border-white/10 text-[#E8BF70] transition-colors cursor-pointer"
            >
              {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B1930]/80 hover:bg-[#142A4D] border border-[#E8BF70]/30 text-xs font-semibold text-[#E8BF70] transition-all cursor-pointer shadow-sm"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'km' ? 'ខ្មែរ ▾' : 'EN ▾'}</span>
            </button>
          </div>
        </div>

        {/* Hero Tagline Row & Cultural Poetic Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-6">
          <div className="lg:col-span-8">
            {/* Tagline */}
            <p className="text-sm sm:text-base text-[#F4F3EF] font-medium tracking-wide mb-6 flex flex-wrap items-center gap-2">
              <span className="text-[#E8BF70]">ស្គាល់ថ្ងៃសីល</span>
              <span className="text-[#A9B8CC]">•</span>
              <span className="text-[#F4F3EF]">ស្គាល់ថ្ងៃបុណ្យ</span>
              <span className="text-[#A9B8CC]">•</span>
              <span className="text-[#E8BF70]">ស្គាល់ដំណើរព្រះចន្ទ</span>
            </p>

            {/* Navigation Quick Action Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
              {quickPills.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onNavigateSection(item.id)}
                    className="flex flex-col text-left p-3 rounded-2xl glass-panel-subtle hover:bg-[#142A4D]/80 border border-white/10 hover:border-[#E8BF70]/40 transition-all duration-200 cursor-pointer shadow-sm group"
                  >
                    <Icon className="w-4 h-4 text-[#E8BF70] mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-[#F4F3EF] leading-tight">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-[#A9B8CC] mt-0.5 font-light">
                      {item.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Cultural Quote Banner */}
          <div className="lg:col-span-4 text-right hidden lg:block">
            <blockquote className="p-4 rounded-2xl glass-panel-subtle border border-[#E8BF70]/20 inline-block max-w-sm text-left">
              <p className="text-sm text-[#F4F3EF] italic font-serif leading-relaxed drop-shadow">
                &ldquo;សព្វេ សង្ខារា អនិច្ចា — សង្ខារទាំងពួង មិនទៀងទេ&rdquo;
              </p>
              <span className="text-[11px] text-[#E8BF70] block mt-1 font-sans">
                — ធម្មបទ គាថាទី ២៧៧
              </span>
            </blockquote>
          </div>
        </div>

        {/* Quick Date Search Card */}
        <div className="mt-8 max-w-md">
          <form
            onSubmit={handleSearchSubmit}
            className="p-3.5 rounded-2xl glass-panel border border-[#E8BF70]/30 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#E8BF70]">
              <Calendar className="w-3.5 h-3.5" />
              <span>ស្វែងរកថ្ងៃខែឆ្នាំ</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dateQuery}
                onChange={(e) => setDateQuery(e.target.value)}
                className="w-full bg-[#071426] text-[#F4F3EF] text-sm px-3.5 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#E8BF70] transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#E8BF70] hover:bg-[#d4ac5d] text-[#071426] text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                <CalendarSearch className="w-3.5 h-3.5" />
                <span>ស្វែងរក</span>
              </button>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-[#A9B8CC]">
              <Info className="w-3 h-3 text-[#E8BF70]" />
              <span>ជ្រើសរើសថ្ងៃខែឆ្នាំសុរិយគតិ ដើម្បីមើលថ្ងៃខែចន្ទគតិ</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
