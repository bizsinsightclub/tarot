'use client';

import { motion } from 'framer-motion';
import type { AxisVector } from '@/lib/axes';
import { AXIS_ORDER, AXIS_LABEL_KO, axisDisplayRatio } from '@/lib/axes';

interface MagicCircleProps {
  axes: AxisVector;
  delay?: number;
}

const CHART_RADIUS = 70;
const RITUAL_OUTER = 94;
const RITUAL_INNER = 88;
const LABEL_RADIUS = 104;

// First axis (luck) at 12 o'clock; subsequent axes clockwise at 45° steps.
function axisAngle(index: number): number {
  return -Math.PI / 2 + (index * Math.PI) / 4;
}

function axisPoint(index: number, radius: number) {
  const a = axisAngle(index);
  return { x: radius * Math.cos(a), y: radius * Math.sin(a) };
}

function polygonPoints(radii: readonly number[]): string {
  return radii
    .map((r, i) => {
      const p = axisPoint(i, r);
      return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    })
    .join(' ');
}

export function MagicCircle({ axes, delay = 0 }: MagicCircleProps) {
  const dataRadii = AXIS_ORDER.map(
    (key) => axisDisplayRatio(axes[key]) * CHART_RADIUS,
  );
  const dataPolygon = polygonPoints(dataRadii);
  const zeroPolygon = polygonPoints(AXIS_ORDER.map(() => 0));

  // Grid octagons at 25%, 50%, 75%, 100% of CHART_RADIUS
  const gridPolygons = [0.25, 0.5, 0.75, 1.0].map((f) =>
    polygonPoints(AXIS_ORDER.map(() => f * CHART_RADIUS)),
  );

  const outerCirc = 2 * Math.PI * RITUAL_OUTER;
  const innerCirc = 2 * Math.PI * RITUAL_INNER;

  return (
    <div className="mx-auto w-full max-w-[340px]" aria-hidden="true">
      <svg
        viewBox="-115 -115 230 230"
        className="w-full h-auto block"
      >
        <defs>
          {/* "Soot / etched" displacement — makes strokes look hand-burned */}
          <filter
            id="mc-soot"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.3"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.8"
            />
          </filter>
          {/* Soft halo behind the entire sigil */}
          <radialGradient id="mc-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C8A2E8" stopOpacity="0.20" />
            <stop offset="55%" stopColor="#C8A2E8" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#C8A2E8" stopOpacity="0" />
          </radialGradient>
          {/* Data polygon fill — denser near center, fading outward */}
          <radialGradient id="mc-data-fill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C8A2E8" stopOpacity="0.55" />
            <stop offset="80%" stopColor="#C8A2E8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C8A2E8" stopOpacity="0.15" />
          </radialGradient>
        </defs>

        {/* Aura halo */}
        <motion.circle
          r={RITUAL_OUTER + 8}
          fill="url(#mc-aura)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.0, duration: 0.9 }}
        />

        {/* Outer ritual circle — drawn by stroke-dashoffset reveal */}
        <motion.circle
          r={RITUAL_OUTER}
          fill="none"
          stroke="#A07060"
          strokeWidth={1.5}
          strokeLinecap="round"
          opacity={0.85}
          filter="url(#mc-soot)"
          initial={{ strokeDasharray: outerCirc, strokeDashoffset: outerCirc }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ delay: delay + 0.05, duration: 1.2, ease: 'easeOut' }}
        />

        {/* Inner ritual ring — subtle companion */}
        <motion.circle
          r={RITUAL_INNER}
          fill="none"
          stroke="#A07060"
          strokeWidth={0.4}
          opacity={0.45}
          filter="url(#mc-soot)"
          initial={{ strokeDasharray: innerCirc, strokeDashoffset: innerCirc }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ delay: delay + 0.25, duration: 0.9, ease: 'easeOut' }}
        />

        {/* 8 axis spokes */}
        {AXIS_ORDER.map((key, i) => {
          const end = axisPoint(i, CHART_RADIUS);
          return (
            <motion.line
              key={`spoke-${key}`}
              x1={0}
              y1={0}
              x2={end.x}
              y2={end.y}
              stroke="#C8A2E8"
              strokeWidth={0.5}
              opacity={0.3}
              filter="url(#mc-soot)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.32 }}
              transition={{ delay: delay + 0.4 + i * 0.05, duration: 0.3 }}
            />
          );
        })}

        {/* Concentric grid octagons (inner gradations) */}
        {gridPolygons.slice(0, 3).map((pts, idx) => (
          <motion.polygon
            key={`grid-${idx}`}
            points={pts}
            fill="none"
            stroke="#B0AABA"
            strokeWidth={0.4}
            opacity={0.25}
            filter="url(#mc-soot)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.22 }}
            transition={{ delay: delay + 0.5 + idx * 0.06, duration: 0.4 }}
          />
        ))}
        {/* Boundary octagon at CHART_RADIUS — slightly bolder */}
        <motion.polygon
          points={gridPolygons[3]}
          fill="none"
          stroke="#B0AABA"
          strokeWidth={0.6}
          opacity={0.4}
          filter="url(#mc-soot)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: delay + 0.65, duration: 0.4 }}
        />

        {/* Data polygon — the "soot etching" reveal.
            Points morph from center (zero radii) to actual values. */}
        <motion.polygon
          fill="url(#mc-data-fill)"
          stroke="#C8A2E8"
          strokeWidth={1.4}
          strokeLinejoin="round"
          filter="url(#mc-soot)"
          initial={{ points: zeroPolygon, opacity: 0 }}
          animate={{ points: dataPolygon, opacity: 1 }}
          transition={{
            delay: delay + 0.85,
            duration: 1.1,
            ease: [0.34, 1.4, 0.5, 1],
          }}
        />

        {/* Vertex spark dots at each axis tip */}
        {dataRadii.map((r, i) => {
          const p = axisPoint(i, r);
          return (
            <motion.circle
              key={`dot-${i}`}
              cx={p.x}
              cy={p.y}
              r={1.5}
              fill="#D4B8F0"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.9, scale: 1 }}
              transition={{
                delay: delay + 1.4 + i * 0.04,
                duration: 0.3,
              }}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            />
          );
        })}

        {/* Central sigil — small concentric mark */}
        <motion.g
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.55, duration: 0.5 }}
        >
          <circle
            r={3.2}
            fill="none"
            stroke="#C8A2E8"
            strokeWidth={0.5}
            opacity={0.75}
            filter="url(#mc-soot)"
          />
          <circle r={1.2} fill="#C8A2E8" opacity={0.95} />
        </motion.g>

        {/* Axis labels */}
        {AXIS_ORDER.map((key, i) => {
          const p = axisPoint(i, LABEL_RADIUS);
          return (
            <motion.text
              key={`label-${key}`}
              x={p.x}
              y={p.y}
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize={8.5}
              fill="#F0EDF5"
              opacity={0.85}
              style={{
                fontFamily: 'var(--font-noto-serif-kr), serif',
                letterSpacing: '0.18em',
                fontWeight: 500,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{
                delay: delay + 1.0 + i * 0.04,
                duration: 0.4,
              }}
            >
              {AXIS_LABEL_KO[key]}
            </motion.text>
          );
        })}
      </svg>
    </div>
  );
}
