import { RefreshCw } from 'lucide-react';
import { useLanguage } from '../../hooks/use-language';

interface PwaUpdatePromptProps {
  needRefresh: boolean;
  onUpdate: () => Promise<void>;
}

export function PwaUpdatePrompt({ needRefresh, onUpdate }: PwaUpdatePromptProps) {
  const { t } = useLanguage();

  if (!needRefresh) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-3 p-3.5 rounded-2xl bg-[#0B1930] border border-[#E8BF70]/50 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom duration-300"
    >
      <div className="p-2 rounded-xl bg-[#E8BF70]/15 text-[#E8BF70] shrink-0">
        <RefreshCw className="w-4 h-4 animate-spin" />
      </div>
      <div className="text-xs text-[#F4F3EF]">
        <p className="font-semibold">{t.pwa.updateAvailable}</p>
      </div>
      <button
        type="button"
        onClick={() => void onUpdate()}
        className="px-3 py-1.5 rounded-xl bg-[#E8BF70] hover:bg-[#FCE6A4] text-[#071426] text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
      >
        {t.pwa.reloadBtn}
      </button>
    </div>
  );
}
