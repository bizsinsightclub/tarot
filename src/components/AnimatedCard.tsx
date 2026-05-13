'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import type { Card } from '@/data/cards';
import { CardBack } from './CardBack';

interface AnimatedCardProps {
  card: Card;
  positionLabel: string;
  index: number;
  isActive: boolean;    // True only when it's this card's turn to be tapped.
  isRevealed: boolean;  // True once the user has flipped it.
  onReveal: () => void;
}

const ENTRY_STAGGER = 0.18;
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function AnimatedCard({
  card,
  positionLabel,
  index,
  isActive,
  isRevealed,
  onReveal,
}: AnimatedCardProps) {
  const [burst, setBurst] = useState(false);

  const tappable = isActive && !isRevealed;

  function handleTap() {
    if (!tappable) return;
    onReveal();
    setBurst(true);
    window.setTimeout(() => setBurst(false), 750);
  }

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 40, scale: 0.4, rotate: -8 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      transition={{
        delay: index * ENTRY_STAGGER,
        type: 'spring',
        stiffness: 220,
        damping: 18,
      }}
    >
      <motion.span
        className="block mb-3 font-serif-hero font-medium text-xs tracking-widest2 text-pf-accent uppercase"
        animate={{ opacity: isRevealed ? 1 : isActive ? 0.85 : 0.4 }}
        transition={{ duration: 0.4 }}
      >
        {positionLabel}
      </motion.span>

      <motion.div
        role={tappable ? 'button' : undefined}
        aria-label={tappable ? `${positionLabel} 카드 열기` : undefined}
        tabIndex={tappable ? 0 : -1}
        onClick={handleTap}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && tappable) {
            e.preventDefault();
            handleTap();
          }
        }}
        className={`w-full aspect-[2/3] relative rounded-md ${
          tappable ? 'cursor-pointer' : ''
        }`}
        style={{ perspective: '1200px' }}
        animate={
          tappable
            ? {
                boxShadow: [
                  '0 0 0px 0px rgba(212,184,240,0)',
                  '0 0 24px 6px rgba(212,184,240,0.55)',
                  '0 0 0px 0px rgba(212,184,240,0)',
                ],
              }
            : { boxShadow: '0 0 0px 0px rgba(212,184,240,0)' }
        }
        transition={
          tappable
            ? { duration: 1.7, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.4 }
        }
        whileHover={tappable ? { scale: 1.03 } : undefined}
        whileTap={tappable ? { scale: 0.97 } : undefined}
      >
        {/* glow burst behind the card on reveal */}
        <AnimatePresence>
          {burst && (
            <motion.div
              key="burst"
              className="absolute inset-0 -m-8 pointer-events-none"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 0.95, 0], scale: [0.4, 2.4, 3.0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{
                background:
                  'radial-gradient(circle, rgba(212,184,240,0.55) 0%, rgba(200,162,232,0.18) 40%, rgba(43,32,66,0) 70%)',
                filter: 'blur(2px)',
              }}
            />
          )}
        </AnimatePresence>

        {/* sparkle ring */}
        <AnimatePresence>
          {burst && (
            <motion.div
              key="sparkles"
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <motion.span
                  key={deg}
                  className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-pf-accent-soft shadow-[0_0_8px_2px_rgba(212,184,240,0.9)]"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((deg * Math.PI) / 180) * 90,
                    y: Math.sin((deg * Math.PI) / 180) * 90,
                    opacity: 0,
                    scale: 0.4,
                  }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{ marginLeft: -3, marginTop: -3 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* the flip-card */}
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isRevealed ? 0 : 180 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 rounded-md overflow-hidden border border-pf-rose/40 shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <Image
              src={`${BASE_PATH}${card.image}`}
              alt={card.nameKo}
              fill
              sizes="(max-width: 480px) 30vw, 140px"
              className="object-cover"
              priority={index === 0}
            />
          </div>
          {/* BACK */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <CardBack />
          </div>
        </motion.div>
      </motion.div>

      {/* Below-card label: tap prompt → card name once revealed.
          Conditional unmount (no AnimatePresence) so the pulsing hint stops
          immediately when the card is revealed instead of lingering through
          an exit transition that fights with `repeat: Infinity`. */}
      <div className="mt-3 h-6 relative flex items-center justify-center">
        {isRevealed && (
          <motion.span
            className="font-serif-kr text-sm text-pf-fg-soft text-center absolute"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {card.nameKo}
          </motion.span>
        )}
        {!isRevealed && tappable && (
          <motion.span
            className="font-serif-kr text-[11px] text-pf-accent-soft tracking-widest2 absolute"
            initial={{ opacity: 0.45 }}
            animate={{ opacity: [0.45, 0.95, 0.45] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            탭하여 열기
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}
