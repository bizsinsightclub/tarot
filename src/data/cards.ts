/**
 * Full 78-card Rider-Waite-Smith deck with situational scoring.
 *
 * Score axes (per situation):
 *   pull    -3..+3   How strongly the card pushes toward action
 *   outcome -3..+3   How good/bad the resulting outcome is
 *
 * Source of truth — change ONLY here, then update affected vitest scenarios
 * (lesson L03).
 */

export type SituationKey = 'buy' | 'act' | 'relate';

export interface CardScore {
  pull: number;     // -3..+3
  outcome: number;  // -3..+3
}

export interface Card {
  id: number;       // 0..77 (0..21 Major, 22..77 Minor)
  name: string;     // English canonical name
  nameKo: string;   // Korean display name
  image: string;    // public path, e.g. /cards/00_fool.jpg
  scores: Record<SituationKey, CardScore>;
}

// ---------- Major Arcana (22) ----------

export const MAJOR_ARCANA: Card[] = [
  {
    id: 0, name: 'The Fool', nameKo: '광대',
    image: '/cards/00_fool.jpg',
    scores: {
      buy:    { pull: +2, outcome: -1 },
      act:    { pull: +3, outcome: +1 },
      relate: { pull: +2, outcome: +1 },
    },
  },
  {
    id: 1, name: 'The Magician', nameKo: '마법사',
    image: '/cards/01_magician.jpg',
    scores: {
      buy:    { pull: +2, outcome: +2 },
      act:    { pull: +3, outcome: +3 },
      relate: { pull: +1, outcome: +2 },
    },
  },
  {
    id: 2, name: 'The High Priestess', nameKo: '여사제',
    image: '/cards/02_high_priestess.jpg',
    scores: {
      buy:    { pull: -1, outcome: +1 },
      act:    { pull: -1, outcome: +2 },
      relate: { pull: -1, outcome: +2 },
    },
  },
  {
    id: 3, name: 'The Empress', nameKo: '여황제',
    image: '/cards/03_empress.jpg',
    scores: {
      buy:    { pull: +2, outcome: +3 },
      act:    { pull: +2, outcome: +3 },
      relate: { pull: +3, outcome: +3 },
    },
  },
  {
    id: 4, name: 'The Emperor', nameKo: '황제',
    image: '/cards/04_emperor.jpg',
    scores: {
      buy:    { pull: +1, outcome: +2 },
      act:    { pull: +1, outcome: +2 },
      relate: { pull: -1, outcome: +1 },
    },
  },
  {
    id: 5, name: 'The Hierophant', nameKo: '교황',
    image: '/cards/05_hierophant.jpg',
    scores: {
      buy:    { pull: +1, outcome: +1 },
      act:    { pull:  0, outcome: +1 },
      relate: { pull: +1, outcome: +2 },
    },
  },
  {
    id: 6, name: 'The Lovers', nameKo: '연인',
    image: '/cards/06_lovers.jpg',
    scores: {
      buy:    { pull: +2, outcome: +2 },
      act:    { pull: +1, outcome: +2 },
      relate: { pull: +3, outcome: +3 },
    },
  },
  {
    id: 7, name: 'The Chariot', nameKo: '전차',
    image: '/cards/07_chariot.jpg',
    scores: {
      buy:    { pull: +2, outcome: +2 },
      act:    { pull: +3, outcome: +3 },
      relate: { pull: +1, outcome: +1 },
    },
  },
  {
    id: 8, name: 'Strength', nameKo: '힘',
    image: '/cards/08_strength.jpg',
    scores: {
      buy:    { pull: +1, outcome: +3 },
      act:    { pull: +2, outcome: +3 },
      relate: { pull: +2, outcome: +3 },
    },
  },
  {
    id: 9, name: 'The Hermit', nameKo: '은둔자',
    image: '/cards/09_hermit.jpg',
    scores: {
      buy:    { pull: -2, outcome: +1 },
      act:    { pull: -2, outcome:  0 },
      relate: { pull: -3, outcome: -1 },
    },
  },
  {
    id: 10, name: 'Wheel of Fortune', nameKo: '운명의 수레바퀴',
    image: '/cards/10_wheel_of_fortune.jpg',
    scores: {
      buy:    { pull:  0, outcome: +1 },
      act:    { pull: +1, outcome: +1 },
      relate: { pull:  0, outcome: +1 },
    },
  },
  {
    id: 11, name: 'Justice', nameKo: '정의',
    image: '/cards/11_justice.jpg',
    scores: {
      buy:    { pull:  0, outcome: +1 },
      act:    { pull: +1, outcome: +2 },
      relate: { pull:  0, outcome: +1 },
    },
  },
  {
    id: 12, name: 'The Hanged Man', nameKo: '매달린 사람',
    image: '/cards/12_hanged_man.jpg',
    scores: {
      buy:    { pull: -3, outcome: -1 },
      act:    { pull: -3, outcome: +1 },
      relate: { pull: -1, outcome:  0 },
    },
  },
  {
    id: 13, name: 'Death', nameKo: '죽음',
    image: '/cards/13_death.jpg',
    scores: {
      buy:    { pull: -2, outcome:  0 },
      act:    { pull: -1, outcome: +2 },
      relate: { pull: -2, outcome: -1 },
    },
  },
  {
    id: 14, name: 'Temperance', nameKo: '절제',
    image: '/cards/14_temperance.jpg',
    scores: {
      buy:    { pull: -1, outcome: +2 },
      act:    { pull:  0, outcome: +2 },
      relate: { pull: +1, outcome: +3 },
    },
  },
  {
    id: 15, name: 'The Devil', nameKo: '악마',
    image: '/cards/15_devil.jpg',
    scores: {
      buy:    { pull: +3, outcome: -3 },
      act:    { pull: +3, outcome: -3 },
      relate: { pull: +3, outcome: -3 },
    },
  },
  {
    id: 16, name: 'The Tower', nameKo: '탑',
    image: '/cards/16_tower.jpg',
    scores: {
      buy:    { pull: -3, outcome: -3 },
      act:    { pull: -3, outcome: -3 },
      relate: { pull: -3, outcome: -3 },
    },
  },
  {
    id: 17, name: 'The Star', nameKo: '별',
    image: '/cards/17_star.jpg',
    scores: {
      buy:    { pull: +1, outcome: +3 },
      act:    { pull: +1, outcome: +3 },
      relate: { pull: +2, outcome: +3 },
    },
  },
  {
    id: 18, name: 'The Moon', nameKo: '달',
    image: '/cards/18_moon.jpg',
    scores: {
      buy:    { pull: -1, outcome: -2 },
      act:    { pull: -1, outcome: -2 },
      relate: { pull: -1, outcome: -2 },
    },
  },
  {
    id: 19, name: 'The Sun', nameKo: '태양',
    image: '/cards/19_sun.jpg',
    scores: {
      buy:    { pull: +3, outcome: +3 },
      act:    { pull: +3, outcome: +3 },
      relate: { pull: +3, outcome: +3 },
    },
  },
  {
    id: 20, name: 'Judgement', nameKo: '심판',
    image: '/cards/20_judgement.jpg',
    scores: {
      buy:    { pull: +2, outcome: +2 },
      act:    { pull: +3, outcome: +3 },
      relate: { pull: +2, outcome: +2 },
    },
  },
  {
    id: 21, name: 'The World', nameKo: '세계',
    image: '/cards/21_world.jpg',
    scores: {
      buy:    { pull: +2, outcome: +3 },
      act:    { pull: +3, outcome: +3 },
      relate: { pull: +3, outcome: +3 },
    },
  },
];

