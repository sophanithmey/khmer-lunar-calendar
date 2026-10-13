import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { HomePage } from '../pages/home-page';
import { CalendarPage } from '../pages/calendar-page';
import { ExplorerPage } from '../pages/explorer-page';
import { ConverterPage } from '../pages/converter-page';
import { FestivalsPage } from '../pages/festivals-page';
import { KnowledgePage } from '../pages/knowledge-page';

interface AppRouterProps {
  onTabChange: (tabId: string) => void;
}

export function AppRouter({ onTabChange }: AppRouterProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateSection = (sectionId: string) => {
    onTabChange(sectionId);
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate(`/${sectionId === 'home' ? '' : sectionId}`);
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage onNavigateSection={handleNavigateSection} />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/explorer" element={<ExplorerPage />} />
      <Route path="/converter" element={<ConverterPage />} />
      <Route path="/festivals" element={<FestivalsPage />} />
      <Route path="/knowledge" element={<KnowledgePage />} />
      <Route path="*" element={<HomePage onNavigateSection={handleNavigateSection} />} />
    </Routes>
  );
}
