# GenYou Lab 프로젝트 규칙 및 초기 보일러플레이트 (rules.md)

이 문서는 GenYou Lab 프로젝트의 브랜드 디자인 시스템, 기술 스택 및 연동 규칙, 그리고 AI 작업 행동 규칙을 통합하여 관리하는 마스터 규칙 문서입니다. 섹션 1~3에서 생성된 초기 템플릿 및 보일러플레이트 코드는 본 문서 산하에 코드 블록으로 포함되어 관리됩니다.

---

## 섹션 1. 브랜드 & 디자인 시스템 규칙

### 1-1. 브랜드 정체성
- **브랜드명**: GenYou Lab (젠유랩)
- **핵심 철학**: The Art of Leaving It Alone — 내버려 두는 것의 미학
- **슬로건**: 피부가 쉴 시간을 돌려드립니다

### 1-2. 컬러 시스템 (절대 변경 금지)
| 토큰명 | 헥스값 | 용도 |
|---|---|---|
| `--color-primary` | `#4a5e2f` | 메인 버튼, 로고, 강조 |
| `--color-secondary` | `#7a9a3f` | 보조 강조, 태그 테두리 |
| `--color-muted` | `#c8d4b0` | 배경 액센트, 진행바 |
| `--color-surface` | `#f2f0e8` | 페이지 기본 배경 |
| `--color-surface-2` | `#f7f5ee` | 카드 배경 |
| `--color-text-primary` | `#2e2e2e` | 본문 텍스트 |
| `--color-text-secondary` | `#6b6b6b` | 보조 텍스트, 캡션 |
| `--color-reject-bg` | `#ffe5e5` | 배제 성분 태그 배경 |
| `--color-reject-text` | `#a03030` | 배제 성분 태그 텍스트 |
| `--color-kakao` | `#FEE500` | 카카오 아이덴티티 (버튼 테두리 opacity 0.6) |
| `--color-naver` | `#03C75A` | 네이버 아이덴티티 (버튼 테두리 opacity 0.5) |

### 1-3. 타이포그래피 및 1-4. 컴포넌트 스타일 원칙 (style.css)

```css
/* 폰트 로드 */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');

:root {
  /* 1-2. 컬러 시스템 */
  --color-primary: #4a5e2f;
  --color-secondary: #7a9a3f;
  --color-muted: #c8d4b0;
  --color-surface: #f2f0e8;
  --color-surface-2: #f7f5ee;
  --color-text-primary: #2e2e2e;
  --color-text-secondary: #6b6b6b;
  --color-reject-bg: #ffe5e5;
  --color-reject-text: #a03030;
  
  --color-kakao-border: rgba(254, 229, 0, 0.6);
  --color-kakao-bg: #FEE500;
  --color-naver-border: rgba(3, 199, 90, 0.5);
  --color-naver-bg: #03C75A;
}

* {
  font-family: 'Pretendard', -apple-system, sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 1-3. 타이포그래피 */
.text-h1 { font-size: clamp(28px, 5vw, 48px); font-weight: 500; line-height: 1.2; }
.text-h2 { font-size: clamp(20px, 3vw, 32px); font-weight: 500; line-height: 1.3; }
.text-h3 { font-size: 18px; font-weight: 500; line-height: 1.4; }
.text-body { font-size: 15px; font-weight: 400; line-height: 1.7; }
.text-caption { font-size: 12px; font-weight: 400; line-height: 1.6; font-style: italic; }

/* 버튼 텍스트 유틸리티 */
.text-btn-primary { font-size: 15px; font-weight: 500; }
.text-btn-secondary { font-size: 14px; font-weight: 500; }
.text-btn-social { font-size: 14px; font-weight: 500; }
.text-link-guest { font-size: 12px; font-weight: 400; text-decoration: underline; cursor: pointer; }
.text-floating-price { font-size: 16px; font-weight: 500; }
.text-floating-product { font-size: 12px; font-weight: 400; }

/* 1-4. 컴포넌트 스타일 원칙 */
.neumorphism {
  box-shadow: 4px 4px 10px rgba(0,0,0,0.08), -4px -4px 10px rgba(255,255,255,0.7);
  background: var(--color-surface);
  border-radius: 12px;
  border: 0.5px solid transparent;
  transition: all 0.2s ease-in-out;
}

.glassmorphism {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: rgba(242,240,232,0.92);
  border: 0.5px solid rgba(200,212,176,0.6);
}

.border-base { border: 0.5px solid var(--color-muted); }
.border-active { border: 1px solid var(--color-primary); }

.radius-card { border-radius: 16px; }
.radius-btn { border-radius: 14px; }
.radius-tag { border-radius: 10px; }

svg { stroke-width: 1.2; stroke-linecap: round; fill: none; }
.icon-body { width: 20px; height: 20px; }
.icon-btn { width: 16px; height: 16px; }

/* 1-5. 반응형 브레이크포인트 & 그리드 */
.container { width: 100%; margin: 0 auto; }

@media (max-width: 639px) {
  .container { padding: 0 20px; }
  .grid-product { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
}

@media (min-width: 640px) and (max-width: 1023px) {
  .container { padding: 0 32px; }
  .grid-product { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
}

@media (min-width: 1024px) {
  .container { max-width: 1200px; padding: 0 48px; }
  .grid-hero { display: grid; grid-template-columns: 5fr 7fr; gap: 24px; }
  .grid-12col { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; }
}
```