// ---------- Minor Arcana (56) ----------

type Suit = 'wands' | 'cups' | 'swords' | 'pentacles';

const SUIT_KO: Record<Suit, string> = {
  wands: '지팡이',
  cups: '컵',
  swords: '검',
  pentacles: '펜타클',
};

const RANK_KO_NAME: Record<number, string> = {
  1: '에이스',
  11: '시종',
  12: '기사',
  13: '여왕',
  14: '왕',
};

const RANK_EN_NAME: Record<number, string> = {
  1: 'Ace',
  11: 'Page',
  12: 'Knight',
  13: 'Queen',
  14: 'King',
};

const SUIT_EN: Record<Suit, string> = {
  wands: 'Wands',
  cups: 'Cups',
  swords: 'Swords',
  pentacles: 'Pentacles',
};

function rankLabelKo(rank: number) {
  return RANK_KO_NAME[rank] ?? String(rank);
}
function rankLabelEn(rank: number) {
  return RANK_EN_NAME[rank] ?? String(rank);
}

/**
 * Compact tuple format for Minor Arcana scoring:
 *   [buyPull, buyOutcome, actPull, actOutcome, relatePull, relateOutcome]
 */
type ScoreTuple = readonly [number, number, number, number, number, number];

function minor(
  id: number,
  suit: Suit,
  rank: number,
  scores: ScoreTuple
): Card {
  const nn = rank.toString().padStart(2, '0');
  return {
    id,
    name: `${rankLabelEn(rank)} of ${SUIT_EN[suit]}`,
    nameKo: `${SUIT_KO[suit]} ${rankLabelKo(rank)}`,
    image: `/cards/${suit}_${nn}.jpg`,
    scores: {
      buy:    { pull: scores[0], outcome: scores[1] },
      act:    { pull: scores[2], outcome: scores[3] },
      relate: { pull: scores[4], outcome: scores[5] },
    },
  };
}

