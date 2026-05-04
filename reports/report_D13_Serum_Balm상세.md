# D-13 작업 보고서: Restore Serum 및 Recover Cream Balm 상세 페이지 구현

## 1. 작업 개요
* **목표**: 나머지 2개 제품(세럼, 밤)의 상세 페이지 구현 및 구조 통일
* **파일**: `restore-serum.html`, `recover-cream-balm.html`

## 2. 주요 구현 사항
* **레이아웃 통일**:
  * `reset-mist.html`과 완벽히 동일한 HTML 구조(히어로, 아코디언, 위젯 컨테이너, 모바일 플로팅 바)를 적용.
  * `pdp.css`, `pdp.js`, `tokens.css`, `typography.css` 등 공통 자원을 재활용하여 일관성 유지.
* **데이터 및 텍스트 교체**:
  * **Restore Serum**: 32,000원, 피부 본연의 힘을 길러주는 앰플, 수분 장벽 복합체 성분 강조.
  * **Recover Cream Balm**: 28,000원, 극건성 피부를 위한 고보습 크림 밤, 고농축 보습 캡슐 성분 강조.
* **UTM 및 구매 URL 연동**:
  * 각 버튼에 맞는 ID (`restore-serum`, `recover-cream-balm`)를 `goToSmartStore` 함수에 전달하여, `smartstore.js`의 정확한 URL 및 UTM 파라미터가 사용되도록 설정.

## 3. 검토 결과
* 3개 제품 페이지 간 레이아웃 및 디자인 일관성 확보.
* 공통 JS/CSS 재사용으로 코드 중복 최소화.
* 제품별 올바른 구매 링크로 연결됨.
