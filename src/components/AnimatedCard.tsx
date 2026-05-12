'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Card } from '@/data/cards';
import { CardBack } from './CardBack';

interface AnimatedCardProps {
  card: Card;
  positionLabel: string;
  index: number;
  flipDelay: number;  // seconds
}

const ENTRY_STAGGER = 0.18;

export function AnimatedCard({ card, positionLabel, index, flipDelay }: AnimatedCardProps) {
  const [revealed, setRevealed] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setRevealed(true), flipDelay * 1000);
    const t2 = setTimeout(() => setBurst(true), flipDelay * 1000 + 50);
    const t3 = setTimeout(() => setBurst(false), flipDelay * 1000 + 750);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [flipDelay]);

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
        className="block mb-3 font-sans-kr font-bold text-xs tracking-widest2 text-pf-accent uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0.5 }}
        transition={{ duration: 0.4 }}
      >
        {positionLabel}
      </motion.span>

      <div
        className="w-full aspect-[2/3] relative"
        style={{ perspective: '1200px' }}
      >
        {/* glow burst behind card */}
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
          animate={{ rotateY: revealed ? 0 : 180 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 rounded-md overflow-hidden border border-pf-rose/40 shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <Image
              src={card.image}
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
      </div>

      <motion.span
        className="mt-3 font-serif-kr text-sm text-pf-fg-soft text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 8 }}
        transition={{ duration: 0.4, delay: revealed ? 0.2 : 0 }}
      >
        {card.nameKo}
      </motion.span>
    </motion.div>
  );
}
