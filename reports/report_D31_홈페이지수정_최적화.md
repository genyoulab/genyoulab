# 젠유랩(GENYOULAB) 홈페이지 수정 및 최적화 작업 보고서 (D31)

본 보고서는 젠유랩 홈페이지 수정 및 최적화 요청 사항에 대한 작업 내역 및 완료 보고를 작성한 문서입니다.

---

## 1. 작업 개요
- **일자**: 2026-06-25
- **작업 내용**:
  1. 영문 슬로건 폰트(Allerta Stencil) 적용 및 슬로건 문구 수정/확인
  2. 피부 밸런스 게임 스타트 버튼 애니메이션 효과(Pulse & Glow) 추가
  3. 브랜드 표기 전수조사 및 `3SecFix™` 표기 통일성 검증
  4. Philosophy 페이지 세 번째(03) 섹션 한글 문구 수정 및 독자기술 MLF 내용 추가
  5. 사이트 전반의 SEO 타이틀, 메타 설명, og:image(신규 에셋 `genyou3step.jpg`) 일괄 적용 및 변경

---

## 2. 세부 작업 내역

### 2-1. 영문 폰트(Allerta Stencil) 및 슬로건 변경
- **스타일 정의**: `style.css` 상단에 Google Fonts의 `Allerta Stencil` 폰트를 임포트하고, 유틸리티 클래스 `.font-slogan-allerta`를 선언했습니다.
- **적용 영역**:
  - `index.html` 홈 화면 상단 영문 슬로건에 클래스 반영.
  - `our-story-philosophy.html` Philosophy 페이지 히어로 영역 영문 슬로건에 클래스 반영.

### 2-2. 피부 밸런스 게임 스타트 버튼 애니메이션 효과
- **스타일 구현**: `style.css` 하단에 `@keyframes pulseGlow`와 `.pulse-glow-btn` 클래스를 설계하여 적용했습니다.
  - **애니메이션 상세**: 버튼이 상시로 은은하게 크기가 변화하며 브랜드 메인 컬러(`#4a5e2f`)의 투명 그림자(Glow)가 퍼지는 펄스(Pulse) 효과를 구현했습니다.
  - **인터랙션 상세**: 마우스 호버(Hover) 시 버튼이 살짝 위로 이동(TranslateY)하고 브랜드 보조 컬러인 `#7a9a3f`로 부드럽게 배경색이 전환되며 그림자가 진해지는 역동적인 마이크로 인터랙션을 설계했습니다.
- **적용 영역**:
  - `index.html`의 피부 밸런스 게임 스타트 버튼 (`START`).

### 2-3. 브랜드 표기 전수조사 및 통일 (3SecFix™)
- 프로젝트 내 전체 HTML 문서와 본문 텍스트 데이터를 전수 검증하였습니다.
- **검증 결과**: 사이트 내 노출되는 모든 브랜드 상표 텍스트는 누락 없이 표준 표기법인 `3SecFix™`로 일치되어 있음을 최종 확인했습니다. (페이지 URL 경로 `/our-story-3secfix.html` 등 구조적 경로는 하이퍼링크 동작 보전을 위해 그대로 유지했습니다.)

### 2-4. Philosophy 페이지 '03 섹션' 문구 변경
- `our-story-philosophy.html`의 03 섹션 내 한글 텍스트를 정확하게 수정하였습니다.
  - **4-1. 첫 번째 문구**: "정제수와 계면활성제, 인공향료를 덜어내고, 자연의 올리브와 허브로 채웠습니다." -> "정제수와 인공향료, 계면활성제를 덜어내고, 자연의 올리브와 허브로 채웠습니다." (순서 변경 적용 완료)
  - **4-2. 두 번째 문구**: "인공 향료 대신 라벤더와 일랑일랑." 하단에 `계면활성제 최소화 독자기술 MLF(미믹 레이어링 포뮬러)로` 줄바꿈하여 추가 적용 완료.

### 2-5. SEO / 메타 태그 및 og:image 교체
- **에셋 위치 조정**: 루트 디렉토리에 정합성 없이 존재하던 `genyou3step.jpg` 파일을 `/assets/genyou3step.jpg` 경로로 안전하게 복사/이동하였습니다.
- **메타 정보 최적화**:
  - **브라우저 타이틀 변경**: `<title>` 및 `og:title`을 `GenYou Lab | 피부에 필요한 것만, 필요한 만큼.`으로 수정했습니다.
  - **메타 설명 변경**: `description` 및 `og:description`을 `Beauty in letting things rest. — 성분은 깊게, 단계는 짧게, 피부는 편하게.` 및 `성분은 깊게, 단계는 짧게, 피부는 편하게.`로 수정했습니다.
  - **공유 대표 이미지**: 모든 HTML 파일에서 `og:image` 속성을 `/assets/genyou3step.jpg`로 일제히 업데이트하였습니다.
  - **적용 대상 파일**:
    - `index.html`, `brand.html`, `career.html`, `recover-cream-balm.html`, `reset-mist.html`, `restore-serum.html` (타이틀, 설명, og:image 전체 변경)
    - `our-story-philosophy.html` (타이틀 내 텍스트 수정 및 og:image 변경)
    - `our-story-3secfix.html`, `our-story-brand.html`, `product-recover-balm.html`, `product-reset-mist.html`, `product-restore-serum.html`, `product.html` (og:image 변경)

---

## 3. 자율 오류 수정 및 해결 과정 (Self-healing)

### 3-1. 발생한 예외 상황
- 작업 진행 중, 브랜드 명칭 전수조사를 위해 Python 스크립트 실행을 시도하였으나 로컬 환경에 python 실행 환경이 부적절하게 구성되어 있어(exit code 1, Output: "Python") 정상 실행이 불가능했습니다.

### 3-2. 자체 해결 방안
- 문제를 직접 해결하기 위해 로컬의 개발 스택을 확인하였고, 웹 개발 환경인 만큼 Node.js가 성공적으로 설치 및 작동하고 있음을 감지했습니다(Node v24.16.0).
- 이에 따라 Python 스크립트를 즉시 Node.js 기반 스크립트로 재작성하여 실행하였습니다.
- `fs`와 정규표현식을 통해 프로젝트의 HTML 파일 20여 개를 안전하게 파싱하여 오탈자 및 기호 생략된 브랜드 텍스트의 유무를 완벽히 확인하였고, 검증 단계까지 문제없이 도달하였습니다.
