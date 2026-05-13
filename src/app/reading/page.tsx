'use client';

import { useCallback, useEffect, useRef, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { SectionLabel } from '@/components/SectionLabel';
import { CardSpread } from '@/components/CardSpread';
import { MagicCircle } from '@/components/MagicCircle';
import { VerdictPanel } from '@/components/VerdictPanel';
import { Footnote } from '@/components/Footnote';
import { drawThree, type Spread3 } from '@/lib/draw';
import { interpret, type Interpretation } from '@/lib/interpret';
import { situationByKey } from '@/data/situations';
import type { SituationKey } from '@/data/cards';

// MagicCircle settles around 1.95s after mount; verdict text fades in at
// VERDICT_TEXT_DELAY_S; scroll fires once both have had time to land.
const VERDICT_TEXT_DELAY_S = 1.7;
const AUTO_SCROLL_AFTER_MS = (VERDICT_TEXT_DELAY_S + 0.9) * 1000;

function ReadingInner() {
  const params = useSearchParams();
  const sParam = params.get('s');
  const situation = sParam ? situationByKey(sParam) : undefined;

  const [spread, setSpread] = useState<Spread3 | null>(null);
  const [reading, setReading] = useState<Interpretation | null>(null);
  const [showVerdict, setShowVerdict] = useState(false);
  const [drawKey, setDrawKey] = useState(0);
  const verdictAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!situation) return;
    setShowVerdict(false);
    const next = drawThree();
    setSpread(next);
    setReading(interpret(next, situation.key as SituationKey));
  }, [situation, drawKey]);

  // Smooth-scroll to the verdict once it appears and has had a moment to settle.
  useEffect(() => {
    if (!showVerdict) return;
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = window.setTimeout(() => {
      verdictAnchorRef.current?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'center',
      });
    }, AUTO_SCROLL_AFTER_MS);
    return () => window.clearTimeout(t);
  }, [showVerdict, drawKey]);

  const handleSpreadComplete = useCallback(() => {
    setShowVerdict(true);
  }, []);

  if (!situation) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <p className="font-serif-kr text-pf-fg-soft">
            상황을 먼저 선택해 주세요.
          </p>
          <Link
            href="/"
            className="mt-6 font-serif-hero text-sm tracking-widest3 uppercase text-pf-accent hover:text-pf-accent-soft"
          >
            처음으로
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center px-6 pb-12">
        <h1 className="mt-4 font-serif-kr font-bold text-2xl text-pf-fg text-center">
          {situation.ko}
        </h1>
        <p className="mt-2 font-serif-kr text-sm text-pf-fg-soft text-center">
          {situation.question}
        </p>

        {spread && (
          <div className="mt-10 w-full">
            <CardSpread
              spread={spread}
              drawKey={drawKey}
              onComplete={handleSpreadComplete}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {showVerdict && reading && (
            <motion.div
              key={`v-${drawKey}`}
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mt-12 mx-auto h-px w-24 bg-pf-rose" />
              <SectionLabel className="mt-8 mb-4">Verdict</SectionLabel>
              <MagicCircle axes={reading.axes} />
              <div ref={verdictAnchorRef} className="mt-6 scroll-mt-16">
                <VerdictPanel
                  meta={reading.meta}
                  strength={reading.strength}
                  spreadName={reading.spreadName}
                  spreadNameEn={reading.spreadNameEn}
                  delay={VERDICT_TEXT_DELAY_S}
                />
              </div>
              <div className="mt-8 flex gap-3 justify-center">
                <button
                  onClick={() => setDrawKey((k) => k + 1)}
                  className="px-5 py-2.5 rounded-md border border-pf-accent/40 bg-pf-bg/40 hover:bg-pf-accent/10 font-serif-kr text-sm text-pf-fg-soft transition-colors"
                >
                  다시 뽑기
                </button>
                <Link
                  href="/"
                  className="px-5 py-2.5 rounded-md border border-pf-mute/30 hover:bg-pf-mute/10 font-serif-kr text-sm text-pf-mute transition-colors"
                >
                  처음으로
                </Link>
              </div>
              <Footnote>
                같은 상황을 반복 추첨하면 의미가 흐려질 수 있습니다.
              </Footnote>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default function ReadingPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          <p className="font-serif-kr text-pf-mute">로딩 중…</p>
        </main>
      }
    >
      <ReadingInner />
    </Suspense>
  );
}
