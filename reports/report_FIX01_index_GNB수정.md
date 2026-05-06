# index.html GNB 동기화 보고서 (report_FIX01_index_GNB수정.md)

## 1. 개요
- **작업 목표**: `index.html`의 메인 네비게이션 바(GNB)를 `brand.html` 및 `career.html`에 이미 적용된 GNB 구조와 완전히 동일하게 일치시키기
- **작업 방식**: 새로운 코드를 작성하지 않고, 기존에 작성된 `brand.html`의 GNB(`<nav>` 및 `<div id="gnb-drawer">`) 코드를 그대로 재사용하여 `index.html`에 복사 적용

## 2. 상세 작업 내역

### GNB 구조 통일
- 기존의 분리되어 관리되던 `index.html`의 GNB 코드를 삭제했습니다.
- `brand.html`과 `career.html`에 사용된 최신 구조([BRAND], [PRODUCT], [COMMUNITY], [CAREER], [진단하기])를 복사하여 `index.html`의 `<nav>`와 `<div id="gnb-drawer">` 영역에 정확하게 붙여넣었습니다.
- 이로써 모든 메인 페이지(Index, Brand, Product, Career)가 완벽하게 일치하는 단일한 GNB 템플릿 코드를 갖게 되었습니다.

### 진단 위젯 이벤트 최적화
- `brand.html`에서 그대로 가져온 GNB 코드에는 [진단하기] 버튼에 `onclick` 속성이 인라인으로 들어있지 않은 상태(`href="#"`)였습니다.
- GNB의 HTML 코드를 동일하게 유지하면서도 메인 페이지의 피부 진단 위젯이 정상적으로 팝업될 수 있도록, `index.html` 하단 스크립트에 DOM 이벤트 리스너를 동적으로 연결하는 방식을 추가했습니다.
- `.gnb-cta` 및 `.gnb-drawer-cta` 클래스를 클릭할 때 `openDiagnosis()` 함수가 호출되도록 하여, 마크업 일관성과 기능성을 동시에 충족했습니다.

## 3. 검증 결과
- **[완료]** `index.html` 최상단 GNB 메뉴 항목이 브랜드, 제품, 커뮤니티, 채용 등 4개 메뉴와 우측 진단하기 버튼으로 정상 노출됩니다.
- **[완료]** HTML 구조가 타 서브페이지들과 100% 동일하게 유지되고 있음을 코드로 확인했습니다.
- **[완료]** [진단하기] 버튼 클릭 시 모바일/PC 모두 진단 위젯 모달이 원활하게 동작하는 것을 스크립트 연결 테스트를 통해 검증했습니다.
