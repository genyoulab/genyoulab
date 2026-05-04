# D-23 3SecFix™ 마이크로 애니메이션 보고서

## 1. 개요
* **목표**: 브랜드 시그니처 루틴인 3SecFix™("칙-톡-쓱") 애니메이션을 정밀한 타이밍으로 구현.
* **요구사항**: 각 스텝 150ms 애니메이션, 사이 300ms 여백, IntersectionObserver 트리거, `prefers-reduced-motion` 지원.
* **관련 소스**: `style.css`, `index.html`

## 2. 점검 및 구현 내역
### 2.1. 정밀 타이밍 CSS 구현 (`style.css`)
* `.sec-fix-step` 클래스에 `transition: opacity 150ms, transform 150ms`를 부여했습니다.
* 상위 `.sec-fix-container.animate` 클래스가 트리거되면 딜레이가 적용됩니다:
  * **칙! (`.step-chik`)**: 0ms 딜레이 (즉시 150ms 동안 동작)
  * **톡! (`.step-tok`)**: 450ms 딜레이 (`칙` 150ms + 여백 300ms)
  * **쓱! (`.step-ssuk`)**: 900ms 딜레이 (`톡` 끝나는 450+150=600ms + 여백 300ms)

### 2.2. 접근성(A11y) 대응
* `@media (prefers-reduced-motion: reduce)` 쿼리를 추가하여, 사용자가 OS나 브라우저 설정에서 애니메이션 줄이기를 선택한 경우 트랜지션이 제거(`none !important`)되고 처음부터 보여지도록 접근성을 개선했습니다.

### 2.3. 뷰포트 진입 트리거 (`index.html`)
* `IntersectionObserver` 인스턴스를 생성하여 해당 컴포넌트(`id="sec-fix-section"`)가 뷰포트 화면의 50% 이상 노출되었을 때 `.animate` 클래스를 붙여 애니메이션이 1회 시작되도록 구현했습니다.

## 3. 검증
* 메인 화면 진입 후 3SecFix 섹션으로 스크롤 시 정밀한 딜레이를 두고 순서대로 요소가 나타남을 확인했습니다.
* 시각적으로 뚝뚝 끊기는 느낌(Frame drop) 없이 60fps 트랜지션으로 렌더링됨을 확인했습니다.
