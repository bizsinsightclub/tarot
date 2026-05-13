'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Card } from '@/data/cards';
import { AnimatedCard } from './AnimatedCard';

interface CardSpreadProps {
  spread: readonly [Card, Card, Card];
  /** Re-key on each draw to restart the animation. */
  drawKey: number | string;
  /** Fires once all three cards have been revealed in order. */
  onComplete: () => void;
}

const POSITION_LABELS = ['PAST', 'PRESENT', 'FUTURE'] as const;
const POSITION_KO = ['과거', '현재', '미래'] as const;

export function CardSpread({ spread, drawKey, onComplete }: CardSpreadProps) {
  const [revealedCount, setRevealedCount] = useState(0);

  // Reset on new draw.
  useEffect(() => {
    setRevealedCount(0);
  }, [drawKey]);

  // Fire onComplete once we hit 3.
  useEffect(() => {
    if (revealedCount === 3) {
      onComplete();
    }
  }, [revealedCount, onComplete]);

  function handleReveal(i: number) {
    setRevealedCount((c) => (c === i ? c + 1 : c));
  }

  const allRevealed = revealedCount >= 3;

  return (
    <div key={drawKey} className="w-full">
      <div className="h-7 flex items-center justify-center mb-5">
        <AnimatePresence mode="wait">
          {!allRevealed && (
            <motion.p
              key={`hint-${revealedCount}`}
              className="font-serif-kr text-sm text-pf-accent-soft text-center"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{
                duration: 0.4,
                delay: revealedCount === 0 ? 0.8 : 0,
              }}
            >
              {revealedCount === 0
                ? '과거 카드부터 차례로 열어보세요'
                : `${POSITION_KO[revealedCount]} 카드를 탭하세요`}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-5 w-full max-w-md mx-auto">
        {spread.map((card, i) => (
          <AnimatedCard
            key={`${drawKey}-${i}`}
            card={card}
            positionLabel={POSITION_LABELS[i]!}
            index={i}
            isActive={i === revealedCount}
            isRevealed={i < revealedCount}
            onReveal={() => handleReveal(i)}
          />
        ))}
      </div>
    </div>
  );
}
