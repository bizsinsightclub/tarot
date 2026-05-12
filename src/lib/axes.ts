/**
 * 8-axis radar dimensions for the magic-circle visualization.
 *
 * Each card carries a static AxisVector (-3..+3 per axis) representing its
 * archetype across these dimensions. The vector is situation-agnostic — a
 * card's "relate" weight does not change based on whether the user is asking
 * about buying, acting, or relating.
 *
 * Axis polarity:
 *   luck, opportunity, drive, clarity, relate, stability, change
 *     +3 = strong positive expression
 *      0 = neutral
 *     -3 = strong negative / blocked
 *   risk
 *     +3 = high danger / shadow signal
 *      0 = neutral
 *     -3 = actively stabilizing / anti-risk
 *
 * Display normalization: (value + 3) / 6 maps -3..+3 → 0..1 for the radar
 * polygon, where 0 = center and 1 = outer rim. Risk is NOT inverted; it is
 * drawn raw so the magic circle shows the threat as it is (per user choice).
 */

export type AxisKey =
  | 'luck'
  | 'opportunity'
  | 'drive'
  | 'clarity'
  | 'relate'
  | 'stability'
  | 'change'
  | 'risk';

export const AXIS_ORDER: readonly AxisKey[] = [
  'luck',
  'opportunity',
  'drive',
  'clarity',
  'relate',
  'stability',
  'change',
  'risk',
];

export const AXIS_LABEL_KO: Record<AxisKey, string> = {
  luck:        '행운',
  opportunity: '기회',
  drive:       '추진',
  clarity:     '명료',
  relate:      '관계',
  stability:   '안정',
  change:      '변화',
  risk:        '리스크',
};

export type AxisVector = Record<AxisKey, number>;

export const ZERO_AXES: AxisVector = {
  luck: 0, opportunity: 0, drive: 0, clarity: 0,
  relate: 0, stability: 0, change: 0, risk: 0,
};

/**
 * Compact tuple form, ordered per AXIS_ORDER.
 * [luck, opportunity, drive, clarity, relate, stability, change, risk]
 */
export type AxisTuple = readonly [
  number, number, number, number,
  number, number, number, number,
];

export function axesFromTuple(t: AxisTuple): AxisVector {
  return {
    luck:        t[0],
    opportunity: t[1],
    drive:       t[2],
    clarity:     t[3],
    relate:      t[4],
    stability:   t[5],
    change:      t[6],
    risk:        t[7],
  };
}

/** Map a raw -3..+3 axis value to a 0..1 display ratio for the radar. */
export function axisDisplayRatio(value: number): number {
  const clamped = Math.max(-3, Math.min(3, value));
  return (clamped + 3) / 6;
}
