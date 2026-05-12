'use client';

import { motion } from 'framer-motion';
import type { VerdictMeta } from '@/lib/verdicts';

interface VerdictPanelProps {
  meta: VerdictMeta;
  delay?: number;
}

const TONE_CLASSES: Record<VerdictMeta['tone'], string> = {
  go: 'text-pf-accent border-pf-accent/50',
  stop: 'text-pf-rose-soft border-pf-rose/60',
  warn: 'text-pf-warn border-pf-warn/50',
  wait: 'text-pf-mute border-pf-mute/40',
};

const TONE_GLOW: Record<VerdictMeta['tone'], string> = {
  go:
    'shadow-[0_0_40px_rgba(200,162,232,0.35),inset_0_0_30px_rgba(200,162,232,0.08)]',
  stop:
    'shadow-[0_0_40px_rgba(160,112,96,0.35),inset_0_0_30px_rgba(160,112,96,0.08)]',
  warn:
    'shadow-[0_0_40px_rgba(216,144,96,0.35),inset_0_0_30px_rgba(216,144,96,0.08)]',
  wait:
    'shadow-[0_0_40px_rgba(176,170,186,0.25),inset_0_0_30px_rgba(176,170,186,0.06)]',
};

export function VerdictPanel({ meta, delay = 0 }: VerdictPanelProps) {
  const tone = TONE_CLASSES[meta.tone];
  const glow = TONE_GLOW[meta.tone];
  return (
    <motion.div
      className={`mx-auto max-w-md text-center px-6 py-8 rounded-xl border-2 bg-pf-bg/60 ${tone} ${glow}`}
      initial={{ opacity: 0, y: 20, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 180, damping: 18 }}
    >
      <motion.div
        className="font-serif-hero text-3xl sm:text-4xl font-bold tracking-wider uppercase"
        initial={{ opacity: 0, letterSpacing: '0.3em' }}
        animate={{ opacity: 1, letterSpacing: '0.1em' }}
        transition={{ delay: delay + 0.15, duration: 0.6 }}
      >
        {meta.key.replace(/_/g, ' ')}
      </motion.div>
      <div className="mt-3 font-sans-kr font-bold text-xl text-pf-fg">
        {meta.ko}
      </div>
      <p className="mt-4 font-sans-kr text-sm text-pf-fg-soft leading-relaxed">
        {meta.description}
      </p>
    </motion.div>
  );
}
