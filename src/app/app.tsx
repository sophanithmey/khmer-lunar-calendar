import { useState } from 'react';
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from '../hooks/use-language';
import { AppHeader } from '../components/layout/app-header';
import { AppFooter } from '../components/layout/app-footer';
import { AppRouter } from './app-router';
import { usePWA } from '../hooks/use-pwa';
import { PwaInstallBanner } from '../components/pwa/pwa-install-banner';
import { PwaOfflineIndicator } from '../components/pwa/pwa-offline-indicator';
import { PwaUpdatePrompt } from '../components/pwa/pwa-update-prompt';
import { PwaIosModal } from '../components/pwa/pwa-ios-modal';

function AppLayout() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [showIosModal, setShowIosModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pwa = usePWA();

  const handleInstallClick = async () => {
    const res = await pwa.promptInstall();
    if (res === 'ios' || pwa.isIOS) {
      setShowIosModal(true);
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'home') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (location.pathname === '/') {
      const el = document.getElementById(tabId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate(`/${tabId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#071426] text-[#F4F3EF] selection:bg-[#E8BF70]/30 selection:text-[#E8BF70]">
      <AppHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isInstallable={pwa.isInstallable}
        isInstalled={pwa.isInstalled}
        isOffline={pwa.isOffline}
        onInstallClick={handleInstallClick}
      />
      <main className="flex-1 w-full">
        <AppRouter onTabChange={handleTabChange} />
      </main>
      <AppFooter />

      {/* PWA Enhancements: Install Banner, Offline Status, Update Notification & iOS Help */}
      <PwaInstallBanner
        isInstallable={pwa.isInstallable}
        isInstalled={pwa.isInstalled}
        isDismissed={pwa.isDismissed}
        isIOS={pwa.isIOS}
        onPromptInstall={pwa.promptInstall}
        onDismiss={pwa.dismissPrompt}
      />
      <PwaOfflineIndicator isOffline={pwa.isOffline} />
      <PwaUpdatePrompt needRefresh={pwa.needRefresh} onUpdate={pwa.updateApp} />
      <PwaIosModal isOpen={showIosModal} onClose={() => setShowIosModal(false)} />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppLayout />
      </LanguageProvider>
    </BrowserRouter>
  );
}
