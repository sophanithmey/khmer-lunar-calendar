import { useState } from 'react';
import { Menu, X, Globe, Moon, Download, WifiOff } from 'lucide-react';
import { useLanguage } from '../../hooks/use-language';
import { AppNavigation } from './app-navigation';

interface AppHeaderProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  isInstallable?: boolean;
  isInstalled?: boolean;
  isOffline?: boolean;
  onInstallClick?: () => void;
}

export function AppHeader({
  activeTab,
  onTabChange,
  isInstallable = false,
  isInstalled = false,
  isOffline = false,
  onInstallClick
}: AppHeaderProps) {
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

        {/* Actions: Install, Offline Badge, Language Toggle & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Offline Badge */}
          {isOffline && (
            <span
              title={t.pwa.offlineNotice}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-medium"
            >
              <WifiOff className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{t.pwa.offlineBadge}</span>
            </span>
          )}

          {/* Install Button (Desktop & Mobile header) */}
          {isInstallable && !isInstalled && onInstallClick && (
            <button
              type="button"
              onClick={onInstallClick}
              title={t.pwa.installApp}
              aria-label={t.pwa.installApp}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#E8BF70]/20 to-[#C59B27]/20 hover:from-[#E8BF70]/30 hover:to-[#C59B27]/30 text-xs font-semibold text-[#E8BF70] border border-[#E8BF70]/40 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t.pwa.installApp}</span>
            </button>
          )}

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
        <div className="lg:hidden border-t border-white/10 bg-[#071426] px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          <AppNavigation activeTab={activeTab} onTabChange={handleSelectTab} isMobile />

          {/* Mobile Install Option */}
          {isInstallable && !isInstalled && onInstallClick && (
            <div className="pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  onInstallClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#E8BF70] to-[#C59B27] text-[#071426] font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{t.pwa.installApp}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
