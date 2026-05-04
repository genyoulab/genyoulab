# D-28 SEO + GA4 + Search Console + OG 이미지 세팅 보고서

## 1. 개요
* **목표**: 브랜드 검색 시 노출될 메타데이터(타이틀, 설명)를 최적화하고, 소셜 공유 시 보여질 대표 OG 이미지를 세팅. 마케팅 성과 추적을 위해 GA4 스크립트를 전역으로 배포.

## 2. 작업 내역
### 2.1. SEO 메타 태그 삽입
* 전체 HTML 문서(`index.html`, `brand.html`, `career.html` 및 모든 제품 상세 페이지)의 `<head>` 영역에 다음과 같은 메타데이터를 전역 삽입했습니다.
  - **og:title**: "GenYou Lab — 피부가 쉴 시간을 돌려드립니다"
  - **og:description**: "내버려 두는 것의 미학. 젠유랩과 함께 피부가 쉴 시간을 돌려드립니다."
  - **og:type**: "website"

### 2.2. OG 이미지 자동 생성 및 배치
* AI 이미지 제너레이터를 활용하여 **"The Art of Leaving It Alone"**이라는 브랜드 슬로건과 미니멀한 제품 분위기가 담긴 `1200x630` 픽셀의 최적화된 프로모션 썸네일 이미지를 생성했습니다.
* 해당 이미지를 `assets/og-image.png` 로 저장하고, 모든 파일에 `<meta property="og:image" content="/assets/og-image.png">` 로 연결을 완료했습니다. 카카오톡이나 SNS에 링크 공유 시 이 이미지가 노출됩니다.

### 2.3. GA4 전환 추적 (Data Layer)
* 측정 ID `G-DVR7NZR8MW`를 가진 GA4 글로벌 스니펫(`gtag.js`)을 모든 페이지에 주입 완료했습니다.
* 이를 통해 이전 단계(D-22)에서 심어둔 `purchase_intent`, `bridge_modal_shown`, `smartstore_redirect` 등의 전환 이벤트(Conversion Event)들이 구글 애널리틱스 DebugView 및 대시보드로 정상 수집됩니다.

## 3. 결론
* **검색 엔진 최적화(SEO) 및 소셜 미디어 메타데이터(OG) 세팅 완료.**
* 전환 퍼널 측정을 위한 GA4 트래킹 코드가 모든 페이지에 완벽히 설치되었습니다. 향후 구글 서치 콘솔에 최종 도메인을 소유권 확인(DNS 또는 HTML 태그 방식)으로 등록하기만 하면 검색 유입 분석이 가능합니다.
