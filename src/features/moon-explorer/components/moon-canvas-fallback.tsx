import { useEffect, useRef, useState } from 'react';

interface MoonCanvasFallbackProps {
  phaseDegrees: number;
  illuminationPct: number;
  className?: string;
}

export function MoonCanvasFallback({
  phaseDegrees,
  illuminationPct,
  className = ''
}: MoonCanvasFallbackProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const moonImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = '/moon-realistic.jpg';
    img.onload = () => {
      moonImgRef.current = img;
      setImageLoaded(true);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.4;

    ctx.clearRect(0, 0, width, height);

    // 1. Ambient outer celestial aura
    const ambientGlow = ctx.createRadialGradient(
      centerX,
      centerY,
      radius * 0.85,
      centerX,
      centerY,
      radius * 1.35
    );
    ambientGlow.addColorStop(0, 'rgba(232, 191, 112, 0.22)');
    ambientGlow.addColorStop(0.5, 'rgba(20, 42, 77, 0.15)');
    ambientGlow.addColorStop(1, 'rgba(7, 20, 38, 0)');
    ctx.fillStyle = ambientGlow;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
    ctx.fill();

    // 2. Draw Moon Base (clipped circle)
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.clip();

    if (imageLoaded && moonImgRef.current) {
      // Draw photographic textured moon
      ctx.drawImage(moonImgRef.current, centerX - radius, centerY - radius, radius * 2, radius * 2);
    } else {
      // High-detail procedural backup if image is still loading
      const moonGrad = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      moonGrad.addColorStop(0, '#FFFFFF');
      moonGrad.addColorStop(0.6, '#D6D3D1');
      moonGrad.addColorStop(1, '#78716C');
      ctx.fillStyle = moonGrad;
      ctx.fill();
    }

    // 3. Realistic Phase Terminator Shadow Overlay
    // phaseDegrees: 0 = new moon, 90 = first quarter (right lit), 180 = full moon, 270 = last quarter (left lit)
    const rad = (phaseDegrees * Math.PI) / 180;
    const cosPhase = Math.cos(rad);

    ctx.save();
    ctx.fillStyle = 'rgba(7, 20, 38, 0.94)'; // Realistic deep space night shadow

    ctx.beginPath();
    if (phaseDegrees <= 180) {
      // Waxing: Right side is illuminated, Left side is in shadow
      // Shadow covers the left side
      ctx.arc(centerX, centerY, radius + 2, Math.PI / 2, -Math.PI / 2, false);
      ctx.ellipse(
        centerX,
        centerY,
        Math.abs(cosPhase) * radius,
        radius + 2,
        0,
        -Math.PI / 2,
        Math.PI / 2,
        cosPhase < 0
      );
    } else {
      // Waning: Left side is illuminated, Right side is in shadow
      // Shadow covers the right side
      ctx.arc(centerX, centerY, radius + 2, -Math.PI / 2, Math.PI / 2, false);
      ctx.ellipse(
        centerX,
        centerY,
        Math.abs(cosPhase) * radius,
        radius + 2,
        0,
        Math.PI / 2,
        -Math.PI / 2,
        cosPhase > 0
      );
    }
    ctx.fill();

    // Subtle soft blur along the terminator line
    ctx.restore();

    // 4. Subtle Earthshine on night side (so it's not a pitch black void)
    const earthshine = ctx.createLinearGradient(
      centerX - radius,
      centerY,
      centerX + radius,
      centerY
    );
    earthshine.addColorStop(0, 'rgba(56, 189, 248, 0.05)');
    earthshine.addColorStop(1, 'rgba(232, 191, 112, 0.04)');
    ctx.fillStyle = earthshine;
    ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

    ctx.restore(); // Exit clip

    // 5. Delicate Golden Lunar Rim
    ctx.strokeStyle = 'rgba(232, 191, 112, 0.35)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();
  }, [phaseDegrees, illuminationPct, imageLoaded]);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <canvas
        ref={canvasRef}
        width={420}
        height={420}
        className="w-full max-w-[360px] sm:max-w-[420px] aspect-square drop-shadow-2xl"
      />
    </div>
  );
}
