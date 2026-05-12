import type { SituationKey } from './cards';

export interface Situation {
  key: SituationKey;
  ko: string;          // 큰 버튼에 표시되는 한국어
  subtitle: string;    // 작은 부제
  question: string;    // Reading 페이지 상단에 표시
}

export const SITUATIONS: Situation[] = [
  {
    key: 'buy',
    ko: '살까 말까',
    subtitle: '구매 결정',
    question: '이 물건을 사야 할까요?',
  },
  {
    key: 'act',
    ko: '할까 말까',
    subtitle: '실행 결정',
    question: '이 행동을 해야 할까요?',
  },
  {
    key: 'relate',
    ko: '만날까 말까',
    subtitle: '관계 결정',
    question: '이 관계를 이어가야 할까요?',
  },
];

export function situationByKey(key: string): Situation | undefined {
  return SITUATIONS.find((s) => s.key === key);
}
