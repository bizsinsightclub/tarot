/**
 * Spread identity = combination name + cold-reading copy.
 *
 * Driven entirely by the (past, present, future) NarrativeTag triple plus
 * verdict tone. Hand-curated NAMED_SPREADS covers ~50 evocative archetypes;
 * everything else falls back to a tone-driven template assembled from the
 * tag NOUN dictionary.
 *
 * Copy style (per user spec):
 *   - 5 어절 이내
 *   - 바넘 효과 + 신비감 어휘 (운명, 결실, 전환점, 시절인연 등 톤)
 *   - 과거 → 현재 → 미래 서사 흐름
 */

import { TAG_NOUN, withI, withEul, withRo, type NarrativeTag } from './narrative';
import type { Tone } from './verdicts';

export interface SpreadIdentity {
  name: string; // 조합 명칭, e.g. "광휘의 길"
  copy: string; // 5-word cold-reading, e.g. "씨앗이 햇볕을 만난다"
}

/** Key = `${past}_${present}_${future}` */
const NAMED_SPREADS: Record<string, SpreadIdentity> = {
  // STRONG_GO / GO leaning
  'beginning_resolve_apex':      { name: '광휘의 길',     copy: '씨앗이 햇볕을 만난다' },
  'beginning_apex_apex':         { name: '단숨 정점',     copy: '씨앗이 햇볕을 부른다' },
  'beginning_beginning_beginning': { name: '삼중 시작',   copy: '씨앗 위에 새 씨앗' },
  'apex_abundance_abundance':    { name: '왕좌의 시간',   copy: '결실이 결실을 잇는다' },
  'apex_apex_apex':              { name: '광휘의 절정',   copy: '햇볕이 햇볕을 부른다' },
  'resolve_resolve_apex':        { name: '의지의 정점',   copy: '심지가 햇볕을 향한다' },
  'resolve_conflict_apex':       { name: '쟁의 끝 정점',  copy: '심지가 칼날을 넘는다' },
  'luck_resolve_apex':           { name: '운명의 손짓',   copy: '바람이 햇볕을 부른다' },
  'luck_luck_apex':              { name: '삼중 행운',     copy: '흐름이 정점을 부른다' },
  'revelation_resolve_apex':     { name: '진실의 길',     copy: '진실이 햇볕을 비춘다' },
  'attraction_resolve_apex':     { name: '욕망의 결실',   copy: '거울이 햇볕을 비춘다' },
  'loss_resolve_apex':           { name: '재기의 길',     copy: '낙엽이 심지를 키운다' },
  'loss_transition_apex':        { name: '죽음 너머 빛',  copy: '낙엽이 햇볕을 부른다' },
  'loss_reflection_abundance':   { name: '비워야 채움',   copy: '낙엽이 곳간을 부른다' },
  'reflection_resolve_apex':     { name: '사색의 결실',   copy: '등불이 햇볕을 켠다' },
  'reflection_reflection_apex':  { name: '고요 끝의 빛',  copy: '등불이 햇볕을 깨운다' },
  'transition_resolve_apex':     { name: '전환의 결실',   copy: '강이 햇볕에 닿는다' },
  'transition_transition_apex':  { name: '거듭난 길',     copy: '강이 강을 넘는다' },
  'transition_reflection_apex':  { name: '깊은 전환',     copy: '강이 등불을 켠다' },
  'confusion_revelation_apex':   { name: '폭로의 새벽',   copy: '안개가 진실을 깨운다' },
  'confusion_resolve_revelation': { name: '안개 가르기',  copy: '안개가 진실로 흩어진다' },
  'abundance_resolve_apex':      { name: '결실의 정점',   copy: '곳간이 햇볕에 닿는다' },

  // STRONG_STOP / STOP leaning
  'loss_loss_loss':              { name: '깊은 어둠',     copy: '낙엽이 낙엽을 덮는다' },
  'loss_transition_reflection':  { name: '재의 시간',     copy: '낙엽이 등불로 가라앉는다' },
  'apex_loss_loss':              { name: '추락의 길',     copy: '햇볕이 낙엽으로 진다' },
  'apex_loss_reflection':        { name: '정점의 끝',     copy: '햇볕이 등불로 사위어간다' },
  'apex_transition_transition':  { name: '정점의 변곡',   copy: '햇볕이 강으로 흐른다' },
  'abundance_abundance_loss':    { name: '풍요 끝 그늘',  copy: '곳간이 낙엽으로 진다' },
  'conflict_conflict_loss':      { name: '소진의 끝',     copy: '칼날이 칼날을 갉는다' },
  'reflection_reflection_loss':  { name: '머문 자리',     copy: '등불이 낙엽으로 식는다' },
  'reflection_loss_loss':        { name: '고요의 잠식',   copy: '등불이 어둠에 잠긴다' },
  'transition_loss_loss':        { name: '추락의 강',     copy: '강이 낙엽 위 흐른다' },
  'confusion_confusion_confusion': { name: '깊은 안개',   copy: '안개가 안개를 부른다' },
  'confusion_loss_loss':         { name: '안개 속 추락',  copy: '안개가 낙엽을 부른다' },
  'transition_transition_loss':  { name: '엇갈린 흐름',   copy: '강이 낙엽으로 흩어진다' },

  // GO_AND_REGRET / WARN
  'attraction_attraction_loss':  { name: '유혹의 함정',   copy: '거울이 낙엽을 부른다' },
  'attraction_attraction_attraction': { name: '욕망의 굴레', copy: '거울이 거울을 비춘다' },
  'attraction_loss_loss':        { name: '욕망의 폐허',   copy: '거울이 낙엽 위 깨진다' },
  'attraction_resolve_revelation': { name: '욕망의 진실', copy: '거울이 진실을 드러낸다' },
  'attraction_apex_loss':        { name: '단꿈의 끝',     copy: '거울이 햇볕에 부서진다' },
  'beginning_attraction_loss':   { name: '풋설의 끝',     copy: '씨앗이 거울에 빛바랜다' },
  'apex_attraction_loss':        { name: '정점의 그늘',   copy: '햇볕이 거울에 깨진다' },
  'resolve_attraction_loss':     { name: '의지의 흔들림', copy: '심지가 거울에 흔들린다' },
  'luck_attraction_loss':        { name: '바람의 유혹',   copy: '바람이 거울을 깨뜨린다' },
  'attraction_confusion_loss':   { name: '환영의 길',     copy: '거울이 안개로 흐려진다' },

  // WAIT / NEUTRAL
  'reflection_reflection_reflection': { name: '삼중 침묵', copy: '등불이 등불을 부른다' },
  'reflection_confusion_reflection': { name: '머문 안개',  copy: '등불이 안개에 잠긴다' },
  'confusion_confusion_revelation': { name: '안개 끝 빛',  copy: '안개가 진실로 걷힌다' },
  'luck_confusion_reflection':   { name: '머무는 바람',   copy: '바람이 등불에 머문다' },
  'beginning_confusion_revelation': { name: '안개 너머 빛', copy: '씨앗이 진실을 깨운다' },

  // MISSED_CHANCE
  'reflection_reflection_abundance': { name: '놓친 풍요', copy: '등불이 곳간을 흘린다' },
  'reflection_loss_abundance':   { name: '뒤늦은 결실',   copy: '등불이 곳간을 늦춘다' },
  'loss_loss_abundance':         { name: '잃고 채움',     copy: '낙엽이 곳간으로 변한다' },
};

