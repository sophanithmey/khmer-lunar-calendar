import { Calendar, Compass, ArrowLeftRight, BookOpen } from 'lucide-react';
import { LotusIcon } from '../../../components/icons/lotus-icon';
import { useLanguage } from '../../../hooks/use-language';

interface HeroQuickLinksProps {
  onNavigate: (sectionId: string) => void;
}

export function HeroQuickLinks({ onNavigate }: HeroQuickLinksProps) {
  const { t } = useLanguage();

  const links = [
    { id: 'calendar', label: t.nav.calendar, icon: Calendar, color: 'text-amber-300' },
    { id: 'explorer', label: t.nav.moonExplorer, icon: Compass, color: 'text-sky-300' },
    { id: 'converter', label: t.nav.converter, icon: ArrowLeftRight, color: 'text-emerald-300' },
    { id: 'festivals', label: t.nav.festivals, icon: LotusIcon, color: 'text-purple-300' },
    { id: 'knowledge', label: t.nav.knowledge, icon: BookOpen, color: 'text-blue-300' }
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-8">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <button
            key={link.id}
            type="button"
            onClick={() => onNavigate(link.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-panel-subtle hover:bg-[#142A4D]/80 text-[#F4F3EF] hover:text-[#E8BF70] text-xs sm:text-sm font-medium transition-all duration-200 border border-white/10 hover:border-[#E8BF70]/40 shadow-sm active:scale-95 cursor-pointer"
          >
            <Icon className={`w-4 h-4 ${link.color}`} />
            <span>{link.label}</span>
          </button>
        );
      })}
    </div>
  );
}
