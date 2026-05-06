# 브릿지 모달 구현 보고서 (report_FIX03_브릿지모달.md)

## 1. 구현 개요
- **작업 목표**: `rules.md`를 바탕으로 `product.html` 내 모든 구매 버튼 클릭 시 브릿지 모달이 나타나고, 0.8초 후 스마트스토어로 리다이렉트되도록 구현
- **적용 대상**: `product.html` (Reset Mist, Restore Serum, Recover Cream Balm 구매 버튼)

## 2. 상세 작업 내역

### 브릿지 모달 HTML 추가
- `product.html`의 `</body>` 직전에 요청하신 브릿지 모달 HTML(`id="bridge-modal"`)을 1개 추가했습니다.
- 기본적으로 `display: none` 상태이며, 모달 호출 시 전체 화면 위에 블러 처리된 배경(`backdrop-filter: blur(12px)`)과 중앙 정렬된 모달 창이 나타납니다.

### 스마트스토어 URL 매핑 및 브릿지 JavaScript 구현
- `script.js`에 각 제품 아이디와 스마트스토어(UTM 파라미터 포함) URL이 매핑된 `SMARTSTORE_URLS` 상수를 선언했습니다.
- `openSmartstore(productId)` 함수를 작성하여, 호출 시 다음 동작이 순차적으로 실행되도록 구성했습니다:
  1. `gtag`를 통한 `purchase_intent` GA4 이벤트 전송
  2. `display: flex`로 브릿지 모달 표시
  3. `requestAnimationFrame`을 이용해 프로그레스 바(`id="bridge-bar"`) 폭을 0.8초에 걸쳐 `100%`로 채움
  4. `setTimeout`으로 정확히 800ms 뒤 모달을 숨기고 초기화
  5. 모바일 환경(`iPhone`, `iPad`, `Android`)에서는 현재 창(`location.href`), PC 환경에서는 새 탭(`window.open`)으로 분기하여 네이버 스마트스토어 페이지 오픈

### 구매 버튼 `onclick` 속성 연결
- `product.html`에 위치한 세 가지 제품의 구매 버튼 요소에 각각 정확한 인자를 넘기는 `onclick` 이벤트를 삽입했습니다:
  - `onclick="openSmartstore('reset-mist')"`
  - `onclick="openSmartstore('restore-serum')"`
  - `onclick="openSmartstore('recover-balm')"`

## 3. 검증 결과
- **[완료]** 구매 버튼 클릭 시 브릿지 모달이 정상적으로 노출됨.
- **[완료]** 모달 내 초록색 바가 부드럽게 0.8초 동안 차오름.
- **[완료]** 0.8초가 지난 후 모달이 닫히며 스마트스토어 이동 로직이 실행됨.
- **[완료]** 모바일 및 PC 환경에 맞추어 `window.open`과 `location.href`가 올바르게 분기되어 동작함.
