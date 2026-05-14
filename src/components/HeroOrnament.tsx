'use client';

import { motion } from 'framer-motion';

// Decorative tarot sigil — radiating sun + ornate ring + central star/eye.
// Sits behind the hero slogan as a quiet centerpiece motif.
// Pure SVG so it scales crisply and stays under 4kB.
export function HeroOrnament() {
  // 16 long rays + 16 short rays alternating around the circle
  const longRays = Array.from({ length: 16 }, (_, i) => (i * 360) / 16);
  const shortRays = Array.from({ length: 16 }, (_, i) => (i * 360) / 16 + 11.25);
  // 12 small dots placed just inside the outer ring
  const dots = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI * 2) / 12 - Math.PI / 2;
    return { x: Math.cos(a) * 78, y: Math.sin(a) * 78 };
  });

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 mx-auto flex justify-center select-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      <motion.svg
        viewBox="-130 -130 260 260"
        className="w-[min(92vw,560px)] h-auto block"
        initial={{ opacity: 0, scale: 0.92, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        style={{
          marginTop: '-2.5rem',
          filter: 'drop-shadow(0 0 18px rgba(201, 152, 127, 0.18))',
        }}
      >
        <defs>
          <filter id="ho-soot" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.1"
              numOctaves="2"
              seed="11"
              result="n"
            />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.2" />
          </filter>
          <radialGradient id="ho-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E4CCF7" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#C9987F" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C9987F" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ho-ray" x1="0" y1="-110" x2="0" y2="-40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C9987F" stopOpacity="0" />
            <stop offset="100%" stopColor="#E4CCF7" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* Soft inner halo */}
        <circle r={60} fill="url(#ho-core)" />

        {/* Long rays — slender triangular spears */}
        <g opacity={0.32} filter="url(#ho-soot)">
          {longRays.map((deg, i) => (
            <polygon
              key={`lr-${i}`}
              points="0,-110 -2.4,-48 2.4,-48"
              fill="url(#ho-ray)"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>

        {/* Short rays — tucked between, gold-hued */}
        <g opacity={0.22} filter="url(#ho-soot)">
          {shortRays.map((deg, i) => (
            <polygon
              key={`sr-${i}`}
              points="0,-72 -1.6,-44 1.6,-44"
              fill="#C9987F"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>

        {/* Outer ring */}
        <circle
          r={84}
          fill="none"
          stroke="#B0806A"
          strokeWidth={0.7}
          opacity={0.45}
          filter="url(#ho-soot)"
        />
        {/* Inner companion ring */}
        <circle
          r={78}
          fill="none"
          stroke="#B0806A"
          strokeWidth={0.3}
          opacity={0.35}
        />

        {/* Twelve marker dots inside the outer ring */}
        <g fill="#E4CCF7" opacity={0.55}>
          {dots.map((p, i) => (
            <circle key={`d-${i}`} cx={p.x} cy={p.y} r={0.9} />
          ))}
        </g>

        {/* Mid ring */}
        <circle
          r={46}
          fill="none"
          stroke="#D4B6F0"
          strokeWidth={0.4}
          opacity={0.4}
          filter="url(#ho-soot)"
        />

        {/* Central 8-point star */}
        <g
          opacity={0.7}
          filter="url(#ho-soot)"
          stroke="#E4CCF7"
          strokeWidth={0.6}
          fill="none"
        >
          {[0, 45, 90, 135].map((deg) => (
            <line
              key={`s-${deg}`}
              x1={0}
              y1={-32}
              x2={0}
              y2={32}
              transform={`rotate(${deg})`}
            />
          ))}
        </g>

        {/* Inner star outline — diamond + cross overlay */}
        <g opacity={0.55}>
          <polygon
            points="0,-22 14,0 0,22 -14,0"
            fill="none"
            stroke="#C9987F"
            strokeWidth={0.5}
          />
          <polygon
            points="0,-14 9,0 0,14 -9,0"
            fill="#E4CCF7"
            opacity={0.18}
          />
        </g>

        {/* Center dot */}
        <circle r={2.2} fill="#E4CCF7" opacity={0.85} />
        <circle r={4.2} fill="none" stroke="#E4CCF7" strokeWidth={0.4} opacity={0.5} />
      </motion.svg>
    </div>
  );
}
