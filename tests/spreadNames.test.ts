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
    expect(r.nameEn).toBe('Path of Radiance');
  });

  it('has at least 40 hand-curated patterns', () => {
    expect(NAMED_SPREAD_COUNT).toBeGreaterThanOrEqual(40);
  });
});

describe('spreadIdentity — fallback', () => {
  it('produces a non-empty {name, nameEn} for any tag triple × tone', () => {
    for (const a of NARRATIVE_TAGS) {
      for (const b of NARRATIVE_TAGS) {
        for (const c of NARRATIVE_TAGS) {
          for (const tone of TONES) {
            const r = spreadIdentity([a, b, c], tone);
            expect(r.name.length).toBeGreaterThan(0);
            expect(r.nameEn.length).toBeGreaterThan(0);
          }
        }
      }
    }
  });

  it('fallback name uses future-tag noun', () => {
    // Pick a triple that should NOT be in NAMED_SPREADS.
    const triple: [NarrativeTag, NarrativeTag, NarrativeTag] = [
      'attraction', 'reflection', 'transition',
    ];
    const r = spreadIdentity(triple, 'go');
    expect(r.name).toContain('강');     // future = transition → 강
    expect(r.nameEn).toContain('River'); // future = transition → River
  });

  it('fallback tone suffix maps to Korean/English correctly', () => {
    const triple: [NarrativeTag, NarrativeTag, NarrativeTag] = [
      'attraction', 'reflection', 'transition',
    ];
    expect(spreadIdentity(triple, 'go').name).toContain('길');
    expect(spreadIdentity(triple, 'go').nameEn).toContain('Path');
    expect(spreadIdentity(triple, 'stop').name).toContain('그늘');
    expect(spreadIdentity(triple, 'stop').nameEn).toContain('Shadow');
    expect(spreadIdentity(triple, 'warn').name).toContain('함정');
    expect(spreadIdentity(triple, 'warn').nameEn).toContain('Trap');
    expect(spreadIdentity(triple, 'wait').name).toContain('기다림');
    expect(spreadIdentity(triple, 'wait').nameEn).toContain('Wait');
  });
});

describe('interpret() — surfaces SpreadIdentity + strength', () => {
  const Sun = cardById(19);
  const Tower = cardById(16);

  it('Sun×3 buy → STRONG_GO with strength 100, name + nameEn set', () => {
    const r = interpret([Sun, Sun, Sun], 'buy');
    expect(r.verdict).toBe('STRONG_GO');
    expect(r.strength).toBe(100);
    expect(r.spreadName.length).toBeGreaterThan(0);
    expect(r.spreadNameEn.length).toBeGreaterThan(0);
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
