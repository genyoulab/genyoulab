# D-10 디자인 토큰 이식 및 브랜드 키트 업데이트 보고서

본 문서는 개발 환경에 설계된 GenYou Lab의 디자인 시스템(토큰)을 디자인 툴(Canva 등)의 브랜드 키트에 양방향으로 동기화하기 위한 지침서입니다.

## 1. Antigravity 디자인 토큰 이식 결과 요약
* **Color (`tokens.css`)**: 브랜드 철학이 반영된 `--color-primary`, `--color-surface` 등 변수 11종 완벽 적용 및 소셜 버튼 색상 충돌 해결 (D-06 완수).
* **Typography (`typography.css`)**: 웹용 Pretendard 폰트 시스템 및 h1~caption 스케일 구축 완료 (D-07 완수).
* **Component Patterns (`BridgeModal.html`)**: Neumorphism(뉴모피즘) 엠보싱 카드, Glassmorphism(글래스모피즘) 배경 등 핵심 스타일 적용 확인 (D-08 완수).
* **Iconography (`/src/icons/`)**: 선 두께 1.2, 둥근 마감을 준수한 자체 SVG 14종 시스템 확립 (D-09 완수).

## 2. Canva 브랜드 키트 업데이트 지침 (가이드)

위 코드로 구축된 젠유랩의 디자인 토큰을 Canva(또는 Figma) 브랜드 키트에 동일하게 세팅하여 향후 마케팅 소재 제작 시 일관성을 유지해야 합니다.

### [업데이트 1] 브랜드 컬러 등록
Canva 브랜드 키트의 "컬러" 섹션에 아래 HEX 코드를 이름과 함께 등록하세요.
* **GenYou Primary**: `#4A5E2F` (메인 녹색)
* **GenYou Secondary**: `#7A9A3F` (서브 연두)
* **GenYou Muted**: `#C8D4B0` (배경 액센트용 연두)
* **GenYou Surface**: `#F2F0E8` (기본 연베이지 배경)
* **GenYou Reject**: `#FFE5E5` (배제 성분 붉은 계열)

### [업데이트 2] 브랜드 폰트 등록
Canva에서 '업로드된 폰트' 기능을 사용하여 `Pretendard` 폰트 패밀리를 추가합니다.
* **제목 폰트**: Pretendard Medium (500)
* **부제목 폰트**: Pretendard Medium (500)
* **본문 폰트**: Pretendard Regular (400)
> 모든 마케팅 및 웹 이미지 에셋에 시스템 기본 폰트 대신 반드시 Pretendard를 지정해야 합니다.

### [업데이트 3] 로고 및 아이콘 에셋 업로드
* `/src/icons/` 폴더에 생성된 14종의 SVG 파일을 Canva 브랜드 에셋 보관함에 업로드하여, 카드뉴스나 배너 제작 시 벡터 소스로 즉시 활용할 수 있도록 구성합니다.
* 특히 소셜 로그인 버튼(카카오/네이버)을 이미지로 표현할 때, `tokens.css`에서 정의된 '투명도가 적용된 테두리(Opacity Border)' 방식을 마케팅 시안에서도 동일하게 준수합니다.