### 초기 index.html 마크업 템플릿
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GenYou Lab | 피부가 쉴 시간을 돌려드립니다</title>
  <meta name="description" content="The Art of Leaving It Alone — 내버려 두는 것의 미학. 젠유랩과 함께 피부가 쉴 시간을 돌려드립니다.">
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <header class="glassmorphism" style="position: sticky; top: 0; z-index: 100; padding: 16px 0;">
    <div class="container">
      <h1 class="text-h3" style="color: var(--color-primary);">GenYou Lab</h1>
    </div>
  </header>
  <main>
    <section style="padding: 60px 0;">
      <div class="container">
        <h2 class="text-h1" style="margin-bottom: 16px;">The Art of Leaving It Alone</h2>
        <p class="text-body" style="color: var(--color-text-secondary); margin-bottom: 32px;">내버려 두는 것의 미학 — 피부가 쉴 시간을 돌려드립니다.</p>
        
        <div class="neumorphism radius-card" style="padding: 24px; max-width: 400px;">
          <h3 class="text-h3" style="margin-bottom: 8px;">피부 진단 시작하기</h3>
          <p class="text-body" style="color: var(--color-text-secondary); margin-bottom: 24px;">내 피부에 가장 적합한 루틴을 알아보세요.</p>
          <button class="radius-btn text-btn-secondary" style="background: var(--color-primary); color: white; border: none; padding: 12px 24px; width: 100%; cursor: pointer;">
            진단하기
          </button>
        </div>
      </div>
    </section>
  </main>
  <!-- <script src="./script.js"></script> -->
</body>
</html>
```

---

## 섹션 2. 기술 스택 & 연동 규칙

### 스마트스토어 연동 및 GA4 추적 (script.js)
```javascript
// 2-4. 스마트스토어 연동 규칙
const SMARTSTORE_URLS = {
  'reset-mist':    'https://smartstore.naver.com/genyoulab/products/[ID]?utm_source=genyoulab&utm_medium=website&utm_campaign=reset-mist',
  'restore-serum': 'https://smartstore.naver.com/genyoulab/products/[ID]?utm_source=genyoulab&utm_medium=website&utm_campaign=restore-serum',
  'recover-balm':  'https://smartstore.naver.com/genyoulab/products/[ID]?utm_source=genyoulab&utm_medium=website&utm_campaign=recover-balm'
};

/**
 * 2-5. GA4 이벤트 추적 (필수 이벤트)
 */
function trackEvent(eventName, params = {}) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, params);
  } else {
    console.log(`[GA4 Mock] Event: ${eventName}`, params);
  }
}

/**
 * 스마트스토어 이동 (브릿지 모달 포함)
 */
