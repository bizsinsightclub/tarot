/**
 * Spread identity = a Korean combination name + an English equivalent.
 *
 * Driven entirely by the (past, present, future) NarrativeTag triple plus
 * verdict tone. Hand-curated NAMED_SPREADS covers ~50 evocative archetypes;
 * everything else falls back to a tone-driven template assembled from the
 * tag NOUN dictionary.
 *
 * The earlier "cold-reading copy" sentence layer was removed because the
 * runtime template often produced ungrammatical phrases ("거울이 바람으로
 * 흐른다" etc.) when the tag triple didn't fit the chosen subject-object
 * verb pattern. The name itself is enough; the verdict label carries the
 * decision.
 */

import { TAG_NOUN, type NarrativeTag } from './narrative';
import type { Tone } from './verdicts';

export interface SpreadIdentity {
  name: string;   // Korean, e.g. "광휘의 길"
  nameEn: string; // English, e.g. "Path of Radiance"
}

/** Key = `${past}_${present}_${future}` */
const NAMED_SPREADS: Record<string, SpreadIdentity> = {
  // STRONG_GO / GO leaning
  'beginning_resolve_apex':         { name: '광휘의 길',     nameEn: 'Path of Radiance' },
  'beginning_apex_apex':            { name: '단숨 정점',     nameEn: 'Sudden Apex' },
  'beginning_beginning_beginning':  { name: '삼중 시작',     nameEn: 'Triple Beginning' },
  'apex_abundance_abundance':       { name: '왕좌의 시간',   nameEn: 'Hour of the Throne' },
  'apex_apex_apex':                 { name: '광휘의 절정',   nameEn: 'Crown of Light' },
  'resolve_resolve_apex':           { name: '의지의 정점',   nameEn: 'Apex of Will' },
  'resolve_conflict_apex':          { name: '쟁의 끝 정점',  nameEn: "Conquest's Crown" },
  'luck_resolve_apex':              { name: '운명의 손짓',   nameEn: 'Beckon of Fate' },
  'luck_luck_apex':                 { name: '삼중 행운',     nameEn: 'Triple Fortune' },
  'revelation_resolve_apex':        { name: '진실의 길',     nameEn: 'Path of Truth' },
  'attraction_resolve_apex':        { name: '욕망의 결실',   nameEn: 'Fruit of Desire' },
  'loss_resolve_apex':              { name: '재기의 길',     nameEn: 'Path of Rising' },
  'loss_transition_apex':           { name: '죽음 너머 빛',  nameEn: 'Light Beyond Death' },
  'loss_reflection_abundance':      { name: '비워야 채움',   nameEn: 'Empty to Be Filled' },
  'reflection_resolve_apex':        { name: '사색의 결실',   nameEn: 'Fruit of Reflection' },
  'reflection_reflection_apex':     { name: '고요 끝의 빛',  nameEn: 'Light After Silence' },
  'transition_resolve_apex':        { name: '전환의 결실',   nameEn: 'Fruit of Change' },
  'transition_transition_apex':     { name: '거듭난 길',     nameEn: 'Twice-Born Path' },
  'transition_reflection_apex':     { name: '깊은 전환',     nameEn: 'Deep Crossing' },
  'confusion_revelation_apex':      { name: '폭로의 새벽',   nameEn: 'Dawn of Reveal' },
  'confusion_resolve_revelation':   { name: '안개 가르기',   nameEn: 'Parting the Fog' },
  'abundance_resolve_apex':         { name: '결실의 정점',   nameEn: 'Apex of Harvest' },

  // STRONG_STOP / STOP leaning
  'loss_loss_loss':                 { name: '깊은 어둠',     nameEn: 'Deep Dark' },
  'loss_transition_reflection':     { name: '재의 시간',     nameEn: 'Hour of Ash' },
  'apex_loss_loss':                 { name: '추락의 길',     nameEn: 'Falling Path' },
  'apex_loss_reflection':           { name: '정점의 끝',     nameEn: 'End of the Peak' },
  'apex_transition_transition':     { name: '정점의 변곡',   nameEn: 'Inflection of Apex' },
  'abundance_abundance_loss':       { name: '풍요 끝 그늘',  nameEn: 'Shadow After Plenty' },
  'conflict_conflict_loss':         { name: '소진의 끝',     nameEn: "Burnout's End" },
  'reflection_reflection_loss':     { name: '머문 자리',     nameEn: 'A Place Lingering' },
  'reflection_loss_loss':           { name: '고요의 잠식',   nameEn: 'Erosion of Silence' },
  'transition_loss_loss':           { name: '추락의 강',     nameEn: 'River of Falling' },
  'confusion_confusion_confusion':  { name: '깊은 안개',     nameEn: 'Deep Fog' },
  'confusion_loss_loss':            { name: '안개 속 추락',  nameEn: 'Fall Through Fog' },
  'transition_transition_loss':     { name: '엇갈린 흐름',   nameEn: 'Crossed Currents' },

  // GO_AND_REGRET / WARN
  'attraction_attraction_loss':     { name: '유혹의 함정',   nameEn: 'Trap of Allure' },
  'attraction_attraction_attraction': { name: '욕망의 굴레', nameEn: 'Bind of Desire' },
  'attraction_loss_loss':           { name: '욕망의 폐허',   nameEn: 'Ruins of Desire' },
  'attraction_resolve_revelation':  { name: '욕망의 진실',   nameEn: 'Truth of Desire' },
  'attraction_apex_loss':           { name: '단꿈의 끝',     nameEn: 'End of Sweet Dream' },
  'beginning_attraction_loss':      { name: '풋설의 끝',     nameEn: 'End of First Bloom' },
  'apex_attraction_loss':           { name: '정점의 그늘',   nameEn: 'Shadow of the Peak' },
  'resolve_attraction_loss':        { name: '의지의 흔들림', nameEn: 'Tremor of Will' },
  'luck_attraction_loss':           { name: '바람의 유혹',   nameEn: 'Wind of Temptation' },
  'attraction_confusion_loss':      { name: '환영의 길',     nameEn: 'Path of Illusion' },

  // WAIT / NEUTRAL
  'reflection_reflection_reflection': { name: '삼중 침묵',   nameEn: 'Triple Silence' },
  'reflection_confusion_reflection':  { name: '머문 안개',   nameEn: 'Resting Fog' },
  'confusion_confusion_revelation':   { name: '안개 끝 빛',  nameEn: "Light at Fog's End" },
  'luck_confusion_reflection':        { name: '머무는 바람', nameEn: 'Resting Wind' },
  'beginning_confusion_revelation':   { name: '안개 너머 빛', nameEn: 'Light Beyond Fog' },

  // MISSED_CHANCE
  'reflection_reflection_abundance':  { name: '놓친 풍요',    nameEn: 'Missed Bounty' },
  'reflection_loss_abundance':        { name: '뒤늦은 결실',  nameEn: 'Late Harvest' },
  'loss_loss_abundance':              { name: '잃고 채움',    nameEn: 'Loss Refilled' },
};