// Scoring rationale (suit baselines + per-rank adjustments):
//   Wands  (Fire)  → action/passion. act:strong+, relate:warm, buy:moderate
//   Cups   (Water) → emotion. relate:strong+, act:soft, buy:gentle
//   Swords (Air)   → intellect/conflict. outcome often -, act:cautious
//   Pents  (Earth) → material/work. buy:strong+, act:steady, relate:practical
//
// Rank patterns (modifier on baseline):
//   Ace=+pull/+outcome opportunity     2=balance/choice
//   3=growth/joy                       4=rest/stability (lower pull)
//   5=conflict/loss (-outcome)         6=harmony/recovery (+outcome)
//   7=challenge/introspection (mixed)  8=mastery/movement (+pull)
//   9=fulfillment or solitude          10=completion (heavy or rich)
//   Page=11 youthful (+pull mild)      Knight=12 rash (+pull, mixed)
//   Queen=13 mature (+outcome)         King=14 authority (+pull, +outcome)

export const MINOR_ARCANA: Card[] = [
  // Wands — id 22..35  [buy.pull, buy.out, act.pull, act.out, rel.pull, rel.out]
  minor(22, 'wands',  1, [+1, +2, +3, +3, +2, +2]),  // Ace: spark, opportunity
  minor(23, 'wands',  2, [+1, +1, +1, +2, +1, +1]),  // 2: planning, partnership
  minor(24, 'wands',  3, [+2, +2, +2, +2, +1, +2]),  // 3: expansion, foresight
  minor(25, 'wands',  4, [+2, +3, +1, +2, +2, +3]),  // 4: celebration, milestone
  minor(26, 'wands',  5, [ 0,  0, +1, -1,  0, -1]),  // 5: petty conflict
  minor(27, 'wands',  6, [+2, +2, +2, +3, +1, +2]),  // 6: victory, recognition
  minor(28, 'wands',  7, [ 0, +1, +1,  0,  0,  0]),  // 7: defending, perseverance
  minor(29, 'wands',  8, [+1, +1, +3, +2,  0, +1]),  // 8: swift movement, news
  minor(30, 'wands',  9, [-1,  0,  0,  0,  0,  0]),  // 9: weary defense
  minor(31, 'wands', 10, [-2, -2, -1, -1, -1, -1]),  // 10: burden, overload
  minor(32, 'wands', 11, [+1,  0, +2, +1, +1,  0]),  // Page: enthusiasm, news
  minor(33, 'wands', 12, [+2,  0, +3,  0, +1,  0]),  // Knight: rash action
  minor(34, 'wands', 13, [+1, +2, +2, +2, +2, +2]),  // Queen: confident charisma
  minor(35, 'wands', 14, [+1, +2, +2, +3, +1, +2]),  // King: vision, leadership

  // Cups — id 36..49
  minor(36, 'cups',   1, [ 0, +2, +1, +2, +3, +3]),  // Ace: love begins, overflow
  minor(37, 'cups',   2, [+1, +2, +1, +2, +3, +3]),  // 2: union, partnership
  minor(38, 'cups',   3, [+1, +2, +1, +2, +2, +3]),  // 3: celebration, friendship
  minor(39, 'cups',   4, [-1,  0, -1, -1, -1, -1]),  // 4: apathy, missed opportunity
  minor(40, 'cups',   5, [-1, -2, -1, -2, -1, -3]),  // 5: regret, loss, melancholy
  minor(41, 'cups',   6, [+1, +2,  0, +1, +1, +2]),  // 6: nostalgia, kindness
  minor(42, 'cups',   7, [-1, -1, -1, -1, -1, -1]),  // 7: illusion, indecision
  minor(43, 'cups',   8, [-2, +1, -2, +2, -2, +1]),  // 8: walking away, deeper search
  minor(44, 'cups',   9, [+2, +3, +1, +3, +1, +2]),  // 9: wish fulfillment
  minor(45, 'cups',  10, [+1, +3, +1, +3, +3, +3]),  // 10: bliss, harmony
  minor(46, 'cups',  11, [ 0, +1, +1, +1, +1, +2]),  // Page: dreamy message
  minor(47, 'cups',  12, [+1, +1, +1, +1, +2, +2]),  // Knight: romantic offer
  minor(48, 'cups',  13, [ 0, +2, +1, +2, +2, +3]),  // Queen: nurturing, intuitive
  minor(49, 'cups',  14, [+1, +2, +1, +2, +2, +3]),  // King: emotional mastery

  // Swords — id 50..63
  minor(50, 'swords',  1, [+1, +1, +2, +2, +1,  0]),  // Ace: clarity, breakthrough
  minor(51, 'swords',  2, [-1,  0, -1,  0, -1,  0]),  // 2: stalemate, denial
  minor(52, 'swords',  3, [-1, -2, -1, -1, -2, -3]),  // 3: heartbreak
  minor(53, 'swords',  4, [-2, +1, -2, +1, -1,  0]),  // 4: rest, recovery
  minor(54, 'swords',  5, [ 0, -2,  0, -2, -1, -2]),  // 5: defeat, hollow win
  minor(55, 'swords',  6, [ 0, +2, +1, +2,  0, +2]),  // 6: transition to better
  minor(56, 'swords',  7, [+1, -2, +1, -2,  0, -2]),  // 7: deception, sneaky gain
  minor(57, 'swords',  8, [-2, -1, -2, -1, -2, -1]),  // 8: feeling trapped
  minor(58, 'swords',  9, [-1, -2, -1, -2, -1, -2]),  // 9: anxiety, despair
  minor(59, 'swords', 10, [-3, -3, -2, -2, -2, -3]),  // 10: rock bottom
  minor(60, 'swords', 11, [+1,  0, +1, +1,  0,  0]),  // Page: alert, curious
  minor(61, 'swords', 12, [+2, -1, +3,  0, +1, -1]),  // Knight: charge ahead, blunt
  minor(62, 'swords', 13, [ 0, +1, +1, +2,  0, +1]),  // Queen: clear judgment
  minor(63, 'swords', 14, [ 0, +1, +1, +2,  0, +1]),  // King: stern authority

  // Pentacles — id 64..77
  minor(64, 'pentacles',  1, [+2, +3, +2, +3, +1, +2]),  // Ace: prosperity opportunity
  minor(65, 'pentacles',  2, [ 0, +1, +1, +1,  0, +1]),  // 2: juggling, balance
  minor(66, 'pentacles',  3, [+1, +2, +2, +2, +1, +2]),  // 3: collaboration, craft
  minor(67, 'pentacles',  4, [+2, +1,  0,  0, -1,  0]),  // 4: hoarding, control
  minor(68, 'pentacles',  5, [-2, -2, -1, -2, -2, -2]),  // 5: hardship, lack
  minor(69, 'pentacles',  6, [+1, +2, +1, +2, +1, +2]),  // 6: generosity, fairness
  minor(70, 'pentacles',  7, [ 0, +2, -1, +2,  0, +1]),  // 7: long view, patient growth
  minor(71, 'pentacles',  8, [+1, +2, +2, +3,  0, +1]),  // 8: skilled work, mastery
  minor(72, 'pentacles',  9, [+2, +3, +1, +2, +1, +2]),  // 9: independence, abundance
  minor(73, 'pentacles', 10, [+3, +3, +2, +3, +2, +3]),  // 10: legacy, family wealth
  minor(74, 'pentacles', 11, [+1, +1, +1, +2,  0, +1]),  // Page: study, new venture
  minor(75, 'pentacles', 12, [ 0, +2,  0, +2,  0, +1]),  // Knight: methodical, slow
  minor(76, 'pentacles', 13, [+2, +3, +1, +2, +2, +3]),  // Queen: nurturing prosperity
  minor(77, 'pentacles', 14, [+2, +3, +2, +3, +1, +2]),  // King: established success
];

// ---------- Combined deck ----------

export const CARDS: Card[] = [...MAJOR_ARCANA, ...MINOR_ARCANA];

export function cardById(id: number): Card {
  const card = CARDS[id];
  if (!card) throw new Error(`Card id out of range: ${id}`);
  return card;
}