function goToSmartStore(productId) {
  const url = SMARTSTORE_URLS[productId];
  if (!url) return;

  trackEvent('purchase_intent', { product_id: productId });
  showBridgeModal();
  trackEvent('bridge_modal_shown', { product_id: productId });

  // 0.8초 지연 후 이동 (2-6. 브릿지 모달 표시 시간 정확히 0.8초)
  setTimeout(() => {
    hideBridgeModal();
    trackEvent('smartstore_redirect', { product_id: productId });
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, 800);
}

function showBridgeModal() {
  let modal = document.getElementById('bridge-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'bridge-modal';
    modal.className = 'glassmorphism';
    Object.assign(modal.style, {
      position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: '9999'
    });
    modal.innerHTML = `
      <div class="neumorphism radius-card" style="padding: 32px; text-align: center; max-width: 90%; width: 340px;">
        <h2 class="text-h2" style="color: var(--color-primary); margin-bottom: 12px;">GenYou Lab</h2>
        <p class="text-body" style="color: var(--color-text-secondary); margin-bottom: 24px;">안전한 구매를 위해<br/>네이버 스마트스토어로 이동합니다.</p>
        <div style="width: 100%; background: var(--color-muted); height: 4px; border-radius: 2px; overflow: hidden; position: relative;">
          <div id="bridge-progress" style="width: 0%; height: 100%; background: var(--color-primary); transition: width 0.8s ease-in-out;"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  } else {
    modal.style.display = 'flex';
  }
  requestAnimationFrame(() => {
    setTimeout(() => {
      const progress = document.getElementById('bridge-progress');
      if (progress) progress.style.width = '100%';
    }, 50);
  });
}

function hideBridgeModal() {
  const modal = document.getElementById('bridge-modal');
  if (modal) {
    modal.style.display = 'none';
    const progress = document.getElementById('bridge-progress');
    if (progress) progress.style.width = '0%';
  }
}

// 2-3. 소셜 로그인 규칙 Placeholder
function showAuthPromptAfterDiagnosis() {
  // 진단 완료 후 결과 저장 제안 시점에만 소셜 버튼 표시 (GNB 노출 금지)
}

window.goToSmartStore = goToSmartStore;
window.showAuthPromptAfterDiagnosis = showAuthPromptAfterDiagnosis;
```

---

## 섹션 3. AI 작업 행동 규칙 (준수 사항)

### 3-1. 작업 실행 원칙
- **자율 오류 수정**: 오류 발생 시 3회까지 자체 수정 시도
- **수정 3회 초과 시 보고**: 해결 불가 시에만 한국어로 상황 보고
- **작업 단위 완결**: 지시받은 단계 완성 시점까지 논스톱 진행
- **검증 후 다음 단계**: 렌더링, API, 콘솔 확인 필수

### 3-2. .md 보고서 작성 규칙
- `/reports/report_D{일차}_{작업명}.md` 형식으로 저장 (현재 파일은 통합 규칙 문서로 관리)
- 무조건 한국어로 작성 (코드 블록 내부 제외)

### 3-4. 작업 단계별 체크 기준
- 콘솔 오류(Error, Warning) 0건
- Pretendard 폰트 전 텍스트 적용
- 브랜드 컬러 시스템 준수 (#4a5e2f 계열)
- 모바일(390px) 레이아웃 깨짐 없음
- 모든 버튼 최소 터치 영역 44px 이상
- 스마트스토어 연동: 브릿지 모달 0.8초 표시, UTM 파라미터 전달, 플랫폼별(PC/Mobile) 이동 분기

### 3-5. 절대 금지 사항
- ❌ localStorage를 인증 토큰 저장에 직접 사용 (Firebase Auth 사용)
- ❌ 소셜 로그인 버튼을 GNB에 상시 배치 (진단 완료 시점에만 노출)
- ❌ Pretendard 외 폰트 사용 (시스템 폰트, Inter, Roboto 등 금지)
- ❌ 브릿지 모달 생략 또는 0.5초 미만 표시
- ❌ 스마트스토어 URL에 UTM 파라미터 누락
- ❌ 파티클 80개 초과 (성능 저하 방지)
- ❌ 보고서 영어 작성 (코드 블록 제외 전체 한국어 필수)
- ❌ 오류 발생 시 작업 중단 후 즉시 보고 (3회 자체 수정 후 보고가 원칙)

### 3-6. 긴급 상황 보고 트리거
- Firebase 프로젝트 접근 권한 오류
- 카카오/네이버 API 키 인증 실패 (개발자 콘솔 설정 문제)
- 스마트스토어 URL 매핑 테이블이 없거나 빈 값인 경우
- Lighthouse Performance 점수 80점 미만 (최적화 한계 도달)
- iOS Safari에서 소셜 로그인이 3회 수정 후에도 동작하지 않는 경우
