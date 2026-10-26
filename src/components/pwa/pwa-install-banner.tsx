import { useState } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { useLanguage } from '../../hooks/use-language';
import { PwaIosModal } from './pwa-ios-modal';

interface PwaInstallBannerProps {
  isInstallable: boolean;
  isInstalled: boolean;
  isDismissed: boolean;
  isIOS: boolean;
  onPromptInstall: () => Promise<'accepted' | 'dismissed' | 'ios' | 'unavailable'>;
  onDismiss: () => void;
}

export function PwaInstallBanner({
  isInstallable,
  isInstalled,
  isDismissed,
  isIOS,
  onPromptInstall,
  onDismiss
}: PwaInstallBannerProps) {
  const { t } = useLanguage();
  const [showIosModal, setShowIosModal] = useState(false);

  // If already installed, not installable, or dismissed by user
  if (isInstalled || !isInstallable || isDismissed) {
    return null;
  }

  const handleInstallClick = async () => {
    const result = await onPromptInstall();
    if (result === 'ios' || isIOS) {
      setShowIosModal(true);
    }
  };

  return (
    <>
      <aside
        aria-label={t.pwa.installApp}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 p-4 rounded-2xl bg-[#0B1930]/95 backdrop-blur-md border border-[#E8BF70]/30 shadow-2xl shadow-black/50 animate-in slide-in-from-bottom duration-300"
      >
        <div className="flex items-start gap-3.5">
          {/* App icon badge */}
          <div className="relative shrink-0">
            <img
              src="/pwa-192x192.png"
              alt="Chan Khmer"
              className="w-12 h-12 rounded-xl border border-[#E8BF70]/40 shadow-md object-cover"
            />
            <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-[#142A4D] border border-[#E8BF70]/50 text-[#E8BF70]">
              <Smartphone className="w-3 h-3" />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-[#F4F3EF] truncate">
                {t.pwa.installApp} — {t.appTitle}
              </h4>
              <button
                type="button"
                onClick={onDismiss}
                aria-label={t.pwa.laterBtn}
                className="p-1 rounded-lg text-[#A9B8CC] hover:text-[#F4F3EF] hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#A9B8CC] mt-1 leading-relaxed line-clamp-2">
              {t.pwa.installDescription}
            </p>

            {/* Action buttons */}
            <div className="flex items-center gap-2 mt-3">
              <button
                type="button"
                onClick={handleInstallClick}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#E8BF70] to-[#C59B27] hover:from-[#FCE6A4] hover:to-[#E8BF70] text-[#071426] font-bold text-xs tracking-wide shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.pwa.installBtn}</span>
              </button>

              <button
                type="button"
                onClick={onDismiss}
                className="px-3 py-1.5 rounded-xl text-xs font-medium text-[#A9B8CC] hover:text-[#F4F3EF] hover:bg-white/5 transition-colors cursor-pointer"
              >
                {t.pwa.laterBtn}
              </button>
            </div>
          </div>
        </div>
      </aside>

      <PwaIosModal isOpen={showIosModal} onClose={() => setShowIosModal(false)} />
    </>
  );
}
