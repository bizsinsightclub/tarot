# Pathfinder — Project Context

> 미래 세션이 이 파일만 읽어도 컨텍스트 복원이 가능해야 한다.
> 작업 시작 전 반드시 이 파일을 먼저 읽고, 모든 변경사항이 본 문서의 규칙을 위반하지 않는지 점검할 것.

---

## Goal

자연어 입력 없이 **상황 카테고리만 고르면** 즉시 타로 카드 기반 결정 판정을 주는 앱.
"살까 말까", "할까 말까", "만날까 말까" 같은 일상 결정 순간에 켜서 1~2초 안에 판정을 받는다.

LLM이나 외부 API 없이 동작한다 (오프라인·즉시·일관성 보장).

---

## Phase 2 Scope (현재 단계)

| 항목 | 값 |
|---|---|
| Deck | **Full deck 78장** (Major 22 + Minor 56: Wands/Cups/Swords/Pentacles × 14) |
| Orientation | 정방향 only |
| Spread | **3장** (Past / Present / Future) |
| Situations | `buy` (구매), `act` (실행), `relate` (관계) — 3종 |
| Verdict types | 9-cell 그리드 (STRONG_GO ~ STRONG_STOP, GO_AND_REGRET 등) |
| Card reveal | **Hearthstone 스타일** — 순차 플립 + 스케일 + 글로우 (framer-motion) |
| Language | 한국어 UI |
| Platform | Web (정적 export) |

> **Phase 1 → Phase 2 전환 (2026-05-12)**: 사용자 요청으로 Minor Arcana 56장과 화려한 카드 오픈 연출이 Phase 2 in-scope로 이동.

---

## Out of Scope (Phase 2, 절대 추가 금지)

- ❌ 역방향 (Reversed) 카드 — Phase 3+
- ❌ LLM 통합 / 외부 AI API 호출
- ❌ 자유 텍스트 입력 (사용자 상황 묘사)
- ❌ 다국어 (i18n)
- ❌ 사용자 계정 / 서버 / 데이터베이스
- ❌ 결제 / 광고 / 분석 트래커

이 목록은 "기능 추가 검토" 시 1차 거름망. 추가하려면 먼저 본 문서를 갱신하고 사용자 승인 필요.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS (디자인 토큰은 `design_new.md` 기반)
- **Animation**: framer-motion (Phase 2부터 — 카드 오픈 연출)
- **Testing**: vitest
- **Build**: `output: 'export'` — 정적 파일로 배포 가능 (Vercel / GitHub Pages / 어디든)
- **Randomness**: `crypto.getRandomValues` (절대 `Math.random` 금지 — `lesson.md` 참조)

---

## Architecture Rules (위반 금지)

1. **카드 의미의 진실 공급원은 단 하나**: `src/data/cards.ts`의 점수 테이블.
   - LLM 호출, 외부 API, 런타임 추론으로 의미를 도출하지 않는다.
   - 카드 의미를 바꿔야 한다면 `cards.ts`의 점수만 수정한다.

2. **2D 점수 시스템**: 각 카드는 상황(`buy`/`act`/`relate`)마다 `(pull, outcome)` 두 정수(-3..+3)를 가진다.
   - `pull` = 카드가 "행동하라"고 미는 강도
   - `outcome` = 그 행동의 결과 좋고 나쁨
   - 합산 후 9-cell 버킷으로 판정 도출

3. **위치 가중치**: Past 0.5 / Present 1.5 / Future 1.0 (`src/lib/interpret.ts`).

4. **Randomness**: 카드 추첨은 반드시 `crypto.getRandomValues` 기반 Fisher-Yates 셔플.

5. **이미지 라이선스**: 모든 카드 이미지는 Wikimedia Commons에서 받은 PD(Public Domain) RWS 덱.
   `public/cards/SOURCES.md`에 출처/라이선스 명시 필수.

---

## Directory Conventions

```
D:\Pathfinder\
├── CLAUDE.md            ← 이 파일 (프로젝트 컨텍스트)
├── lesson.md            ← 실수 재발 방지 누적 학습 로그
├── design_new.md        ← 디자인 시스템 진실 공급원
├── tarot_meaning.pdf    ← 점수 큐레이션 참조용 원본 자료
├── public/cards/        ← 22 카드 이미지 + SOURCES.md
├── src/
│   ├── app/             ← Next.js App Router 페이지
│   ├── data/            ← cards.ts (점수), situations.ts
│   ├── lib/             ← draw.ts, interpret.ts, verdicts.ts
│   └── components/      ← React 컴포넌트
├── scripts/             ← fetch-cards.mjs (1회용)
└── tests/               ← vitest 단위 테스트
```

이미지 파일명 패턴 (`lesson.md` 참조):
- **Major Arcana**: `{2자리 ID}_{소문자 영문명}.jpg` (예: `00_fool.jpg`, `13_death.jpg`, `21_world.jpg`)
- **Minor Arcana**: `{suit}_{2자리 rank}.jpg` (예: `wands_01.jpg`, `cups_14.jpg`)
  - suit: `wands` | `cups` | `swords` | `pentacles`
  - rank: 01..10, 11=Page, 12=Knight, 13=Queen, 14=King

변경 시 `cards.ts` + 이미지 파일 + 테스트 동시 업데이트.

---

## Source-of-Truth Map

| 도메인 | 진실 공급원 |
|---|---|
| 카드 의미·점수 | `src/data/cards.ts` |
| 상황 정의 | `src/data/situations.ts` |
| 판정 라벨 | `src/lib/verdicts.ts` |
| 디자인 토큰 (컬러·폰트) | `design_new.md` → `tailwind.config.ts` |
| 프로젝트 범위·금지사항 | 이 파일 (`CLAUDE.md`) |
| 실수 방지 규칙 | `lesson.md` |

---

## Workflow Rule

작업 시작 시:
1. `CLAUDE.md` (이 파일) 통독
2. `lesson.md` 통독
3. 변경 사항이 위 두 문서를 위반하지 않는지 확인
4. 작업 중 새로운 함정 발견 → 즉시 `lesson.md`에 추가
5. Phase 1 Scope 위반 가능성 발견 → 사용자에게 확인 후 진행