/** English noun lexicon mirroring TAG_NOUN, used for fallback names. */
const TAG_NOUN_EN: Record<NarrativeTag, string> = {
  beginning:  'Seed',
  apex:       'Sun',
  abundance:  'Harvest',
  resolve:    'Wick',
  luck:       'Wind',
  revelation: 'Truth',
  attraction: 'Mirror',
  loss:       'Leaf',
  confusion:  'Fog',
  conflict:   'Blade',
  reflection: 'Lantern',
  transition: 'River',
};

const TONE_NAME_SUFFIX_KO: Record<Tone, string> = {
  go:   '길',     // path
  stop: '그늘',   // shadow
  warn: '함정',   // trap
  wait: '기다림', // waiting
};

const TONE_NAME_SUFFIX_EN: Record<Tone, string> = {
  go:   'Path',
  stop: 'Shadow',
  warn: 'Trap',
  wait: 'Wait',
};

function composeName(futureTag: NarrativeTag, tone: Tone): SpreadIdentity {
  return {
    name: `${TAG_NOUN[futureTag]}의 ${TONE_NAME_SUFFIX_KO[tone]}`,
    nameEn: `${TONE_NAME_SUFFIX_EN[tone]} of the ${TAG_NOUN_EN[futureTag]}`,
  };
}

export function spreadIdentity(
  tags: readonly [NarrativeTag, NarrativeTag, NarrativeTag],
  tone: Tone,
): SpreadIdentity {
  const key = `${tags[0]}_${tags[1]}_${tags[2]}`;
  const named = NAMED_SPREADS[key];
  if (named) return named;
  return composeName(tags[2], tone);
}

/** Exposed for tests + dev introspection. */
export const NAMED_SPREAD_COUNT = Object.keys(NAMED_SPREADS).length;
