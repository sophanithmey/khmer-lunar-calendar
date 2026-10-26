import { useState, useEffect, useCallback } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const DISMISS_KEY = 'chan_khmer_pwa_dismissed_until';
const DISMISS_DURATION_DAYS = 7;

export interface UsePWAResult {
  isInstallable: boolean;
  isInstalled: boolean;
  isOffline: boolean;
  isIOS: boolean;
  isDismissed: boolean;
  needRefresh: boolean;
  offlineReady: boolean;
  promptInstall: () => Promise<'accepted' | 'dismissed' | 'ios' | 'unavailable'>;
  dismissPrompt: () => void;
  updateApp: () => Promise<void>;
  closeOfflineReady: () => void;
}

export function usePWA(): UsePWAResult {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );
  const [isIOS, setIsIOS] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Register service worker via vite-plugin-pwa
  const {
    needRefresh: [needRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker
  } = useRegisterSW({
    onRegistered(registration) {
      if (registration) {
        // Periodically check for service worker updates (every 1 hour)
        setInterval(
          () => {
            registration.update().catch(() => {});
          },
          60 * 60 * 1000
        );
      }
    },
    onRegisterError(error) {
      console.warn('PWA service worker registration failed:', error);
    }
  });

  // Check standalone mode and platform
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsInstalled(isStandalone);

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice =
      /iphone|ipad|ipod/.test(userAgent) ||
      (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);
    setIsIOS(isIOSDevice && !isStandalone);

    // Check if dismissed previously
    const dismissedUntil = localStorage.getItem(DISMISS_KEY);
    if (dismissedUntil && Date.now() < Number(dismissedUntil)) {
      setIsDismissed(true);
    }

    // Network status listeners
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Install prompt listener
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    // Installed listener
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      localStorage.removeItem(DISMISS_KEY);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async (): Promise<
    'accepted' | 'dismissed' | 'ios' | 'unavailable'
  > => {
    if (isIOS) {
      return 'ios';
    }

    if (!deferredPrompt) {
      return 'unavailable';
    }

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        setIsInstallable(false);
        setDeferredPrompt(null);
        return 'accepted';
      }
      return 'dismissed';
    } catch (err) {
      console.warn('Error during PWA installation:', err);
      return 'unavailable';
    }
  }, [deferredPrompt, isIOS]);

  const dismissPrompt = useCallback(() => {
    setIsDismissed(true);
    const expiry = Date.now() + DISMISS_DURATION_DAYS * 24 * 60 * 60 * 1000;
    try {
      localStorage.setItem(DISMISS_KEY, expiry.toString());
    } catch {
      // localStorage may fail in private mode
    }
  }, []);

  const updateApp = useCallback(async () => {
    await updateServiceWorker(true);
  }, [updateServiceWorker]);

  const closeOfflineReady = useCallback(() => {
    setOfflineReady(false);
  }, [setOfflineReady]);

  return {
    isInstallable: isInstallable || (isIOS && !isInstalled),
    isInstalled,
    isOffline,
    isIOS,
    isDismissed,
    needRefresh,
    offlineReady,
    promptInstall,
    dismissPrompt,
    updateApp,
    closeOfflineReady
  };
}
