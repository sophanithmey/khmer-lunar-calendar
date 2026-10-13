import { Calendar, Compass, ArrowLeftRight, BookOpen } from 'lucide-react';
import { LotusIcon } from '../icons/lotus-icon';
import { useLanguage } from '../../hooks/use-language';

interface AppNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  isMobile?: boolean;
}

export function AppNavigation({
  activeTab,
  onTabChange,
  className = '',
  isMobile = false
}: AppNavigationProps) {
  const { t } = useLanguage();

  const navItems = [
    { id: 'calendar', label: t.nav.calendar, icon: Calendar },
    { id: 'explorer', label: t.nav.moonExplorer, icon: Compass },
    { id: 'converter', label: t.nav.converter, icon: ArrowLeftRight },
    { id: 'festivals', label: t.nav.festivals, icon: LotusIcon },
    { id: 'knowledge', label: t.nav.knowledge, icon: BookOpen }
  ];

  return (
    <nav className={`flex ${isMobile ? 'flex-col gap-1' : 'items-center gap-1.5'} ${className}`}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onTabChange(item.id)}
            className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-[#142A4D] text-[#E8BF70] shadow-sm border border-[#E8BF70]/30'
                : 'text-[#A9B8CC] hover:text-[#F4F3EF] hover:bg-white/5 border border-transparent'
            }`}
          >
            <Icon
              className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#E8BF70]' : 'text-[#A9B8CC]'}`}
            />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
