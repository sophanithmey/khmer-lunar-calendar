import { Moon, Heart } from 'lucide-react';
import { LotusIcon } from '../icons/lotus-icon';
import { useLanguage } from '../../hooks/use-language';

export function AppFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[#142A4D] bg-[#050E1B] text-[#A9B8CC] text-sm mt-20 relative overflow-hidden">
      {/* Decorative Angkor silhouette / celestial glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E8BF70]/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Moon className="w-5 h-5 text-[#E8BF70]" />
              <span className="text-base font-bold text-[#F4F3EF]">{t.appTitle}</span>
              <span className="text-xs text-[#E8BF70] font-mono">v1.0</span>
            </div>
            <p className="text-xs text-[#A9B8CC] max-w-md">{t.footer.description}</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-2 text-xs text-[#E8BF70] bg-[#142A4D]/50 px-3 py-1.5 rounded-full border border-[#E8BF70]/20">
              <LotusIcon className="w-3.5 h-3.5" />
              <span>{t.footer.traditionalQuote}</span>
            </div>
            <p className="text-xs text-[#A9B8CC]/80 flex items-center gap-1 mt-1">
              {t.footer.rights} &copy; {new Date().getFullYear()} &bull; Built with
              <Heart className="w-3 h-3 text-rose-400 fill-rose-400 inline" /> for Cambodian
              Heritage
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
