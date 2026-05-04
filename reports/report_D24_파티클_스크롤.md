# D-24 히어로 파티클 및 스크롤 스토리텔링 보고서

## 1. 개요
* **목표**: 브랜드 아이덴티티 강화를 위해 히어로 영역에 Canvas API를 이용한 부드러운 파티클 애니메이션을 구현하고, 저사양 기기 및 접근성 환경에 대한 방어 로직을 작성합니다.
* **관련 소스**: `src/scripts/particles.js`, `index.html`

## 2. 구현 내역
### 2.1. Canvas 파티클 (`requestAnimationFrame`)
* `requestAnimationFrame` 루프를 사용하여 프레임 드랍 없는 60fps 부드러운 파티클 이동(위로 천천히 떠오르는 형태)을 구현했습니다.
* 파티클 색상은 브랜드 톤 앤 매너를 유지하기 위해 올리브/그린 계열(`rgba(164, 180, 148, alpha)`)을 적용했습니다.

### 2.2. 리소스 최적화 및 Fallback (최대 80개 제한)
* 기본적으로 PC 환경에서는 최대 80개의 파티클만 렌더링되도록 상한을 두었습니다.
* `navigator.userAgent`를 통한 모바일 환경 감지 시 렌더링 파티클 개수를 40개로 줄여 배터리 소모와 발열을 방지했습니다.

### 2.3. 접근성 대응 (`prefers-reduced-motion`)
* 브라우저 시작 시 `window.matchMedia('(prefers-reduced-motion: reduce)')`를 체크하여 해당 옵션이 켜져있다면 `requestAnimationFrame` 루프를 일체 시작하지 않고 즉각 `return` 처리합니다. (시각적 자극 방지 및 정적 Fallback 적용)

## 3. 결론
* 메인 랜딩 페이지(`index.html`) 히어로 섹션의 시각적 디테일을 극대화하면서도 모바일 최적화 및 접근성 규약을 철저히 준수한 코드를 작성했습니다.
