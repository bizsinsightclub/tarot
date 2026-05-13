/**
 * Convert a 3-card spread + situation into a verdict.
 *
 * Position weights: Past 0.5 / Present 1.5 / Future 1.0 (sum = 3.0).
 * Averages are normalized by the weight sum so they stay in -3..+3 range,
 * matching the bucketize thresholds in verdicts.ts.
 *
 * The same weighting is reused to average each card's 8-axis vector for the
 * magic-circle radar. Spread identity (name + cold-reading copy) is derived
 * from the cards' narrative tags + verdict tone.
 */
import type { Card, SituationKey } from '@/data/cards';
import { bucketize, type VerdictKey, VERDICT_META, type VerdictMeta } from './verdicts';
import { AXIS_ORDER, type AxisVector, type AxisKey, ZERO_AXES } from './axes';
import { spreadIdentity } from './spreadNames';
import type { NarrativeTag } from './narrative';

export type Position = 'past' | 'present' | 'future';

export const POSITION_WEIGHT: Record<Position, number> = {
  past: 0.5,
  present: 1.5,
  future: 1.0,
};

const WEIGHT_SUM =
  POSITION_WEIGHT.past + POSITION_WEIGHT.present + POSITION_WEIGHT.future;

const POSITIONS: readonly Position[] = ['past', 'present', 'future'];

export interface Interpretation {
  verdict: VerdictKey;
  meta: VerdictMeta;
  pullAvg: number;     // -3..+3
  outcomeAvg: number;  // -3..+3
  axes: AxisVector;    // 8 dims, each -3..+3
  strength: number;    // 0..100, magnitude of (pullAvg, outcomeAvg)
  spreadName: string;  // e.g. "광휘의 길"
  spreadCopy: string;  // e.g. "씨앗이 햇볕을 만난다"
}

export function computeAxesAvg(
  spread: readonly [Card, Card, Card]
): AxisVector {
  const result: AxisVector = { ...ZERO_AXES };
  for (const axis of AXIS_ORDER as readonly AxisKey[]) {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      const w = POSITION_WEIGHT[POSITIONS[i]!];
      sum += spread[i]!.axes[axis] * w;
    }
    result[axis] = sum / WEIGHT_SUM;
  }
  return result;
}

/**
 * Strength = how far the spread sits from the verdict origin (0, 0).
 * STRONG_GO at +3/+3 or STRONG_STOP at -3/-3 → 100.
 * NEUTRAL_WAIT at 0/0 → 0. GO_AND_REGRET at +3/-3 → 100.
 */
function computeStrength(pullAvg: number, outcomeAvg: number): number {
  const magnitude = Math.sqrt(pullAvg ** 2 + outcomeAvg ** 2);
  const max = Math.sqrt(18); // sqrt(3^2 + 3^2)
  return Math.round((magnitude / max) * 100);
}

export function interpret(
  spread: readonly [Card, Card, Card],
  situation: SituationKey
): Interpretation {
  let pullSum = 0;
  let outcomeSum = 0;
  for (let i = 0; i < 3; i++) {
    const w = POSITION_WEIGHT[POSITIONS[i]!];
    const s = spread[i]!.scores[situation];
    pullSum += s.pull * w;
    outcomeSum += s.outcome * w;
  }
  const pullAvg = pullSum / WEIGHT_SUM;
  const outcomeAvg = outcomeSum / WEIGHT_SUM;
  const verdict = bucketize(pullAvg, outcomeAvg);
  const meta = VERDICT_META[verdict];
  const axes = computeAxesAvg(spread);
  const strength = computeStrength(pullAvg, outcomeAvg);

  const tags: [NarrativeTag, NarrativeTag, NarrativeTag] = [
    spread[0]!.narrativeTag,
    spread[1]!.narrativeTag,
    spread[2]!.narrativeTag,
  ];
  const identity = spreadIdentity(tags, meta.tone);

  return {
    verdict,
    meta,
    pullAvg,
    outcomeAvg,
    axes,
    strength,
    spreadName: identity.name,
    spreadCopy: identity.copy,
  };
}
