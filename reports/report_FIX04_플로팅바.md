# 모바일 플로팅 구매 바 구현 보고서 (report_FIX04_플로팅바.md)

## 1. 구현 개요
- **작업 목표**: `product.html` 내 모바일 화면(639px 이하) 스크롤 시 화면 하단에 고정되어 나타나는 플로팅 구매 바 구현
- **적용 대상**: `product.html` 하단 전역 영역 및 `script.js` 제어 로직

## 2. 상세 작업 내역

### 플로팅 바 HTML 추가
- `product.html` 파일 최하단(`bridge-modal` 선언 바로 앞)에 전역으로 동작할 `<div id="floating-bar">` 요소를 추가했습니다.
- 배경 블러 효과(`backdrop-filter: blur(16px)`)와 하단 둥근 여백을 위해 iOS 호환 safe-area-inset 설정을 적용했습니다.
- 기본적으로 화면 밖으로 밀어둔 상태(`transform: translateY(100%)`)에서 출발하며 부드러운 애니메이션 효과가 들어갔습니다.

### Intersection Observer 로직 적용 (`script.js`)
- `DOMContentLoaded` 시점에 현재 접속 기기가 모바일(viewport 너비 640px 미만)인지 판단합니다.
- 모바일 환경일 경우 두 가지 옵저버를 가동합니다:
  1. **Section Observer**: `productSections` 배열(Reset Mist, Restore Serum, Recover Balm)에 정의된 각 섹션의 노출 여부를 감지하여, 현재 화면에 보이는 섹션에 맞추어 플로팅 바 내부의 제품명, 가격 텍스트 및 `aria-label`을 실시간으로 업데이트합니다.
  2. **Button Observer**: 각 섹션 고유의 원본 히어로 구매 버튼들(`.buy-btn`)이 화면에 노출되는지를 감시합니다. 하나라도 화면 안에 있을 때(`isIntersecting === true`)는 플로팅 바를 아래로 숨기고(`translateY(100%)`), 구매 버튼들이 화면 밖으로 벗어나는 순간 플로팅 바를 위로 끌어올려(`translateY(0)`) 화면 최하단에 자연스럽게 고정되도록 구현했습니다.

### 구매 이벤트 연동
- 플로팅 바의 `네이버에서 구매하기` 버튼을 누르면 현재 설정된 `currentProduct.productKey` 값을 인자로 전달하여 앞서 제작한 `openSmartstore()` 브릿지 모달 동작으로 연결됩니다.

## 3. 검증 결과
- **[완료]** 기기가 모바일 너비(390px 등)일 때, 각 제품의 기본 구매 버튼을 지나쳐 스크롤을 내리면 화면 하단에서 플로팅 바가 위로 슬라이드-업하여 자연스럽게 나타납니다. 다시 위로 올려 기본 버튼이 보이면 플로팅 바가 사라집니다.
- **[완료]** CSS `padding-bottom: calc(12px + env(safe-area-inset-bottom))` 처리를 통해 iOS 등 최신 모바일 기기에서의 하단 Safe Area 여백을 정확하게 보장합니다.
- **[완료]** 화면 스크롤 중 다음 섹션으로 진입 시, 플로팅 바 내 제품 이름 및 관련 정보가 정상적으로 전환되며 업데이트됨을 확인했습니다.
