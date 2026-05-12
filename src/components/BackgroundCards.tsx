'use client';

import { motion } from 'framer-motion';

interface CardSpec {
  left: string;
  top: string;
  rotate: number;
  width: string;
  opacity: number;
  delay: number;
  seed: number;
}

// Tarot card backs scattered like a fan on a velvet table.
// Centered horizontally, positioned around the upper-middle of the viewport
// so they sit behind the hero + picker without crowding the header.
const FAN: CardSpec[] = [
  { left: '8%',  top: '52%', rotate: -34, width: 'clamp(90px, 16vw, 170px)', opacity: 0.16, delay: 0.05, seed: 1 },
  { left: '22%', top: '46%', rotate: -22, width: 'clamp(100px, 18vw, 190px)', opacity: 0.22, delay: 0.10, seed: 2 },
  { left: '37%', top: '43%', rotate: -10, width: 'clamp(110px, 19vw, 200px)', opacity: 0.26, delay: 0.15, seed: 3 },
  { left: '63%', top: '43%', rotate:  10, width: 'clamp(110px, 19vw, 200px)', opacity: 0.26, delay: 0.18, seed: 4 },
  { left: '78%', top: '46%', rotate:  22, width: 'clamp(100px, 18vw, 190px)', opacity: 0.22, delay: 0.22, seed: 5 },
  { left: '92%', top: '52%', rotate:  34, width: 'clamp(90px, 16vw, 170px)', opacity: 0.16, delay: 0.26, seed: 6 },
  // Two extra cards tucked higher near the slogan area
  { left: '15%', top: '20%', rotate: -52, width: 'clamp(70px, 12vw, 130px)', opacity: 0.12, delay: 0.32, seed: 7 },
  { left: '85%', top: '20%', rotate:  52, width: 'clamp(70px, 12vw, 130px)', opacity: 0.12, delay: 0.36, seed: 8 },
];

function CardBackArt({ seed }: { seed: number }) {
  const gid = `bg-card-grad-${seed}`;
  const fid = `bg-card-soot-${seed}`;
  return (
    <svg
      viewBox="0 0 100 160"
      className="w-full h-full block"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#3F1F55" />
          <stop offset="55%"  stopColor="#22102E" />
          <stop offset="100%" stopColor="#10071C" />
        </linearGradient>
        <filter id={fid} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed={seed} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="0.7" />
        </filter>
      </defs>

      {/* Card body */}
      <rect x={0} y={0} width={100} height={160} rx={5} fill={`url(#${gid})`} />

      {/* Decorative inner frames */}
      <rect x={4}   y={4}   width={92}  height={152} rx={3.5} fill="none"
            stroke="#B0806A" strokeWidth={0.5} opacity={0.55} filter={`url(#${fid})`} />
      <rect x={7.5} y={7.5} width={85}  height={145} rx={2.5} fill="none"
            stroke="#B0806A" strokeWidth={0.25} opacity={0.4} />

      {/* Central sigil — concentric rings + star */}
      <g transform="translate(50 80)">
        <circle r={30} fill="none" stroke="#D4B6F0" strokeWidth={0.45} opacity={0.30} filter={`url(#${fid})`} />
        <circle r={22} fill="none" stroke="#D4B6F0" strokeWidth={0.4}  opacity={0.40} />
        <circle r={14} fill="none" stroke="#D4B6F0" strokeWidth={0.5}  opacity={0.55} />
        <circle r={6}  fill="#D4B6F0" opacity={0.18} />
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={11}
          fill="#E4CCF7"
          opacity={0.75}
          y={1}
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          ✦
        </text>
      </g>

      {/* Corner ornaments */}
      <g fontSize={4.5} fill="#C9987F" opacity={0.65}>
        <text x={10}  y={15}>✦</text>
        <text x={90}  y={15}  textAnchor="end">✦</text>
        <text x={10}  y={154}>✦</text>
        <text x={90}  y={154} textAnchor="end">✦</text>
      </g>

      {/* Tiny ornamental flourish — vertical line on each side mid-card */}
      <g stroke="#B0806A" strokeWidth={0.3} opacity={0.45}>
        <line x1={12} y1={70} x2={12} y2={90} />
        <line x1={88} y1={70} x2={88} y2={90} />
      </g>
    </svg>
  );
}

export function BackgroundCards() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Suede board tint — subtle warm overlay across the surface */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 55%, rgba(80, 35, 60, 0.18) 0%, transparent 70%)',
        }}
      />

      {FAN.map((c, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: c.left,
            top: c.top,
            width: c.width,
            aspectRatio: '100 / 160',
            transform: `translate(-50%, -50%) rotate(${c.rotate}deg)`,
            opacity: c.opacity,
            filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.45))',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: c.opacity, y: 0 }}
          transition={{ delay: c.delay, duration: 1.4, ease: 'easeOut' }}
        >
          <CardBackArt seed={c.seed} />
        </motion.div>
      ))}
    </div>
  );
}
