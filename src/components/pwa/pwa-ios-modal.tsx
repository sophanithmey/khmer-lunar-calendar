import { Share2, PlusSquare, CheckCircle, X } from 'lucide-react';
import { useLanguage } from '../../hooks/use-language';

interface PwaIosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PwaIosModal({ isOpen, onClose }: PwaIosModalProps) {
  const { t, language } = useLanguage();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ios-pwa-title"
    >
      <div className="relative w-full max-w-md rounded-2xl bg-[#0B1930] border border-[#E8BF70]/30 p-6 shadow-2xl text-[#F4F3EF] space-y-5">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t.pwa.close}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#A9B8CC] hover:text-[#F4F3EF] hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with App Moon Icon */}
        <div className="flex items-center gap-3.5 pr-6">
          <img
            src="/pwa-192x192.png"
            alt="Chan Khmer"
            className="w-12 h-12 rounded-xl border border-[#E8BF70]/40 shadow-md"
          />
          <div>
            <h3 id="ios-pwa-title" className="text-base font-bold text-[#E8BF70] font-serif">
              {t.pwa.iosInstallTitle}
            </h3>
            <p className="text-xs text-[#A9B8CC] mt-0.5">
              {language === 'km'
                ? 'ប្រើប្រាស់ដូចកម្មវិធីទូរស័ព្ទពិតប្រាកដ'
                : 'Use like a native mobile app'}
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3 pt-1">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#142A4D]/50 border border-white/5">
            <div className="p-2 rounded-lg bg-[#E8BF70]/15 text-[#E8BF70] shrink-0">
              <Share2 className="w-5 h-5" />
            </div>
            <div className="text-xs text-[#E1E8F2] leading-relaxed pt-0.5">
              <span className="font-semibold text-[#E8BF70] block mb-0.5">
                {language === 'km' ? 'ជំហានទី ១' : 'Step 1'}
              </span>
              {language === 'km'
                ? 'ចុចលើប៊ូតុងចែករំលែក (Share) នៅរបារខាងក្រោមនៃកម្មវិធី Safari'
                : 'Tap the Share icon at the bottom bar in Safari'}
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#142A4D]/50 border border-white/5">
            <div className="p-2 rounded-lg bg-[#E8BF70]/15 text-[#E8BF70] shrink-0">
              <PlusSquare className="w-5 h-5" />
            </div>
            <div className="text-xs text-[#E1E8F2] leading-relaxed pt-0.5">
              <span className="font-semibold text-[#E8BF70] block mb-0.5">
                {language === 'km' ? 'ជំហានទី ២' : 'Step 2'}
              </span>
              {language === 'km'
                ? 'អូសចុះក្រោមបន្តិច រួចជ្រើសរើស «បន្ថែមលើអេក្រង់ដើម» (Add to Home Screen)'
                : 'Scroll down and tap "Add to Home Screen"'}
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#142A4D]/50 border border-white/5">
            <div className="p-2 rounded-lg bg-[#E8BF70]/15 text-[#E8BF70] shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="text-xs text-[#E1E8F2] leading-relaxed pt-0.5">
              <span className="font-semibold text-[#E8BF70] block mb-0.5">
                {language === 'km' ? 'ជំហានទី ៣' : 'Step 3'}
              </span>
              {language === 'km'
                ? 'ចុចពាក្យ «បន្ថែម» (Add) នៅជ្រុងខាងលើស្ដាំ ដើម្បីបញ្ចប់'
                : 'Tap "Add" in the top right corner to finish'}
            </div>
          </div>
        </div>

        {/* Footer Close */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-[#E8BF70] hover:bg-[#FCE6A4] text-[#071426] font-semibold text-sm transition-colors cursor-pointer shadow-md"
          >
            {t.pwa.close}
          </button>
        </div>
      </div>
    </div>
  );
}
