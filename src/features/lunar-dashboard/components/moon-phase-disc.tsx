interface MoonPhaseDiscProps {
  day: number;
  isWaxing: boolean;
  size?: number;
  className?: string;
  glow?: boolean;
}

export function MoonPhaseDisc({
  day,
  isWaxing,
  size = 32,
  className = '',
  glow = false
}: MoonPhaseDiscProps) {
  // Illumination calculation (0 to 1)
  const fraction = isWaxing ? Math.min(1, day / 15) : Math.max(0, 1 - day / 15);

  const radius = 13;
  const cx = 16;
  const cy = 16;
  const r = radius;

  // Horizontal radius of the terminator ellipse
  const termR = Math.abs(r * (2 * fraction - 1));

  // Build SVG path for illuminated area
  let pathD = '';
  if (fraction >= 0.96) {
    // Full moon: entire circle
    pathD = `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r} Z`;
  } else if (fraction <= 0.04) {
    // New moon
    pathD = '';
  } else if (isWaxing) {
    // Waxing: right side lit
    if (fraction < 0.5) {
      // Crescent
      pathD = `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${termR} ${r} 0 0 0 ${cx} ${cy - r} Z`;
    } else {
      // Gibbous
      pathD = `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${termR} ${r} 0 0 1 ${cx} ${cy - r} Z`;
    }
  } else {
    // Waning: left side lit
    if (fraction < 0.5) {
      // Crescent
      pathD = `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} A ${termR} ${r} 0 0 1 ${cx} ${cy - r} Z`;
    } else {
      // Gibbous
      pathD = `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} A ${termR} ${r} 0 0 0 ${cx} ${cy - r} Z`;
    }
  }

  const gradId = `lunar-lit-${day}-${isWaxing ? 'wax' : 'wan'}`;
  const darkId = `lunar-dark-${day}-${isWaxing ? 'wax' : 'wan'}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`shrink-0 overflow-visible ${className}`}
    >
      <defs>
        {/* Realistic pearl-silver moon illumination gradient */}
        <radialGradient id={gradId} cx="42%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#F1F5F9" />
          <stop offset="85%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </radialGradient>

        {/* Deep space night side with subtle earthshine */}
        <radialGradient id={darkId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#17253D" />
          <stop offset="75%" stopColor="#0B1930" />
          <stop offset="100%" stopColor="#071426" />
        </radialGradient>

        {/* Active glowing aura filter */}
        {glow && (
          <filter id="lunar-active-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      {/* Selected Gold Glow Ring */}
      {glow && (
        <circle
          cx={cx}
          cy={cy}
          r={radius + 2.5}
          fill="none"
          stroke="#E8BF70"
          strokeWidth="1.8"
          opacity="0.9"
        />
      )}

      {/* Dark Moon Sphere Base */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={`url(#${darkId})`}
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="0.8"
      />

      {/* Lunar Maria Textures on Dark Base */}
      <circle cx={cx - 3} cy={cy - 2} r="2.2" fill="rgba(255,255,255,0.03)" />
      <circle cx={cx + 2} cy={cy + 3} r="3" fill="rgba(255,255,255,0.03)" />

      {/* Illuminated Moon Portion */}
      {pathD && (
        <path
          d={pathD}
          fill={`url(#${gradId})`}
          filter={glow ? 'url(#lunar-active-glow)' : undefined}
        />
      )}

      {/* Subtle crater shadow on illuminated part for realism */}
      {fraction >= 0.4 && (
        <circle cx={cx - 1} cy={cy - 2} r="1.5" fill="rgba(100, 116, 139, 0.15)" />
      )}
      {fraction >= 0.7 && <circle cx={cx + 3} cy={cy + 2} r="2" fill="rgba(100, 116, 139, 0.12)" />}
      {fraction >= 0.95 && <circle cx={cx} cy={cy + 4} r="1" fill="#FFFFFF" opacity="0.9" />}
    </svg>
  );
}
