import { describe, it, expect } from 'vitest';
import { bucketize } from '@/lib/verdicts';

describe('bucketize — 9-cell verdict grid', () => {
  it('high pull + high outcome → STRONG_GO', () => {
    expect(bucketize(2.5, 2.5)).toBe('STRONG_GO');
    expect(bucketize(1.0, 1.0)).toBe('STRONG_GO'); // boundary inclusive
  });

  it('high pull + low outcome → GO_AND_REGRET', () => {
    expect(bucketize(2.5, -2.5)).toBe('GO_AND_REGRET');
    expect(bucketize(1.0, -1.0)).toBe('GO_AND_REGRET');
  });

  it('high pull + mid outcome → GO_CAUTIOUS', () => {
    expect(bucketize(2.0, 0.5)).toBe('GO_CAUTIOUS');
  });

  it('mid pull + high outcome → HESITATE_BUT_GO', () => {
    expect(bucketize(0.5, 2.0)).toBe('HESITATE_BUT_GO');
  });

  it('mid pull + mid outcome → NEUTRAL_WAIT', () => {
    expect(bucketize(0, 0)).toBe('NEUTRAL_WAIT');
    expect(bucketize(0.99, -0.99)).toBe('NEUTRAL_WAIT');
  });

  it('mid pull + low outcome → STOP_RECONSIDER', () => {
    expect(bucketize(0, -2)).toBe('STOP_RECONSIDER');
  });

  it('low pull + low outcome → STRONG_STOP', () => {
    expect(bucketize(-2.5, -2.5)).toBe('STRONG_STOP');
    expect(bucketize(-1.0, -1.0)).toBe('STRONG_STOP');
  });

  it('low pull + mid outcome → SAFE_TO_PASS', () => {
    expect(bucketize(-2, 0)).toBe('SAFE_TO_PASS');
  });

  it('low pull + high outcome → MISSED_CHANCE', () => {
    expect(bucketize(-2, 2)).toBe('MISSED_CHANCE');
  });
});
