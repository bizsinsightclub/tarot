# Lessons — 실수 재발 방지 누적 학습 로그

> 작업 중 발견되는 함정·실수·규칙 위반을 즉시 여기 추가한다.
> 새 변경사항이 기존 항목을 위반하지 않는지 매번 점검할 것.
> 한 번 발견된 실수는 두 번 반복하지 않는다.

---

## L01 — Randomness must be cryptographically secure

- **Rule**: 카드 추첨 셔플에서 `Math.random()` 사용 금지. 반드시 `crypto.getRandomValues` 기반 Fisher-Yates.
- **Why**: Pathfinder는 결정 보조 도구이므로 사용자가 결과의 진정성을 신뢰해야 함. `Math.random`은 PRNG로 패턴 예측 가능성 + 일부 환경에서 시드 편향 위험.
- **Apply**:
  - `src/lib/draw.ts` 외 다른 곳에서 셔플/랜덤 추첨하지 않는다.
  - 새 코드 리뷰 시 `Math.random` grep 결과 0이어야 함.

---

## L02 — Image attribution is mandatory

- **Rule**: Wikimedia Commons 이미지 사용 시 `public/cards/SOURCES.md`에 (1) 원본 URL, (2) 라이선스, (3) 작가/출판년도 PD 증빙을 빠짐없이 기록.
- **Why**: PD 라이선스도 출처 명시가 윤리적 요구이며, 향후 라이선스 분쟁 / 다른 이미지 출처로 교체 시 추적 가능성 보장.
- **Apply**:
  - `scripts/fetch-cards.mjs`가 다운로드와 동시에 `SOURCES.md`를 자동 생성한다 (수동 작성 시 누락 위험).
  - 22장 모두 등재되었는지 빌드 전 점검.

---

## L03 — Score changes require regression tests

- **Rule**: `src/data/cards.ts`의 점수 또는 `src/lib/verdicts.ts`의 임계값을 수정하면, 변경 영향을 검증하는 vitest 회귀 테스트를 같은 PR/커밋에 포함한다.
- **Why**: 점수는 휴리스틱이라 직관적으로 바꾸기 쉬운데, 한 카드의 점수 변경이 수백 조합의 판정을 뒤집을 수 있다. 알려진 시나리오(예: `[Tower, Death, Devil]` for `buy` → `STRONG_STOP`)가 회귀로 깨지는 것을 막아야 한다.
- **Apply**:
  - `tests/interpret.test.ts`에 최소 5개 시그니처 시나리오를 항상 유지.
  - 새 점수 튜닝 시 영향받는 시나리오를 명시적으로 업데이트.

---

## L04 — Card filename pattern is locked

- **Rule**: 카드 이미지 파일명은 **`{2자리 ID}_{소문자 영문명}.jpg`** 패턴 고정 (예: `00_fool.jpg`, `13_death.jpg`).
- **Why**: 파일명·`cards.ts.image` 필드·`fetch-cards.mjs` 매핑이 모두 동기화되어야 하는데, 임의로 한 곳만 바꾸면 404 / 빌드 실패가 발생.
- **Apply**:
  - 파일명 변경 시 (1) 이미지 파일, (2) `src/data/cards.ts`의 `image` 필드, (3) `scripts/fetch-cards.mjs` 매핑, (4) 관련 테스트를 **동시에** 수정.
  - 새 카드 추가 시(Phase 2) 동일 패턴 준수.

---

## L05 — Plan-mode write rule

- **Rule**: Claude Code의 플랜 모드에서는 플랜 파일(`~/.claude/plans/*.md`) 외 어떤 파일도 수정하지 않는다.
- **Why**: 플랜 모드는 사용자 승인 전 제안 단계. 임의로 다른 파일을 만들면 승인 워크플로 우회.
- **Apply**:
  - 플랜 모드에서 `CLAUDE.md` / `lesson.md` / `design_new.md` 등 메타 문서 작성 요청을 받아도, 플랜 본문에 "Phase 0 작업으로 작성 예정" 형태로 반영 후 ExitPlanMode 거쳐서 작성.
  - 단, 플랜 파일에 작성할 내용을 충분히 구체화해 승인 후 즉시 실행 가능하도록.

---

## L06 — Wikimedia downloads need careful HTTP handling on Windows

- **Rule**: Wikimedia 이미지 다운로드 스크립트(`scripts/fetch-cards.mjs`)는 (1) `curl --ssl-no-revoke`를 사용하고, (2) User-Agent에 "curl" 같은 도구명을 넣지 않으며 (3) 응답을 파일 크기뿐 아니라 **JPEG 매직 바이트(`FF D8 FF`)** 로 검증하고, (4) DNS 일시 실패에 대비해 5회 재시도 + 2초 대기를 한다.
- **Why**: Windows 사내 네트워크 환경에서 (a) schannel이 CRL 서버 접근 불가로 TLS 핸드셰이크 실패, (b) 일부 Wikimedia 캐시 노드가 "curl" UA를 거부, (c) 304 Wikimedia 에러 페이지가 2KB HTML로 내려와 size-only 검증 통과, (d) DNS 간헐적 실패 — 모두 한 번에 발생함.
- **Apply**:
  - 다른 외부 이미지/리소스 다운로드 스크립트도 동일 패턴 차용.
  - `Math.random` 금지(L01)와 마찬가지로, 새 코드 리뷰 시 `User-Agent.*curl` 패턴 grep 0이어야 함.

---

## L07 — `<placeholder>`

> 새 항목은 다음 형식으로 추가:
>
> ## Lxx — Short imperative title
> - **Rule**: 무엇을 해야/하지 말아야 하는가
> - **Why**: 왜 이 규칙이 생겼는가 (구체 사건 / 근본 이유)
> - **Apply**: 언제 어디서 어떻게 적용하는가
