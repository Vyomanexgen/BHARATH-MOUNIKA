import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const RoyalCrest: React.FC<{
  className?: string;
  size?: number;
  showGanesh?: boolean;
}> = ({ className = '', size = 64, showGanesh = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Outer champagne scalloped aura */}
    <circle cx="60" cy="60" r="54" stroke="#C5A15A" strokeWidth="1" strokeDasharray="3 4" opacity="0.7" />
    <circle cx="60" cy="60" r="46" stroke="#C5A15A" strokeWidth="1.25" />
    <circle cx="60" cy="60" r="41" stroke="#A98950" strokeWidth="0.7" opacity="0.7" />
    {/* Crown lotus petals */}
    <path
      d="M60 11C62.5 16.5 66 20 60 24C54 20 57.5 16.5 60 11Z"
      fill="#C5A15A"
      opacity="0.85"
    />
    <path
      d="M50 14C53 18 55 21 52 24C48.5 22 48.5 17 50 14Z"
      fill="#C99A9A"
      opacity="0.75"
    />
    <path
      d="M70 14C67 18 65 21 68 24C71.5 22 71.5 17 70 14Z"
      fill="#C99A9A"
      opacity="0.75"
    />

    {/* Small Auspicious Lord Ganesha inside the circle */}
    {showGanesh && (
      <g>
        {/* Crown (Mukut) */}
        <path
          d="M55 37L60 30L65 37H55Z"
          fill="#C5A15A"
          stroke="#762D3C"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="M52 40.5C55 37.5 65 37.5 68 40.5"
          stroke="#762D3C"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Ears */}
        <path
          d="M49 46C43 44 41 51 45 55C47.5 57 50 55 51 52"
          fill="#E8D8C5"
          stroke="#762D3C"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M71 46C77 44 79 51 75 55C72.5 57 70 55 69 52"
          fill="#E8D8C5"
          stroke="#762D3C"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Head & Tilak */}
        <circle
          cx="60"
          cy="49"
          r="9"
          fill="#FFFDF8"
          stroke="#762D3C"
          strokeWidth="1.4"
        />
        <path
          d="M60 42.5V45.5"
          stroke="#C5A15A"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="60" cy="44" r="1" fill="#762D3C" />
        {/* Eyes */}
        <circle cx="56.5" cy="48.5" r="1" fill="#762D3C" />
        <circle cx="63.5" cy="48.5" r="1" fill="#762D3C" />
        {/* Seated Torso */}
        <path
          d="M50 61C48.5 68 51 77 60 77C69 77 71.5 68 70 61C68.5 56 64 55 60 55C56 55 51.5 56 50 61Z"
          fill="#F7F0E5"
          stroke="#762D3C"
          strokeWidth="1.4"
        />
        {/* Curved Trunk */}
        <path
          d="M60 51C60 56 60 61 57 63.5C54.5 65.5 52 64.5 52.5 62"
          stroke="#762D3C"
          strokeWidth="2.1"
          strokeLinecap="round"
          fill="none"
        />
        {/* Lotus Seat */}
        <path
          d="M44 78.5C49 75.5 55 76 60 79C65 76 71 75.5 76 78.5C71 82.5 65 83.5 60 83.5C55 83.5 49 82.5 44 78.5Z"
          fill="#C5A15A"
          fillOpacity="0.45"
          stroke="#A98950"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </g>
    )}

    {/* Bottom ornament */}
    <path
      d="M42 98C49 94 55 94 60 99C65 94 71 94 78 98"
      stroke="#C5A15A"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="60" cy="104" r="2.2" fill="#762D3C" />
  </svg>
);

