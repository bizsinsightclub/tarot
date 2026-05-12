/**
 * Cryptographically secure card drawing.
 *
 * NEVER use Math.random here — see lesson L01.
 * Uses globalThis.crypto.getRandomValues for unbiased Fisher-Yates shuffle.
 */
import { CARDS, type Card } from '@/data/cards';

export type Spread3 = [Card, Card, Card];

function unbiasedRandomInt(maxExclusive: number): number {
  if (maxExclusive <= 0) throw new Error('maxExclusive must be > 0');
  if (maxExclusive === 1) return 0;
  // Rejection sampling so the modulo bias does not skew low ids.
  const range = 0x1_0000_0000; // 2^32
  const limit = range - (range % maxExclusive);
  const buf = new Uint32Array(1);
  while (true) {
    globalThis.crypto.getRandomValues(buf);
    if (buf[0]! < limit) {
      return buf[0]! % maxExclusive;
    }
  }
}

export function shuffle<T>(arr: readonly T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = unbiasedRandomInt(i + 1);
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

export function drawThree(deck: readonly Card[] = CARDS): Spread3 {
  if (deck.length < 3) throw new Error('Deck must have at least 3 cards');
  const shuffled = shuffle(deck);
  return [shuffled[0]!, shuffled[1]!, shuffled[2]!];
}
