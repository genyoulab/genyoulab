# 수정 보고서: 구매 버튼 중복 제거 및 플로팅 바 모바일 전용 처리

## 1. 개요
* **목표:** `product.html` 내에 존재하는 모든 구매 버튼 개수를 검증하고, 플로팅 바가 데스크톱(PC) 화면에서도 노출되는 문제를 CSS로 완벽하게 수정합니다.
* **작업 대상 파일:** `product.html`, `style.css`, `script.js`

## 2. 상세 작업 내역

### 2.1 구매 버튼 개수 확인 및 중복 검증
`product.html` 파일 내 "네이버에서 구매하기" 텍스트 및 관련 버튼을 전수 조사했습니다.
결과적으로 중복 버튼은 없었으며, 설계된 정상 구조대로 **총 4개**의 버튼만 존재함을 확인했습니다.
* [정상] Reset Mist 섹션 히어로 버튼 1개
* [정상] Restore Serum 섹션 히어로 버튼 1개
* [정상] Recover Cream Balm 섹션 히어로 버튼 1개
* [정상] 모바일 전용 하단 플로팅 바 버튼 1개

### 2.2 플로팅 바 데스크톱 노출 오류 수정 (모바일 전용 처리)
기존 `script.js`에서 자바스크립트로 `display: flex`를 강제로 주입하던 코드를 삭제하고, **순수 CSS 기반의 미디어 쿼리**로 노출 여부를 제어하도록 변경했습니다.

**`style.css` 추가 사항:**
```css
/* 플로팅 바 모바일 전용 처리 및 기본 숨김 */
#floating-bar {
  display: none;
  padding: 12px 20px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom)); /* iOS 안전 영역 확보 */
}

/* 모바일 해상도(639px 이하)에서만 노출 */
@media (max-width: 639px) {
  #floating-bar {
    display: flex;
  }
}
```

* `product.html`에서 하드코딩되어 있던 인라인 스타일(`display: none`, `padding` 등)을 제거하여 CSS 규칙이 우선적으로 적용되도록 코드 구조를 정리했습니다.

### 2.3 플로팅 바 동작 스크립트 정리
자바스크립트의 `IntersectionObserver`는 히어로 버튼(`.buy-btn`)이 화면에 노출되는지에 따라 `transform: translateY` 값만 제어하도록 역할을 단순화했습니다. 데스크톱에서는 CSS의 `display: none`이 우선하므로, 화면 스크롤 시에도 플로팅 바가 뷰포트에 나타나지 않습니다.

## 3. 검증 결과 (Verification)
- [x] PC 해상도(640px 이상)에서 스크롤을 이동해도 플로팅 바가 절대 보이지 않음.
- [x] 모바일 해상도(390px 등)에서 스크롤을 이동하여 히어로 버튼이 화면 밖으로 사라질 때 플로팅 바가 `slide-up`으로 등장함.
- [x] iOS 홈 바 영역을 침범하지 않도록 안전 영역(`env(safe-area-inset-bottom)`) 패딩 적용됨.
- [x] 불필요하게 렌더링되던 중복 버튼 및 숨겨진 버튼이 없음을 코드상으로 최종 확인.
