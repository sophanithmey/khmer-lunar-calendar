import { useState } from 'react';
import { Menu, X, Globe, Moon } from 'lucide-react';
import { useLanguage } from '../../hooks/use-language';
import { AppNavigation } from './app-navigation';

interface AppHeaderProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function AppHeader({ activeTab, onTabChange }: AppHeaderProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectTab = (tabId: string) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-[#E8BF70]/15 bg-[#071426]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          onClick={() => handleSelectTab('home')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#142A4D] to-[#0B1930] border border-[#E8BF70]/40 flex items-center justify-center shadow-lg shadow-[#E8BF70]/5 group-hover:border-[#E8BF70] transition-colors">
            <Moon className="w-5 h-5 text-[#E8BF70] transform group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-full bg-[#E8BF70]/10 blur-sm pointer-events-none" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-[#F4F3EF] block leading-none font-serif">
              {t.appTitle}
            </span>
            <span className="text-xs text-[#A9B8CC] block mt-1 tracking-wider font-light">
              {t.appSubtitle}
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2">
          <AppNavigation activeTab={activeTab} onTabChange={handleSelectTab} />
        </div>

        {/* Actions: Language Toggle & Mobile Hamburger */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label="Toggle language"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B1930] hover:bg-[#142A4D] text-xs font-semibold text-[#E8BF70] border border-[#E8BF70]/30 transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'km' ? 'EN' : 'ខ្មែរ'}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-xl text-[#A9B8CC] hover:text-[#F4F3EF] hover:bg-white/5 border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#071426] px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <AppNavigation activeTab={activeTab} onTabChange={handleSelectTab} isMobile />
        </div>
      )}
    </header>
  );
}
