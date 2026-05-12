/**
 * Convert a 3-card spread + situation into a verdict.
 *
 * Position weights: Past 0.5 / Present 1.5 / Future 1.0 (sum = 3.0).
 * Averages are normalized by the weight sum so they stay in -3..+3 range,
 * matching the bucketize thresholds in verdicts.ts.
 */
import type { Card, SituationKey } from '@/data/cards';
import { bucketize, type VerdictKey, VERDICT_META, type VerdictMeta } from './verdicts';

export type Position = 'past' | 'present' | 'future';

export const POSITION_WEIGHT: Record<Position, number> = {
  past: 0.5,
  present: 1.5,
  future: 1.0,
};

const WEIGHT_SUM =
  POSITION_WEIGHT.past + POSITION_WEIGHT.present + POSITION_WEIGHT.future;

export interface Interpretation {
  verdict: VerdictKey;
  meta: VerdictMeta;
  pullAvg: number;     // -3..+3
  outcomeAvg: number;  // -3..+3
}

export function interpret(
  spread: readonly [Card, Card, Card],
  situation: SituationKey
): Interpretation {
  const positions: Position[] = ['past', 'present', 'future'];
  let pullSum = 0;
  let outcomeSum = 0;
  for (let i = 0; i < 3; i++) {
    const w = POSITION_WEIGHT[positions[i]!];
    const s = spread[i]!.scores[situation];
    pullSum += s.pull * w;
    outcomeSum += s.outcome * w;
  }
  const pullAvg = pullSum / WEIGHT_SUM;
  const outcomeAvg = outcomeSum / WEIGHT_SUM;
  const verdict = bucketize(pullAvg, outcomeAvg);
  return { verdict, meta: VERDICT_META[verdict], pullAvg, outcomeAvg };
}
