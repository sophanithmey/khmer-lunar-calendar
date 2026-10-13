import type { SVGProps } from 'react';

interface LotusIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * LotusIcon - Outline lotus flower (ផ្កាឈូក), a core symbol of Khmer Buddhist culture.
 * Drawn on a 24x24 stroke grid so it sits naturally beside lucide-react icons.
 */
export function LotusIcon({ size = 24, className = '', ...props }: LotusIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Center petal */}
      <path d="M12 3.5c-2.6 3-2.6 8 0 11.5 2.6-3.5 2.6-8.5 0-11.5z" />
      {/* Side petals */}
      <path d="M12 15c-3.2-.4-6.2-2.6-7.2-6.4 3.2-.1 5.8 2.1 7.2 6.4" />
      <path d="M12 15c3.2-.4 6.2-2.6 7.2-6.4-3.2-.1-5.8 2.1-7.2 6.4" />
      {/* Outer leaves */}
      <path d="M3 12.5c1.8 3.6 5.4 5.5 9 5.5s7.2-1.9 9-5.5" />
      {/* Water line */}
      <path d="M7.5 21h9" />
    </svg>
  );
}
