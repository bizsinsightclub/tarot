/**
 * Narrative tagging for tarot cards — used by the spread-naming and
 * cold-reading copy system. Each of the 78 cards carries exactly one
 * NarrativeTag describing its dominant story role. Triples of tags
 * (past, present, future) feed `spreadIdentity()` in `spreadNames.ts`.
 */

export type NarrativeTag =
  | 'beginning'   // 시작 — new chapter, opportunity opening
  | 'apex'        // 정점 — culmination, fulfillment, success
  | 'abundance'   // 풍요 — material wealth, generosity, comfort
  | 'resolve'     // 결심 — will, focus, discipline
  | 'luck'        // 흐름 — favorable timing, external winds
  | 'revelation'  // 폭로 — truth surfacing, clarity through pain
  | 'attraction'  // 끌림 — desire, temptation, magnetic pull
  | 'loss'        // 상실 — ending, grief, depletion
  | 'confusion'   // 혼란 — illusion, fog, indecision
  | 'conflict'    // 갈등 — friction, competition, struggle
  | 'reflection'  // 사색 — withdrawal, introspection, pause
  | 'transition'; // 변화 — transformation, ending into beginning

export const NARRATIVE_TAGS: readonly NarrativeTag[] = [
  'beginning', 'apex', 'abundance', 'resolve',
  'luck', 'revelation', 'attraction', 'loss',
  'confusion', 'conflict', 'reflection', 'transition',
];

export const TAG_KO: Record<NarrativeTag, string> = {
  beginning:  '시작',
  apex:       '정점',
  abundance:  '풍요',
  resolve:    '결심',
  luck:       '흐름',
  revelation: '폭로',
  attraction: '끌림',
  loss:       '상실',
  confusion:  '혼란',
  conflict:   '갈등',
  reflection: '사색',
  transition: '변화',
};

/**
 * Evocative noun per tag — used by the fallback name + cold-reading copy
 * templates. Keep each to 1-2 syllables for compact 5-word phrases.
 */
export const TAG_NOUN: Record<NarrativeTag, string> = {
  beginning:  '씨앗',
  apex:       '햇볕',
  abundance:  '곳간',
  resolve:    '심지',
  luck:       '바람',
  revelation: '진실',
  attraction: '거울',
  loss:       '낙엽',
  confusion:  '안개',
  conflict:   '칼날',
  reflection: '등불',
  transition: '강',
};

// ---------- Hangul particle helpers ----------
// 받침(jongseong)에 따라 조사가 달라지므로 명사 끝 음절을 본다.

/** Returns the jongseong index (0 = no batchim, 1-27 = consonant codes). */
function jongseong(word: string): number {
  if (!word) return 0;
  const ch = word.charCodeAt(word.length - 1);
  if (ch < 0xAC00 || ch > 0xD7A3) return 0;
  return (ch - 0xAC00) % 28;
}

/** Whether the last syllable has a final consonant (받침). */
export function hasJongseong(word: string): boolean {
  return jongseong(word) > 0;
}

/** Append topic particle: 이 if batchim, else 가. */
export function withI(noun: string): string {
  return noun + (hasJongseong(noun) ? '이' : '가');
}

/** Append object particle: 을 if batchim, else 를. */
export function withEul(noun: string): string {
  return noun + (hasJongseong(noun) ? '을' : '를');
}

/** Append directional particle: 으로 (except ㄹ batchim → 로), or 로 if no batchim. */
export function withRo(noun: string): string {
  const j = jongseong(noun);
  if (j === 0 || j === 8) return noun + '로'; // 8 = ㄹ
  return noun + '으로';
}
