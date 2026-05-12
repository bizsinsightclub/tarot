/**
 * 9-cell verdict grid based on (pull, outcome) averages.
 *
 * Both axes are averaged across the 3 weighted card scores, ranging -3..+3.
 * Thresholds:
 *   high  : value >=  1.0
 *   mid   : -1.0 < value < 1.0
 *   low   : value <= -1.0
 */

export type VerdictKey =
  | 'STRONG_GO'
  | 'GO_CAUTIOUS'
  | 'GO_AND_REGRET'
  | 'HESITATE_BUT_GO'
  | 'NEUTRAL_WAIT'
  | 'STOP_RECONSIDER'
  | 'MISSED_CHANCE'
  | 'SAFE_TO_PASS'
  | 'STRONG_STOP';

export type Tone = 'go' | 'stop' | 'wait' | 'warn';

export interface VerdictMeta {
  key: VerdictKey;
  ko: string;
  description: string;
  tone: Tone;
}

export const VERDICT_META: Record<VerdictKey, VerdictMeta> = {
  STRONG_GO: {
    key: 'STRONG_GO',
    ko: '강하게 GO',
    description: '카드가 명확히 행동을 추천합니다. 망설이지 마세요.',
    tone: 'go',
  },
  GO_CAUTIOUS: {
    key: 'GO_CAUTIOUS',
    ko: '조건부 GO',
    description: '끌림은 강하지만 결과가 보장되지 않습니다. 단서를 두고 진행하세요.',
    tone: 'go',
  },
  GO_AND_REGRET: {
    key: 'GO_AND_REGRET',
    ko: '유혹의 카드 — 끌리지만 후회',
    description: '강하게 끌리는 만큼 후회의 신호도 강합니다. 욕망을 점검하세요.',
    tone: 'warn',
  },
  HESITATE_BUT_GO: {
    key: 'HESITATE_BUT_GO',
    ko: '주저하지 마라 — 결과는 좋다',
    description: '망설임이 결과를 가립니다. 카드는 결과의 긍정을 보여줍니다.',
    tone: 'go',
  },
  NEUTRAL_WAIT: {
    key: 'NEUTRAL_WAIT',
    ko: '결정 보류',
    description: '신호가 충분하지 않습니다. 정보를 더 모으거나 시간을 두세요.',
    tone: 'wait',
  },
  STOP_RECONSIDER: {
    key: 'STOP_RECONSIDER',
    ko: '멈추고 재검토',
    description: '결과가 흐릿합니다. 지금의 선택은 재고가 필요합니다.',
    tone: 'stop',
  },
  MISSED_CHANCE: {
    key: 'MISSED_CHANCE',
    ko: '놓치고 있는 기회',
    description: '끌리지 않지만 결과는 좋습니다. 회피의 이유를 다시 보세요.',
    tone: 'wait',
  },
  SAFE_TO_PASS: {
    key: 'SAFE_TO_PASS',
    ko: '패스해도 안전',
    description: '하지 않아도 큰 손해는 없습니다. 다음 기회로 미루세요.',
    tone: 'wait',
  },
  STRONG_STOP: {
    key: 'STRONG_STOP',
    ko: '강하게 STOP',
    description: '카드는 분명한 후퇴를 권합니다. 손실을 줄이세요.',
    tone: 'stop',
  },
};

const HIGH = 1.0;
const LOW = -1.0;

type Band = 'high' | 'mid' | 'low';

function band(v: number): Band {
  if (v >= HIGH) return 'high';
  if (v <= LOW) return 'low';
  return 'mid';
}

export function bucketize(pullAvg: number, outcomeAvg: number): VerdictKey {
  const p = band(pullAvg);
  const o = band(outcomeAvg);

  // pull \ outcome | low(neg)        | mid(neutral)   | high(pos)
  // high           | GO_AND_REGRET   | GO_CAUTIOUS    | STRONG_GO
  // mid            | STOP_RECONSIDER | NEUTRAL_WAIT   | HESITATE_BUT_GO
  // low            | STRONG_STOP     | SAFE_TO_PASS   | MISSED_CHANCE

  if (p === 'high' && o === 'low')  return 'GO_AND_REGRET';
  if (p === 'high' && o === 'mid')  return 'GO_CAUTIOUS';
  if (p === 'high' && o === 'high') return 'STRONG_GO';

  if (p === 'mid'  && o === 'low')  return 'STOP_RECONSIDER';
  if (p === 'mid'  && o === 'mid')  return 'NEUTRAL_WAIT';
  if (p === 'mid'  && o === 'high') return 'HESITATE_BUT_GO';

  if (p === 'low'  && o === 'low')  return 'STRONG_STOP';
  if (p === 'low'  && o === 'mid')  return 'SAFE_TO_PASS';
  return 'MISSED_CHANCE'; // p === 'low' && o === 'high'
}
