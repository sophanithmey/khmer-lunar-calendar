import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { useLanguage } from '../../hooks/use-language';

interface PwaOfflineIndicatorProps {
  isOffline: boolean;
}

export function PwaOfflineIndicator({ isOffline }: PwaOfflineIndicatorProps) {
  const { t } = useLanguage();
  const [showOnlineToast, setShowOnlineToast] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (isOffline) {
      setWasOffline(true);
      setShowOnlineToast(false);
    } else if (wasOffline) {
      setShowOnlineToast(true);
      const timer = setTimeout(() => {
        setShowOnlineToast(false);
        setWasOffline(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isOffline, wasOffline]);

  if (isOffline) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed top-20 right-4 z-40 max-w-sm flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#0B1930]/95 border border-amber-500/40 text-amber-200 text-xs shadow-lg backdrop-blur-md animate-in slide-in-from-top-2 duration-200"
      >
        <div className="relative shrink-0">
          <WifiOff className="w-4 h-4 text-amber-400" />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        </div>
        <span className="leading-snug">{t.pwa.offlineNotice}</span>
      </div>
    );
  }

  if (showOnlineToast) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed top-20 right-4 z-40 max-w-sm flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B1930]/95 border border-emerald-500/40 text-emerald-300 text-xs shadow-lg backdrop-blur-md animate-in slide-in-from-top-2 duration-200"
      >
        <Wifi className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{t.pwa.onlineNotice}</span>
      </div>
    );
  }

  return null;
}
