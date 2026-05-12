import { describe, it, expect } from 'vitest';
import { CARDS, cardById } from '@/data/cards';
import { computeAxesAvg, interpret } from '@/lib/interpret';
import { AXIS_ORDER, axisDisplayRatio } from '@/lib/axes';

const Sun = cardById(19);
const Tower = cardById(16);
const Fool = cardById(0);
const Magician = cardById(1);
const Empress = cardById(3);

describe('computeAxesAvg', () => {
  it('Sun×3 yields Sun.axes exactly', () => {
    const result = computeAxesAvg([Sun, Sun, Sun]);
    for (const axis of AXIS_ORDER) {
      expect(result[axis]).toBeCloseTo(Sun.axes[axis], 6);
    }
  });

  it('Tower×3 yields Tower.axes exactly', () => {
    const result = computeAxesAvg([Tower, Tower, Tower]);
    for (const axis of AXIS_ORDER) {
      expect(result[axis]).toBeCloseTo(Tower.axes[axis], 6);
    }
  });

  it('applies position weights Past 0.5 / Present 1.5 / Future 1.0', () => {
    // [Fool(past), Magician(present), Empress(future)] for the 'luck' axis:
    //   Fool.luck = +2, Magician.luck = +1, Empress.luck = +2
    //   sum = 2*0.5 + 1*1.5 + 2*1.0 = 1.0 + 1.5 + 2.0 = 4.5
    //   avg = 4.5 / 3.0 = 1.5
    const result = computeAxesAvg([Fool, Magician, Empress]);
    expect(result.luck).toBeCloseTo(1.5, 6);
  });

  it('all axis averages stay within [-3, +3] for any single-card triple', () => {
    for (const card of CARDS) {
      const result = computeAxesAvg([card, card, card]);
      for (const axis of AXIS_ORDER) {
        expect(result[axis]).toBeGreaterThanOrEqual(-3);
        expect(result[axis]).toBeLessThanOrEqual(3);
      }
    }
  });

  it('all 78 cards declare an axes value for every axis', () => {
    for (const card of CARDS) {
      for (const axis of AXIS_ORDER) {
        const v = card.axes[axis];
        expect(typeof v).toBe('number');
        expect(v).toBeGreaterThanOrEqual(-3);
        expect(v).toBeLessThanOrEqual(3);
      }
    }
  });
});

describe('interpret() returns axes alongside verdict', () => {
  it('exposes the same axes vector as computeAxesAvg', () => {
    const r = interpret([Sun, Sun, Sun], 'buy');
    const direct = computeAxesAvg([Sun, Sun, Sun]);
    for (const axis of AXIS_ORDER) {
      expect(r.axes[axis]).toBeCloseTo(direct[axis], 6);
    }
  });

  it('does not break existing pullAvg/outcomeAvg behaviour (regression)', () => {
    const r = interpret([Tower, Tower, Tower], 'buy');
    expect(r.verdict).toBe('STRONG_STOP');
    expect(r.pullAvg).toBeCloseTo(-3, 6);
    expect(r.outcomeAvg).toBeCloseTo(-3, 6);
  });
});

describe('axisDisplayRatio', () => {
  it('maps -3 → 0, 0 → 0.5, +3 → 1', () => {
    expect(axisDisplayRatio(-3)).toBeCloseTo(0, 6);
    expect(axisDisplayRatio(0)).toBeCloseTo(0.5, 6);
    expect(axisDisplayRatio(3)).toBeCloseTo(1, 6);
  });

  it('clamps out-of-range inputs', () => {
    expect(axisDisplayRatio(-5)).toBe(0);
    expect(axisDisplayRatio(7)).toBe(1);
  });
});
