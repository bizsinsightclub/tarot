import { describe, it, expect } from 'vitest';
import { spreadIdentity, NAMED_SPREAD_COUNT } from '@/lib/spreadNames';
import { NARRATIVE_TAGS, type NarrativeTag } from '@/lib/narrative';
import type { Tone } from '@/lib/verdicts';
import { CARDS, cardById } from '@/data/cards';
import { interpret } from '@/lib/interpret';

const TONES: Tone[] = ['go', 'stop', 'warn', 'wait'];

describe('spreadIdentity — named lookup', () => {
  it('returns hand-curated entry for known triple', () => {
    const r = spreadIdentity(['beginning', 'resolve', 'apex'], 'go');
    expect(r.name).toBe('광휘의 길');
    expect(r.copy).toBe('씨앗이 햇볕을 만난다');
  });

  it('has at least 40 hand-curated patterns', () => {
    expect(NAMED_SPREAD_COUNT).toBeGreaterThanOrEqual(40);
  });
});

describe('spreadIdentity — fallback', () => {
  it('produces a non-empty {name, copy} for any tag triple × tone', () => {
    for (const a of NARRATIVE_TAGS) {
      for (const b of NARRATIVE_TAGS) {
        for (const c of NARRATIVE_TAGS) {
          for (const tone of TONES) {
            const r = spreadIdentity([a, b, c], tone);
            expect(r.name.length).toBeGreaterThan(0);
            expect(r.copy.length).toBeGreaterThan(0);
          }
        }
      }
    }
  });

  it('fallback copy stays within 5 어절', () => {
    // Pick a triple that is NOT in NAMED_SPREADS.
    const triple: [NarrativeTag, NarrativeTag, NarrativeTag] = [
      'attraction', 'reflection', 'transition',
    ];
    for (const tone of TONES) {
      const r = spreadIdentity(triple, tone);
      const words = r.copy.split(/\s+/).filter(Boolean);
      expect(words.length).toBeLessThanOrEqual(5);
    }
  });

  it('fallback name uses future-tag noun', () => {
    const r = spreadIdentity(['attraction', 'reflection', 'transition'], 'go');
    // future tag = transition → noun "강"
    expect(r.name).toContain('강');
  });

  it('go tone fallback uses 닿는다, stop uses 잠긴다', () => {
    // Pick triples with unique fallback (NAMED lookup miss).
    const a = spreadIdentity(['conflict', 'apex', 'beginning'], 'go');
    expect(a.copy).toContain('닿는다');

    const b = spreadIdentity(['apex', 'beginning', 'confusion'], 'stop');
    expect(b.copy).toContain('잠긴다');
  });
});

describe('interpret() — surface SpreadIdentity + strength', () => {
  const Sun = cardById(19);
  const Tower = cardById(16);

  it('Sun×3 buy → STRONG_GO with strength 100', () => {
    const r = interpret([Sun, Sun, Sun], 'buy');
    expect(r.verdict).toBe('STRONG_GO');
    expect(r.strength).toBe(100);
    expect(r.spreadName.length).toBeGreaterThan(0);
    expect(r.spreadCopy.length).toBeGreaterThan(0);
  });

  it('Tower×3 buy → STRONG_STOP with strength 100', () => {
    const r = interpret([Tower, Tower, Tower], 'buy');
    expect(r.verdict).toBe('STRONG_STOP');
    expect(r.strength).toBe(100);
  });

  it('strength is integer in 0..100 for every card×3', () => {
    for (const card of CARDS) {
      const r = interpret([card, card, card], 'buy');
      expect(Number.isInteger(r.strength)).toBe(true);
      expect(r.strength).toBeGreaterThanOrEqual(0);
      expect(r.strength).toBeLessThanOrEqual(100);
    }
  });
});
