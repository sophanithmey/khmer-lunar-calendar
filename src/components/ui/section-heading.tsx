import type { ReactNode } from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  action?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  action,
  align = 'left',
  className = ''
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 ${className}`}
    >
      <div className={`flex flex-col ${alignClass}`}>
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#E8BF70]/10 text-[#E8BF70] border border-[#E8BF70]/20 mb-3 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8BF70] animate-pulse" />
            {badge}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F3EF] flex items-center gap-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base text-[#A9B8CC] mt-2 max-w-2xl">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