const TONE_NAME_SUFFIX: Record<Tone, string> = {
  go:   '길',     // path forward
  stop: '그늘',   // shadow
  warn: '함정',   // trap
  wait: '기다림', // waiting
};

const TONE_VERB: Record<Tone, string> = {
  go:   '닿는다',   // reaches
  stop: '잠긴다',   // sinks into
  warn: '가린다',   // obscures
  wait: '흐른다',   // flows
};

function composeName(futureTag: NarrativeTag, tone: Tone): string {
  return `${TAG_NOUN[futureTag]}의 ${TONE_NAME_SUFFIX[tone]}`;
}

function composeCopy(
  pastTag: NarrativeTag,
  futureTag: NarrativeTag,
  tone: Tone,
): string {
  const past = TAG_NOUN[pastTag];
  const future = TAG_NOUN[futureTag];
  switch (tone) {
    case 'go':
      // "{past}이 {future}에 닿는다"
      return `${withI(past)} ${future}에 ${TONE_VERB.go}`;
    case 'stop':
      // "{past}이 {future}으로 잠긴다"
      return `${withI(past)} ${withRo(future)} ${TONE_VERB.stop}`;
    case 'warn':
      // "{past}이 {future}을 가린다"
      return `${withI(past)} ${withEul(future)} ${TONE_VERB.warn}`;
    case 'wait':
      // "{past}이 {future}으로 흐른다"
      return `${withI(past)} ${withRo(future)} ${TONE_VERB.wait}`;
  }
}

export function spreadIdentity(
  tags: readonly [NarrativeTag, NarrativeTag, NarrativeTag],
  tone: Tone,
): SpreadIdentity {
  const key = `${tags[0]}_${tags[1]}_${tags[2]}`;
  const named = NAMED_SPREADS[key];
  if (named) return named;
  return {
    name: composeName(tags[2], tone),
    copy: composeCopy(tags[0], tags[2], tone),
  };
}

/** Exposed for tests + dev introspection. */
export const NAMED_SPREAD_COUNT = Object.keys(NAMED_SPREADS).length;