export const FloralCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position, className = '' }) => {
  const transforms: Record<typeof position, string> = {
    'top-left': 'rotate(0deg)',
    'top-right': 'scaleX(-1)',
    'bottom-left': 'scaleY(-1)',
    'bottom-right': 'scale(-1, -1)',
  };

  return (
    <svg
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: transforms[position] }}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Delicate golden vine */}
      <path
        d="M14 14C52 16 88 22 126 14M14 14C16 52 22 88 14 126"
        stroke="#C5A15A"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M14 14C44 44 68 62 104 42M14 14C44 44 62 68 42 104"
        stroke="#A98950"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* Corner lotus blossom */}
      <g opacity="0.82">
        <path
          d="M28 28C36 16 52 16 56 28C46 34 34 34 28 28Z"
          fill="#C99A9A"
          fillOpacity="0.45"
          stroke="#762D3C"
          strokeWidth="0.8"
        />
        <path
          d="M28 28C16 36 16 52 28 56C34 46 34 34 28 28Z"
          fill="#C99A9A"
          fillOpacity="0.45"
          stroke="#762D3C"
          strokeWidth="0.8"
        />
        <path
          d="M28 28C42 30 50 42 46 52C36 48 30 38 28 28Z"
          fill="#E8D8C5"
          stroke="#C5A15A"
          strokeWidth="0.9"
        />
        <circle cx="28" cy="28" r="4.5" fill="#C5A15A" />
      </g>
      {/* Botanical leaves */}
      <path
        d="M84 20C94 12 108 16 112 24C102 28 92 26 84 20Z"
        fill="#C5A15A"
        fillOpacity="0.3"
        stroke="#A98950"
        strokeWidth="0.7"
      />
      <path
        d="M20 84C12 94 16 108 24 112C28 102 26 92 20 84Z"
        fill="#C5A15A"
        fillOpacity="0.3"
        stroke="#A98950"
        strokeWidth="0.7"
      />
      <circle cx="136" cy="14" r="2.2" fill="#C5A15A" opacity="0.75" />
      <circle cx="14" cy="136" r="2.2" fill="#C5A15A" opacity="0.75" />
      <circle cx="64" cy="64" r="1.8" fill="#762D3C" opacity="0.5" />
    </svg>
  );
};

export const OrnamentalDivider: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <div className={`flex items-center justify-center gap-4 my-4 ${className}`}>
    <span className="h-px w-14 sm:w-24 bg-gradient-to-r from-transparent to-[#C5A15A]" />
    <svg
      width="34"
      height="20"
      viewBox="0 0 34 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M17 2C19.5 6.5 22 9 17 14C12 9 14.5 6.5 17 2Z"
        fill="#C5A15A"
      />
      <path
        d="M8 10C11.5 7.5 14 9 15 12C12 13 9.5 12 8 10Z"
        fill="#C99A9A"
      />
      <path
        d="M26 10C22.5 7.5 20 9 19 12C22 13 24.5 12 26 10Z"
        fill="#C99A9A"
      />
      <circle cx="4" cy="10" r="1.5" fill="#C5A15A" />
      <circle cx="30" cy="10" r="1.5" fill="#C5A15A" />
      <circle cx="17" cy="17" r="1.6" fill="#762D3C" />
    </svg>
    <span className="h-px w-14 sm:w-24 bg-gradient-to-l from-transparent to-[#C5A15A]" />
  </div>
);

export const SectionHeading: React.FC<{
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}> = ({ eyebrow, title, subtitle, align = 'center' }) => (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    className={`max-w-3xl ${
      align === 'center' ? 'mx-auto text-center' : 'text-left'
    } mb-12 sm:mb-16`}
  >
    {eyebrow && (
      <p className="font-sans text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#762D3C] font-semibold mb-3">
        {eyebrow}
      </p>
    )}
    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A232C] font-medium tracking-tight leading-tight">
      {title}
    </h2>
    {align === 'center' && <OrnamentalDivider />}
    {subtitle && (
      <p className="font-romantic text-lg sm:text-xl text-[#6E4750] italic leading-relaxed mt-3">
        {subtitle}
      </p>
    )}
  </motion.div>
);

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  pulseSpeed: number;
  phase: number;
}

export const GoldenParticles: React.FC<{
  density?: number;
  className?: string;
}> = ({ density = 38, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let animId = 0;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const count =
      window.innerWidth < 640 ? Math.min(22, density) : density;

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1.1 + Math.random() * 2.4,
      vx: (Math.random() - 0.5) * 0.24,
      vy: -0.15 - Math.random() * 0.35,
      alpha: 0.25 + Math.random() * 0.55,
      pulseSpeed: 0.015 + Math.random() * 0.025,
      phase: Math.random() * Math.PI * 2,
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        if (!prefersReduced) {
          p.x += p.vx;
          p.y += p.vy;
          p.phase += p.pulseSpeed;
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }
        const glowAlpha = p.alpha * (0.65 + 0.35 * Math.sin(p.phase));
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.2);
        grad.addColorStop(0, `rgba(197, 161, 90, ${glowAlpha})`);
        grad.addColorStop(0.5, `rgba(230, 203, 136, ${glowAlpha * 0.45})`);
        grad.addColorStop(1, 'rgba(197, 161, 90, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!prefersReduced) {
        animId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};

