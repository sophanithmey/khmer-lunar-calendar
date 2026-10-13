import { useState } from 'react';
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from '../hooks/use-language';
import { AppHeader } from '../components/layout/app-header';
import { AppFooter } from '../components/layout/app-footer';
import { AppRouter } from './app-router';

function AppLayout() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const navigate = useNavigate();
  const location = useLocation();

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
      <AppHeader activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="flex-1 w-full">
        <AppRouter onTabChange={handleTabChange} />
      </main>
      <AppFooter />
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
