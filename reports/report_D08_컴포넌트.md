# D-08 컴포넌트 디자인 보고서

본 문서는 GenYou Lab의 디자인 원칙(Neumorphism, Glassmorphism)을 바탕으로 구현된 주요 UI 컴포넌트의 마크업 내역을 정리한 문서입니다.

## 1. 컴포넌트 개요
`rules.md` 섹션 1-4에 정의된 클래스(`.neumorphism`, `.glassmorphism`)를 조합하여 컴포넌트를 구축했습니다.

* **진단 카드 (Diagnosis Card)**
  * `.neumorphism`, `.radius-card` 클래스를 적용하여 표면 위로 부드럽게 튀어나온 엠보싱 효과 구현.
  * 진단 유도 CTA를 감싸는 컨테이너 역할을 수행.
* **스텝 버튼 (Step Button)**
  * 질문지 응답 등 사용자가 누르는 선택지에 적용하기 위해 `.neumorphism`, `.radius-btn` 형태 활용.
  * 우측 화살표 아이콘을 통해 클릭 가능(Affordance) 인지력 향상.
* **브릿지 모달 (Bridge Modal)**
  * **배경**: 화면 전체를 덮는 `.glassmorphism` 적용 (`backdrop-filter: blur(16px)`).
  * **내부 모달**: `.neumorphism`이 적용된 카드로 시각적 집중 유도.
  * **진행 바**: `transition: width 0.8s`로 설계되어 시나리오 시간에 맞춘 부드러운 로딩 구현.

> 상세 마크업 코드는 `/src/components/BridgeModal.html` 파일에 통합하여 저장 완료했습니다.
