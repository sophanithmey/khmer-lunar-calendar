import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'gold' | 'royal' | 'subtle' | 'success' | 'sil';
  className?: string;
}

export function Badge({ children, variant = 'subtle', className = '' }: BadgeProps) {
  const variantStyles = {
    gold: 'bg-[#E8BF70]/15 text-[#E8BF70] border-[#E8BF70]/30',
    royal: 'bg-[#142A4D] text-[#A9B8CC] border-white/10',
    subtle: 'bg-white/5 text-[#A9B8CC] border-white/10',
    success: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    sil: 'bg-amber-500/20 text-amber-200 border-amber-500/40 shadow-sm'
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
}
