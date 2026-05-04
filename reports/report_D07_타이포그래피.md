# D-07 타이포그래피 구축 보고서

본 문서는 GenYou Lab의 텍스트 콘텐츠에 통일된 위계와 시각적 안정감을 부여하기 위해 타이포그래피 시스템을 이식한 내역입니다.

## 1. 폰트 로드 및 전역 적용 (`/src/styles/typography.css`)
* **웹 폰트**: 브랜드 코어 폰트인 `Pretendard`를 CDN으로 import 완료.
* **글로벌 적용**: `*` 셀렉터를 사용해 모든 요소에 Pretendard를 강제 적용하였고, OS 기본 폰트를 Fallback으로 구성했습니다.
* **렌더링 최적화**: 텍스트 렌더링을 매끄럽게 하기 위해 `-webkit-font-smoothing: antialiased;`를 추가했습니다.

## 2. 타이포그래피 스케일 (Typography Scale)
모든 폰트 사이즈와 행간을 CSS 유틸리티 클래스로 정의하여, 인라인 스타일 없이도 일관된 텍스트 크기를 유지할 수 있도록 했습니다.

* **Headings**: 
  * `.text-h1` (Fluid Typography 적용: 28px ~ 48px 유동적 변경)
  * `.text-h2` (Fluid Typography 적용: 20px ~ 32px 유동적 변경)
  * `.text-h3` (18px)
* **Body & Caption**:
  * `.text-body` (15px, 행간 1.7배로 여백의 미학 확보)
  * `.text-caption` (12px, 부가 설명용 이탤릭체 적용)
* **Functional Text**:
  * 버튼(`.text-btn-primary`, `.text-btn-social`), 게스트 링크(`.text-link-guest`), 플로팅 바 텍스트 등 특정 목적의 텍스트 클래스를 분리하여 관리.

> **[규칙 준수 사항]**  
> `rules.md` 섹션 3-5에 의거하여 "Pretendard 외 폰트 사용 (시스템 폰트, Inter, Roboto 등) 금지" 규정을 완벽하게 준수하였으며, 전체 텍스트에 Pretendard가 1순위로 적용되도록 보장했습니다.
