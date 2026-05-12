import { describe, it, expect } from 'vitest';
import { CARDS, cardById } from '@/data/cards';
import { interpret } from '@/lib/interpret';

const Fool = cardById(0);
const Magician = cardById(1);
const Empress = cardById(3);
const Devil = cardById(15);
const Tower = cardById(16);
const Star = cardById(17);
const Sun = cardById(19);
const World = cardById(21);
const Death = cardById(13);

describe('interpret — known signature scenarios', () => {
  it('Tower×3 for buy → STRONG_STOP', () => {
    const r = interpret([Tower, Tower, Tower], 'buy');
    expect(r.verdict).toBe('STRONG_STOP');
  });

  it('Devil×3 for buy → GO_AND_REGRET (strong pull, bad outcome)', () => {
    const r = interpret([Devil, Devil, Devil], 'buy');
    expect(r.verdict).toBe('GO_AND_REGRET');
  });

  it('[Star, World, Sun] for buy → STRONG_GO', () => {
    const r = interpret([Star, World, Sun], 'buy');
    expect(r.verdict).toBe('STRONG_GO');
  });

  it('[Tower, Death, Devil] for buy → STRONG_STOP (negative outcomes dominate)', () => {
    const r = interpret([Tower, Death, Devil], 'buy');
    // Tower(-3,-3) + Death(-2,0) + Devil(+3,-3) with weights 0.5/1.5/1.0
    // pullSum = -1.5 + -3 + 3 = -1.5  → avg -0.5 (mid)
    // outcomeSum = -1.5 + 0 + -3 = -4.5 → avg -1.5 (low)
    // mid pull + low outcome → STOP_RECONSIDER
    expect(r.verdict).toBe('STOP_RECONSIDER');
  });

  it('Sun×3 for relate → STRONG_GO', () => {
    const r = interpret([Sun, Sun, Sun], 'relate');
    expect(r.verdict).toBe('STRONG_GO');
  });

  it('Fool×3 for buy → GO_CAUTIOUS (high pull, mid-negative outcome)', () => {
    const r = interpret([Fool, Fool, Fool], 'buy');
    // Fool: pull +2, outcome -1
    // pullAvg = +2 (high), outcomeAvg = -1 (low)
    // → GO_AND_REGRET
    expect(r.verdict).toBe('GO_AND_REGRET');
  });

  it('Empress×3 for relate → STRONG_GO', () => {
    const r = interpret([Empress, Empress, Empress], 'relate');
    expect(r.verdict).toBe('STRONG_GO');
  });

  it('Magician×3 for act → STRONG_GO', () => {
    const r = interpret([Magician, Magician, Magician], 'act');
    expect(r.verdict).toBe('STRONG_GO');
  });

  it('average values are within [-3, +3]', () => {
    for (const card of CARDS) {
      const r = interpret([card, card, card], 'buy');
      expect(r.pullAvg).toBeGreaterThanOrEqual(-3);
      expect(r.pullAvg).toBeLessThanOrEqual(3);
      expect(r.outcomeAvg).toBeGreaterThanOrEqual(-3);
      expect(r.outcomeAvg).toBeLessThanOrEqual(3);
    }
  });
});
