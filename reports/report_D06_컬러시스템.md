# D-06 컬러 시스템 구축 보고서

본 문서는 `rules.md` 섹션 1에 정의된 GenYou Lab의 컬러 시스템을 CSS 토큰화하고, 소셜 로그인 버튼의 시각적 충돌을 해결한 내역을 보고합니다.

## 1. CSS 컬러 토큰 설계 (`/src/styles/tokens.css`)
GenYou Lab의 핵심 철학(자연스러움, 여백)을 반영한 컬러 팔레트를 `:root` 변수로 이식했습니다.
* **Primary/Secondary**: `#4a5e2f`, `#7a9a3f` (브랜드 코어 컬러)
* **Surface**: `#f2f0e8`, `#f7f5ee` (여백과 내버려 둠의 캔버스)
* **Text**: `#2e2e2e`, `#6b6b6b` (가독성을 위한 명도 대비 확보)

## 2. 소셜 버튼 컬러 충돌 해결 (디자인 조화)
카카오의 강렬한 노란색(`#FEE500`)과 네이버의 쨍한 녹색(`#03C75A`)은 GenYou Lab의 차분하고 뉴트럴한 `Surface(#f2f0e8)` 배경과 심미적인 충돌을 일으킵니다.

**[해결 방안 구현]**
* **배경색 통일**: 모든 소셜 로그인 버튼의 `background-color`를 브랜드 기본 배경인 `var(--color-surface)`로 통일하여 이질감을 제거했습니다.
* **테두리를 통한 아이덴티티 부여**: 각 플랫폼의 원본 컬러에 투명도(opacity)를 적용한 Border를 사용하여 플랫폼 식별성을 유지하면서도 젠유랩의 브랜드 톤앤매너에 녹아들게 했습니다.
  * 카카오: `border: 1.5px solid rgba(254, 229, 0, 0.6)`
  * 네이버: `border: 1.5px solid rgba(3, 199, 90, 0.5)`
* **결과**: `tokens.css` 내 `.btn-social-kakao`, `.btn-social-naver` 클래스에 적용 완료.
