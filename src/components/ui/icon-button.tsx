import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  ariaLabel: string;
}

export function IconButton({
  children,
  variant = 'ghost',
  size = 'md',
  ariaLabel,
  className = '',
  ...props
}: IconButtonProps) {
  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-3 text-base'
  }[size];

  const variantClasses = {
    primary: 'bg-[#142A4D] hover:bg-[#1E3E72] text-[#F4F3EF] border border-[#E8BF70]/30 shadow-md',
    secondary:
      'bg-[#0B1930] hover:bg-[#142A4D] text-[#A9B8CC] hover:text-[#F4F3EF] border border-white/10',
    ghost: 'hover:bg-white/5 text-[#A9B8CC] hover:text-[#F4F3EF]',
    gold: 'bg-[#E8BF70]/15 hover:bg-[#E8BF70]/25 text-[#E8BF70] border border-[#E8BF70]/40'
  }[variant];

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E8BF70]/50 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
