'use client';

import type { Card } from '@/data/cards';
import { AnimatedCard } from './AnimatedCard';

interface CardSpreadProps {
  spread: readonly [Card, Card, Card];
  /** Re-key on each draw to restart the animation. */
  drawKey: number | string;
}

const POSITION_LABELS = ['PAST', 'PRESENT', 'FUTURE'] as const;

// Per-card flip delays (seconds) — staggered so each card "팡" individually.
const FLIP_DELAYS = [0.9, 1.5, 2.1];

export function CardSpread({ spread, drawKey }: CardSpreadProps) {
  return (
    <div
      key={drawKey}
      className="grid grid-cols-3 gap-3 sm:gap-5 w-full max-w-md mx-auto"
    >
      {spread.map((card, i) => (
        <AnimatedCard
          key={`${drawKey}-${i}`}
          card={card}
          positionLabel={POSITION_LABELS[i]!}
          index={i}
          flipDelay={FLIP_DELAYS[i]!}
        />
      ))}
    </div>
  );
}
