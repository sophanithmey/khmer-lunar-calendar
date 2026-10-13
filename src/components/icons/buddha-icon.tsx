import type { SVGProps } from 'react';

interface BuddhaIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * BuddhaIcon - Meditating Lord Buddha in lotus posture (Padmasana) with Ushnisha & aura.
 * Used culturally on Cambodian lunar calendars to designate Buddhist holy days (ថ្ងៃសីល / Uposatha).
 */
export function BuddhaIcon({ size = 20, className = '', ...props }: BuddhaIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Ushnisha (Spire flame of enlightenment) */}
      <path d="M12 1.2c-.3.6-.5 1.2-.2 1.7.3.3.7.2.8 0 .3-.5.1-1.1-.6-1.7z" />

      {/* Head */}
      <circle cx="12" cy="5.2" r="2.1" />

      {/* Halo / Aura arc behind head */}
      <path
        d="M9.1 4.2a3.8 3.8 0 0 1 5.8 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      {/* Elongated Earlobes */}
      <path
        d="M9.6 4.9v1.6M14.4 4.9v1.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />

      {/* Seated Body, Civara Robe & Meditation Dhyana Mudra in Lap */}
      <path d="M10.2 8.3c-.9.4-2.2 1.5-2.8 2.6-.5 1-.3 2.1.4 2.5.6.3 1.5.1 2.3-.2l.2 1.4c-1.8.2-3.8.9-4.8 1.8-.8.8-.7 1.7.3 2.2 1.8.9 5.2 1 6.4 1 1.2 0 4.6-.1 6.4-1 1-.5 1.1-1.4.3-2.2-1-.9-3-1.6-4.8-1.8l.2-1.4c.8.3 1.7.5 2.3.2.7-.4.9-1.5.4-2.5-.6-1.1-1.9-2.2-2.8-2.6-.7-.3-2.7-.3-3.5 0z" />

      {/* Lotus Pedestal Base */}
      <path d="M5.5 20.3c2 .7 11 .7 13 0-1.2 1.6-11.8 1.6-13 0z" />
    </svg>
  );
}
