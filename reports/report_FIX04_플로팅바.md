# 모바일 플로팅 구매 바 구현 보고서 (report_FIX04_플로팅바.md)

## 1. 개요
- **작업 목표**: `rules.md` 가이드라인 Part C에 정의된 대로, 모바일 환경(639px 이하)에서 제품 상세 영역 스크롤 시 화면 하단에 고정되는 플로팅 구매 바(Floating Purchase Bar)를 구현
- **적용 대상**: `product.html` 내의 모든 제품 표시 섹션 및 하단 오버레이 영역

## 2. 작업 내역 및 기능 검증 (Checklist)

### 2.1 마크업 구조 및 스타일 검증
- **[완료] HTML 구조 추가**: `product.html` 문서의 `<body>` 최하단(브릿지 모달 직전 위치)에 `<div id="floating-bar">`를 삽입했습니다.
- **[완료] iOS Safe-Area 적용**: CSS `padding-bottom: calc(12px + env(safe-area-inset-bottom))` 속성을 사용하여, 최신 아이폰 등 하단 홈 인디케이터 영역이 있는 기기에서도 버튼 텍스트가 가려지지 않고 올바르게 여백을 확보하도록 구현했습니다.
- **[완료] 글래스모피즘 룩 앤 필**: 반투명 배경(`rgba(242,240,232,0.96)`)과 `backdrop-filter: blur(16px)`를 결합해 배경 컨텐츠가 은은하게 비치는 고급스러운 스타일을 적용했습니다.

### 2.2 JavaScript 동작 검증
- **[완료] 모바일 환경 분기**: `window.innerWidth < 640` 조건을 체크하여, 모바일 디바이스 해상도에서만 플로팅 바 로직 및 Observer가 활성화되도록 최적화했습니다. (PC에서는 플로팅 바 로드가 생략되어 리소스를 절감합니다.)
- **[완료] 섹션별 동적 데이터 갱신**: `IntersectionObserver`(threshold: 0.3)를 이용해 뷰포트 내 들어온 제품을 감지합니다. Reset Mist, Restore Serum, Recover Balm 섹션을 넘나들 때마다 플로팅 바의 제품명(`#float-product-name`)과 접근성 속성(`aria-label`)이 즉각적으로 갱신됩니다.
- **[완료] 등장/사라짐 로직**: 히어로 섹션 내의 오리지널 구매 버튼(`.buy-btn`)을 `IntersectionObserver`(threshold: 0)로 모니터링하여, 히어로 구매 버튼이 뷰포트 바깥으로 완전히 사라지는 순간 플로팅 바가 하단에서 `translateY(0)`로 부드럽게(slide-up) 올라오도록 처리했습니다. 반대로 화면에 다시 보이면 `translateY(100%)`로 숨겨집니다.
- **[완료] 스마트스토어 연동**: 플로팅 바 내부의 [네이버에서 구매하기] 버튼 클릭 시, 현재 화면에 활성화된 `currentProduct.productKey`를 `openSmartstore()` 함수에 전달하여, 0.8초 브릿지 모달을 거친 뒤 각 제품의 정확한 URL로 분기되도록 연동했습니다.

## 3. 결론
모바일 사용자가 상품 정보를 탐색하기 위해 화면을 스크롤하는 동안에도 언제든지 즉시 구매로 전환할 수 있도록 UX 장치(플로팅 바)가 정상적으로 구현 및 최적화되었습니다.
