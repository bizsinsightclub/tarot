import { describe, it, expect } from 'vitest';
import { drawThree, shuffle } from '@/lib/draw';
import { CARDS } from '@/data/cards';

describe('drawThree', () => {
  it('returns exactly 3 distinct cards', () => {
    for (let i = 0; i < 200; i++) {
      const [a, b, c] = drawThree();
      expect(a.id).not.toBe(b.id);
      expect(a.id).not.toBe(c.id);
      expect(b.id).not.toBe(c.id);
    }
  });

  it('all cards appear with reasonable frequency over many draws', () => {
    const counts = new Array(CARDS.length).fill(0);
    const N = 3000;
    for (let i = 0; i < N; i++) {
      const spread = drawThree();
      for (const card of spread) counts[card.id]++;
    }
    // Expected: N * 3 / deckSize. Allow wide slack (variance grows with deck size).
    const expected = (N * 3) / CARDS.length;
    for (let id = 0; id < CARDS.length; id++) {
      expect(counts[id]).toBeGreaterThan(expected * 0.4);
      expect(counts[id]).toBeLessThan(expected * 1.8);
    }
  });
});

describe('shuffle', () => {
  it('preserves all elements (length + multiset)', () => {
    const shuffled = shuffle(CARDS);
    expect(shuffled.length).toBe(CARDS.length);
    const ids = shuffled.map((c) => c.id).sort((a, b) => a - b);
    const original = CARDS.map((c) => c.id).sort((a, b) => a - b);
    expect(ids).toEqual(original);
  });

  it('does not mutate the input', () => {
    const before = CARDS.map((c) => c.id);
    shuffle(CARDS);
    const after = CARDS.map((c) => c.id);
    expect(after).toEqual(before);
  });
});
